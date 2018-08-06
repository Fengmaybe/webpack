import _ from 'lodash';

function component() {
  var element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack222'], ' ');
/*
  // 在初始化代码中异步加载
  import('./math').then(math => {
    alert(math.square(2))
  } )
  */
  // 在事件回调函数中异步加载
  element.onclick = function () {
    import('./math').then(math => {
      alert(math.square(2))
    } )
  }

  return element;
}

document.body.appendChild(component());