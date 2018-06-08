import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Tabs, Button,Icon } from 'antd';
import PropTypes from 'prop-types';
import styles from './index.less';
import {
    THome,
    TScadaWorkShop_Auto,
    TScadaWorkShop_Auto2,
    TScadaPunchingworkshop,
    TScadaInjectionWorkshop,
    TManufactureOrder,
    TOrderScheduling,
    TManufactureTaskDispatch,
    TDeviceList,
    TDeviceModel,
    TDeviceType,
    TWorkCenter,
    TWorkCenterType,
    TWorkShopList,
    TWorkShopType,
    TMouldList,
    TMouldModel,
    TAuthGroupList,
    TUserList,
    TAuthList,
    TWarningConfig,
    TWarningHistory,
    TMaterialModel,
    TMaterialType,
    TProductModel,
    TBomList,
    TParameterList,
    TModifyRecord,
    TParameterScada,
    TParameterAnalysis,
    TLossTimeReport,
    TStateTimeOverview,
    TOEEReport,
    TTechnicalSupport,
    TProductionReport,
    TOEEAnalysis,
    TDA_Terminal,
    MaintainPlan
} from '../pages/index.js'
import ComponentsDemo from '../components/componentDemo';
import PageHeaderLayout from './PageHeaderLayout';
const TabPane = Tabs.TabPane;

export default class TTabMain extends React.Component {

    constructor( props ) {
        super( props );
        this.newTabIndex = 0;
        const panes = [
            // { title: '首页', key: 'THome', data: 'TMain' },
            { title: '自动化车间一', key: 'TScadaWorkShop_Auto', data: 'TMain' },
        ];
        this.state = {
            // activeKey: '',
            activeKey: panes[ 0 ].key,
            panes,
            ArrContent:[],
            globalKeyword:'',
            hasUpdated:false
        };
    }

    componentWillMount(){
        this.pageContent();
    }

    onChange = ( activeKey ) => {
        if(activeKey=="TManufactureTask") this.MTask_child.update();
        if(activeKey=="TManufactureTaskDispatch") this.MTaskDispatch_child.update();
        this.setState( { activeKey } );
    }

    setTabUpdated=()=>{
        console.log("hasUpdated");
        this.setState({hasUpdated:true});
    }

    onEdit = ( targetKey, action ) => {
        this[ action ]( targetKey );
    }

    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push( { title: 'nwe-' + panes.length + 1, data: 'TWorkShopList', key: activeKey } );
        // console.log('panes', panes );
        this.setState( { panes, activeKey } );
    }

    remove = ( targetKey ) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach( ( pane, i,arr ) => {
            if ( pane.key === targetKey ) {
                // lastIndex = i - 1;
                // lastIndex = i;
                lastIndex=i<(arr.length-1)?i:i-1;
            }
        } );

        // 罗世洲:添加 TMain过滤:首页不关闭
        if ( targetKey == 'THome' ) {
            return;
        }

        const panes = this.state.panes.filter( pane => pane.key !== targetKey );
        if ( lastIndex >= 0 && activeKey === targetKey ) {
            activeKey = panes[ lastIndex ].key;
        }
        this.setState( { panes, activeKey } ,()=>{
            this.pageContent();
        });
    }

    clearTab(){
        const panes = this.state.panes.filter( pane => pane.key == 'THome' );
        // if ( lastIndex >= 0 && activeKey === targetKey ) {
        //     activeKey = panes[ lastIndex ].key;
        // }
        this.setState( { panes,activeKey: panes[ 0 ].key,},()=>{
            this.pageContent();
        } );
    }

    TPageOpen = ( key,keyword ) => {
        // console.log("global keyword",keyword);
        const panes = this.state.panes;
        const activeKey = key;
        let isRepeat = false;
        //panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
        // console.log("key in child",key);
        panes.forEach( ( item, index ) => {
            if ( item.key == activeKey ) {
                isRepeat = true;
                return;
            }
        } )
        if ( panes.length <= 8) {
            // isRepeat == false ? panes.push( { title: '?', key: activeKey, data: '?' } ) : '';
            if(!isRepeat){panes.push( { title: '?', key: activeKey, data: '?' } )}
            else{
                activeKey=="TManufactureTask"?this.MTask_child.update():'';
                activeKey=="TManufactureTaskDispatch"?this.MTaskDispatch_child.update():'';
            }
        }
        else {
            //todo:切换当前激活的页面
            if(!isRepeat){
                panes.splice(1,1);
                panes.push( { title: '?', key: activeKey, data: '?' } )
            }
        }
        this.setState( { panes, activeKey,globalKeyword:keyword },()=>{
            this.pageContent();
        });
        // console.log( 'panes', this.state.panes );
    }

    pageContent=()=>{
        let isClosable=true;
        isClosable=this.state.panes.length<=1?false:true;

        let arr=this.state.panes.map((pane)=>{
          switch(pane.key){
            case "THome":
                const bcList0 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '车间监控',
                  href: '/',
                  }, {
                  title: '自动化装配车间一',
                  }];
                return (
                    <TabPane tab='首页' key={pane.key}>
                        <PageHeaderLayout title="自动化装配车间一" wrapperClassName="pageContent" BreadcrumbList={bcList0}>
                            <THome/>
                            {/* <TScadaWorkShop_Auto/> */}
                        </PageHeaderLayout>
                    </TabPane>
                );
                break;
            case "TScadaWorkShop_Auto":
                const bcList1 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '车间监控',
                  href: '/',
                  }, {
                  title: '自动化装配车间一',
                  }];
                return(
                    <TabPane tab='自动车间一' key={pane.key} closable={isClosable}>
                        <PageHeaderLayout title="自动化装配车间一" wrapperClassName="pageContent" BreadcrumbList={bcList1}>
                            <TScadaWorkShop_Auto/>
                        </PageHeaderLayout>
                    </TabPane>
                  );
                break;
            case "TScadaWorkShop_Auto2":
                const bcList2 = [ {
                    title: "首页",
                    href: '/',
                  }, {
                    title: '车间监控',
                    href: '/',
                  }, {
                    title: '自动化装配车间二',
                  } ];
                return(<TabPane tab='自动车间二' key={pane.key} closable={isClosable}>
                      <PageHeaderLayout title="自动化装配车间二" wrapperClassName="pageContent" BreadcrumbList={bcList2}>
                          <TScadaWorkShop_Auto2/>
                      </PageHeaderLayout>
                      </TabPane>);
                  break;
            case "TScada_CY":
                const bcList3 = [ {
                    title: "首页",
                    href: '/',
                  }, {
                    title: '车间监控',
                    href: '/',
                  }, {
                    title: '冲压车间',
                  } ];
                return(
                    <TabPane tab='冲压车间' key={pane.key} closable={isClosable}>
                        <PageHeaderLayout title="冲压车间" wrapperClassName="pageContent" BreadcrumbList={bcList3}>
                            <TScadaPunchingworkshop/>
                        </PageHeaderLayout>
                    </TabPane>);
              break;
            case "TScada_ZS":
                const bcList4 = [ {
                    title: "首页",
                    href: '/',
                  }, {
                    title: '车间监控',
                    href: '/',
                  }, {
                    title: '注塑车间',
                  } ];
                return(
                    <TabPane tab='注塑车间' key={pane.key} closable={isClosable}>
                        <PageHeaderLayout title="注塑车间" wrapperClassName="pageContent" BreadcrumbList={bcList4}>
                            <TScadaInjectionWorkshop/>
                        </PageHeaderLayout>
                    </TabPane>)
              break;
            case "TManufactureOrder":
                const bcList5 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '生产管理',
                  href: '/',
                  }, {
                  title: '订单管理',
                  }];
                return(
                    <TabPane tab='订单管理' key={pane.key} closable={isClosable}>
                      <PageHeaderLayout title="订单管理" wrapperClassName="pageContent" BreadcrumbList={bcList5}>
                          <TManufactureOrder/>
                      </PageHeaderLayout>
                    </TabPane>);
                break;
            case "TManufactureTask":
                const bcList6 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '生产管理',
                  href: '/',
                  }, {
                  title: '生产排程',
                  }];
              return(
                  <TabPane tab='任务排程' key={pane.key} closable={isClosable}>
                        <PageHeaderLayout title="任务排程" wrapperClassName="pageContent" BreadcrumbList={bcList6}>
                            <TOrderScheduling ref={child=>this.MTask_child=child}  GlobalKeyword={this.state.globalKeyword}/>
                        </PageHeaderLayout>
                  </TabPane>);
              break;
            case "TManufactureTaskDispatch":
                const bcList7 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '生产管理',
                  href: '/',
                  }, {
                  title: '生产派工',
                  }];
                return (
                    <TabPane tab='生产派工' key={pane.key} closable={isClosable}>
                        <PageHeaderLayout title="生产派工" wrapperClassName="pageContent" BreadcrumbList={bcList7}>
                            <TManufactureTaskDispatch ref={child=>this.MTaskDispatch_child=child} />
                        </PageHeaderLayout>
                    </TabPane>);
                        break;
            case "TWorkShopType":
                const bcList8 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '车间管理',
                  href: '/',
                  }, {
                  title: '车间类别',
                  }];
              return (
                  <TabPane tab='车间类别' key={pane.key} closable={isClosable}>
                      <PageHeaderLayout title="车间类别" wrapperClassName="pageContent" BreadcrumbList={bcList8}>
                          <TWorkShopType  />
                      </PageHeaderLayout>
                  </TabPane>);
                    break;
            case "TWorkShopList":
                const bcList9 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '车间管理',
                  href: '/',
                  }, {
                  title: '车间列表',
                  }];
                return (<TabPane tab='车间列表' key={pane.key} closable={isClosable}>
                            <PageHeaderLayout title="车间列表" wrapperClassName="pageContent" BreadcrumbList={bcList9}>
                                <TWorkShopList />
                            </PageHeaderLayout>
                        </TabPane>);
                break;
            case "TWorkCenterType":
                const bcList10 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '车间管理',
                  href: '/',
                  }, {
                  title: '工作中心类别',
                  }];
                return (<TabPane tab='工作中心类别' key={pane.key} closable={isClosable}>
                        <PageHeaderLayout title="工作中心类别" wrapperClassName="pageContent" BreadcrumbList={bcList10}>
                            <TWorkCenterType />
                        </PageHeaderLayout>
                    </TabPane>);
                break;
            case "TWorkCenter":
                const bcList11 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '车间管理',
                  href: '/',
                  }, {
                  title: '工作中心',
                  }];
                return (<TabPane tab='工作中心' key={pane.key} closable={isClosable}>
                                <TWorkCenter />
                        </TabPane>);
                break;
            case "TDeviceCategory":
                const bcList12 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '设备管理',
                  href: '/',
                  }, {
                  title: '设备类别',
                  }];
                return (<TabPane tab='设备类别' key={pane.key} closable={isClosable}>
                            <PageHeaderLayout title="设备类别" wrapperClassName="pageContent" BreadcrumbList={bcList12}>
                                <TDeviceType/>
                            </PageHeaderLayout>
                        </TabPane>);
                break;
            case "TDeviceModel":
                const bcList13 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '设备管理',
                  href: '/',
                  }, {
                  title: '设备型号',
                  }];
                return (<TabPane tab='设备型号' key={pane.key} closable={isClosable}>
                            <PageHeaderLayout title="设备型号" wrapperClassName="pageContent" BreadcrumbList={bcList13}>
                                <TDeviceModel/>
                            </PageHeaderLayout>
                        </TabPane>);
                break;
            case "TDeviceList":
                const bcList14 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '设备管理',
                  href: '/',
                  }, {
                  title: '设备列表',
                  }];
                return <TabPane tab='设备列表' key={pane.key} closable={isClosable}>
                            <PageHeaderLayout title="设备列表" wrapperClassName="pageContent" BreadcrumbList={bcList14}>
                                <TDeviceList/>
                            </PageHeaderLayout>
                        </TabPane>;
                break;
            case "TMouldModel":
                const bcList15 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '模具管理',
                  href: '/',
                  }, {
                  title: '模具型号',
                  }];
                return <TabPane tab='模具型号' key={pane.key} closable={isClosable}>
                            <PageHeaderLayout title="模具型号" wrapperClassName="pageContent" BreadcrumbList={bcList15}>
                                <TMouldModel/>
                            </PageHeaderLayout>
                        </TabPane>;
                break;
            case "TMouldList":
                const bcList16 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '模具管理',
                  href: '/',
                  }, {
                  title: '模具列表',
                  }];
                return (<TabPane tab='模具列表' key={pane.key} closable={isClosable}>
                            <PageHeaderLayout title="模具列表" wrapperClassName="pageContent" BreadcrumbList={bcList16}>
                                <TMouldList/>
                            </PageHeaderLayout>
                        </TabPane>);
                break;
            case "TMaterialType":
                const bcList17 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '生产资料',
                  href: '/',
                  }, {
                  title: '物料类别',
                  }];
                return (<TabPane tab='物料类别' key={pane.key} closable={isClosable}>
                            <PageHeaderLayout title="物料类别" wrapperClassName="pageContent" BreadcrumbList={bcList17}>
                                <TMaterialType/>
                            </PageHeaderLayout>
                        </TabPane>);
                break;
            case "TMaterialModel":
                const bcList18 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '生产资料',
                  href: '/',
                  }, {
                  title: '物料型号',
                  }];
                return (<TabPane tab='物料型号' key={pane.key} closable={isClosable}>
                            <PageHeaderLayout title="物料型号" wrapperClassName="pageContent" BreadcrumbList={bcList18}>
                                <TMaterialModel/>
                            </PageHeaderLayout>
                        </TabPane>);
                break;
            case "TProductModel":
                const bcList19 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '生产资料',
                  href: '/',
                  }, {
                  title: '产品型号',
                  }];
                return (<TabPane tab='产品型号' key={pane.key} closable={isClosable}>
                            <PageHeaderLayout title="产品型号" wrapperClassName="pageContent" BreadcrumbList={bcList19}>
                                <TProductModel/>
                            </PageHeaderLayout>
                        </TabPane>);
                break;
            case "TBomList":
                const bcList20 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '生产资料',
                  href: '/',
                  }, {
                  title: 'BOM表',
                  }];
                return (<TabPane tab='BOM管理' key={pane.key} closable={isClosable}>
                            <PageHeaderLayout title="BOM管理" wrapperClassName="pageContent" BreadcrumbList={bcList20}>
                                <TBomList/>
                            </PageHeaderLayout>
                        </TabPane>);
                break;
            case "TWarningHistory":
                const bcList21 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '报表中心',
                  href: '/',
                  }, {
                  title: '报警历史',
                  }];
                return (<TabPane tab='报警历史' key={pane.key} closable={isClosable}>
                            <PageHeaderLayout title="报警历史" wrapperClassName="pageContent" BreadcrumbList={bcList21}>
                                <TWarningHistory/>
                            </PageHeaderLayout>
                        </TabPane>);
                break;
            case "TUserList":
                return <TabPane tab='用户列表' key={pane.key} closable={isClosable}><TUserList /></TabPane>; break;
            case "TAuthList":
                const bcList30 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '车间管理',
                  href: '/',
                  }, {
                  title: '车间类别',
                  }];
                return (<TabPane tab='权限列表' key={pane.key} closable={isClosable}>
                            <PageHeaderLayout title="权限列表" wrapperClassName="pageContent" BreadcrumbList={bcList30}>
                                <TAuthList />
                            </PageHeaderLayout>
                        </TabPane>);
                break;
            case "TAuthGroupList":
            return <TabPane tab='权限组管理' key={pane.key} closable={isClosable}><TAuthGroupList /></TabPane>; break;
            case "TWarningConfig":
                const bcList27 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '系统设置',
                  href: '/',
                  }, {
                  title: '报警配置',
                  }];
                return (<TabPane tab='报警配置' key={pane.key} closable={isClosable}>
                            <PageHeaderLayout title="报警配置" wrapperClassName="pageContent" BreadcrumbList={bcList27}>
                                <TWarningConfig/>
                            </PageHeaderLayout>
                        </TabPane>);
                // return <TabPane tab='报警配置' key={pane.key}><TWarningConfig/></TabPane>; break;
            case "TParameterList":
                  return <TabPane tab='参数列表' key={pane.key}><TParameterList/></TabPane>; break;
            case "TModifyRecord":
                  return <TabPane tab='修改记录' key={pane.key}><TModifyRecord/></TabPane>; break;
            case "TParameterScada":
                  return <TabPane tab='参数监控' key={pane.key}><TParameterScada/></TabPane>; break;
            case "TParameterAnalysis":
                  return <TabPane tab='参数分析' key={pane.key}><TParameterAnalysis/></TabPane>; break;
            case "TLossTimeReport":
                const bcList22 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '报表中心',
                  href: '/',
                  }, {
                  title: '生产追踪',
                  }];
                return (<TabPane tab='生产追踪' key={pane.key} closable={isClosable}>
                            <PageHeaderLayout title="生产追踪" wrapperClassName="pageContent" BreadcrumbList={bcList22}>
                                <TLossTimeReport/>
                            </PageHeaderLayout>
                        </TabPane>);
                break;
            case "TTimeStatusReport":
                const bcList23 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '报表中心',
                  href: '/',
                  }, {
                  title: '车间状态统计',
                  }];
                return (<TabPane tab='车间状态统计' key={pane.key} closable={isClosable}>
                            <PageHeaderLayout title="车间状态统计" wrapperClassName="pageContent" BreadcrumbList={bcList23}>
                                <TStateTimeOverview/>
                            </PageHeaderLayout>
                        </TabPane>);
                break;
                // return <TabPane tab='时间状态报表' key={pane.key}><TStateTimeOverview/></TabPane>; break;
            case "TReportOEE_General":
                  return <TabPane tab='OEE报表' key={pane.key} ><TOEEReport/></TabPane>; break;
            case "TProductionReport":
                const bcList24 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '报表中心',
                  href: '/',
                  }, {
                  title: '生产报表',
                  }];
                return (<TabPane tab='生产报表' key={pane.key} closable={isClosable}>
                            <PageHeaderLayout title="生产报表" wrapperClassName="pageContent" BreadcrumbList={bcList24}>
                                <TProductionReport/>
                            </PageHeaderLayout>
                        </TabPane>);
                break;
                // return <TabPane tab='生产报表' key={pane.key}><TProductionReport/></TabPane>; break;
            case "TOEEAnalysis":
                const bcList25 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '报表中心',
                  href: '/',
                  }, {
                  title: 'OEE分析报表',
                  }];
                return (<TabPane tab='OEE分析报表' key={pane.key} closable={isClosable}>
                            <PageHeaderLayout title="OEE分析报表" wrapperClassName="pageContent" BreadcrumbList={bcList25}>
                                <TOEEAnalysis/>
                            </PageHeaderLayout>
                        </TabPane>);
                break;

            case "TMt_Plan":

                return (<TabPane tab='维保方案' key={pane.key} closable={isClosable}>
                            <PageHeaderLayout title="维保方案" wrapperClassName="pageContent">
                                <MaintainPlan/>
                            </PageHeaderLayout>
                        </TabPane>);
                break;

            case "TAboutSupport":
                  return (<TabPane tab='技术支持' key={pane.key}>
                            <PageHeaderLayout title="技术支持" wrapperClassName="pageContent">
                                <TTechnicalSupport/>
                                {/* <TOEEAnalysis/> */}
                            </PageHeaderLayout>
                        </TabPane>);
                break;
            case "TDA_Terminal":
                const bcList26 = [{
                  title:"首页",
                  href: '/',
                  }, {
                  title: '系统设置',
                  href: '/',
                  }, {
                  title: '终端管理',
                  }];
                /*return (<TabPane tab='终端管理' key={pane.key}>
                            <PageHeaderLayout title="终端管理" wrapperClassName="pageContent" BreadcrumbList={bcList26}>
                                <TDA_Terminal/>
                            </PageHeaderLayout>
                        </TabPane>);*/
                return <TabPane tab='终端管理' key={pane.key} closable={isClosable}><TDA_Terminal/></TabPane>; break;
            case "TDemo":
                  return <TabPane tab='组件DEMO' key={pane.key}><ComponentsDemo/></TabPane>; break;
            default:return <TabPane tab='未知' key={pane.key}></TabPane>;
         }
       })
       this.setState({pageContent:arr})
    }

    render() {
        const { content } = this.props;

        return (
            <div>
                <Tabs
                  hideAdd
                  onChange={this.onChange}
                  activeKey={this.state.activeKey}
                  type="editable-card"
                  animated={false}
                  onEdit={this.onEdit}
                  style={{margin:0}}
                  // tabBarExtraContent={
                  //     (<span><Icon
                  //         type="close"
                  //         className="clearTabBottom"
                  //         onClick={this.clearTab.bind(this)}/></span>)
                  // }
                >
                    {/* {
                      this.state.panes.map(function(pane){
                        switch(pane.key){
                          case "THome":return <TabPane tab='首页' key={pane.key}><THome/></TabPane>; break;
                          case "TScadaWorkShop_Auto":
                              const breadcrumbList = [{
                                title: '一级菜单',
                                href: '/',
                                }, {
                                title: '二级菜单',
                                href: '/',
                                }, {
                                title: '三级菜单',
                                }];
                            return(<TabPane tab='自动车间一' key={pane.key}>
                                <PageHeaderLayout BreadcrumbList={breadcrumbList}>
                                    <TScadaWorkShop_Auto/>
                                </PageHeaderLayout>
                                </TabPane>);
                              break;
                          case "TScadaWorkShop_Auto2":
                              return(<TabPane tab='自动车间二' key={pane.key}>
                                    <TScadaWorkShop_Auto2/>
                                </TabPane>)
                                break;
                          case "TScada_CY":
                              return(<TabPane tab='冲压车间' key={pane.key}><TScadaPunchingworkshop/></TabPane>)
                            break;
                          case "TScada_ZS":
                              return(<TabPane tab='注塑车间' key={pane.key}><TScadaInjectionWorkshop/></TabPane>)
                            break;
                          case "TManufactureOrder":
                              return(<TabPane tab='订单管理' key={pane.key}>
                                      <TManufactureOrder/>
                                  </TabPane>);
                              break;
                          case "TManufactureTask":
                            return(<TabPane tab='任务排程' key={pane.key}>
                                    <TOrderScheduling/>
                                </TabPane>);
                            break;
                          case "TManufactureTaskDispatch":
                              return (<TabPane tab='生产派工' key={pane.key}>
                                          <TManufactureTaskDispatch/>
                                      </TabPane>);
                                      break;
                          case "TWorkShopType":
                            return (<TabPane tab='车间类别' key={pane.key}>
                                    <TWorkShopType/>
                                    </TabPane>);
                                    break;
                          case "TWorkShopList":
                            return <TabPane tab='车间列表' key={pane.key}><TWorkShopList/></TabPane>; break;
                          case "TWorkCenterType":
                          return <TabPane tab='工作中心类别' key={pane.key}><TWorkCenterType/></TabPane>; break;
                          case "TWorkCenter":
                          return <TabPane tab='工作中心' key={pane.key}><TWorkCenter detail={content}/></TabPane>; break;
                          case "TDeviceCategory":
                          return <TabPane tab='设备类别' key={pane.key}><TDeviceType/></TabPane>; break;
                          case "TDeviceModel":
                          return <TabPane tab='设备型号' key={pane.key}><TDeviceModel/></TabPane>; break;
                          case "TDeviceList":
                          return <TabPane tab='设备列表' key={pane.key}><TDeviceList/></TabPane>; break;
                          case "TMouldModel":
                          return <TabPane tab='模具列表' key={pane.key}><TMouldModel/></TabPane>; break;
                          case "TMouldList":
                          return <TabPane tab='模具型号' key={pane.key}><TMouldList/></TabPane>; break;
                          case "TMaterialType":
                          return <TabPane tab='物料类别' key={pane.key}><TMaterialType/></TabPane>; break;
                          case "TMaterialModel":
                          return <TabPane tab='物料型号' key={pane.key}><TMaterialModel/></TabPane>; break;
                          case "TProductModel":
                          return <TabPane tab='产品型号' key={pane.key}><TProductModel/></TabPane>; break;
                          case "TBomList":
                          return <TabPane tab='BOM管理' key={pane.key}><TBomList detail={content}/></TabPane>; break;
                          case "TWarningHistory":
                          return <TabPane tab='报警记录' key={pane.key}><TWarningHistory/></TabPane>; break;
                          case "TUserList":
                          return <TabPane tab='用户列表' key={pane.key}><TUserList detail={content}/></TabPane>; break;
                          case "TAuthList":
                          return <TabPane tab='权限列表' key={pane.key}><TAuthList detail={content}/></TabPane>; break;
                          case "TAuthGroupList":
                          return <TabPane tab='权限组管理' key={pane.key}><TAuthGroupList detail={content}/></TabPane>; break;
                          case "TWarningConfig":
                                return <TabPane tab='报警配置' key={pane.key}><TWarningConfig/></TabPane>; break;
                          case "TParameterList":
                                return <TabPane tab='参数列表' key={pane.key}><TParameterList/></TabPane>; break;
                          case "TModifyRecord":
                                return <TabPane tab='修改记录' key={pane.key}><TModifyRecord/></TabPane>; break;
                          case "TParameterScada":
                                return <TabPane tab='参数监控' key={pane.key}><TParameterScada/></TabPane>; break;
                          case "TParameterAnalysis":
                                return <TabPane tab='参数分析' key={pane.key}><TParameterAnalysis/></TabPane>; break;
                          case "TLossTimeReport":
                                return <TabPane tab='损失时间报表' key={pane.key}><TLossTimeReport/></TabPane>; break;
                          case "TTimeStatusReport":
                                return <TabPane tab='时间状态报表' key={pane.key}><TStateTimeOverview/></TabPane>; break;
                          case "TReportOEE_General":
                                return <TabPane tab='OEE报表' key={pane.key}><TOEEReport/></TabPane>; break;
                          case "TProductionReport":
                                return <TabPane tab='生产报表' key={pane.key}><TProductionReport/></TabPane>; break;
                          case "TOEEAnalysis":
                                return <TabPane tab='OEE分析报表' key={pane.key}><TOEEAnalysis/></TabPane>; break;
                          case "TAboutSupport":
                                return <TabPane tab='技术支持' key={pane.key}><TTechnicalSupport/></TabPane>; break;
                          case "TDA_Terminal":
                                return <TabPane tab='终端管理' key={pane.key}><TDA_Terminal/></TabPane>; break;
                          case "TDemo":
                                return <TabPane tab='组件DEMO' key={pane.key}><ComponentsDemo/></TabPane>; break;
                          default:return <TabPane tab='未知' key={pane.key}></TabPane>;
                       }
                     })
                    } */}
                        {
                            this.state.pageContent.map((item)=>{return item;})
                        }
                </Tabs>
            </div>
        );
    }

}
