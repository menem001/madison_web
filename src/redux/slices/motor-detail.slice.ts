import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: MotorDetails = {
	CoverList: null,
	RequestReferenceNo: '',
	CustomerReferenceNo: '',
	VehicleId: '',
	MSRefNo: '',
	CdRefNo: '',
	VdRefNo: '',
	DdRefNo: '',
	Response: '',
	CreatedBy: '',
	InsuranceId: '',
	ProductId: '',
	SectionId: '',
	QuoteNo: '',
	CustomerId: ''
}

export type MotorDetails = {
	CoverList: string | null
	RequestReferenceNo: string
	CustomerReferenceNo: string
	VehicleId: string
	MSRefNo: string
	CdRefNo: string
	VdRefNo: string
	DdRefNo: string
	Response: string
	CreatedBy: string
	InsuranceId: string
	ProductId: string
	SectionId: string
	QuoteNo: string
	CustomerId: string
}

export const motorSlice = createSlice({
	name: 'motor',
	initialState: initialState,
	reducers: {
		updateDetails(
			state: MotorDetails,
			action: PayloadAction<{
				CoverList: string | null
				RequestReferenceNo: string
				CustomerReferenceNo: string
				VehicleId: string
				MSRefNo: string
				CdRefNo: string
				VdRefNo: string
				DdRefNo: string
				Response: string
				CreatedBy: string
				InsuranceId: string
				ProductId: string
				SectionId: string
			}>
		) {
			state.CdRefNo = action.payload.CdRefNo
			state.CoverList = action.payload.CoverList
			state.CreatedBy = action.payload.CreatedBy
			state.CustomerReferenceNo = action.payload.CustomerReferenceNo
			state.DdRefNo = action.payload.DdRefNo
			state.InsuranceId = action.payload.InsuranceId
			state.MSRefNo = action.payload.MSRefNo
			state.ProductId = action.payload.ProductId
			state.RequestReferenceNo = action.payload.RequestReferenceNo
			state.Response = action.payload.Response
			state.SectionId = action.payload.SectionId
			state.VdRefNo = action.payload.VdRefNo
			state.VehicleId = action.payload.VehicleId
		},
		updateQuoteDetails(
			state: MotorDetails,
			action: PayloadAction<{ QuoteNo: string; CustomerId: string }>
		) {
			state.QuoteNo = action.payload.QuoteNo
			state.CustomerId = action.payload.CustomerId
		}
	}
})

export const { updateDetails, updateQuoteDetails } = motorSlice.actions
