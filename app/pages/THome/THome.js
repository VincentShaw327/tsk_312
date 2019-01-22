import React, { Component } from 'react';
import {
    Tooltip,
    Icon,
    Row,
    Col,
    List,
    Card,
    Table,
} from 'antd';

import { Barsort, Areanull } from 'components/Chart'
import PageHeaderLayout from '../../base/PageHeaderLayout';
import timpic from '../../images/icon/untilize.png'
import totalstoping from '../../images/icon/stop.png'
import THeader from '../../base/Header/THeader';


export default class THome extends Component {
    // 初始化页面常量 绑定事件方法
    constructor( props, context ) {
        super( props )
        this.state = {
        }
        this.orderRenderData = {};
    }

    componentWillMount() {}

    // 组件已经加载到dom中
    componentDidMount() {
        // var plotHeight = (window.innerHeight - 180) / 4;
    }

    onTabChange = ( key, type ) => {
        // console.log( key, type );
        this.setState( { [type]: key } );
    }

    render() {
        const data = [
            {
              title: '索特电气车间看板监控',
              img: '../../images/monitor/01.jpg',
              url: '/#/scada/soot',
            },
            {
              title: '看板二',
            },
            {
              title: '看板三',
            },
            {
              title: '看板四',
            },
            {
              title: '看板四',
            },
            {
              title: '看板六',
            },
        ];

        return (
            // <PageHeaderLayout
            //   wrapperClassName="pageContent"
            //   BreadcrumbList={bcList}
            // >
            <div>
                <THeader />
                <div style={{ padding: 45 }}>
                    <List
                      grid={{
                        gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,
                        }}
                      dataSource={data}
                      renderItem={item => (
                        <List.Item>
                            <Card title={item.title}>
                                <a href={item.url} target="_blank">
                                    <img alt="这是图片" src={item.img} style={{ width: '100%' }} />
                                </a>
                            </Card>
                        </List.Item>
                        )}
                    />
                </div>
            </div>
            // </PageHeaderLayout>
        )
    }
}
