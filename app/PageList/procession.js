export const CraftsList = {
    path: '/process/crafts',
    component: () => import( /* webpackChunkName: "TCraftsList" */'../pages/procession/TCraftsList' ),
}

export const StampingSet = {
    path: '/process/stamping_set',
    component: () => import( /* webpackChunkName: "stampingSetting" */'../pages/procession/stampingSetting' ),
}

export const workcenter = {
    path: '/process/workcenter',
    component: () => import( /* webpackChunkName: "TWorkCenter" */'../pages/TFactory/TWorkCenter' ),
}


export const route = {
    path: '/procession/route',
    component: () => import( /* webpackChunkName: "TWorkCenterType" */'../pages/procession/route' ),
}

export const ConfigList = {
    path: '/procession/configlist',
    component: () => import( /* webpackChunkName: "configList" */'../pages/procession/configlist' ),
}
// export const Configura={
//     path:'/process/product/configuration',
//     component:()=>import('../pages/TProduct/configuration')
// }

/* export const Edit={
    path:'/process/product/configura',
    component:()=>import('../pages/TProduct/configuration')
} */
