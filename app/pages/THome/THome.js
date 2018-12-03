import React, { Component } from 'react';
import {
    Tooltip,
    Icon,
    Row,
    Col,
    Card,
    Table,
} from 'antd';
// import ReactEcharts from 'echarts-for-react';
// import G2 from '@antv/g2';
import {
    yuan,
    ChartCard,
    Field,
    // Pie,
    MiniArea,
} from 'components/ant-design-pro/Charts';
import NumberInfo from 'components/ant-design-pro/NumberInfo';
import Trend from 'components/ant-design-pro/Trend';
import { Pie } from 'components/BCComponents/Charts'
import moment from 'moment';
import numeral from 'numeral';
import { Barsort, Areanull } from 'components/Chart'
import PageHeaderLayout from '../../base/PageHeaderLayout';
import timpic from '../../images/icon/untilize.png'
import totalstoping from '../../images/icon/stop.png'
// import {NumberCard} from "../components/ChartCards";

export default class THome extends Component {
    // 初始化页面常量 绑定事件方法
    constructor( props, context ) {
        super( props )
        this.state = {
        }
        this.orderRenderData = {};
    }

    componentWillMount() {}

    // 组件已经加载到dom中
    componentDidMount() {
        // var plotHeight = (window.innerHeight - 180) / 4;
        /* var c0Data = [
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
        }); */
        /** *********************************** */
        /* const chartOption = {
            xAxis: {
                type: 'category',
                data: [
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thu',
                    'Fri',
                    'Sat',
                    'Sun',
                ],
            },
            yAxis: {
                type: 'value',
                // positon:'right',
                offset: 0,
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
                        130,
                    ],
                    type: 'bar',
                },
            ],
        }; */
        // this.setState( { option: chartOption } );
        /* const option = {
            xAxis: {
                type: 'category',
                data: [
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thu',
                    'Fri',
                    'Sat',
                    'Sun',
                ],
            },
            yAxis: {
                type: 'value',
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
                        130,
                    ],
                    type: 'bar',
                },
            ],
        }; */
        // 使用刚指定的配置项和数据显示图表。
        // myChart.setOption(option);
        // window.onresize=()=>{console.log('onresize');}
        /** *********************************** */
        /* const data = [
            {
                year: '1951 年',
                sales: 38,
            }, {
                year: '1952 年',
                sales: 52,
            }, {
                year: '1956 年',
                sales: 61,
            }, {
                year: '1957 年',
                sales: 145,
            }, {
                year: '1958 年',
                sales: 48,
            }, {
                year: '1959 年',
                sales: 38,
            }, {
                year: '1960 年',
                sales: 38,
            }, {
                year: '1962 年',
                sales: 38,
            },
        ]; */
        /* const chart = new G2.Chart({
            container: 'tend-charts', forceFit: true,
            // height: window.innerHeight
        });
        chart.source(data);
        chart.scale('sales', {tickInterval: 20});
        chart.interval().position('year*sales');
        chart.render(); */
    }

    onTabChange = ( key, type ) => {
        // console.log( key, type );
        this.setState( { [type]: key } );
    }

    render() {
        const bcList = [
            {
                title: '首页',
                href: '/',
            },
        ];

        const barSortData = [
            {
              key: '机台1',
              value: 64.2,
            },
            {
              key: '机台2',
              value: 56.2,
            },
            {
              key: '机台3',
              value: 78.4,
            },
            {
              key: '机台4',
              value: 88.2,
            },
            {
              key: '机台5',
              value: 93.1,
            },
            {
              key: '机台6',
              value: 93.1,
            },
            {
              key: '机台7',
              value: 93.1,
            },
            {
              key: '机台8',
              value: 93.1,
            },
            {
              key: '机台9',
              value: 93.1,
            },
        ];

        const salesPieData = [
            {
              x: '家用电器',
              y: 4544,
            },
            {
              x: '食用酒水',
              y: 3321,
            },
            {
              x: '个护健康',
              y: 3113,
            },
            {
              x: '服饰箱包',
              y: 2341,
            },
            {
              x: '母婴产品',
              y: 1231,
            },
            {
              x: '其他',
              y: 1231,
            },
        ];
        const visitData = [];
        const beginDay = new Date().getTime();
        for ( let i = 0; i < 20; i += 1 ) {
            visitData.push( {
                x: moment( new Date( beginDay + ( 1000 * 60 * 60 * 24 * i ) ) ).format( 'YYYY-MM-DD' ),
                y: Math.floor( Math.random() * 100 ) + 10,
            } );
        }

        const columns1 = [
          {
            title: '排名',
            dataIndex: 'key',
          }, {
            title: '机台名称',
            dataIndex: 'name',
          }, {
            title: '时间利用率',
            dataIndex: 'UtilRate',
          }, {
            title: '停机次数',
            dataIndex: 'shutdownFreq',
          }, {
            title: '周涨幅',
            dataIndex: 'growth',
            },
        ];

        const data1 = [
          {
            key: '1',
            name: 'John Brown',
            UtilRate: 32,
            shutdownFreq: 43,
            growth: 1.34,
          }, {
            key: '2',
            name: 'Jim Green',
            UtilRate: 42,
            shutdownFreq: 43,
            growth: 1.34,
          }, {
            key: '3',
            name: 'Joe Black',
            UtilRate: 32,
            shutdownFreq: 43,
            growth: 1.34,
          }, {
            key: '4',
            name: 'Disabled User',
            UtilRate: 99,
            shutdownFreq: 43,
            growth: 1.34,
            },
        ];

        const columns2 = [
          {
            title: '排名',
            dataIndex: 'key',
          }, {
            title: '产品名称',
            dataIndex: 'name',
          }, {
            title: '原料利用率',
            dataIndex: 'UtilRate',
          }, {
            title: '周涨幅',
            dataIndex: 'growth',
            },
        ];

        const data2 = [
          {
            key: '1',
            name: 'John Brown',
            UtilRate: 32,
            shutdownFreq: 43,
            growth: 1.34,
          }, {
            key: '2',
            name: 'Jim Green',
            UtilRate: 42,
            shutdownFreq: 43,
            growth: 1.34,
          }, {
            key: '3',
            name: 'Joe Black',
            UtilRate: 32,
            shutdownFreq: 43,
            growth: 1.34,
          }, {
            key: '4',
            name: 'Disabled User',
            UtilRate: 99,
            shutdownFreq: 43,
            growth: 1.34,
            },
        ];

        return (
            <PageHeaderLayout
              wrapperClassName="pageContent"
              BreadcrumbList={bcList}
            >
                <div >
                    <Row gutter={16}>
                        <Col className="gutter-row" span={6}>
                            <ChartCard
                              title="车间机台总利用率"
                              avatar={
                                    <img
                                      style={{ width: 56, height: 56 }}
                                      src={timpic}
                                      alt="indicator"
                                    />
                                    // <i className="anticon-custom anticon-mach-utilization" />
                                }
                              action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                              // total={yuan( 126560 )}
                              total={( <span>68%</span> )}
                              footer={<Field label="日均总利用率" value={numeral( 12423 ).format( '0,0' )} />}
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
                        <Col className="gutter-row" span={6}>
                            <ChartCard
                              title="车间机台总停机数"
                              avatar={
                                        <img
                                          style={{ width: 56, height: 56 }}
                                          src={totalstoping}
                                          alt="indicator"
                                        />
                                    }
                              action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                                // total={yuan( 126560 )}
                              total={( <span>17次</span> )}
                              footer={<Field label="日均停机次数" value={numeral( 12423 ).format( '0,0' )} />}
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
                        <Col className="gutter-row" span={6}>
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
                              total={yuan( 126560 )}
                            />
                        </Col>
                    </Row>
                    <Card title="当天产量趋势及分部" style={{ marginTop: 15 }}>
                        <Row gutter={16} style={{ marginTop: 15 }}>
                            <Col className="gutter-row" span={18}>
                                <Areanull />
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <Pie
                                  hasLegend
                                  title="销售额"
                                  subTitle="销售额"
                                  total={yuan( salesPieData.reduce( ( pre, now ) => now.y + pre, 0 ) )}
                                  data={salesPieData}
                                  forceFit={false}
                                  height={190}
                                  width={230}
                                  valueFormat={val => yuan( val )}
                                  padding={[0, 0, 0, 0]}
                                />
                            </Col>
                        </Row>
                    </Card>
                    <Row gutter={16} style={{ marginTop: 15 }}>
                        <Col gutter={16} span={12}>
                            <Card title="当天机台利用率">
                                <NumberInfo
                                  subTitle={<span>本周访问</span>}
                                  total={numeral( 12321 ).format( '0,0' )}
                                  status="up"
                                  subTotal={17.1}
                                />
                                <MiniArea
                                  line
                                  color="#cceafe"
                                  height={45}
                                  data={visitData}
                                />
                                <Table
                                  style={{ marginTop: 15 }}
                                  size="small"
                                  columns={columns1}
                                  dataSource={data1}
                                />
                            </Card>
                            <Card title="本周原料利用率" style={{ marginTop: 15 }}>
                                <NumberInfo
                                  subTitle={<span>本周原料综合利用率变化趋势</span>}
                                  total={numeral( 12321 ).format( '0,0' )}
                                  status="up"
                                  subTotal={17.1}
                                />
                                <MiniArea
                                  line
                                  color="#cceafe"
                                  height={45}
                                  data={visitData}
                                />
                                <Table
                                  style={{ marginTop: 15 }}
                                  size="small"
                                  columns={columns2}
                                  dataSource={data2}
                                />
                            </Card>
                        </Col>
                        <Col gutter={16} span={12} >
                            <Card title="瞬时机台利用率">
                                <Barsort height={800} data={barSortData} />
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: 15 }}>
                        <Col className="gutter-row" span={12}>
                            <Card>
                                <Pie
                                  hasLegend
                                  title="销售额"
                                  subTitle="销售额"
                                  total={yuan( salesPieData.reduce( ( pre, now ) => now.y + pre, 0 ) )}
                                  data={salesPieData}
                                  valueFormat={val => yuan( val )}
                                  height={280}
                                  padding={[0, 20, 0, 0]}
                                />
                            </Card>
                        </Col>
                        <Col className="gutter-row" span={12} />
                    </Row>
                </div>
            </PageHeaderLayout>
        )
    }
}
