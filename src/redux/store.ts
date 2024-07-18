import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { appSlice, carInsuranceSlice, customerDetailsSlice } from './slices'
import { commonApi } from './api/commonApi'

const reducer = combineReducers({
	[carInsuranceSlice.reducerPath]: carInsuranceSlice.reducer,
	[customerDetailsSlice.reducerPath]: customerDetailsSlice.reducer,
	[appSlice.reducerPath]: appSlice.reducer,
	[commonApi.reducerPath]: commonApi.reducer
})

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(commonApi.middleware)
})

setupListeners(store.dispatch)
