/**
 *这是产品材料耗损页
 *添加日期:2018.10.14
 *添加人:shaw
 * */
 import React, { Component } from 'react'
 import { connect } from 'react-redux'
import { message } from 'antd';
import { fetchMtrlLossCollate } from 'actions/MtrlLoss'
 import { TPostData, TPostMock } from 'utils/TAjax';
 import SimpleTable from 'components/TTable/SimpleTable';
import { CreateModal, UpdateModal } from 'components/TModal';
import { StandardQForm } from 'components/TForm';
import PageHeaderLayout from '../../base/PageHeaderLayout';

@connect( ( state, props ) => ( {
        Breadcrumb: state.Breadcrumb,
        MtrlLossCollate: state.MtrlLossCollate,
} ) )
export default class MLossCollate extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            tableDataList: [],
            // wsTypeList: [],
            updateFromItem: {},
            // total: 0,
            current: 1,
            pageSize: 10,
            UModalShow: false,
            // loading: true,
        }
        this.url = '/api/TWms/material_type';
    }

    componentWillMount() {
      // this.getTableList();
      this.props.dispatch( fetchMtrlLossCollate( { current: 1 }, ( respose ) => {} ) )
    }

    getTableList( que ) {
        const { current, pageSize, keyWord } = this.state;
        const dat = {
            PageIndex: current - 1, // 分页：页序号，不分页时设为0
            PageSize: pageSize, // 分页：每页记录数，不分页时设为-1
            ParentUUID: -1, // 保留字段，取值设为-1
            KeyWord: keyWord,
        }

        TPostMock(
            '/area_type', 'ListActive', dat,
            ( res ) => {
                const list = [];
                // console.log( '查询到工作中心类别列表', res );
                const data_list = res.obj.objectlist || [];
                const totalcount = res.obj.totalCount;
                data_list.forEach( ( item, index ) => {
                    list.push( {
                        key: index,
                        UUID: item.UUID,
                        Name: item.Name,
                        ID: item.ID,
                        Founder: item.Founder,
                        CreatDateTime: item.CreatDateTime,
                        Renewing: item.Renewing,
                        UpdateDateTime: item.UpdateDateTime,
                      } )
                } )
                this.setState( { tableDataList: list, total: totalcount, loading: false } );
            },
            ( error ) => {
              message.error( error );
              this.setState( { loading: true } );
            },
        )
    }

    handleCreat=( data ) => {
        const dat = {
            Name: data.Name,
            ID: data.Number,
            ParentUUID: -1, // 保留字段，取值设为-1
        }
        TPostData(
            this.url, 'Add', dat,
            ( res ) => {
                message.success( '创建成功！' );
                this.getTableList();
            },
            ( err ) => {
                message.error( '创建失败！' );
                // console.log( 'err', err );
            },
        )
    }

    handleUpdate=( data ) => {
        const dat = {
            UUID: this.state.updateFromItem.UUID,
            ParentUUID: -1, // 保留字段，取值设为-1
            Name: data.Name,
            ID: data.Number,
            Desc: data.Desc,
            Note: '-',
        }
        // console.log( 'dat', dat, this.state.updateFromItem.UUID )
        TPostData(
            this.url, 'Update', dat,
            ( res ) => {
                message.success( '更新成功！' );
                this.getTableList();
            },
            ( err ) => {
                message.error( '更新失败！', err );
                console.log( 'err', err );
            },
        )
    }

    handleDelete=( data ) => {
        const dat = {
            UUID: data.UUID,
        }
        TPostData(
            this.url, 'Inactive', dat,
            ( res ) => {
                message.success( '删除成功！' );
                this.getTableList();
            },
            ( err ) => {
                message.error( '删除失败！' );
                // console.log( 'err', err );
            },
        )
    }

    handleQuery=( data ) => {
        // console.log( '查询的值是:', data );
        const { keyWord, TypeUUID } = data;
        this.setState( { keyWord, TypeUUID }, () => {
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
        const {
          tableDataList,
          // loading,
          current,
          // total,
          pageSize,
          updateFromItem,
          UModalShow,
        } = this.state;
        const { Breadcrumb } = this.props;
        const { list, total, loading } = this.props.MtrlLossCollate;
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
                type: 'string',
            },
            {
                title: '产品',
                dataIndex: 'product',
                type: 'string',
            },
            {
                title: '模具编号',
                dataIndex: 'moldID',
                type: 'string',
            },
            {
                title: '工作中心',
                dataIndex: 'workCenter',
                type: 'string',
            },
            {
                title: '工单号',
                dataIndex: 'workOrder',
                type: 'string',
            },
            {
                title: '日期',
                dataIndex: 'date',
                type: 'string',
            },

            {
                title: '产品重量(kg)',
                dataIndex: 'productWeight',
                type: 'string',
            },
            {
                title: '原材料重量(kg)',
                dataIndex: 'materialWeight',
                type: 'string',
            },
            {
                title: '理论耗损率(%)',
                dataIndex: 'thrDissRate',
                type: 'string',
                // render:(str,item)=><Progress  percent={str} />
            },
            {
                title: '实际耗损率(%)',
                dataIndex: 'actDissRate',
                type: 'string',
                // render:(str,item)=><Progress  percent={str} />
            },
            /* {
                title: '生产进度',
                dataIndex: 'progress',
                type: 'string',
                width:150,
                render:(str,item)=><Progress percent={str} />
            } */
        ];
        // 更新弹框数据项
        const UFormItem = [
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
            },
        ];
        // 添加的弹出框菜单
        const CFormItem = [
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
            },
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
                label: '工作中心',
                type: 'select',
                hasAllButtom: true,
                defaultValue: '-1',
                width: 150,
                options: [],
            }, {
                name: 'ModelUUID',
                label: '产品型号',
                type: 'select',
                hasAllButtom: true,
                defaultValue: '-1',
                width: 200,
                options: [],
            },
        ];

        const bcList = [{
          title: '首页',
          href: '/',
          }, {
          title: '基础数据',
          href: '/',
          }, {
          title: '物料类别',
          }];
        return (
            <PageHeaderLayout title="产品材料耗损分析"
              wrapperClassName="pageContent"
              BreadcrumbList={Breadcrumb.BCList}
            >
                <div className="cardContent">
                    <StandardQForm
                      FormItem={RFormItem}
                      submit={this.handleQuery}
                    />
                    <CreateModal
                      FormItem={CFormItem}
                      submit={this.handleCreat}
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
                      submit={this.handleUpdate}
                      showModal={UModalShow}
                      hideModal={this.toggleUModalShow}
                    />
                </div>
            </PageHeaderLayout>
        )
    }
}
