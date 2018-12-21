/**
 *这是用户列表页
 *添加日期:2018.03.03
 *添加人:shaw
 * */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { message, Divider, Popconfirm } from 'antd';
import { role_list, role_add, role_update, role_delete } from 'actions/user';
import SimpleTable from 'components/TTable/SimpleTable';
import { CreateModal, UpdateModal } from 'components/TModal';
import { fn_mes_trans } from 'functions'
import PageHeaderLayout from '../../base/PageHeaderLayout';
// import { TPostData } from 'utils/TAjax';
// import { hashHistory, Link } from 'react-router'
// import FeatureSetConfig from 'components/TCommon/tableConfig';
// import MD5 from 'components/TCommon/md5';
// import { SimpleQForm, StandardQForm } from 'components/TForm';


@connect( ( state, props ) =>
    // console.log( 'state', state )
     ( {
        Breadcrumb: state.Breadcrumb,
        UserRole: state.UserRole,
    } ) )
export default class TAuthList extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            tableDataList: [],
            updateFromItem: {},
            total: 0,
            current: 0,
            pageSize: 10,
            UModalShow: false,
            loading: true,
            keyWord: '',
        }
        this.url = '/api/TUser/auth';
    }

    componentWillMount() {
        // this.getTableList();
        // this.props.dispatch( role_list( { current: 1 }, ( respose ) => {} ) )
    }

    componentDidMount() {
        const { pageSize, current } = this.state;
        const page = { page: current, size: pageSize }
        const { list } = this.props.UserRole;
        if ( Array.isArray( list ) && list.length === 0 ) {
            this.props.dispatch( role_list( page, ( respose ) => {} ) )
            // console.log( '...请求list...' );
        }
    }

    handleCreat = ( data ) => {
        const addData = {
            cols: fn_mes_trans.toCols( data ),
        }
        // console.log( '开始添加', addData );
        this
            .props
            .dispatch( role_add( addData ) )
    }

    handleDelete = ( data ) => {
        const deleteData = {
            uuids: [data.uObjectUUID],
        }
        // console.log( '开始删除', deleteData );
        this
            .props
            .dispatch( role_delete( deleteData ) )
    }

    handleUpdate = ( data ) => {
        const item = this.state.updateFromItem;
        const editData = {
            uuid: item.uObjectUUID,
            cols: fn_mes_trans.toCols( data ),
        }
        console.log( '开始修改', data, editData );
        this
            .props
            .dispatch( role_update( editData ) )
    }

    handleQuery=( data ) => {
        // const { keyWord } = data;
        // this.setState( { keyWord }, () => {
        //     this.getTableList();
        // } );
    }

    handleTableChange=( pagination ) => {
        // console.log( 'pagination', pagination );
        const { current, pageSize } = pagination;
        this.setState( { current: current, pageSize, loading: true }, () => {
            // console.log( '条件', this.state, this.getQuePage() )
            const page = { page: current - 1, size: pageSize }
            this.props.dispatch( role_list( page, ( respose ) => {} ) )
        } );
    }

    toggleUModalShow=( record ) => {
        this.setState( { UModalShow: !this.state.UModalShow, updateFromItem: record } );
    }

    render() {
        const {
            tableDataList,
            // loading,
            current,
            // total,
            pageSize,
            updateFromItem,
            UModalShow,
        } = this.state;
        // const { Breadcrumb } = this.props;
        const { list, total, loading } = this.props.UserRole;
        const Data = {
            // list:tableDataList,
            list: list,
            pagination: { total, current, pageSize },
        };

        // table表格表头参数
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
                title: '角色名称',
                dataIndex: 'strCategoryName',
            }, {
                title: '角色编号',
                dataIndex: 'strCategoryCode',
            }, {
                title: '备注',
                dataIndex: 'strCategoryNote',
            }, {
                title: '操作',
                dataIndex: 'UUID',
                width: 120,
                render: ( UUID, record ) => (
                <span>
                    <a onKeyDown={() => ''} onClick={() => this.toggleUModalShow( record )}>编辑</a>
                    <Divider type="vertical" />
                    <Popconfirm
                      placement="topRight"
                      title="确定删除此项数据？"
                      onConfirm={() => this.handleDelete( record )}
                      okText="确定"
                      cancelText="取消"
                    >
                        <a>删除</a>
                    </Popconfirm>
                </span>
                ),
            },
        ];
        // 更新弹框数据项
        const UFormItem = [
            {
                name: 'strCategoryName',
                label: '角色名称',
                type: 'string',
                placeholder: '请输入权限名称',
                rules: [{ required: true, message: '编号名不能为空' }],
            },
             {
                 name: 'strCategoryCode',
                 label: '角色编号',
                 type: 'string',
                 placeholder: '请输入权限编号',
                 rules: [{ required: true, message: '权限编号不能为空' }],
             },
        ];
        // 添加的弹出框菜单
        const CFormItem = [
            {
               name: 'strCategoryName',
               label: '角色名称',
               type: 'string',
               placeholder: '请输入权限名称',
               rules: [{ required: true, message: '编号名不能为空' }],
           },
            {
                name: 'strCategoryCode',
                label: '角色编号',
                type: 'string',
                placeholder: '请输入权限编号',
                rules: [{ required: true, message: '权限编号不能为空' }],
            },
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
            href: '/',
            }, {
            title: '系统设置',
            href: '/',
            }, {
            title: '权限列表',
        }];
        return (
            <PageHeaderLayout wrapperClassName="pageContent" BreadcrumbList={bcList}>
                <div className="cardContent">
                    {/* <SimpleQForm
                        FormItem={RFormItem}
                        submit={this.handleQuery}
                    /> */}
                    <div style={{ marginBottom: 15 }} >
                        <CreateModal
                          FormItem={CFormItem}
                          submit={this.handleCreat}
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
                    />
                    <UpdateModal
                      FormItem={UFormItem}
                      updateItem={updateFromItem}
                      submit={this.handleUpdate}
                      showModal={UModalShow}
                      hideModal={this.toggleUModalShow}
                    />
                </div>
            </PageHeaderLayout>
        )
    }
}
