import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import configure from './store/configureStore';
import './index.css';
import './test/iconfont.css';
// import './test/iconfont.js';
// import './custom.less';

const store = configure( { config: global.gconfig } );
ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById( 'root' ),
)
