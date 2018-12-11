import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Table,
    Row,
    Col,
    message,
    Switch,
    Popconfirm,
} from 'antd';
import { TaskList } from 'actions/production';
import { TPostData, urlBase, TAjax } from 'utils/TAjax';
import { CModal } from 'components/TModal';
import SimpleTable from 'components/TTable/SimpleTable';
import { DropDownForm } from 'components/TForm';
import { TableExport } from 'components/Export';
import { fn_mes_trans } from 'functions'
import PageHeaderLayout from '../../base/PageHeaderLayout';
import styles from './common.less';
// import TableExport from 'tableexport';


@connect( ( state, props ) => ( {
    Breadcrumb: state.Breadcrumb,
    productTask: state.productTask,
} ) )
export default class order extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            title: props.title,
            productOrderList: [],
            LotList: [],
            BSLotList: [],
            dispatchLotList: [],
            ProModelList: [],
            workshopList: [],
            lazyWSlist: [],
            ProModelSList: [],
            WorkCenterList: [],
            moldList: [],
            selectedRow: [],
            selectedRowKeys: [],
            unscheduledNum: 0,
            selectedProductID: -1,
            WorkshopID: -1,
            currentItemWSID: -1,
            updateFromItem: {},
            defaultBSLotList: [],
            defaultBSNumber: 0,
            loading: true,
            CModalShow: false,
            UModalShow: false,
            SModalShow: false,
            BSModalShow: false,
            orderState: '-1',
            ProModelID: '-1',
            keyWord: '',
            bordered: true,
            size: 'small',
            subTableSize: 'default',
            scroll: undefined,
            hasAddBtn: false,
            total: 0,
            current: 1,
            pageSize: 10,
        }
        this.url = '/api/tmanufacture/manufacture';
    }

    componentWillMount() {
        // this.getProductOrder();
        // this.getSubTableData();
        // this.getProModelList();
        // this.getWorkCenterList();
        // this.getWorkshopList();

        this.props.dispatch( TaskList( {}, ( respose ) => {} ) )
    }

    componentDidMount() {
        // console.log('_tableExport',TableExport)
        setTimeout( () => {
            this._tableExport.export();
        }, 2000 )
    }

    getProductOrder() {
        const {
            current,
            pageSize,
            ProModelID,
            WorkshopID,
            keyWord,
            orderState,
        } = this.state;
        // let GlobalKeyword=this.props.GlobalKeyword;
        // this.setState({keyWord:this.keyWordInput.input.value});

        const dat = {
            PageIndex: current - 1,
            PageSize: pageSize,
            ProductModelUUID: ProModelID, // 产品型号UUID
            WorkshopUUID: WorkshopID, // 车间UUID
            WorkstationTypeUUID: -1, // 工作中心类型UUID
            Status: orderState, // 生产订单状态
            // KeyWord: this.keyWordInput?this.keyWordInput.input.value:''
            // KeyWord: GlobalKeyword?GlobalKeyword:keyWord
            KeyWord: keyWord,
        }
        TPostData(
            '/api/tmanufacture/manufacture/ListProductOrder', 'ListProductOrder', dat,
            ( res ) => {
                if ( res.err === 0 ) {
                    const list = [];
                    const Ui_list = res.obj.objectlist || [];
                    const totalCount = res.obj.totalcount;
                    Ui_list.forEach( ( item, index ) => {
                        list.push( {
                            key: index,
                            UUID: item.UUID,
                            WorkshopUUID: item.WorkshopUUID,
                            ID: item.ID,
                            Name: item.Name,
                            Desc: item.Desc,
                            Note: item.Note,
                            ProductUUID: item.ProductUUID,
                            ProductModelID: item.ProductModelID,
                            ProductModelName: item.ProductModelName, // 产品名称
                            WorkshopName: item.WorkshopName,
                            PlanNumber: item.PlanNumber, // 计划产量
                            ScheduleNumber: item.ScheduleNumber,
                            FinishNumber: item.FinishNumber, // 实际产量
                            RejectNumber: item.RejectNumber, // 不合格数量
                            IssuedDateTime: item.IssuedDateTime, // 下单日期
                            PlanDeliverDate: item.PlanDeliverDate, // 计划交期
                            DeliverDateTime: item.DeliverDateTime, // 实际交期
                            PlanStartDateTime: item.PlanStartDateTime, // 计划开始时间
                            StartDateTime: item.StartDateTime, // 实际开始时间
                            PlanFinishDateTime: item.PlanFinishDateTime.slice( 0, 10 ), // 计划完成时间
                            FinishDateTime: item.FinishDateTime, // 实际完成时间
                            UpdateDateTime: item.UpdateDateTime, // 更新时间
                            Status: item.Status,
                            // 状态：0 - 冻结，1-活跃，拆分 2 - 已拆分，未排程 2 - 已排程，未投产  3 - 投产，生产中   4 - 完成生产  5 - 取消/变更
                        } )
                    } )
                    this.setState( { productOrderList: list, total: totalCount, loading: false } );
                    if ( this.state.hasAddBtn === false ) {
                        const tableDom = document.getElementById( 'lotListTableWrap' )
                            .getElementsByClassName( 'ant-table-body' )[0];
                        const btnWrap = document.getElementById( 'exportLotListMenu' );
                        const btn = TableExport( tableDom.children[0] );
                        const children = btn.selectors[0].children[0];
                        const childNodes = children.getElementsByTagName( 'button' );
                        childNodes[0].innerHTML = 'xlsx';
                        childNodes[1].innerHTML = 'csv';
                        childNodes[2].innerHTML = 'txt';
                        btnWrap.appendChild( children );
                    }
                    this.setState( { hasAddBtn: true } );
                } else {
                    message.error( '数据错误！' );
                }
            },
            ( error ) => {
                message.info( error );
            },
        );
    }

    getProModelList() {
        const dat = {
            PageIndex: 0,
            PageSize: -1,
            TypeUUID: -1,
            KeyWord: '',
        }
        TPostData( '/api/TProduct/product_model', 'ListActive', dat, ( res ) => {
            const list = [];
            const slist = [];
            const data_list = res.obj.objectlist || [];
            // var totalcount = res.obj.totalcount;
            data_list.forEach( ( item, index ) => {
                list.push( {
                    key: index,
                    UUID: item.UUID,
                    Name: item.Name,
                    TypeUUID: item.TypeUUID,
                    Image: item.Image,
                    Number: item.ID,
                    SN: item.SN,
                    Version: item.Version,
                } )
            } )
            data_list.forEach( ( item, index ) => {
                slist.push( { key: index, value: item.UUID.toString(), text: item.Name } )
            } )
            this.setState( { ProModelList: list, ProModelSList: slist } );
        }, ( error ) => {
            message.info( error );
        } )
    }

    getSubTableData() {
        const dat = {
            PageIndex: 0, // 分页参数
            PageSize: -1, // 分页参数
            ProductOrderUUID: -1, // 生产订单UUID
            ProductModelUUID: -1, // 生产订单产品型号UUID
            WorkshopUUID: -1, // 车间UUID
            WorkstationTypeUUID: -1, // 工作中心类型UUID
            WorkstationUUID: -1, // 工作中心UUID
            MoldUUID: -1, // 模具UUID
            Status: -1, // 派工单状态
            KeyWord: '', // 模糊查询
        }
        TPostData( this.url, 'ListWorkOrder', dat, ( res ) => {
            const list = [];
            const Ui_list = res.obj.objectlist || [];
            Ui_list.forEach( ( item, index ) => {
                list.push( {
                    key: index,
                    UUID: item.UUID,
                    LotUUID: item.LotUUID,
                    bomUUID: item.bomUUID,
                    lotJobID: item.ID,
                    FinishDateTime: item.FinishDateTime,
                    FinishNumber: item.FinishNumber,
                    MoldModelUUID: item.MoldModelUUID,
                    PlanFinishDateTime: item.PlanFinishDateTime,
                    PlanNumber: item.PlanNumber,
                    PlanStartDateTime: item.PlanStartDateTime,
                    ProductModelID: item.ProductModelID,
                    ProductModelName: item.ProductModelName,
                    ProductModelSN: item.ProductModelSN,
                    ProductModelUUID: item.ProductModelUUID,
                    RejectNumber: item.RejectNumber,
                    StartDateTime: item.StartDateTime,
                    Status: item.Status,
                    UpdateDateTime: item.UpdateDateTime,
                    WorkstationID: item.WorkstationID,
                    WorkstationName: item.WorkstationName,
                    WorkstationUUID: item.WorkstationUUID,
                } )
            } );
            this.setState( { dispatchLotList: list } );
        }, ( error ) => {
            message.info( error );
        } )
    }

    getWorkCenterList( record ) {
        const dat = {
            PageIndex: 0,
            PageSize: -1,
            TypeUUID: -1,
            ID: '',
            WorkshopUUID: record ? record.WorkshopUUID : -1, // this.state.currentItemWSID, //所属车间UUID，不作为查询条件时取值设为-1
            KeyWord: '',
        }

        TPostData( '/api/TProcess/workcenter', 'ListActive', dat, ( res ) => {
            const list = [];
            const Ui_list = res.obj.objectlist || [];
            // console.log('查询到工作中心列表', Ui_list);
            // var totalcount = res.obj.objectlist.length;
            // creatKeyWord = res.obj.objectlist.length;
            Ui_list.forEach( ( item, index ) => {
                list.push( { key: index, value: item.UUID.toString(), text: item.Name } )
                /* list.push( {
                        key: index,
                        ID: item.ID,
                        UUID: item.UUID,
                        Name: item.Name,
                        TypeUUID: item.TypeUUID.toString(),
                        WorkshopUUID: item.WorkshopUUID.toString(),
                        WorkshopName: item.WorkshopName,
                        TypeName: item.TypeName,
                        Status: item.Status,
                        UpdateDateTime: item.UpdateDateTime,
                        Desc: item.Desc,
                        Note: item.Note
                    } ) */
            } )
            this.setState( { WorkCenterList: list } )
        }, ( error ) => {
            message.info( error );
        } )
    }

    getMoldList( record ) {
        const dat = {
            PageIndex: 0,
            PageSize: -1,
            ModelUUID: -1,
            KeyWord: '',
            StorageUUID: record ? record.WorkshopUUID : -1,
        }
        TPostData( '/api/TMold/mold', 'ListActive', dat, ( res ) => {
            const list = [];
            const Ui_list = res.obj.objectlist || [];
            Ui_list.forEach( ( item, index ) => {
                list.push( {
                    key: index,
                    value: item.UUID.toString(),
                    text: item.Name,
                } )
            } )

            this.setState( { moldList: list } )
        }, ( error ) => {
            message.info( error );
        } )
    }

    renderSubTable=( record ) => {
        // this.setState({loading:true});
        const list = [];
        const subcolumns = [
            {
                title: '派工单号',
                dataIndex: 'lotJobID',
                key: 'lotJobID',
            }, {
                title: '产品名称',
                dataIndex: 'ProductModelName',
                key: 'BNum',
            },
            /* {
                title: '产品编码',
                dataIndex: 'ProductModelID',
                key: 'ProductModelIDe',
            },
            {
                title: '产品序列号',
                dataIndex: 'ProductModelSN',
                key: 'ProductModelSN'
            }, */
            {
                title: '工作中心',
                dataIndex: 'WorkstationName',
                key: 'WorkstationName',
            }, {
                title: '计划产量',
                dataIndex: 'PlanNumber',
                key: 'PlanNumber',
            }, {
                title: '工单状态',
                dataIndex: 'Status',
                key: 'Status',
                render: ( e1, record ) => {
                    // console.log('任务状态',record);
                    let status = '';
                    status = e1 === 0
                        ? ( <span className="orderCancelled">已取消</span> )
                        : e1 === 1
                            ? ( <span className="Unproduced">未生产</span> )
                            : e1 === 2
                                ? ( <span className="Inproduction">生产中</span> )
                                : e1 === 3
                                    ? ( <span className="Pausing">已暂停</span> )
                                    : e1 === 4
                                        ? ( <span className="Submited">已报工</span> )
                                        : <span>{e1}</span>;
                    return status;
                },
            }, {
                title: '操作',
                dataIndex: 'UUID',
                type: 'operate',
                render: ( e1, record, e3 ) => {
                    // console.log("record",record);
                    let operate = '';
                    if ( record.Status && record.Status === 1 ) {
                        operate = (
                        <span>
                            {/* <a onClick={this.toggleSModalShow.bind(this,record)} href="#">排产</a>
                                <span className="ant-divider"></span> */
                            }
                            <Popconfirm placement="topLeft" title="确定取消排产？" onConfirm={() => this.handleCancel( record )} okText="确定" cancelText="取消">
                                <a href="#">取消排产</a>
                            </Popconfirm>
                        </span>
                        )
                    } else { operate = ( <span>无</span> ); }
                    return operate;
                },
            },
        ];

        const dat = {
            PageIndex: 0, // 分页参数
            PageSize: -1, // 分页参数
            ProductOrderUUID: record.UUID, // 生产订单UUID
            ProductModelUUID: -1, // 生产订单产品型号UUID
            WorkshopUUID: -1, // 车间UUID
            WorkstationTypeUUID: -1, // 工作中心类型UUID
            WorkstationUUID: -1, // 工作中心UUID
            MoldUUID: -1, // 模具UUID
            Status: -1, // 派工单状态
            KeyWord: '', // 模糊查询
        }

         return ( <Table
           columns={subcolumns}
           dataSource={list}
           bordered={false}
           pagination={false}
                    // rowSelection={this.state.isSelection?rowSelection:null}
                    // loading={this.state.loading}
           size={this.state.size}
         /> );
    }

    toggleUModalShow( record ) {
        console.log( '更新前', record );
        this.setState( {
            UModalShow: !this.state.UModalShow,
            updateFromItem: record,
        } );
    }

    toggleSModalShow( record ) {
        console.log( '更新前', record );
        this.setState( { SModalShow: !this.state.SModalShow } );
        if ( record ) {
            this.getWorkCenterList( record );
            this.getMoldList( record );
            this.setState( {
                updateFromItem: record,
                unscheduledNum: record ? ( record.PlanNumber - record.ScheduleNumber ) : 0,
            } );
        }
    }

    toggleBSModalShow( record ) {
        const { selectedProductID, LotList, selectedRow } = this.state;
        const filterList = [];
        let tempNumber = 0;
        let tempList = [];
        // console.log("批量操作前多选项",selectedRow);
        LotList.forEach( ( item, index ) => {
            if ( item.strStatus === 2 && item.ProductModelUUID === selectedProductID.toString() ) {
                filterList.push( { key: index, value: item.UUID.toString(), text: item.strID } )
            }
        } );
        tempList = selectedRow.map( ( item, index ) => {
            /* return{
                key: index,
                value: item.UUID.toString(),
                text: item.strID
            } */
            tempNumber += item.strPlanNumber;
            return item.UUID.toString();
        } )
        this.setState( {
            BSLotList: filterList,
            defaultBSLotList: tempList,
            defaultBSNumber: tempNumber,
            BSModalShow: !this.state.BSModalShow,
        } );
    }

    handleUpdate( data ) {
        const { updateFromItem } = this.state;
        console.log( 'data', data );
        console.log( 'updateFromItem', updateFromItem );

        const dat = {
            UUID: updateFromItem.UUID, // 加工订单UUID
            ID: data.strID, // 加工订单ID
            Desc: data.strDesc, // 加工订单描述
            Note: data.strNote, // 加工订单备注
        }
        TPostData( this.url, 'UpdateLot', dat, ( res ) => {
            // callback(data)
            this.getProductOrder();
            message.success( '更新成功' );
        }, ( err ) => {
            console.log( 'err', err );
            message.error( '更新失败' );
        } )
    }

    handleProfinish( record ) {
        TPostData(
 this.url, 'CloseProductOrder', { UUID: record.UUID },
            () => {
                message.success( '操作成功!' );
                this.getProductOrder();
                // this.renderSubTable(data);
                // this.forceUpdate();
            },
            ( err ) => {
                message.error( '操作失败！' );
            },
        )
    }

    handleSchedul=( data ) => {
        const { updateFromItem } = this.state;
        const dat = {
            ProductOrderUUID: updateFromItem.UUID, // 生产订单UUID
            WorkstationUUID: data.WorkstationUUID, // data.WorkstationUUID[1],                                   // 工作中心UUID
            MoldUUID: data.MoldUUID, // data.MoldUUID[1],                                              // 模具UUID
            ScheduleNumber: data.Number, // 排产数量
            PlanStartDateTime: data.Date[0].format( 'YYYY-MM-DD hh:mm:ss' ), // 排程开始时间
            PlanFinishDateTime: data.Date[1].format( 'YYYY-MM-DD hh:mm:ss' ), // 排程结束时间[]
            ID: data.dispatchID, // 派工单编号
            Insert: 0, // 是否插单
        }
        console.log( '看看dat', data, dat );

        TPostData( this.url, 'Schedule', dat, () => {
            message.success( '排程成功!' );
            this.getProductOrder();
            // this.renderSubTable(data);
            this.forceUpdate();
        }, ( error ) => {
            message.error( '排程失败！' );
        } )
    }

    handleBSchedul( data ) {
        const { updateFromItem } = this.state;
        console.log( '表单数据', data );

        const dat = {
            // LotUUID: data.UUID, 加工订单UUID
            PlanNumber: data.Number, // 排程产量
            ID: data.dispatchID,
            WorkstationUUID: data.WorkstationUUID, // 工作中心UUID
            // MoldModelUUID: data.MoldModelUUID, 模具型号
            PlanStartTime: data.PlanStartTime.format( 'YYYY-MM-DD hh:mm:ss' ), // 排程开始时间
            PlanFinishTime: data.PlanFinishTime.format( 'YYYY-MM-DD hh:mm:ss' ), // 排程结束时间[]
            // LotList:updateFromItem.UUID,
            LotList: data.taskNuber
                ? data.taskNuber
                : [updateFromItem.UUID],
        }
        // console.log( '看看dat', dat );
        TPostData( this.url, 'Schedule', dat, ( res ) => {
            message.success( '批量排程成功' );
        } )
    }

    clearSelectedRow() {
        const clear = () => {
            const row = this.state.selectedRow;
            while ( row && row.length > 0 ) {
                row.shift();
            }
        }
        this.setState( { selectedRow: [], selectedRowKeys: [], selectedProductID: -1 } );
    }

    handleWSChange=( ele ) => {
        this.setState( { WorkshopID: ele } );
    }

    handleProChange( ele ) {
        this.setState( { ProModelID: ele } );
    }

    handleStatusChange( ele ) {
        this.setState( { orderState: ele } );
    }

    handleCancel( data ) {
        console.log( '取消排产的Data', data );
        const dat = {
            UUID: data.UUID, // 订单UUID
        }
        TPostData( this.url, 'UndoSchedule', dat, ( res ) => {
            message.success( '暂停排产成功！' )
            this.renderSubTable( data )
            this.forceUpdate();
        }, ( err ) => {
            message.error( '暂停排产失败！' )
        } )
    }

    handleRetrieve() {
        const { ProModelID, keyWord, orderState } = this.state;
        console.log( '查询', ProModelID, this.keyWordInput.input.value, orderState );
        this.setState( { keyWord: this.keyWordInput.input.value } );
        this.getProductOrder();
    }

    handleClose( tag ) {
        const { selectedRow, selectedRowKeys } = this.state;
        const tempSelectedRow = selectedRow;
        const tempselectedRowKeys = selectedRowKeys;
        let spliceRowIndex = 0;
        let spliceRowKeyIndex = 0;

        spliceRowIndex = selectedRow.findIndex( ( ele, index ) => ele.UUID === tag.UUID );
        spliceRowKeyIndex = selectedRowKeys.findIndex( ( ele, index ) => ele === tag.key );
        tempSelectedRow.splice( spliceRowIndex, 1 );
        tempselectedRowKeys.splice( spliceRowKeyIndex, 1 );
        this.setState( { selectedRow: tempSelectedRow, selectedRowKeys: tempselectedRowKeys } );
    }

    handleToggleBorder( value ) {
        console.log( 'ToggleBorder', value );
        this.setState( { bordered: value } );
    }

    /* handleScollChange( enable ) {
        console.log( 'enable', enable );
        this.setState( {
            scroll: enable
                ? {
                    scroll,
                }
                : undefined,
        } );
    } */

    handleSizeChange( e ) {
        this.setState( { size: e.target.value } );
    }

    handleTableChange=( pagination ) => {
        // console.log('pagination',pagination);
        const { current, pageSize } = pagination;
        this.setState( { current, pageSize, loading: true }, () => {
            this.getProductOrder();
        } );
    }

    handleQuery=( data ) => {
        console.log( '查询的值是:', data );
        // ProModelID,WorkshopID,keyWord,orderState
        const {
ProModelID, WorkshopID, keyWord, orderState,
 } = data;
        this.setState( {
 ProModelID, WorkshopID, keyWord, orderState,
}, () => {
            this.getProductOrder();
        } );
    }

    render() {
        const {
            // productOrderList,
            LotList,
            BSLotList,
            ProModelList,
            ProModelSList,
            workshopList,
            WorkCenterList,
            moldList,
            selectedRowKeys,
            selectedRow,
            updateFromItem,
            UModalShow,
            SModalShow,
            BSModalShow,
            defaultBSLotList,
            defaultBSNumber,
            bordered,
            size,
            scroll,
            // loading,
            current,
            // total,
            pageSize,
            unscheduledNum,
        } = this.state;
        const { list, total, loading } = this.props.productTask;
        const { Breadcrumb } = this.props;

        const columns = [
            {
                title: '',
                dataIndex: 'key',
                width: 30,
            },
            {
                title: 'ID',
                dataIndex: 'uObjectUUID',
                width: 50,
            },
            {
                title: '任务ID',
                dataIndex: 'strTaskID',
                type: 'string',
            },
            {
                title: '产品名称',
                dataIndex: 'strMaterialID',
                /* type: 'filter',
                filters: [
                    {
                        text: 'HDMI接口',
                        value: 'HDMI接口'
                    },
                    {
                        text: 'USB接口',
                        value: 'USB接口'
                    },
                ],
                filteredValue: filteredInfo.productName || null,
                onFilter: ( value, record ) => record.productName.includes( value ),
                sorter: (a, b) => a.name.length - b.name.length,
                sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order, */
            },
            {
                title: '计划产量',
                dataIndex: 'nMaterialCount',
            },
            {
                title: '已排产量',
                dataIndex: 'ScheduleNumber',
                type: 'sort',
            },
            {
                title: '下单日期',
                dataIndex: 'IssuedDateTime',
                type: 'string',
            },
            {
                title: '计划交期',
                dataIndex: 'PlanDeliverDate',
                type: 'string',
            },
            {
                title: '订单状态',
                dataIndex: 'Status',
                type: 'string',
                width: 120,
                render: ( e1, record ) => {
                let status = '';
                    status = e1 === 0 ? ( <span className="orderCancelled">已取消</span> ) :
                        e1 === 1 ? ( <span className="Unproduced">未生产</span> ) :
                        e1 === 2 ? ( <span className="Inproduction">生产中</span> ) :
                        e1 === 3 ? ( <span className="Completed">已完成</span> ) :
                        <span>{e1}</span>
                    return status;
                },
            },
            {
                title: '操作',
                dataIndex: 'uMachineUUID',
                type: 'operate', // 操作的类型必须为 operate
                multipleType: 'orderList',
                // width: 200,
                render: ( e1, record, e3 ) => {
                    // console.log("行数据",e1,e2,e3);
                    let operate = '';
                    if ( record.hasOwnProperty && ( record.Status === 1 || record.Status === 2 ) ) {
                        operate = (
                            <span>
                                <a
                                  onKeyDown={() => this.toggleSModalShow( record )}
                                  onClick={() => this.toggleSModalShow( record )}
                                >排产
                                </a>
                                <span className="ant-divider" />
                                <Popconfirm
                                  placement="topLeft"
                                  title="确定取消订单？"
                                  onConfirm={() => this.handleProfinish( record )}
                                  okText="确定"
                                  cancelText="取消"
                                >
                                    <a href="#">完成生产</a>
                                </Popconfirm>
                            </span>
                        );
                    } else operate = ( <span>无</span> )
                    return operate;
                },
            },
        ];

        const UFormItem = [
            {
                name: 'strID',
                label: '订单号',
                type: 'string',
                placeholder: '请输入订单号',
                rules: [
                    {
                        required: true,
                        message: '请输入订单号',
                    },
                ],
            }, {
                name: 'strDesc',
                label: '订单描述',
                type: 'string',
                placeholder: '请输入订单描述',
                rules: [
                    {
                        required: true,
                        message: '请输入订单描述',
                    },
                ],
            }, {
                name: 'strNote',
                label: '订单备注',
                type: 'string',
                placeholder: '请输入计划产量',
            },
        ];

        const SFormItem = [
            {
                name: 'Number',
                label: '排程产量',
                type: 'number',
                placeholder: '请输入排程产量',
                rules: [
                    {
                        required: true,
                        message: '请输入排程产量',
                        type: 'number',
                        min: 1,
                        max: unscheduledNum,
                    },
                ],
                help: ( <span>未排数:<span style={{ color: '#f5290d', fontWeight: 'bolder' }}>{unscheduledNum}</span>,排产数不能超过未排数量不能少于等于0个</span> ),
            }, {
                name: 'dispatchID',
                label: '派工单号',
                type: 'string',
                placeholder: '请输入派工单号',
                rules: [
                    {
                        required: true,
                        message: '派工单号不能为空',
                    },
                ],
            }, {
                name: 'WorkstationUUID',
                label: '工作中心',
                // type: 'LazyCascader',
                type: 'select',
                options: WorkCenterList,
                resetValue: ( value ) => {
                    // console.log("选择的工作中心是：",value);
                },
                fetchParameter: {
                    url: '/api/TProcess/workcenter',
                    op: 'ListActive',
                    obj: {
                        PageIndex: 0,
                        PageSize: -1,
                        TypeUUID: -1,
                        KeyWord: '',
                        WorkshopUUID: updateFromItem.WorkshopUUID,
                    },
                    lazyItem: 'WorkshopUUID',
                },
                rules: [
                    {
                        required: true,
                        message: '请选择工作中心',
                    },
                ],
            }, {
                name: 'MoldUUID',
                label: '模具',
                // type: 'LazyCascader',
                type: 'select',
                // options:this.state.lazyWSlist,
                options: moldList,
                resetValue: ( value ) => {
                    // console.log("选择的工作中心是：",value);
                },
                fetchParameter: {
                    url: '/api/TMold/mold',
                    op: 'ListActive',
                    obj: {
                        PageIndex: 0,
                        PageSize: -1,
                        ModelUUID: -1,
                        KeyWord: '',
                    },
                    // lazyItem:'WorkshopUUID'
                    lazyItem: 'StorageUUID',
                },
                rules: [
                    {
                        required: true,
                        message: '请选择模具',
                    },
                ],
            },
            {
                name: 'Date',
                label: '日期',
                type: 'rangeDate',
                placeholder: '请输入计划产量',
            },
            /* {
                name: 'PlanStartTime',
                label: '起始时间',
                type: 'date',
                placeholder: '请输入计划产量'
            }, {
                name: 'PlanFinishTime',
                label: '结束时间',
                type: 'date',
                placeholder: '请输入计划产量'
            } */
        ];

        const BSFormItem = [
            {
                name: 'dispatchID',
                label: '派工单号',
                type: 'string',
                placeholder: '请输入派工单号',
                rules: [
                    {
                        required: true,
                        message: '派工单号不能为空',
                    },
                ],
            }, {
                name: 'Number',
                label: '数量',
                type: 'string',
                defaultValue: defaultBSNumber,
                placeholder: '请输入订单编号',
                rules: [
                    {
                        required: true,
                        message: '数量不能为空',
                    },
                ],
            }, {
                name: 'WorkstationUUID',
                label: '工作中心',
                type: 'select',
                options: WorkCenterList,
                rules: [
                    {
                        required: true,
                        message: '请选择工作中心',
                    },
                ],
            }, {
                name: 'taskNuber',
                label: '工单号',
                type: 'multipleSelect',
                defaultValue: defaultBSLotList,
                options: BSLotList,
                rules: [
                    {
                        required: true,
                        message: '请选择模具型号',
                    },
                ],
            },
            /* {
                name: 'Date',
                label: '日期',
                type: 'RangePicker',
                placeholder: '请输入计划产量'
            }, */
            {
                name: 'PlanStartTime',
                label: '起始时间',
                type: 'date',
                placeholder: '请输入计划产量',
            }, {
                name: 'PlanFinishTime',
                label: '结束时间',
                type: 'date',
                placeholder: '请输入计划产量',
            },
        ];

        // 查询的数据项
        const RFormItem = [
            {
                name: 'keyWord',
                label: '搜索内容',
                type: 'string',
                // width: 200,
                placeholder: '请输入搜索内容',
                defaultValue: this.state.keyWord,
            }, {
                name: 'WorkshopID',
                label: '车间',
                type: 'select',
                defaultValue: '-1',
                hasAllButtom: true,
                // width: 180,
                options: workshopList,
            }, {
                name: 'ProModelID',
                label: '产品',
                type: 'select',
                defaultValue: '-1',
                hasAllButtom: true,
                // width: 200,
                options: ProModelList,
            }, {
                name: 'orderState',
                label: '订单状态',
                type: 'select',
                defaultValue: '-1',
                hasAllButtom: true,
                // width: 180,
                options: [
                    /* {
                        value:-1,
                        text:'全部',
                        key:'1'
                    }, */
                    {
                        value: 0,
                        text: '已取消',
                        key: '2',
                    },
                    {
                        value: 1,
                        text: '未就绪',
                        key: '3',
                    },
                    {
                        value: 2,
                        text: '未执行',
                        key: '4',
                    },
                    {
                        value: 3,
                        text: '暂停中',
                        key: '5',
                    },
                    {
                        value: 4,
                        text: '执行中',
                        key: '6',
                    },
                    {
                        value: 5,
                        text: '已完成',
                        key: '7',
                    },
                ],
            },
            // {type:'submit'}
        ];

        const rowSelection = {
            onChange: ( selectedRowKeys, selectedRows ) => {
                // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                if ( selectedRows.length ) { this.setState( { selectedRow: selectedRows, selectedRowKeys, selectedProductID: selectedRows[0].ProductModelUUID } ); } else { this.setState( { selectedRow: selectedRows, selectedRowKeys, selectedProductID: -1 } ); }
                // console.log('selectedRow: ', this.state.selectedRow);
            },

            selectedRowKeys,
            // selectedRowKeys:this.state.selectedRow,
            // selections:[true,true,true],
            getCheckboxProps: ( record, e2, e3 ) => {
                // console.log('Disabled User',record);
                // console.log('this.state.selectedProductID',this.state.selectedProductID);
                if ( this.state.selectedProductID === -1 ) {
                    return ( {
                        disabled: record.strStatus !== 1 && record.strStatus !== 2,
                    } );
                }
                return ( {
                    disabled: ( record.ProductModelUUID !== this.state.selectedProductID || ( record.strStatus !== 2 && record.strStatus !== 1 ) ),
                } );
            },
        };

        const AlertMessage = (
            <div>
                <span>已选择
                    <a style={{ fontSize: 15, color: 'red' }}>{selectedRow.length}</a>项
                </span>
                <a
                  style={{ marginLeft: 20 }}
                  onKeyDown={this.clearSelectedRow}
                  onClick={this.clearSelectedRow}
                >清除
                </a>
            </div>
        );

        const Data = {
            list: list,
            pagination: { total, current, pageSize },
        };

        const bcList = [{
            title: '首页',
            href: '/',
            }, {
            title: '生产管理',
            href: '/',
            }, {
            title: '任务排程',
        }];

        return (
            <PageHeaderLayout
            // title="任务排程"
              wrapperClassName="pageContent"
              BreadcrumbList={Breadcrumb.BCList}
            >
                {/* <Card bordered={false}> */}
                    <div>
                        <Row>
                            <Col span={6} />
                            <Col span={6} />
                            <Col span={8}>
                                <DropDownForm
                                  FormItem={RFormItem}
                                />
                            </Col>
                            <Col span={1} />
                            <Col span={3}>
                                边框：<Switch
                                  checked={bordered}
                                  onChange={this.handleToggleBorder}
                                />
                            </Col>
                        </Row>
                    </div>
                    <TableExport ref={te => this._tableExport = te}>
                        <SimpleTable
                          expandedRowRender={this.renderSubTable}
                            // rowSelection={rowSelection}
                          isHaveSelect={false}
                          loading={loading}
                          data={Data}
                          columns={columns}
                          bordered={bordered}
                          size={size}
                          onChange={this.handleTableChange}
                        />
                    </TableExport>
                    <CModal FormItem={UFormItem} updateItem={updateFromItem} submit={this.handleUpdate} isShow={UModalShow} hideForm={this.toggleUModalShow} />
                    <CModal title="任务排程" FormItem={SFormItem} updateItem={updateFromItem} submit={this.handleSchedul} isShow={SModalShow} hideForm={this.toggleSModalShow} />
                    <CModal FormItem={BSFormItem} handleType="schedul" updateItem={updateFromItem} submit={this.handleBSchedul} isShow={BSModalShow} hideForm={this.toggleBSModalShow} />
                {/* </Card> */}
            </PageHeaderLayout>
        )
    }
}
