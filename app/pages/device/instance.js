/**
 *这是设备列表页
 *添加日期:2017.12.06
 *添加人:shaw
 * */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popover, message, Divider, Popconfirm } from 'antd';
import { device_equipment_list, device_equipment_add, device_equipment_update, device_equipment_delete } from 'actions/device'
import { TPostData, urlBase } from 'utils/TAjax';
import SimpleTable from 'components/TTable/SimpleTable';
import { CreateModal, UpdateModal } from 'components/TModal';
import { SimpleQForm, StandardQForm } from 'components/TForm';
import PageHeaderLayout from '../../base/PageHeaderLayout';
import { fn_mes_trans } from 'functions'

@connect( ( state, props ) => {
    console.log( 'state', state )
    return {
        Breadcrumb: state.Breadcrumb,
        device: state.device,
    }
} )
export default class DeviceList extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            tableDataList: [],
            updateFromItem: {},
            total: 0,
            current: 1,
            pageSize: 10,
            WorkshopUUID: -1,
            UModalShow: false,
            loading: true,

            DeviceModelList: [],
            DeviceTypeList: [],
            ModelUUID: -1,
            TypeUUID: -1,
        }
        this.url = '/api/TDevice/device'
    }

    componentWillMount() {
        // this.getDevModelList();
        // this.getDevTypeList();
        // this.getTableList();
        this.props.dispatch( device_equipment_list( { }, ( respose ) => {} ) )
    }

    getDevModelList() {
        TPostData(
 '/api/TDevice/device_model', 'ListActive', { PageIndex: 0, PageSize: -1, ParentUUID: -1 },
            ( res ) => {
                let Ui_list = res.obj.objectlist || [],
                    list = [];
                Ui_list.forEach( ( item, index ) => {
                    list.push( { key: index, value: item.UUID.toString(), text: item.Name } )
                } );
                this.setState( { DeviceModelList: list } );
            },
            ( error ) => {
                message.info( error );
            },
        );
    }

    getDevTypeList() {
        TPostData(
 '/api/TDevice/device_type', 'ListActive', { PageIndex: 0, PageSize: -1, ParentUUID: -1 },
            ( res ) => {
                let Ui_list = res.obj.objectlist || [],
                    list = [];
                Ui_list.forEach( ( item, index ) => {
                    list.push( { key: index, value: item.UUID.toString(), text: item.Name } )
                } );
                this.setState( { DeviceTypeList: list } );
            },
            ( error ) => {
                message.info( error );
            },
        )
    }

    getTableList( que ) {
        const { 
current, pageSize, keyword, TypeUUID, ModelUUID
 } = this.state;
        const dat = {
            PageIndex: current - 1, // 分页：页序号，不分页时设为0
            PageSize: pageSize, // 分页：每页记录数，不分页时设为-1
            ModelUUID: ModelUUID, // 所属车间UUID，不作为查询条件时取值设为-1
            TypeUUID: TypeUUID, // 类型UUID，不作为查询条件时取值设为-1
            KeyWord: keyword,
            // KeyWord : que?que.keyWord:'',
        }

        TPostData(
 this.url, 'ListActive', dat,
            ( res ) => {
                let list = [];
                console.log( '查询到设备列表', res );
                let data_list = res.obj.objectlist || [];
                let totalcount = res.obj.totalcount;
                data_list.forEach( ( item, index ) => {
                    list.push( {
                        key: index,
                        UUID: item.UUID,
                        ModelUUID: item.ModelUUID,
                        DeviceID: item.ID,
                        WorkshopUUID: item.WorkshopUUID,
                        Image: item.ModelImage,
                        strDeviceName: item.Name,
                        strDeviceModel: item.ModelName,
                        strDeviceSN: item.SN,
                        strDeviceType: item.TypeName,
                        strLabel: item.Label,
                        strDesc: item.Desc,
                    } )
                } )
                this.setState( { tableDataList: list, total: totalcount, loading: false } );
            },
            ( error ) => {
                message.info( error );
            },
        )
    }

    handleCreat = ( data ) => {
        const addData = {
            cols: fn_mes_trans.toCols( data ),
        }
        console.log( '开始添加', addData );
        this
            .props
            .dispatch( device_equipment_add( addData, respose => console.log( '添加成功！', respose ) ) )
    }

    handleDelete = ( data ) => {
        const deleteData = {
            uuids: [data.uObjectUUID],
        }
        console.log( '开始删除', deleteData );
        this
            .props
            .dispatch( device_equipment_delete( deleteData ) )
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
            .dispatch( device_equipment_update( editData ) )
    }

    handleQuery=( data ) => {
        console.log( '查询的值是:', data );
        const { keyWord, TypeUUID, ModelUUID } = data;
        this.setState( {
 keyWord, TypeUUID, ModelUUID, current: 1 
}, () => {
            this.getTableList();
        } );
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
        // let Feature=this.feature;
        const {
            tableDataList,
            DeviceModelList,
            DeviceTypeList,
            current,
            // loading,
            // total,
            pageSize, updateFromItem, UModalShow,
        } = this.state;
        const { Breadcrumb, detail } = this.props;
        const { list, total, loading } = this.props.device;
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
                            <img width="300" src={urlBase + e} />
                        </div>
                    );
                    return (
                        <Popover placement="right" content={content} trigger="hover">
                            {/* <Button>Right</Button> */}
                            <img height="50" src={urlBase + e} />
                        </Popover>
                    )
                },
            },
            {
                title: '名称',
                dataIndex: 'strEquipmentName',
                type: 'string',
            }, {
                title: '编号',
                dataIndex: 'strEquipmentCode',
                type: 'string',
            }, {
                title: '序列号',
                dataIndex: 'SN',
                type: 'string',
            }, {
                title: '类型',
                dataIndex: 'DeviceType',
                type: 'string',
            }, {
                title: '型号',
                dataIndex: 'DeviceModel',
                type: 'string',
            }, {
                title: '品牌',
                dataIndex: 'brand',
                type: 'string',
            }, {
                title: '操作',
                dataIndex: 'UUID',
                render: ( UUID, record ) => <span>
                        <a onClick={this.toggleUModalShow.bind(this,record)}>编辑</a>
                        <Divider type="vertical"/>
                        <Popconfirm
                            placement="topRight"
                            title="确定删除此项数据？"
                            onConfirm={this.handleDelete.bind(this,record)}
                            okText="确定" cancelText="取消">
                            <a href="#">删除</a>
                        </Popconfirm>
                    </span>,
            },
        ];
        // 更新弹框数据项
        const UFormItem = [
            {
                name: 'strEquipmentName',
                label: '名称',
                type: 'string',
                placeholder: '请输入名称',
                rules: [{ required: true, message: '请输入名称' }],
            }, {
                name: 'strEquipmentCode',
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
        // 添加的弹出框菜单
        const CFormItem = [
            {
                name: 'strEquipmentName',
                label: '名称',
                type: 'string',
                placeholder: '请输入名称',
                rules: [{ required: true, message: '请输入名称' }],
            }, {
                name: 'strEquipmentCode',
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
                      submit={this.handleCreat.bind( this )}
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
                  submit={this.handleUpdate.bind( this )}
                  showModal={UModalShow}
                  hideModal={this.toggleUModalShow}
                />
            </PageHeaderLayout>
        )
    }
}
