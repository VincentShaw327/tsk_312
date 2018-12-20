import {
    createAction,
} from 'redux-actions'
import {
    production,
} from 'api'
import {
    createAjaxAction,
    fakeAjaxAction,
} from 'utils'


/* 请求 */
export const requestOrderList = createAction( 'request order list' );
export const recevieOrderList = createAction( 'receive order list' );
export const OrderList = !gconfig.isDemo_dev ? createAjaxAction(
    production.order_list,
    requestOrderList,
    recevieOrderList,
) : fakeAjaxAction(
    production.order_list,
    requestOrderList,
    recevieOrderList,
)
export const order_add = createAjaxAction(
    production.order_add,
    null,
    createAction( 'success add order' ),
)
export const order_update = createAjaxAction(
    production.order_update,
    null,
    createAction( 'success update order' ),
)
export const order_delete = createAjaxAction(
    production.order_delete,
    null,
    createAction( 'success delete order' ),
)


/* 请求 */
export const requestTaskList = createAction( 'request task list' );
export const recevieTaskList = createAction( 'receive task list' );
export const TaskList = !gconfig.isDemo_dev ? createAjaxAction(
    production.task_list,
    requestTaskList,
    recevieTaskList,
) : fakeAjaxAction(
    production.task_list,
    requestTaskList,
    recevieTaskList,
)
export const task_add = createAjaxAction(
    production.task_add,
    null,
    createAction( 'success add task' ),
)
export const task_update = createAjaxAction(
    production.task_update,
    null,
    createAction( 'success update task' ),
)
export const task_delete = createAjaxAction(
    production.task_delete,
    null,
    createAction( 'success delete task' ),
)


/* 工单管理actions */
export const requestJobList = createAction( 'request job list' );
export const recevieJobList = createAction( 'receive job list' );
export const JobList = !gconfig.isDemo_dev ? createAjaxAction(
    production.job_list,
    requestJobList,
    recevieJobList,
) : fakeAjaxAction(
    production.job_list,
    requestJobList,
    recevieJobList,
)
export const job_add = createAjaxAction(
    production.job_add,
    null,
    createAction( 'success add job' ),
)
export const job_update = createAjaxAction(
    production.job_update,
    null,
    createAction( 'success update job' ),
)
export const job_delete = createAjaxAction(
    production.job_delete,
    null,
    createAction( 'success delete job' ),
)

/* 派工单管理actions */
export const requestDistList = createAction( 'request dist list' );
export const recevieDistList = createAction( 'receive dist list' );
export const dist_list = !gconfig.isDemo_dev ? createAjaxAction(
    production.dist_list,
    requestDistList,
    recevieDistList,
) : fakeAjaxAction(
    production.dist_list,
    requestDistList,
    recevieDistList,
)
export const dist_add = createAjaxAction(
    production.dist_add,
    null,
    createAction( 'success add dist' ),
)
export const dist_update = createAjaxAction(
    production.dist_update,
    null,
    createAction( 'success update dist' ),
)
export const dist_delete = createAjaxAction(
    production.dist_delete,
    null,
    createAction( 'success delete dist' ),
)


/* 投料计划 */
export const fetchFeedingList = !gconfig.isDemo_dev ? createAjaxAction(
    production.feeding,
    createAction( 'request feeding list' ),
    createAction( 'receive feeding list' ),
) : fakeAjaxAction(
    production.feeding,
    createAction( 'request feeding list' ),
    createAction( 'receive feeding list' ),
)
