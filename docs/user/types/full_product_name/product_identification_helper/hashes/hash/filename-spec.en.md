# Filename - Specification

The filename representation (`filename`) of value type `string` with one or more characters contains the name of the file which is identified by the hash values.

*Examples:*

* `WINWORD.EXE`
* `msotadddin.dll`
* `sudoers.so`

If the value of the hash matches and the filename does not, a user SHOULD prefer the hash value.
In such cases, the filename SHOULD be used as informational property.
