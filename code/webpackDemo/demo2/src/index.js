/*
入口js文件
 */
//测试第三方模块
import $ from 'jquery';
//测试自定义模块
import {cube} from "./js/math";
//测试CSS
import './assets/css/test_css.css';
//测试less
//import './assets/css/test_less.less';
//测试json（webpack自带了,不需要下载了）
import data from './assets/json/data';

//找到#app的元素标签
const $app = $('#app');
//创建ul
const $ul = $('<ul>');
//生成li并插入到ul中
data.forEach((item)=>{
  $ul.append(`<li>葵花宝典: <span class="lesson-name">${item.name}</span>, 时间: ${item.days}天</li>`);
});
//ul插入到app中
$app.append($ul);