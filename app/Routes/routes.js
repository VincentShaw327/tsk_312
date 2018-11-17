import React from 'react'
import { Switch, Route,HashRouter,BrowserRouter   } from 'react-router-dom'
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
// import App from './base'
import App from '../base/TIndexPage';
import Login from '../pages/login' // 登录*/
import Register from '../pages/register'// 注册


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
            <Route path="/" onEnter={isLogin} component={App}>
                {/* <IndexRoute getComponent={THome} /> */}
                {/* <Route path="/THome" getComponent={THome} /> */}
                {/* {
                    Object.values(pageList).map(function renderRoute(item,index){
                        if(item.hasOwnProperty('children')&&!Array.isArray(item.children)){
                            return  <Route
                                            key={item.path}
                                            path={item.path}
                                            getComponent={item.component}
                                            >
                                                {
                                                    renderRoute(item.children)
                                                }
                                    </Route>
                        }
                        else if(item.hasOwnProperty('children')&&Array.isArray(item.children)){
                            return  <Route
                                            key={item.path}
                                            path={item.path}
                                            getComponent={item.component}
                                            >
                                                {
                                                    // renderRoute(item.children)
                                                    Object.values(item.children).map((item2,index2)=>renderRoute(item2,index2))
                                                }
                                    </Route>
                        }
                        else {
                            return <Route
                                key={item.path}
                                path={item.path}
                                getComponent={item.component}
                            />
                        }
                    })
                } */}
            </Route>
            <Route path="/login" getComponent={Login} />
            <Route path="/register" getComponent={Register} />
        </Switch>
        {/* </BrowserRouter> */}
        </HashRouter>
    </LocaleProvider>
)
