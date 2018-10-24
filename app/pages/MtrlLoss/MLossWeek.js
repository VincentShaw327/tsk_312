import React, {Component} from 'react';
import { connect } from 'react-redux'
import {
    Button,
    List,
    Card,
    Radio,
    Row,
    Col
} from 'antd';
import { Bar } from 'components/ant-design-pro/Charts';
import SimpleTable from 'components/TTable/SimpleTable';
import {DropDownForm,StandardQForm } from 'components/TForm';
import BarChart from './component/BarChart'
import PageHeaderLayout from '../../base/PageHeaderLayout';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

@connect( ( state, props ) => {
    console.log( 'state', state )
    return {
        Breadcrumb:state.Breadcrumb,
        device: state.device,
    }
}, )
export default class SimpleQForm extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentWillMount() {}

    render() {

      let salesData = [],
          tableData=[];
      for (let i = 0; i < 12; i += 1) {
        salesData.push({
          x: `${i + 1}月`,
          y: Math.floor(Math.random() * 100),
        });
        tableData.push({
          key:i,
          workorder:`P20181023_${2345+i}`,
          date:'2018.09',
          product:"产品"+i,
          moldID:'551.10703.01',
          stampSpeed:'79/min',
          productWeight:269,
          materialWeight:533,
          thrDissRate:'57%',
          actDissRate:'41%',
          workCenter:'ST-'+i
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
          {
              title: '产品',
              dataIndex: 'product',
              type: 'string'
          },
          {
              title: '模具编号',
              dataIndex: 'moldID',
              type: 'string'
          },
          {
              title: '工作中心',
              dataIndex: 'workCenter',
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
          },*/
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
          }
      ];

      const DropQFormItem= [
          {
              name: 'Number',
              label: '产品',
              type: 'string',
              placeholder: '请输入派工产量',
              rules: [{required: true,message: '请输入派工产量'}]
          },
          {
              name: 'WorkstationUUID',
              label: '模具',
              type: 'string',
              rules: [{required: true,message: '请选择工作中心'}]
          },
          {
              name: 'Date',
              label: '日期',
              type: 'rangeDate',
              placeholder: '请输入计划产量'
          }
      ];

      // <a href="#"></a>
      const bcList = [{
          title:"首页",
          href: '/',
          }, {
          title: '原料利用率分析',
          href: '/',
          }, {
          title: '材料利用率周期汇总',
      }];

      const extra=(
        <div style={{width:'100%'}}>
          <Row>
            <Col span={20}>
              <RadioGroup defaultValue="all">
                <RadioButton value="progress">月</RadioButton>
                <RadioButton value="waiting">周</RadioButton>
              </RadioGroup>
            </Col>
            <Col span={4}>
              {/* <DropDownForm FormItem={DropQFormItem}></DropDownForm> */}
            </Col>
          </Row>
        </div>
      );


        return (
          <PageHeaderLayout
              title="材料利用率周期汇总"
              // action={showDetal?HeadAction:''}
              // content={showDetal?HeadContent:''}
              wrapperClassName="pageContent"
              BreadcrumbList={bcList}
              >
                <div>
                  <Card
                    extra={<DropDownForm FormItem={DropQFormItem}></DropDownForm>}
                    title={extra}
                    >
                    {/* <Bar
                      height={250}
                      title="损耗趋势"
                      data={salesData}
                    /> */}
                    <BarChart />
                    {/* <div style={{margin:'25px 0'}}></div> */}
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
