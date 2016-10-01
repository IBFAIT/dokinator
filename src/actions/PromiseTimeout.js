'use strict'

export class PromiseTimeout {
  constructor(time = 0) {
    let tmId
    this.p = new Promise((resolve, reject) => {
      tmId = setTimeout(resolve, time);
    });
    this.p.clear = () => {clearTimeout(tmId)};
    return this;
  }
}
