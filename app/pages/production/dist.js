import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux';
import {
    Button,
    Radio,
    Row,
    Col,
    message,
    Table,
    Progress,
    // Select,
    // DatePicker,
    // Input,
    // Form,
    // Switch,
    // Icon,
    // Dropdown,
} from 'antd';
import { dist_list } from 'actions/production';
import { TPostData, urlBase, TAjax } from 'utils/TAjax';
import { CModal } from 'components/TModal';
import { DropDownForm } from 'components/TForm';
// import SimpleTable from 'components/TTable/SimpleTable';
import SimpleTable from 'components/TTable/exportData';
// import { SimpleQForm, StandardQForm } from 'components/TForm';
import { fn_mes_trans } from 'functions'
import TableExport from 'tableexport';
import PageHeaderLayout from '../../base/PageHeaderLayout';
import Details from './workOrderDetail';
// import styles from './common.less';

// const { Option } = Select;
// const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
// const { Search, TextArea } = Input;
// const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

@connect( ( state, props ) => ( {
    Breadcrumb: state.Breadcrumb,
    productDist: state.productDist,
} ) )
export default class dist extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            title: props.title,
            dispatchLotList: [],
            lotListData: [],
            ProModelList: [],
            ProModelSList: [],
            WorkCenterList: [],
            workshopList: [],
            lazyWSlist: [],
            updateFromItem: {},
            finishedNum: 0,
            rejectNum: 0,
            dispatchLotState: '-1',
            WorkshopID: '-1',
            ProModelID: '-1',
            keyWord: '',
            loading: true,
            DModalShow: false,
            startModalShow: false,
            pauseModalShow: false,
            topModalShow: false,
            submitModalShow: false,
            bordered: false,
            hasAddBtn: false,
            showDetail: false,
            size: 'small',
            subTableSize: 'default',
            scroll: undefined,
            total: 0,
            current: 1,
            pageSize: 10,
            visible: false,
            radiovalue: '-1',
        }
        this.url = '/api/tmanufacture/manufacture';
    }

    componentWillMount() {
        // this.getDispatchLotList();
        // this.getProModelList();
        // this.getWorkCenterList();
        // this.getWorkshopList();
        // this.props.dispatch( dist_list( { }, ( respose ) => {} ) );
    }

    componentDidMount() {
        // console.log('查询',this.keyWordInput.value);
        /* this.timer=setInterval(()=>{
            this.props.dispatch( TaskList( {}, ( respose ) => {} ))
        },5000) */
        const { pageSize, current } = this.state;
        const page = { page: current, size: pageSize }
        const { list } = this.props.productDist;
        if ( Array.isArray( list ) && list.length === 0 ) {
            this.props.dispatch( dist_list( page, ( respose ) => {} ) )
            // console.log( '...请求list...' );
        }
    }

    componentWillUnmount() {
        // client.end()
        // clearInterval( this.timer )
    }

    getProModelList() {
        const dat = {
            PageIndex: 0,
            PageSize: -1,
            TypeUUID: -1,
            KeyWord: '',
        }
        TPostData(
            '/api/TProduct/product_model', 'ListActive', dat,
            ( res ) => {
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
            },
            ( error ) => {
                message.info( error );
            },
        )
    }

    getWorkCenterList() {
        const dat = {
            PageIndex: 0,
            PageSize: -1,
            TypeUUID: -1,
        }

        TPostData(
            '/api/TProcess/workcenter', 'ListActive', dat,
            ( res ) => {
                const list = [];
                const Ui_list = res.obj.objectlist || [];
                console.log( '查询到工作中心列表', Ui_list );
                // var totalcount = res.obj.objectlist.length;
                // creatKeyWord = res.obj.objectlist.length;
                Ui_list.forEach( ( item, index ) => {
                    list.push( {
                            key: index,
                            value: item.UUID.toString(),
                            text: item.Name,
                        } )
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
            },
            ( error ) => {
                message.info( error );
            },
        )
    }

    toggleModalShow( modaltype, record ) {
        console.log( '派工前', modaltype, record );
        // finishedNum  rejectNum
        this.setState( { finishedNum: record.PlanNumber, rejectNum: record.RejectNumber } );
        switch ( modaltype ) {
            case 'startModalShow':
                this.setState( { startModalShow: true, updateFromItem: record } );
                break;
            case 'pauseModalShow':
                this.setState( { pauseModalShow: true, updateFromItem: record } );
                break;
            case 'stopModalShow':
                this.setState( { stopModalShow: true, updateFromItem: record } );
                break;
            case 'submitModalShow':
                this.setState( { submitModalShow: true, updateFromItem: record } );
                break;
            case 'DModalShow':
                this.setState( { DModalShow: true, updateFromItem: record } );
                break;
            default:
                '';
        }
    }

    hideModal=() => {
        this.setState( {
            startModalShow: false,
            pauseModalShow: false,
            stopModalShow: false,
            submitModalShow: false,
            DModalShow: false,
        } )
    }

    handleDispatch( data ) {
        const { updateFromItem } = this.state;
        const dat = {
            UUID: data.UUID, // 订单UUID
        }
    }

    handleCancel( data ) {
        const dat = {
            UUID: data.UUID, // 订单UUID
        }
        // UndoSchedule   UndoDispatch
        TPostData(
            this.url, 'UndoSchedule', dat,
            ( res ) => {
                message.success( '取消派工成功！' )
                this.getDispatchLotList();
            },
            ( err ) => {
                message.error( '取消派工失败！' )
            },
        )
    }

    handleChange( ele ) {
        this.setState( { dispatchLotState: ele } );
    }

    handleWSChange=( ele ) => {
        this.setState( { WorkshopID: ele } );
    }

    handleProChange( ele ) {
        this.setState( { ProModelID: ele } );
    }

    handleRetrieve() {
        // const {keyWord,dispatchLotState}=this.state;
        // console.log('查询',this.keyWordInput.input.value,dispatchLotState);
        this.setState( { keyWord: this.keyWordInput.input.value } );
        this.getDispatchLotList();
    }

    handleToggleBorder( value ) {
        console.log( 'ToggleBorder', value );
        this.setState( { bordered: value } );
    }

    handleScollChange( enable ) {
        // console.log( 'enable', enable );
        this.setState( { scroll: enable ? { scroll } : undefined } );
    }

    handleSizeChange( e ) {
        this.setState( { size: e.target.value } );
    }

    renderSubTable=( record ) => {
        // this.setState({loading:true});
        const list = [];
        console.log( 'record', record );
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
                render: ( e1 ) => {
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
                        operate = ( <span>
                            <Popconfirm placement="topLeft" title="确定取消排产？" onConfirm={() => this.handleCancel( record )} okText="确定" cancelText="取消">
                                <a href="#">取消排产</a>
                            </Popconfirm>
                                    </span> )
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

        return (
            <div style={{ padding: 8 }}>
                <Table
                  columns={subcolumns}
                  dataSource={list}
                  bordered={false}
                  pagination={false}
                  // rowSelection={this.state.isSelection?rowSelection:null}
                  // loading={this.state.loading}
                  size={this.state.size}
                />
            </div>
        )
    }

    SubmitWorkOrder=( data ) => {
        const dat = {
            UUID: this.state.updateFromItem.UUID, // 派工单UUID
            SubmitDateTime: data.submitDate.format( 'YYYY-MM-DD hh:mm:ss' ), // 暂停时间
            FinishNumber: data.FinishNumber, // 完成产量
            RejectNumber: data.RejectNumber,
        }
        console.log( 'submitdate', dat );
        TPostData(
            this.url, 'SubmitWorkOrder', dat,
            ( res ) => {
                message.success( '操作成功！' )
                this.getDispatchLotList();
            },
            ( err ) => {
                message.error( '操作失败！' )
            },
        )
    }

    StartWorkOrder=( data ) => {
        const dat = {
            UUID: this.state.updateFromItem.UUID, // 派工单UUID
            StartDateTime: data.startDate.format( 'YYYY-MM-DD hh:mm:ss' ), // 暂停时间
        }
        TPostData(
            this.url, 'StartWorkOrder', dat,
            ( res ) => {
                message.success( '操作成功！' )
                this.getDispatchLotList();
            },
            ( err ) => {
                message.error( '操作失败！' )
            },
        )
    }

    PauseWorkOrder=( data ) => {
        const dat = {
            UUID: this.state.updateFromItem.UUID, // 派工单UUID
            PauseDateTime: data.pauseDate.format( 'YYYY-MM-DD hh:mm:ss' ), // 暂停时间
            FinishNumber: data.FinishNumber, // 完成产量
            RejectNumber: data.RejectNumber, // 不良数量
        }
        TPostData(
            this.url, 'PauseWorkOrder', dat,
            ( res ) => {
                message.success( '操作成功！' )
                this.getDispatchLotList();
            },
            ( err ) => {
                message.error( '操作失败！' )
            },
        )
    }

    StopWorkOrder=( data ) => {
        const dat = {
            UUID: this.state.updateFromItem.UUID, // 派工单UUID
            StopDateTime: data.stopDate.format( 'YYYY-MM-DD hh:mm:ss' ), // 暂停时间
            FinishNumber: data.FinishNumber, // 完成产量
            RejectNumber: data.RejectNumber,
            Desc: data.Desc,
        }
        console.log( 'stopwork', dat );

        TPostData(
            this.url, 'StopWorkOrder', dat,
            ( res ) => {
                message.success( '操作成功！' );
                this.getDispatchLotList();
            },
            ( err ) => {
                message.error( '操作失败！' );
            },
        )
    }

    handleTableChange=( pagination ) => {
        // console.log( 'pagination', pagination );
        const { current, pageSize } = pagination;
        this.setState( { current: current, pageSize, loading: true }, () => {
            // console.log( '条件', this.state, this.getQuePage() )
            const page = { page: current - 1, size: pageSize }
            this.props.dispatch( dist_list( page, ( respose ) => {} ) )
        } );
    }

    handleQuery=( data, type ) => {
        const { current, pageSize } = this.state;
        const quePage = {
            page: current - 1,
            size: pageSize,
        };
        const searchKey = [
            'strDistID',
            // 'strMaterialID',
            // 'nTaskFinishCount',
        ];
        const options = type === 'filter' ?
                    fn_mes_trans.toFilter( data ) :
                    type === 'search' ?
                    fn_mes_trans.toSearch( data, searchKey ) : '';
        const queReq = Object.assign( quePage, options );
        console.log( '查询值是：', queReq )
        this
            .props
            .dispatch( dist_list( queReq, ( respose ) => {} ) )
    }

    radioChange=( e ) => {
        if ( e.target.value !== '-1' ) {
            const obj = fn_mes_trans.toFilter( { nDistStatus: e.target.value } );
            this.props.dispatch( dist_list( obj, ( respose ) => {} ) )
            console.log( `radio checked:${e.target.value}` );
        } else {
            this.props.dispatch( dist_list( {}, ( respose ) => {} ) )
        }
        this.setState( { radiovalue: e.target.value } )
    }

    render() {
        const {
            ProModelList,
            WorkCenterList,
            workshopList,
            submitModalShow,
            // bordered,
            size,
            current,
            pageSize,
            finishedNum,
            // total,
        } = this.state;
        const { Breadcrumb, children } = this.props;
        const { list, total, loading } = this.props.productDist;

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
                title: '派工单号',
                dataIndex: 'strDistID',
            },
            {
                title: '产品',
                dataIndex: 'ProductModelName',
                render: () => ( <span>这是产品</span> ),
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
            },
            {
                title: '工作中心',
                dataIndex: 'WorkstationName',
                key: 'WorkstationName',
            }, */
            {
              title: '计划开始时间',
              dataIndex: 'dtJobPlanStartTime',
            },
            {
              title: '计划产量',
              dataIndex: 'PlanNumber',
              type: 'sort',
            },
            {
              title: '当前产量',
              dataIndex: 'FinishNumber',
              type: 'sort',
            },
            {
              title: '次品数量',
              dataIndex: 'RejectNumber',
              type: 'sort',
            },
            {
              title: '次品率',
              dataIndex: 'rej_progress',
              type: 'string',
              render: ( val, record ) => ( <Progress type="circle" percent={val} width={40} /> ),
            },
            {
              title: '派工时间',
              dataIndex: 'PlanStartDateTime',
              type: 'string',
            },
             {
              title: '开始时间',
              dataIndex: 'StartDateTime',
              type: 'string',
            },
            {
              title: '剩余时间(h)',
              dataIndex: 'restTime',
              type: 'string',
            },
            {
              title: '计划完成时间',
              dataIndex: 'PlanFinishDateTime',
              type: 'string',
            },
             {
              title: '实际完成',
              dataIndex: 'FinishDateTime',
              type: 'string',
            },
            {
              title: '生产进度',
              dataIndex: 'pro_progress',
              type: 'string',
              render: ( val, record ) => ( <Progress percent={val} /> ),
            },
            {
                title: '派工单状态',
                dataIndex: 'nDistStatus',
                key: 'Status',
                render: ( e1, record ) => {
                    // console.log('任务状态',record);
                    let status = '';
                    status = e1 === 0 ? ( <span className="orderCancelled">已取消</span> ) :
                        e1 === 1 ? ( <span className="Unproduced">未生产</span> ) :
                        e1 === 2 ? ( <span className="Inproduction">生产中</span> ) :
                        e1 === 3 ? ( <span className="Pausing">已暂停</span> ) :
                        e1 === 4 ? ( <span className="Submited">已报工</span> ) :
                        // e1==5?(<span>生产完成(5)</span>):
                        // e1==6?(<span>生产中(6)</span>):
                        // e1==9?(<span>生产挂起(9)</span>):
                        // e1==10?(<span>已完成(10)</span>):
                        // e1==11?(<span>暂停中(11)</span>):
                        <span>{e1}</span>
                    return status;
                },
            },
            {
                title: '操作',
                dataIndex: 'uMachineUUID',
                type: 'operate', // 操作的类型必须为 operate
                // multipleType: "dispatch",
                render: ( item, record ) => {
                    const operate = '';
                    // return (<a onClick={this.toggleShow}>工单详情</a>)
                    // return (<a href="/workorder_detail">工单详情</a>)
                    return ( <Link to={`/production/dist/dist_detail/${record.uObjectUUID}`}>派工单详情</Link> )
                },
            },
        ];

        const SubmitFormItem = [
            {
                name: 'FinishNumber',
                label: '完成产量',
                type: 'number',
                placeholder: '请输入完成产量',
                rules: [
                    {
                        required: true,
                        message: '请输入完成产量',
                        type: 'number',
                        min: 1,
                        max: finishedNum,
                    },
                ],
                help: ( <span>计划数:<span style={{ color: '#f5290d', fontWeight: 'bolder' }}>{finishedNum}</span>,完成数不能超过计划数量不能少于等于0个</span> ),
            },
            {
                name: 'RejectNumber',
                label: '不良产量',
                type: 'number',
                placeholder: '请输入不良产量',
                rules: [
                    {
                        required: true,
                        message: '请输入完成产量',
                        type: 'number',
                        min: 1,
                        max: finishedNum,
                    },
                ],
                help: ( <span>计划数:<span style={{ color: '#f5290d', fontWeight: 'bolder' }}>{finishedNum}</span>,计划数不能超过计划数量不能少于等于0个</span> ),
            },
            {
                name: 'submitDate',
                label: '报工日期',
                type: 'date',
                placeholder: '请输入计划产量',
                rules: [{ required: true, message: '请选择日期' }],
            },
        ];
        // ProModelID,WorkshopID,keyWord,dispatchLotState
        // 查询的数据项
        const RFormItem = [
            {
                name: 'keyWord',
                label: '搜索内容',
                type: 'string',
                width: 200,
                placeholder: '请输入搜索内容',
            }, {
                name: 'WorkshopID',
                label: '车间',
                type: 'select',
                defaultValue: '-1',
                hasAllButtom: true,
                width: 180,
                options: workshopList,
            }, {
                name: 'ProModelID',
                label: '产品',
                type: 'select',
                defaultValue: '-1',
                hasAllButtom: true,
                width: 200,
                options: ProModelList,
            }, {
                name: 'dispatchLotState',
                label: '订单状态',
                type: 'select',
                defaultValue: '-1',
                hasAllButtom: true,
                width: 180,
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
                        text: '未生产',
                        key: '3',
                    },
                    {
                        value: 2,
                        text: '生产中',
                        key: '4',
                    },
                    {
                        value: 3,
                        text: '已暂停',
                        key: '5',
                    },
                    {
                        value: 4,
                        text: '已报工',
                        key: '6',
                    },
                ],
            },
        ];

        const Data = {
            // list:dispatchLotList,
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
            title: '派工单管理',
        }];

        // className="cardContent"
        const distList = () => (
            <div>
                <div style={{ marginBottom: 6, padding: 5 }}>
                    <Row>
                        <Col span={8}>
                            <Button type="primary">审核</Button>
                            <Button disabled style={{ marginLeft: 6 }}>中断</Button>
                            <Button disabled style={{ marginLeft: 6 }}>恢复</Button>
                            <Button style={{ marginLeft: 6 }}>取消</Button>
                            {/* <Button style={{ marginLeft: 6 }} type="danger">删除</Button> */}
                        </Col>
                        <Col span={12}>
                            <RadioGroup onChange={this.radioChange} defaultValue={this.state.radiovalue}>
                                <RadioButton value="-1">全部</RadioButton>
                                <RadioButton value="1">未审核</RadioButton>
                                <RadioButton value="2">生产中</RadioButton>
                                <RadioButton value="3">已取消</RadioButton>
                                <RadioButton value="4">已中断</RadioButton>
                                <RadioButton value="5">待确认</RadioButton>
                                <RadioButton value="6">已完成</RadioButton>
                            </RadioGroup>
                        </Col>
                        <Col span={4}>
                            <DropDownForm
                              FormItem={RFormItem}
                              submit={this.handleQuery}
                              isHaveSearch
                            />
                        </Col>
                        {/* <Col span={0} />
                        <Col span={4} /> */}
                    </Row>
                </div>
                <SimpleTable
                  loading={loading}
                  data={Data}
                //   expandedRowRender={this.renderSubTable}
                  columns={columns}
                  bordered
                  size={size}
                  onChange={this.handleTableChange}
                />
              <CModal
                title="生产报工"
                FormItem={SubmitFormItem}
                submit={this.SubmitWorkOrder}
                isShow={submitModalShow}
                hideForm={this.hideModal}
              />
            </div>
        );

        const action = (
          <Button type="primary">
            <Link to="/task_monitor">返回</Link>
          </Button>
        )

        return (
            <PageHeaderLayout
                // title="生产派工"
              action={children ? action : ''}
              wrapperClassName="pageContent"
            // BreadcrumbList={Breadcrumb.BCList}
              BreadcrumbList={bcList}
            >
                <Switch>
                    <Route path="/production/dist/dist_detail/:id" component={Details} />
                    <Route path="/production/dist" component={distList} />
                </Switch>
            </PageHeaderLayout>
        )
    }
}
// taskMonitor = Form.create()( taskMonitor );
// Form.create()( taskMonitor );
