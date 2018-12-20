/**
 *这是模具型号页
 *添加日期:2017.12.06
 *添加人:shaw
 * */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory, Link } from 'react-router'
import {
    Table,
    Row,
    Col,
    Icon,
    Badge,
    Dropdown,
    Popover,
    message,
    Divider,
    Popconfirm,
} from 'antd';
import {
    f_mold_model,
    add_mold_model,
    update_mold_model,
    delete_mold_model,
} from 'actions/mold';
import { TPostData, urlBase } from 'utils/TAjax';
import SimpleTable from 'components/TTable/SimpleTable';
import { CreateModal, UpdateModal } from 'components/TModal';
import { DropDownForm, StandardQForm } from 'components/TForm';
import { fn_mes_trans } from 'functions'
import PageHeaderLayout from '../../base/PageHeaderLayout';

@connect( ( state, props ) => {
    console.log( 'state', state )
    return { Breadcrumb: state.Breadcrumb, moldModel: state.moldModel }
} )
export default class MouldModel extends Component {
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
        this.url = '/api/TMold/mold_model';
    }

    componentWillMount() {
        // this.getTableList();
        this
            .props
            .dispatch( f_mold_model( {}, ( respose ) => {} ) )
    }

    getTableList( que ) {
        const { current, pageSize, keyWord } = this.state;
        const dat = {
            PageIndex: current - 1, // 分页：页序号，不分页时设为0
            PageSize: pageSize, // 分页：每页记录数，不分页时设为-1
            // FactoryUUID: -1,    //所属工厂UUID，不作为查询条件时取值设为-1 TypeUUID: que?que.TypeUUID:-1,
            // //类型UUID，不作为查询条件时取值设为-1
            KeyWord: keyWord,
            // KeyWord : que?que.keyWord:''
        }

        TPostData( this.url, 'ListActive', dat, ( res ) => {
            const list = [];
            console.log( '查询到模具型号列表', res );
            const data_list = res.obj.objectlist || [];
            const totalcount = res.obj.totalcount;
            data_list.forEach( ( item, index ) => {
                list.push( {
                    key: index,
                    UUID: item.UUID,
                    // ModelUUID:item.ModelUUID,
                    TypeName: item.TypeName,
                    MoldModelID: `SC-00${item.ID}`,
                    MoldModelName: item.Name,
                    MoldModelSize: item.Size,
                    MoldModelDesc: item.Desc,
                    MoldModelNote: item.Note,
                    UpdateDateTime: item.UpdateDateTime,
                    Cavity: item.Cavity,
                    Image: item.Image,
                } )
            } )
            this.setState( { tableDataList: list, total: totalcount, loading: false } );
        }, ( error ) => {
            message.error( error );
            this.setState( { loading: false } );
        } )
    }

    handleCreat = ( data ) => {
        const addData = {
            cols: fn_mes_trans.toCols( data ),
        }
        console.log( '开始添加', addData );
        this
            .props
            .dispatch( add_mold_model( addData ) )
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
            .dispatch( update_mold_model( editData ) )
    }

    handleDelete = ( data ) => {
        const deleteData = {
            uuids: [data.uObjectUUID],
        }
        console.log( '开始删除', deleteData );
        this
            .props
            .dispatch( delete_mold_model( deleteData ) )
    }

    handleQuery = ( data, type ) => {
        const { current, pageSize } = this.state;
        const quePage = {
            page: current - 1,
            size: pageSize,
        };
        const searchKey = [
            'strModelName',
            'strModelLabel',
            'nMouldRateLife',
            'nMouldStepCount',
            'nMouldHoleCount',
            'fMouldLength',
            'fMouldWidth',
            'fMouldHeight',
            'strMouldCode',
        ];
        const options = type === 'filter' ?
                    fn_mes_trans.toFilter( data ) :
                    type === 'search' ?
                    fn_mes_trans.toSearch( data, searchKey ) : '';
        const queReq = Object.assign( quePage, options );
        console.log( 'moldmodel查询值是：', queReq )
        this
            .props
            .dispatch( f_mold_model( queReq, ( respose ) => {} ) )
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
            tableDataList,
            // loading,
            current,
            // total,
            pageSize,
            updateFromItem,
            UModalShow,
        } = this.state;
        const { Breadcrumb } = this.props;
        const { list, total, loading } = this.props.moldModel;

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
                type: 'string',
            }, {
                title: '图片',
                dataIndex: 'Image',
                render: ( e, record ) => {
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
            }, {
                title: '模具名称',
                dataIndex: 'strModelName',
                type: 'string',
            }, {
                title: '模具图号',
                dataIndex: 'strMouldCode',
                type: 'string',
            }, {
                title: '标签',
                dataIndex: 'strModelLabel',
                type: 'string',
            },
            /* {
                title: '模具类别',
                dataIndex: 'TypeName',
                type: 'string'
            }, */
            {
                title: '尺寸(L*W*H)',
                dataIndex: 'fMouldHeight',
                render: ( str, item ) => (
                    <span>{`${item.fMouldLength}*${item.fMouldWidth}*${item.fMouldHeight}`}
                    </span>
                ),
            }, {
                title: '穴数',
                dataIndex: 'nMouldHoleCount',
                type: 'string',
            }, {
                title: '步距',
                dataIndex: 'fMouldStepValue',
                type: 'string',
            }, {
                title: '设计寿命(模次)',
                dataIndex: 'nMouldRateLife',
                type: 'string',
            },
            /* {
                title: '修改时间',
                dataIndex: 'UpdateDateTime',
                type: 'string'
            }, */
            {
                title: '操作',
                dataIndex: 'UUID',
                render: ( UUID, record ) => ( <span>
                        <a
                          onClick={this
                            .toggleUModalShow
                            .bind( this, record )}
                        >编辑
                        </a>
                        <Divider type="vertical" />
                        <Popconfirm
                          placement="topRight"
                          title="确定删除此项数据？"
                          onConfirm={this
                            .handleDelete
                            .bind( this, record )}
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
                label: '名称',
                type: 'string',
                placeholder: '请输入型号',
                rules: [
                    {
                        required: true,
                        message: '请输入型号',
                    },
                ],
            }, {
                name: 'strMouldCode',
                label: '图号',
                type: 'string',
                placeholder: '请输入编号',
                rules: [
                    {
                        required: true,
                        message: '请输入编号',
                    },
                ],
            }, {
                name: 'fMouldLength',
                label: '长度',
                type: 'string',
                placeholder: '尺寸',
                rules: [
                    {
                        required: true,
                        message: '请输入尺寸',
                    },
                ],
            }, {
                name: 'fMouldWidth',
                label: '宽度',
                type: 'string',
                placeholder: '尺寸',
                rules: [
                    {
                        required: true,
                        message: '请输入尺寸',
                    },
                ],
            }, {
                name: 'nMouldHoleCount',
                label: '穴数',
                type: 'string',
                placeholder: '请输入模具穴数',
                rules: [
                    {
                        required: true,
                        message: '模具穴数不能为空',
                    },
                ],
            },
            /* {
                name: 'strMoldModelDesc',
                label: '描述',
                type: 'string',
                placeholder: '请输入描述'
            }, */
            /* {
                name: 'strMouldNote',
                label: '备注',
                type: 'string',
                placeholder: '请输入备注'
            }, {
                name: 'Image',
                label: '图片',
                type: 'antUpload',
                url: '/api/tupload/do'
            } */
        ];
        // 添加的弹出框菜单
        const CFormItem = [
            {
                name: 'strModelName',
                label: '名称',
                type: 'string',
                placeholder: '请输入名称',
                rules: [
                    {
                        required: true,
                        message: '请输入名称',
                    },
                ],
            }, {
                name: 'strMouldCode',
                label: '图号',
                type: 'string',
                placeholder: '请输入编号',
                rules: [
                    {
                        required: true,
                        message: '请输入编号',
                    },
                ],
            }, {
                name: 'nMouldHoleCount',
                label: '穴数',
                type: 'string',
                placeholder: '请输入模具穴数',
                rules: [
                    {
                        required: true,
                        message: '模具穴数不能为空',
                    },
                ],
            }, {
                name: 'uCategoryUUID',
                label: '类别',
                type: 'select',
                options: [
                    {
                        value: 1,
                        text: '类型1',
                    }, {
                        value: 2,
                        text: '类型2',
                    },
                ],
                rules: [
                    {
                        required: true,
                        message: '模具穴数不能为空',
                    },
                ],
            },
            /* {
              name: 'Image',
              label: '图片',
              type: 'antUpload',
              url: '/api/tupload/do',
            }, */
        ];
        // 查询的数据项
        const RFormItem = [
            {
                name: 'uCategoryUUID',
                label: '类别',
                type: 'select',
                options: [
                    {
                        value: 1,
                        text: '类型1',
                    }, {
                        value: 2,
                        text: '类型2',
                    },
                ],
                rules: [
                    {
                        required: true,
                        message: '模具穴数不能为空',
                    },
                ],
            },
        ];

        const bcList = [
            {
                title: '首页',
                href: '/',
            }, {
                title: '生产资料',
                href: '/',
            }, {
                title: '物料类别',
            },
        ];

        return (
            <PageHeaderLayout
              title="模具型号"
              wrapperClassName="pageContent"
              BreadcrumbList={bcList}
            >
                <div className="cardContent">
                    {/* <Feature /> */}
                    {/* <SimpleQForm
                        FormItem={RFormItem}
                        submit={this.handleQuery}
                    /> */}
                    <div style={{
                        marginBottom: 15,
                    }}
                    >
                        <Row>
                            <Col span={4}>
                                <CreateModal
                                  FormItem={CFormItem}
                                  submit={this.handleCreat.bind( this )}
                                />
                            </Col>
                            <Col span={12} />
                            <Col span={8}>
                                <DropDownForm
                                  FormItem={RFormItem}
                                  isHaveSearch
                                  submit={this.handleQuery}
                                />
                            </Col>
                        </Row>
                    </div>
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
                      submit={this
                        .handleUpdate
                        .bind( this )}
                      showModal={UModalShow}
                      hideModal={this.toggleUModalShow}
                    />
                </div>
            </PageHeaderLayout>
        )
    }
}
