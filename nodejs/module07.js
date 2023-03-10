
// 指向新对象
exports = {
    bookname: "java",
    price: 188,
}

// 指向exports所指向对象
module.exports = exports;
module.exports.age = 1118;

