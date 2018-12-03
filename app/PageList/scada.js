/*
****************
*车间监控模块 */

export const TWorkshopScada = {
    path: '/scada/punch',
    component: props => import( /* webpackChunkName: "TScadaWorkShop_Auto" */'../pages/TScada/TScadaWorkShop_Auto' ),
}
export default TWorkshopScada;
