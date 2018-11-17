import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// import zhCN from 'antd/lib/locale-provider/zh_CN';
// import {Router, Route} from 'react-router';
import {Provider} from 'react-redux'
// import App1 from './base/TIndexPage';
// import Routes from './routes'
import Routes from './Routes/routes'
import './index.less';
import configure from './store/configureStore'

const store = configure({config: global.gconfig});
// console.log('Routes',Routes())
ReactDOM.render(
    <Provider store={store}>
        <Routes/>
    </Provider>,
    // routes,
    document.getElementById('root')
)
