import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: WhiteBookDetails = {
	VINChassisNumber: '',
	RegistrationMark: '',
	EngineNumber: '',
	Make: '',
	Model: '',
	ModelNumber: '',
	Colour: '',
	VehicleCategory: '',
	PropelledBy: '',
	NetWeight: '',
	GVMkg: '',
	Class: '',
	EngineCapacity: '',
	SeatingCapacity: '',
	RegistrationAuthority: '',
	YearOfMake: '',
	FirstRegistrationDate: '',
	CustomsClearanceNumber: '',
	InterpolNumber: '',
	CurrentLinenseExpDate: ''
}

export type WhiteBookDetails = {
	VINChassisNumber: string
	RegistrationMark: string
	EngineNumber: string
	Make: string
	Model: string
	ModelNumber: string
	Colour: string
	VehicleCategory: string
	PropelledBy: string
	NetWeight: string
	GVMkg: string
	Class: string
	EngineCapacity: string
	SeatingCapacity: string
	RegistrationAuthority: string
	YearOfMake: string
	FirstRegistrationDate: string
	CustomsClearanceNumber: string
	InterpolNumber: string
	CurrentLinenseExpDate: string
}

export const whiteBookDetailsSlice = createSlice({
	name: 'whitebookdetails',
	initialState: initialState,
	reducers: {
		storeWhiteBookData(state: WhiteBookDetails, action: PayloadAction<WhiteBookDetails>) {
			state.VINChassisNumber = action.payload.VINChassisNumber
			state.RegistrationMark = action.payload.RegistrationMark
			state.EngineNumber = action.payload.EngineNumber
			state.Make = action.payload.Make
			state.Model = action.payload.Model
			state.ModelNumber = action.payload.ModelNumber
			state.Colour = action.payload.Colour
			state.VehicleCategory = action.payload.VehicleCategory
			state.PropelledBy = action.payload.PropelledBy
			state.NetWeight = action.payload.NetWeight
			state.GVMkg = action.payload.GVMkg
			state.Class = action.payload.Class
			state.EngineCapacity = action.payload.EngineCapacity
			state.SeatingCapacity = action.payload.SeatingCapacity
			state.RegistrationAuthority = action.payload.RegistrationAuthority
			state.YearOfMake = action.payload.YearOfMake
			state.FirstRegistrationDate = action.payload.FirstRegistrationDate
			state.CustomsClearanceNumber = action.payload.CustomsClearanceNumber
			state.InterpolNumber = action.payload.InterpolNumber
			state.CurrentLinenseExpDate = action.payload.CurrentLinenseExpDate
		}
	}
})

export const { storeWhiteBookData } = whiteBookDetailsSlice.actions
