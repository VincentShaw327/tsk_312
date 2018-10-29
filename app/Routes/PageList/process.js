
export const ProcessList={
    path:'/process',
    component:( location, cb ) => {
        require.ensure( [], ( require ) => {
            cb( null, require( '../../pages/TProcess/TProcessList' )
                .default )
        }, 'AuthList' )
    },
    /*children:{
        path:'/process_detail',
        component:( location, cb ) => {
            require.ensure( [], ( require ) => {
                cb( null, require( '../../pages/TProcess/TProcessDetail' )
                    .default )
            }, 'TProcessDetail' )
        }
    }*/
}

export const CraftsList={
    path:'/crafts',
    component:( location, cb ) => {
        require.ensure( [], ( require ) => {
            cb( null, require( '../../pages/TProcess/TCraftsList' )
                .default )
        }, 'AuthList' )
    }
}


export const StampingSet={
    path:'/stamping_set',
    component:( location, cb ) => {
        require.ensure( [], ( require ) => {
            cb( null, require( '../../pages/TProcess/stampingSetting' )
                .default )
        }, 'StampingSet' )
    }
}
