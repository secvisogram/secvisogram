"""
This script merges markdown files in a hierarchic directory structure.

Heading lines will be adjusted by prepending additional '#' according to the depth of the corresponding file in the
 directory hierarchy.
Links to other markdown files will be converted to internal anchor links.
Local images will be copied to a new image directory.

The directory structure for input may look like this:

- second_level
  - third_level
    - third_level_1.md
  - second_level_1.md
  - second_level_2.md
  - img.jpg
- top_level_1.md
- top_level_2.md

This script was developed and expects to be run with Python 3.9+.
"""


import argparse
import re
import shutil
from collections import OrderedDict, defaultdict
from dataclasses import dataclass
from pathlib import Path
from typing import Optional, Union, List, Any, Dict

MD_HEADER_REGEX = (
  r"^"          # start of line
  r"(\s{0,3})"  # Group 1: zero to three whitespaces, tabs etc (four and more spaces are no heading)
  r"(#{1,6})"   # Group 2: one or up to 6 '#'
  r"(\s+)"      # Group 3: one or more whitespaces
  r"([^#].*)"   # Group 4: one or more chars but not starting with another #
  r"$"          # end of line
)

MD_BOLD_REGEX = (
  r"^"          # start of line
  r"(\*{2})"    # Group 1: **
  r"(.*)"       # Group 2: text
  r"(\*{2})"    # Group 3: **
  r"$"          # end of line
)

MD_IMAGE_REGEX = (
  r"^"          # start of line
  r"(.*)"       # Group 1: optional preceding text
  r"(!\[)"      # Group 2: "!["
  r"(.*)"       # Group 3: optional alt text
  r"(\]\()"     # Group 4: "]("
  r"([^\s]*)"   # Group 5: image link
  r"\s*(.*)"    # Group 6: nothing or a whitespace and the optional image title, including quotes
  r"(\))"       # Group 7: closing parenthesis
  r'(.*)'       # Group 8: optional subsequent text
  r"$"          # end of line
)

MD_LINK_REGEX = (
  r"^"                          # start of line
  r"(.*)"                       # Group 1: optional preceding text
  r"(\[)"                       # Group 2: "["
  r"(.*)"                       # Group 3: link text
  r"(\]\()"                     # Group 4: "]("
  r"([a-zA-Z0-9.:\/#\-_]+)"     # Group 5: link
  r"(\))"                       # Group 6: closing parenthesis
  r"(.*)"                       # Group 7: optional subsequent text
  r"$"                          # end of line
)


@dataclass
class HeaderLine:
  depth: int
  text: str

  def to_text(self, new_depth: Optional[int] = None):
    num_hashes = new_depth or self.depth
    hashes = "#" * num_hashes
    return f"{hashes} {self.text}"


@dataclass
class BoldHeaderLine:
  text: str

  def to_text(self):
    return f"**{self.text}**"

@dataclass
class LinkLine:
  link: str
  link_text: str = ""
  preceding_text: str = ""
  subsequent_text: str = ""

  @property
  def is_external(self):
    return self.link.startswith("http")

  def to_text(self):
    raise NotImplementedError()


@dataclass
class ImageLine(LinkLine):
  title_text: str = ""

  def to_text(self):
    title_part = f' "{self.title_text}"' if self.title_text else ""
    return f'{self.preceding_text}![{self.link_text}]({self.link}{title_part}){self.subsequent_text}'


@dataclass
class TextLinkLine(LinkLine):

  def to_text(self):
    return f"{self.preceding_text}[{self.link_text}]({self.link}){self.subsequent_text}"

  @property
  def is_anchor_link(self):
    return self.link.startswith("#")


def parse_line(line: str) -> Union[HeaderLine, BoldHeaderLine, ImageLine, TextLinkLine, str]:
  """
  parses a given line from a markdown file into an object with more information. Could be one of `HeaderLine`,
  `BoldHeaderLine`, `ImageLine` or `TextLinkLine`. In case no such line is found, the initial string is returned

  :param line: the line to parse
  :return: an object the line has been parsed into, or the initial line as string if no parsing succeeded
  """
  header_search = re.search(MD_HEADER_REGEX, line, re.IGNORECASE)
  if header_search:
    return HeaderLine(depth=len(header_search.group(2)), text=header_search.group(4))
  bold_search = re.search(MD_BOLD_REGEX, line, re.IGNORECASE)
  if bold_search:
    return BoldHeaderLine(text=bold_search.group(2))
  image_search = re.search(MD_IMAGE_REGEX, line, re.IGNORECASE)
  if image_search:
    return ImageLine(
      link=image_search.group(5),
      link_text=image_search.group(3),
      title_text=image_search.group(6)[1:-1],
      preceding_text=image_search.group(1),
      subsequent_text=image_search.group(8)
    )
  link_search = re.search(MD_LINK_REGEX, line, re.IGNORECASE)
  if link_search:
    return TextLinkLine(
      link=link_search.group(5),
      link_text=link_search.group(3),
      preceding_text=link_search.group(1),
      subsequent_text=link_search.group(7)
    )
  return line


def get_dir_content(dir_path: Path, language: str = "en", files_only=False) -> List[str]:
  """lists the contents of a directory and sorts it alphabetically
  starting with files and then directories
  if files_only is set to True, directories will be excluded

  tries to fetch only markdown files with a language specific suffix

  Example:

    document-usage.en.md
    document
    vulnerabilities-usage.en.md
    vulnerabilities

  the results later on influence the ordering of content in a merged file

  :param dir_path: the path to the directory to get contents of
  :param language: the language code to match file suffixes for
  :param files_only: whether to only retrieve files from the input dir
  :return: list of file and directory names
  """

  dirs = [p.parts[-1] for p in dir_path.iterdir() if p.is_dir()]
  files = get_md_language_files(dir_path, language)

  if files_only:
    return sorted(files)

  object_files = []
  field_files = []
  for d in sorted(dirs):
    for f in sorted(files):
      if f.startswith(d):
        object_files.append(f)
    object_files.append(d)
  for f in sorted(files):
    if f not in object_files:
      field_files.append(f)

  result = field_files + object_files
  return result

LANGUAGE_MD_FILE_NAME_PATTERN = "(.+usage.*)[.](.{2,3})[.]md"


def get_md_language_files(dir_path: Path, language: str = "en") -> List[str]:
  """tries to fetch all markdown files with a language specific suffix
  assumes that files in English (suffix '.en.md') are all present
  and uses these as fallback

  :param dir_path: the directory to check for markdown files
  :param language: the language code to match file suffixes for
  :return: list of markdown file names
  """
  lang_to_file_prefix = defaultdict(list)
  for md_file in dir_path.iterdir():
    match = re.match(LANGUAGE_MD_FILE_NAME_PATTERN, str(md_file.parts[-1]))
    if match:
      lang = match.group(2)
      lang_to_file_prefix[lang].append(match.group(1))
  result = []
  for prefix in lang_to_file_prefix["en"]:
    expected_file = prefix + f".{language}.md"
    if prefix in lang_to_file_prefix[language]:
      result.append(expected_file)
    else:
      print(f"missing file '{expected_file}', falling back to English version")
      result.append(prefix + ".en.md")
  return result


LINK_COUNT = "LINK_COUNT"
IMG_COUNT = "IMG_COUNT"
PATH_TO_DEPTH_AND_CONTENT = "PATH_TO_DEPTH_AND_CONTENT"
PATH_TO_LINK_ID = "PATH_TO_LINK_ID"
_STATE = {}


def parse_dir_recursive(
    current_dir: Path,
    current_depth: int,
    current_max_depth: int,
    fixed_args: Dict[str, Any]
  ):
  """
  parses the given directory recursively for files and subdirectories, handling links in files filling the variables
   of internal state
   Also copies local images to their new location for the merged markdown file

  :param current_dir: the currently parsed directory
  :param current_depth: depth level of current directory in directory hierarchy, required for adjusting header lines
  :param current_max_depth: the maximum depth to still enter subdirectories
  :param fixed_args: a dictionary containing fixed arguments for parsing
  """

  files_only = current_max_depth == 0

  dir_content = get_dir_content(current_dir, fixed_args["language"], files_only=files_only)
  for dc in dir_content:
    path = current_dir / dc
    if path.is_file():
      file_lines = []
      for line in path.read_text().splitlines():
        parsed_line = parse_line(line)
        if isinstance(parsed_line, ImageLine) and not parsed_line.is_external:
          new_image_name = f"md-merge-img-{_STATE[IMG_COUNT]}-" + Path(parsed_line.link).name
          new_image_path = fixed_args["output_dir"] / "images" / new_image_name
          shutil.copyfile(current_dir / parsed_line.link, new_image_path)
          parsed_line.link = str(new_image_path.relative_to(fixed_args["output_dir"]))
          _STATE[IMG_COUNT] += 1
        elif isinstance(parsed_line, TextLinkLine) and not (parsed_line.is_external
                                  or parsed_line.is_anchor_link):
          linked_path = (path.parent if fixed_args["relative_to_file"] else fixed_args["start_dir"]) / parsed_line.link
          link_name = f"md-merge-link-{_STATE[LINK_COUNT]}"
          parsed_line.link = "#" + link_name
          _STATE[PATH_TO_LINK_ID][linked_path].append(link_name)
          _STATE[LINK_COUNT] += 1
        file_lines.append(parsed_line)
      _STATE[PATH_TO_DEPTH_AND_CONTENT][path] = (current_depth, file_lines)
    elif path.is_dir():
      parse_dir_recursive(path, current_depth + 1, current_max_depth - 1, fixed_args)


def main(args):

  _STATE[LINK_COUNT] = 1
  _STATE[IMG_COUNT] = 1
  _STATE[PATH_TO_DEPTH_AND_CONTENT] = OrderedDict()
  _STATE[PATH_TO_LINK_ID] = defaultdict(list)

  input_dir = Path(args.input)
  output_dir = Path(args.output)
  output_dir.mkdir(parents=True, exist_ok=True)
  (output_dir / "images").mkdir(exist_ok=True)

  fixed_args = {
    "start_dir": input_dir,
    "output_dir": output_dir,
    "language": args.language,
    "relative_to_file": args.relative_to_file
  }

  parse_dir_recursive(input_dir, args.depth, args.max_depth, fixed_args)

  output_file_path = Path(args.output) / args.name

  prev_head_line_text = ""

  with open(output_file_path, "w+", encoding="UTF-8") as output_file:

    for file_path, (depth, content) in _STATE[PATH_TO_DEPTH_AND_CONTENT].items():
      for linked_path, link_names in _STATE[PATH_TO_LINK_ID].items():
        if not linked_path.exists():
          raise ValueError(f"Linked file '{str(linked_path)}' does not exist! (link in '{str(file_path)}')")
        if file_path.samefile(linked_path):
          for link_name in link_names:
            link_anchor = f'<span id="{link_name}"></span>'
            output_file.write(link_anchor + "\n")
          output_file.write("\n")

      first_line = content[0]
      #  assert isinstance(first_line, (HeaderLine, BoldHeaderLine)), "files must start with a header or bold line!"

      if isinstance(first_line, HeaderLine):
        head_line_text = first_line.to_text(new_depth=depth).replace(" - Usage", "")

        if head_line_text != prev_head_line_text:
          output_file.write(head_line_text + "\n")
          prev_head_line_text = head_line_text
      elif isinstance(first_line, BoldHeaderLine):
        bold_text = first_line.to_text().replace(" - Usage", "")

        if bold_text != prev_head_line_text:
          output_file.write(bold_text + "\n")
          prev_head_line_text = bold_text
      else:
        output_file.write(first_line + "\n")

      for line in content[1:]:
        text = line
        if isinstance(line, LinkLine):
          text = line.to_text()
        output_file.write(text + "\n")
      output_file.write("\n")


def parse_args():
  parser = argparse.ArgumentParser(
    description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
  )
  parser.add_argument(
    "-i",
    "--input",
    dest="input",
    default=".",
    type=handle_input_path,
    help="path to the input folder",
  )
  parser.add_argument(
    "-o",
    "--output",
    dest="output",
    default="./out/",
    type=handle_output_path,
    help="path to the output folder",
  )
  parser.add_argument(
    "-n",
    "--name",
    dest="name",
    default="output.md",
    type=str,
    help="name of the output document",
  )
  parser.add_argument(
    "-l",
    "--lang",
    dest="language",
    default="en",
    type=str,
    help="the language code used in the filenames (.<language>.md)",
  )
  parser.add_argument(
    "-d",
    "--depth",
    dest="depth",
    default=1,
    type=int,
    help="the initial depth of headers to consider, 1 will prepend a single '#' to header lines,"
       " another '#' will be added whenever descending into a subdirectory"
  )
  parser.add_argument(
    "-m",
    "--max-depth",
    dest="max_depth",
    default=-1,
    type=int,
    help="the maximum depth for stepping into subdirectories, -1 disables this feature"
  )
  parser.add_argument(
    "--relative-to-file",
    dest="relative_to_file",
    default=False,
    action=argparse.BooleanOptionalAction,
    type=bool,
    help="when this is set, paths inside markdown files are interpreted as relative to the files they are contained"
       " in. Otherwise they are interpreted as relative to the top level input directory (default)"
  )
  return parser.parse_args()


def handle_input_path(path: Union[Path, str]):
  path = Path(path)
  if path.is_dir():
    return path
  raise argparse.ArgumentTypeError(f"'{path}' is not a valid path")


def handle_output_path(path: Union[Path, str]):
  path = Path(path)
  if path.is_dir():
    return path
  print("Output path does not yet exist. Creating...")
  path.mkdir(parents=True)
  return path


if __name__ == "__main__":
  main(parse_args())
