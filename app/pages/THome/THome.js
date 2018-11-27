import React, {Component} from 'react';
import {
    List,
    Card,
    message,
    Tooltip,
    Icon,
    Tabs,
    DatePicker,
    Row,
    Col,
    Divider
} from 'antd';
// import ReactEcharts from 'echarts-for-react';
import styles from "./THome.less";
const TabPane = Tabs.TabPane;
import moment from 'moment';
// import G2 from '@antv/g2';
const {MonthPicker, RangePicker} = DatePicker;
import {
    yuan,
    Bar,
    Pie,
    Gauge,
    Radar,
    MiniBar,
    MiniArea,
    MiniProgress,
    ChartCard,
    Field,
    WaterWave,
    TagCloud,
    TimelineChart,
} from 'components/ant-design-pro/Charts';
import Trend from 'components/ant-design-pro/Trend';
import numeral from 'numeral';
import PageHeaderLayout from '../../base/PageHeaderLayout';

// import {NumberCard} from "../components/ChartCards";

export default class THome extends Component {
    // 初始化页面常量 绑定事件方法
    constructor(props, context) {
        super(props)
        this.state = {
            key: 0,
            option: {}
        }
        this.orderRenderData = {};
    }

    componentWillMount() {}

    // 组件已经加载到dom中
    componentDidMount() {

        // var plotHeight = (window.innerHeight - 180) / 4;
        var plotHeight =38,
            chartWidth=40;
        var c0Types = [ 'interval','line','area' ];
        /*var c0Data = [
            [
                16, 17, 18, 19, 20, 21, 21, 22, 23, 22,
                19, 20, 20, 21
            ],
            [
                 936, 968, 1025, 999, 998, 1014, 1017, 1010, 1010, 1007,
                 1004, 988, 1005, 958, 953
            ],
            [
                71, 70, 69, 68, 65, 60, 55, 55, 50, 52,
                73, 72, 72, 71, 68, 63, 57, 58, 53, 55,
                63, 59, 61, 64, 58, 53, 48, 48, 45, 45,
                63, 64, 63, 67, 58, 56, 53, 59, 51, 54
            ]
        ];
        c0Data.forEach(function (values, index) {
            var data = values.map(function (value, i) {
                return {
                    x: '' + i,
                    y: value
                };
            });
            var chart = new G2.Chart({
                container: 'miniChart' + index,
                forceFit: true,
                height: plotHeight,
                width:chartWidth,
                padding: 0
            });
            chart.source(data);
            chart.axis(false);
            chart.legend(false);
            chart.tooltip({
                showTitle: false,
            });
            chart[c0Types[index]]()
                .position('x*y');
            chart.render();
        });*/
        /**************************************/
        const chartOption = {
            xAxis: {
                type: 'category',
                data: [
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thu',
                    'Fri',
                    'Sat',
                    'Sun'
                ]
            },
            yAxis: {
                type: 'value',
                // positon:'right',
                offset: 0
            },
            series: [
                {
                    data: [
                        120,
                        200,
                        150,
                        80,
                        70,
                        110,
                        130
                    ],
                    type: 'bar'
                }
            ]
        };
        this.setState({option: chartOption})
        var option = {
            xAxis: {
                type: 'category',
                data: [
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thu',
                    'Fri',
                    'Sat',
                    'Sun'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [
                        120,
                        200,
                        150,
                        80,
                        70,
                        110,
                        130
                    ],
                    type: 'bar'
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        // myChart.setOption(option);
        // window.onresize=()=>{console.log('onresize');}
        /**************************************/
        const data = [
            {
                year: '1951 年',
                sales: 38
            }, {
                year: '1952 年',
                sales: 52
            }, {
                year: '1956 年',
                sales: 61
            }, {
                year: '1957 年',
                sales: 145
            }, {
                year: '1958 年',
                sales: 48
            }, {
                year: '1959 年',
                sales: 38
            }, {
                year: '1960 年',
                sales: 38
            }, {
                year: '1962 年',
                sales: 38
            }
        ];
        /*const chart = new G2.Chart({
            container: 'tend-charts', forceFit: true,
            // height: window.innerHeight
        });
        chart.source(data);
        chart.scale('sales', {tickInterval: 20});
        chart.interval().position('year*sales');
        chart.render();*/
    }

    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({[type]: key});
    }

    render() {

        const bcList = [ 
            {
                title: "首页",
                href: '/',
            }
        ];
          
        return (
            <PageHeaderLayout
                // title={"首页"}
                // action={showDetal?HeadAction:''}
                // content={showDetal?HeadContent:''}
                wrapperClassName="pageContent"
                BreadcrumbList={bcList}>
                <div >
                    <Row>
                        <Col span={6}>
                            <ChartCard
                                title="销售额"
                                action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                                total={yuan(126560)}
                                footer={<Field label="日均销售额" value={numeral(12423).format('0,0')} />}
                                contentHeight={46}
                                >
                                <span>
                                周同比
                                <Trend flag="up" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>12%</Trend>
                                </span>
                                <span style={{ marginLeft: 16 }}>
                                日环比
                                <Trend flag="down" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>11%</Trend>
                                </span>
                            </ChartCard>
                        </Col>
                        <Col span={6}>
                        <ChartCard
                            title="移动指标"
                            avatar={
                            <img
                                style={{ width: 56, height: 56 }}
                                src="https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png"
                                alt="indicator"
                            />
                            }
                            action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                            total={yuan(126560)}
                            footer={<Field label="日均销售额" value={numeral(12423).format('0,0')} />}
                        />
                        </Col>
                        <Col span={6}>
                        <ChartCard
                            title="移动指标"
                            avatar={(
                            <img
                                alt="indicator"
                                style={{ width: 56, height: 56 }}
                                src="https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png"
                            />
                            )}
                            action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                            total={yuan(126560)}
                        />
                        </Col>
                    </Row>
                </div>
            </PageHeaderLayout>
            )
    }
}
