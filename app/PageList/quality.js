/*
****************
*品质管理模块 */
export const TQuality = {
    path: '/quality/quality_record',
    component: () => import(
        /* webpackChunkName: "quality" */
        '../pages/TQuality/quality' ),
}
export default TQuality;
