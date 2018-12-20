/**
 *这是权限组页
 *添加日期:2018.03.03
 *添加人:shaw
 * */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom'
import { Button, message, Divider, Row, Col, Popconfirm, Menu, Card, List } from 'antd';
import { fetchUserGroupList, user_auth_item } from 'actions/user';
import { TPostData } from 'utils/TAjax';
import SimpleTable from 'components/TTable/SimpleTable';
import { CreateModal, UpdateModal } from 'components/TModal';
import TUserAuthDetail from './TUserAuthDetail';
import PageHeaderLayout from '../../base/PageHeaderLayout';
// import { hashHistory, Link } from 'react-router';
// import { SimpleQForm, StandardQForm } from 'components/TForm';


@connect( ( state, props ) => ( {
    Breadcrumb: state.Breadcrumb,
    UserGroup: state.UserGroup,
} ) )
export default class TAuthGroupList extends Component {
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

            showDetal: false,
            detailID: 0,
            detailMessage: {},
        }
        this.url = '/api/TUser/group';
    }

    componentWillMount() {
        // this.getTableList();
        this.props.dispatch( fetchUserGroupList( { current: 1 }, ( respose ) => {} ) )
    }

    handleClick=( e ) => {
        console.log( 'dianji menu', e )
        this.props.dispatch( user_auth_item( {} ) )
    }

    handleDelete=( data ) => {

    }

    handleUpdate( data ) {

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
            // this.getTableList();
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
        // let Feature = this.feature;
        // const { detail } = this.props;
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
        const { UserGroup, Breadcrumb } = this.props;
        const {
            list, user_auth, total, loading,
        } = this.props.UserGroup;
        const Data = {
            // list:tableDataList,
            // list: list,
            list: user_auth,
            pagination: { total, current, pageSize },
        };

        const Tcolumns = [
            {
                title: '序号',
                dataIndex: 'key',
            },
            {
                title: '权限名称',
                dataIndex: 'strItemName',
                // 车间描述,备注,
            }, {
                title: '权限编码',
                dataIndex: 'strItemCode',
            }, {
                title: '备注',
                dataIndex: 'strItemNote',
            }, {
                title: '操作',
                dataIndex: 'UUID',
                render: ( UUID, record ) => (
                <span>
                    <a onKeyDown={() => ''} onClick={() => this.toggleUModalShow( record )}>编辑</a>
                    <Divider type="vertical" />
                    <Popconfirm
                      placement="topRight"
                      title="确定删除此项数据？"
                      onConfirm={() => this.handleDelete( record )}
                      okText="确定"
                      cancelText="取消"
                    >
                        <a>删除</a>
                    </Popconfirm>
                    {/* <Divider type="vertical" /> */}
                    {/* <a onKeyDown={() => ''} onClick={() => this.toggleRender( record )}>详情</a> */}
                </span>
                ),
            },
        ];

        const UFormItem = [
            {
                name: 'Name',
                label: '名称',
                type: 'string',
                placeholder: '请输入名称',
                rules: [{ required: true, message: '名称不能为空' }],
           },
            {
                name: 'ID',
                label: '编号',
                type: 'string',
                placeholder: '请输入编号',
                rules: [{ required: true, message: '编号不能为空' }],
           },
           /* {
                name: 'Desc',
                label: '描述',
                type: 'string',
                placeholder: '描述',
                rules: [
                    {
                        min: 2,
                        message: '用户名至少为 2 个字符'
                    }
                ]
            }, */ {
                name: 'Note',
                label: '备注',
                type: 'string',
                placeholder: '其它',
            },
        ];

        const CFormItem = [
            {
                name: 'Name',
                label: '名称',
                type: 'string',
                placeholder: '请输入名称',
                rules: [{ required: true, message: '名称不能为空' }],
           },
           {
                name: 'ID',
                label: '编号',
                type: 'string',
                placeholder: '请输入编号',
                rules: [{ required: true, message: '编号不能为空' }],
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

        const AuthDetail = (
            <div className="cardContent">
                {/* <div>
                    <Breadcrumb style={{display:"inline-block"}}>
                        <Breadcrumb.Item>
                            <a onClick={this.toggleRender.bind(this)} href="#">BOM管理</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>权限组详情</Breadcrumb.Item>
                    </Breadcrumb>
                    <span onClick={this.toggleRender.bind(this)} className="backup-button">
                        <Icon type="rollback" />
                    </span>
                </div> */}
                <TUserAuthDetail detailMessage={detailMessage} UUID={detailID} />
            </div>
        );
        const AuthListTable = () => (
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
                <UpdateModal
                  FormItem={UFormItem}
                  updateItem={updateFromItem}
                  submit={this.handleUpdate}
                  showModal={UModalShow}
                  hideModal={this.toggleUModalShow}
                />
                <SimpleTable
                  size="small"
                  loading={loading}
                  data={Data}
                  columns={Tcolumns}
                  isHaveSelect={false}
                  onChange={this.handleTableChange}
                />
            </div>
        );

        const bcList = [{
          title: '首页',
          href: '/',
          }, {
          title: '系统设置',
          href: '/',
          }, {
          title: '权限组管理',
          }, {
          title: showDetal ? '权限组详情' : '',
          }];

        const HeadAction = (
                // <span onClick={this.toggleRender.bind(this)} className="backup-button">
                //     <Icon type="rollback" />返回
                // </span>
                <Button onClick={this.toggleRender} type="primary" icon="rollback">返回</Button>
        );

        const HeadContent = (
            <div style={{
                    color: '#757879',
                    // border: 'solid 1px #80808029',
                    marginTop: 12,
                    fontSize: 20,
                }}
            >
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={8}>
                        <span>
                            名称:
                            <span style={{ color: '#070808' }}>{detailMessage.Name}</span>
                        </span>
                    </Col>
                    <Col span={8}>
                        <span>
                            编号:
                            <span style={{ color: '#070808' }}>{detailMessage.ID}</span>
                        </span>
                    </Col>
                    <Col span={8}>
                        <span>
                            描述:
                            <span style={{ color: '#070808' }}>{detailMessage.Note}</span>
                        </span>
                    </Col>
                </Row>
            </div>
        );

        return (
            <PageHeaderLayout
            //   title={showDetal ? '权限组详情' : '权限组管理'}
              action={showDetal ? HeadAction : ''}
              content={showDetal ? HeadContent : ''}
              wrapperClassName="pageContent"
              BreadcrumbList={bcList}
            >
               <Card>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <Menu
                              onClick={this.handleClick}
                            // selectedKeys={[this.state.current]}
                              selectedKeys={[UserGroup.activeKey]}
                              defaultSelectedKeys={['base']}
                              mode="vertical "
                            // selectable
                            >
                                <Menu.Item key="home">
                                    首页
                                    <Link to="/setting/auth_group_list/home" />
                                </Menu.Item>
                                <Menu.Item key="mtrl">
                                    监控
                                    <Link to="/setting/auth_group_list/monitor" />
                                </Menu.Item>
                                <Menu.Item key="out">
                                    生产管理
                                    <Link to="/setting/auth_group_list/production" />
                                </Menu.Item>
                                <Menu.Item key="mold">
                                    工艺管理
                                    <Link to={`/procession/route/config/${this.state.uuid}/mold`} />
                                </Menu.Item>
                                <Menu.Item key="device">
                                    品质管理
                                    <Link to={`/procession/route/config/${this.state.uuid}/device`} />
                                </Menu.Item>
                                <Menu.Item key="device">
                                    设备管理
                                    <Link to={`/procession/route/config/${this.state.uuid}/device`} />
                                </Menu.Item>
                            </Menu>
                        </Col>
                        <Col className="gutter-row" span={20}>
                            <Switch>
                                <Route path="/setting/auth_group_list/production" component={AuthListTable} />
                                {/* <Route path={`/procession/route/config/${this.state.uuid}/mtrl`} component={para_mtrl} />
                                <Route path={`/procession/route/config/${this.state.uuid}/out`} component={para_out} />
                                <Route path={`/procession/route/config/${this.state.uuid}/mold`} component={para_mold} />
                                <Route path={`/procession/route/config/${this.state.uuid}/device`} component={para_device} /> */}
                            </Switch>
                        </Col>
                    </Row>
               </Card>
            </PageHeaderLayout>
        );
    }
}
