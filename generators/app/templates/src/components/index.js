import Vue from "vue";
/* 全局组件编译 */
const modulesFiles = require.context('./global', false, /\.vue$/)
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
// console.log(modules)
Object.keys(modules).forEach(label => {
  // console.log(label, modules[label])
  Vue.component(label, modules[label])
})
