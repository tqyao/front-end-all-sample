const fs = require("fs");
const path = require("path");

const sourceName = "index.html";
const targetCSS = "index.css";
const targetJS = "index.js";
const dir = "clock";
// const targetHtml = "index.html";
const tarpath = path.resolve(__dirname, "clock");

function rmDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const subPath = path.join(dir, file);
        const stats = fs.statSync(subPath);
        if (stats.isDirectory())
            rmDir(subPath)
        else
            fs.unlinkSync(subPath);
    })
    fs.rmdirSync(dir);
}

if (fs.existsSync(tarpath))
    rmDir(tarpath)
else {
    fs.mkdirSync(tarpath);

    const scripRef = `<script src="./index.js"></script>\n`
    const styleRef = `<link rel="stylesheet" href="./index.css">`

    const readStream = fs.createReadStream(path.resolve(__dirname, sourceName));
    const writeStreamCSS = fs.createWriteStream(path.resolve(__dirname, dir, targetCSS));
    const writeStreamJS = fs.createWriteStream(path.resolve(__dirname, dir, targetJS));
// const writeStreamHtml = fs.createWriteStream(path.resolve(__dirname, targetHtml), {flags: "a+"});
    const writeStreamHtml = fs.createWriteStream(path.resolve(__dirname, dir, sourceName));
    readStream.on('data', (dastas) => {
        // console.log(dastas);
        // console.log(dastas.toString("utf-8"));

        const cssStartBuf = Buffer.from("<style>");
        const cssEndBuf = Buffer.from("</style>");
        const jsStartBuf = Buffer.from("<script>");
        const jsEndBuf = Buffer.from("</script>");

        // 1. 文件起始位置 ~ <css>
        const slice1 = dastas.slice(0, dastas.indexOf(cssStartBuf));
        // 2. <css> ~ </css>
        const slice2 = dastas.slice(dastas.indexOf(cssStartBuf)
            + cssEndBuf.length, dastas.indexOf(cssEndBuf));
        // 3. </css> ~ <js>
        const slice3 = dastas.slice(dastas.indexOf(cssEndBuf)
            + cssEndBuf.length, dastas.indexOf(jsStartBuf));
        // 4. <js> ~ </js>
        const slice4 = dastas.slice(dastas.indexOf(jsStartBuf) + jsStartBuf.length, dastas.indexOf(jsEndBuf));
        // 5. </js> ~ 文件末尾
        const slice5 = dastas.slice(dastas.indexOf(jsEndBuf) + jsEndBuf.length);


        const scripRefBuf = Buffer.from(scripRef);
        const styleRefBuf = Buffer.from(styleRef);
        const htmlBuf = Buffer.concat([slice1, scripRefBuf, styleRefBuf, slice3, slice5]);

        writeStreamHtml.write(htmlBuf);
        writeStreamJS.write(slice4);
        writeStreamCSS.write(slice2)
    })


}

