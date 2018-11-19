/*
**生产管理模块
*/

export const order={
    path:'/production/order',
    component:(props)=>import('../pages/TManufacture/order')
}
export const lot_01={
    path:'/production/lot_01',
    component:()=>import('../pages/TManufacture/TManufactureTaskDispatch')
}

export const job={
    path:'/production/job',
    component:()=>import('../pages/TManufacture/job')
}

export const order_detail={
    path:'/production/order/workorder_detail',
    component:()=>import('../pages/TManufacture/workOrderDetail')
}

export const Feeding={
    path:'/production/feeding',
    component:()=>import('../pages/TManufacture/feeding')
}


/* children:[
    {
        path: '/config',
        component: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('../pages/TProcess/configuration')
                    .default)
            }, 'config')
        }
    },
    {
        path: '/edit',
        component: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('../pages/TProcess/edit')
                    .default)
            }, 'config')
        }
    }
] */
