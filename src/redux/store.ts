import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { appSlice, carInsuranceSlice, customerDetailsSlice } from './slices'
import { commonApi } from './api/commonApi'
import { motorSlice } from './slices/motor-detail.slice'
import { registrationApi } from './api/registrationApi'
import { premiumMotorSlice } from './slices/premium-motor-slice'
import { whiteBookDetailsSlice } from './slices/whitebook-details-slice'
import { paymentApi } from './api/paymentApi'

// // Utility functions to save and load state from session storage
// function saveState(state: unknown) {
// 	try {
// 		const serializedState = JSON.stringify(state)

// 		if (typeof window !== 'undefined') {
// 			sessionStorage.setItem('reduxState', serializedState)
// 		}
// 	} catch (error) {
// 		// Handle error if needed
// 	}
// }

// function loadState() {
// 	try {
// 		if (typeof window !== 'undefined') {
// 			const serializedState = sessionStorage.getItem('reduxState')

// 			if (serializedState === null) {
// 				return undefined // No saved state
// 			}

// 			return JSON.parse(serializedState)
// 		}
// 	} catch (error) {
// 		// Handle error if needed
// 	}

// 	return undefined
// }

const reducer = combineReducers({
	[carInsuranceSlice.reducerPath]: carInsuranceSlice.reducer,
	[customerDetailsSlice.reducerPath]: customerDetailsSlice.reducer,
	[appSlice.reducerPath]: appSlice.reducer,
	[motorSlice.reducerPath]: motorSlice.reducer,
	[commonApi.reducerPath]: commonApi.reducer,
	[registrationApi.reducerPath]: registrationApi.reducer,
	[premiumMotorSlice.reducerPath]: premiumMotorSlice.reducer,
	[whiteBookDetailsSlice.reducerPath]: whiteBookDetailsSlice.reducer,
	[paymentApi.reducerPath]: paymentApi.reducer
})

// const preloadedState = loadState()

export const store = configureStore({
	reducer,
	// preloadedState,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			commonApi.middleware,
			registrationApi.middleware,
			paymentApi.middleware
		)
})

// if (typeof window !== 'undefined') {
// 	store.subscribe(() => {
// 		saveState(store.getState())
// 	})
// }

setupListeners(store.dispatch)
