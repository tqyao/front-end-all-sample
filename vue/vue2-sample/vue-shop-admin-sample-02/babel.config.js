// 项目生产上线用到的依赖
const prodPlugin = []

if (process.env.NODE_ENV === 'production') {
  prodPlugin.push("transform-remove-console")
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    ...prodPlugin
  ],

}
