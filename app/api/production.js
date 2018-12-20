import { ajax } from 'utils'

export const feeding = ajax.fetchJSONByPost( 'api/feeding' )

/* order api */
export const order_add = ajax.fetchJSONByPost( 'api/production/order/add' )
export const order_delete = ajax.fetchJSONByPost( 'api/production/order/delete' )
export const order_update = ajax.fetchJSONByPost( 'api/production/order/update' )
export const order_list = ajax.fetchJSONByPost( 'api/production/order/list' )

/* task api */
export const task_add = ajax.fetchJSONByPost( 'api/production/task/add' )
export const task_delete = ajax.fetchJSONByPost( 'api/production/task/delete' )
export const task_update = ajax.fetchJSONByPost( 'api/production/task/update' )
export const task_list = ajax.fetchJSONByPost( 'api/production/task/list' )

/* job api */
export const job_add = ajax.fetchJSONByPost( 'api/production/job/add' )
export const job_delete = ajax.fetchJSONByPost( 'api/production/job/delete' )
export const job_update = ajax.fetchJSONByPost( 'api/production/job/update' )
export const job_list = ajax.fetchJSONByPost( 'api/production/job/list' )

/* dist api */
export const dist_add = ajax.fetchJSONByPost( 'api/production/dist/add' )
export const dist_delete = ajax.fetchJSONByPost( 'api/production/dist/delete' )
export const dist_update = ajax.fetchJSONByPost( 'api/production/dist/update' )
export const dist_list = ajax.fetchJSONByPost( 'api/production/dist/list' )
