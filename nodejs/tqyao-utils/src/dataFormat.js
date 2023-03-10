function dataFormat(dataStr) {
    const data = new Date(dataStr);

    let y = data.getFullYear();
    let m = data.getMonth() + 1;
    let d = data.getDate();

    let hh = data.getHours();
    let mm = data.getMinutes();
    let ss = data.getSeconds();

    return `${addZero(y)}-${addZero(m)}-${addZero(d)} ${addZero(hh)}:${addZero(mm)}:${addZero(ss)}`
}

function addZero(n) {
    return n > 9 ? n : '0' + n;
}

module.exports ={
    dataFormat
}