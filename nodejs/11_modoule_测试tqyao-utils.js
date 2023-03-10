const util = require("./tqyao-utils");
const util2 = require("./tqyao-utils/index");
console.log(new Date());
console.log(util.dataFormat(new Date()));
console.log(util2.dataFormat(new Date()));

let html = "<h1>i love you <span style='color: red'>Hello World</span>></h1>"
console.log(html)
html = util.htmlEscape(html);
console.log(html);
console.log(util.htmlUnEscape(html));
