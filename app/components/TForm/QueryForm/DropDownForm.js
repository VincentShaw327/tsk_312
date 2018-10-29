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
    Icon
} from 'antd';
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
        // const filterForm=(
        //     <Form
        //       // onSubmit={this.handleSubmit}
        //       style={{padding:20}}
        //       onClick={this.formClicked}
        //       >
        //       <FormItem
        //         {...formItemLayout}
        //         label="日期"
        //        >
        //         {getFieldDecorator('date', {
        //           rules: [{
        //             type: 'date', message: '请选择日期',
        //           }, {
        //             required: true, message: 'Please input your E-mail!',
        //           }],
        //         })(
        //           <RangePicker  />
        //         )}
        //       </FormItem>
        //       <FormItem
        //         {...formItemLayout}
        //         label="工作中心"
        //        >
        //         {getFieldDecorator('workcenter', {
        //           rules: [{
        //             type: 'string', message: 'The input is not valid E-mail!',
        //           }, {
        //             required: true, message: 'Please input your E-mail!',
        //           }],
        //         })(
        //           <Select defaultValue="01" >
        //             <Option value="01">ST-01</Option>
        //             <Option value="02">ST-02</Option>
        //             <Option value="03">ST-03</Option>
        //             <Option value="04">ST-04</Option>
        //             <Option value="05">ST-05</Option>
        //           </Select>
        //         )}
        //       </FormItem>
        //       <FormItem
        //         {...formItemLayout}
        //         label="模具"
        //        >
        //         {getFieldDecorator('mould', {
        //           rules: [{
        //             type: 'string', message: 'The input is not valid E-mail!',
        //           }, {
        //             required: true, message: 'Please input your E-mail!',
        //           }],
        //         })(
        //           <Select defaultValue="01" >
        //             <Option value="01">M-01</Option>
        //             <Option value="02">M-02</Option>
        //             <Option value="03">M-03</Option>
        //             <Option value="04">M-04</Option>
        //             <Option value="05">M-05</Option>
        //           </Select>
        //         )}
        //       </FormItem>
        //       <FormItem
        //         {...formItemLayout}
        //         label="产品"
        //        >
        //         {getFieldDecorator('product', {
        //           rules: [{
        //             type: 'email', message: 'The input is not valid E-mail!',
        //           }, {
        //             required: true, message: 'Please input your E-mail!',
        //           }],
        //         })(
        //           <Input />
        //         )}
        //       </FormItem>
        //       <FormItem {...formItemLayout}>
        //         <Button type="primary" >确定</Button>
        //         <Button type="default" style={{marginLeft:20}}>取消</Button>
        //       </FormItem>
        //     </Form>
        // );

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
            </div>
        )
    }
}

DropDownForm = Form.create()(DropDownForm);
