import React, { Component } from 'react'
import { Tree, Card } from 'antd';
import styles from './index.less';

const { TreeNode } = Tree;

export default class Config extends React.Component {
  onSelect = ( selectedKeys, info ) => {
    // console.log( 'selected', selectedKeys, info );
  }

  render() {
    return (
    <Card>
      <Tree
        showLine
        defaultExpandedKeys={['0-0-0']}
        onSelect={this.onSelect}
      >
        <TreeNode title="工序 1" key="0-0">
          <TreeNode
            key="0-0-0"
            title={(
                <div className={styles.treeTitle}>
                    <span className={styles.title}>原料</span>
                    <span className={styles.btn}>添加</span>
                </div>
            )}
          >
            <TreeNode
              key="0-0-0-0"
              title={(
                <div className={styles.childTitle}>
                    <span className={styles.title}>原料1</span>
                    <span className={styles.btn}>删除</span>
                </div>
              )}
            />
            <TreeNode title="原料2" key="0-0-0-1" />
            <TreeNode title="原料3" key="0-0-0-2" />
          </TreeNode>
          <TreeNode title="产品" key="0-0-1">
            <TreeNode title="leaf" key="0-0-1-0" />
          </TreeNode>
          <TreeNode title="设备" key="0-0-2">
            <TreeNode title="leaf" key="0-0-2-0" />
            <TreeNode title="leaf" key="0-0-2-1" />
          </TreeNode>
          <TreeNode title="模具" key="0-0-3">
            <TreeNode title="leaf" key="0-0-2-0" />
            <TreeNode title="leaf" key="0-0-2-1" />
          </TreeNode>
        </TreeNode>
      </Tree>
    </Card>
    );
  }
}
