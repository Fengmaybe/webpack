// 引入js模块
import $ from 'jquery'
import {cube} from "./js/math"
// 引入json模块
import lessons from './assets/json/lessons.json'
// 引入css模块
// import './assets/css/test1.css'
// 引入less模块
import './assets/css/test2.less'

console.log(cube(3))

$(function () {
  const $app = $('#app')
  const $ul = $('<ul>')
  $app.append($ul)
  lessons.forEach(lesson => {
    $ul.append(`<li>课程名: <span class="lesson-name">${lesson.name}</span>, 时间: ${lesson.days}天</li>`)
  })
})