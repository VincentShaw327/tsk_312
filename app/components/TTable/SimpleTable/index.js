import React, { PureComponent, Fragment } from 'react';
import { Table, Alert } from 'antd';
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

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }

  render() {
    const { selectedRowKeys, needTotalList } = this.state;
    const {expandedRowRender, data: { list, pagination }, loading, columns,isHaveSelect,bordered,size='middle' } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    return (
      <div className={styles.standardTable}>
        <Table
          expandedRowRender={expandedRowRender}
          // rowSelection={rowSelection}
          // rowSelection={isHaveSelect?rowSelection:null}
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
    );
  }
}

// export default SimpleTable;
