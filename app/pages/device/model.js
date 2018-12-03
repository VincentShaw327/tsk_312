/**
 *这是设备列表页
 *添加日期:2017.12.06
 *添加人:shaw
 * */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popover, Divider, Popconfirm } from 'antd';
import { device_model_list, device_model_add, device_model_update, device_model_delete } from 'actions/device'
import { urlBase } from 'utils/TAjax';
import SimpleTable from 'components/TTable/SimpleTable';
import { CreateModal, UpdateModal } from 'components/TModal';
import { fn_mes_trans } from 'functions'
// import { SimpleQForm, StandardQForm } from 'components/TForm';
import PageHeaderLayout from '../../base/PageHeaderLayout';

@connect( ( state, props ) => ( {
        Breadcrumb: state.Breadcrumb,
        deviceModel: state.deviceModel,
    } ) )
export default class model extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            // tableDataList: [],
            DeviceTypeList: [],
            updateFromItem: {},
            // total: 0,
            current: 1,
            pageSize: 10,
            UModalShow: false,
            // loading: true,
        }
        this.url = '/api/TDevice/device_model';
    }

    componentWillMount() {
        // this.getDevTypelist();
        // this.getTableList();
        this.props.dispatch( device_model_list( { }, ( respose ) => {} ) )
    }

    handleCreat = ( data ) => {
        const addData = {
            cols: fn_mes_trans.toCols( data ),
        }
        // console.log( '开始添加', addData );
        this
            .props
            .dispatch( device_model_add( addData, respose => console.log( '添加成功！', respose ) ) )
    }

    handleDelete = ( data ) => {
        const deleteData = {
            uuids: [data.uObjectUUID],
        }
        // console.log( '开始删除', deleteData );
        this
            .props
            .dispatch( device_model_delete( deleteData ) )
    }

    handleUpdate = ( data ) => {
        const item = this.state.updateFromItem;
        const editData = {
            uuid: item.uObjectUUID,
            cols: fn_mes_trans.toCols( data ),
        }
        // console.log( '开始修改', editData );
        this
            .props
            .dispatch( device_model_update( editData ) )
    }

    handleQuery=( data ) => {
        // console.log( '查询的值是:', data );
        /* const { keyWord, TypeUUID } = data;
        this.setState( { keyWord, TypeUUID }, () => {
            // this.getTableList({keyWord,TypeUUID});
            this.getTableList();
        } ); */
    }

    handleTableChange=( pagination ) => {
        // console.log('pagination',pagination);
        const { current, pageSize } = pagination;
        this.setState( { current, pageSize, loading: true }, () => {
            this.getTableList();
        } );
    }

    toggleUModalShow=( record ) => {
        this.setState( { UModalShow: !this.state.UModalShow, updateFromItem: record } );
    }


    render() {
        const {
            DeviceTypeList,
            // tableDataList,
            // loading,
            current,
            // total,
            pageSize, updateFromItem, UModalShow,
        } = this.state;
        // const { Breadcrumb } = this.props;
        const { list, total, loading } = this.props.deviceModel;
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
                title: '图片',
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
                title: '型号',
                dataIndex: 'strModelName',
                type: 'string',
            },
            {
                title: '编号',
                dataIndex: 'strModelCode',
                type: 'string',
            },
            {
                title: '类别',
                dataIndex: 'TypeName',
                type: 'string',
            },
            {
                title: '品牌',
                dataIndex: 'breand',
                type: 'string',
            },
            {
                title: '备注',
                dataIndex: 'strModelNote',
                type: 'string',
            },
            {
                title: '操作',
                dataIndex: 'UUID',
                width: 150,
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
                </span> ),
            },
        ];
        // 更新弹框数据项
        const UFormItem = [
            {
                name: 'strModelName',
                label: '型号名称',
                type: 'string',
                placeholder: '请输入型号名称',
                rules: [{ required: true, message: '名称不能为空' }],
            },
            {
                name: 'strModelCode',
                label: '型号编号',
                type: 'string',
                placeholder: '请输入型号编号',
                rules: [{ required: true, message: '编号不能为空' }],
            },
            /* {
                name: 'TypeUUID',
                label: '设备类别',
                rules: [ { required: true, message: '请选择类别' } ],
                type: 'select',
                options: DeviceTypeList,
            }, */
            {
                name: 'strModelImage',
                label: '图片',
                type: 'antUpload',
                url: '/api/tupload/do',
            },
        ];
        // 添加的弹出框菜单
        const CFormItem = [
            {
                name: 'strModelName',
                label: '型号名称',
                type: 'string',
                placeholder: '请输入型号名称',
                rules: [{ required: true, message: '名称不能为空' }],
            },
            {
                name: 'strModelCode',
                label: '型号编号',
                type: 'string',
                placeholder: '请输入型号编号',
                rules: [{ required: true, message: '编号不能为空' }],
            },
            /* {
                name: 'TypeUUID',
                label: '设备类别',
                rules: [ { required: true, message: '请选择类别' } ],
                type: 'select',
                options: DeviceTypeList,
            }, */
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
            {
                name: 'TypeUUID',
                label: '设备类别',
                type: 'select',
                hasAllButtom: true,
                defaultValue: '-1',
                width: 150,
                options: DeviceTypeList,
            },
        ];

        const bcList = [{
            title: '首页',
            href: '/',
            }, {
            title: '设备管理',
            // href: '/',
            }, {
            title: '设备型号',
        }];
        return (
            <PageHeaderLayout wrapperClassName="pageContent" BreadcrumbList={bcList}>
                {/* <SimpleQForm
                    FormItem={RFormItem}
                    submit={this.handleQuery}
                /> */}
                <UpdateModal
                  FormItem={UFormItem}
                  updateItem={updateFromItem}
                  submit={this.handleUpdate}
                  showModal={UModalShow}
                  hideModal={this.toggleUModalShow}
                />
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
            </PageHeaderLayout>
        )
    }
}
