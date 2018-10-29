import React, {Component} from 'react';
import {
    Button,
    Row,
    Col,
    Divider,
    List,
    Timeline,
    Menu,
    Card,
    Form,
    Dropdown,
    Icon,
    Radio,
    Input
} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search, TextArea } = Input;
// import { TPostData, urlBase } from '../../utils/TAjax';
import CFormItem from '../CreatFormItem/CreateFormItem';
// import styles from './simple.less';

export default class DropDownForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: props.title,
            expandForm: false,
            visible:false
        }
    }

    componentWillMount() {}

    showDropMenu=(e)=>{
      this.setState({visible:true});
      e.preventDefault();
      e.stopPropagation();
    }

    render() {
      const {FormItem,form: {getFieldDecorator},updateItem} = this.props;

      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };

      const filterForm=(
          <Form
            layout="horizontal"
            style={{padding:20}}
            >
              {
                  FormItem.map(function(item,index){
                    return <CFormItem
                              key={index}
                              getFieldDecorator={getFieldDecorator}
                              formItemLayout={formItemLayout}
                              item={item}
                              recordItem={updateItem}
                            />
                  })
              }
          </Form>
      )

        return (
            <div>
                <Row>
                    <Col span={8}></Col>
                    <Col span={12}>
                        <RadioGroup defaultValue="all">
                          <RadioButton value="all">全部</RadioButton>
                          <RadioButton value="progress">进行中</RadioButton>
                          <RadioButton value="waiting">等待中</RadioButton>
                        </RadioGroup>
                    </Col>
                    <Col span={3}>
                        <Search style={{width:120}} placeholder="请输入" onSearch={() => ({})} />
                    </Col>
                    <Col span={1}>
                        <Dropdown
                            overlay={filterForm}
                            // visible={this.state.visible}
                            trigger={['click']}
                            onClick={this.showDropMenu}
                            >
                            <a className="ant-dropdown-link" >
                              {/* Hover me <Icon type="down" /> */}
                              <Icon  type="filter" theme="outlined" />
                            </a>
                        </Dropdown>
                    </Col>
                </Row>
            </div>
        )
    }
}

DropDownForm = Form.create()(DropDownForm);
