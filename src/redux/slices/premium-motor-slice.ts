import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: PremiumMotorDetails = {
	baseFare: 0,
	tax: [],
	premiumIncludedTax: 0,
	EABase: 0,
	EATax: [],
	EAPremiumIncluedTax: 0
}

export type PremiumMotorDetails = {
	baseFare: number
	tax: { name: string; amount: number; rate: number }[]
	premiumIncludedTax: number
	EABase: number
	EATax: { name: string; amount: number; rate: number }[]
	EAPremiumIncluedTax: number
}

export const premiumMotorSlice = createSlice({
	name: 'premiummotor',
	initialState: initialState,
	reducers: {
		storePremiumData(state: PremiumMotorDetails, action: PayloadAction<PremiumMotorDetails>) {
			state.baseFare = action.payload.baseFare
			state.tax = action.payload.tax
			state.premiumIncludedTax = action.payload.premiumIncludedTax
			state.EABase = action.payload.EABase
			state.EATax = action.payload.EATax
			state.EAPremiumIncluedTax = action.payload.EAPremiumIncluedTax
		}
	}
})

export const { storePremiumData } = premiumMotorSlice.actions
