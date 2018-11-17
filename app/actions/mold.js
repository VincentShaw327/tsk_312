import {
  createAction,
} from 'redux-actions'
import {
    mold
} from 'api'
import {
  createAjaxAction,
  fakeAjaxAction,
} from 'utils'


/*获取模具型号列表*/
export const f_mold_model = !gconfig.isDemo_dev?createAjaxAction(
    mold.mold_model_list,
    createAction('request mold model list'),
    createAction('receive mold model list')
):fakeAjaxAction(
    mold.mold_model_list,
    createAction('request mold model list'),
    createAction('receive mold model list'),
)
/*添加模具型号*/
export const add_mold_model = !gconfig.isDemo_dev?createAjaxAction(
    mold.mold_model_add,
    null,
    createAction('success add mold model')
):fakeAjaxAction(
    mold.mold_model_add,
    null,
    createAction('success add mold model'),
)
/*修改模具型号*/
export const update_mold_model = !gconfig.isDemo_dev ? createAjaxAction(
    mold.mold_model_update,
    null,
    createAction('success update mold model')
) : fakeAjaxAction(
    mold.mold_model_update,
    null,
    createAction('success update mold model'),
)
/*删除模具型号*/
export const delete_mold_model = !gconfig.isDemo_dev ? createAjaxAction(
    mold.mold_model_delete,
    null,
    createAction('success delete mold model')
) : fakeAjaxAction(
    mold.mold_model_delete,
    null,
    createAction('success delete mold model'),
)



/*获取模具视图*/
export const f_mold_view = !gconfig.isDemo_dev?createAjaxAction(
    mold.mold_view,
    createAction('request mold view'),
    createAction('receive mold view')
):fakeAjaxAction(
    mold.mold_view,
    createAction('request mold view'),
    createAction('receive mold view')
)
/*获取模具型号，为了添加实例下拉菜单用*/
export const f_mold_model_foradd = !gconfig.isDemo_dev?createAjaxAction(
    mold.mold_model_list,
    null,
    createAction('receive mold model for add')
):fakeAjaxAction(
    mold.mold_model_list,
    null,
    createAction('receive mold model for add')
)
/*添加模具实例*/
export const add_mold_instance = !gconfig.isDemo_dev?createAjaxAction(
    mold.mold_instance_add,
    null,
    createAction('success add mold instance')
):fakeAjaxAction(
    mold.mold_instance_add,
    null,
    createAction('success add mold instance')
)
/*编辑模具实例*/
export const update_mold_instance = !gconfig.isDemo_dev?createAjaxAction(
    mold.mold_instance_update,
    null,
    createAction('success update mold instance')
):fakeAjaxAction(
    mold.mold_instance_update,
    null,
    createAction('success update mold instance')
)
/*删除模具实例*/
export const delete_mold_instance = !gconfig.isDemo_dev?createAjaxAction(
    mold.mold_instance_delete,
    null,
    createAction('success delete mold instance')
):fakeAjaxAction(
    mold.mold_instance_delete,
    null,
    createAction('success delete mold instance')
)



