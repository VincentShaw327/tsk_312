import React, { Component } from 'react'
import { connect } from 'react-redux'
import { message, Menu, Icon, Row, Col, Card, Table, Divider,
    Form,DatePicker,Button,Select} from 'antd';
import { TPostData } from '../../utils/TAjax';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { MonthPicker, RangePicker } = DatePicker;
import ReactEcharts from 'echarts-for-react';
import PageHeaderLayout from '../../base/PageHeaderLayout';
import { Gauge } from '../../components/ant-design-pro/Charts';
import { NumGauge } from '../../components/Chart';
const FormItem = Form.Item;
import TableExport from 'tableexport';


@connect( ( state, props ) => {
    return {
        workcenter: state.workcenter,
        Breadcrumb:state.Breadcrumb,
    }
}, )
export default class TOEEAnalysis extends Component {
    constructor( props, context ) {
        super( props )
        this.state = {
            workshopList: [],
            workCenterList: []
        }
        // this.handleMenuClick.bind(this);
        // this.getWorkCenter.bind(this);
        this.url = '/api/TFactory/workshop';
        // this.workshopList =[];
        // this.getUserInfo = this.getUserInfo.bind(this)
    }

    componentWillMount() {
        const dat = {
            PageIndex: 0, //分页：页序号，不分页时设为0
            PageSize: -1, //分页：每页记录数，不分页时设为-1
            FactoryUUID: -1, //所属工厂UUID，不作为查询条件时取值设为-1
            TypeUUID: -1, //类型UUID，不作为查询条件时取值设为-1
            KeyWord: ""
        }
        TPostData( this.url, "ListActive", dat,
            ( res ) => {
                var list = [];
                console.log( "查询到车间列表", res );
                var data_list = res.obj.objectlist || [];
                data_list.forEach( ( item, index ) => {
                    list.push( {
                        key: index,
                        UUID:item.UUID,
                        Name: item.Name,
                        Number: item.ID
                    } )
                    this.setState( { workshopList: list } )
                } )
            },
            ( error ) => {
                message.info( error );
            }
        )

        this.getWorkCenter();
    }

    // 组件已经加载到dom中
    componentDidMount() {
        let csvDom=document.getElementById("OEETable")
        .getElementsByClassName("ant-table-body")[0];
        let btnWrap=document.getElementById("exportOEERep");
        const btn=TableExport(csvDom.children[0]);
        let children= btn.selectors[0].children[0];
        let childNodes=children.getElementsByTagName('button');
        childNodes[0].innerHTML="xlsx";
        childNodes[1].innerHTML="csv";
        childNodes[2].innerHTML="txt";
        // console.log("btn",children);
        // console.log("childNodes",childNodes);
        btnWrap.appendChild(children);
    }

    getWorkCenter(UUID){
        TPostData('/api/TProcess/workcenter', "ListActive",
            { 'PageIndex': 0, 'PageSize': -1,WorkshopUUID:UUID?UUID:-1, 'TypeUUID': -1, KeyWord:'' },
            ( res )=> {
                var list = [];
                var Ui_list = res.obj.objectlist || [];
                // console.log( '查询到工作中心列表', Ui_list );
                Ui_list.forEach(( item, index )=> {
                    list.push( {
                        key: index,
                        Name: item.Name,
                        ID: item.ID,
                        Time:"64%",
                        Performance:"67%",
                        Quality:"46%",
                        OEE:"53%",
                        // WorkshopName: item.WorkshopName,
                        // UUID: item.UUID,
                        // TypeUUID: item.TypeUUID.toString(),
                        // WorkshopUUID: item.WorkshopUUID.toString(),
                    } )
                    this.setState( { workCenterList: list } )
                } )
            },
            ( error )=> {
                message.info( error );
            }
        )
    }

    handleMenuClick({ item, key, keyPath }){
        console.log("点击菜单之后",item,key,keyPath);
        this.getWorkCenter(key);
    }

    GetRandomInt(max,min){
        return parseInt(Math.random() * (max - min) + min);
    }

    generate(){
        let list=[],
            periodStart='',
            periodEnd='';
        for (let i=0;i<24;i++) {
            periodEnd=i+1;
            periodStart=i<10?'0'+i:i;
            periodEnd=periodEnd<10?'0'+periodEnd:periodEnd;
            list.push(
                {
                    key:i,
                    Date:'',
                    Name:`工作中心${i}`,
                    ID:`workcenter-0${i}`,
                    Time:'67%',
                    Performance:'68%',
                    Quality:'88%',
                    OEE:'53%',
                    status:this.GetRandomInt(1,11)
                }
            )
        }
        return list;
    }

    render() {
        const {Breadcrumb}=this.props;
        const OEEData=this.generate();

        const columns = [
            {
                title: '日期',
                dataIndex: 'Date',
                width:200,
                key: 'Date',
            },
            {
                title: '工作中心',
                dataIndex: 'Name',
                key: 'name',
                // render: text => <a href="#">{text}</a>,
            },
            {
                title: '工作中心编号',
                dataIndex: 'ID',
                key: 'ID',
            },
            {
                title: '时间稼动率(%)',
                dataIndex: 'Time',
                key: 'Time',
            },
            {
                title: '性能稼动率(%)',
                dataIndex: 'Performance',
                key: 'Performance',
            },
            {
                title: '良品率(%)',
                dataIndex: 'Quality',
                key: 'Quality',
            },
            {
                title: 'OEE(%)',
                dataIndex: 'OEE',
                key: 'OEE',
            },
            /*{
                title: '操作',
                key: 'action',
                render: ( text, record ) => (
                    <span>
                      <a href="#">详情{record.name}</a>
                      <Divider type="vertical" />
                      <a href="#">删除</a>
                      <Divider type="vertical" />
                      <a href="#" className="ant-dropdown-link">
                        更多 <Icon type="down" />
                      </a>
                    </span>
                ),
            }*/
        ];

        const chartOne = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {
                feature: {
                    // restore: {},
                    // saveAsImage: {}
                }
            },
            series: [
                {
                    name: '业务指标',
                    type: 'gauge',
                    detail: {formatter:'{value}%'},
                    data: [{value: 56, name: '时间稼动率'}]
                }
            ]
        };

        const NGauge1={
            height:243,
            // height:103,
            percent:[{ value: 53 }],
            TArcData:{start:[ 0, 0.965 ],end:[ 99, 0.965 ]},
            polarData:{
                type:'polar',
                // startAngle:-35,
                startAngle:-9 / 8 * Math.PI,
                endAngle:1 / 8 * Math.PI,
                radius:0.85
            },
            polarTitle:{
                title:'OEE',
                textStyle:'font-size:1.75em;color:rgba(0,0,0,0.43);margin: 0'
            }
        }
        const NGauge2={
            height:180,
            percent:[{ value: 42 }],
            TopArcData:{start:[ 0, 0.965 ],end:[ 42, 0.965 ]},
            ArcWidth:12,
            pointerWidth:2,
            polarData:{
                type:'polar',
                // startAngle:-35,
                startAngle:-9 / 8 * Math.PI,
                endAngle:1 / 8 * Math.PI,
                radius:0.65
            },
            polarTitle:{
                title:'时间稼动率',
                textStyle:'font-size:1.25em;color:rgba(0,0,0,0.43);margin: 60px 0',
                // valueStyle:'font-size:1.25em;color:rgba(0,0,0,0.43);margin: 0'
            }
        }
        const NGauge3={
            height:180,
            percent:[{ value: 42 }],
            TopArcData:{start:[ 0, 0.965 ],end:[ 42, 0.965 ]},
            ArcWidth:12,
            polarData:{
                type:'polar',
                // startAngle:-35,
                startAngle:-9 / 8 * Math.PI,
                endAngle:1 / 8 * Math.PI,
                radius:0.65
            },
            polarTitle:{
                title:'性能稼动率',
                textStyle:'font-size:1.25em;color:rgba(0,0,0,0.43);margin: 40px 0',
            }
        }
        const NGauge4={
            height:180,
            percent:[{ value: 89 }],
            TopArcData:{start:[ 0, 0.965 ],end:[ 89, 0.965 ]},
            ArcWidth:12,
            polarData:{
                type:'polar',
                // startAngle:-35,
                startAngle:-9 / 8 * Math.PI,
                endAngle:1 / 8 * Math.PI,
                radius:0.65
            },
            polarTitle:{
                title:'良品率',
                textStyle:'font-size:1.25em;color:rgba(0,0,0,0.43);margin: 40px 0',
            }
        }


        return (
            <PageHeaderLayout title="OEE分析报表" wrapperClassName="pageContent" BreadcrumbList={Breadcrumb.BCList}>
                <div className="cardContent">
                    <Card style={{marginBottom:20}}>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={6}>
                                <div className="gutter-box"><span style={{ width: "40%" }}>车间:</span>
                                    <Select defaultValue="-1" style={{ width: "60%" }} onChange={this.handleChange}>
                                        <Option value="-1" key="all">全部</Option>
                                        {
                                            this.state.workshopList.map((item,index)=>{
                                                    return (<Option value={item.UUID} key={index}>{item.Name}</Option>)
                                            })
                                        }
                                    </Select>
                                </div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div className="gutter-box"><span style={{ width: "40%" }}>工作中心:</span>
                                    <Select defaultValue="-1" style={{ width: "60%" }} onChange={this.handleChange}>
                                        <Option value="-1" key="all">全部</Option>
                                        {
                                            this.state.workCenterList.map((item,index)=>{
                                                    return (<Option value={item.UUID} key={index}>{item.Name}</Option>)
                                            })
                                        }
                                    </Select>
                                </div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div className="gutter-box"><span style={{ width: "40%" }}>日期:</span>
                                    <DatePicker style={{ width: "60%" }} />
                                </div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div className="gutter-box">
                                    <Button type="primary" icon="search">查询</Button>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                    <div style={{border:'solid 0px #d7d9d8', marginBottom:30}}>
                        <Row>
                            <Col span={6} style={{border:'solid 0px'}}>
                                <NumGauge
                                    {...NGauge1}
                                />
                            </Col>
                            <Col span={6}>
                                <div style={{border:'solid 0px'}}>
                                    <NumGauge
                                        {...NGauge2}
                                    />
                                </div>
                            </Col>
                            <Col span={6}>
                                <NumGauge
                                    {...NGauge3}
                                />
                            </Col>
                            <Col span={6}>
                                <NumGauge
                                    {...NGauge4}
                                />
                                {
                                    /*
                                    <Gauge
                                          title="核销率"
                                          height={164}
                                          percent={87}
                                        />
                                    <ReactEcharts
                                        option={chartFour}
                                        // style={{height:200}}
                                        className='react_for_echarts' /> */
                                }
                            </Col>
                        </Row>
                    </div>
                    <div  style={{margin:'20px 0',overflow:'hidden'}}>
                        <Form className="ProReMenu" style={{float:'right'}} layout="inline">
                            <FormItem  label="导出">
                                <div
                                    className="exportMenuWrap"
                                    id="exportOEERep"
                                    style={{display:'flex'}}/>
                            </FormItem>
                        </Form>
                    </div>
                    <div id="OEETable">
                        <Table
                            columns={columns}
                            dataSource={OEEData}
                            bordered={true}
                            size="small"
                          />
                    </div>
                </div>
            </PageHeaderLayout>
        )
    }
}
