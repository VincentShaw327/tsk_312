export const CraftsList={
    path:'/process/crafts',
    component:()=>import( '../pages/TProcess/TCraftsList' )
}

export const StampingSet={
    path:'/process/stamping_set',
    component:()=>import( '../pages/TProcess/stampingSetting' )
}

export const Product={
    path:'/process/product',
    component:()=>import('../pages/TProduct/product')
}

export const workcenter={
    path:'/process/workcenter',
    component:()=>import('../pages/TFactory/TWorkCenter')
}

export const workcenterType={
    path:'/process/workcenter_type',
    component:()=>import('../pages/TFactory/TWorkCenterType')
}

// export const Configura={
//     path:'/process/product/configuration',
//     component:()=>import('../pages/TProduct/configuration')
// }

/* export const Edit={
    path:'/process/product/configura',
    component:()=>import('../pages/TProduct/configuration')
} */
