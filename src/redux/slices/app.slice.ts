import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	scrollTo: 0,
	token: '',
	brokerCode: '',
	insuranceID: '',
	productId: '',
	loginId: '',
	branchCode: ''
}

export type AppDetails = {
	scrollTo: number
	token: string
	brokerCode: string
	insuranceID: string
	productId: string
	loginId: string
	branchCode: string
}

export const appSlice = createSlice({
	name: 'apps',
	initialState: initialState,
	reducers: {
		setScrollTo(state: AppDetails, action: PayloadAction<number>) {
			state.scrollTo = action.payload
		},
		setGuestLoginDetails(
			state: AppDetails,
			action: PayloadAction<{
				token: string
				brokerCode: string
				insuranceID: string
				productId: string
				loginId: string
				branchCode: string
			}>
		) {
			state.token = action.payload.token
			state.brokerCode = action.payload.brokerCode
			state.insuranceID = action.payload.insuranceID
			state.productId = action.payload.productId
			state.loginId = action.payload.loginId
			state.branchCode = action.payload.branchCode
		}
	}
})

export const { setScrollTo, setGuestLoginDetails } = appSlice.actions

export function selectCurrentToken(state: AppDetails) {
	return state.token
}
