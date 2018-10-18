/*
**生产报表模块
*/


export const DevRunTimeReport={
    path:'/dev_run_time',
    component:( location, cb ) => {
        require.ensure( [], ( require ) => {
            cb( null, require( '../../pages/TReport/DevRunRecord' )
                .default )
        }, 'DevRunTimeReport' )
    }
}


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

export const STOEE={
    path:'/stoee',
    component:( location, cb ) => {
        require.ensure( [], ( require ) => {
            cb( null, require( '../../pages/TReport/STOEE' )
                .default )
        }, 'STOEE' )
    }
}

export const StampingFreq={
    path:'/stampingFreq',
    component:( location, cb ) => {
        require.ensure( [], ( require ) => {
            cb( null, require( '../../pages/TReport/StampingFreq' )
                .default )
        }, 'stampingFreq' )
    }
}
export const DowntimeMon={
    path:'/DowntimeMon',
    component:( location, cb ) => {
        require.ensure( [], ( require ) => {
            cb( null, require( '../../pages/TReport/DowntimeMon' )
                .default )
        }, 'DowntimeMon' )
    }
}

export const DowntimeWeek={
    path:'/DowntimeWeek',
    component:( location, cb ) => {
        require.ensure( [], ( require ) => {
            cb( null, require( '../../pages/TReport/DowntimeWeek' )
                .default )
        }, 'DowntimeWeek' )
    }
}
