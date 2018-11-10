import React, {Component} from 'react';
import TableExport from 'tableexport';
import './index.less'
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
            <div className="ep-wrap">
                <div className="btn-wrap">
                    导出：<div className="ep-btn" ref={_btn=>this._btn=_btn}></div>
                </div>
                <div className="ep-table-box" ref={_tableBox=>this._tableBox=_tableBox} >
                    {children}
                </div>
            </div>
        )
    }
}
