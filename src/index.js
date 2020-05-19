import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App.jsx';
import * as serviceWorker from '@/serviceWorker';

// 样式
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import 'normalize.css';
import '@/index.styl';

// redux
import { Provider } from 'react-redux';
import { store } from '@/redux';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
