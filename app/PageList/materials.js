/*
**物料管理
*/
export const MaterialModel={
    path:'/material/material_model',
    component:() =>import( 
        /* webpackChunkName: "TMaterialModel" */ 
        '../pages/TWms/TMaterialModel' )
}

export const ProductModel={
    path:'/material/product_model',
    component:() =>import( 
        /* webpackChunkName: "TProductModel" */ 
        '../pages/TProduct/TProductModel' )
}

export const BomManagement={
    path:'/material/bom_list',
    component:() =>import( 
        /* webpackChunkName: "TBomList" */ 
        '../pages/TBom/TBomList' )
}
