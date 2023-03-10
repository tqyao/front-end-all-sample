
/*
1. 默认导入只能导入默认导出暴露的属性
2. 如果要导入按需导出的属性，则需要按需导入
 */
import m1 from './m2'
console.log(m1)

/*
按需导入重命名 ：d as d2
 */
import m2, {d as d2, e} from './m2'
console.log(m2, d2, e)