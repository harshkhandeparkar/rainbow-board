import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import 'materialize-css/dist/css/materialize.min.css';

import './css/index.css';
import './css/font-awesome.min.css';
import 'material-icons/iconfont/material-icons.css';

import { getCookie, hasCookie } from './util/cookies';

let theme = 'white';

hasCookie('theme').then((doesHaveCookie) => {
  if (doesHaveCookie) getCookie('theme').then((cookie) => {
    theme = cookie;
    ReactDOM.render(
      <React.StrictMode>
        <App theme={theme} />
      </React.StrictMode>,
      document.getElementById('root')
    )
  })
  else ReactDOM.render(
    <React.StrictMode>
      <App theme={theme} />
    </React.StrictMode>,
    document.getElementById('root')
  )
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
