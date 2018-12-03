/*
**生产报表模块
*/


export const DevRunTimeReport = {
    path: '/report/dev_run_time',
    component: () => import( /* webpackChunkName: "DevRunRecord" */ '../pages/TReport/DevRunRecord' ),
}


export const DevStateReport = {
    path: '/report/dev_state_report',
    component: () => import( /* webpackChunkName: "TStateTimeOverview" */ '../pages/TReport/TStateTimeOverview' ),
}

export const ProductionTracking = {
    path: '/report/production_tracking',
    component: () => import( /* webpackChunkName: "TLossTimeReport" */ '../pages/TReport/TLossTimeReport' ),
}

export const ProductionReport = {
    path: '/report/production_report',
    component: () => import( /* webpackChunkName: "TProductionReport" */ '../pages/TReport/TProductionReport' ),
}

export const TOEEAnalysis = {
    path: '/report/oee_analysis_report',
    component: () => import( /* webpackChunkName: "TOEEAnalysis" */ '../pages/TReport/TOEEAnalysis' ),
}

export const STOEE = {
    path: '/report/stoee',
    component: () => import( /* webpackChunkName: "STOEE" */ '../pages/TReport/STOEE' ),
}

export const StampingFreq = {
    path: '/report/stampingFreq',
    component: () => import( /* webpackChunkName: "StampingFreq" */ '../pages/TReport/StampingFreq' ),
}
export const DowntimeMon = {
    path: '/report/DowntimeMon',
    component: () => import( /* webpackChunkName: "DowntimeMon" */ '../pages/TReport/DowntimeMon' ),
}

export const DowntimeWeek = {
    path: '/report/DowntimeWeek',
    component: () => import( /* webpackChunkName: "DowntimeWeek" */ '../pages/TReport/DowntimeWeek' ),
}
