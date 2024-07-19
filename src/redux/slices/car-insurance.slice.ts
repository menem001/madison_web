import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	mark: '',
	makeID: '',
	model: '',
	seat: 0,
	excessLimit: 750,
	vehicleUsage: '',
	value: 0,
	bodyType: '',
	year: 0,
	description: '',
	policyStartDate: '',
	policyEndDate: '',
	currency: '',
	insuranceClass: 'Comprehensive',
	sumInsured: null,
	claims: null,
	gpsTraking: null,
	driverOrOwner: '',
	DriverName: '',
	DriverDOB: '',
	DriverID: '',
	exchangeRate: '1.0'
}

export type CarDetails = {
	mark: string
	makeID: string
	model: string
	seat: number
	value: number
	excessLimit: number
	vehicleUsage: string
	bodyType: string
	year: number
	description: string
	insuranceClass: string
	policyStartDate: string
	policyEndDate: string
	currency: string
	exchangeRate: string
	sumInsured: string | null
	claims: boolean | null
	gpsTraking: boolean | null
	driverOrOwner: string
	DriverName: string
	DriverDOB: string
	DriverID: string
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
			state.value = 0
			state.vehicleUsage = ''
			state.bodyType = ''
			state.seat = 0
		},
		updateVehicleModel(state: CarDetails, action: PayloadAction<string>) {
			state.model = action.payload
			state.year = 0
			state.value = 0
			state.vehicleUsage = ''
			state.bodyType = ''
			state.seat = 0
		},
		updateVehicleUsage(state: CarDetails, action: PayloadAction<string>) {
			state.vehicleUsage = action.payload
			state.seat = 0
			state.bodyType = ''
			state.year = 0
			state.value = 0
		},
		updateVehicleBodyType(state: CarDetails, action: PayloadAction<string>) {
			state.bodyType = action.payload
			state.year = 0
			state.value = 0
			state.seat = 0
		},
		updateSeats(state: CarDetails, action: PayloadAction<number>) {
			state.seat = action.payload
			state.year = 0
			state.value = 0
		},
		updateVehicleManufactureYear(state: CarDetails, action: PayloadAction<string>) {
			state.year = +action.payload
		},
		updateExcessLimit(state: CarDetails, action: PayloadAction<number>) {
			state.excessLimit = +action.payload
		},
		updateValue(state: CarDetails, action: PayloadAction<number>) {
			state.value = action.payload
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
		},
		updateDriverDetails(
			state: CarDetails,
			action: PayloadAction<{
				driverOrOwner: string
				DriverDOB: string
				DriverID: string
			}>
		) {
			state.driverOrOwner = action.payload.driverOrOwner
			state.DriverDOB = action.payload.DriverDOB
			state.DriverID = action.payload.DriverID
		},
		updatePolicyStartDate(state: CarDetails, action: PayloadAction<string>) {
			state.policyStartDate = action.payload
			state.policyEndDate = ''
		},
		updatePolicyEndDate(state: CarDetails, action: PayloadAction<string>) {
			state.policyEndDate = action.payload
		},
		updateCurrency(
			state: CarDetails,
			action: PayloadAction<{ currency: string; rate: string }>
		) {
			state.currency = action.payload.currency
			state.exchangeRate = action.payload.rate
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
	updateSeats,
	updateVehicleModel,
	updateValue,
	updateExcessLimit,
	updateDriverDetails,
	updatePolicyStartDate,
	updatePolicyEndDate,
	updateCurrency
} = carInsuranceSlice.actions
