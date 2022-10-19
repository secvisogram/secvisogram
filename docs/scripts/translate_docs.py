"""
This script will bootstrap translations of markdown documentation files in /docs/user from using the DeepL API.
For using the API an authentication key is required, see https://www.deepl.com/docs-api/accessing-the-api/authentication/.
Internal links to other markdown files will be changed to point to the same file with language code changed to the target one.
Some care is taken to keep the original formatting and not translate text that should not be translated but it is highly
recommended checking the resulting files manually.

This script was developed and expects to be run with Python 3.9+.
"""


import argparse
import glob
from dataclasses import dataclass
from pathlib import Path

import re

import deepl

@dataclass
class XmlTag:
  tag: str
  start_replace: str = ""
  end_replace: str = ""

  def __str__(self):
    return self.tag

  @property
  def start(self):
    return f"<{self.tag}>"

  @property
  def end(self):
    return f"</{self.tag}>"

  def wrap(self, inner_text: str) -> str:
    return self.start + inner_text + self.end


def replace_tag(tag_class, text: str) -> str:
  return text.replace(tag_class.start, tag_class.start_replace).replace(tag_class.end, tag_class.end_replace)


HeadingTag = XmlTag("heading", start_replace="# ")
BoldHeadingTag = XmlTag("bold_heading", start_replace="**", end_replace="**")
HeadingKeepTag = XmlTag("heading_keep")
LinkTextTag = XmlTag("link_text", start_replace="[", end_replace="]")
LinkTag = XmlTag("link", start_replace="(", end_replace=")")
VerboseTag = XmlTag("verbose", start_replace="`", end_replace="`")
CodeBlockTag = XmlTag("code_block", start_replace="```", end_replace="```")

HEADING_REGEX = r"^#+\s+(.+ - )(.+)$"
BOLD_HEADING_REGEX = r"^\*\*(.+ - )(.+)\*\*$"
LINK_REGEX = r"\[(.*?)\]\((.*?)\)"
VERBOSE_REGEX = r"`(.+?)`"


def text_to_translation_xml(file_text: str) -> str:
  """
  introduces XML tags to use DeepL translator XML capabilities

  :param file_text: text content of a file
  """
  lines = file_text.splitlines()

  heading = lines[0]
  heading_match = re.match(HEADING_REGEX, heading)
  bold_heading_match = re.match(BOLD_HEADING_REGEX, heading)
  if heading_match:
    heading_xml = HeadingTag.wrap(HeadingKeepTag.wrap(heading_match.group(1)) + heading_match.group(2))
  elif bold_heading_match:
    heading_xml = BoldHeadingTag.wrap(HeadingKeepTag.wrap(bold_heading_match.group(1)) + bold_heading_match.group(2))
  else:
    print(f'"{heading}" is an unsupported heading, will yield undefined results!')
    heading_xml = heading
  xml_lines = [heading_xml]

  in_code_block = False
  for line in lines[1:]:
    if line.startswith("```"):
      if not in_code_block:
        xml_lines.append(CodeBlockTag.start + line[3:])  # optionally defined type
      else:
        xml_lines.append(CodeBlockTag.end)
      in_code_block = not in_code_block
      continue
    if in_code_block:
      xml_lines.append(line)
      continue

    xml_line = re.sub(LINK_REGEX, lambda m: LinkTextTag.wrap(m.group(1)) + LinkTag.wrap(m.group(2)), line)
    xml_line = re.sub(VERBOSE_REGEX, lambda m: VerboseTag.wrap(m.group(1)), xml_line)
    xml_lines.append(xml_line)

  return "\n".join(xml_lines)


def translation_xml_to_text(xml_text: str) -> str:
  """
  removes XML tags after translation

  :param xml_text: the text to remove XML tags from
  """
  for tag_class in [HeadingTag, BoldHeadingTag, HeadingKeepTag, LinkTextTag, LinkTag, VerboseTag, CodeBlockTag]:
    xml_text = replace_tag(tag_class, xml_text)
  return xml_text

def main(args):

  translator = deepl.Translator(args.auth_key)

  for input_file in glob.glob(f"../docs/user/**/*.{args.source_lang}.md", recursive=True):
    input_path = Path(input_file)
    output_path = Path(input_file.replace(".en.", f".{args.target_lang}."))

    if output_path.exists() and not args.overwrite:
      print(f"{output_path} exists - skipping!")
    else:

      print(f"translating from {input_path} to {output_path}")
      input_text = input_path.read_text()

      input_text_xml = text_to_translation_xml(input_text)
      translation = translator.translate_text(
        input_text_xml,
        source_lang=args.source_lang.upper(),
        target_lang=args.target_lang.upper(),
        tag_handling="xml",
        ignore_tags=[str(t) for t in [HeadingKeepTag, LinkTag, VerboseTag, CodeBlockTag]]
      )

      target_text = translation_xml_to_text(translation.text)
      link_replace_source = f".{args.source_lang}.md"
      link_replace_target = f".{args.target_lang}.md"
      target_text = target_text.replace(link_replace_source, link_replace_target)
      target_text = target_text.strip() + "\n"
      output_path.write_text(target_text)

def parse_args():
  parser = argparse.ArgumentParser(
    description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
  )
  parser.add_argument(
    "-k",
    "--auth-key",
    dest="auth_key",
    type=str,
    help="Authentication Key for DeepL API",
  )
  parser.add_argument(
    "-t",
    "--target-lang",
    dest="target_lang",
    type=str,
    help="Target language, must be a valid language code supported by DeepL",
  )
  parser.add_argument(
    "-s",
    "--source_lang",
    dest="source_lang",
    default="en",
    type=str,
    help="The source language, used for matching documentation file names, defaults to 'en'",
  )
  parser.add_argument('--overwrite', action=argparse.BooleanOptionalAction, default=False)
  return parser.parse_args()


if __name__ == "__main__":
  main(parse_args())
