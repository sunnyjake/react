// console.log('test input / output');
// module.hot.accept();
import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import App from './containers/App'

render(
     <App />,
    document.getElementsByTagName("div")[0]
);
