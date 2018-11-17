//设备维护
export const maintain={
    path:'/dev_maintain_fun',
    component:() =>import( '../../pages/TMaintain/MaintainPlan' )
}

export const maintainDetail={
    path:'/dev_maintain_detail',
    component:() =>import( '../../pages/TMaintain/maintainWayDetail' )
}

export const TMaintainRecord={
    path:'/dev_maintain_his',
    component:() =>import( '../../pages/TMaintain/TMaintainHistoryList' )
}
