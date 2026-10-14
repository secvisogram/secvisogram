# Summary - Usage

A meaningful title or short summary of the reference.

For web pages it's often the page title from the HTML metadata.
For other documents it's the document's title.

For different formats of advisories the title or summary has the following format:

  `ID: TITLE - FORMAT`

where `ID` is the value of `/document/tracking/id`, `TITLE` is optional and the value of `/document/title` and `FORMAT` is one of `PDF`, `TXT`, `CSAF` or `HTML`.

If different versions of the document reside under different URLs, the value of `/document/tracking/version` should be appended as `- version VERSION` after `FORMAT`.
If the latest version is always at the same URL, the `VERSION` part can be identified as `- latest version`
