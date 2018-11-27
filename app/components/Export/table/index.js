import React, {Component} from 'react';
import TableExport from 'tableexport';
// import styles from 'style-loader!less-loader!css-loader?modules=false./index.less';
import styles from './index.less'
export default class tableExport extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: props.title
        }
    }

    componentWillMount() {}

    componentDidMount() {}

    handleChange() {}

    export() {
        let tableDom = this._tableBox
            .getElementsByClassName("ant-table-body")[0];
        let btnWrap = this._btn;
        const btn = TableExport(tableDom.children[0]);
        let children = btn.selectors[0].children[0];
        let childNodes = children.getElementsByTagName('button');
        btnWrap.innerHTML='';
        childNodes[0].innerHTML = "xlsx";
        childNodes[1].innerHTML = "csv";
        childNodes[2].innerHTML = "txt";
        btnWrap.appendChild(children);
    }

    render() {
        const {children} = this.props;
        return (
            <div className={styles.ep_wrap}>
                <div className={styles.btn_wrap}>
                    导出：<div className={styles.ep_btn} ref={_btn=>this._btn=_btn}></div>
                </div>
                <div className={styles.ep_table_box} ref={_tableBox=>this._tableBox=_tableBox} >
                    {children}
                </div>
            </div>
        )
    }
}
