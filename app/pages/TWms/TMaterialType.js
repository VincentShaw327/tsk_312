/**
 *这是设备列表页
 *添加日期:2017.12.06
 *添加人:shaw
 **/
 import React, { Component } from 'react'
 import { hashHistory, Link } from 'react-router'
import { Table, Menu, Icon, Badge,Popover, Dropdown,message,Divider,Popconfirm } from 'antd';
 // import FeatureSetConfig from '../../components/TCommon/tableConfig';
 import { TPostData } from '../../utils/TAjax';
 import SimpleTable from 'components/TTable/SimpleTable';
import { CreateModal,UpdateModal } from 'components/TModal';
import {SimpleQForm,StandardQForm } from 'components/TForm';

let seft

export default class TMaterialType extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            tableDataList:[],
            wsTypeList:[],
            updateFromItem:{},
            total:0,
            current:1,
            pageSize:10,
            UModalShow:false,
            loading:true,
        }
        seft = this;
        this.url= '/api/TWms/material_type';
    }

    componentWillMount(){
        this.getTableList();

        const tableConfig = {
            /**
            *基础配置参数
            *1.type:表格类型
            *2.isSelection:table是否带勾选
            *3.url:查询的url
            *4.columns:table的表头参数
            *5.CType:create创建modal的数据项
            *6.UType:update更新modal的数据项
            *7.RType:查询的数据项
            ***/
            /*==配置参数=======================================*/
            //table类型
            type: 'tableFeature',
            //请求url
            url: '/api/TWms/material_type',
            // url: this.props.server.url+'Handler_MtrlType_V1.ashx',
            //table表格是否是可勾选
            isSelection: false,
            //table表格表头配置参数
            columns:[
                {
                    title: '序号',
                    dataIndex: 'key',
                    type: 'string'
                },
                {
                    title: '名称',
                    dataIndex: 'Name',
                    type: 'string'
                },
                {
                    title: '编号',
                    dataIndex: 'Number',
                    type: 'string'
                },
                {
                    title: '备注',
                    dataIndex: 'Desc',
                    type: 'string'
                },
                {
                    title: '更新时间',
                    dataIndex: 'UpdateDateTime',
                    type: 'string'
                },
                {
                    title: '操作',
                    dataIndex: 'operate',
                    type: 'operate', // 操作的类型必须为 operate
                    btns: [
                        {
                            text: '修改',
                            type: 'edit',
                            icon:'edit'
                        }, {
                            text: '删除',
                            type: 'delete',
                            icon:'delete',
                            havePopconfirm: true,
                            popText: '确定要删除此记录吗?'
                        },
                        /* {
                            text: '位置',
                            type: 'place'
                        }, */
                    ]
                }
            ],
            //更新弹框数据项
            UType: [
                {
                    name: 'Name',
                    label: '型号名称',
                    type: 'string',
                    placeholder: '请输入型号名称',
                    rules: [{ required: true, message: '名称不能为空' }],
                },
                {
                    name: 'Number',
                    label: '型号编号',
                    type: 'string',
                    placeholder: '请输入模具编号',
                    rules: [{ required: true, message: '编号不能为空' }],
                },
                {
                    name: 'Desc',
                    label: '备注',
                    type: 'string',
                }
            ],
            //添加的弹出框菜单
            CType: [
                {
                    name: 'Name',
                    label: '型号名称',
                    type: 'string',
                    placeholder: '请输入型号名称',
                    rules: [{ required: true, message: '名称不能为空' }],
                },
                {
                    name: 'Number',
                    label: '型号编号',
                    type: 'string',
                    placeholder: '请输入型号编号',
                    rules: [{ required: true, message: '编号不能为空' }],
                }
            ],
            //查询的数据项
            RType: [
                {
                    name: 'keyWord',
                    label: '搜索内容',
                    type: 'string',
                    placeholder: '请输入要搜索的内容'
                },
            ],
            /*==回调函数=======================================*/
            // 初始化页面的数据 回调函数传入 items 列表
            pageData: function ( num, callback ) {
                const dat = {
                    PageIndex : 0,
                    PageSize : -1,
                    ParentUUID: -1, //保留字段，取值设为-1
                    KeyWord : ""
                }
                TPostData( this.url, "ListActive", dat, function ( res ) {
                  var list = [];
                  console.log("查询到物料类别列表", res);
                  var data_list = res.obj.objectlist || [];
                  var totalcount = res.obj.totalcount;
                  data_list.forEach( function ( item, index ) {
                    list.push( {
                      key:index,
                      UUID : 0,
                      ParentUUID:item.ParentUUID,//保留字段
                      Name:item.Name,
                      Number:item.ID,
                      Desc:item.Desc,
                      UpdateDateTime:item.UpdateDateTime,
                      Note:item.Note,
                      Status:1
                    } )
                  } )
                  const pagination = {
                    ...seft.state.pagination
                  }
                  pagination.total = totalcount;
                  callback( list, {
                    total: pagination.total,
                    nPageSize: 10
                  } )
                }, function ( error ) {
                  message.info( error );
                } )
            },
              //创建表单的回调处理函数
            Create: function ( data, callback ) {
                let dat = {
                    key: '1000',
                    Name:data.Name,
                    ID:data.Number,
                    ParentUUID: -1, //保留字段，取值设为-1
                }
                // console.log('创建后的数据是:', data);
                TPostData( this.url, "Add", dat, function ( res ) {
                  callback( dat );
                } )
            },
              //信息修改回调处理
            Update: function ( data, callback ) {
                console.log("收到表单值:",data);
                let dat = {
                    UUID: data.UUID,
                    ParentUUID: -1, //保留字段，取值设为-1
                    Name:data.Name,
                    ID:data.Number,
                    Desc : data.Desc,
                    Note : '-',
                }
                TPostData( this.url, "Update", dat, function ( res ) {
                  //这块请求更新数据 成功回调
                  callback( data )
                } )
            },
            // 删除操作
            Delete: function ( data, callback ) {
                var dat = {
                  UUID: data.UUID,
                }
                // console.log("看看data",data);
                TPostData( this.url, "Inactive", dat, function ( res ) {
                  //这块请求更新数据 成功回调
                  callback( data );
                } )
            },
            // 查询操作回调
            Retrieve: function ( data, callback ) {
                const dat = {
                    PageIndex : 0,
                    PageSize : -1,
                    ParentUUID: -1, //保留字段，取值设为-1
                    KeyWord : data.keyWord
                }
                TPostData( this.url, "ListActive", dat, function ( res ) {
                  var list = [];
                  console.log("查询到物料类别列表", res);
                  var data_list = res.obj.objectlist || [];
                  var totalcount = res.obj.totalcount;
                  data_list.forEach( function ( item, index ) {
                    list.push( {
                      key:index,
                      UUID : 0,
                      ParentUUID:item.ParentUUID,//保留字段
                      Name:item.Name,
                      Number:item.ID,
                      Desc:item.Desc,
                      UpdateDateTime:item.UpdateDateTime,
                      Note:item.Note,
                      Status:1
                    } )
                  } )
                  const pagination = {
                    ...seft.state.pagination
                  }
                  pagination.total = totalcount;
                  callback( list, {
                    total: pagination.total,
                    nPageSize: 10
                  } )
                }, function ( error ) {
                  message.info( error );
                } )
            }

        };
        // this.feature = FeatureSetConfig(tableConfig);
    }

    getTableList(que){
        const {current,pageSize,keyWord}=this.state;
        const dat = {
            PageIndex : current-1,       //分页：页序号，不分页时设为0
            PageSize:pageSize,   //分页：每页记录数，不分页时设为-1
            ParentUUID: -1, //保留字段，取值设为-1
            KeyWord :keyWord,
        }

        TPostData( this.url, "ListActive", dat,
            (res) => {
                var list = [];
                console.log("查询到工作中心类别列表", res);
                var data_list = res.obj.objectlist || [];
                var totalcount = res.obj.totalcount;
                data_list.forEach((item, index)=> {
                    list.push( {
                        key:index,
                        UUID : item.UUID,
                        ParentUUID:item.ParentUUID,//保留字段
                        Name:item.Name,
                        Number:item.ID,
                        Desc:item.Desc,
                        UpdateDateTime:item.UpdateDateTime,
                        Note:item.Note,
                        Status:1
                      } )
                })
                this.setState({ tableDataList: list, total: totalcount, loading: false });
            },
            ( error )=> {
              message.error( error );
              this.setState({loading:true});
            }
        )

    }

    handleCreat=(data)=>{
        let dat = {
            Name:data.Name,
            ID:data.Number,
            ParentUUID: -1, //保留字段，取值设为-1
        }
        TPostData( this.url, "Add", dat,
            ( res )=> {
                message.success("创建成功！");
                this.getTableList();
            },
            ( err )=> {
                message.error("创建失败！");
                console.log('err',err);
            }
        )
    }

    handleUpdate=(data)=>{
        let dat = {
            UUID: this.state.updateFromItem.UUID,
            ParentUUID: -1, //保留字段，取值设为-1
            Name:data.Name,
            ID:data.Number,
            Desc : data.Desc,
            Note : '-',
        }
        console.log('dat',dat,this.state.updateFromItem.UUID)
        TPostData( this.url, "Update", dat,
            ( res )=> {
                message.success("更新成功！");
                this.getTableList();
            },
            ( err )=> {
                message.error("更新失败！",err);
                console.log('err',err);
            }
        )
    }

    handleDelete=(data)=>{
        var dat = {
            UUID: data.UUID,
        }
        TPostData( this.url, "Inactive", dat,
            ( res )=> {
                message.success("删除成功！");
                this.getTableList();
            },
            ( err )=> {
                message.error("删除失败！");
                console.log('err',err);
            }
        )
    }

    handleQuery=(data)=>{
        console.log("查询的值是:",data);
        const {keyWord,TypeUUID}=data;
        this.setState({keyWord,TypeUUID},()=>{
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
        const {tableDataList,loading,current,total,pageSize,updateFromItem,UModalShow}=this.state;
        let Data={
            list:tableDataList,
            pagination:{total,current,pageSize}
        };

        //table表格表头参数
        const Tcolumns=[
            {
                title: '序号',
                dataIndex: 'key',
                type: 'string'
            },
            {
                title: '名称',
                dataIndex: 'Name',
                type: 'string'
            },
            {
                title: '编号',
                dataIndex: 'Number',
                type: 'string'
            },
            {
                title: '备注',
                dataIndex: 'Desc',
                type: 'string'
            },
            {
                title: '更新时间',
                dataIndex: 'UpdateDateTime',
                type: 'string'
            },
            {
                title: '操作',
                dataIndex: 'UUID',
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
                name: 'Name',
                label: '型号名称',
                type: 'string',
                placeholder: '请输入型号名称',
                rules: [{ required: true, message: '名称不能为空' }],
            },
            {
                name: 'Number',
                label: '型号编号',
                type: 'string',
                placeholder: '请输入模具编号',
                rules: [{ required: true, message: '编号不能为空' }],
            },
            {
                name: 'Desc',
                label: '备注',
                type: 'string',
            }
        ];
        //添加的弹出框菜单
        const CFormItem= [
            {
                name: 'Name',
                label: '名称',
                type: 'string',
                placeholder: '请输入型号名称',
                rules: [{ required: true, message: '名称不能为空' }],
            },
            {
                name: 'Number',
                label: '编号',
                type: 'string',
                placeholder: '请输入型号编号',
                rules: [{ required: true, message: '编号不能为空' }],
            }
        ];
        //查询的数据项
        const RFormItem=  [
            {
                name: 'keyWord',
                label: '搜索内容',
                type: 'string',
                placeholder: '请输入要搜索的内容'
            },
        ];

        return (
            <div className="cardContent">
                {/* <Feature /> */}
                {/* <SimpleQForm
                    FormItem={RFormItem}
                    submit={this.handleQuery}
                    /> */}
                <CreateModal
                    FormItem={CFormItem}
                    submit={this.handleCreat.bind(this)}
                />
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
                    submit={this.handleUpdate.bind(this)}
                    showModal={UModalShow}
                    hideModal={this.toggleUModalShow}
                />
            </div>
        )
    }
}
