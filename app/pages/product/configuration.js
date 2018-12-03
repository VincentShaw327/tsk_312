import React, {Component} from 'react';
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
    }
  }

  componentWillMount(){

  }

  componentDidMount(){

  }

  handleChange(){

  }

  render(){

    const formItemLayout =  {
       labelCol: { span: 4 },
       wrapperCol: { span: 14 },
    };

    const parameter01=(
        <div>
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
            <Button type="primary" style={{marginLeft:"65%"}}>提交</Button>
        </div>
    );

    return(
        <div>
            <Card>
                {/* <Row>
                    <Col span={4}>
                        <Menu
                          // onClick={this.handleClick}
                          // selectedKeys={[this.state.current]}
                          mode="vertical "
                         >
                          <Menu.Item key="process">
                            工艺参数
                          </Menu.Item>
                          <Menu.Item key="mold">
                            模具
                          </Menu.Item>
                          <Menu.Item key="mtrl">
                            物料
                          </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={20}>
                        {parameter01}
                    </Col>
                </Row> */}
                <Steps current={1}>
                  <Step title="Finished" description="This is a description." />
                  <Step title="In Progress" description="This is a description." />
                  <Step title="Waiting" description="This is a description." />
                </Steps>

            </Card>
        </div>
    )
  }
}
