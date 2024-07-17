import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	name: '',
	code: '266',
	mobile: '',
	premium: false
}

export type CustomerDetails = {
	name: string
	code: string
	mobile: string
	premium: boolean
}

export const customerDetailsSlice = createSlice({
	name: 'customerDetails',
	initialState: initialState,
	reducers: {
		updateName(state: CustomerDetails, action: PayloadAction<string>) {
			state.name = action.payload
		},
		updateCode(state: CustomerDetails, action: PayloadAction<string>) {
			state.code = action.payload
		},
		updateMobile(state: CustomerDetails, action: PayloadAction<string>) {
			state.mobile = action.payload
		},
		updatePremium(state: CustomerDetails, action: PayloadAction<boolean>) {
			state.premium = action.payload
		}
	}
})

export const { updateCode, updateMobile, updateName, updatePremium } = customerDetailsSlice.actions
