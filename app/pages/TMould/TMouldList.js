/**
 *这是设备列表页
 *添加日期:2017.12.06
 *添加人:shaw
 **/
import React, { Component } from 'react'
import { hashHistory, Link } from 'react-router'
import { Table, Menu, Icon,Popover, Badge, Dropdown,message,Divider,Popconfirm } from 'antd';
// import FeatureSetConfig from '../../components/TCommon/tableConfig';
import { TPostData ,urlBase} from '../../utils/TAjax';
import SimpleTable from 'components/TTable/SimpleTable';
import { CreateModal,UpdateModal } from 'components/TModal';
import {SimpleQForm,StandardQForm } from 'components/TForm';

let seft

export default class DeviceList extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            tableDataList:[],
            MoldModelList:[],
            updateFromItem:{},
            total:0,
            current:1,
            pageSize:10,
            UModalShow:false,
            loading:true,
            ModelUUID: -1,
            keyWord:''
        }
        this.url = '/api/TMold/mold';
        seft = this;
    }

    componentWillMount() {
        this.getMoldModelList();
        this.getTableList();

        let MoldModelList = [];
        /* TPostData( this.url, 'ListActive', { 'PageIndex': 0, 'PageSize': -1, 'ModelUUID': -1 },
            function ( res ) {
                var Ui_list = res.obj.objectlist || [];
                Ui_list.forEach( function ( item, index ) {
                    MoldModelList.push( { key: index, value: item.UUID.toString(), text: item.Name } )
                } )
            },
            function ( error ) {
                message.info( error );
            }, false
        ) */

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
            url: '/api/TMold/mold',
            // url: this.props.server.url + 'Handler_Mold_V1.ashx',
            //table表格是否是可勾选
            isSelection: false,
            //table表格表头配置参数
            columns: [
                {
                    title: '序号',
                    dataIndex: 'key',
                    type: 'string'
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
                /*{
                    title: '名称',
                    dataIndex: 'Name',
                    type: 'string'
                },*/
                {
                    title: '型号',
                    dataIndex: 'ModelName',
                    type: 'string'
                },
                {
                    title: '编号',
                    dataIndex: 'Number',
                    type: 'string'
                },
                {
                    title: '规格尺寸（材料/尺寸/步距）',
                    dataIndex: 'ModelSize',
                    type: 'string'
                },
                {
                    title: '标签',
                    dataIndex: 'Label',
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
                            icon: 'edit'
                        }, {
                            text: '删除',
                            type: 'delete',
                            icon: 'delete',
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
                    label: '模具名称',
                    type: 'string',
                    placeholder: '请输入模具名称',
                    rules: [ { required: true, message: '名称不能为空' } ],
                },
                {
                    name: 'Number',
                    label: '模具编号',
                    type: 'string',
                    placeholder: '请输入模具编号',
                    rules: [ { required: true, message: '编号不能为空' } ],
                },
                {
                    name: 'ModelUUID',
                    label: '模具型号',
                    type: 'select',
                    rules: [ { required: true, message: '请选择型号' } ],
                    options: MoldModelList
                },
                {
                    name: 'Label',
                    label: '模具标签',
                    rules: [ { required: true, message: '标签不能为空' } ],
                    type: 'string',
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
                    name: 'ModelUUID',
                    label: '模具型号',
                    type: 'select',
                    rules: [ { required: true, message: '请选择型号' } ],
                    options: MoldModelList
                },
                {
                    name: 'Name',
                    label: '模具名称',
                    type: 'string',
                    placeholder: '请输入模具名称',
                    rules: [ { required: true, message: '名称不能为空' } ],
                },
                {
                    name: 'Number',
                    label: '模具编号',
                    type: 'string',
                    placeholder: '请输入模具编号',
                    rules: [ { required: true, message: '编号不能为空' } ],
                },
            ],
            //查询的数据项
            RType: [
                {
                    name: 'keyWord',
                    label: '搜索内容',
                    type: 'string',
                    placeholder: '请输入要搜索的内容'
                },
                {
                    name: 'ModelUUID',
                    label: '模具型号',
                    type: 'select',
                    hasAllButtom: true,
                    defaultValue: '-1',
                    width: 150,
                    options: MoldModelList
                }
            ],
            /*==回调函数=======================================*/
            // 初始化页面的数据 回调函数传入 items 列表
            pageData: function ( num, callback ) {
                const dat = {
                    PageIndex: 0,
                    PageSize: -1,
                    ModelUUID: -1,
                    KeyWord: ""
                }
                TPostData( this.url, "ListActive", dat, function ( res ) {
                    var list = [];
                    console.log( "查询到模具列表", res );
                    var data_list = res.obj.objectlist || [];
                    var totalcount = res.obj.totalcount;
                    data_list.forEach( function ( item, index ) {
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
                            ModelID: "-",
                            Note: "-",
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
                    Name: data.Name,
                    ID: data.Number,
                    ModelUUID: data.ModelUUID,
                }
                // console.log('创建后的数据是:', data);
                TPostData( this.url, "Add", dat, function ( res ) {
                    callback( dat );
                } )
            },
            //信息修改回调处理
            Update: function ( data, callback ) {
                let dat = {
                    UUID: data.UUID,
                    Name: data.Name,
                    ID: data.Number,
                    Label: data.Label,
                    ModelUUID: data.ModelUUID,
                    Desc: data.Desc,
                    Note: '-',
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
                console.log( '要查询的ID', data )

                const dat = {
                    PageIndex: 0,
                    PageSize: -1,
                    ModelUUID: data.ModelUUID,
                    KeyWord: data.keyWord
                }
                TPostData( this.url, "ListActive", dat, function ( res ) {
                    var list = [];
                    console.log( "查询到模具列表", res );
                    var data_list = res.obj.objectlist || [];
                    var totalcount = res.obj.totalcount;
                    data_list.forEach( function ( item, index ) {
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
                            ModelID: "-",
                            Note: "-",
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
        // this.feature = FeatureSetConfig( tableConfig );
    }

    getTableList(que){

        const {current,pageSize,ModelUUID,keyWord}=this.state;
        const dat = {
            PageIndex : current-1,       //分页：页序号，不分页时设为0
            PageSize:pageSize,   //分页：每页记录数，不分页时设为-1
            ModelUUID: ModelUUID,  //类型UUID，不作为查询条件时取值设为-1
            KeyWord : keyWord
        }

        TPostData( this.url, "ListActive", dat,
            ( res )=> {
              var list = [];
              console.log("查询到模具列表", res);
              var data_list = res.obj.objectlist || [];
              var totalcount = res.obj.totalcount;
              data_list.forEach(function (item, index) {
                  list.push({
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
                      ModelID: "-",
                      Note: "-",
                  })
              })
              this.setState({tableDataList:list,total:totalcount,loading:false});
            },
            ( error )=> {
              message.error( error );
              this.setState({loading:false});
            }
        )

    }

    getMoldModelList(str){

        TPostData( this.url, 'ListActive', { 'PageIndex': 0, 'PageSize': -1, 'ModelUUID': -1 },
            ( res )=> {
                var Ui_list = res.obj.objectlist || [],
                    list=[];
                Ui_list.forEach( function ( item, index ) {
                    list.push( { key: index, value: item.UUID.toString(), text: item.Name } )
                } );
                this.setState({MoldModelList:list});
            },
            ( error )=> {
                message.info( error );
            }
        )

    }

    handleCreat=(data)=>{
        let dat = {
            Name: data.Name,
            ID: data.Number,
            ModelUUID: data.ModelUUID,
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

    handleQuery=(data)=>{
        console.log("查询的值是:",data);
        const {keyWord,ModelUUID}=data;
        this.setState({keyWord,ModelUUID},()=>{
            this.getTableList();
        });
    }

    handleUpdate=(data)=>{
        let dat = {
            UUID: this.state.updateFromItem.UUID,
            Name: data.Name,
            ID: data.Number,
            Label: data.Label,
            ModelUUID: data.ModelUUID,
            Desc: data.Desc,
            Note: '-',
        }
        TPostData( this.url, "Update", dat,
            ( res )=> {
                message.success("更新成功！");
                this.getTableList();
            },
            ( err )=> {
                message.error("更新失败！");
                console.log('err',err);
            }
        )
    }

    handleDelete=(data)=>{
        var dat = {
            UUID: data.UUID,
        }
        // console.log("看看data",data);
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

    handleTableChange=(pagination)=>{
        const {current,pageSize}=pagination;
        this.setState({current,pageSize,loading:true},()=>{
            this.getTableList();
        });
    }

    toggleUModalShow=(record)=>{
        this.setState({UModalShow:!this.state.UModalShow,updateFromItem:record});
    }

    render() {
        // let Feature = this.feature;
        const {MoldModelList,tableDataList,loading,current,total,pageSize,updateFromItem,UModalShow}=this.state;
        let Data={
            list:tableDataList,
            pagination:{total,current,pageSize}
        };

        const Tcolumns= [
            {
                title: '序号',
                dataIndex: 'key',
                type: 'string'
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
            /*{
                title: '名称',
                dataIndex: 'Name',
                type: 'string'
            },*/
            {
                title: '型号',
                dataIndex: 'ModelName',
                type: 'string'
            },
            {
                title: '编号',
                dataIndex: 'Number',
                type: 'string'
            },
            {
                title: '规格尺寸（材料/尺寸/步距）',
                dataIndex: 'ModelSize',
                type: 'string'
            },
            {
                title: '标签',
                dataIndex: 'Label',
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
                render:(txt,record)=>{
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
                label: '模具名称',
                type: 'string',
                placeholder: '请输入模具名称',
                rules: [ { required: true, message: '名称不能为空' } ],
            },
            {
                name: 'Number',
                label: '模具编号',
                type: 'string',
                placeholder: '请输入模具编号',
                rules: [ { required: true, message: '编号不能为空' } ],
            },
            {
                name: 'ModelUUID',
                label: '模具型号',
                type: 'select',
                rules: [ { required: true, message: '请选择型号' } ],
                options: MoldModelList
            },
            {
                name: 'Label',
                label: '模具标签',
                rules: [ { required: true, message: '标签不能为空' } ],
                type: 'string',
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
                name: 'ModelUUID',
                label: '模具型号',
                type: 'select',
                rules: [ { required: true, message: '请选择型号' } ],
                options: MoldModelList
            },
            {
                name: 'Name',
                label: '模具名称',
                type: 'string',
                placeholder: '请输入模具名称',
                rules: [ { required: true, message: '名称不能为空' } ],
            },
            {
                name: 'Number',
                label: '模具编号',
                type: 'string',
                placeholder: '请输入模具编号',
                rules: [ { required: true, message: '编号不能为空' } ],
            },
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
                name: 'ModelUUID',
                label: '模具型号',
                type: 'select',
                hasAllButtom: true,
                defaultValue: '-1',
                width: 150,
                options: MoldModelList
            }
        ];

        return (
            <div className="cardContent">
                {/* <Feature /> */}
                <SimpleQForm
                    FormItem={RFormItem}
                    submit={this.handleQuery}
                 />
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
