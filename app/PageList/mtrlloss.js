/*
**原料损耗分析
*/
export const MtrlLossCol={
    path:'/mtrl_loss/material_loss_collate',
    component:() =>import( 
        /* webpackChunkName: "MLossCollate" */ 
        '../pages/MtrlLoss/MLossCollate' )
}

export const MtrlLossTend={
    path:'/mtrl_loss/material_loss_tend',
    component:() =>import( 
        /* webpackChunkName: "MLossTend" */ 
        '../pages/MtrlLoss/MLossTend' )
}

export const MtrlLossMon={
    path:'/mtrl_loss/material_loss_mon',
    component:() =>import( 
        /* webpackChunkName: "MLossMon" */ 
        '../pages/MtrlLoss/MLossMon' )
}

export const MtrlLossWeek={
    path:'/mtrl_loss/material_loss_week',
    component:() =>import( 
        /* webpackChunkName: "MLossWeek" */ 
        '../pages/MtrlLoss/MLossWeek' )
}
