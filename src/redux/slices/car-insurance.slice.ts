import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	mark: '',
	makeID: '',
	model: '',
	modelID: '',
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
	exchangeRate: '1.0',
	classID: '',
	vehicleUsageID: '',
	bodyTypeID: '',
	AcccessoriesSumInsured: ''
}

export type CarDetails = {
	mark: string
	makeID: string
	model: string
	modelID: string
	seat: number
	value: number
	excessLimit: number
	vehicleUsage: string
	bodyType: string
	bodyTypeID: string
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
	classID: string
	vehicleUsageID: string
	AcccessoriesSumInsured: string
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
			state.modelID = ''
			state.value = 0
			state.vehicleUsage = ''
			state.vehicleUsageID = ''
			state.bodyType = ''
			state.bodyTypeID = ''
			state.seat = 0
		},
		updateVehicleModel(
			state: CarDetails,
			action: PayloadAction<{ model: string; modelID: string }>
		) {
			state.model = action.payload.model
			state.modelID = action.payload.modelID
			state.year = 0
			state.value = 0
			state.vehicleUsage = ''
			state.vehicleUsageID = ''
			state.bodyType = ''
			state.bodyTypeID = ''
			state.seat = 0
		},
		updateVehicleUsage(
			state: CarDetails,
			action: PayloadAction<{ usage: string; id: string }>
		) {
			state.vehicleUsage = action.payload.usage
			state.vehicleUsageID = action.payload.id
			state.seat = 0
			state.bodyType = ''
			state.bodyTypeID = ''
			state.year = 0
			state.value = 0
		},
		updateVehicleBodyType(
			state: CarDetails,
			action: PayloadAction<{ bodyType: string; id: string }>
		) {
			state.bodyType = action.payload.bodyType
			state.bodyTypeID = action.payload.id
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
		updateValue(
			state: CarDetails,
			action: PayloadAction<{ value: number; accessories: number }>
		) {
			state.value = action.payload.value
			state.AcccessoriesSumInsured = action.payload.accessories + ''
		},
		updateDescription(state: CarDetails, action: PayloadAction<string>) {
			state.description = action.payload
		},
		updateClass(state: CarDetails, action: PayloadAction<{ class: string; id: string }>) {
			state.insuranceClass = action.payload.class
			state.classID = action.payload.id
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
