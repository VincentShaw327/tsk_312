//
export const TWorkShopList={
    path:'/TOrg_workshop',
    component:( location, cb ) => {
        require.ensure( [], ( require ) => {
            cb( null, require( '../../pages/TFactory/TWorkShopList' )
                .default )
        }, 'TWorkShopList' )
    }
}

//
export const TWorkCenter={
    path:'/TOrg_WorkCenter',
    component:( location, cb ) => {
        require.ensure( [], ( require ) => {
            cb( null, require( '../../pages/TFactory/TWorkCenter' )
                .default )
        }, 'TWorkCenter' )
    },
    children:{
        path:'/TWorkCenterDetail',
        component:( location, cb ) => {
            require.ensure( [], ( require ) => {
                cb( null, require( '../../pages/TFactory/TWorkCenterDetail' )
                    .default )
            }, 'TWorkCenterDetail' )
        }
    }
}
