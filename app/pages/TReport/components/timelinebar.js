import React, { Component } from 'react';
import styles from './timeLine.less';
import { BarTimeLine } from 'components/BCComponents/Charts';

export default class timelinebar extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            title: props.title,
        }
    }

    componentDidMount(){
    }

    render() {
        // const{data,lineLabelList}=this.props;

        let data = [
            {
                "task": "ST-01",
                "startTime": "2018-10-16 00:00:12",
                "endTime": "2018-10-16 07:30:00",
                "status": 0,
                "field":"离线",
            }, {
                "task": "ST-01",
                "startTime": "2018-10-16 07:31:10",
                "endTime": "2018-10-16 09:19:10",
                "status": 1,
                "field":"运行",
            }, {
                "task": "ST-01",
                "startTime": "2018-10-16 09:19:10",
                "endTime": "2018-10-16 09:56:10",
                "status": 1,
                "field":"待机",
            },  {
                "task": "ST-01",
                "startTime": "2018-10-16 09:56:10",
                "endTime": "2018-10-16 10:01:00",
                "status": 0,
                "field":"告警",
            }, {
                "task": "ST-01",
                "startTime": "2018-10-16 10:01:00",
                "endTime": "2018-10-16 11:00:20",
                "status": 1,
                "field":"运行",
            }, {
                "task": "ST-01",
                "startTime": "2018-10-16 11:00:20",
                "endTime": "2018-10-16 12:31:20",
                "status": 1,
                "field":"离线",
            }, {
                "task": "ST-01",
                "startTime": "2018-10-16 12:31:20",
                "endTime": "2018-10-16 18:00:20",
                "status": 1,
                "field":"运行",
            }, {
                "task": "ST-01",
                "startTime": "2018-10-16 18:00:20",
                "endTime": "2018-10-16 00:00:20",
                "status": 1,
                "field":"离线",
            }, {
                "task": "ST-02",
                "startTime": "2018-10-16 12:31:20",
                "endTime": "2018-10-16 06:18:50",
                "status": 0,
                "field":"离线",
            }, {
                "task": "ST-03",
                "startTime": "2018-10-16 02:18:50",
                "endTime": "2018-10-16 03:16:38",
                "status": 0,
                "field":"离线",
            }, {
                "task": "ST-04",
                "startTime": "2018-10-16 02:19:48",
                "endTime": "2018-10-16 02:21:57",
                "status": 0,
                "field":"离线",
            }, {
                "task": "ST-05",
                "startTime": "2018-10-16 03:16:38",
                "endTime": "2018-10-16 03:19:38",
                "status": 1,
                "field":"离线",
            }, {
                "task": "ST-06",
                "startTime": "2018-10-16 03:19:38",
                "endTime": "2018-10-16 03:27:49",
                "status": 0,
                "field":"离线",
            }, {
                "task": "ST-07",
                "startTime": "2018-10-16 07:29:37",
                "endTime": "2018-10-16 07:33:01",
                "status": 0,
                "field":"离线",
            }, {
                "task": "ST-08",
                "startTime": "2018-10-16 03:27:49",
                "endTime": "2018-10-16 04:26:05",
                "status": 0,
                "field":"离线",
            }, {
                "task": "ST-09",
                "startTime": "2018-10-16 04:26:05",
                "endTime": "2018-10-16 06:06:36",
                "status": 0,
                "field":"离线",
            }, {
                "task": "ST-10",
                "startTime": "2018-10-16 06:06:36",
                "endTime": "2018-10-16 06:15:15",
                "status": 0,
                "field":"离线",
            }, {
                "task": "ST-11",
                "startTime": "2018-10-16 03:27:49",
                "endTime": "2018-10-16 03:34:50",
                "status": 0,
                "field":"离线",
            }
        ];
        data.reverse();
        let values = ['运行成功', '运行失败','sf','sdfs'];
        let colorsValues = ['离线', '待机','运行','警告'];
        let colors=['#6a6a6a','#0acb2e','#120dee','#e31111'];
        // let time=
        return (
            <div>
                <BarTimeLine
                    height={900}
                    data={data}
                    colors={colors}
                    // values={values}
                    values={colorsValues}
                 />
            </div>
        )
    }
}
