import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	mark: '',
	makeID: '',
	model: '',
	seat: 0,
	excessLimit: '',
	vehicleUsage: '',
	value: 0,
	bodyType: [],
	year: 0,
	description: '',
	policyStartDate: '',
	policyEndDate: '',
	Currency: '',
	insuranceClass: 'Comprehensive',
	sumInsured: null,
	claims: null,
	gpsTraking: null
}

export type CarDetails = {
	mark: string
	makeID: string
	model: string
	seat: number
	value: number
	excessLimit: string
	vehicleUsage: string
	bodyType: string[]
	year: number
	description: string
	insuranceClass: string
	policyStartDate: string
	policyEndDate: string
	Currency: string
	sumInsured: string | null
	claims: boolean | null
	gpsTraking: boolean | null
}

export const carInsuranceSlice = createSlice({
	name: 'carInsurance',
	initialState: initialState,
	reducers: {
		updateVehicleMark(
			state: CarDetails,
			action: PayloadAction<{ mark: string; makeID: string }>
		) {
			state.mark = action.payload.mark
			state.makeID = action.payload.makeID
			state.year = 0
			state.model = ''
			state.description = ''
			state.vehicleUsage = ''
			state.bodyType = []
		},
		updateVehicleModel(state: CarDetails, action: PayloadAction<string>) {
			state.model = action.payload
			state.year = 0
			state.description = ''
			state.vehicleUsage = ''
			state.bodyType = []
		},
		updateVehicleBodyType(state: CarDetails, action: PayloadAction<string>) {
			state.bodyType = [action.payload]
			state.makeID = ''
			state.mark = ''
			state.year = 0
			state.description = ''
		},
		updateVehicleUsage(state: CarDetails, action: PayloadAction<string>) {
			state.vehicleUsage = action.payload
			state.makeID = ''
			state.mark = ''
			state.bodyType = []
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
	updateSumInsured,
	updateVehicleModel
} = carInsuranceSlice.actions
