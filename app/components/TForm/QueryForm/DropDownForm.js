import React, {Component} from 'react';
import {
    Button,
    Input,
    Row,
    Col,
    Form,
    Icon
} from 'antd';
import CFormItem from '../CreatFormItem/CreateFormItem';
import classnames from 'classnames';
import styles from './index.less'

export default class DropDownForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: props.title,
            expandForm: false,
            visible:false,
            left:0,
            top:0
        }
    }

    componentDidMount() {
        // console.log('show position',this)
        let _btn=this._btn;
        let _dropform=this._dropform;
        this.setState({
            left:_btn.offsetLeft,
            offsetWidth:_dropform.offsetWidth,
            top:_btn.offsetTop+20
        });
        document.addEventListener('click', this.hideDropMenu, false);
        // this._dropform.addEventListener('mousedown', this.hideDropMenu, false);
    }

    componentWillUnmount() {
      document.removeEventListener('click', this.hideDropMenu, false);
    }

    showDropMenu=(e)=>{
        console.log('显示',e)
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({visible:true});
    }

    hideDropMenu=(e)=>{
        // console.log('隐藏',e)
        e.preventDefault();
        e.stopPropagation();
        e.hasOwnProperty("nativeEvent")?e.nativeEvent.stopImmediatePropagation():''
        this.setState({visible:false});
    }

    handleSubmit=(e)=>{
        this.props.form.validateFields( ( errors, values ) => {
            // console.log('收到表单值：', values);
            let subValue = {};
            if ( !!errors ) {
                console.log( 'Errors in form!!!' );
                message.error( '添加失败' )
                return;
            } else {
                this.props.submit( values,'filter' );
                this.hideDropMenu(e);
                // message.success('添加成功');
            }
        } );
    }

    handleSearch=(e)=>{
        if(e&&e.keyCode&&e.keyCode==13){
            console.log('开始搜索。。。',e,e.keyCode,this._input.input.value)
            let value=this._input.input.value;
            this.props.submit(value,'search');
        }
    }

    render() {
        const {
            FormItem,
            form: {
                getFieldDecorator
            },
            updateItem,
            width=350,
            position='leftBottom',
            isHaveSearch=true,
            styles={
                maxWidth:500
            }
        } = this.props;
        const {left,top,right,offsetWidth}=this.state;
        const rightBottomStyle={
            width,
            // left,
            top:25,
            right:-width
        }
        const leftBottomStyle={
            width,
            // left:Math.abs(left-offsetWidth),
            right:0,
            top:25
        }

        // console.log('dropform state',this.state)

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
                // layout="horizontal"
                // style={{padding:20}}
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
                {/* <FormItem {...formItemLayout}>
                <Button type="primary" >确定</Button>
                <Button type="default" style={{marginLeft:20}}>取消</Button>
                </FormItem> */}
            </Form>
        )

        const dropFormClass = classnames({
          'item': true,
          'item-hidden': !this.state.visible
        });

        const haveSearch=(
            <div style={{
                display:'flex',
                minWidth:'150px',
                maxWidth:'500px',
                width:'100%',
                justifyContent:'space-between',
                alignItems:'center'
                }}>
                <Input style={{width:'90%'}} ref={_in=>this._input=_in} onKeyDown={this.handleSearch}  />
                <a onClick={this.showDropMenu} ref={btn=>this._btn=btn}>
                    <Icon  type="filter" theme="outlined" />
                </a>
            </div>
        );

        const noSearch=(
            <a onClick={this.showDropMenu} ref={btn=>this._btn=btn}>
                <Icon  type="filter" theme="outlined" />
            </a>

        )

        return (
            <div style={styles} className="wrap-drop-form">
              {
                  isHaveSearch?
                    haveSearch:noSearch
              }
              <div
                className={dropFormClass}
                style={
                    position=="rightBottom"?
                    rightBottomStyle:leftBottomStyle
                }
                onClick={this.showDropMenu}
                ref={dropForm=>this._dropform=dropForm}
                >
                  {
                      filterForm
                  }
                <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                <Button type="default" onClick={this.hideDropMenu} style={{marginLeft:20}}>取消</Button>
              </div>
            </div>
        )
    }
}

DropDownForm = Form.create()(DropDownForm);
