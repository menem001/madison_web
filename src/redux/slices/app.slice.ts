import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: AppDetails = {
	scrollTo: 0,
	token: '',
	brokerCode: '',
	insuranceID: '',
	productId: '',
	loginId: '',
	branchCode: '',
	otpToken: 0,
	CustomerCode: '',
	userType: '',
	subUserType: '',
	agencyCode: '',
	covers: []
}

export type AppDetails = {
	scrollTo: number
	token: string
	brokerCode: string
	insuranceID: string
	productId: string
	loginId: string
	branchCode: string
	otpToken: number
	CustomerCode: string
	userType: string
	subUserType: string
	agencyCode: string
	covers: {
		CoverId: string
		SubCoverId: string | null
		SubCoverYn: string
	}[]
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
				CustomerCode: string
				userType: string
				subUserType: string
				agencyCode: string
			}>
		) {
			state.token = action.payload.token
			state.brokerCode = action.payload.brokerCode
			state.insuranceID = action.payload.insuranceID
			state.productId = action.payload.productId
			state.loginId = action.payload.loginId
			state.branchCode = action.payload.branchCode
			state.CustomerCode = action.payload.CustomerCode
			state.userType = action.payload.userType
			state.subUserType = action.payload.subUserType
			state.agencyCode = action.payload.agencyCode
		},
		setOTPToken(state: AppDetails, action: PayloadAction<number>) {
			state.otpToken = action.payload
		},
		setCoversDetails(
			state: AppDetails,
			action: PayloadAction<
				{
					CoverId: string
					SubCoverId: string | null
					SubCoverYn: string
				}[]
			>
		) {
			state.covers = action.payload
		}
	}
})

export const { setScrollTo, setGuestLoginDetails, setOTPToken, setCoversDetails } = appSlice.actions

export function selectCurrentToken(state: AppDetails) {
	return state.token
}
