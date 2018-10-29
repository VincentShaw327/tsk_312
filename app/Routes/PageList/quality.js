/*
****************
*品质管理模块*/
export const TQuality={
    path:'/quality_record',
    component:( location, cb ) => {
        require.ensure( [], ( require ) => {
            cb( null, require( '../../pages/TQuality/quality' )
                .default )
        }, 'TQuality' )
    }
}
