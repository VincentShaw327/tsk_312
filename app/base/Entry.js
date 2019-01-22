import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'antd';
import { Switch, Route, Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import GlobalFooter from 'components/ant-design-pro/GlobalFooter';
import { asyncComponent } from 'utils/load';
import Exception from 'components/ant-design-pro/Exception';
import THeader from './Header/THeader';
import TTabMain from './TTabMain';
import * as pageList from '../PageList'
import THome from '../pages/THome/THome';
import Nav from './nav';
// import PropTypes from 'prop-types';
// import TFooter from './TFooter';
const { Content, Footer } = Layout;
const { SubMenu } = Menu;
// console.log("pageList",  Object.values(pageList.default));


@connect( ( state, props ) => ( {
  config: state.config,
  tabListResult: state.tabListResult,
} ) )
export default class TIndexPage extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            // siderTheme: false,
            // minHeight: 0,
            // maxHeight: 0,
            maxHeight: innerHeight - 64,
        }
    }

    componentWillMount() { }

    componentDidMount() {
        // this.setState( { maxHeight: innerHeight - 64, minHeight: innerHeight - 64 } );
        window.onresize = ( e ) => {
            // console.log('e',e);
            // console.log("innerHeight",innerHeight);
            this.setState( {
                maxHeight: innerHeight - 64,
                // minHeight: innerHeight - 64,
            } )
        }
    }

    /* handleScroll( e ) {
        // console.log( 'Scroll', e );
    } */

    /* toggleTheme( value ) {
        this.setState( { siderTheme: value } );
    } */

    // 二级菜单的生成
    renderLeftNav( options ) {
      const self = this
      return options.map( ( item ) => {
        if ( !item.children ) {
          return (
            // <SubMenu key={index} title={item.name}>
            <Menu.Item key={item.key ? item.key : item.url} name={item.name}>
                {item.icon ? <Icon type={item.icon} title={item.name} /> : ''}
              <span
                className="menu-name"
              >{item.name}
              </span>
            </Menu.Item>
            // </SubMenu>
          )
        }
        return (
          // <SubMenu key={`sub${index}`}
          <SubMenu key={item.key ? item.key : item.url}
            title={
              <span>
                <Icon type={item.icon} title={item.name} />
                <span className="menu-name">{item.name}</span>
              </span>}
          >
            {
              // item.url ?
                // <Menu.Item key={item.key ? item.key : item.url} name={item.name}>
                //   {/* <Icon type={item.icon} title={item.name} /> */}
                //   {/* <span className="menu-name">{item.name}</span> */}
                //   {item.name}
                // </Menu.Item> : null
            }

            {
              item.children && item.children.length > 0 ? self.renderLeftNav( item.children ) : null
            }
          </SubMenu>
        )
      } )
    }

    render() {
        return (
            <Layout style={{ height: '100%' }}>
                {/* <THeader handleSearch={this._child} /> */}
                <Layout>
                    {/* <Nav {...this.props} /> */}
                        <Layout style={{ border: 'solid 0px' }}>
                            <Content style={{ margin: '0', border: 'solid 0px' }}>
                                <div style={{ minHeight: 360 }}>
                                    {/* <TTabMain
                                      ref={child => this._child = child}
                                      {...this.props}
                                    /> */}
                                    <Switch>
                                        {
                                            Object.values( pageList.default ).map( item => ( <Route
                                              key={item.path}
                                              path={item.path}
                                                // component={item.component}
                                              render={( props ) => {
                                                                const Child = asyncComponent( item.component );
                                                                return <Child {...props} />
                                                            }}
                                            /> ) )
                                        }
                                        <Route path="/home" exact component={THome} />
                                        <Route path="/" exact component={THome} />
                                        <Route
                                            // component={NoMatch}
                                          render={
                                                () => <Exception type="404" style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
                                            }
                                        />
                                    </Switch>
                                </div>
                            </Content>
                            {/* <Footer style={{ padding: 0 }}>
                                <GlobalFooter
                                  className="globalFooter"
                                  copyright={
                                    <Fragment>
                                      Copyright <Icon type="copyright" />广东拓斯达科技股份有限公司
                                    </Fragment>
                                  }
                                />
                            </Footer> */}
                        </Layout>
                </Layout>
            </Layout>
        );
    }
}

TIndexPage.propTypes = {
};
