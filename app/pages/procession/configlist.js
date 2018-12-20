/**
 *这是设备列表页
 *添加日期:2017.12.06
 *添加人:shaw
 * */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import {
    Table,
    Icon,
    Badge,
    Popover,
    message,
    Button,
    Divider,
    Popconfirm,
} from 'antd';
import { config_list } from 'actions/procession'
import SimpleTable from 'components/TTable/SimpleTable';
import { CreateModal, UpdateModal } from 'components/TModal';
import { SimpleQForm, StandardQForm } from 'components/TForm';
import { TPostData, urlBase } from '../../utils/TAjax';
import PageHeaderLayout from '../../base/PageHeaderLayout';
import configuration from './configuration'
import edit from './edit'

@connect( ( state, props ) => {
    console.log( 'process_product:state', state, props )
    return { Breadcrumb: state.Breadcrumb, processionConfig: state.processionConfig }
} )
export default class processionConfig extends Component {
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
        this.url = '/api/TProduct/product_model';
    }

    componentWillMount() {
        //    this.props.dispatch( config_list( { }, ( respose ) => {} ) )
    }

    componentDidMount() {
        const { list } = this.props.processionConfig;
        if ( list.length <= 0 ) {
            this
                .props
                .dispatch( config_list( {}, ( respose ) => {} ) )
        }
    }

    handleCreat = ( data ) => {}

    handleUpdate = ( data ) => {}

    handleDelete = ( data ) => {}

    handleQuery = ( data ) => {
        const { keyWord, TypeUUID } = data;
        this.setState( {
            keyWord,
            TypeUUID,
        }, () => {
            //    this.getTableList();
        } );
    }

    handleTableChange = ( pagination ) => {
        // console.log('pagination',pagination);
        const { current, pageSize } = pagination;
        this.setState( {
            current,
            pageSize,
            loading: true,
        }, () => {
            this.getTableList();
        } );
    }

    toggleUModalShow = ( record ) => {
        this.setState( {
            UModalShow: !this.state.UModalShow,
            updateFromItem: record,
        } );
    }

    render() {
        const {
            // tableDataList, loading,
            current,
            // total,
            pageSize,
            updateFromItem,
            UModalShow,
        } = this.state;
        const { Breadcrumb, children } = this.props;
        const { list, total, loading } = this.props.processionConfig;
        const Data = {
            // list:tableDataList,
            list: list,
            pagination: {
                total,
                current,
                pageSize,
            },
        };

        // table表格表头参数
        const Tcolumns = [
            {
                title: '序号',
                dataIndex: 'key',
                width: 50,
            }, {
                title: 'ID',
                dataIndex: 'uObjectUUID',
                width: 80,
            }, {
                title: '名称',
                dataIndex: 'strConfigName',
            }, {
                title: '编号',
                dataIndex: 'strConfigCode',
            }, {
                title: '标准工时',
                dataIndex: 'fConfigRateHours',
            }, {
                title: '最大工时',
                dataIndex: 'fConfigMaxHours',
            }, {
                title: '最小工时',
                dataIndex: 'fConfigMinHours',
            }, {
                title: '备注',
                dataIndex: 'strConfigNote',
            }, {
                title: '操作',
                dataIndex: 'UUID',
                width: 150,
                render: ( UUID, record ) => ( <span>
                        <Link to="/procession/configlist/configuration">配置</Link>
                        {/* <Redirect
                            from='/process/product'
                            to='/process/product/configuration'
                        >
                        工艺配置
                        </Redirect> */}
                        {/* <a onClick={()=>this.props.history.push('/process/product/configuration')}>工艺配置</a> */}
                        <Divider type="vertical" />
                        <Link to="/procession/configlist/edit">编辑</Link>
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
           },
           {
               name: 'SN',
               label: '序列号',
               type: 'string',
               placeholder: '请输入序列号',
               rules: [{ required: true, message: '序列号不能为空' }],
           },
           {
               name: 'Version',
               label: '版本号',
               type: 'string',
               placeholder: '请输入版本号',
               rules: [{ required: true, message: '版本号不能为空' }],
           },
           {
               name: 'Desc',
               label: '备注',
               type: 'string',
           },
           {
                name: 'Image',
                label: '图片',
                type: 'antUpload',
                url: '/api/tupload/do',
            },
        ];
        // 添加的弹出框菜单
        const CFormItem = [
            {
                name: 'Name',
                label: '型号名称',
                type: 'string',
                placeholder: '请输入型号名称',
                rules: [
                    {
                        required: true,
                        message: '名称不能为空',
                    },
                ],
            }, {
                name: 'Number',
                label: '型号编号',
                type: 'string',
                placeholder: '请输入型号编号',
                rules: [
                    {
                        required: true,
                        message: '编号不能为空',
                    },
                ],
            }, {
                name: 'SN',
                label: '序列号',
                type: 'string',
                placeholder: '请输入序列号',
                rules: [
                    {
                        required: true,
                        message: '序列号不能为空',
                    },
                ],
            }, {
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

        const configList = () => (
            <div className="cardContent">
                {/* <SimpleQForm FormItem={RFormItem} submit={this.handleQuery} /> */}
                <div style={{ marginBottom: 15 }}>
                    <CreateModal
                      FormItem={CFormItem}
                      submit={() => this.handleCreat( )}
                    />
                </div>
                <SimpleTable
                  size="middle"
                  bordered
                  isHaveSelect={false}
                  loading={loading}
                  data={Data}
                  columns={Tcolumns}
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
        );

        const action = (
            <Button type="primary">
                <Link to="/procession/configlist">返回</Link>
            </Button>
        );

        const bcList = [{
            title: '首页',
            href: '/home',
            }, {
            title: '工艺管理',
            href: '/procession/configlist',
            }, {
            title: '工艺配置',
        }];

        return (
            <PageHeaderLayout
              wrapperClassName="pageContent"
              action={children
                ? action
                : ''}
              BreadcrumbList={bcList}
            >
                <Switch>
                    <Route path="/procession/configlist/configuration" component={configuration} />
                    <Route path="/procession/configlist/edit" component={edit} />
                    <Route path="/procession/configlist" component={configList} />
                </Switch>
                {/* {children?children:productList} */}
            </PageHeaderLayout>
        )
    }
}
