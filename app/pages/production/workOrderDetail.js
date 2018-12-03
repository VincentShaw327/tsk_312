import React, { Component, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'react-redux';
import {
  Button,
  Menu,
  Dropdown,
  Icon,
  Row,
  Col,
  Steps,
  Card,
  Popover,
  Badge,
  Table,
  Tooltip,
  Divider,
  Progress,
} from 'antd';
import classNames from 'classnames';
import DescriptionList from 'components/ant-design-pro/DescriptionList';
import PageHeaderLayout from '../../base/PageHeaderLayout';
// import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './AdvancedProfile.less';

const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;

const menu = (
  <Menu>
    <Menu.Item key="1">选项一</Menu.Item>
    <Menu.Item key="2">选项二</Menu.Item>
    <Menu.Item key="3">选项三</Menu.Item>
  </Menu>
);

const action = (
  <Fragment>
    <ButtonGroup>
      <Button>操作</Button>
      <Button>操作</Button>
      <Dropdown overlay={menu} placement="bottomRight">
        <Button>
          <Icon type="ellipsis" />
        </Button>
      </Dropdown>
    </ButtonGroup>
    <Button type="primary">主操作</Button>
  </Fragment>
);

const extra = (
  <Row>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>状态</div>
      <div className={styles.heading}>生产中</div>
    </Col>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>当前产量</div>
      <div className={styles.heading}>26704</div>
    </Col>
  </Row>
);

const description = (
  <DescriptionList className={styles.headerList} size="small" col="2">
    <Description term="创建人">曲丽丽</Description>
    <Description term="产品">引弧片</Description>
    <Description term="创建时间">2018-10-17</Description>
    <Description term="关联单据">
      <a href="">12421</a>
    </Description>
    <Description term="生效日期">2018-10-17 ~ 2018-12-31</Description>
    <Description term="备注">请于两个工作日内确认</Description>
  </DescriptionList>
);

const tabList = [
  {
    key: 'detail',
    tab: '详情',
  },
  {
    key: 'rule',
    tab: '规则',
  },
];

const desc1 = (
  <div className={classNames( styles.textSecondary, styles.stepDescription )}>
    <Fragment>
      曲丽丽
      <Icon type="dingding-o" style={{ marginLeft: 8 }} />
    </Fragment>
    <div>2018-10-12 12:32</div>
  </div>
);

const desc2 = (
  <div className={styles.stepDescription}>
    <Fragment>
      周毛毛
      <Icon type="dingding-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
    </Fragment>
    <div>
      <a href="">催一下</a>
    </div>
  </div>
);

const desc3 = (
  <div className={classNames( styles.textSecondary, styles.stepDescription )}>
    <Fragment>
      曲丽丽
      <Icon type="dingding-o" style={{ marginLeft: 8 }} />
    </Fragment>
    <div>2018-10-14 10:32</div>
  </div>
);

const desc4 = (
  <div className={classNames( styles.textSecondary, styles.stepDescription )}>
    <Fragment>
      曲丽丽
      <Icon type="dingding-o" style={{ marginLeft: 8 }} />
    </Fragment>
    <Progress percent={67} />
    <div>剩余时间：<span>192min</span></div>
  </div>
);

const desc5 = (
  <div className={classNames( styles.textSecondary, styles.stepDescription )}>
    {/* <Fragment>
      曲丽丽
      <Icon type="dingding-o" style={{ marginLeft: 8 }} />
    </Fragment> */}
    <div>计划完成时间：<span>2018-10-24 06:00</span></div>
    {/* <Progress percent={67} /> */}
  </div>
);

const Desc1 = (
  <div className={classNames( styles.textSecondary, styles.stepDescription )}>
    <Row>
      <Col span={5}>
        <Fragment>
          订单号：
          {/* <Icon type="dingding-o" style={{ marginLeft: 8 }} /> */}
        </Fragment>
        <div>P20181014_234</div>
      </Col>
      <Col span={4}>
        <Fragment>
          产品：
          {/* <Icon type="dingding-o" style={{ marginLeft: 8 }} /> */}
        </Fragment>
        <div>引弧片</div>
      </Col>
      <Col span={4}>
        <Fragment>
          数量：
          {/* <Icon type="dingding-o" style={{ marginLeft: 8 }} /> */}
        </Fragment>
        <div>120000</div>
      </Col>
      <Col span={5}>
        <Fragment>
          下单日期：
          {/* <Icon type="dingding-o" style={{ marginLeft: 8 }} /> */}
        </Fragment>
        <div>2018-10-16 11:24:10</div>
      </Col>
      <Col span={6}>
        <Fragment>
          计划交期：
          {/* <Icon type="dingding-o" style={{ marginLeft: 8 }} /> */}
        </Fragment>
        <div>2018-10-24 18:00:00</div>
      </Col>
    </Row>
    {/* <Fragment>
      曲丽丽
      <Icon type="dingding-o" style={{ marginLeft: 8 }} />
    </Fragment> */}
    {/* <div>计划完成时间：<span>2018-10-24 06:00</span></div> */}
    {/* <Progress percent={67} /> */}
  </div>
);

const Desc2 = (
  <div className={classNames( styles.textSecondary, styles.stepDescription )}>
    <Row>
      <Col span={4}>
        <Fragment>
          工单号：
          {/* <Icon type="dingding-o" style={{ marginLeft: 8 }} /> */}
        </Fragment>
        <div>T20181014_0234</div>
        <div>T20181014_0236</div>
        <a>T20181014_0237</a>
      </Col>
      <Col span={4}>
        <Fragment>
          机台：
          {/* <Icon type="dingding-o" style={{ marginLeft: 8 }} /> */}
        </Fragment>
        <div>ST-06</div>
        <div>ST-07</div>
        <a>ST-08</a>
      </Col>
      <Col span={4}>
        <Fragment>
          产品：
          {/* <Icon type="dingding-o" style={{ marginLeft: 8 }} /> */}
        </Fragment>
        <div>产品1</div>
        <div>产品2</div>
        <a>产品3</a>
      </Col>
      <Col span={4}>
        <Fragment>
          模具：
          {/* <Icon type="dingding-o" style={{ marginLeft: 8 }} /> */}
        </Fragment>
        <div>579.10801.01</div>
        <div>551.10703.01</div>
        <a>574.1011.01</a>
      </Col>
      <Col span={4}>
        <Fragment>
          数量：
          {/* <Icon type="dingding-o" style={{ marginLeft: 8 }} /> */}
        </Fragment>
        <div>50000</div>
        <div>30000</div>
        <a>40000</a>
      </Col>
      <Col span={4}>
        <Fragment>
          计划完成时间：
          {/* <Icon type="dingding-o" style={{ marginLeft: 8 }} /> */}
        </Fragment>
        <div>2018-10-23 18:00:00</div>
        <div>2018-10-24 17:00:00</div>
        <a>2018-10-24 15:00:00</a>
      </Col>
    </Row>
    {/* <Fragment>
      曲丽丽
      <Icon type="dingding-o" style={{ marginLeft: 8 }} />
    </Fragment> */}
    {/* <div>计划完成时间：<span>2018-10-24 06:00</span></div> */}
    {/* <Progress percent={67} /> */}
  </div>
);

// const Desc3 = (
//   <div className={classNames(styles.textSecondary, styles.stepDescription)}>
//     <Row>
//       <Col span={5}>
//         <Fragment>
//           原料：
//           {/* <Icon type="dingding-o" style={{ marginLeft: 8 }} /> */}
//         </Fragment>
//         <div>YL02346674</div>
//       </Col>
//       <Col span={4}>
//         <Fragment>
//           重量：
//           {/* <Icon type="dingding-o" style={{ marginLeft: 8 }} /> */}
//         </Fragment>
//         <div>146kg</div>
//       </Col>
//
//     </Row>
//     {/* <Fragment>
//       曲丽丽
//       <Icon type="dingding-o" style={{ marginLeft: 8 }} />
//     </Fragment> */}
//     {/* <div>计划完成时间：<span>2018-10-24 06:00</span></div> */}
//     {/* <Progress percent={67} /> */}
//   </div>
// );

const Desc3 = (
  <div className={classNames( styles.textSecondary, styles.stepDescription )}>
    <Fragment>
      <div>原料：<span>YL02346674</span></div>
      <div>重量：<span>146kg</span></div>
      <div>领料时间：<span>2018-10-22 17:26:00</span></div>
    </Fragment>
  </div>
);

const Desc4 = (
  <div className={classNames( styles.textSecondary, styles.stepDescription )}>
    <Fragment>
      <div>计划开始时间：<span>2018-10-23 07:00:00</span></div>
      <div>实际开始时间：<span>2018-10-23 07:56:00</span></div>
      <div>延迟：<span>56min</span></div>
    </Fragment>
    {/* <Fragment>
      曲丽丽
      <Icon type="dingding-o" style={{ marginLeft: 8 }} />
    </Fragment> */}
    {/* <div>计划完成时间：<span>2018-10-24 06:00</span></div> */}
    {/* <Progress percent={67} /> */}
  </div>
);

const Desc5 = (
  <div className={classNames( styles.textSecondary, styles.stepDescription )}>
    <Row>
      <Col span={5}>
        <Fragment>
          冲速设定：
          {/* <Icon type="dingding-o" style={{ marginLeft: 8 }} /> */}
        </Fragment>
        <div>97/min</div>
      </Col>
      <Col span={4}>
        <Fragment>
          当前总冲次：
          {/* <Icon type="dingding-o" style={{ marginLeft: 8 }} /> */}
        </Fragment>
        <div>475257</div>
      </Col>
      <Col span={5}>
        <Fragment>
          产量：
          {/* <Icon type="dingding-o" style={{ marginLeft: 8 }} /> */}
        </Fragment>
        <div>当前产量：<span>34503</span></div>
        <div>目标产量：<span>40000</span></div>
        <div>剩余产量：<span>5497</span></div>
        <Progress percent={67} />
      </Col>
      <Col span={8}>
        <Fragment>
          时间：
          {/* <Icon type="dingding-o" style={{ marginLeft: 8 }} /> */}
        </Fragment>
        <div>计划完成时间：<span>2018-10-24 15:00:00</span></div>
        <div>剩余：<span>192min</span></div>
      </Col>

    </Row>
    {/* <Fragment>
      曲丽丽
      <Icon type="dingding-o" style={{ marginLeft: 8 }} />
    </Fragment> */}
    {/* <div>计划完成时间：<span>2018-10-24 06:00</span></div> */}
    {/* <Progress percent={67} /> */}
  </div>
);

const Desc6 = (
  <div className={classNames( styles.textSecondary, styles.stepDescription )}>
    <Fragment>
      <div>样品数量：<span>30</span></div>
      <div>合格数量：<span>28</span></div>
      <div>合格率：<span>98%</span></div>
    </Fragment>
    {/* <Fragment>
      曲丽丽
      <Icon type="dingding-o" style={{ marginLeft: 8 }} />
    </Fragment> */}
    {/* <div>计划完成时间：<span>2018-10-24 06:00</span></div> */}
    {/* <Progress percent={67} /> */}
  </div>
);

const Desc7 = (
  <div className={classNames( styles.textSecondary, styles.stepDescription )}>
    <Row>
      <Col span={8}>
        <Fragment>
          时间：
          {/* <Icon type="dingding-o" style={{ marginLeft: 8 }} /> */}
        </Fragment>
        <div>计划完成时间：<span>2018-10-24 15:00:00</span></div>
        <div>实际完成时间：<span>2018-10-25 10:46:00</span></div>
        <div>总延迟：<span>19小时46分</span></div>
        <div>总用时：<span>37小时46分</span></div>
        <div>生产用时：<span>16小时13分</span></div>
        <div>时间利用率：<span>46%</span></div>
        <div>计划达成率：<span>57%</span></div>
      </Col>
      <Col span={5}>
        <Fragment>
          产量：
          {/* <Icon type="dingding-o" style={{ marginLeft: 8 }} /> */}
        </Fragment>
        <div>总冲次数：<span>122034</span></div>
        <div>理论产量：<span>150000</span></div>
        <div>目标产量：<span>120000</span></div>
        <div>实际产量：<span>136301</span></div>
        {/* <div>剩余产量：<span>5497</span></div> */}
        {/* <Progress percent={67}/> */}
      </Col>
      <Col span={5}>
        <Fragment>
          重量：
          {/* <Icon type="dingding-o" style={{ marginLeft: 8 }} /> */}
        </Fragment>
        <div>原料重量：<span>146kg</span></div>
        <div>理论产品总重：<span>67kg</span></div>
        <div>实际产品总重：<span>59.3kg</span></div>
        <div>原料利用率：<span>40.4%</span></div>
      </Col>
    </Row>
    {/* <Fragment>
      曲丽丽
      <Icon type="dingding-o" style={{ marginLeft: 8 }} />
    </Fragment> */}
    {/* <div>计划完成时间：<span>2018-10-24 06:00</span></div> */}
    {/* <Progress percent={67} /> */}
  </div>
);

const Desc8 = (
  <div className={classNames( styles.textSecondary, styles.stepDescription )}>
    <Fragment>
      <div>入库数量：<span>136301</span></div>
      <div>入库前总数量：<span>4600</span></div>
      <div>入库后总数量：<span>140901</span></div>
    </Fragment>
  </div>
);

const popoverContent = (
  <div style={{ width: 160 }}>
    吴加号
    <span className={styles.textSecondary} style={{ float: 'right' }}>
      <Badge status="default" text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>未响应</span>} />
    </span>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>
      耗时：2小时25分钟
    </div>
  </div>
);

const customDot = ( dot, { status } ) =>
  ( status === 'process' ? (
    <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
      {dot}
    </Popover>
  ) : (
    dot
  ) );

const operationTabList = [
  {
    key: 'tab1',
    tab: '操作日志一',
  },
  {
    key: 'tab2',
    tab: '操作日志二',
  },
  {
    key: 'tab3',
    tab: '操作日志三',
  },
];

const columns = [
  {
    title: '操作类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '操作人',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '执行结果',
    dataIndex: 'status',
    key: 'status',
    render: text =>
      ( text === 'agree' ? (
        <Badge status="success" text="成功" />
      ) : (
        <Badge status="error" text="驳回" />
      ) ),
  },
  {
    title: '操作时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: '备注',
    dataIndex: 'memo',
    key: 'memo',
  },
];

@connect( ( { profile, loading } ) => ( {
  profile,
  // loading: loading.effects['profile/fetchAdvanced'],
  loading: false,
} ) )
class AdvancedProfile extends Component {
  state = {
    operationkey: 'tab1',
    stepDirection: 'horizontal',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch( {
      type: 'profile/fetchAdvanced',
    } );

    this.setStepDirection();
    window.addEventListener( 'resize', this.setStepDirection, { passive: true } );
  }

  componentWillUnmount() {
    window.removeEventListener( 'resize', this.setStepDirection );
    this.setStepDirection.cancel();
  }

  onOperationTabChange = ( key ) => {
    this.setState( { operationkey: key } );
  };

  @Bind()
  @Debounce( 200 )
  setStepDirection() {
    const { stepDirection } = this.state;
    const w = getWindowWidth();
    if ( stepDirection !== 'vertical' && w <= 576 ) {
      this.setState( {
        stepDirection: 'vertical',
      } );
    } else if ( stepDirection !== 'horizontal' && w > 576 ) {
      this.setState( {
        stepDirection: 'horizontal',
      } );
    }
  }

  render() {
    const { stepDirection, operationkey } = this.state;
    const { profile, loading } = this.props;
    /* const { advancedOperation1, advancedOperation2, advancedOperation3 } = profile;
    const contentList = {
      tab1: (
        <Table
          pagination={false}
          // loading={loading}
          dataSource={advancedOperation1}
          columns={columns}
        />
      ),
      tab2: (
        <Table
          pagination={false}
          // loading={loading}
          dataSource={advancedOperation2}
          columns={columns}
        />
      ),
      tab3: (
        <Table
          pagination={false}
          // loading={loading}
          dataSource={advancedOperation3}
          columns={columns}
        />
      ),
    }; */

    return (
      <PageHeaderLayout
        title="工单号：T20181014_0237"
        // logo={
        //   <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        // }
        // action={action}
        content={description}
        extraContent={extra}
        // tabList={tabList}
      >
        {/* <Card title="流程进度" style={{ marginBottom: 24 }} bordered={false}>
          <Steps direction={stepDirection} progressDot={customDot} current={3}>
            <Step title="生产下单" description={desc1} />
            <Step title="订单排程" description={desc2} />
            <Step title="开始生产" description={desc3} />
            <Step title="生产中"  description={desc4}/>
            <Step title="完成" description={desc5}/>
          </Steps>
        </Card> */}

        <Card title="流程进度" style={{ marginBottom: 24 }} bordered={false}>
          <Steps direction="vertical" current={5}>
            <Step title="生产下单" description={Desc1} />
            <Step title="订单排程" description={Desc2} />
            <Step title="领料" description={Desc3} />
            <Step title="开始生产" description={Desc4} />
            <Step title="首检" description="This is a description." />
            <Step title="生产中" description={Desc5} />
            <Step title="末检" description={Desc6} />
            <Step title="完成生产" description={Desc7} />
            <Step title="入库" description={Desc8} />
          </Steps>
        </Card>

        {/* <Card title="用户信息" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="用户姓名">付小小</Description>
            <Description term="会员卡号">32943898021309809423</Description>
            <Description term="身份证">3321944288191034921</Description>
            <Description term="联系方式">18112345678</Description>
            <Description term="联系地址">
              曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口
            </Description>
          </DescriptionList>
          <DescriptionList style={{ marginBottom: 24 }} title="信息组">
            <Description term="某某数据">725</Description>
            <Description term="该数据更新时间">2017-08-08</Description>
            <Description>&nbsp;</Description>
            <Description
              term={
                <span>
                  某某数据
                  <Tooltip title="数据说明">
                    <Icon
                      style={{ color: 'rgba(0, 0, 0, 0.43)', marginLeft: 4 }}
                      type="info-circle-o"
                    />
                  </Tooltip>
                </span>
              }
            >
              725
            </Description>
            <Description term="该数据更新时间">2017-08-08</Description>
          </DescriptionList>
          <h4 style={{ marginBottom: 16 }}>信息组</h4>
          <Card type="inner" title="多层级信息组">
            <DescriptionList size="small" style={{ marginBottom: 16 }} title="组名称">
              <Description term="负责人">林东东</Description>
              <Description term="角色码">1234567</Description>
              <Description term="所属部门">XX公司 - YY部</Description>
              <Description term="过期时间">2017-08-08</Description>
              <Description term="描述">
                这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...
              </Description>
            </DescriptionList>
            <Divider style={{ margin: '16px 0' }} />
            <DescriptionList size="small" style={{ marginBottom: 16 }} title="组名称" col="1">
              <Description term="学名">
                Citrullus lanatus (Thunb.) Matsum. et
                Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..
              </Description>
            </DescriptionList>
            <Divider style={{ margin: '16px 0' }} />
            <DescriptionList size="small" title="组名称">
              <Description term="负责人">付小小</Description>
              <Description term="角色码">1234568</Description>
            </DescriptionList>
          </Card>
        </Card> */}

        {/* <Card title="用户近半年来电记录" style={{ marginBottom: 24 }} bordered={false}>
          <div className={styles.noData}>
            <Icon type="frown-o" />
            暂无数据
          </div>
        </Card> */}

        {/* <Card
          className={styles.tabsCard}
          bordered={false}
          tabList={operationTabList}
          onTabChange={this.onOperationTabChange}
        >
          {contentList[operationkey]}
        </Card> */}

      </PageHeaderLayout>
    );
  }
}

export default AdvancedProfile;
