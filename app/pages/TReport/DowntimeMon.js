import React, {Component} from 'react';
import {
    Button,
    List,
    Radio,
    Card
} from 'antd';
import { connect } from 'react-redux'
import {Polyline} from 'components/Chart'
import {SimpleQForm,StandardQForm } from 'components/TForm';
import PageHeaderLayout from '../../base/PageHeaderLayout';
import SimpleTable from 'components/TTable/SimpleTable';


@connect( ( state, props ) => {
    console.log( 'state', state )
    return {
        Breadcrumb:state.Breadcrumb,
        punchFreq: state.punchFreq,
    }
}, )
export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentWillMount() {}

    handleChange=()=>{

    }

    render() {
      const {Breadcrumb}=this.props;
      //查询的数据项
      const RFormItem= [
          {
              name: 'keyWord',
              label: '搜索内容',
              type: 'string',
              placeholder: '请输入要搜索的内容'
          }, {
              name: 'TypeUUID',
              label: '工作中心',
              type: 'select',
              hasAllButtom: true,
              defaultValue: '-1',
              width: 150,
              options:[]
          }, {
              name: 'ModelUUID',
              label: '产品型号',
              type: 'select',
              hasAllButtom: true,
              defaultValue: '-1',
              width: 200,
              options:[]
          }
      ];

      const data = [
        {
          month: '2018/01',
          车间总停机次数: 7.0,
          设备一: 3.9
        }, {
          month: '2018/02',
          车间总停机次数: 6.9,
          设备一: 4.2
        }, {
          month: '2018/03',
          车间总停机次数: 9.5,
          设备一: 5.7
        }, {
          month: '2018/04',
          车间总停机次数: 14.5,
          设备一: 8.5
        }, {
          month: '2018/05',
          车间总停机次数: 18.4,
          设备一: 11.9
        }, {
          month: '2018/06',
          车间总停机次数: 21.5,
          设备一: 15.2
        }, {
          month: '2018/07',
          车间总停机次数: 25.2,
          设备一: 17.0
        }, {
          month: '2018/08',
          车间总停机次数: 26.5,
          设备一: 16.6
        }, {
          month: '2018/09',
          车间总停机次数: 23.3,
          设备一: 14.2
        }, {
          month: '2018/10',
          车间总停机次数: 18.3,
          设备一: 10.3
        }, {
          month: '2018/11',
          车间总停机次数: 13.9,
          设备一: 6.6
        }, {
          month: '2018/12',
          车间总停机次数: 9.6,
          设备一: 4.8
        }
      ];

      let salesData = [],
          tableData=[];
      for (let i = 1; i < 12; i += 1) {
        salesData.push({
          x: `${i + 1}月`,
          y: Math.floor(Math.random() * 100),
        });
        tableData.push({
          key:i,
          workorder:`P20181023_${2345+i}`,
          date:i<=9?`2018.0${i}`:`2018.${i}`,
          product:"引弧片",
          moldID:'551.10703.01',
          stampSpeed:'79/min',
          productWeight:269,
          materialWeight:533,
          thrDissRate:'57%',
          actDissRate:'41%',
          workCenter:'ST-06',
          stopTimes:Math.floor(Math.random() * 100),
          ARunTime:"14天07小时23分",
          TRunTime:"23天16小时0分",
          UtilizationRate:'46%'
        })
      }

      let Data={
          // list:tableDataList,
          list:tableData,
          // pagination:{total,current,pageSize}
      };
      //table表格表头参数
      const Tcolumns=[
          {
              title: '序号',
              dataIndex: 'key',
              type: 'string'
          },
          /*{
              title: '工单号',
              dataIndex: 'workorder',
              render:(str)=>{
                return <a>{str}</a>
              }
          },*/
          {
              title: '日期',
              dataIndex: 'date',
              type: 'string'
          },
          /*{
              title: '产品',
              dataIndex: 'product',
              type: 'string'
          },
          {
              title: '模具编号',
              dataIndex: 'moldID',
              type: 'string'
          },*/
          {
              title: '机台',
              dataIndex: 'workCenter',
              type: 'string'
          },
          {
              title: '停机次数',
              dataIndex: 'stopTimes',
              type: 'string'
          },
          {
              title: '实际开机时间',
              dataIndex: 'ARunTime',
              type: 'string'
          },
          {
              title: '理论开机时间',
              dataIndex: 'TRunTime',
              type: 'string'
          },
          {
              title: '机台利用率',
              dataIndex: 'UtilizationRate',
              type: 'string'
          },
          /*{
              title: '冲速设定',
              dataIndex: 'stampSpeed',
              type: 'string'
          },*/
          /*{
              title: '产品重量(kg)',
              dataIndex: 'productWeight',
              type: 'string'
          },
          {
              title: '原材料重量(kg)',
              dataIndex: 'materialWeight',
              type: 'string'
          },
          {
              title: '理论耗损率(%)',
              dataIndex: 'thrDissRate',
              type: 'string',
              // render:(str,item)=><Progress  percent={str} />
          },
          {
              title: '实际耗损率(%)',
              dataIndex: 'actDissRate',
              type: 'string',
              // render:(str,item)=><Progress  percent={str} />
          }*/
      ];


        // className="cardContent"
        return (
          <PageHeaderLayout title="停机分析" wrapperClassName="pageContent"
            BreadcrumbList={Breadcrumb.BCList}>
              <div >
                <Radio.Group  onChange={this.handleChange}>
                  <Radio.Button value="large">月度停机分析</Radio.Button>
                  <Radio.Button value="default">周停机分析</Radio.Button>
                  {/* <Radio.Button value="small">单日停机分析</Radio.Button> */}
                </Radio.Group>
                <div style={{margin:20}}></div>
                {/* <StandardQForm
                    FormItem={RFormItem}
                    submit={this.handleQuery}
                /> */}
                <Card>
                  <Polyline
                    height={250}
                    title="趋势"
                    data={data}
                  />
                  <SimpleTable
                      size="small"
                      // border={true}
                      loading={false}
                      data={Data}
                      columns={Tcolumns}
                      // isHaveSelect={false}
                      // onChange={this.handleTableChange}
                  />
                </Card>

              </div>
          </PageHeaderLayout>
        )
    }
}
