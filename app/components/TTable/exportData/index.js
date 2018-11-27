import React, { PureComponent, Fragment } from 'react';
import { Table, Alert } from 'antd';
import TableExport from 'tableexport';
import styles from './index.less';


export default class SimpleTable extends PureComponent {
  constructor(props) {
    super(props);
    const { columns } = props;

    this.state = {
    };
  }

  componentWillReceiveProps(nextProps) {

  }

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

  handleRowSelectChange=(selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }

  render() {
    const { selectedRowKeys, needTotalList } = this.state;
    const {expandedRowRender, data: { list, pagination }, loading, columns,selectable,bordered,size='middle',children } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const rowSelection = {
      // selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
        // name:record.name
      }),
    };

    return (
      <div className={styles.ep_wrap}>
        <div className={styles.operator}>
          <div className={styles.children}>
            {this.props.render}
          </div>
          <div className={styles.btn_wrap}>
              导出：<div className={styles.ep_btn} ref={_btn=>this._btn=_btn}></div>
          </div>
        </div>
        <div className={styles.ep_table_box} ref={_tableBox=>this._tableBox=_tableBox} >
          <Table
            expandedRowRender={expandedRowRender}
            // rowSelection={rowSelection}
            rowSelection={selectable?rowSelection:null}
            loading={loading}
            rowKey={record => record.key}
            dataSource={list}
            columns={columns}
            pagination={paginationProps}
            bordered={bordered}
            size={size}
            onChange={this.handleTableChange}
          />
        </div>
      </div>
    );
  }
}

// export default SimpleTable;
