import * as t from '../types'

export const counterIncrement = () => ({ type: t.COUNTER_INCREMENT});
export const counterDecrement = () => ({ type: t.COUNTER_DECREMENT});
export const dataLoaded = () => ({ type: t.DATA_LOADED});
export const loginUser = (data) => ({ type: t.LOGIN_USER,payload:data});
export const logoutUser = () => ({ type: t.LOGOUT_USER});
export const updateWatchlist = (data) => ({ type: t.UPDATE_WATCHLIST,payload:data});
