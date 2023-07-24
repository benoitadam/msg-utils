# msg-utils

Several small practical and light tools.

## NodeJs Compat

// uuid
import crypto from 'node:crypto';
globalThis.crypto = crypto as Crypto;

// Rest
import XMLHttpRequest from 'xmlhttprequest-ssl';
globalThis.XMLHttpRequest = XMLHttpRequest;

## array
## cast
## check
## clipboard
## json
## msg
## number
## promise
## react
## record
## rest
## stored
## string