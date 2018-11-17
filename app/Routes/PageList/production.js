/*
**生产管理模块
*/

export const order={
    path:'/manufacture/order',
    component:(props)=>import('../../pages/TManufacture/order')
}
export const lot_01={
    path:'/manufacture/lot_01',
    component:()=>import('../../pages/TManufacture/TManufactureTaskDispatch')
}

export const lot={
    path:'/manufacture/lot',
    component:()=>import('../../pages/TManufacture/workorder')
}

export const order_detail={
    path:'/manufacture/order/workorder_detail',
    component:()=>import('../../pages/TManufacture/workOrderDetail')
}

export const Feeding={
    path:'/manufacture/feeding',
    component:()=>import('../../pages/TManufacture/feeding')
}


/* children:[
    {
        path: '/config',
        component: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('../../pages/TProcess/configuration')
                    .default)
            }, 'config')
        }
    },
    {
        path: '/edit',
        component: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('../../pages/TProcess/edit')
                    .default)
            }, 'config')
        }
    }
] */
