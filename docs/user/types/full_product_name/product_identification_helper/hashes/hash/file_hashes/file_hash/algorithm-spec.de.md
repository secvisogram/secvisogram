# Algorithm - Spezifikation

Der Algorithmus der kryptografischen Hash-Darstellung (`algorithm`) des Werttyps `string` mit einem oder mehreren Zeichen enthält den Namen des kryptografischen Hash-Algorithmus, der zur Berechnung des Wertes verwendet wird.
Der Standardwert für `algorithm` ist `sha256`.

*Beispiele:*

* `blake2b512`
* `sha256`
* `sha3-512`
* `sha384`
* `sha512`

Diese Werte sind von den derzeit unterstützten Digests abgeleitet OpenSSL [[OPENSSL]](#openssl).
Führende Bindestriche wurden entfernt.

> Der Befehl `openssl dgst -list` (Version 1.1.1f vom 2020-03-31) gibt folgendes aus:
>
>  ```text
>  Unterstützte Digests:
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

*GTLS/SSL und Krypto-Bibliothek*, OpenSSL Software Foundation, [https://www.openssl.org/](https://www.openssl.org/).
