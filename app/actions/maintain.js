import {
  createAction,
} from 'redux-actions'
import {
    maintain
} from 'api'
import {
  createAjaxAction,
  fakeAjaxAction,
} from 'utils'


/**/
export const fetchMaintainWay = !gconfig.isDemo_dev?createAjaxAction(
    maintain.maintain,
    createAction('request maintain program'),
    createAction('receive maintain program')
):fakeAjaxAction(
    maintain.maintain,
    createAction('request maintain program'),
    createAction('receive maintain program')
)


/*设备维保历史*/
export const fetchMaintainHistory = !gconfig.isDemo_dev?createAjaxAction(
    maintain.maintain,
    createAction('request maintain history'),
    createAction('receive maintain history')
):fakeAjaxAction(
    maintain.maintain,
    createAction('request maintain history'),
    createAction('receive maintain history')
)
