import React, {Component,Fragment} from 'react';
import {Link } from 'react-router-dom'
import {
    Button,
    Radio,
    Row,
    Col,
    Divider,
    List,
    Timeline,
    Menu,
    Card,
    Icon,
    DatePicker,
    Form,
    Input,
    Steps
} from 'antd';
const FormItem = Form.Item;
const Step = Steps.Step;
import {TPostData, urlBase} from '../../utils/TAjax';

export default class TstateTimeOverview extends Component{

  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
      steps:0
    }
  }

  componentWillMount(){

  }

  componentDidMount(){

  }

  handleChange(){

  }

  nextStep=(num)=>{
      this.setState({steps:num})
  }

  render(){
    const {steps}=this.state;
    const formItemLayout =  {
       labelCol: { span: 4 },
       wrapperCol: { span: 14 },
    };

    const parameter01=(
        <Fragment>
            <Form layout={'horizontal'}>
              <FormItem
                label="标准SPM"
                {...formItemLayout}
               >
                   <Input placeholder="请输入..." />
              </FormItem>
              <FormItem
                label="最高SPM"
                {...formItemLayout}
               >
                <Input placeholder="请输入..." />
              </FormItem>
              <FormItem
                label="最低SPM"
                {...formItemLayout}
               >
                <Input placeholder="请输入..." />
              </FormItem>
              <FormItem
                label="工艺卡片"
                {...formItemLayout}
               >
                {/* <Input placeholder="input placeholder" /> */}
              </FormItem>
              <FormItem
                label="检验卡片"
                {...formItemLayout}
               >
                {/* <Input placeholder="input placeholder" /> */}
              </FormItem>
              {/* <FormItem label="" {...formItemLayout}>
                <Button type="primary">Submit</Button>
              </FormItem> */}
            </Form>
            <Button type="primary" style={{marginLeft:"65%"}} onClick={this.nextStep.bind(this,1)}>下一步</Button>
        </Fragment>
    );
    const parameter02=(
        <Fragment>
            <Form layout={'horizontal'}>
              <FormItem
                label="模具型号"
                {...formItemLayout}
               >
                   <Input placeholder="请输入..." />
              </FormItem>

            </Form>
            <Button type="primary" style={{marginLeft:"0"}} onClick={this.nextStep.bind(this,0)}>上一步</Button>
            <Button type="primary" style={{marginLeft:20}} onClick={this.nextStep.bind(this,2)}>下一步</Button>
        </Fragment>
    );

    return(
        <div>
            <Card style={{height:500}}>
              <Link to='/process/product'>
                <Icon type="left" />
              </Link>
                <Steps current={steps}>
                  <Step title="工艺参数" description="配置工艺参数" />
                  <Step title="模具" description="配置模具" />
                  <Step title="物料" description="配置物料" />
                  <Step title="完成" description="配置提交" />
                </Steps>
                <div style={{marginTop:25,textAlign:'center'}}>
                    {
                        steps==0?
                            parameter01:
                        steps==1?parameter02:''

                    }
                </div>
            </Card>
        </div>
    )
  }
}
