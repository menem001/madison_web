import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { commonApi } from './api/commonApi'
import { appSlice, carInsuranceSlice, customerDetailsSlice } from './slices'

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

export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch)
