import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	mark: '',
	model: '',
	vehicleUsage: '',
	fuelType: '',
	bodyType: [],
	sumInsured: 0,
	deductibles: 0,
	horsePower: '',
	tonnage: ''
}

export type CarDetails = {
	mark: string
	model: string
	vehicleUsage: string
	fuelType: string
	bodyType: string[]
	sumInsured: number
	deductibles: number
	horsePower: string
	tonnage: string
}

export const carInsuranceSlice = createSlice({
	name: 'carInsurance',
	initialState: initialState,
	reducers: {
		updateVehicleMark(state: CarDetails, action: PayloadAction<string>) {
			state.mark = action.payload
			state.model = ''
			state.vehicleUsage = ''
			state.fuelType = ''
			state.bodyType = []
			state.sumInsured = 0
			state.deductibles = 0
			state.horsePower = ''
			state.tonnage = ''
		},
		updateVehicleModel(state: CarDetails, action: PayloadAction<string>) {
			state.model = action.payload
			state.vehicleUsage = ''
			state.fuelType = ''
			state.bodyType = []
			state.sumInsured = 0
			state.deductibles = 0
			state.horsePower = ''
			state.tonnage = ''
		},
		updateVehicleUsage(state: CarDetails, action: PayloadAction<string>) {
			state.vehicleUsage = action.payload
			state.fuelType = ''
			state.bodyType = []
			state.sumInsured = 0
			state.deductibles = 0
			state.horsePower = ''
			state.tonnage = ''
		},
		updateVehicleBodyType(state: CarDetails, action: PayloadAction<string>) {
			state.bodyType = [action.payload]
			state.fuelType = ''
			state.sumInsured = 0
			state.deductibles = 0
			state.horsePower = ''
			state.tonnage = ''
		},
		updateVehicleFuel(state: CarDetails, action: PayloadAction<string>) {
			state.fuelType = action.payload
			state.sumInsured = 0
			state.deductibles = 0
			state.horsePower = ''
			state.tonnage = ''
		},
		updateHorsePower(state: CarDetails, action: PayloadAction<string>) {
			state.sumInsured = 0
			state.deductibles = 0
			state.horsePower = action.payload
		},
		updateTonnage(state: CarDetails, action: PayloadAction<string>) {
			state.sumInsured = 0
			state.deductibles = 0
			state.tonnage = action.payload
		},
		updateInsuredSum(state: CarDetails, action: PayloadAction<string>) {
			state.sumInsured = +action.payload
			state.deductibles = 0
		},
		updateDeductibles(state: CarDetails, action: PayloadAction<string>) {
			state.deductibles = +action.payload
		}
	}
})

export const {
	updateDeductibles,
	updateHorsePower,
	updateInsuredSum,
	updateTonnage,
	updateVehicleBodyType,
	updateVehicleFuel,
	updateVehicleMark,
	updateVehicleModel,
	updateVehicleUsage
} = carInsuranceSlice.actions
