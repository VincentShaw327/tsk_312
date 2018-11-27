/**
 *这是设备类别页
 *添加日期:2017.12.05
 *添加人:shaw
 * */
// /* eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { message, Divider, Popconfirm } from 'antd';
import { device_type_list, device_type_add, device_type_update, device_type_delete } from 'actions/device'
import { TPostData } from 'utils/TAjax';
import SimpleTable from 'components/TTable/SimpleTable';
import { CreateModal, UpdateModal } from 'components/TModal';
// import { SimpleQForm, StandardQForm } from 'components/TForm';
import PageHeaderLayout from '../../base/PageHeaderLayout';
import { fn_mes_trans } from 'functions'

@connect( ( state, props ) => ( {
    deviceType: state.deviceType,
} ) )
export default class type extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            tableDataList: [],
            updateFromItem: {},
            total: 0,
            current: 1,
            pageSize: 10,
            UModalShow: false,
            loading: true,
        }
        this.url = '/api/TDevice/device_type';
    }

    componentWillMount() {
        // this.getTableList();
        const filter = {
            strCategoryName: 'test',
        }
        this.props.dispatch( device_type_list( fn_mes_trans.toFilter( filter ), ( respose ) => {} ) )
    }

    getTableList( que ) {
        const { current, pageSize } = this.state;
        const dat = {
            PageIndex: current - 1, // 分页：页序号，不分页时设为0
            PageSize: pageSize, // 分页：每页记录数，不分页时设为-1
            ParentUUID: -1,
            // FactoryUUID: -1,    //所属工厂UUID，不作为查询条件时取值设为-1
            // TypeUUID: que?que.TypeUUID:-1,  //类型UUID，不作为查询条件时取值设为-1
            KeyWord: que ? que.keyWord : '',
        }

        TPostData(
            this.url, 'ListActive', dat,
            ( res ) => {
                const list = [];
                console.log( '查询到设备类别列表', res );
                const data_list = res.obj.objectlist || [];
                const totalcount = res.obj.totalcount;
                data_list.forEach( ( item, index ) => {
                    list.push( {
                        key: index,
                        Desc: item.Desc,
                        Name: item.Name,
                        ID: item.ID,
                        Note: item.Note,
                        ParentUUID: item.ParentUUID,
                        Status: item.Status,
                        UUID: item.UUID,
                        UpdateDateTime: item.UpdateDateTime,
                    } )
                } );

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
            .dispatch( device_type_add( addData, respose => console.log( '添加成功！', respose ) ) )
    }

    handleDelete = ( data ) => {
        const deleteData = {
            uuids: [data.uObjectUUID],
        }
        console.log( '开始删除', deleteData );
        this
            .props
            .dispatch( device_type_delete( deleteData ) )
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
            .dispatch( device_type_update( editData ) )
    }

    handleQuery=( data ) => {
        console.log( '查询的值是:', data );
        const { keyWord, TypeUUID } = data;
        // this.setState({keyWord,TypeUUID});
        this.getTableList( { keyWord } );
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
            wsTypeList,
            tableDataList,
            // loading,
            current,
            // total,
            pageSize,
            updateFromItem,
            UModalShow,
        } = this.state;
        const { list, total, loading } = this.props.deviceType;
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
                    <a onClick={this.toggleUModalShow.bind( this, record )}>编辑</a>
                    <Divider type="vertical" />
                    <Popconfirm
                        placement="topRight"
                          title="确定删除此项数据？"
                          onConfirm={this.handleDelete.bind( this, record )}
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
                      FormItem={UFormItem}
                      updateItem={updateFromItem}
                      submit={this.handleUpdate.bind( this )}
                      showModal={UModalShow}
                      hideModal={this.toggleUModalShow}
                    />
                </div>
            </PageHeaderLayout>
        )
    }
}
