import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popover, Divider, Popconfirm } from 'antd';
import { urlBase } from 'utils/TAjax';
import SimpleTable from 'components/TTable/SimpleTable';
import { CreateModal, UpdateModal } from 'components/TModal';
import { fn_mes_trans } from 'functions';
// import { SimpleQForm, StandardQForm } from 'components/TForm';
import { device_brand_list, device_brand_add, device_brand_update, device_brand_delete } from 'actions/device'
import PageHeaderLayout from '../../base/PageHeaderLayout';

@connect( ( state, props ) => ( {
        Breadcrumb: state.Breadcrumb,
        deviceBrand: state.deviceBrand,
    } ) )
export default class brand extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            // tableDataList: [],
            updateFromItem: {},
            // total: 0,
            current: 0,
            pageSize: 10,
            // WorkshopUUID: -1,
            UModalShow: false,
            // loading: true,

            DeviceModelList: [],
            DeviceTypeList: [],
            // ModelUUID: -1,
            // TypeUUID: -1,
        }
        this.url = '/api/TDevice/device'
    }

    componentWillMount() {
        // this.getDevModelList();
        // this.getDevTypeList();
        // this.getTableList();
        // this.props.dispatch( device_brand_list( { }, ( respose ) => {} ) )
    }

    componentDidMount() {
        const { pageSize, current } = this.state;
        const page = { page: current, size: pageSize }
        const { list } = this.props.deviceBrand;
        if ( Array.isArray( list ) && list.length === 0 ) {
            this.props.dispatch( device_brand_list( page, ( respose ) => {} ) )
            // console.log( '...请求list...' );
        }
    }

    handleCreat = ( data ) => {
        console.log( '开始添加', data );
        const addData = {
            cols: fn_mes_trans.toCols( data ),
        }
        this
            .props
            .dispatch( device_brand_add( addData ) )
    }

    handleDelete = ( data ) => {
        const deleteData = {
            uuids: [data.uObjectUUID],
        }
        // console.log( '开始删除', deleteData );
        this
            .props
            .dispatch( device_brand_delete( deleteData ) )
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
            .dispatch( device_brand_update( editData ) )
    }

    handleQuery = ( data ) => {
        // console.log( '查询的值是:', data );
        // const { keyWord, TypeUUID, ModelUUID } = data;
        this.setState( {
            // keyWord,
            // TypeUUID,
            // ModelUUID,
            current: 1,
        }, () => {
            this.getTableList();
        } );
    }

    handleTableChange=( pagination ) => {
        // console.log( 'pagination', pagination );
        const { current, pageSize } = pagination;
        this.setState( { current: current, pageSize, loading: true }, () => {
            // console.log( '条件', this.state, this.getQuePage() )
            const page = { page: current - 1, size: pageSize }
            this.props.dispatch( device_brand_list( page, ( respose ) => {} ) )
        } );
    }

    toggleUModalShow=( record ) => {
        this.setState( { UModalShow: !this.state.UModalShow, updateFromItem: record } );
    }


    render() {
        // let Feature=this.feature;
        const {
            // tableDataList,
            DeviceModelList,
            DeviceTypeList,
            current,
            // loading,
            // total,
            pageSize, updateFromItem, UModalShow,
        } = this.state;
        // const { Breadcrumb, detail } = this.props;
        const { list, total, loading } = this.props.deviceBrand;
        const Data = {
            // list:tableDataList,
            list: list,
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
                title: 'LOGO',
                dataIndex: 'Image',
                render: ( e, record ) => {
                    // console.log('图片地址',e);
                    const content = (
                        <div>
                          <img alt="这是图片" width="300" src={urlBase + e} />
                        </div>
                    );
                    return (
                        <Popover placement="right" content={content} trigger="hover">
                          {/* <Button>Right</Button> */}
                          <img alt="这是图片" height="50" src={urlBase + e} />
                        </Popover>
                    )
                },
            },
            {
                title: '名称',
                dataIndex: 'strBrandName',
                type: 'string',
            }, {
                title: '编号',
                dataIndex: 'strBrandCode',
                type: 'string',
            }, {
                title: '操作',
                dataIndex: 'UUID',
                render: ( UUID, record ) => ( <span>
                        <a
                          onClick={() => this.toggleUModalShow( record )}
                          onKeyDown={() => ''}
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
                name: 'strBrandName',
                label: '名称',
                type: 'string',
                placeholder: '请输入名称',
                rules: [{ required: true, message: '请输入名称' }],
            }, {
                name: 'strBrandCode',
                label: '编号',
                type: 'string',
                placeholder: '请输入编号',
                rules: [{ required: true, message: '请输入编号' }],
            },
        ];
        // 添加的弹出框菜单
        const CFormItem = [
            {
                name: 'strBrandName',
                label: '名称',
                type: 'string',
                placeholder: '请输入名称',
                rules: [{ required: true, message: '请输入名称' }],
            }, {
                name: 'strBrandCode',
                label: '编号',
                type: 'string',
                placeholder: '请输入编号',
                rules: [{ required: true, message: '请输入编号' }],
            }, /* {
                name: 'ModelUUID',
                label: '设备型号',
                type: 'select',
                defaultValue:'1',
                rules: [{ required: true, message: '请选择设备型号' }],
                options:DeviceModelList
            } */
        ];
        // 查询的数据项
        const RFormItem = [
            {
                name: 'keyWord',
                label: '搜索内容',
                type: 'string',
                placeholder: '请输入要搜索的内容',
            }, {
                name: 'TypeUUID',
                label: '设备类别',
                type: 'select',
                hasAllButtom: true,
                defaultValue: '-1',
                width: 150,
                options: DeviceTypeList,
            }, {
                name: 'ModelUUID',
                label: '设备型号',
                type: 'select',
                hasAllButtom: true,
                defaultValue: '-1',
                width: 200,
                options: DeviceModelList,
            },
        ];

        const bcList = [{
            title: '首页',
            href: '/',
            }, {
            title: '设备管理',
            // href: '/',
            }, {
            title: '设备台帐',
        }];

        return (
          <PageHeaderLayout wrapperClassName="pageContent" BreadcrumbList={bcList}>
                {/* <StandardQForm
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
                  title="编辑"
                  FormItem={UFormItem}
                  updateItem={updateFromItem}
                  submit={this.handleUpdate}
                  showModal={UModalShow}
                  hideModal={this.toggleUModalShow}
                />
          </PageHeaderLayout>
        )
    }
}
