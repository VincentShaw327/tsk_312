import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux'
import hashHistory from './history';
import App1 from './base/TIndexPage';
// import Routes from './routes'
import Routes from './Routes/routes'
import './index.less';
import configure from './store/configureStore'

const store = configure({ config: global.gconfig })

// 登录*/
const Login = ( location, cb ) => {
    require.ensure( [], ( require ) => {
        cb( null, require( './pages/login' )
            .default )
    }, 'login' )
}
// 注册
const Register = ( location, cb ) => {
    require.ensure( [], ( require ) => {
        cb( null, require( './pages/register' )
            .default )
    }, 'register' )
}


/* 进入路由的判断 */
function isLogin( nextState, replaceState ) {
    const token = sessionStorage.getItem( 'token' )
    if ( !token ) {
        replaceState( '/login' )
    }
}


// 工作中心
const TWorkCenter = ( location, cb ) => {
    require.ensure( [], ( require ) => {
        cb( null, require( './pages/TFactory/TWorkCenter' )
            .default )
    }, 'TWorkCenter' )
}

// 工作中心详情
const TWorkCenterDetail = ( location, cb ) => {
    require.ensure( [], ( require ) => {
        cb( null, require( './pages/TFactory/TWorkCenterDetail' )
            .default )
    }, 'TWorkCenterDetail' )
}
// BOM详情
const TBomDetail = ( location, cb ) => {
    require.ensure( [], ( require ) => {
        cb( null, require( './pages/TBom/TBomDetail' )
            .default )
    }, 'TBomDetail' )
}

// 用户详情
const TUserDetails = ( location, cb ) => {
    require.ensure( [], ( require ) => {
        cb( null, require( './pages/TUser/TUserDetails' )
            .default )
    }, 'TUserDetails' )
}
// 权限详情
const TUserAuthDetail = ( location, cb ) => {
    require.ensure( [], ( require ) => {
        cb( null, require( './pages/TUser/TUserAuthDetail' )
            .default )
    }, 'TUserAuthDetail' )
}
// onEnter={isLogin}
const routes = (
    <LocaleProvider locale={zhCN}>
        <Router history={hashHistory}>
            <Route path="/" onEnter={isLogin} component={App1}>
                <Route path="/TOrg_WorkCenter" getComponent={TWorkCenter} >
                    <Route path="/TWorkCenterDetail" getComponent={TWorkCenterDetail} />
                </Route>
                <Route path="/TOrg_workshop" getComponent={TWorkCenterDetail} />
                <Route path="/TWorkCenterDetail" getComponent={TWorkCenterDetail} />
                <Route path="/TBomDetail" getComponent={TBomDetail} />
                <Route path="/TUserDetails" getComponent={TUserDetails} />
                <Route path="/TUserAuthDetail" getComponent={TUserAuthDetail} />
            </Route>
            <Route path="/login" getComponent={Login} />
            <Route path="/register" getComponent={Register} />
        </Router>
    </LocaleProvider>
)

// console.log('Routes',Routes())
ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    // routes,
    document.getElementById( 'root' ),
)
