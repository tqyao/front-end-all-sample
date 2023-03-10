const fs = require("fs");
const path = require("path");

const tarpath = path.resolve(__dirname,"clock");
// rmDir(path.resolve(__dirname,"clock"));
function rmDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const subPath = path.join(dir,file);
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
else
    fs.mkdirSync(tarpath);





