function htmlEscape(str) {
    return str.replace(/[<>"&]/g, match => {
        switch (match) {
            case '<':
                return "&lt;";
            case '>':
                return "&gt;";
            case '&':
                return "&amp;";
            case '"':
                return "&quot;";
        }
    })
}

function htmlUnEscape(str) {
    return str.replace(/&lt;|&gt;|&amp;|&quot;/g, match => {
        switch (match) {
            case "&lt;":
                return '<'
            case "&gt;":
                return '>'
            case "&amp;":
                return '&'
            case "&quot;":
                return '"'
        }
    })
}

module.exports = {
    htmlUnEscape,
    htmlEscape
}