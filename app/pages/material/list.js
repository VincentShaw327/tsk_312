/**
 *这是产品列表页
 *添加日期:2017.12.06
 *添加人:shaw
 * */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popover, Divider, Popconfirm } from 'antd';
import { item_list, item_add, item_update, item_delete } from 'actions/material';
import SimpleTable from 'components/TTable/SimpleTable';
import { CreateModal, UpdateModal } from 'components/TModal';
import { SimpleQForm } from 'components/TForm';
import { fn_mes_trans } from 'functions'
import PageHeaderLayout from '../../base/PageHeaderLayout';
import { TPostData, urlBase } from '../../utils/TAjax';


@connect( ( state, props ) => ( {
    Breadcrumb: state.Breadcrumb,
    materialList: state.materialList,
} ) )
export default class materialList extends Component {
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
        // this
        //     .props
        //     .dispatch( item_list( { }, ( respose ) => {} ) )
    }

    componentDidMount() {
        const { pageSize, current } = this.state;
        const page = { page: current, size: pageSize }
        const { list } = this.props.materialList;
        if ( Array.isArray( list ) && list.length === 0 ) {
            this.props.dispatch( item_list( page, ( respose ) => {} ) )
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
            .dispatch( item_add( addData, respose => console.log( '添加成功！', respose ) ) )
    }

    handleDelete = ( data ) => {
        const deleteData = {
            uuids: [data.uObjectUUID],
        }
        // console.log( '开始删除', deleteData );
        this
            .props
            .dispatch( item_delete( deleteData ) )
    }

    handleUpdate = ( data ) => {
        const item = this.state.updateFromItem;
        const editData = {
            uuid: item.uObjectUUID,
            cols: fn_mes_trans.toCols( data ),
        }
        this
            .props
            .dispatch( item_update( editData ) )
    }

    handleQuery=( data ) => {

    }

    handleTableChange=( pagination ) => {
        // console.log( 'pagination', pagination );
        const { current, pageSize } = pagination;
        this.setState( { current: current, pageSize, loading: true }, () => {
            // console.log( '条件', this.state, this.getQuePage() )
            const page = { page: current - 1, size: pageSize }
            this.props.dispatch( item_list( page, ( respose ) => {} ) )
        } );
    }

    toggleUModalShow=( record ) => {
        console.log( '更新前:', record )
        this.setState( { UModalShow: !this.state.UModalShow, updateFromItem: record } );
    }


    render() {
        // let Feature=this.feature;
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
        const { list, total, loading } = this.props.materialList;
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
                title: '图片',
                dataIndex: 'Image',
                render: ( e, record ) => {
                    const content = (
                        <div>
                          <img alt="产品图片" width="300" src={urlBase + e} />
                        </div>
                    );
                    return (
                        <Popover placement="right" content={content} trigger="hover">
                          {/* <Button>Right</Button> */}
                          <img alt="产品图片" height="50" src={urlBase + e} />
                        </Popover>
                    )
                },
            },
            {
                title: '名称',
                dataIndex: 'strMaterialName',
            },
            {
                title: '型号',
                dataIndex: 'strMaterialModel',
            },
            {
                title: '编码',
                dataIndex: 'strMaterialCode',
            },
            {
                title: '库存',
                dataIndex: 'nMaterialRateCount',
            },
            {
                title: '库存上限',
                dataIndex: 'nMaterialMaxCount',
            },
            {
                title: '库存下限',
                dataIndex: 'nMaterialMinCount',
            },
            {
                title: '库存上预警',
                dataIndex: 'nMaterialUpperCount',
            },
            {
                title: '库存下预警',
                dataIndex: 'nMaterialLowerCount',
            },
            {
                title: '备注',
                dataIndex: 'strMaterialDesc',
            },
            {
                title: '操作',
                dataIndex: 'UUID',
                width: 120,
                render: ( UUID, record ) => (
                <span>
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
                </span>
                ),
            },
        ];
        // 更新弹框数据项
        const UFormItem = [
            {
                name: 'strMaterialName',
                label: '名称',
                type: 'string',
                placeholder: '请输入型号名称',
                rules: [{ required: true, message: '名称不能为空' }],
            },
            {
                name: 'strMaterialModel',
                label: '型号',
                type: 'string',
                placeholder: '请输入型号编号',
                rules: [{ required: true, message: '编号不能为空' }],
            },
            {
                name: 'strMaterialCode',
                label: '编号',
                type: 'string',
                placeholder: '请输入序列号',
                rules: [{ required: true, message: '序列号不能为空' }],
            },
            {
                name: 'strMaterialDesc',
                label: '备注',
                type: 'string',
            },
            {
                 name: 'strMaterialImage',
                 label: '图片',
                 type: 'antUpload',
                 url: '/api/tupload/do',
            },
        ];
        // 添加的弹出框菜单
        const CFormItem = [
            {
                name: 'strMaterialName',
                label: '名称',
                type: 'string',
                placeholder: '请输入型号名称',
                rules: [{ required: true, message: '名称不能为空' }],
            },
            {
                name: 'strMaterialModel',
                label: '型号',
                type: 'string',
                placeholder: '请输入型号编号',
                rules: [{ required: true, message: '编号不能为空' }],
            },
            {
                name: 'strMaterialCode',
                label: '编号',
                type: 'string',
                placeholder: '请输入序列号',
                rules: [{ required: true, message: '序列号不能为空' }],
            },
            {
                 name: 'Image',
                 label: '图片',
                 type: 'antUpload',
                 url: '/api/tupload/do',
            },
        ];
        // 查询的数据项
        const RFormItem = [
            {
                name: 'keyWord',
                label: '搜索内容',
                type: 'string',
                placeholder: '请输入要搜索的内容',
            },
        ];

        return (
          <PageHeaderLayout
            // title="产品型号"
            wrapperClassName="pageContent"
            BreadcrumbList={Breadcrumb.BCList}
          >
            <div className="cardContent">
                {/* <Feature /> */}
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
