//module.exports 使用
module.exports.hello = "hello world"
module.exports.age = 18
module.exports.sayHi = function () {
    console.log(arguments);
    console.log("世界你好")
}

module.exports.obj = {
    hello: "你好123",
    age: 22,
    sayHi() {
        console.log("haha")
    }
}

module.exports.obj = {
    hello: "你好",
    age: 20
}

module.exports.obj = {
    hello: "say hi",
    age: 100
}
