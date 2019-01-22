/*
****************
*车间监控模块 */

export const TWorkshopScada = {
    path: '/scada/punch',
    component: props => import( /* webpackChunkName: "TScadaWorkShop_Auto" */'../pages/TScada/TScadaWorkShop_Auto' ),
}
export const soot = {
    path: '/scada/soot',
    component: props => import( /* webpackChunkName: "TScadaWorkShop_Auto" */'../pages/TScada/scada_soot' ),
}
export default TWorkshopScada;
