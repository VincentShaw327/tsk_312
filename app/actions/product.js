import {
    createAction,
} from 'redux-actions'
import {
    product,
} from 'api'
import {
    createAjaxAction,
    fakeAjaxAction,
} from 'utils'

/* 产品类别 start */
export const category_list = !gconfig.isDemo_dev ? createAjaxAction(
    product.category_list,
    createAction( 'request product category list' ),
    createAction( 'receive product category list' ),
) : fakeAjaxAction(
    product.category_list,
    createAction( 'request product category list' ),
    createAction( 'receive product category list' ),
)

export const category_add = createAjaxAction(
    product.category_add,
    null,
    createAction( 'success add product category' ),
);
export const category_update = createAjaxAction(
    product.category_update,
    null,
    createAction( 'success update product category' ),
);
export const category_delete = createAjaxAction(
    product.category_delete,
    null,
    createAction( 'success delete product category' ),
);
/* 产品类别 end */


/* 产品列表start */
export const model_list = !gconfig.isDemo_dev ? createAjaxAction(
    product.model_list,
    createAction( 'request product model list' ),
    createAction( 'receive product model list' ),
) : fakeAjaxAction(
    product.model_list,
    createAction( 'request product model list' ),
    createAction( 'receive product model list' ),
)

export const model_add = createAjaxAction(
    product.model_add,
    null,
    createAction( 'success add product model' ),
);
export const model_update = createAjaxAction(
    product.model_update,
    null,
    createAction( 'success update product model' ),
);
export const model_delete = createAjaxAction(
    product.model_delete,
    null,
    createAction( 'success delete product model' ),
);
