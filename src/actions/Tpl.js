'use strict'

class Tpl {
  constructor({inputStr, patern = /(\$\{([a-zA-Z0-9\_\-]*)\})/}) {
    let subjParsed = inputStr.match(patern);
  }
}
