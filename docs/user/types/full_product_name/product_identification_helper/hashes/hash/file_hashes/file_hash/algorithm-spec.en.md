# Algorithm - Specification

The algorithm of the cryptographic hash representation (`algorithm`) of value type `string` with one or more characters contains the name of the cryptographic hash algorithm used to calculate the value.
The default value for `algorithm` is `sha256`.

*Examples:*

* `blake2b512`
* `sha256`
* `sha3-512`
* `sha384`
* `sha512`

These values are derived from the currently supported digests OpenSSL [[OPENSSL]](#openssl).
Leading dashes were removed.

> The command `openssl dgst -list` (Version 1.1.1f from 2020-03-31) outputs the following:
>
>  ```text
>  Supported digests:
>  -blake2b512                -blake2s256                -md4
>  -md5                       -md5-sha1                  -ripemd
>  -ripemd160                 -rmd160                    -sha1
>  -sha224                    -sha256                    -sha3-224
>  -sha3-256                  -sha3-384                  -sha3-512
>  -sha384                    -sha512                    -sha512-224
>  -sha512-256                -shake128                  -shake256
>  -sm3                       -ssl3-md5                  -ssl3-sha1
>  -whirlpool
>  ```

___

<a name="openssl"/>**[OPENSSL]**

*GTLS/SSL and crypto library*, OpenSSL Software Foundation, [https://www.openssl.org/](https://www.openssl.org/).
