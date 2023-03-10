/**
 * Created by hdwang on 2019/1/28.
 */
var convertUtf8 = (function () {

    /**
     * unicode string to utf-8
     * @param text 字符串
     * @returns {*} utf-8编码
     */
    function toBytes(text) {
        var result = [], i = 0;
        text = encodeURI(text);
        while (i < text.length) {
            var c = text.charCodeAt(i++);

            // if it is a % sign, encode the following 2 bytes as a hex value
            if (c === 37) {
                result.push(parseInt(text.substr(i, 2), 16))
                i += 2;

                // otherwise, just the actual byte
            } else {
                result.push(c)
            }
        }

        return coerceArray(result);
    }


    /**
     * utf8 byte to unicode string
     * @param utf8Bytes
     * @returns {string}
     */
    function utf8ByteToUnicodeStr(utf8Bytes) {
        var unicodeStr = "";
        for (var pos = 0; pos < utf8Bytes.length;) {
            var flag = utf8Bytes[pos];
            var unicode = 0;
            if ((flag >>> 7) === 0) {
                unicodeStr += String.fromCharCode(utf8Bytes[pos]);
                pos += 1;

            } else if ((flag & 0xFC) === 0xFC) {
                unicode = (utf8Bytes[pos] & 0x3) << 30;
                unicode |= (utf8Bytes[pos + 1] & 0x3F) << 24;
                unicode |= (utf8Bytes[pos + 2] & 0x3F) << 18;
                unicode |= (utf8Bytes[pos + 3] & 0x3F) << 12;
                unicode |= (utf8Bytes[pos + 4] & 0x3F) << 6;
                unicode |= (utf8Bytes[pos + 5] & 0x3F);
                unicodeStr += String.fromCodePoint(unicode);
                pos += 6;

            } else if ((flag & 0xF8) === 0xF8) {
                unicode = (utf8Bytes[pos] & 0x7) << 24;
                unicode |= (utf8Bytes[pos + 1] & 0x3F) << 18;
                unicode |= (utf8Bytes[pos + 2] & 0x3F) << 12;
                unicode |= (utf8Bytes[pos + 3] & 0x3F) << 6;
                unicode |= (utf8Bytes[pos + 4] & 0x3F);
                unicodeStr += String.fromCodePoint(unicode);
                pos += 5;

            } else if ((flag & 0xF0) === 0xF0) {
                unicode = (utf8Bytes[pos] & 0xF) << 18;
                unicode |= (utf8Bytes[pos + 1] & 0x3F) << 12;
                unicode |= (utf8Bytes[pos + 2] & 0x3F) << 6;
                unicode |= (utf8Bytes[pos + 3] & 0x3F);
                unicodeStr += String.fromCodePoint(unicode);
                pos += 4;

            } else if ((flag & 0xE0) === 0xE0) {
                unicode = (utf8Bytes[pos] & 0x1F) << 12;
                ;
                unicode |= (utf8Bytes[pos + 1] & 0x3F) << 6;
                unicode |= (utf8Bytes[pos + 2] & 0x3F);
                unicodeStr += String.fromCharCode(unicode);
                pos += 3;

            } else if ((flag & 0xC0) === 0xC0) { //110
                unicode = (utf8Bytes[pos] & 0x3F) << 6;
                unicode |= (utf8Bytes[pos + 1] & 0x3F);
                unicodeStr += String.fromCharCode(unicode);
                pos += 2;

            } else {
                unicodeStr += String.fromCharCode(utf8Bytes[pos]);
                pos += 1;
            }
        }
        return unicodeStr;
    }


    function checkInt(value) {
        return (parseInt(value) === value);
    }

    function checkInts(arrayish) {
        if (!checkInt(arrayish.length)) {
            return false;
        }

        for (var i = 0; i < arrayish.length; i++) {
            if (!checkInt(arrayish[i]) || arrayish[i] < 0 || arrayish[i] > 255) {
                return false;
            }
        }

        return true;
    }

    function coerceArray(arg, copy) {

        // ArrayBuffer view
        if (arg.buffer && arg.name === 'Uint8Array') {

            if (copy) {
                if (arg.slice) {
                    arg = arg.slice();
                } else {
                    arg = Array.prototype.slice.call(arg);
                }
            }

            return arg;
        }

        // It's an array; check it is a valid representation of a byte
        if (Array.isArray(arg)) {
            if (!checkInts(arg)) {
                throw new Error('Array contains invalid value: ' + arg);
            }

            return new Uint8Array(arg);
        }

        // Something else, but behaves like an array (maybe a Buffer? Arguments?)
        if (checkInt(arg.length) && checkInts(arg)) {
            return new Uint8Array(arg);
        }

        throw new Error('unsupported array-like object');
    }

    return {
        toBytes: toBytes,
        fromBytes: utf8ByteToUnicodeStr
    }


})()

const fs = require("fs");

const readStream = fs.createReadStream('./application-dev.properties');
const writeStream = fs.createWriteStream("./application-dev_convert.properties");


// 监听流的开启和关闭
// 这几个监听不是必须的
readStream.once('open', function () {
    console.log('可读流打开了~~')
})

readStream.once('close', function () {
    console.log('可读流关闭了~~')
    //数据读取完毕，关闭可写流
    writeStream.end()
})

writeStream.once('open', function () {
    console.log('可写流打开了~~')
})

writeStream.once('close', function () {
    console.log('可写流关闭了~~')
})

// //要读取一个可读流中的数据，要为可读流绑定一个data事件，data事件绑定完毕自动开始读取数据
// readStream.on('data', function (data) {
//     console.log(data);
//
//     //将读取到的数据写入到可写流中
//     // ws.write(data)
//
// })
// var through2 = require('through2');
// var upper = function () {
//     var result = through2(function (buf, _, next) {
//         this.push(buf.toString().toUpperCase());
//         next();
//     })
//     return result;
// }
// readStream.pipe(result)


const {once} = require("events");
const {createInterface} = require("readline");


(async function processLineByLine() {
    const rl = createInterface({
        input: readStream,
        crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
        // Process the line.
        // console.log(line);
        console.log(convertUtf8.fromBytes(convertUtf8.toBytes(line)));
    });
    await once(rl, "close");
    console.log("File processed.");
})();



// console.log(convertUtf8.fromBytes(convertUtf8.toBytes("# \u751F\u4EA7\u73AF\u5883\u9700\u8981\u4FEE\u6539\u4E3A\u670D\u52A1\u5668ip\u6216\u57DF\u540D\n")));
// console.log(convertUtf8.toBytes("# \u751F\u4EA7\u73AF\u5883\u9700\u8981\u4FEE\u6539\u4E3A\u670D\u52A1\u5668ip\u6216\u57DF\u540D\\n").fromBytes());