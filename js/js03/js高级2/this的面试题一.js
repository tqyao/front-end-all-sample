var name = "window";
var person = {
  name: "person",
  sayName: function () {
    console.log(this.name);
  }
};

function sayName() {
  var sss = person.sayName;
  sss(); //window
  person.sayName(); //person


  //与上面的等价，仔细观察第一个括号加与不加是一样的，'.' ps:运算符优先级是超级高的
  (person.sayName)(); // person


  // todo :???
  // 如果括号内是赋值语句，把 person.sayName 赋值给 b 然后返回
  (b = person.sayName)();  // window
}

sayName();