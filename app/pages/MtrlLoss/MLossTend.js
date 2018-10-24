import React, {Component} from 'react';
import { connect } from 'react-redux'
import {
    Button,
    List,
    Card
} from 'antd';
import { Bar } from 'components/ant-design-pro/Charts';
import SimpleTable from 'components/TTable/SimpleTable';
import {DropDownForm,StandardQForm } from 'components/TForm';
import Barfold from './component/Barfold'
import PageHeaderLayout from '../../base/PageHeaderLayout';


@connect( ( state, props ) => {
    console.log( 'state', state )
    return {
        Breadcrumb:state.Breadcrumb,
        MtrlLossCollate: state.MtrlLossCollate,
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
      const {Breadcrumb}=this.props;

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
          date:'10.23',
          product:"引弧片",
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
          {
              title: '工单号',
              dataIndex: 'workorder',
              render:(str)=>{
                return <a>{str}</a>
              }
          },
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
          {
              title: '冲速设定',
              dataIndex: 'stampSpeed',
              type: 'string'
          },
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
        return (
          <PageHeaderLayout title="材料利用率分析" wrapperClassName="pageContent"
            BreadcrumbList={Breadcrumb.BCList}>
            <div>
              <Card
                extra={<DropDownForm FormItem={DropQFormItem}></DropDownForm>}
                title="单产品材料利用率分析"
                >
                {/* <Bar
                  height={250}
                  title="损耗趋势"
                  data={salesData}
                /> */}
                <Barfold />
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
