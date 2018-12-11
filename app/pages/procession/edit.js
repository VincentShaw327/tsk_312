import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, Route, Switch, HashRouter } from 'react-router-dom'
import {
  update_menukey,
  set_id,
  config_route,
  config_edit,
  config_edit_end,
  config_update,
  config_material_in,
  config_material_out,
} from 'actions/procession'
import {
    Button,
    Row,
    Col,
    Menu,
    Card,
    Form,
    Input,
    List,
    Timeline,
    Icon,
    DatePicker,
    Steps,
} from 'antd';
import { fn_mes_trans } from 'functions'

const FormItem = Form.Item;
// const { Step } = Steps;
// import { TPostData, urlBase } from '../../utils/TAjax';
@connect( ( state, props ) => ( {
  Breadcrumb: state.Breadcrumb,
  processionConfig: state.processionConfig,
} ) )
export default class edit extends Component {
  constructor( props ) {
    super( props )
    this.state = {
      uuid: props.match.params.id,
      // initInputVal:
      // title: props.title,
      // current: 'base',
    }
  }

  componentWillMount() {
    const uuid = this.props.match.params.id
    // this.uuid = uuid
    this.props.dispatch( set_id( uuid ) )
    // if ( this.props.processionConfig.uuid === -1 ) {
    // }
  }

  componentDidMount() {

  }

  // handleChange() {}
  handleClick=( e ) => {
    // console.log( 'clicked', e )
    // this.setState( {
    //   current: e.key,
    // } );
    this.props.dispatch( update_menukey( e.key ) )
    this.get( e.key )
    // this.props.history.push( e.key )
  }

  get=( action ) => {
    const {
      uuid, routeConfig, materialInConfig, materialOutConfig,
    } = this.props.processionConfig;
    console.log( 'uuid', uuid );
    switch ( action ) {
      case 'base':
        // if ( routeConfig.length !== 0 ) break;
        this.props.dispatch( config_route( fn_mes_trans.toFilter( { uObjectUUID: uuid } ) ) )
        break;
      case 'mtrl':
        // if ( materialInConfig.length !== 0 ) break;
        this.props.dispatch( config_material_in( fn_mes_trans.toFilter( { uObjectUUID: uuid } ) ) )
        break;
      case 'out':
        // if ( materialOutConfig.length !== 0 ) break;
        this.props.dispatch( config_material_out( fn_mes_trans.toFilter( { uObjectUUID: uuid } ) ) )
        break;
      default:
        break;
    }
  }

  startEdit=( e ) => {
    console.log( '开始编辑', e )
    this.props.dispatch( config_edit( e ) )
  }

  saveConfig=( e ) => {
    const { value } = this.confv.input
    console.log( '保存', e, value )
    const { id } = this.confv.props
    const obj = {
      uuid: e.id,
      cols: fn_mes_trans.toCols( { [id]: value } ),
    }
    this.props.dispatch( config_update( obj, ( data ) => {
      console.log( 'success update', data )
      this.props.dispatch( config_edit_end( Object.assign( e, data, { keyname: id } ) ) )
    } ) )
  }

  inchange=v => console.log( 'changing', v, this.confv )

  render() {
    const { processionConfig } = this.props;
    const formItemLayout = {
       labelCol: { span: 4 },
       wrapperCol: { span: 14 },
    };
    console.log( 'look the props', this.props )
    const action_edit = [<a onClick={this.startEdit} onKeyDown>修改</a>];
    const action_save = [<a>保存</a>];
    const para_base = () => (
        <div>
          <List
            className="demo-loadmore-list"
            // loading={initLoading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={processionConfig.routeConfig}
            renderItem={item => (
              <List.Item actions={
                item.editing ?
                [<a onClick={() => this.saveConfig( item )} onKeyDown={() => ''}>保存</a>] :
                [<a onClick={() => this.startEdit( item )} onKeyDown={() => ''}>修改</a>]
                }
              >
                {/* <Skeleton avatar title={false} loading={item.loading} active> */}
                  <List.Item.Meta
                    // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={
                      // <a>{item.name}</a>
                      <span>
                        {
                          item.editing ?
                            <Input
                              id={`${item.name_en}`}
                              ref={v => this.confv = v}
                              defaultValue={item.value}
                              onChange={this.inchange}
                              style={{ width: 180 }}
                            /> :
                            <span>{`${item.name}:${item.value}`}</span>
                        }
                      </span>
                    }
                    // description={`${item.name}:${item.value}`}
                  />
                  {/* <div>content</div> */}
                {/* </Skeleton> */}
              </List.Item>
            )}
          />
        </div>
    );

    const para_mold = () => (
        <div>
            <Form layout="horizontal">
              <FormItem
                label="模具"
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
            <Button type="primary" style={{ marginLeft: '65%' }}>提交</Button>
        </div>
    );

    const para_mtrl = () => (
      <div>
        <List
          className="demo-loadmore-list"
          // loading={initLoading}
          itemLayout="horizontal"
          // loadMore={loadMore}
          dataSource={processionConfig.materialInConfig}
          renderItem={item => (
            <List.Item actions={
              item.editing ?
              [<a onClick={() => this.saveConfig( item )} onKeyDown={() => ''}>保存</a>] :
              [<a onClick={() => this.startEdit( item )} onKeyDown={() => ''}>修改</a>]
              }
            >
              {/* <Skeleton avatar title={false} loading={item.loading} active> */}
                <List.Item.Meta
                  // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={
                    // <a>{item.name}</a>
                    <span>
                      {
                        item.editing ?
                          <Input
                            id={`${item.name_en}`}
                            ref={v => this.confv = v}
                            defaultValue={item.value}
                            onChange={this.inchange}
                          /> :
                          <span>{`${item.name}:${item.value}`}</span>
                      }
                    </span>
                  }
                  // description={`${item.name}:${item.value}`}
                />
                {/* <div>content</div> */}
              {/* </Skeleton> */}
            </List.Item>
          )}
        />
      </div>
    );

    const para_out = () => (
      <div>
        <List
          className="demo-loadmore-list"
          // loading={initLoading}
          itemLayout="horizontal"
          // loadMore={loadMore}
          dataSource={processionConfig.materialOutConfig}
          renderItem={item => (
            <List.Item actions={
              item.editing ?
              [<a onClick={() => this.saveConfig( item )} onKeyDown={() => ''}>保存</a>] :
              [<a onClick={() => this.startEdit( item )} onKeyDown={() => ''}>修改</a>]
              }
            >
              {/* <Skeleton avatar title={false} loading={item.loading} active> */}
                <List.Item.Meta
                  // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={
                    // <a>{item.name}</a>
                    <span>
                      {
                        item.editing ?
                          <Input
                            id={`${item.name_en}`}
                            ref={v => this.confv = v}
                            defaultValue={item.value}
                            onChange={this.inchange}
                          /> :
                          <span>{`${item.name}:${item.value}`}</span>
                      }
                    </span>
                  }
                  // description={`${item.name}:${item.value}`}
                />
                {/* <div>content</div> */}
              {/* </Skeleton> */}
            </List.Item>
          )}
        />
      </div>
    );
  // console.log( 'HashRouter', HashRouter )
    return (
        <div>
            <Card>
                <Row gutter={16}>
                    <Col className="gutter-row" span={4}>
                        <Menu
                          onClick={this.handleClick}
                          // selectedKeys={[this.state.current]}
                          selectedKeys={[processionConfig.activeKey]}
                          defaultSelectedKeys={['base']}
                          mode="vertical "
                          // selectable
                        >
                          <Menu.Item key="base">
                            基本参数
                            <Link to={`/procession/route/config/${this.state.uuid}/base`} />
                          </Menu.Item>
                          <Menu.Item key="mtrl">
                            物料
                            <Link to={`/procession/route/config/${this.state.uuid}/mtrl`} />
                          </Menu.Item>
                          <Menu.Item key="out">
                            产出
                            <Link to={`/procession/route/config/${this.state.uuid}/out`} />
                          </Menu.Item>
                          <Menu.Item key="mold">
                            模具
                            <Link to={`/procession/route/config/${this.state.uuid}/mold`} />
                          </Menu.Item>
                          <Menu.Item key="device">
                            设备
                            <Link to={`/procession/route/config/${this.state.uuid}/device`} />
                          </Menu.Item>
                        </Menu>
                    </Col>
                    <Col className="gutter-row" span={20}>
                        <Switch>
                          <Route path={`/procession/route/config/${this.state.uuid}/base`} component={para_base} />
                          <Route path={`/procession/route/config/${this.state.uuid}/mold`} component={para_mold} />
                          <Route path={`/procession/route/config/${this.state.uuid}/mtrl`} component={para_mtrl} />
                          <Route path={`/procession/route/config/${this.state.uuid}/out`} component={para_out} />
                        </Switch>
                    </Col>
                </Row>
            </Card>
        </div>
    )
  }
}
