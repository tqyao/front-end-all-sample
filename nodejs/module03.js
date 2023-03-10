
// exports 与 module.exports 最初时默认指向同一个对象
// module.exports 指向 新 对象
module.exports = {
    bookname: "java",
    price: 188,
    borrow: true,
    buy: function () {
        console.log("买书");
    }
}


// exports 指向的还是原来默认的对象，给默认对象添加了username,age等属性
let username = "tqyao"
exports.username = username;
exports.nickname = "xiaoxixix"
exports.age = 18;
exports.sayHi = function () {
    console.log('hello');
}



