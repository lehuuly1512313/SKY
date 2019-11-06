import React from 'react';
import ReactDOM from 'react-dom';
import Loading from "./Loading"
import './index.css';
import * as serviceWorker from './serviceWorker';
ReactDOM.render(
  <Loading />,
  document.getElementById('root')
);
serviceWorker.unregister();
