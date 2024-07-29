import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: PremiumMotorDetails = {
	baseFare: 0,
	tax: [],
	premiumIncludedTax: 0,
	premiumIncludedTaxLC: 0,
	EABase: 0,
	EATax: [],
	EAPremiumIncluedTax: 0,
	EAPremiumIncluedTaxLC: 0
}

export type PremiumMotorDetails = {
	baseFare: number
	tax: { name: string; amount: number; rate: number }[]
	premiumIncludedTax: number
	premiumIncludedTaxLC: number
	EABase: number
	EATax: { name: string; amount: number; rate: number }[]
	EAPremiumIncluedTax: number
	EAPremiumIncluedTaxLC: number
}

export const premiumMotorSlice = createSlice({
	name: 'premiummotor',
	initialState: initialState,
	reducers: {
		storePremiumData(state: PremiumMotorDetails, action: PayloadAction<PremiumMotorDetails>) {
			state.baseFare = action.payload.baseFare
			state.tax = action.payload.tax
			state.premiumIncludedTax = action.payload.premiumIncludedTax
			state.premiumIncludedTaxLC = action.payload.premiumIncludedTaxLC
			state.EABase = action.payload.EABase
			state.EATax = action.payload.EATax
			state.EAPremiumIncluedTax = action.payload.EAPremiumIncluedTax
			state.EAPremiumIncluedTaxLC = action.payload.EAPremiumIncluedTaxLC
		}
	}
})

export const { storePremiumData } = premiumMotorSlice.actions
