import {
  createAction,
} from 'redux-actions'
import {
    mtrlloss
} from 'api'
import {
  createAjaxAction,
  fakeAjaxAction,
} from 'utils'


/*获取模具列表*/
export const fetchMtrlLossCollate = !gconfig.isDemo_dev?createAjaxAction(
    mtrlloss.collate,
    createAction('request mtrl loss collate'),
    createAction('receive mtrl loss collate')
):fakeAjaxAction(
    mtrlloss.collate,
    createAction('request mtrl loss collate'),
    createAction('receive mtrl loss collate')
)
