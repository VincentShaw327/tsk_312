/**
 *这是检验记录页
 *添加日期:2018.10.24
 *添加人:shaw
 **/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {
  Table,
  Menu,
  Icon,
  Badge,
  Popover,
  Dropdown,
  message,
  Divider,
  Popconfirm,
  Card,Row,Col
} from 'antd';
import { fetchInspectList } from 'actions/quality';
import { TPostData, TPostMock } from 'utils/TAjax';
import SimpleTable from 'components/TTable/SimpleTable';
import { CreateModal, UpdateModal } from 'components/TModal';
import { SimpleQForm, StandardQForm,DropDownForm } from 'components/TForm';
import PageHeaderLayout from '../../base/PageHeaderLayout';
import {TableExport} from  'components/Export';

@connect( ( state, props ) => {
    console.log( 'state', state )
    return {
        Breadcrumb:state.Breadcrumb,
        Inspect: state.Inspect,
    }
}, )
export default class quality extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            tableDataList: [],
            wsTypeList: [],
            updateFromItem: {},
            total: 0,
            current: 1,
            pageSize: 10,
            UModalShow: false,
            loading: false,
        }
        this.url = '/api/TWms/material_type';
    }

    componentWillMount() {
        // this.getTableList();
        this.props.dispatch( fetchInspectList( { current: 1 }, ( respose ) => {} ) )
    }

    getTableList( que ) {
        const { current, pageSize, keyWord } = this.state;
        const dat = {
            PageIndex: current - 1, //分页：页序号，不分页时设为0
            PageSize: pageSize, //分页：每页记录数，不分页时设为-1
            ParentUUID: -1, //保留字段，取值设为-1
            KeyWord: keyWord,
        }

        TPostMock( '/factory_type', "ListActive", dat,
            ( res ) => {
                var list = [];
                console.log( "查询到工厂类别列表", res );
                var data_list = res.obj.objectlist || [];
                var totalcount = res.obj.totalcount;
                data_list.forEach( ( item, index ) => {
                    list.push( {
                        key: index,
                        UUID: item.UUID,
                        ParentUUID: item.ParentUUID, //保留字段
                        Name: item.Name,
                        Number: item.ID,
                        Founder: item.Founder,
                        CreatDateTime: item.CreatDateTime,
                        Renewing: item.Renewing,
                        UpdateDateTime: item.UpdateDateTime,
                        Note: item.Note,
                        Status: 1
                    } )
                } )
                this.setState( { tableDataList: list, total: totalcount, loading: false } );
            },
            ( error ) => {
                message.error( error );
                this.setState( { loading: true } );
            }
        )

    }

    handleCreat = ( data ) => {
        let dat = {
            Name: data.Name,
            ID: data.Number,
            ParentUUID: -1, //保留字段，取值设为-1
        }
        TPostData( this.url, "Add", dat,
            ( res ) => {
                message.success( "创建成功！" );
                this.getTableList();
            },
            ( err ) => {
                message.error( "创建失败！" );
                console.log( 'err', err );
            }
        )
    }

    handleUpdate = ( data ) => {
        let dat = {
            UUID: this.state.updateFromItem.UUID,
            ParentUUID: -1, //保留字段，取值设为-1
            Name: data.Name,
            ID: data.Number,
            Desc: data.Desc,
            Note: '-',
        }
        console.log( 'dat', dat, this.state.updateFromItem.UUID )
        TPostData( this.url, "Update", dat,
            ( res ) => {
                message.success( "更新成功！" );
                this.getTableList();
            },
            ( err ) => {
                message.error( "更新失败！", err );
                console.log( 'err', err );
            }
        )
    }

    handleDelete = ( data ) => {
        var dat = {
            UUID: data.UUID,
        }
        TPostData( this.url, "Inactive", dat,
            ( res ) => {
                message.success( "删除成功！" );
                this.getTableList();
            },
            ( err ) => {
                message.error( "删除失败！" );
                console.log( 'err', err );
            }
        )
    }

    handleQuery = ( data ) => {
        console.log( "查询的值是:", data );
        const { keyWord, TypeUUID } = data;
        this.setState( { keyWord, TypeUUID }, () => {
            this.getTableList();
        } );
    }

    handleTableChange = ( pagination ) => {
        // console.log('pagination',pagination);
        const { current, pageSize } = pagination;
        this.setState( { current, pageSize, loading: true }, () => {

            this.getTableList();
        } );
    }

    toggleUModalShow = ( record ) => {
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
            UModalShow
        } = this.state;
        const {Breadcrumb}=this.props;
        const { list, total, loading } = this.props.Inspect;

        let Data = {
            // list:tableDataList,
            list: list,
            pagination: { total, current, pageSize }
        };

        //table表格表头参数
        const Tcolumns = [
            {
                title: '序号',
                dataIndex: 'key',
                type: 'string'
            },
            {
                title: '工单号',
                dataIndex: 'workOrder',
                type: 'string'
            },
            {
                title: '产品图号',
                dataIndex: 'productDraw',
                type: 'string'
            },
            {
                title: '检验图纸',
                dataIndex: 'inspectDraw',
                type: 'string'
            },
            {
                title: '检验类别',
                dataIndex: 'inspectType',
                type: 'string'
            },
            {
                title: '工作中心',
                dataIndex: 'center',
                type: 'string'
            },
            {
                title: '检验时间',
                dataIndex: 'inspectTime',
                type: 'string'
            },
            {
                title: '检验人',
                dataIndex: 'Inspector',
                type: 'string'
            },
            {
                title: '样品数量',
                dataIndex: 'samples',
                type: 'string'
            },
            /*{
                title: '合格数量',
                dataIndex: 'qualified',
                type: 'string'
            },*/
            {
                title: '不良数量',
                dataIndex: 'defective',
                type: 'string'
            },
            {
                title: '合格率',
                dataIndex: 'PassRate',
                type: 'string'
            },
            {
                title: '是否通过',
                dataIndex: 'Renewing',
                render:(item)=>{
                    return item==0?<Icon
                            type="check"
                            theme="outlined"
                            style={{color:'green'}}
                            />:
                            <Icon type="close"
                                theme="outlined"
                                style={{color:'red'}}
                            />
                }
            },
            /*{
                title: '修改时间',
                dataIndex: 'UpdateDateTime',
                type: 'string'
            },
            {
                title: '操作',
                dataIndex: 'UUID',
                render: ( UUID, record ) => {
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
            }*/
        ];

        //查询的数据项
        const RFormItem= [
            {
                name: 'keyWord',
                label: '搜索内容',
                type: 'string',
                // width: 200,
                placeholder: '请输入搜索内容',
                // defaultValue:this.state.keyWord
            },{
                name: 'orderState',
                label: '订单状态',
                type: 'select',
                defaultValue: '-1',
                hasAllButtom: true,
                // width: 180,
                options:[
                    /*{
                        value:-1,
                        text:'全部',
                        key:'1'
                    },*/
                    {
                        value:0,
                        text:'已取消',
                        key:'2'
                    },
                    {
                        value:1,
                        text:'未就绪',
                        key:'3'
                    },
                    {
                        value:2,
                        text:'未执行',
                        key:'4'
                    },
                    {
                        value:3,
                        text:'暂停中',
                        key:'5'
                    },
                    {
                        value:4,
                        text:'执行中',
                        key:'6'
                    },
                    {
                        value:5,
                        text:'已完成',
                        key:'7'
                    }
                ]
            },
            // {type:'submit'}
        ];
        
        const bcList = [ {
            title: "首页",
            href: '/',
          }, {
            title: '基础数据',
            href: '/',
          }, {
            title: '工厂类别',
          } ];

        return (
            <PageHeaderLayout title="品质检验记录" wrapperClassName="pageContent"
              BreadcrumbList={Breadcrumb.BCList}>
                <div style={{backgroundColor:'white',padding:15}}>
                    <Row>
                        <Col span={8}></Col>
                        <Col span={8}>
                            
                        </Col>
                        <Col span={8}>
                            <DropDownForm FormItem={RFormItem}/>
                        </Col>
                    </Row>
                    <TableExport>
                        <SimpleTable
                            size="middle"
                            loading={loading}
                            data={Data}
                            columns={Tcolumns}
                            isHaveSelect={false}
                            onChange={this.handleTableChange}
                        />
                    </TableExport>
                    {/* <UpdateModal
                        FormItem={UFormItem}
                        updateItem={updateFromItem}
                        submit={this.handleUpdate.bind(this)}
                        showModal={UModalShow}
                        hideModal={this.toggleUModalShow}
                    /> */}
                </div>
            </PageHeaderLayout>
        )
    }
}
