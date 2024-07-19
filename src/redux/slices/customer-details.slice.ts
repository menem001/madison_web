import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	name: '',
	code: '260',
	mobile: '',
	premium: false,
	email: ''
}

export type CustomerDetails = {
	name: string
	code: string
	mobile: string
	premium: boolean
	email: string
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
		},
		updateEmail(state: CustomerDetails, action: PayloadAction<string>) {
			state.email = action.payload
		}
	}
})

export const { updateCode, updateMobile, updateName, updatePremium, updateEmail } =
	customerDetailsSlice.actions
