
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory, Link } from 'react-router'
import {Row,Col, Table, Tabs,Menu, Icon,Card, Badge, Dropdown,message,Divider,Popconfirm } from 'antd';
import { fetchMoldList } from 'actions/mold';
import { TPostData ,urlBase} from 'utils/TAjax';
import SimpleTable from 'components/TTable/SimpleTable';
import { CreateModal,UpdateModal } from 'components/TModal';
import {SimpleQForm,StandardQForm } from 'components/TForm';
import PageHeaderLayout from '../../base/PageHeaderLayout';
import moldPic from  'images/assets/mold01.jpg'
import Quality from './chart/Quality'
const TabPane = Tabs.TabPane;


@connect( ( state, props ) => {
    console.log( 'state', state )
    return {
        Breadcrumb:state.Breadcrumb,
        moldList: state.moldList,
    }
}, )
export default class MouldDetail extends Component {

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
    }

    componentWillMount() {
        // this.getMoldModelList();
        // this.getTableList();
        // this.props.dispatch( fetchMoldList( { current: 1 }, ( respose ) => {} ) )
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

    callback=(key)=> {
      console.log(key);
    }

    render() {
        // let Feature = this.feature;
        const {
            MoldModelList,
            tableDataList,
            // loading,
            current,
            // total,
            pageSize,
            updateFromItem,
            UModalShow
        } = this.state;
        const {Breadcrumb}=this.props;
        const { list, total, loading } = this.props.moldList;
        /*let Data={
            // list:tableDataList,
            list:list,
            pagination:{total,current,pageSize}
        };*/

        const Tcolumns= [
            {
                title: '工单号',
                dataIndex: 'workOrder',
                type: 'string'
            },
            {
                title: '日期',
                dataIndex: 'date',
                type: 'string'
            },
            {
                title: '生产模次',
                dataIndex: 'freqency',
                type: 'string'
            },
            {
                // title: '规格尺寸（材料/尺寸/步距）',
                title: '累积模次',
                dataIndex: 'accumulation',
                type: 'string'
            },
            /*{
                // title: '规格尺寸（材料/尺寸/步距）',
                title: '额定频次',
                dataIndex: 'ModelSize',
                type: 'string'
            },
            {
                title: '标签',
                dataIndex: 'Label',
                type: 'string'
            }*/
        ];

        const Tcolumns2= [
            {
                title: '日期',
                dataIndex: 'date',
                width:150
            },
            {
                title: '内容',
                dataIndex: 'content',
                type: 'string'
            },
            {
                title: '负责人',
                dataIndex: 'charger',
                width:150
            },
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

        const bcList = [{
            title:"首页",
            href: '/',
            }, {
            title: '模具列表',
            href: '/',
            }, {
            title: '物料类别',
        }];

        let inspect=[],inspect2=[];
        for (var i = 0; i < 12; i++) {
            inspect.push({
                workOrder:'T20181025_37893',
                date:'2018/10/23',
                freqency:345002,
                accumulation:3456603
            });
            inspect2.push({
                date:'2018/10/23',
                content:'',
                charger:'-'
            })
        }

        let Data={
            list:inspect,
        };
        let Data2={
            list:inspect2,
        };


        return (
            <div>
                {/* <SimpleTable
                    size="middle"
                    loading={loading}
                    data={Data}
                    columns={Tcolumns}
                    isHaveSelect={false}
                    onChange={this.handleTableChange}
                /> */}
                <Card>
                    <Row>
                        <Col span={6}>
                            <img
                                // width="300"
                                // src={urlBase+e}
                                style={{width:'100%'}}
                                src={moldPic}
                            />
                        </Col>
                        <Col span={6}>
                            <div style={{paddingTop:20}}>
                                <p>名称：磁轭侧板</p>
                                <p>架位号：A01-01-6</p>
                                <p>编号：980.001.02</p>
                                <p>验收日期：2017.08.17</p>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div style={{paddingTop:20}}>
                                <p>尺寸：-</p>
                                <p>标签：-</p>
                                <p>厂家：松下</p>
                                <p>穴数：8</p>
                            </div>
                        </Col>
                        <Col span={6}></Col>
                    </Row>
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                      <TabPane tab="模具图纸" key="1">
                          这是图纸
                      </TabPane>
                      <TabPane tab="生产履历与寿命" key="2">
                          <Row>
                              <Col span={16}>
                                  <SimpleTable
                                      size="small"
                                      loading={false}
                                      data={Data}
                                      columns={Tcolumns}
                                      isHaveSelect={false}
                                      // onChange={this.handleTableChange}
                                  />
                              </Col>
                              <Col span={8}>
                                  <div style={{paddingLeft:35}}>
                                      <p>总累积模次：24508</p>
                                      <p>总设计模次：30000</p>
                                      <p>预警模次：26000</p>
                                      <p>日均模次：2200</p>
                                      <p>剩余寿命：63天</p>
                                  </div>
                              </Col>
                          </Row>
                      </TabPane>
                      <TabPane tab="维护保养记录" key="3">
                          <SimpleTable
                              size="small"
                              loading={false}
                              data={Data2}
                              columns={Tcolumns2}
                              isHaveSelect={false}
                              // onChange={this.handleTableChange}
                          />
                      </TabPane>
                      <TabPane tab="等级评估" key="4">
                      </TabPane>
                      <TabPane tab="品质合格率分析" key="5">
                          <Quality />
                      </TabPane>
                    </Tabs>
                </Card>

            </div>
        )
    }
}
