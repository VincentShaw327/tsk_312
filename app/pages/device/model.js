/**
 *这是设备列表页
 *添加日期:2017.12.06
 *添加人:shaw
 **/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory, Link } from 'react-router'
import { Table, Menu, Icon, Badge,Popover, Dropdown,message,Divider,Popconfirm } from 'antd';
import { device_model_list,device_model_add,device_model_update,device_model_delete } from 'actions/device'
import { TPostData,urlBase } from 'utils/TAjax';
import SimpleTable from 'components/TTable/SimpleTable';
import { CreateModal,UpdateModal } from 'components/TModal';
import {SimpleQForm,StandardQForm } from 'components/TForm';
import PageHeaderLayout from '../../base/PageHeaderLayout';
import {fn_mes_trans} from 'functions'

@connect( ( state, props ) => {
    console.log( 'state', state )
    return {
        Breadcrumb:state.Breadcrumb,
        deviceModel: state.deviceModel,
    }
}, )
export default class model extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            tableDataList:[],
            DeviceTypeList:[],
            updateFromItem:{},
            total:0,
            current:1,
            pageSize:10,
            UModalShow:false,
            loading:true,
        }
        this.url='/api/TDevice/device_model';
    }

    componentWillMount() {
        // this.getDevTypelist();
        // this.getTableList();
        this.props.dispatch( device_model_list( { }, ( respose ) => {} ) )
    }

    getTableList(que){
        const {current,pageSize,TypeUUID,keyWord}=this.state;
        const dat = {
            PageIndex : current-1,       //分页：页序号，不分页时设为0
            PageSize:pageSize,   //分页：每页记录数，不分页时设为-1
            // TypeUUID: que?que.TypeUUID:-1,  //类型UUID，不作为查询条件时取值设为-1
            TypeUUID:TypeUUID,  //类型UUID，不作为查询条件时取值设为-1
            CategoryUUID: -1,
            VendorUUID: -1,
            // KeyWord : que?que.keyWord:''
            KeyWord :keyWord
        }

        TPostData( this.url, "ListActive", dat,
            (res) => {
                var list = [];
                console.log("查询到设备型号列表", res);
                var data_list = res.obj.objectlist || [];
                var totalcount = res.obj.totalcount;
                data_list.forEach((item, index)=> {
                    list.push( {
                        key: index,
                        UUID: item.UUID,
                        TypeUUID: item.TypeUUID,
                        Image: item.Image,
                        Name: item.Name,
                        Number: item.ID,
                        TypeName: item.TypeName,
                        Desc: item.Desc,
                        UpdateDateTime: item.UpdateDateTime,

                        TypeID: "-",
                        Status: 1,
                        Note: "-",
                        CategoryUUID: 0, //保留字段
                        VendorUUID: 0, //保留字段
                    } );
                })
                this.setState({ tableDataList: list, total: totalcount, loading: false });
            },
            ( error )=> {
              message.info( error );
            }
        )

    }

    getDevTypelist(){

        TPostData( '/api/TDevice/device_type', 'ListActive', {PageIndex: 0,PageSize: -1,ParentUUID: -1},
            ( res )=> {

                let Ui_list = res.obj.objectlist || [],
                    list=[];
                Ui_list.forEach( function ( item, index ) {
                    list.push( { key: index, value: item.UUID.toString(), text: item.Name } )
                } );
                this.setState({DeviceTypeList:list});
            },
            ( error )=> {
                message.info( error );
            }
        )

    }

    handleCreat = (data) => {
        const addData = {
            cols: fn_mes_trans.toCols(data)
        }
        console.log('开始添加', addData);
        this
            .props
            .dispatch(device_model_add(addData, (respose) => console.log('添加成功！', respose)))
    }

    handleDelete = (data) => {
        const deleteData = {
            uuids:[data.uObjectUUID]
        }
        console.log('开始删除', deleteData);
        this
            .props
            .dispatch(device_model_delete(deleteData))
    }

    handleUpdate = (data) => {
        let item=this.state.updateFromItem;
        const editData = {
            uuid:item.uObjectUUID,
            cols: fn_mes_trans.toCols(data)
        }
        console.log('开始修改', editData);
        this
            .props
            .dispatch(device_model_update(editData))
    }

    handleQuery=(data)=>{
        console.log("查询的值是:",data);
        const {keyWord,TypeUUID}=data;
        this.setState({keyWord,TypeUUID},()=>{
            // this.getTableList({keyWord,TypeUUID});
            this.getTableList();
        });
    }

    handleTableChange=(pagination)=>{
        // console.log('pagination',pagination);
        const {current,pageSize}=pagination;
        this.setState({current,pageSize,loading:true},()=>{

            this.getTableList();
        });
    }

    toggleUModalShow=(record)=>{
        this.setState({UModalShow:!this.state.UModalShow,updateFromItem:record});
    }


    render() {
        const {
            DeviceTypeList,
            tableDataList,
            // loading,
            current,
            // total,
            pageSize,updateFromItem,UModalShow
        }=this.state;
        const {Breadcrumb}=this.props;
        const { list, total, loading } = this.props.deviceModel;
        let Data={
            // list:tableDataList,
            list:list,
            pagination:{total,current,pageSize}
        };

        const Tcolumns= [
            {
                title: '序号',
                dataIndex: 'key',
                width:50
            },
            {
                title: 'ID',
                dataIndex: 'uObjectUUID',
                width:80
            },
            {
                title: '图片',
                dataIndex: 'Image',
                render: ( e, record ) => {
                    // console.log('图片地址',e);
                    const content = (
                        <div>
                          <img width="300"  src={urlBase+e}/>
                        </div>
                    );
                    return (
                        <Popover placement="right"  content={content} trigger="hover">
                          {/* <Button>Right</Button> */}
                          <img height='50' src={urlBase+e}/>
                        </Popover>
                    )
                }
            },
            {
                title: '型号',
                dataIndex: 'strModelName',
                type: 'string'
            },
            {
                title: '编号',
                dataIndex: 'strModelCode',
                type: 'string'
            },
            {
                title: '类别',
                dataIndex: 'TypeName',
                type: 'string'
            },
            {
                title: '品牌',
                dataIndex: 'breand',
                type: 'string'
            },
            {
                title: '备注',
                dataIndex: 'strModelNote',
                type: 'string'
            },
            {
                title: '操作',
                dataIndex: 'UUID',
                width:150,
                render:(UUID,record)=>{
                    return <span>
                        <a onClick={this.toggleUModalShow.bind(this,record)}>编辑</a>
                        <Divider type="vertical"/>
                        <Popconfirm
                            placement="topRight"
                            title="确定删除此项数据？"
                            onConfirm={this.handleDelete.bind(this,record)}
                            okText="确定" cancelText="取消">
                            <a href="#">删除</a>
                        </Popconfirm>
                    </span>
                }
            }
        ];
        //更新弹框数据项
        const UFormItem= [
            {
                name: 'strModelName',
                label: '型号名称',
                type: 'string',
                placeholder: '请输入型号名称',
                rules: [ { required: true, message: '名称不能为空' } ],
            },
            {
                name: 'strModelCode',
                label: '型号编号',
                type: 'string',
                placeholder: '请输入型号编号',
                rules: [ { required: true, message: '编号不能为空' } ],
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
            }
        ];
        //添加的弹出框菜单
        const CFormItem= [
            {
                name: 'strModelName',
                label: '型号名称',
                type: 'string',
                placeholder: '请输入型号名称',
                rules: [ { required: true, message: '名称不能为空' } ],
            },
            {
                name: 'strModelCode',
                label: '型号编号',
                type: 'string',
                placeholder: '请输入型号编号',
                rules: [ { required: true, message: '编号不能为空' } ],
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
            }
        ];
        //查询的数据项
        const RFormItem= [
            {
                name: 'keyWord',
                label: '搜索内容',
                type: 'string',
                placeholder: '请输入要搜索的内容'
            },
            {
                name: 'TypeUUID',
                label: '设备类别',
                type: 'select',
                hasAllButtom: true,
                defaultValue: '-1',
                width: 150,
                options: DeviceTypeList
            }
        ];

        const bcList = [{
            title:"首页",
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
                    submit={this.handleUpdate.bind(this)}
                    showModal={UModalShow}
                    hideModal={this.toggleUModalShow}
                />
                <div style={{marginBottom:15}}>
                    <CreateModal
                        FormItem={CFormItem}
                        submit={this.handleCreat.bind(this)}
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