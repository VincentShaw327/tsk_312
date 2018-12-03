/*
**生产管理模块
*/

export const order = {
    path: '/production/order',
    component: props => import( /* webpackChunkName: "order" */ '../pages/production/order' ),
}
export const task = {
    path: '/production/task',
    component: props => import( /* webpackChunkName: "task" */ '../pages/production/task' ),
}
export const lot_01 = {
    path: '/production/lot_01',
    component: () => import( /* webpackChunkName: "lot" */ '../pages/production/Dispatch' ),
}

export const job = {
    path: '/production/job',
    component: () => import( /* webpackChunkName: "job" */ '../pages/production/job' ),
}

export const order_detail = {
    path: '/production/order/workorder_detail',
    component: () => import( /* webpackChunkName: "workOrderDetail" */ '../pages/production/workOrderDetail' ),
}

export const Feeding = {
    path: '/production/feeding',
    component: () => import( /* webpackChunkName: "feeding" */ '../pages/production/feeding' ),
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
