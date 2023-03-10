
// exports 指向一个新对象
exports = {
    nickname: "xiaoxixix",
    age: 18,
    hoby: function () {
        console.log("打篮球");
    }
}

// 当二者指向不同对象，以 module.exports  指向为准
// module.exports 对默认对象的属性挂载
module.exports.skin = "aixi";

