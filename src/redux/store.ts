import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { appSlice, carInsuranceSlice, customerDetailsSlice } from './slices'
import { commonApi } from './api/commonApi'
import { motorSlice } from './slices/motor-detail.slice'
import { registrationApi } from './api/registrationApi'
import { premiumMotorSlice } from './slices/premium-motor-slice'

const reducer = combineReducers({
	[carInsuranceSlice.reducerPath]: carInsuranceSlice.reducer,
	[customerDetailsSlice.reducerPath]: customerDetailsSlice.reducer,
	[appSlice.reducerPath]: appSlice.reducer,
	[motorSlice.reducerPath]: motorSlice.reducer,
	[commonApi.reducerPath]: commonApi.reducer,
	[registrationApi.reducerPath]: registrationApi.reducer,
	[premiumMotorSlice.reducerPath]: premiumMotorSlice.reducer
})

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(commonApi.middleware, registrationApi.middleware)
})

setupListeners(store.dispatch)
