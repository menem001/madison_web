import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { appSlice, carInsuranceSlice, customerDetailsSlice } from './slices'
import { commonApi } from './api/commonApi'
import { motorSlice } from './slices/motor-detail.slice'
import { registrationApi } from './api/registrationApi'
import { premiumMotorSlice } from './slices/premium-motor-slice'
import { whiteBookDetailsSlice } from './slices/whitebook-details-slice'
import { paymentApi } from './api/paymentApi'

// Utility functions to save and load state from session storage
function saveState(state: unknown) {
	try {
		const serializedState = JSON.stringify(state)
		sessionStorage.setItem('reduxState', serializedState)
	} catch (error) {
		console.error('Could not save state', error)
	}
}

function loadState() {
	try {
		const serializedState = sessionStorage.getItem('reduxState')

		if (serializedState === null) {
			return undefined // No saved state
		}

		return JSON.parse(serializedState)
	} catch (error) {
		console.error('Could not load state', error)
		return undefined
	}
}

// Combine all your reducers
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

// Load the persisted state from session storage if available
const preloadedState = loadState()

// Configure the store with the preloaded state
export const store = configureStore({
	reducer,
	preloadedState, // Use the loaded state here
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			commonApi.middleware,
			registrationApi.middleware,
			paymentApi.middleware
		)
})

// Save the state to session storage whenever it changes
store.subscribe(() => {
	saveState(store.getState())
})

// Set up listeners for refetching on reconnects or focus
setupListeners(store.dispatch)
