/*
**生产报表模块
*/


export const DevStateReport={
    path:'/dev_state_report',
    component:( location, cb ) => {
        require.ensure( [], ( require ) => {
            cb( null, require( '../../pages/TReport/TStateTimeOverview' )
                .default )
        }, 'DevStateReport' )
    }
}

export const ProductionTracking={
    path:'/production_tracking',
    component:( location, cb ) => {
        require.ensure( [], ( require ) => {
            cb( null, require( '../../pages/TReport/TLossTimeReport' )
                .default )
        }, 'ProductionTracking' )
    }
}

export const ProductionReport={
    path:'/production_report',
    component:( location, cb ) => {
        require.ensure( [], ( require ) => {
            cb( null, require( '../../pages/TReport/TProductionReport' )
                .default )
        }, 'ProductionReport' )
    }
}

export const TOEEAnalysis={
    path:'/oee_analysis_report',
    component:( location, cb ) => {
        require.ensure( [], ( require ) => {
            cb( null, require( '../../pages/TReport/TOEEAnalysis' )
                .default )
        }, 'TOEEAnalysis' )
    }
}
