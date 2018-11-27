import {
  routerReducer as routing,
} from 'react-router-redux'
import {
  combineReducers,
} from 'redux'


import tabListResult from './tabList'
// house
import {
  houseCheckSearchResult,
  houseCheckSearchQuery,
  houseDetailResult,
} from './house'

import {
  loginResponse,Breadcrumb
} from './common'
// basicData
import {
  basic_type_data,
} from './basic_data'

// bom
import {
  BomList,
  bomItem_list_data
} from './bom'
// bom
import {
  process,
  processItem,
  workcenter,
  workcenterType,
  MockMqttData,
  // StampingSet
  // processItemListData
} from './crafts'
// bom
import {
  device,
  deviceModel,
  deviceType,
  DevCheck,
  deviceBrand
} from './device'
// bom
import {
  workshop,
  workshopType,
  factoryType
} from './factory'
// bom
import {
  iot_list_data
} from './Iot'
// bom
import {
  productOrder,
  productTask,
  productJob,
  Feeding
} from './production'
// bom
import {
  moldList,
  moldModel
} from './mold'
// bom
import {
  productModel,
} from './product'
// bom
import {
  productReportRata,
  deviceReportData,
  punchFreq,

} from './report'
// bom
import {
  UserAccount,
  UserGroup,
  UserAuth
} from './user'
// bom
import {
  warning_list_data,
  warning_item_data,
} from './warning'
// bom
import {
  mtrlModel,
  mtrlType,
} from './wms'

import{
  MtrlLossCollate
} from './mtrlloss'

import {
    Inspect
}from './quality'

import {
    Maintain
}from './maintain'

const rootReducer = combineReducers( {
    routing,
    config: ( state = {} ) => state,
    tabListResult,

    loginResponse,
    Breadcrumb,

    houseCheckSearchResult,
    houseCheckSearchQuery,
    houseDetailResult,

    basic_type_data,

    BomList,
    bomItem_list_data,
    process,
    processItem,
    workcenter,
    workcenterType,
    MockMqttData,
    // StampingSet,

    device,
    deviceModel,
    deviceType,
    DevCheck,
    deviceBrand,
    
    workshop,
    workshopType,
    factoryType,
    iot_list_data,
    productOrder,
    productTask,
    productJob,
    Feeding,

    moldList,
    moldModel,
    productModel,
    productReportRata,
    deviceReportData,
    punchFreq,
    UserAccount,
    UserGroup,
    UserAuth,
    warning_list_data,
    warning_item_data,
    mtrlModel,
    mtrlType,

    MtrlLossCollate,

    Inspect,

    Maintain
} );

export default rootReducer;
