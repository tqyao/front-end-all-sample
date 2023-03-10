export const checkEmail = (rule, value, callback) => {
  // console.log('rule', rule)
  // console.log('value', value)
  // console.log('callback', callback)
  const pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (!pattern.test(value)) {
    callback(new Error('邮箱格式有误'))
  }
  callback()
}
export const checkMobile = (rule, value, callback) => {
  const pattern = /^[1][3,4,5,7,8][0-9]{9}$/
  if (!pattern.test(value)) {
    callback(new Error('手机号码有误'))
  }
  callback()
}


