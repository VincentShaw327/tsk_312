/**
 *这是设备列表页
 *添加日期:2017.12.06
 *添加人:shaw
 **/
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PageHeaderLayout from '../../base/PageHeaderLayout';
import List from './product'

export default class ProductModel extends Component {

   constructor( props ) {
       super( props )
       this.state = {
           tableDataList:[],
           updateFromItem:{},
           total:0,
           current:1,
           pageSize:10,
           UModalShow:false,
           loading:true,
       }
       this.url= '/api/TProduct/product_model';
   }

   render() {

       const config=()=>(<div>子路由测试</div>)

       return (
         <PageHeaderLayout
           title="产品型号"
           wrapperClassName="pageContent"
        //    action={children?action:''}
        //    BreadcrumbList={Breadcrumb.BCList}
           >
           {/* <Switch> */}
               <Route
                   path='/'
                   component={List}
                   //    render={}
               />
               <Route
                   path='/configuration'
                   component={config}
               />
           {/* </Switch> */}
         </PageHeaderLayout>
       )
   }
}
