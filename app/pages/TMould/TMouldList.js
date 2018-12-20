/**
 *这是设备列表页
 *添加日期:2017.12.06
 *添加人:shaw
 * */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import {
    Table,
    Card,
    Row,
    Col,
    Button,
    Icon,
    Popover,
    Badge,
    message,
    Divider,
    Popconfirm,
} from 'antd';
import {
    f_mold_view,
    add_mold_instance,
    f_mold_model_foradd,
    update_mold_instance,
    delete_mold_instance,
} from 'actions/mold';
import { TPostData, urlBase } from 'utils/TAjax';
import SimpleTable from 'components/TTable/SimpleTable';
import { CreateModal, UpdateModal } from 'components/TModal';
import { DropDownForm, StandardQForm } from 'components/TForm';
import PageHeaderLayout from '../../base/PageHeaderLayout';
import { fn_mes_trans } from 'functions'
import moldPic from 'images/assets/mold01.jpg'
import Details from './mouldDetail'

@connect( ( state, props ) => ( {
        Breadcrumb: state.Breadcrumb,
        moldList: state.moldList,
        moldModel: state.moldModel,
    } ) )
export default class MouldList extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            tableDataList: [],
            MoldModelList: [],
            updateFromItem: {},
            total: 0,
            current: 1,
            pageSize: 10,
            UModalShow: false,
            loading: true,
            ModelUUID: -1,
            keyWord: '',
            showDetail: false,
        }
        this.url = '/api/TMold/mold';
    }

    componentWillMount() {
        // this.getMoldModelList(); this.getTableList();
        const reqData = {}
        this
            .props
            .dispatch( f_mold_view( reqData, ( respose ) => {} ) )
    }

    componentDidMount() {
        /* this
        .props
        .dispatch(f_mold_model_foradd({}, (respose) => {})) */
    }

    getTableList( que ) {
        const {
current, pageSize, ModelUUID, keyWord,
 } = this.state;
        const dat = {
            PageIndex: current - 1, // 分页：页序号，不分页时设为0
            PageSize: pageSize, // 分页：每页记录数，不分页时设为-1
            ModelUUID: ModelUUID, // 类型UUID，不作为查询条件时取值设为-1
            KeyWord: keyWord,
        }

        TPostData( this.url, 'ListActive', dat, ( res ) => {
            const list = [];
            console.log( '查询到模具列表', res );
            const data_list = res.obj.objectlist || [];
            const totalcount = res.obj.totalcount;
            data_list.forEach( ( item, index ) => {
                list.push( {
                    key: index,
                    UUID: item.UUID,
                    ModelUUID: item.ModelUUID,
                    StorageUUID: item.StorageUUID,
                    Image: item.ModelImage,
                    Name: item.Name,
                    ModelName: item.ModelName,
                    Number: item.ID,
                    Label: item.Label,
                    ModelSize: item.ModelSize,
                    Desc: item.Desc,
                    UpdateDateTime: item.UpdateDateTime,

                    Status: 1,
                    ModelID: '-',
                    Note: '-',
                } )
            } )
            this.setState( { tableDataList: list, total: totalcount, loading: false } );
        }, ( error ) => {
            message.error( error );
            this.setState( { loading: false } );
        } )
    }

    getMoldModelList( str ) {
        TPostData( this.url, 'ListActive', {
            PageIndex: 0,
            PageSize: -1,
            ModelUUID: -1,
        }, ( res ) => {
            let Ui_list = res.obj.objectlist || [],
                list = [];
            Ui_list.forEach( ( item, index ) => {
                list.push( {
                    key: index,
                    value: item
                        .UUID
                        .toString(),
                    text: item.Name,
                } )
            } );
            this.setState( { MoldModelList: list } );
        }, ( error ) => {
            message.info( error );
        } )
    }

    handleCreat = ( data ) => {
        const addData = {
            cols: fn_mes_trans.toCols( data ),
        }
        console.log( '开始添加', addData );
        this
            .props
            .dispatch( add_mold_instance( addData, respose => console.log( '添加成功！', respose ) ) )
    }

    handleQuery = ( data, type ) => {
        const { current, pageSize } = this.state;
        const quePage = {
            page: current - 1,
            size: pageSize,
        };
        const searchKey = [
            'strModelName',
            // 'strModelLabel',
            // 'nMouldRateLife',
            'nInstanceLife',
            'nMouldStepCount',
            'nMouldHoleCount',
            // 'fMouldLength',
            // 'fMouldWidth',
            // 'fMouldHeight',
            'fMouldStepValue',
            'strMouldCode',
            'strInstanceCode',
        ];
        const options = type == 'filter' ?
                    fn_mes_trans.toFilter( data ) :
                    type == 'search' ?
                    fn_mes_trans.toSearch( data, searchKey ) : '';
        const queReq = Object.assign( quePage, options );
        console.log( 'moldmodel查询值是：', queReq )
        this
            .props
            .dispatch( f_mold_view( queReq, ( respose ) => {} ) )
    }

    handleUpdate = ( data ) => {
        const item = this.state.updateFromItem;
        const editData = {
            uuid: item.uObjectUUID,
            cols: fn_mes_trans.toCols( data ),
        }
        console.log( '开始修改', editData );
        this
            .props
            .dispatch( update_mold_instance( editData ) )
    }

    handleDelete = ( data ) => {
        const deleteData = {
            uuids: [data.uObjectUUID],
        }
        console.log( '开始删除', deleteData );
        this
            .props
            .dispatch( delete_mold_instance( deleteData ) )
    }

    handleTableChange = ( pagination ) => {
        const { current, pageSize } = pagination;
        this.setState( {
            current,
            pageSize,
            loading: true,
        }, () => {
            this.getTableList();
        } );
    }

    toggleUModalShow = ( record ) => {
        this.setState( {
            UModalShow: !this.state.UModalShow,
            updateFromItem: record,
        } );
    }

    showDetail = () => {
        this.setState( { showDetail: true } );
    }

    render() {
        const {
            MoldModelList,
            tableDataList,
            // loading,
            current,
            // total,
            pageSize,
            updateFromItem,
            UModalShow,
            showDetail,
        } = this.state;
        console.log( 'mouldlist props', this.props )
        const { Breadcrumb, children } = this.props;
        const { list, total, loading } = this.props.moldList;
        const Data = {
            // list:tableDataList,
            list: list,
            pagination: {
                total,
                current,
                pageSize,
            },
        };

        const Tcolumns = [
            {
                title: '序号',
                dataIndex: 'key',
                type: 'string',
            }, {
                title: '图片',
                dataIndex: 'Image',
                render: ( e, record ) => {
                    // console.log('图片地址',e);
                    const content = (
                        <div>
                            <img width="300"
                                // src={urlBase + e}}
                              src={moldPic}
                            />
                        </div>
                    );
                    return (
                        <Popover placement="right" content={content} trigger="hover">
                            {/* <Button>Right</Button> */}
                            <img height="50"
                                // src={urlBase + e}}
                              src={moldPic}
                            />
                        </Popover>
                    )
                },
            }, {
                title: '模具名称',
                dataIndex: 'Name',
                type: 'string',
            }, {
                title: '架位号',
                dataIndex: 'strBinCode',
            }, {
                title: '编号',
                dataIndex: 'strInstanceCode',
            }, {
                title: '图号',
                dataIndex: 'strMouldCode',
            }, {
                title: '步距',
                dataIndex: 'fMouldStepValue',
            },
            /* {
                // title: '规格尺寸（材料/尺寸/步距）',
                title: '规格尺寸',
                dataIndex: 'ModelSize',
                type: 'string'
            },
            {
                title: '标签',
                dataIndex: 'Label',
                type: 'string'
            },
            {
                title: '厂家',
                dataIndex: 'Desc',
                type: 'string'
            },
            {
                title: '验收日期',
                dataIndex: 'UpdateDateTime',
                type: 'string'
            }, */
            {
                title: '设计寿命',
                dataIndex: 'nInstanceLife',
                type: 'string',
            },
            /* {
                title: '模具等级',
                dataIndex: 'grade',
                type: 'string'
            }, */
            /* {
                title: '模具状态',
                dataIndex: 'grade',
                type: 'string'
            }, */
            {
                title: '操作',
                dataIndex: 'UUID',
                render: ( str, record ) => ( <span>
                        <a
                          onClick={this
                            .toggleUModalShow
                            .bind( this, record )}
                        >编辑
                        </a>
                        <Divider type="vertical" />
                        <Link to={`/mould/mould_list/detail/${record.UUID}`}>详情</Link>
                        {/* <a onClick={this.showDetail}>详情</a> */}
                        {/* <Divider type="vertical"/>
                              <a>寿命分析</a>
                              <Divider type="vertical"/>
                              <a>模具履历</a> */}
                        <Divider type="vertical" />
                        <Popconfirm
                          placement="topRight"
                          title="确定删除此项数据？"
                          onConfirm={this
                            .handleDelete
                            .bind( this, record )}
                          okText="确定"
                          cancelText="取消"
                        >
                            <a href="#">删除</a>
                        </Popconfirm>
                                             </span> ),
            },
        ];
        // 更新弹框数据项
        const UFormItem = [
            /* {
                name: 'Name',
                label: '模具名称',
                type: 'string',
                placeholder: '请输入模具名称',
                rules: [
                    {
                        required: true,
                        message: '名称不能为空'
                    }
                ]
            }, */ {
                name: 'strInstanceCode',
                label: '模具编号',
                type: 'string',
                placeholder: '请输入模具编号',
                rules: [
                    {
                        required: true,
                        message: '编号不能为空',
                    },
                ],
            }, {
                name: 'uModelUUID',
                label: '模具型号',
                type: 'select',
                rules: [
                    {
                        required: true,
                        message: '请选择型号',
                    },
                ],
                // options: this.props.moldList.modelList
                options: MoldModelList,
            }, /*  {
                name: 'Label',
                label: '模具标签',
                rules: [
                    {
                        required: true,
                        message: '标签不能为空'
                    }
                ],
                type: 'string'
            }, {
                name: 'Desc',
                label: '备注',
                type: 'string'
            } */
        ];
        // 添加的弹出框菜单
        const CFormItem = [
            {
                name: 'uModelUUID',
                label: '模具型号',
                type: 'select',
                rules: [{ required: true, message: '请选择型号' }],
                options: MoldModelList,
                // options: this.props.moldList.modelList
            },
            {
                name: 'nInstanceHoleCount',
                label: '模具穴数',
                type: 'string',
                placeholder: '请输入模具穴数',
                rules: [
                    {
                        required: true,
                        message: '名称不能为空',
                    },
                ],
            }, {
                name: 'strInstanceCode',
                label: '模具编号',
                type: 'string',
                placeholder: '请输入模具编号',
                rules: [
                    {
                        required: true,
                        message: '编号不能为空',
                    },
                ],
            },
        ];
        // 查询的数据项
        const RFormItem = [
            {
                name: 'uModelUUID',
                label: '模具型号',
                type: 'select',
                // hasAllButtom: true,
                // defaultValue: '-1',
                // width: 150,
                options: MoldModelList,
                // options: this.props.moldList.modelList
            },
        ];

        const bcList1 = [
            {
                title: '首页',
                href: '/',
            }, {
                title: '模具列表',
                // href: '/mould_list',
            },
        ];

        const bcList2 = [
            {
                title: '首页',
                href: '/',
            }, {
                title: '模具列表',
                href: '/mould_list',
            }, {
                title: '模具详情',
            },
        ];

        const MouldList = (
            <Card bordered={false}>
                {/* <SimpleQForm
                    FormItem={RFormItem}
                    submit={this.handleQuery}
                /> */}
                <div style={{ marginBottom: 15 }}>
                    <Row>
                        <Col span={4}>
                            <CreateModal
                              FormItem={CFormItem}
                              submit={this
                                .handleCreat
                                .bind( this )}
                            />
                        </Col>
                        <Col span={12} />
                        <Col span={8}>
                            <DropDownForm
                              FormItem={RFormItem}
                              submit={this.handleQuery}
                              isHaveSearch
                            />
                        </Col>
                    </Row>
                </div>
                <SimpleTable
                  size="middle"
                  loading={loading}
                  data={Data}
                  columns={Tcolumns}
                  isHaveSelect={false}
                  onChange={this.handleTableChange}
                />
                <UpdateModal
                  FormItem={UFormItem}
                  updateItem={updateFromItem}
                  submit={this
                    .handleUpdate
                    .bind( this )}
                  showModal={UModalShow}
                  hideModal={this.toggleUModalShow}
                />
            </Card>
        )

        const action = (
            <Button type="primary">
                <Link to="/mould_list">返回</Link>
            </Button>
        )

        return (
            <PageHeaderLayout
              title="模具列表"
              wrapperClassName="pageContent"
              action={children ? action : ''}
              BreadcrumbList={children ? bcList2 : bcList1}
            >
                {
                    /* children
                    ? children
                    : MouldList */
                    // MouldList
                }
                <Switch>
                    <Route path="/mould/mould_list/detail/:id" component={Details} />
                    <Route path="/mould/mould_list" component={() => MouldList} />
                </Switch>
            </PageHeaderLayout>
        )
    }
}
