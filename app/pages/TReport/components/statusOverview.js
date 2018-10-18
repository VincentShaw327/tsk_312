import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Fold } from 'components/BCComponents/Charts';

export default class statusOverview extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            title: props.title,
        }
    }

    render() {
        const{workCenterList,data}=this.props;

        let option1 = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: [ '离线', '待机', '运行中', '报警' ]
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                /*axisLabel: {
                    formatter: function ( value, index ) {
                        let t = Math.floor( value / 60 );
                        let min = value % 60;
                        if ( min < 10 ) min = '0' + min;
                        if ( t < 10 ) t = '0' + t;
                        return `${t}:${min}`;
                    }
                }*/
            },
            yAxis: {
                type: 'category',
                // data: [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ]
                data:workCenterList
            },
            series: [
                {
                    name: '离线',
                    type: 'bar',
                    stack: '总量',
                    /*label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },*/
                    data: [ 182, 102, 131, 34, 90, 30, 20, 136, 86, 39, 29, 282, 122, 182, 212 ],
                },
                {
                    name: '待机',
                    type: 'bar',
                    stack: '总量',
                    /*label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },*/
                    data: [ 120, 132,254,234,34,34,52,24,152 ]
                },
                {
                    name: '运行中',
                    type: 'bar',
                    stack: '总量',
                    /*label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },*/
                    data: [ 630, 680, 680, 680,456,345,345,482 ]
                },
                {
                    name: '报警',
                    type: 'bar',
                    stack: '总量',
                    /*label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },*/
                    data: [34,53,13,65,123,24,52,52,14,23]
                },
          ]
        };

        const salesData = [
            { 'State': 'ST-01', '离线时间': 613, '待机时间': 120, '运行时间': 632 ,'告警时间':55},
            { 'State': 'ST-02', '离线时间': 646, '待机时间': 157, '运行时间': 589 ,'告警时间':24},
            { 'State': 'ST-03', '离线时间': 825, '待机时间': 147, '运行时间': 448 ,'告警时间':35},
            { 'State': 'ST-04', '离线时间': 623, '待机时间': 157, '运行时间': 594 ,'告警时间':25},
            { 'State': 'ST-05', '离线时间': 634, '待机时间': 132, '运行时间': 680,'告警时间':25 },
            { 'State': 'ST-06', '离线时间': 623, '待机时间': 123, '运行时间': 687,'告警时间':36 },
            { 'State': 'ST-07', '离线时间': 623, '待机时间': 124, '运行时间': 743,'告警时间':57 },
            { 'State': 'ST-08', '离线时间': 734, '待机时间': 146, '运行时间': 715,'告警时间':73 },
            { 'State': 'ST-09', '离线时间': 836, '待机时间': 168, '运行时间': 664,'告警时间':36 },
            { 'State': 'ST-10', '离线时间': 1440, '待机时间': 0, '运行时间': 0,'告警时间':0 }
          ];
        salesData.reverse();
        const stateType=['离线时间','待机时间','运行时间','告警时间'];
        // const stateType=['离线时间','待机时间','运行时间','告警时间'];
        let colors=['#6a6a6a','#0acb2e','#120dee','#e31111'];
        return (
            <div>
              {/* <ReactEcharts
                  option={option1}
                  style={{height:550}}
                  className='react_for_echarts' /> */}
              <Fold
                height={800}
                title="设备状态总时间统计"
                data={salesData}
                // data={data}
                // colors={colors}
                fields={stateType}
              />
             </div>
        )
    }
}
