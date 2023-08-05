# msg-utils

Several small practical and light tools.

@vegi

## NodeJs

    // uuid
    import crypto from 'node:crypto';
    registers.crypto = crypto as Crypto;

    // Rest
    import XMLHttpRequest from 'xmlhttprequest-ssl';
    registers.XMLHttpRequest = XMLHttpRequest;

    import fetch from 'node-fetch';
    registers.fetch = fetch;
    
    import child_process from 'node:child_process';
    registers.child_process = child_process;

## React

    import React from 'react';
    registers.react = React;

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

## TODO

  "exports": {
    ".": {
      "import": {
        "types": "./lib/index.d.ts",
        "default": "./lib/index.js"
      },
      "require": {
        "types": "./lib/cjs/index.d.ts",
        "default": "./lib/cjs/index.js"
      }
    }
  },