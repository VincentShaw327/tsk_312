/**
 *这是设备列表页
 *添加日期:2017.12.20
 * */
/** ****引入ant或其他第三方依赖文件****************** */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Row, Col, Progress, Tag, List, message } from 'antd';
import { workcenter_list } from 'actions/work'
import { TPostData, urlBase } from 'utils/TAjax';
// import { yuan, Pie } from 'components/ant-design-pro/Charts';
import mqtt from 'mqtt';
import PageHeaderLayout from '../../base/PageHeaderLayout';
import AM1 from '../../images/assets/timg.jpg'

let client


@connect( ( state, props ) => ( {
    workCenter: state.workCenter,
    Breadcrumb: state.Breadcrumb,
    MockMqttData: state.MockMqttData,
} ) )
export default class TScadaWorkShop_Auto extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            // 单台机台数据状态
            // aEquipList: [],
            // -1 离线, 0 空闲, 1 调机,  2 运行, 3 报警
            aEquipList: [],
            stateCount: [],
            offLine: 0,
            standby: 0,
            debug: 0,
            running: 0,
            warning: 0,
            // allQuery: 0,
            loading: false,
        }
    }
    // 查询工作中心
    componentWillMount() {
        // this.getWorkcenterList();
        this.props.dispatch( workcenter_list( { num: 12 }, ( respose ) => {
            console.log( 'workcenter  espose===', respose )
            const init_data = {
                // nDeviceUUID = 0;  // 机台UUID
                // strMachineID: 'A00', // 机台编号
                nStatus: -1, // 机台状态, -1 离线, 0 空闲, 1 调机,  2 运行, 3 报警
                nError: 0, // 报警状态, 0表示误报警, 其它代表报警代号
                nTon: 45, // 吨位
                nSPM: 0, // 冲次, 每分钟冲多少次
                strJobNo: '-', // 工单号
                nProductNow: 0, // 当前工单,当前产量
                nProductPlan: 0, // 当前工单,计划产量
                nProductTotal: 0, // 当前工单, 累计产量
                nProductCapacity: 0, // 产能, 每分钟产量
                uProductUUID: 0, // 产品UUID,用于查询和跳转
                strMoldNo: '579.744.02', // 模具编号
                strProductName: '插套', // 产品名称
                strProductModel: 'NEWT-L', // 产品型号
            }
            const datalist = respose.data.list.map( ( item, index ) => ( Object.assign( item, init_data, { key: index } ) ) )
            this.setState( {
                aEquipList: datalist,
                offLine: datalist.length,
            } )
        } ) )
    }

    componentDidMount() {
        // if(!this.hasOwnProperty("timer")){
        // }
        // this.timer=setInterval(()=>{
        //     this.props.dispatch( mockMqttData( { wclist: this.state.aEquipList }, ( respose ) => {} ))
        //
        // },5000)

        this.subscribeMQTT();
    }

    componentWillUnmount() {
        // client.end()
        // clearInterval( this.timer )
    }

    /* shouldComponentUpdate(nextprops,nextstate,c){
        console.log('shouldComponentUpdate',nextprops,nextstate,c)

        if(nextprops.hasOwnProperty('workcenter')&&nextprops.workcenter.workcenterList.length>0){
            return true;
        }
    } */

    getWorkcenterList() {
        // 获取相应车间的工作中心
        const aEquipList = [];
        const dat = {
            PageIndex: 0,
            PageSize: -1,
            WorkshopUUID: 1, // 所属车间UUID，不作为查询条件时取值设为-1
            TypeUUID: -1, // 类型UUID，不作为查询条件时取值设为-1
            KeyWord: '',
        };
        TPostData(
            '/wc_list01',
            'ListActive',
            dat,
            ( res ) => {
                console.log( '工作中心列表===', res );
                const Ui_list = res.obj.objectlist || [];
                const totalcount = res.obj.objectlist.length;
                Ui_list.forEach( ( item, index ) => {
                    aEquipList.push( {
                        key: index,
                        // ID: item.ID,
                        ID: `AUTO_SMT${item.id}`,
                        UUID: item.UUID,
                        WorkshopUUID: item.WorkshopUUID,
                        Name: item.Name,
                        Image: item.Image,
                        style: 'top-equip-light',
                    } )
                } );
                // 初始化设备状态图标
                const InitstateCount = [
                    {
                        x: '报警',
                        y: 0,
                    },
                    {
                        x: '离线',
                        y: aEquipList.length,
                    },
                    {
                        x: '运行',
                        y: 0,
                    },
                    {
                        x: '待机',
                        y: 0,
                    },
                ];
                this.setState( {
                    aEquipList: aEquipList,
                    stateCount: InitstateCount,
                    loading: false,
                } )
            },
            ( error ) => {
                message.error( error );
                this.setState( { loading: false } );
            },
        )
    }

    subscribeMQTT() {
        // mqtt消息连接建立
        client = mqtt.connect( 'ws://192.168.3.231:8083/mqtt' );
        // client = mqtt.connect( 'ws://47.91.154.238:8083/mqtt' );

        // client = mqtt.connect( 'mqtt://192.168.200.3:9011' );
        client.on( 'connect', () => {
            // 订阅消息
            client.subscribe( 'SOOT_TEST_ANDROID_MSG_TO_SERVER' )
            // client.subscribe( '0101/086325608001/201712290001/kanban/01/B' );
            // client.subscribe( "0101/086325608001/201712290001/kanban/01/A" );
            // client.subscribe( 'topstarltd/iec/app/#' )
        } )
        let renderaEquip = [];
        client.on( 'message', ( topic, payload ) => {
            // 接收到mqtt消息推送数据
            const mqttData = JSON.parse( payload );
            let MList = [];
            // console.log( '接收到MQTT信息', mqttData );
            if ( mqttData.nDeviceUUID ) {
                MList = this.state.aEquipList.map( ( item, index ) => {
                    let obj = {};
                    if ( item.uObjectUUID === mqttData.nDeviceUUID ) {
                        obj = Object.assign( item, mqttData )
                    }
                    return obj;
                } )
                this.setState( { aEquipList: MList }, () => {
                    let u_standby;
                    let u_offLine;
                    let u_debug;
                    let u_running;
                    let u_warning;
                    this.state.aEquipList.forEach( ( item ) => {
                        switch ( item.nStatus ) {
                            case 0:
                            case 1:
                            case 2:
                                u_standby += 1;
                               break;
                            case 3:
                            case 4:
                            case 5:
                            case 7:
                            case 8:
                                u_debug += 1;
                               break;
                            case 6:
                                u_running += 1;
                               break;
                            case 9:
                                u_warning += 1;
                               break;
                            case -1:
                                u_offLine += 1;
                               break;
                            default:
                                u_offLine += 1;
                                break;
                        }
                    } );
                    this.setState( {
                         standby: u_standby,
                         offLine: u_offLine,
                         debug: u_debug,
                         running: u_running,
                         warning: u_warning,
                    } )
                } );
            }

            // 判断消息包内有数据的情况下,把数据更新至组件.
            if ( mqttData && Array.isArray( mqttData.data ) ) {
                renderaEquip = this.state.aEquipList.map( ( item, i ) => {
                    // 判断接受消息是哪一台机器
                    mqttData.data.forEach( ( mqttItem, index ) => {
                        if ( item.UUID === mqttItem.workstation ) {
                            item.key = i
                            item.Status = mqttItem.run_status
                            item.prod_count = mqttItem.finished // 产量
                            item.prod_rate = mqttItem.capacity // 产能
                            item.plan = mqttItem.plan // 计划
                            item.product = mqttItem.product
                            // item.rej_count = mqttItem.data.rej_count //不良数
                            // item.rej_rate = mqttItem.data.rej_rate //不良率
                            // item.task_finish = mqttItem.task.task_finish //完成比例
                            // item.task_progress = mqttItem.finished_ratio //完成进度
                            // item.task_no = mqttItem.task.task_no //工单号
                            // item.task_name = mqttItem.task.task_name //产品名称
                            return item;
                        }

                            return item
                    } )
                    return item;
                } )
                // console.log( 'renderaEquip', renderaEquip );

                this.setState( {
                    loading: false, // 加载完毕取消蒙城
                    aEquipList: renderaEquip,
                    // allQuery: renderaEquip.length,
                    // onLine: g,
                    // warning: w,
                    // offLine: renderaEquip.length - w - g
                } )
            }
            if ( mqttData && mqttData.statics ) {
                const Mstatics = mqttData.statics;
                const MstateCount = [
                    {
                        x: '报警',
                        y: Mstatics.failure,
                    },
                    {
                        x: '离线',
                        y: Mstatics.offline,
                    },
                    {
                        x: '运行',
                        y: Mstatics.running,
                    },
                    {
                        x: '待机',
                        y: Mstatics.stopped,
                    },
                ];
                this.setState( { stateCount: MstateCount } );
            }
        } );
    }

    render() {
        // console.log( '工作中心列表:', this.state.aEquipList );
        const {
            aEquipList,
            offLine,
            standby,
            debug,
            running,
            warning,
        } = this.state;
        const { Breadcrumb, MockMqttData } = this.props;
        const ListHeader = (
            <Row gutter={16} style={{ fontSize: 16 }}>
              <Col className="gutter-row" span={4}>
                <div className="gutter-box">图片</div>
              </Col>
              <Col className="gutter-row" span={4}>
                <div className="gutter-box">机台</div>
              </Col>
              <Col className="gutter-row" span={7}>
                {/* <div className="gutter-box">生产信息</div> */}
                <div className="gutter-box">工单</div>
              </Col>
              {/* <Col className="gutter-row" span={4}>
                <div className="gutter-box">产量<span style={{fontSize:10}}>(pcs)</span></div>
                <div>模具</div>
              </Col> */}
              {/* <Col className="gutter-row" span={4}>
                <div className="gutter-box">产能<span style={{fontSize:10}}>(pcs/min)</span></div>
              </Col> */}
              <Col className="gutter-row" span={7}>
                <div className="gutter-box">生产进度</div>
              </Col>
              <Col className="gutter-row" span={2}>
                <div className="gutter-box">状态</div>
              </Col>
            </Row>
        );

        const devStateView = (
            <Row>
                <Col span={5}>
                    <Progress
                      format={
                            () => (
                                <div>
                                    <a>{running}台</a>
                                    <div style={{ marginTop: 12, fontSize: '14px' }}>运行中</div>
                                </div>
                            )
                        }
                      percent={running / offLine}
                      type="circle"
                    />
                </Col>
                <Col span={5}>
                    <Progress
                      format={
                            ( percent, successPercent ) => (
                                <div>
                                    <a>{debug}台</a>
                                <div style={{ marginTop: 12, fontSize: '14px' }}>调机中</div>
                                </div>
                            )
                        }
                      percent={debug / offLine}
                      strokeColor="#1ccde6"
                      type="circle"
                    />
                </Col>
                <Col span={5}>
                    <Progress
                      format={
                            ( percent, successPercent ) => (
                                <div>
                                    <a>{standby}台</a>
                                <div style={{ marginTop: 12, fontSize: '14px' }}>待机中</div>
                                </div>
                            )
                        }
                      percent={standby / offLine}
                      strokeColor="#18c81f"
                      type="circle"
                    />
                </Col>
                <Col span={5}>
                    <Progress
                      format={
                            ( percent, successPercent ) => (
                                <div>
                                    <a>{warning}台</a>
                                <div style={{ marginTop: 12, fontSize: '14px' }}>告警中</div>
                                </div>
                            )
                        }
                      percent={( warning / offLine ) * 100}
                      strokeColor="#f0200c"
                      type="circle"
                    />
                </Col>
                <Col span={4}>
                    <Progress
                      format={
                            ( percent, successPercent ) => (
                                <div>
                                    <a>{offLine}台</a>
                                <div style={{ marginTop: 12, fontSize: '14px' }}>离线中</div>
                                </div>
                            )
                        }
                      percent={( offLine / offLine ) * 100}
                      strokeColor="#6c6c6c"
                      type="circle"
                    />
                </Col>
            </Row>
        )

        const bcList = [{
          title: '首页',
          href: '/',
          }, {
          title: '车间监控',
          href: '/',
          }];
        return (
            <PageHeaderLayout
                // title="车间监控"
              wrapperClassName="pageContent"
              content={devStateView}
              BreadcrumbList={bcList}
            >
                <div style={{ marginTop: 15 }}>
                    <Row gutter={16}>
                      <Col className="gutter-row" span={24}>
                        <div className="gutter-box" style={{ background: '#fff' }}>
                            <List
                                // style={{width:'75%'}}
                              header={ListHeader}
                                // footer={<div>Footer</div>}
                              loading={this.props.workCenter.loading}
                              bordered
                              dataSource={aEquipList}
                                // dataSource={this.props.MockMqttData.List}
                              renderItem={( item ) => {
                                    let stateObj = {};
                                    if ( item.task_progress && item.task_progress >= 100 ) {
                                        stateObj = { text: '已完成', color: 'blue' };
                                    } else if ( item.nStatus && item.nStatus === 6 ) {
                                        stateObj = { text: '生产中', color: 'rgba(82, 196, 26, 0.84)' };
                                    } else if ( item.nStatus && item.nStatus === 9 ) {
                                        stateObj = { text: '报警中', color: '#ffc069' };
                                    } else if ( item.nStatus && ( item.nStatus === 0 || item.nStatus === 1 || item.nStatus === 2 ) ) {
                                        stateObj = { text: '待机中', color: '#4184de' };
                                    } else if ( item.nStatus && ( item.nStatus === 3 || item.nStatus === 4 || item.nStatus === 5 || item.nStatus === 7 || item.nStatus === 8 ) ) {
                                        stateObj = { text: '调机中', color: '#4184de' };
                                    } else { stateObj = { text: '离线中', color: '#bfbfbf' }; }
                                    // else if(item.hasOwnProperty('Status')&&item.Status=== -1)

                                    return (
                                            <List.Item>
                                                <Row gutter={16} type="flex" justify="space-around" align="middle" style={{ border: 'solid 0px', width: '100%' }}>
                                                    <Col className="gutter-row" span={3}>
                                                        <div className="gutter-box">
                                                            <img src={AM1} style={{ width: '90%' }} />
                                                            {/* <img src={urlBase+item.Image} style={{width:"100%"}} /> */}
                                                        </div>
                                                    </Col>
                                                    <Col className="gutter-row" span={4}>
                                                        <div className="gutter-box">
                                                            {/* <p>{item.Name}</p>
                                                            <p>{item.ID}</p> */}
                                                            <div>编号：{item.strMachineID || item.strCenterName}</div>
                                                            <div>吨位：{item.nTon}</div>
                                                            <div>冲速：{item.nSPM}</div>
                                                        </div>
                                                    </Col>
                                                    <Col className="gutter-row" span={7}>
                                                        <div className="gutter-box">
                                                            {/* <div style={{color:'#1b8ff6',fontSize:20}}>{item.task_no?item.task_no:'P20180207'}</div> */}
                                                            {/* <div>{item.strProductName?item.strProductName:'-'}</div> */}
                                                            <div>工单号：{item.strJobNo}</div>
                                                            <div>产品：{item.strProductName}</div>
                                                            <div>模具：{item.strMoldNo}</div>
                                                            {/* <div>产品型号：{item.strProductModel}</div> */}
                                                        </div>
                                                    </Col>
                                                    {/* <Col className="gutter-row" span={3}>
                                                        <div className="gutter-box">
                                                            <span>{item.hasOwnProperty('nProductNow')?item.nProductNow:'-'}</span>
                                                            <div>产品名称：{item.strProductName}</div>
                                                            <div>产品型号：{item.strProductModel}</div>
                                                            <div>模具编号：{item.strMoldNo}</div>
                                                            <div>冲速：{item.nSPM}</div>
                                                        </div>
                                                    </Col> */}
                                                    {/* <Col className="gutter-row" span={3}>
                                                        <div className="gutter-box">
                                                            <span>{item.hasOwnProperty('prod_rate')?item.prod_rate:'-'}</span>
                                                        </div>
                                                    </Col> */}
                                                    <Col className="gutter-row" span={7}>
                                                        <div className="gutter-box">
                                                            {/* <span>{item.prod_count||0}/{item.plan||0}</span> */}
                                                            <div>计划：{item.nProductPlan}</div>
                                                            <div>当前：{item.nProductNow}</div>
                                                            <div>累积：{item.nProductTotal}</div>
                                                            <Progress
                                                                // type="dashboard"
                                                                // width={25}
                                                              status={
                                                                    item.nStatus === 1 ? 'active' :
                                                                    item.nStatus === 2 ? 'exception' : 'normal'
                                                                }
                                                                // percent={parseFloat(((item.prod_count/item.plan )*100|| 0).toFixed(2))}
                                                              percent={parseFloat( ( ( item.nProductNow / item.nProductPlan ) * 100 || 0 ).toFixed( 2 ) )}
                                                              strokeWidth={15}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col className="gutter-row" span={2}>
                                                        <Tag
                                                          color={`${stateObj.color}`}
                                                          style={{ marginTop: 30, fontSize: 'larger' }}
                                                        >{stateObj.text}
                                                        </Tag>
                                                        &nbsp;&nbsp;
                                                        {/* <div>告警：{item.nError}</div> */}
                                                    </Col>
                                                </Row>
                                            </List.Item>
                                        )
                                    }
                                }
                            />
                        </div>
                      </Col>
                      {/* <Col className="gutter-row" span={6}>
                        <div className="gutter-box">
                            <Card title="状态统计">
                                <Dailychart />
                                <Pie
                                  hasLegend
                                  title="销售额"
                                  subTitle="设备状态"
                                  // total={yuan(salesPieData.reduce((pre, now) => now.y + pre, 0))}
                                  // total={"总共"+ this.state.stateCount.reduce((pre, now) => now.y + pre, 0)+"台"}
                                  total={"总共"+ MockMqttData.stateCount.reduce((pre, now) => now.y + pre, 0)+"台"}
                                  // total={()=>{
                                  //   let total=this.state.stateCount.reduce((pre, now) => now.y + pre, 0);
                                  //   return <span>{total}</span>
                                  // }}
                                  // data={this.state.stateCount}
                                  data={MockMqttData.stateCount}
                                  valueFormat={val =>('&nbsp;&nbsp'+val+'台')}
                                  // valueFormat={val => yuan(val)}
                                  height={294}
                                />
                            </Card>
                            <Card title="时间统计"  style={{marginTop:20}}>
                                <Barchart />
                            </Card>
                        </div>
                      </Col> */}
                    </Row>
                </div>
            </PageHeaderLayout>
        )
    }
}
