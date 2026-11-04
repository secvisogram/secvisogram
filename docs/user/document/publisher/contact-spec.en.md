# Contact - Specification

Contact (`contact`) is an optional object that describes how to reach the
publisher. It may contain the following properties:

* Details (`details`): additional contact information, such as a phone number or
  postal address.
* Email (`email`): the publisher's contact email address.
* Public OpenPGP Key URL (`public_openpgp_key_url`): a URL for the public key
  associated with the contact email address. When provided, `email` is
  required.
* URL (`url`): a web address that can be used to contact the publisher.

```javascript
"contact": {
  "details": "...",
  "email": "security@example.com",
  "public_openpgp_key_url": "https://example.com/openpgpkey",
  "url": "https://example.com/contact"
}
```
