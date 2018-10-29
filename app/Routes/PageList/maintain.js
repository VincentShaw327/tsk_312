//设备维护
export const TMaintain={
    path:'/dev_maintain_fun',
    component:( location, cb ) => {
        require.ensure( [], ( require ) => {
            cb( null, require( '../../pages/TMaintain/MaintainPlan' )
                .default )
        }, 'TMaintain' )
    },
    children:{
        path:'/dev_maintain_detail',
        component:( location, cb ) => {
            require.ensure( [], ( require ) => {
                cb( null, require( '../../pages/TMaintain/maintainWayDetail' )
                    .default )
            }, 'TMaintainDetail' )
        },
    }
}

export const TMaintainRecord={
    path:'/dev_maintain_his',
    component:( location, cb ) => {
        require.ensure( [], ( require ) => {
            cb( null, require( '../../pages/TMaintain/TMaintainHistoryList' )
                .default )
        }, 'TMaintainRecord' )
    }
}
