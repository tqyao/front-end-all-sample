const path = require("path");
console.log(path.join("a", "b", "c"));
console.log(path.join("a", "/b", "/c"));

console.log("\n")
// 不指定 '/' (根路径) 则用当前目录的相对路径做为标准绝对路径前缀
console.log(path.resolve("a", "b", "c"));
console.log(path.resolve("/a", "b", "c"));
console.log(path.resolve("a", "/b", "/c"));