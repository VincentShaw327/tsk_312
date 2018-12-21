/**
 *这是设备类别页
 *添加日期:2017.12.05
 *添加人:shaw
 * */
// /* eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Divider, Popconfirm } from 'antd';
import { category_list, category_add, category_update, category_delete } from 'actions/material';
import SimpleTable from 'components/TTable/SimpleTable';
import { CreateModal, UpdateModal } from 'components/TModal';
// import { SimpleQForm, StandardQForm } from 'components/TForm';
import { fn_mes_trans } from 'functions'
import PageHeaderLayout from '../../base/PageHeaderLayout';

@connect( ( state, props ) => ( {
    materialCategory: state.materialCategory,
} ) )
export default class category extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            // tableDataList: [],
            updateFromItem: {},
            // total: 0,
            current: 0,
            pageSize: 10,
            UModalShow: false,
            // loading: true,
        }
    }

    componentWillMount() {
        // this.getTableList();
        const filter = {
            strCategoryName: 'test',
        }
        // this.props.dispatch( category_list( {}, ( respose ) => {} ) )
    }

    componentDidMount() {
        const { pageSize, current } = this.state;
        const page = { page: current, size: pageSize }
        const { list } = this.props.materialCategory;
        if ( Array.isArray( list ) && list.length === 0 ) {
            this.props.dispatch( category_list( page, ( respose ) => {} ) )
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
            .dispatch( category_add( addData, respose => console.log( '添加成功！', respose ) ) )
    }

    handleDelete = ( data ) => {
        const deleteData = {
            uuids: [data.uObjectUUID],
        }
        // console.log( '开始删除', deleteData );
        this
            .props
            .dispatch( category_delete( deleteData ) )
    }

    handleUpdate = ( data ) => {
        const item = this.state.updateFromItem;
        const editData = {
            uuid: item.uObjectUUID,
            cols: fn_mes_trans.toCols( data ),
        }
        this
            .props
            .dispatch( category_update( editData ) )
    }

    handleQuery=( data ) => {

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

    toggleUModalShow=( record ) => {
        this.setState( { UModalShow: !this.state.UModalShow, updateFromItem: record } );
    }

    render() {
        const {
            // loading,
            current,
            // total,
            pageSize,
            updateFromItem,
            UModalShow,
        } = this.state;
        const { list, total, loading } = this.props.materialCategory;
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
                title: '名称',
                dataIndex: 'strCategoryName',
                type: 'string',
            },
            {
                title: '备注',
                dataIndex: 'strCategoryNote',
                type: 'string',
                width: 300,
            },
            {
                title: '操作',
                dataIndex: 'uMachineUUID',
                width: 120,
                render: ( txt, record ) => ( <span>
                    <a
                      onKeyDown={() => this.toggleUModalShow( record )}
                      onClick={() => this.toggleUModalShow( record )}
                    >编辑
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
                                             </span> ),
            },
        ];

        // 更新弹框数据项
        const UFormItem = [
            {
                name: 'strCategoryName',
                label: '类别名称',
                type: 'string',
                placeholder: '请输入类别名称',
                rules: [{ required: true, min: 1, message: '名称不能为空' }],
            },
            {
                name: 'strCategoryNote',
                label: '备注',
                type: 'string',
                placeholder: '编号',
                rules: [{ required: true, min: 1, message: '名称不能为空' }],
            },
        ];

        // 可设置的查询字段
        const CFormItem = [
            {
                name: 'strCategoryName',
                label: '类别名称',
                type: 'string',
                placeholder: '请输入类别名称',
                rules: [{ required: true, min: 1, message: '名称不能为空' }],
            },
            {
                name: 'strCategoryNote',
                label: '备注',
                type: 'string',
                placeholder: '编号',
                rules: [{ required: true, min: 1, message: '名称不能为空' }],
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
            title: '设备管理',
            href: '/',
        }, {
            title: '设备类别',
        }];
        return (
            <PageHeaderLayout wrapperClassName="pageContent" BreadcrumbList={bcList}>
                <div className="cardContent">
                    {/* <SimpleQForm
                        FormItem={RFormItem}
                        submit={this.handleQuery}
                    /> */}
                    <div style={{ marginBottom: 15 }}>
                        <CreateModal
                          FormItem={CFormItem}
                          submit={this.handleCreat}
                        />
                    </div>
                    <SimpleTable
                      size="middle"
                      loading={loading}
                      data={Data}
                      columns={Tcolumns}
                      isHaveSelect={false}
                      bordered
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
