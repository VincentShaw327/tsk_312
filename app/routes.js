import React from 'react'
import { Switch, Route, HashRouter, BrowserRouter } from 'react-router-dom'
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import App from './base/Entry';
import Login from './pages/login' // 登录*/
import Register from './pages/register'// 注册


/* 进入路由的判断 */
function isLogin( nextState, replaceState ) {
    const token = sessionStorage.getItem( 'token' )
    if ( !token ) {
        replaceState( '/login' )
    }
}

export default () => (
    <LocaleProvider locale={zhCN}>
        <HashRouter >
        {/* <BrowserRouter> */}
        <Switch>
            <Route path="/" onEnter={isLogin} component={App} />
            <Route path="/login" getComponent={Login} />
            <Route path="/register" getComponent={Register} />
        </Switch>
        {/* </BrowserRouter> */}
        </HashRouter>
    </LocaleProvider>
)
