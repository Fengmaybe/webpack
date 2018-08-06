import { cube } from './math.js'; // 只引入部分

function component() {
  var element = document.createElement('div');

  element.innerHTML = [
         'Hello webpack!',
         '5 cubed is equal to '  + cube(5)
       ].join('\n\n');

  return element;
}

document.body.appendChild(component());