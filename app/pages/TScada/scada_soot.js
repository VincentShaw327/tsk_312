/**
 *这是设备类别页
 *添加日期:2017.12.05
 *添加人:shaw
 * */
// /* eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Tag, Divider, Popconfirm } from 'antd';
import moment from 'moment'
import { category_list, category_add, category_update, category_delete } from 'actions/product';
import { workcenter_list } from 'actions/work'
import SimpleTable from 'components/TTable/SimpleTable';
import mqtt from 'mqtt';
// import 'antd/lib/table/style/css';
import LOGO from '../../images/logo.png';
import './index.css'
// import { CreateModal, UpdateModal } from 'components/TModal';
// import { SimpleQForm, StandardQForm } from 'components/TForm';
// import { fn_mes_trans } from 'functions'
// import PageHeaderLayout from '../../base/PageHeaderLayout';

let client
@connect( ( state, props ) => ( {
    workCenter: state.workCenter,
    productCategory: state.productCategory,
} ) )
export default class category extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            // tableDataList: [],
            // total: 0,
            current: 0,
            pageSize: 10,
            updateFromItem: {},
            UModalShow: false,
            // loading: true,
        }
    }

    componentWillMount() {
        // this.getWorkcenterList();
        const obj = {
            orders: [
                { key: 'strCenterName', dir: 1 },
            ],
        }
        this.props.dispatch( workcenter_list( obj, ( respose ) => {
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
        const { pageSize, current } = this.state;
        const page = { page: current, size: pageSize }
        const { list } = this.props.productCategory;
        if ( Array.isArray( list ) && list.length === 0 ) {
            this.props.dispatch( category_list( page, ( respose ) => {} ) )
            // console.log( '...请求list...' );
        }

        setInterval( () => {
            this.setState( { timing: moment().format( 'YYYY/MM/DD H:mm:ss' ) } )
        }, 500 );

        this.subscribeMQTT();
    }

    handleTableChange=( pagination ) => {
        // console.log( 'pagination', pagination );
        const { current, pageSize } = pagination;
        this.setState( { current: current, pageSize, loading: true }, () => {
            // console.log( '条件', this.state, this.getQuePage() )
            const page = { page: current - 1, size: pageSize }
            this.props.dispatch( category_list( page, ( respose ) => {} ) )
        } );
    }

    subscribeMQTT() {
        // mqtt消息连接建立
        // client = mqtt.connect( 'ws://192.168.3.231:8083/mqtt' );
        client = mqtt.connect( 'ws://47.91.154.238:8083/mqtt' );

        // client = mqtt.connect( 'mqtt://192.168.200.3:9011' );
        client.on( 'connect', () => {
            // 订阅消息
            // client.subscribe( 'SOOT_TEST_ANDROID_MSG_TO_SERVER' )
            client.subscribe( 'TEST_DATA_SOOT' )
        } )
        let renderaEquip = [];
        client.on( 'message', ( topic, payload ) => {
            // 接收到mqtt消息推送数据
            const mqttData = JSON.parse( payload );
            let MList = [];
            // console.log( '接收到MQTT信息', mqttData );
            // console.table( mqttData );
            if ( Array.isArray( mqttData ) ) {
                renderaEquip = this.state.aEquipList.map( ( item, i ) => {
                    mqttData.forEach( ( mqttItem ) => {
                        if ( item.uObjectUUID === mqttItem.uObjectUUID ) {
                            item = Object.assign( item, mqttItem )
                        }
                        return item
                    } )
                    return item
                } )
                this.setState( {
                    aEquipList: renderaEquip,
                } )
            }
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
        const {
            // loading,
            current,
            // total,
            pageSize,
            aEquipList,
        } = this.state;
        const { list, total, loading } = this.props.productCategory;
        const Data = {
            // list: list,
            list: aEquipList,
            // list:tableDataList,
            // pagination: { total, current, pageSize },
        };
        const pagination = { total, current, pageSize: 100 };

        const Tcolumns = [
            {
                title: '状态',
                align: 'center',
                dataIndex: 'nStatus',
                onHeaderCell: () => ( { className: 'headcell' } ),
                render: ( str, item ) => {
                    let stateObj = {};
                        if ( item.task_progress && item.task_progress >= 100 ) {
                            stateObj = { text: '已完成', color: '#FFFFFF' };
                        } else if ( item.nStatus && item.nStatus === 1 ) {
                            stateObj = { text: '初始化', color: '#736859' };
                        } else if ( item.nStatus && item.nStatus === 6 ) {
                            stateObj = { text: '生产中', color: 'rgba(82, 196, 26, 0.84)' };
                        } else if ( item.nStatus && item.nStatus === 9 ) {
                            stateObj = { text: '报警中', color: '#EC414D' };
                        } else if ( item.nStatus && ( item.nStatus === 2 ) ) {
                            stateObj = { text: '待机中', color: '#888d18' };
                        } else if ( item.nStatus && ( item.nStatus === 0 || item.nStatus === 3 || item.nStatus === 4 || item.nStatus === 5 || item.nStatus === 7 || item.nStatus === 8 ) ) {
                            stateObj = { text: '调模中', color: '#5004ac' };
                        } else { stateObj = { text: '离线中', color: '#bfbfbf' }; }
                    // return ( <Tag color={`${stateObj.color}`} style={{ marginTop: 30, fontSize: 'larger' }}>{stateObj.text}</Tag> )
                    return (
                    <Tag
                      color={`${stateObj.color}`}
                      style={{
                          marginTop: 10,
                          fontSize: 'larger',
                        }}
                    >
                        {stateObj.text}
                    </Tag> )
                    // return <span className="row-cell" style={{ color: stateObj.color }}>{stateObj.text}</span>
                },
            },
            {
                title: '编号',
                align: 'center',
                dataIndex: 'strCenterName',
                onHeaderCell: () => ( { className: 'headcell' } ),
                render: str => <span className="row-cell" >{str}</span>,
            },
            {
                title: '吨位',
                align: 'center',
                dataIndex: 'nTon',
                onHeaderCell: () => ( { className: 'headcell' } ),
                render: str => <span className="row-cell" >{str}</span>,
            },
            {
                title: '当前冲速',
                align: 'center',
                dataIndex: 'nSPM_Act',
                onHeaderCell: () => ( { className: 'headcell' } ),
                render: str => <span className="row-cell" >{str}</span>,
            },
            {
                title: '工单号',
                align: 'center',
                dataIndex: 'strJobNo',
                onHeaderCell: () => ( { className: 'headcell' } ),
                render: str => <span className="row-cell" >{str}</span>,
            },
            {
                title: '产品',
                align: 'center',
                dataIndex: 'strProductName',
                onHeaderCell: () => ( { className: 'headcell' } ),
                render: str => <span className="row-cell" >{str}</span>,
            },
            {
                title: '模具',
                align: 'center',
                dataIndex: 'strMoldNo',
                onHeaderCell: () => ( { className: 'headcell' } ),
                render: str => <span className="row-cell" >{str}</span>,
            },
            {
                title: '计划产量',
                align: 'center',
                dataIndex: 'nProductPlan',
                onHeaderCell: () => ( { className: 'headcell' } ),
                render: str => <span className="row-cell" >{str}</span>,
            },
            {
                title: '当前产量',
                align: 'center',
                dataIndex: 'nProductNow',
                onHeaderCell: () => ( { className: 'headcell' } ),
                render: str => <span className="row-cell" >{str}</span>,
            },
        ];


        return (
            <div className="sfsdf" style={{ background: '#107ECB' }}>
                {/* <SimpleTable */}
                <div className="scada-header">
                    <img className="header-logo" alt="LOGO" src={LOGO} />
                    <h1 className="header-title">索特电气冲压车间监控看板</h1>
                    <span className="header-time">{this.state.timing}</span>
                </div>
                <Table
                  size="middle"
                //   scroll={{ y: 1080, x: 1920 }}
                  loading={loading}
                  dataSource={aEquipList}
                //   pagination={pagination}
                  pagination={false}
                  columns={Tcolumns}
                //   isHaveSelect={false}
                //   bordered
                  onChange={this.handleTableChange}
                  onHeaderRow={column => ( {
                      onClick: () => {}, // 点击表头行
                    //   onMouseEnter: () => {},
                      className: 'scada_soot',
                    } )}
                  onRow={( recod, index ) => ( {
                      className: `scada-row scada-row-${index % 2}`,
                    } )}
                />
            </div>
        )
    }
}
