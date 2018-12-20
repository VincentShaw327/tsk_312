import {
    createAction,
} from 'redux-actions'
import {
    material,
} from 'api'
import {
    createAjaxAction,
    fakeAjaxAction,
} from 'utils'

/* 物料类别actions start */
export const category_list = createAjaxAction(
    material.category_list,
    createAction( 'request material category list' ),
    createAction( 'receive material category list' ),
)
export const category_add = createAjaxAction(
    material.category_add,
    null,
    createAction( 'success add material category' ),
)
export const category_update = createAjaxAction(
    material.category_update,
    null,
    createAction( 'success update material category' ),
)
export const category_delete = createAjaxAction(
    material.category_delete,
    null,
    createAction( 'success delete material category' ),
)


/* 物料类别actions start */
export const item_list = createAjaxAction(
    material.item_list,
    createAction( 'request material item list' ),
    createAction( 'receive material item list' ),
)
export const item_add = createAjaxAction(
    material.item_add,
    null,
    createAction( 'success add material item' ),
)
export const item_update = createAjaxAction(
    material.item_update,
    null,
    createAction( 'success update material item' ),
)
export const item_delete = createAjaxAction(
    material.item_delete,
    null,
    createAction( 'success delete material item' ),
)
