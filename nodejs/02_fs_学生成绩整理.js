const fs = require("fs");
let out = [];
fs.readFile('./score.txt', 'utf-8',function (error,data){
    error && console.log(error);

    data.split(" ").forEach(item => {
        // const strings = item.split("=");
        out.push(item.replace("=",":"))
        out.push("\n");
    })
    let outString = out.join(",").replaceAll(",","");
    console.log(outString);
    fs.writeFile("./score_tidy.txt",outString,"utf-8",function (err){
        err && console.log(err);
    })
});

