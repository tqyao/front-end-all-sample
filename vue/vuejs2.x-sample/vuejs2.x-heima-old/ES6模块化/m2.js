let a = 1
let b = 'abc'
let c = true

/* 按需导出 */
export let d = ['a','b']
export const e = '小伙计'

function show(){
    console.log('show function');
}

export default {
    a,
    b,
    c,
    show
}


// 1. 一个 js 文件只能有一个默认导出
// 2. 如果 import 一个没有默认导出的js文件，则默认导入了一个空对象
// export default {
//     d
// }