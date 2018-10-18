/*
**原料损耗分析
*/
export const MtrlLossCol={
    path:'/material_loss_collate',
    component:( location, cb ) => {
        require.ensure( [], ( require ) => {
            cb( null, require( '../../pages/MtrlLoss/MLossCollate' )
                .default )
        }, 'MtrlLossCol' )
    }
}

export const MtrlLossTend={
    path:'/material_loss_tend',
    component:( location, cb ) => {
        require.ensure( [], ( require ) => {
            cb( null, require( '../../pages/MtrlLoss/MLossTend' )
                .default )
        }, 'MtrlLossTend' )
    }
}

export const MtrlLossMon={
    path:'/material_loss_mon',
    component:( location, cb ) => {
        require.ensure( [], ( require ) => {
            cb( null, require( '../../pages/MtrlLoss/MLossMon' )
                .default )
        }, 'MtrlLossMon' )
    }
}

export const MtrlLossWeek={
    path:'/material_loss_week',
    component:( location, cb ) => {
        require.ensure( [], ( require ) => {
            cb( null, require( '../../pages/MtrlLoss/MLossWeek' )
                .default )
        }, 'MtrlLossWeek' )
    }
}
