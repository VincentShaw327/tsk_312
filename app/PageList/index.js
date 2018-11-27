
// import{
//     TFactoryType,
//     TWorkShopType,
//     TMaterialType,
//     TDeviceType,
//     // TWorkCenterType,
//     TAlarmType,
//     TDefectiveType
// }from './basic'

import * as scada  from './scada'
import * as production  from './production'
import * as mould  from './mould'
import * as materials  from './materials'
import * as device  from './device'
import * as process  from './process'
import * as work  from './work'
import * as mtrlloss  from './mtrlloss'
import * as quality  from './quality'
import * as maintain  from './maintain'
import * as setting  from './setting'
import * as report  from './report'

/* export{
    TWorkshopScada,
    production
} */
export default Object.assign(
    production,
    scada,
    mould, 
    materials, 
    device, 
    process,
    report,
    work,
    mtrlloss,
    quality,
    maintain,
    setting
)