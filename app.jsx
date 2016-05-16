import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import Index from './index';



document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Provider store={store}><Index/></Provider>, document.getElementById('main'));
});
