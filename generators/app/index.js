const Generator = require('yeoman-generator')

const fs = require('fs')
const path = require('path')

function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir)
  files.forEach((item) => {
    var fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      readFileList(path.join(dir, item), filesList) //递归读取文件
    } else {
      filesList.push(fullPath)
    }
  })
  return filesList
}

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname, //appname 为项目文件夹名字
      },
      {
        type: 'checkbox',
        name: 'depend',
        message: 'Choose your dependencies',
        choices: ['vuex', 'axios', 'element-ui'],
      },
    ]).then((answers) => {
      this.answers = answers
    })
  }
  writing() {
    console.log(this.answers)
    let templates = []
    const defaultFiles = [
      'README.md',
      'babel.config.js',
      'package.json',
      'public/favicon.ico',
      'public/index.html',
      'src/App.vue',
      'src/assets/favicon.ico',
      'src/components/index.js',
      'src/icons/index.js',
      'src/icons/svg/article.svg',
      'src/icons/svgo.yml',
      'src/main.js',
      'src/router/index.js',
      'src/router/routeList.js',
      'src/styles/base.css',
      'src/styles/index.scss',
      'src/utils/tool.js',
      'src/views/404/index.vue',
      'src/views/Home.vue',
      'vue.config.js',
    ]

    const storeFile = ['src/store/index.js']
    if (this.answers.depend.includes('vuex')) {
      templates = templates.concat(storeFile)
    }
    templates = templates.concat(defaultFiles)
    templates.forEach((item) => {
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        this.answers
      )
    })
  }
}
