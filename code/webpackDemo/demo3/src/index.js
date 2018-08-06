import $ from 'jquery'
import {cube} from "./js/math"
import lessons from './assets/json/lessons.json'
// import './assets/css/test1.css'
import './assets/css/test2.styl'

console.log(cube(3))

$(function () {
  const $app = $('#app')
  // 根据json数据显示一个列表
  const $ul = $('<ul>')
  $app.append($ul)
  lessons.forEach(lesson => {
    $ul.append(`<li>课程名: <span class="lesson-name">${lesson.name}</span>, 时间: ${lesson.days}天</li>`)
  })

  // 添加一个按钮
  const $button = $('<button>我要学习</button>')
  $button.click(function () {
    // import()加载的模块会被单独打包, 只有执行import()时才会去后台请求获取这个包
    import('./js/atguigu').then(atguigu => {
      if(atguigu.studyConfirm()) {
        atguigu.goAtguigu()
      }
    })
  })
  $app.append($button)
})

new Object()