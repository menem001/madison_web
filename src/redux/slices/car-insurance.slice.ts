import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: CarDetails = {
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
	currency: 'ZMW',
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
	AcccessoriesSumInsured: '',
	leased: false,
	registrationNumber: '',
	chassisNumber: '',
	engineNumber: '',
	engineCapacity: '',
	color: '',
	bankName: '',
	policyDaysCount: ''
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
	leased: boolean
	registrationNumber: string
	chassisNumber: string
	engineNumber: string
	engineCapacity: string
	color: string
	bankName: string
	policyDaysCount: string
}

export const carInsuranceSlice = createSlice({
	name: 'carInsurance',
	initialState: initialState,
	reducers: {
		updateVehicleBodyType(
			state: CarDetails,
			action: PayloadAction<{ bodyType: string; id: string }>
		) {
			state.bodyType = action.payload.bodyType
			state.bodyTypeID = action.payload.id
			state.mark = ''
			state.makeID = ''
			state.year = 0
			state.model = ''
			state.modelID = ''
			state.value = 0
			state.vehicleUsage = ''
			state.vehicleUsageID = ''
			state.year = 0
			state.value = 0
			state.seat = 0
		},
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
			state.seat = 0
		},
		updateVehicleUsage(
			state: CarDetails,
			action: PayloadAction<{ usage: string; id: string }>
		) {
			state.vehicleUsage = action.payload.usage
			state.vehicleUsageID = action.payload.id
			state.seat = 0
			state.year = 0
			state.value = 0
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
		updatePolicyDaysCount(state: CarDetails, action: PayloadAction<string>) {
			state.policyDaysCount = action.payload
		},
		updateCurrency(
			state: CarDetails,
			action: PayloadAction<{ currency: string; rate: string }>
		) {
			state.currency = action.payload.currency
			state.exchangeRate = action.payload.rate
		},
		updateVehicleDetails(
			state: CarDetails,
			action: PayloadAction<{
				registrationNumber: string
				chassisNumber: string
				engineNumber: string
				engineCapacity: string
				color: string
			}>
		) {
			state.registrationNumber = action.payload.registrationNumber
			state.chassisNumber = action.payload.chassisNumber
			state.engineNumber = action.payload.engineNumber
			state.engineCapacity = action.payload.engineCapacity
			state.color = action.payload.color
		},
		updateAdditionalDetails(
			state: CarDetails,
			action: PayloadAction<{
				driverName: string
				driverID: string
				leased: boolean
				bankName: string
			}>
		) {
			state.DriverName = action.payload.driverName
			state.DriverID = action.payload.driverID
			state.leased = action.payload.leased
			state.bankName = action.payload.bankName
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
	updateCurrency,
	updateVehicleDetails,
	updateAdditionalDetails,
	updatePolicyDaysCount
} = carInsuranceSlice.actions
