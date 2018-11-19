//
export const DeviceType={
    path:'/TBas_Type_Dev',
    component:() =>import( '../pages/TBasicData/TDeviceType' )
}
// 设备型号
export const TDeviceModel={
    path:'/device/model',
    component:() =>import( '../pages/TDevice/TDeviceModel' )
}
// 设备列表
export const TDeviceList={
    path:'/device/instance',
    component:() =>import( '../pages/TDevice/TDeviceList' )
}
// 设备保养记录
export const TDeviceMaintainHis={
    path:'/device/maintain_his',
    component:() =>import( '../pages/TDevice/TMaintainHistoryList' )
}
