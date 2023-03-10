/**
 * 模块化
 * @type {{htmlEscape: function(*): *, htmlUnEscape: function(*): *}|{htmlUnEscape?: function(*): *, htmlEscape?: function(*): *}}
 */
const htmlEscape = require('./src/htmlEscape');
const data = require('./src/dataFormat');

module.exports = {
    ...htmlEscape,
    ...data
}
