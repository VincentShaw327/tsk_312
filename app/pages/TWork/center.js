import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Row, Col, Popover, message, Divider, Popconfirm } from 'antd';
import { workcenter_list } from 'actions/work';
import SimpleTable from 'components/TTable/SimpleTable';
import { CreateModal, UpdateModal } from 'components/TModal';
import { StandardQForm } from 'components/TForm';
import { TPostData, urlBase } from '../../utils/TAjax';
import TWorkCenterDetail from './centerDetail';
import PageHeaderLayout from '../../base/PageHeaderLayout';
// import auto01 from 'images/assets/auto01.jpg'

@connect( ( state, props ) => ( {
        Breadcrumb: state.Breadcrumb,
        workCenter: state.workCenter,
} ) )
export default class TWorkCenter extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            // tableDataList: [],
            updateFromItem: {},
            // total: 0,
            current: 1,
            pageSize: 10,
            WorkshopUUID: -1,
            TypeUUID: -1,
            UModalShow: false,
            // loading: true,
            showDetal: false,
            detailID: 0,
            detailMessage: {},
            workshopList: [],
            WorkCenterTypeList: [],
        }
        this.url = '/api/TProcess/workcenter';
    }

    componentWillMount() {
        // this.props.dispatch(workcenter_list({current:1}, (respose) => {}))
    }

    componentDidMount() {
        this.props.dispatch( workcenter_list( { }, ( respose ) => {} ) )
    }

    toggleRender( record ) {
        this.setState( {
            showDetal: !this.state.showDetal,
            detailID: record.UUID,
            detailMessage: record,
        } )
    }

    handleCreat = ( data ) => {

    }

    handleQuery = ( data ) => {

    }

    handleUpdate = ( data ) => {

    }

    handleDelete = ( data ) => {
    }

    handleTableChange = ( pagination ) => {
        // console.log('pagination',pagination);
        const { current, pageSize } = pagination;
        this.setState( { current, pageSize }, () => {
            this.getTableList();
        } );
    }

    toggleUModalShow = ( record ) => {
        this.setState( { UModalShow: !this.state.UModalShow, updateFromItem: record } );
    }

    render() {
        const { Breadcrumb } = this.props;
        // let Feature=this.feature;
        const {
            showDetal,
            detailID,
            detailMessage,
            // tableDataList,
            // loading,
            WorkCenterTypeList,
            workshopList,
            current,
            // total,
            pageSize,
            updateFromItem,
            UModalShow,
        } = this.state;
        const { list, total, loading } = this.props.workCenter;
        // const { detail } = this.props;

        const Data = {
            // list: tableDataList,
            list: list,
            pagination: { total, current, pageSize },
        };

        const Tcolumns = [
            {
                title: '',
                dataIndex: 'key',
                width: 30,
            },
            {
                title: 'ID',
                dataIndex: 'uObjectUUID',
                width: 50,
            },
            {
                title: '名称',
                dataIndex: 'strCenterName',
            }, {
                title: '编号',
                dataIndex: 'strCenterCode',
            },
            {
                title: '操作',
                dataIndex: 'Status',
                width: 150,
                render: ( txt, record ) => (
                    <span>
                        <a
                          onKeyDown={() => this.toggleUModalShow( record )}
                          onClick={() => this.toggleUModalShow( record )}
                        >编辑
                        </a>
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
                        <Divider type="vertical" />
                        <a
                          onKeyDown={() => this.toggleRender( record )}
                          onClick={() => this.toggleRender( record )}
                        >
                            {/* <Icon type="profile" /> */}
                            详情
                        </a>
                    </span>
                ),
            },
        ];
        // 更新弹框数据项
        const UFormItem = [
            {
                name: 'Name',
                label: '名称',
                type: 'string',
                placeholder: '修改名称时必填',
                rules: [{ required: true, message: '名称不能为空' }],
            },
            {
                name: 'ID',
                label: '编号',
                type: 'string',
                placeholder: '修改编号时必填',
                rules: [{ required: true, min: 1, message: '编号不能为空' }],
            },
            {
                name: 'TypeUUID',
                label: '中心类型',
                type: 'select',
                options: WorkCenterTypeList,
            },
            {
                name: 'WorkshopUUID',
                label: '车间',
                type: 'select',
                options: workshopList,
            },
            /* {
                name: 'Desc',
                label: '描述',
                type: 'string',
                placeholder: '修改描述时必填'
            }, */
            {
                name: 'Note',
                label: '备注',
                type: 'string',
                placeholder: '其它',
            },
            {
                name: 'Image',
                label: '图片',
                type: 'antUpload',
                url: '/api/tupload/do',
            },
        ];
        // 可设置的查询字段
        const CFormItem = [
            {
                name: 'Name',
                label: '名称',
                type: 'string',
                placeholder: '请输入名称',
                rules: [{ required: true, min: 1, message: '名称不能为空' }],
            }, {
                name: 'ID',
                label: '编号',
                type: 'string',
                placeholder: '请输入编号',
                rules: [{ required: true, message: '编号不能为空' }],
            }, {
                name: 'TypeUUID',
                label: '中心类型',
                type: 'select',
                // defaultValue: '1',
                rules: [{ required: true, message: '请选择工作中心类型' }],
                options: WorkCenterTypeList,
            }, {
                name: 'WorkshopUUID',
                label: '车间',
                type: 'select',
                // defaultValue: '1',
                rules: [{ required: true, message: '请选择所属车间' }],
                options: workshopList,
            },
            {
                name: 'Image',
                label: '图片',
                type: 'antUpload',
                url: '/api/tupload/do',
            },
        ];
        // 查询的数据项
        const RFormItem = [
            {
                name: 'KeyWord',
                label: '搜索内容',
                type: 'string',
                placeholder: '请输入搜索内容',
            }, {
                name: 'TypeUUID',
                label: '中心类型',
                type: 'select',
                defaultValue: '-1',
                hasAllButtom: true,
                width: 200,
                options: WorkCenterTypeList,
            }, {
                name: 'WorkshopUUID',
                label: '车间',
                type: 'select',
                defaultValue: '-1',
                hasAllButtom: true,
                width: 180,
                options: workshopList,
            },
        ];

        const WorkCenterDetail = (
            <div className="cardContent">
                {/* <div>
                    <Breadcrumb style={{display:"inline-block"}}>
                        <Breadcrumb.Item>
                            <a onClick={this.toggleRender.bind(this)} href="#">工作中心</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>工作中心详情</Breadcrumb.Item>
                    </Breadcrumb>
                    <span onClick={this.toggleRender.bind(this)} className="backup-button">
                        <Icon type="rollback" />
                    </span>
                </div> */}
                <TWorkCenterDetail detailMessage={detailMessage} workcenterUUID={detailID} />
            </div>
        );

        const WorkCenterList = (
            <div className="cardContent">
                {/* <Feature/> */}
                {/* SimpleQForm */}
                {/* <StandardQForm
                  FormItem={RFormItem}
                  submit={this.handleQuery}
                /> */}
                <div style={{ marginBottom: 15 }}>
                    <CreateModal
                      FormItem={CFormItem}
                      submit={() => this.handleCreat( )}
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
        /* const bcList11 = [{
            title: '首页',
            href: '/',
          }, {
            title: '车间管理',
            href: '/',
          }, {
            title: '工作中心',
          }]; */

        const HeadAction = (
            // <span onClick={this.toggleRender.bind(this)} className="backup-button">
            //     <Icon type="rollback" />
            // </span>
            <Button onClick={this.toggleRender} type="primary" icon="rollback">返回</Button>
        );

        const HeadContent = (
            <div style={{ height: 100 }}>
                <Row type="flex" justify="start" align="middle">
                    <Col span={5}><img alt="这是图片" style={{ maxHeight: 100 }} src={urlBase + detailMessage.Image} /></Col>
                    <Col span={6}>
                        <div style={{
                                fontSize: 16,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',
                                height: 100,
 }}
                        >
                            <p>名称：<span>{detailMessage.Name}</span></p>
                            <p>编号：<span>{detailMessage.ID}</span></p>
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
                            <p>类型：<span>{detailMessage.TypeName}</span></p>
                            <p>所属车间：{detailMessage.WorkshopName}</p>
                            {/* <p>备注：{detailMessage.Note}</p> */}
                        </div>
                    </Col>
                </Row>
            </div>
        );

        // return showDetal?WorkCenterDetail:WorkCenterList;
        return (
            <PageHeaderLayout
            //   title={showDetal ? '工作中心详情' : '工作中心'}
              action={showDetal ? HeadAction : ''}
              content={showDetal ? HeadContent : ''}
              wrapperClassName="pageContent"
              BreadcrumbList={Breadcrumb.BCList}
            >
                    {/* <TWorkCenter/> */}
                    {showDetal ? WorkCenterDetail : WorkCenterList}
            </PageHeaderLayout>
        );
    }
}
