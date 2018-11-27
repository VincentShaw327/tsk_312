//
export const DeviceType={
    path:'/device/type',
    component:() =>import(
        /* webpackChunkName: "devtype" */ 
        '../pages/device/type' 
        )
}
// 设备型号
export const TDeviceModel={
    path:'/device/model',
    component:() =>import( 
        /* webpackChunkName: "devmodel" */ 
        '../pages/device/model' )
}
// 设备品牌
export const DeviceBrand={
    path:'/device/brand',
    component:() =>import( 
        /* webpackChunkName: "devbrand" */ 
        '../pages/device/brand' )
}
// 设备列表
export const TDeviceList={
    path:'/device/instance',
    component:() =>import( 
        /* webpackChunkName: "devinstance" */ 
        '../pages/device/instance' )
}
// 设备保养记录
export const TDeviceMaintainHis={
    path:'/device/maintain_his',
    component:() =>import( 
        /* webpackChunkName: "maintain_his" */ 
        '../pages/device/maintain_his' )
}
