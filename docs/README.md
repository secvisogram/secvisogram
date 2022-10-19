# Secvisogram Documentation

This repository contains documentation for secvisogram comprising specification and usage details.
The documentation is integrated via git subtree in the secvisogram repository and published via GitHub pages at .
Additionally, an author guide is generated as PDF document.

## Generating the Author Guide

The author guide is a concatenation of the usage documentation files compiled into an accessible PDF document.
To generate this document the following steps are necessary:

* Merge the usage documentation files (`*-usage.en.md`) using the
  [md_merge.py](https://github.com/secvisogram/secvisogram-documentation/blob/main/scripts/md_merge.py) script.

  `python scripts/md_merge.py --input user --lang en --output . --name author_guide.md`

  This script allows for selecting a specific language, see the `--lang` flag.
  See [below](#translating-the-documentation) for details on how to translate the documentation.

* Convert the resulting markdown file into docx format.

  `pandoc author_guide.md -f markdown -t docx -o author_guide.docx --lua-filter=etc/filters.lua --defaults=etc/defaults.yaml`

* Populate the documents' table of contents with a custom macro.

  `libreoffice --headless --invisible "macro:///Standard.customModule.UpdateIndexes(/absolute/path/to/author_guide.docx)"`

  This requires the absolute path to the generated docx file and the
  [custom macro](https://github.com/secvisogram/secvisogram-documentation/blob/main/etc/customModule.xba) to be
  available in libreoffice.

* Convert the docx file into an accessible PDF with libreoffice.

  `libreoffice --headless --convert-to pdf:writer_pdf_Export --outdir . author_guide.docx`

  To generate an accessible PDF this requires Universal Access Compliance to be enabled in libreoffice.

The title and author of the resulting document can be changed in
[etc/defaults.yaml](https://github.com/secvisogram/secvisogram-documentation/blob/main/etc/defaults.yaml).

A GitHub action is used to automate these steps and publish the English author guide as an artifact.
See the [generate-author-guide.yml](https://github.com/secvisogram/secvisogram-documentation/blob/main/.github/workflows/generate-author-guide.yml) workflow.

## Translating the Documentation

The script `translate_docs.py` uses the [DeepL Translation API](https://www.deepl.com/pro-api) to bootstrap translation
of the documentation in another language supported by the DeepL API. The DeepL API requires an API Key, check the
[documentation](https://www.deepl.com/pro-api?cta=header-pro-api) for more information.

Some effort is made to preserve formatting, but it is not guaranteed to be always correct in the translation results.
Also, translations are most likely not perfect or coherent throughout all different files.
It is highly recommended to manually check and correct the translations before adding them.
