/**
 *这是用户列表页
 *添加日期:2018.03.03
 *添加人:shaw
 * */
import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { hashHistory, Link } from 'react-router';
import { Button, Popover, message, Row, Col, Popconfirm } from 'antd';
import MD5 from 'components/TCommon/md5';
import { account_list, account_add, account_update, account_delete } from 'actions/user';
import { TPostData, urlBase } from 'utils/TAjax';
import SimpleTable from 'components/TTable/SimpleTable';
import { CreateModal, UpdateModal } from 'components/TModal';
import { fn_mes_trans } from 'functions'
// import { SimpleQForm, StandardQForm } from 'components/TForm';
import TUserDetails from './TUserDetails';
import PageHeaderLayout from '../../base/PageHeaderLayout';

@connect( ( state, props ) =>
    ( {
    Breadcrumb: state.Breadcrumb,
    UserAccount: state.UserAccount,
} ) )
export default class TUserList extends Component {
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
            keyWord: '',
            showDetal: false,
            detailID: 0,
            detailMessage: {},
        }
        this.url = '/api/TUser/account';
    }

    componentWillMount() {
        // this.getTableList();
        this.props.dispatch( account_list( { current: 1 }, ( respose ) => {} ) )
    }

    handleCreat = ( data ) => {
        const addData = {
            cols: fn_mes_trans.toCols( data ),
        }
        // console.log( '开始添加', addData );
        this
            .props
            .dispatch( account_add( addData, respose => console.log( '添加成功！', respose ) ) )
    }

    handleDelete = ( data ) => {
        const deleteData = {
            uuids: [data.uObjectUUID],
        }
        // console.log( '开始删除', deleteData );
        this
            .props
            .dispatch( account_delete( deleteData ) )
    }

    handleUpdate = ( data ) => {
        const item = this.state.updateFromItem;
        const editData = {
            uuid: item.uObjectUUID,
            cols: fn_mes_trans.toCols( data ),
        }
        console.log( '开始修改', data, editData );
        this
            .props
            .dispatch( account_update( editData ) )
    }

    handleQuery=( data ) => {
        const { keyWord } = data;
        this.setState( { keyWord }, () => {
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

    toggleRender( record ) {
        // console.log("toggleRender",record);
        this.setState( {
            showDetal: !this.state.showDetal,
            detailID: record.UUID,
            detailMessage: record,
        } )
    }

    toggleUModalShow=( record ) => {
        this.setState( { UModalShow: !this.state.UModalShow, updateFromItem: record } );
    }

    render() {
        const { detail } = this.props;
        const {
            tableDataList,
            ProModelList,
            // loading,
            current,
            // total,
            pageSize,
            updateFromItem,
            UModalShow,
            showDetal,
            detailID,
            detailMessage,
        } = this.state;
        // const { Breadcrumb } = this.props;
        const { list, total, loading } = this.props.UserAccount;
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
                title: '用户头像',
                dataIndex: 'Image',
                render: ( e, record ) => {
                    // console.log('图片地址',e);
                    const content = (
                        <div>
                          <img alt="头像" width="300" src={urlBase + e} />
                        </div>
                    );
                    return (
                        <Popover placement="right" content={content} trigger="hover">
                          {/* <Button>Right</Button> */}
                          <img alt="头像" height="50" src={urlBase + e} />
                        </Popover>
                    )
                },
            },
            {
                title: '用户名',
                dataIndex: 'strNickName',
                type: 'string',
            },
            {
                title: '真实姓名',
                dataIndex: 'strTrueName',
            },
            {
                title: '性别',
                dataIndex: 'nSex',
                render: ( str, record ) => <span>{str === 1 ? '男' : '女'}</span>,
            },
            {
                title: '生日',
                dataIndex: 'dtBirthday',
            },
            {
                title: '邮箱',
                dataIndex: 'strEmail',
            },
            {
                title: '手机号',
                dataIndex: 'strMobile',
            },
            {
                title: '射频卡',
                dataIndex: 'strRfidCard',
            },
            {
                title: '工号',
                dataIndex: 'strWorkID',
            },
            /* {
                title: '用户启用时间',
                dataIndex: 'ActiveDateTime',
            }, */
            /* {
                title: '用户冻结时间',
                dataIndex: 'InactiveDateTime',
                type: 'string'
            }, */
            {
                title: '备注',
                dataIndex: 'strNote',
            },
            {
                title: '操作',
                dataIndex: 'UUID',
                width: 150,
                render: ( UUID, record ) => {
                    const { editable } = record;
                    return (
                        <div className="editable-row-operations">
                            <a onClick={() => this.toggleUModalShow( record )}>编辑</a>
                            <span className="ant-divider" />
                            <Popconfirm title="确定要删除?" onConfirm={() => this.handleDelete( record )}>
                                <a>删除</a>
                            </Popconfirm>
                            {/* <span className="ant-divider" /> */}
                            {/* <a onClick={this.toggleRender.bind( this, record )}>详情</a> */}
                        </div> );
                },
            },
        ];

        const UFormItem = [
            {
                name: 'strNickName',
                label: '昵称',
                type: 'string',
                placeholder: '请输入登录名',
                rules: [{ required: true, message: '登录名不能为空' }],
            }, {
                name: 'strPswMD5',
                label: '密码',
                type: 'string',
                placeholder: '请输入密码',
                rules: [{ required: true, message: '密码不能为空' }],
            }, {
                name: 'strTrueName',
                label: '真实姓名',
                type: 'string',
                placeholder: '请输入用户编号',
                rules: [{ required: true, message: '编号至少为 1 个字符' }],
            }, {
                name: 'nSex',
                label: '性别',
                type: 'string',
                placeholder: '请输入用户编号',
                rules: [{ required: true, message: '编号至少为 1 个字符' }],
            }, {
                name: 'strMobile',
                label: '手机号',
                type: 'string',
                placeholder: '请输入用户编号',
                rules: [{ required: true, message: '编号至少为 1 个字符' }],
            }, {
                name: 'Image',
                label: '图片',
                type: 'antUpload',
                url: '/api/tupload/do',
            },
        ];

        const CFormItem = [
             {
                name: 'strNickName',
                label: '昵称',
                type: 'string',
                placeholder: '请输入登录名',
                rules: [{ required: true, message: '登录名不能为空' }],
            }, {
                name: 'strPswMD5',
                label: '密码',
                type: 'string',
                placeholder: '请输入密码',
                rules: [{ required: true, message: '密码不能为空' }],
            }, {
                name: 'strTrueName',
                label: '真实姓名',
                type: 'string',
                placeholder: '请输入用户编号',
                rules: [{ required: true, message: '编号至少为 1 个字符' }],
            }, {
                name: 'nSex',
                label: '性别',
                type: 'string',
                placeholder: '请输入用户编号',
                rules: [{ required: true, message: '编号至少为 1 个字符' }],
            }, {
                name: 'strMobile',
                label: '手机号',
                type: 'string',
                placeholder: '请输入用户编号',
                rules: [{ required: true, message: '编号至少为 1 个字符' }],
            }, {
                name: 'Image',
                label: '图片',
                type: 'antUpload',
                url: '/api/tupload/do',
            },
        ];

        const RFormItem = [
            {
                name: 'keyWord',
                label: '搜索内容',
                type: 'string',
                placeholder: '请输入搜索内容',
            },
        ];

        const UserDetail = (
            <div className="cardContent">
                {/* <div>
                    <Breadcrumb style={{display:"inline-block"}}>
                        <Breadcrumb.Item>
                            <a onClick={this.toggleRender.bind(this)} href="#">BOM管理</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>用户详情</Breadcrumb.Item>
                    </Breadcrumb>
                    <span onClick={this.toggleRender.bind(this)} className="backup-button">
                        <Icon type="rollback" />
                    </span>
                </div> */}
                <TUserDetails detailMessage={detailMessage} UUID={detailID} />
            </div>
        );

        const UserListTable = (
            <div className="cardContent">
                {/* <SimpleQForm
                    FormItem={RFormItem}
                    submit={this.handleQuery}
                    /> */}
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
                <UpdateModal
                  FormItem={UFormItem}
                  updateItem={updateFromItem}
                  submit={this.handleUpdate}
                  showModal={UModalShow}
                  hideModal={this.toggleUModalShow}
                />
            </div>
        );

        const bcList11 = [{
          title: '首页',
          href: '/',
          }, {
          title: '系统设置',
          href: '/',
          }, {
          title: '账户列表',
          }];

        const HeadAction = (
                // <span onClick={this.toggleRender.bind(this)} className="backup-button">
                //     <Icon type="rollback" />返回
                // </span>
                <Button onClick={this.toggleRender} type="primary" icon="rollback">返回</Button>
            );

        const HeadContent = (
            <div style={{ marginTop: 25, height: 100 }}>
                    {/* <img height='50' src={urlBase+detailMessage.Image}/>avatarPic */}
                <Row>
                    <Col span={5}>
                        <div style={{
                                fontSize: 16,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',
                                height: 100,
                            }}
                        >
                            <img style={{ height: '100%' }} src={urlBase + detailMessage.Image} />
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{
                                fontSize: 16,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',
                                height: 100,
 }}
                        >
                            <p>用户名：<span>{detailMessage.Name}</span></p>
                            <p>手机号：<span>{detailMessage.Mobile}</span></p>
                            <p>电话：<span>{detailMessage.Phone}</span></p>
                        </div>
                    </Col>
                    <Col>
                        <div style={{
                                fontSize: 16,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',
                                height: 100,
 }}
                        >
                            <p>职称：车间主任</p>
                            <p>账户启用时间：{detailMessage.ActiveDateTime}</p>
                            <p>备注：{detailMessage.Note}</p>
                        </div>
                    </Col>
                </Row>
            </div>
        );

        // return  showDetal?UserDetail:UserListTable
        return (
            <PageHeaderLayout
            //   title={showDetal ? '工作中心详情' : '工作中心'}
              action={showDetal ? HeadAction : ''}
              content={showDetal ? HeadContent : ''}
              wrapperClassName="pageContent"
              BreadcrumbList={bcList11}
            >
                {/* <TWorkCenter/> */}
                {showDetal ? UserDetail : UserListTable}
            </PageHeaderLayout>
        );
    }
}
