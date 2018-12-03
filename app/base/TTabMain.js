import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { routerActions } from 'react-router-redux'
import { Tabs, Icon } from 'antd';
// import PropTypes from 'prop-types';
// import styles from './index.less';
// import ComponentsDemo from '../components/componentDemo';
import { updateTabChecked, deleteTabFromList, clearTabList } from 'actions/tabList'
import { updateBreadcrumbList } from 'actions/common';
// import PageHeaderLayout from './PageHeaderLayout';

const { TabPane } = Tabs;


@connect(
  ( state, props ) => ( { tabList: state.tabListResult } ),
  dispatch => ( {
    actions: bindActionCreators( routerActions, dispatch ),
    dispatch: dispatch,
  } ),
)
export default class TTabMain extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
        };
    }

    componentWillMount() {}

    onChange = ( activeKey ) => {
        // const { tabList } = this.props;
        let update_title

        // this.setState( { activeKey } );
        // console.log( 'tab change', this.props, activeKey )
        // hashHistory.push(activeKey)
        this.props.history.push( activeKey )
        this.props.dispatch( updateTabChecked( { activeKey: activeKey } ) )

        /* tabList.list.map( ( tab, index ) => {
          tab.key === activeKey ? update_title = tab.title : null;
        } ); */
        this.props.dispatch( updateBreadcrumbList( { title: update_title, href: activeKey } ) )
    }

    onEdit = ( targetKey, action ) => {
        this[action]( targetKey );
    }

    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push( { title: `nwe-${panes.length}${1}`, data: 'TWorkShopList', key: activeKey } );
        // console.log('panes', panes );
        this.setState( { panes, activeKey } );
    }

    remove = ( targetKey ) => {
        const { tabList } = this.props;
        let delIndex
        let activeKey
        let update_title
        if ( targetKey === tabList.activeKey ) {
          tabList.list.map( ( tab, index ) => {
            tab.key === targetKey ? delIndex = index : null;
          } );
          // 判断是否为当前活跃key的前后tab
          activeKey = tabList.list[delIndex + 1] ?
            tabList.list[delIndex + 1].key : ( tabList.list[delIndex - 1] ?
              tabList.list[delIndex - 1].key : '' );
        // 查找要更新的title
          update_title = tabList.list[delIndex + 1] ?
            tabList.list[delIndex + 1].title : ( tabList.list[delIndex - 1] ?
              tabList.list[delIndex - 1].title : '' );
        //   actions.push(activeKey);
          this.props.history.push( activeKey );
          this.props.dispatch( updateBreadcrumbList( { title: update_title, href: activeKey } ) )
        }
        this.props.dispatch( deleteTabFromList( { targetKey: targetKey } ) );
    }

    clearTab=() => {
        // const panes = this.state.panes.filter( pane => pane.key == 'THome' );
        this.props.dispatch( clearTabList() );
        this.props.history.push( '/home' );
    }

    render() {
        // const { content } = this.props;
        const { activeKey, list } = this.props.tabList;

        return (
            <React.Fragment>
                <Tabs
                  hideAdd
                  onChange={this.onChange}
                  activeKey={activeKey}
                  type="editable-card"
                  animated={false}
                  onEdit={this.onEdit}
                  style={{ margin: 0 }}
                  tabBarExtraContent={
                      ( <span><Icon
                        type="close"
                        className="clearTabBottom"
                        onClick={this.clearTab}
                      />
                        </span> )
                  }
                >
                    {
                      // this.state.panes.map(tab =>
                      //   <TabPane tab={tab.title} key={tab.key}>{tab.content}</TabPane>)
                      list.map( tab =>
                        ( <TabPane
                          tab={tab.title}
                          key={tab.key}
                          closable={tab.closable}
                        >
                                {tab.content}
                          </TabPane> ) )
                    }
                </Tabs>
            </React.Fragment>
        );
    }
}
