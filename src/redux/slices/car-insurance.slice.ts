import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	mark: '',
	makeID: '',
	vehicleUsage: '',
	bodyType: [],
	year: 0,
	description: '',
	insuranceClass: 'Comprehensive',
	sumInsured: null,
	claims: null,
	gpsTraking: null
}

export type CarDetails = {
	mark: string
	makeID: string
	vehicleUsage: string
	bodyType: string[]
	year: number
	description: string
	insuranceClass: string
	sumInsured: string | null
	claims: boolean | null
	gpsTraking: boolean | null
}

export const carInsuranceSlice = createSlice({
	name: 'carInsurance',
	initialState: initialState,
	reducers: {
		updateVehicleUsage(state: CarDetails, action: PayloadAction<string>) {
			state.vehicleUsage = action.payload
			state.makeID = ''
			state.mark = ''
			state.bodyType = []
			state.year = 0
			state.description = ''
		},
		updateVehicleBodyType(state: CarDetails, action: PayloadAction<string>) {
			state.bodyType = [action.payload]
			state.makeID = ''
			state.mark = ''
			state.year = 0
			state.description = ''
		},
		updateVehicleMark(
			state: CarDetails,
			action: PayloadAction<{ mark: string; makeID: string }>
		) {
			state.mark = action.payload.mark
			state.makeID = action.payload.makeID
			state.year = 0
			state.description = ''
		},
		updateVehicleManufactureYear(state: CarDetails, action: PayloadAction<string>) {
			state.year = +action.payload
			state.description = ''
		},
		updateDescription(state: CarDetails, action: PayloadAction<string>) {
			state.description = action.payload
		},
		updateClass(state: CarDetails, action: PayloadAction<string>) {
			state.insuranceClass = action.payload
		},
		updateSumInsured(state: CarDetails, action: PayloadAction<string | null>) {
			state.sumInsured = action.payload
		},
		updateClaims(state: CarDetails, action: PayloadAction<boolean | null>) {
			state.claims = action.payload
		},
		updateGPSTraking(state: CarDetails, action: PayloadAction<boolean | null>) {
			state.gpsTraking = action.payload
		}
	}
})

export const {
	updateVehicleBodyType,
	updateVehicleMark,
	updateDescription,
	updateVehicleManufactureYear,
	updateVehicleUsage,
	updateClaims,
	updateClass,
	updateGPSTraking,
	updateSumInsured
} = carInsuranceSlice.actions
