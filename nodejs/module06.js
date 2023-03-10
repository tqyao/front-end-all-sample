let username = "tqyao"
exports.username = username;
exports.nickname = "xiaoxixix"
exports.age = 18;
exports.sayHi = function () {
    console.log('hello');
}

// exports 与 module.exports 指向的还是默认的对象，给对象添加属性
module.exports.newBaby = "ailun";

