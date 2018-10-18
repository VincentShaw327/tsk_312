import React, {Component} from 'react';
import {
    Button,
    List,
    Radio
} from 'antd';
import { connect } from 'react-redux'
import {Polyline} from 'components/Chart'
import {SimpleQForm,StandardQForm } from 'components/TForm';
import PageHeaderLayout from '../../base/PageHeaderLayout';


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
          month: 'Jan',
          车间总停机次数: 7.0,
          设备一: 3.9
        }, {
          month: 'Feb',
          车间总停机次数: 6.9,
          设备一: 4.2
        }, {
          month: 'Mar',
          车间总停机次数: 9.5,
          设备一: 5.7
        }, {
          month: 'Apr',
          车间总停机次数: 14.5,
          设备一: 8.5
        }, {
          month: 'May',
          车间总停机次数: 18.4,
          设备一: 11.9
        }, {
          month: 'Jun',
          车间总停机次数: 21.5,
          设备一: 15.2
        }, {
          month: 'Jul',
          车间总停机次数: 25.2,
          设备一: 17.0
        }, {
          month: 'Aug',
          车间总停机次数: 26.5,
          设备一: 16.6
        }, {
          month: 'Sep',
          车间总停机次数: 23.3,
          设备一: 14.2
        }, {
          month: 'Oct',
          车间总停机次数: 18.3,
          设备一: 10.3
        }, {
          month: 'Nov',
          车间总停机次数: 13.9,
          设备一: 6.6
        }, {
          month: 'Dec',
          车间总停机次数: 9.6,
          设备一: 4.8
        }
      ];


        return (
          <PageHeaderLayout title="停机分析" wrapperClassName="pageContent"
            BreadcrumbList={Breadcrumb.BCList}>
              <div className="cardContent">
                <Radio.Group  onChange={this.handleChange}>
                  <Radio.Button value="large">月度停机分析</Radio.Button>
                  <Radio.Button value="default">一周停机分析</Radio.Button>
                  <Radio.Button value="small">单日停机分析</Radio.Button>
                </Radio.Group>
                <div style={{margin:20}}></div>
                <StandardQForm
                    FormItem={RFormItem}
                    submit={this.handleQuery}
                />
              <div style={{marginTop:25}}>
                  <Polyline
                    height={500}
                    title="趋势"
                    data={data}
                  />
                </div>
              </div>
          </PageHeaderLayout>
        )
    }
}
