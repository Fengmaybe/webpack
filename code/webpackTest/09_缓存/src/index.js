import _ from 'lodash';
//import module from './another-module'
import './test.css'

function component() {
  var element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack222'], ' ');

  element.onclick = function () {
    import('./math').then(math => {
      alert(math.square(2))
    } )
  }

  return element;
}

document.body.appendChild(component());
