
// module.export 与 export 同时使用
const module02 = require("./module02");
console.log(module02);

/*
 1.exports 是 module.exports 的简写
 2.二者指向同一个对象
 3.⭐️二者同时出现以，require() 导入 默认是 moudle.exports 指向对象
 4. 注意避免混乱，module.export 与 export 不要同时使用
*/

console.log("指向同一对象>>>>>>>>")
console.log(module.exports === exports);

console.log("module.exports 与 exports 同时使用的误区>>>>>>>")
// 1.
console.log("module03>>>>>")
const require2 = require("./module03");
console.log(require2)

// 2.
console.log("module04>>>>>>")
const require1 = require("./module04");
console.log(require1);

// 3.
console.log("module05>>>>>>")
const require3 = require("./module05");
console.log(require3);

// 4.
console.log("module06>>>>>>")
const require4 = require("./module06");
console.log(require4)

// 5.
console.log("module07>>>>>>")
const require5 = require("./module07");
console.log(require5);






