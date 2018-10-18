/*
****************
*工作中心模块*/
export const TWorkCenterType={
    path:'/workCenter_type',
    component:( location, cb ) => {
        require.ensure( [], ( require ) => {
            cb( null, require( '../../pages/TWork/centerType' )
                .default )
        }, 'TWorkCenterType' )
    }
}

export const TWorkCenter={
    path:'/workCenter',
    component:( location, cb ) => {
        require.ensure( [], ( require ) => {
            cb( null, require( '../../pages/TWork/center' )
                .default )
        }, 'TWorkCenter' )
    }
}
