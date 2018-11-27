export const MoldManagement={
    path:'/mould/mould_model',
    component:()=>import( 
        /* webpackChunkName: "TMouldModel" */ 
        '../pages/TMould/TMouldModel' )
}

export const MoldList={
    path:'/mould/mould_list',
    component:()=>import( 
        /* webpackChunkName: "TMouldList" */ 
        '../pages/TMould/TMouldList' )
}

export const mouldDetail={
    path:'/mould/mould_detail',
    component:()=>import( 
        /* webpackChunkName: "mouldDetail" */ 
        '../pages/TMould/mouldDetail' )
}

export const RackList={
    path:'/mould/rack_list',
    component:()=>import( 
        /* webpackChunkName: "list" */ 
        '../pages/TMould/rack/list' )
}
export const RackBin={
    path:'/mould/rack_bin',
    component:()=>import( 
        /* webpackChunkName: "bin" */ 
        '../pages/TMould/rack/bin' )
}

