/**
 *这是工藝列表页
 *添加日期:2018.09.27
 *添加人:shaw
 * */
import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Divider, Popconfirm, Table, Modal } from 'antd';
import { route_list } from 'actions/procession'
import SimpleTable from 'components/TTable/SimpleTable';
import { CreateModal, UpdateModal } from 'components/TModal';
import { TPostData, TAjax } from 'utils/TAjax';
// import { SimpleQForm, StandardQForm } from 'components/TForm';
import PageHeaderLayout from '../../base/PageHeaderLayout';
import Config from './configRoute'

@connect( ( state, props ) => ( {
    Breadcrumb: state.Breadcrumb,
    processionRoute: state.processionRoute,
} ) )
export default class route extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            // tableDataList: [],
            updateFromItem: {},
            // total: 0,
            current: 1,
            pageSize: 10,
            UModalShow: false,
            visible: false,
            // loading: true,
        }
        this.url = '/api/TDevice/device_type';
    }

    componentWillMount() {
        // this.getTableList();
        // this.props.dispatch( route_list( { }, ( respose ) => {} ) )
    }

    componentDidMount() {
        const { list } = this.props.processionRoute;
        if ( list.length <= 0 ) {
            this.props.dispatch( route_list( { }, ( respose ) => {} ) )
        }
    }

    renderSubTable=( record ) => {
        // this.setState({loading:true});
        const list = [];
        console.log( 'record', record );
        const subcolumns = [
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
                title: '工序名称',
                dataIndex: 'strProcedureName',
            }, {
                title: '工序编号',
                dataIndex: 'strProcedureCode',
                key: 'BNum',
            },
            {
                title: '备注',
                dataIndex: 'strProcedureNote',
            }, {
                title: '操作',
                dataIndex: 'UUID',
                width: 150,
                render: ( str, record ) => (
                    <span>
                        <a
                          onClick={() => this.toggleUModalShow( record )}
                          onKeyDown={() => this.toggleUModalShow( record )}
                        >
                        编辑
                        </a>
                        <Divider type="vertical" />
                        <Popconfirm
                          placement="topRight"
                          title="确定删除此项数据？"
                          onConfirm={() => this.handleDelete( record )}
                          okText="确定"
                          cancelText="取消"
                        >
                            <a href="#">删除</a>
                        </Popconfirm>
                    </span>
                ),
            },
        ];

        const dat = {
            cond: {
                equals: [
                    { key: 'uRouteUUID', val: record.uObjectUUID },
                ],
            },
        }

        TAjax(
            'post', 'api/procession/procedure/list', '', dat,
            ( res ) => {
                console.log( '成功请求到 工序数据', res );
                const Ui_list = res.data.list || [];
                Ui_list.forEach( ( item, index ) => {
                    list.push( {
                        strProcedureName: item.strProcedureName,
                        strProcedureCode: item.strProcedureCode,
                        uObjectUUID: item.uObjectUUID,
                        strProcedureNote: item.strProcedureNote,
                    } )
                } );
                // this.setState({loading:true});
            },
            ( res ) => {
                console.log( '失败', res );
            },
            false,
        );
         return (
            <Table
              columns={subcolumns}
              dataSource={list}
              bordered={false}
              pagination={false}
                // rowSelection={this.state.isSelection?rowSelection:null}
                // loading={this.state.loading}
              size="small"
            />
         );
    }

    handleCreat=( data ) => {

    }

    handleQuery=( data ) => {

    }

    handleUpdate=( data ) => {


    }

    handleDelete=( data ) => {

    }

    handleTableChange=( pagination ) => {
        // console.log('pagination',pagination);
        const { current, pageSize } = pagination;
        this.setState( { current, pageSize, loading: true }, () => {
            // this.getTableList();
        } );
    }

    toggleUModalShow=( record ) => {
        this.setState( { UModalShow: !this.state.UModalShow, updateFromItem: record } );
    }

    showModal=() => {
        this.setState( { visible: true } )
    }


    render() {
        const {
            // tableDataList,
            // loading,
            current,
            // total,
            pageSize,
            updateFromItem,
            UModalShow,
        } = this.state;
        const { Breadcrumb } = this.props;
        const { list, total, loading } = this.props.processionRoute;
        const Data = {
            list: list,
            // list:tableDataList,
            pagination: { total, current, pageSize },
        };

        const Tcolumns = [
            {
                title: '序号',
                dataIndex: 'key',
                width: 50,
            },
            {
                title: 'ID',
                dataIndex: 'uObjectUUID',
                width: 80,
            },
            {
                title: '工艺路线名称',
                dataIndex: 'strRouteName',
            },
            {
                title: '路线类别',
                dataIndex: 'strRouteTypeName',
            },
            {
                title: '编号',
                dataIndex: 'strRouteCode',
            },
            {
                title: '物料编号',
                dataIndex: 'strMaterialID',
            },
            {
                title: '备注',
                dataIndex: 'strRouteNote',
            },
            {
                title: '操作',
                dataIndex: 'uMachineUUID',
                width: 180,
                render: ( txt, record ) => (
                <span>
                    {/* <a
                      onClick={() => this.toggleUModalShow( record )}
                      onKeyDown={() => this.toggleUModalShow( record )}
                    >
                    添加
                    </a>
                    <Divider type="vertical" /> */}
                    <a
                      onClick={() => this.toggleUModalShow( record )}
                      onKeyDown={() => this.toggleUModalShow( record )}
                    >
                    编辑
                    </a>
                    <Divider type="vertical" />
                    <Link to="/procession/route/config">配置</Link>
                    {/* <a onClick={this.showModal}>配置</a> */}
                    <Divider type="vertical" />
                    <Popconfirm
                      placement="topRight"
                      title="确定删除此项数据？"
                      onConfirm={() => this.handleDelete( record )}
                      okText="确定"
                      cancelText="取消"
                    >
                        <a href="#">删除</a>
                    </Popconfirm>
                </span>
                ),
            },
        ];

        // 更新弹框数据项
        const UFormItem = [
            {
                name: 'Name',
                label: '名称',
                type: 'string',
                placeholder: '请输入管理者编号',
                rules: [{ required: true, min: 1, message: '名称不能为空' }],
            }, /* {
                name: 'ID',
                label: '编号',
                type: 'string',
                placeholder: '请输入管理者编号'
            }, {
                name: 'Note',
                label: '描述',
                type: 'string',
                placeholder: '请输入描述',
            }, */{
                name: 'Desc',
                label: '备注',
                type: 'string',
                placeholder: '请输入备注',
            },
        ];

        // 可设置的查询字段
        const CFormItem = [
            {
                name: 'Name',
                label: '类别名称',
                type: 'string',
                placeholder: '请输入类别名称',
                rules: [{ required: true, min: 1, message: '名称不能为空' }],
            },
            /* {
                name: 'ID',
                label: '编号',
                type: 'string',
                placeholder: '编号',
                rules: [{required: true,min: 1,message: '名称不能为空'}]
            } */
        ];

        // 查询的数据项
        const RFormItem = [
            {
                name: 'keyWord',
                label: '搜索内容',
                type: 'string',
                placeholder: '请输入搜索内容',
            },
        ];

        const bcList = [{
            title: '首页',
            href: '/home',
            }, {
            title: '工艺管理',
            // href: '/home',
            }, {
            title: '工艺路线',
        }];

        const routeList = () => (
            <div className="cardContent">
                <div style={{ marginBottom: 15 }}>
                    <CreateModal
                      FormItem={CFormItem}
                      submit={() => this.handleCreat( )}
                    />
                </div>
                <SimpleTable
                  size="middle"
                  bordered
                  loading={loading}
                  data={Data}
                  columns={Tcolumns}
                  isHaveSelect={false}
                  onChange={this.handleTableChange}
                //   expandedRowRender={this.renderSubTable}
                />
                <UpdateModal
                  FormItem={UFormItem}
                  updateItem={updateFromItem}
                  submit={this.handleUpdate}
                  showModal={UModalShow}
                  hideModal={this.toggleUModalShow}
                />
            </div>
        )

        return (
            <PageHeaderLayout wrapperClassName="pageContent" BreadcrumbList={bcList}>
                <Switch>
                    <Route path="/procession/route/config" component={Config} />
                    <Route path="/procession/route" component={routeList} />
                </Switch>
            </PageHeaderLayout>
        )
    }
}
