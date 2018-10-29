
import{
    TFactoryType,
    TWorkShopType,
    TMaterialType,
    TDeviceType,
    // TWorkCenterType,
    TAlarmType,
    TDefectiveType
}from './basic'

import{
    DevStateReport,
    ProductionTracking,
    ProductionReport,
    TOEEAnalysis,
    STOEE,
    StampingFreq,
    DowntimeMon,
    DowntimeWeek,
    DevRunTimeReport,
}from './report'

import{
    TWorkshop1,
    TWorkshop2,
    TWorkshop3,
    TWorkshop4,
    TWorkshopScada
}from './scada'

import {
    TManufactureTask,
    TaskDispatch,
    TaskMonitor,
    // OrderDetail
    Feeding
}from './production'

import {
    TWorkShopList,
    // TWorkCenter
}from './organization'

import {
    MoldManagement,
    MoldList,
    // MoldDetail
}from './mould'

import {
    MaterialModel,
    ProductModel,
    BomManagement
}from './materials'

import {
    userList,
    AuthList,
    AuthGroup
}from './setting'

import {
    ProcessList,
    CraftsList,
    StampingSet
}from './process'

import {
    // TDeviceType,
    TDeviceModel,
    TDeviceList,
    TDeviceMaintainHis
}from './device'

import {
    TWorkCenterType,
    TWorkCenter,
}from './work'

import {
    MtrlLossCol,
    MtrlLossTend,
    MtrlLossMon,
    MtrlLossWeek
}from './mtrlloss'

import{
    TQuality
}from './quality'

import {
    TMaintain,
    TMaintainRecord
}from './maintain'

export{
    TWorkShopList,
    // TWorkCenter,

    TFactoryType,
    TWorkShopType,
    TMaterialType,
    // TDeviceType,
    // TWorkCenterType,
    TAlarmType,
    TDefectiveType,

    DevStateReport,
    ProductionTracking,
    ProductionReport,
    TOEEAnalysis,
    STOEE,
    StampingFreq,
    DowntimeMon,
    DowntimeWeek,
    DevRunTimeReport,

    TWorkshop1,
    TWorkshop2,
    TWorkshop3,
    TWorkshop4,
    TWorkshopScada,

    TManufactureTask,
    TaskDispatch,
    TaskMonitor,
    // OrderDetail,
    Feeding,

    MoldManagement,
    MoldList,
    // MoldDetail,

    MaterialModel,
    ProductModel,
    BomManagement,

    userList,
    AuthList,
    AuthGroup,

    ProcessList,
    CraftsList,
    StampingSet,

    TDeviceType,
    TDeviceModel,
    TDeviceList,
    TDeviceMaintainHis,

    MtrlLossCol,
    MtrlLossTend,
    MtrlLossMon,
    MtrlLossWeek,

    TWorkCenterType,
    TWorkCenter,

    TQuality,

    TMaintain,
    TMaintainRecord
}
