/*
****************
*工作中心模块*/
export const TWorkCenterType={
    path:'/work/workCenter_type',
    component:() =>import(
        /* webpackChunkName: "centerType" */ 
        '../pages/TWork/centerType' )
}

export const TWorkCenter={
    path:'/work/workCenter',
    component:() =>import(
        /* webpackChunkName: "center" */ 
        '../pages/TWork/center' )
}
