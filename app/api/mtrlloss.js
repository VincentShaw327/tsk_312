import { ajax } from 'utils'

export const collate = ajax.fetchJSONByPost( 'api/mtrlloss/collate' )
export const month = ajax.fetchJSONByPost( 'api/mtrlloss/month' )
export const week = ajax.fetchJSONByPost( 'api/mtrlloss/week' )
export const tend = ajax.fetchJSONByPost( 'api/mtrlloss/tend' )
