import {
  createAction,
} from 'redux-actions'
import {
  report
} from 'api'
import {
  createAjaxAction,
  fakeAjaxAction,
} from 'utils'

/*生产报表请求*/
export const requestProductReport = createAction('request product report  list');
export const recevieProductReport = createAction('receive product report  list');
export const fetchProductReport = !gconfig.isDemo_dev?createAjaxAction(
    report.product_report,
    requestProductReport,
    recevieProductReport
):fakeAjaxAction(
    report.product_report,
    requestProductReport,
    recevieProductReport
)


/*设备报表*/
export const requestDeviceReport = createAction('request device report  list');
export const recevieDeviceReport = createAction('receive device report  list');
export const fetchDeviceReport = !gconfig.isDemo_dev?createAjaxAction(
    report.device_report,
    requestDeviceReport,
    recevieDeviceReport
):fakeAjaxAction(
    report.device_report,
    requestDeviceReport,
    recevieDeviceReport
)

/*冲次统计*/
export const fetchPunchFreq = !gconfig.isDemo_dev?createAjaxAction(
    report.device_report,
    createAction('request punch freq list'),
    createAction('receive punch freq list')
):fakeAjaxAction(
    report.device_report,
    createAction('request punch freq list'),
    createAction('receive punch freq list')
)

/*月度停机统计*/
export const fetchDowntimeMon = !gconfig.isDemo_dev?createAjaxAction(
    report.device_report,
    createAction('request downtime month list'),
    createAction('receive downtime month  list')
):fakeAjaxAction(
    report.device_report,
    createAction('request downtime month  list'),
    createAction('receive downtime month  list')
)

/*一周统计*/
// export const fetchPunchFreq = !gconfig.isDemo_dev?createAjaxAction(
//     report.device_report,
//     createAction('request downtime week  list'),
//     createAction('receive  downtime week  list')
// ):fakeAjaxAction(
//     report.device_report,
//     createAction('request downtime week  list'),
//     createAction('receive  downtime week  list')
// )

/*oee*/
// export const fetchPunchFreq = !gconfig.isDemo_dev?createAjaxAction(
//     report.device_report,
//     createAction('request suote oee  list'),
//     createAction('receive  suote oee  list')
// ):fakeAjaxAction(
//     report.device_report,
//     createAction('request suote oee  list'),
//     createAction('receive  suote oee  list')
// )
