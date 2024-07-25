import {
	type MotorModelListResponse,
	type CurrencyListResponse,
	type MotorListResponse,
	type BodyTypeListResponse,
	type VehicleUsageListResponse,
	type GuestLoginResponse,
	type policyEndDateResponse,
	type SaveMotorDetailResponse,
	type OTPResponse,
	type verifyOTPResponse,
	type InsuranceClassTypeResponse,
	type PremiumCalcDataResponse,
	type ViewPremiumCalDataResponse,
	type SaveCustomerDetailResponse,
	type SaveVehcileDetialResponse,
	type ColorList,
	type OccupationList,
	type RegionList,
	type DocumentTypeResp,
	type BuyPolicyResponse,
	type ViewQuoteResponse,
	type UploadDocsResponse,
	type getBankResponse
} from '@/services/common.services'
import {
	type vehicleUsageRequest,
	type CommonModalRequest,
	type CurrencyRequest,
	type MotorModalRequest,
	type SaveMotorDetailRequest,
	type GenerateOTPRequest,
	type ValidateOTPRequest,
	type InsuranceClassTypeRequest,
	type PremiumCalcRequest,
	type ViewPremiumCalcRequest,
	type SaveCustomerDetailRequest,
	type SaveVehicleRequest,
	type OccupationListRequest,
	type RegionListRequest,
	type ColorListRequest,
	type DocumentTypeRequest,
	type BuyPolicyRequest,
	type ViewQuoteRequest,
	type GetBankRequest
} from '@/services/models/common.models'

import type { Action, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { store } from '../store'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RootState = any // normally inferred from state

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
	// eslint-disable-next-line indent
	return action.type === HYDRATE
}

export const commonApi = createApi({
	reducerPath: 'common',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api/common/'
		// prepareHeaders: (headers) => {
		// 	const state = store.getState()
		// 	const token = state.apps?.token
		// 	console.log('prepareHeaders is called', token, 'Here')

		// 	if (token) {
		// 		headers.append('Authorization', `Bearer ${token}`)
		// 		console.log('Headers after setting token:', headers)
		// 	} else {
		// 		console.log('Token is not set')
		// 	}
		// }
	}),
	extractRehydrationInfo(action, { reducerPath }) {
		if (isHydrateAction(action)) {
			return action.payload[reducerPath]
		}
	},
	endpoints: (build) => ({
		guestLogin: build.mutation<GuestLoginResponse, void>({
			query: () => ({
				url: 'do_guest_login',
				method: 'POST'
			})
		}),
		getCurrencyList: build.mutation<CurrencyListResponse, CurrencyRequest>({
			query: (
				data
			): {
				url: string
				method: string
				body: vehicleUsageRequest
				headers: { Authorization: string }
			} => ({
				url: 'get_currency_list',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		}),
		getMotorMakeList: build.mutation<MotorListResponse, CommonModalRequest>({
			query: (
				data
			): {
				url: string
				method: string
				body: vehicleUsageRequest
				headers: { Authorization: string }
			} => ({
				url: 'get_motor_list',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		}),
		getMotorModelList: build.mutation<MotorModelListResponse, MotorModalRequest>({
			query: (
				data
			): {
				url: string
				method: string
				body: vehicleUsageRequest
				headers: { Authorization: string }
			} => ({
				url: 'get_motor_model',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		}),
		getBodyTypeList: build.mutation<BodyTypeListResponse, vehicleUsageRequest>({
			query: (
				data
			): {
				url: string
				method: string
				body: vehicleUsageRequest
				headers: { Authorization: string }
			} => ({
				url: 'get_body_type',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		}),
		getVehicleUsageList: build.mutation<VehicleUsageListResponse, vehicleUsageRequest>({
			query: (
				data
			): {
				url: string
				method: string
				body: vehicleUsageRequest
				headers: { Authorization: string }
			} => ({
				url: 'get_vehicle_usage',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		}),
		saveMotorDetails: build.mutation<SaveMotorDetailResponse, SaveMotorDetailRequest>({
			query: (
				data
			): {
				url: string
				method: string
				body: SaveMotorDetailRequest
				headers: { Authorization: string }
			} => ({
				url: 'save_motor_details',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		}),
		getPolicyEndDate: build.query<policyEndDateResponse, string>({
			query: (
				date
			): {
				url: string
				method: string
				body: { date: string }
				headers: { Authorization: string }
			} => ({
				url: 'get_policy_date',
				method: 'POST',
				body: { date },
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		}),
		generateOTP: build.mutation<OTPResponse, GenerateOTPRequest>({
			query: (
				data
			): {
				url: string
				method: string
				body: GenerateOTPRequest
				headers: { Authorization: string }
			} => ({
				url: 'generate_otp',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		}),
		verifyOTP: build.mutation<verifyOTPResponse, ValidateOTPRequest>({
			query: (
				data
			): {
				url: string
				method: string
				body: ValidateOTPRequest
				headers: { Authorization: string }
			} => ({
				url: 'verify_otp',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		}),
		getInsuranceClass: build.mutation<InsuranceClassTypeResponse, InsuranceClassTypeRequest>({
			query: (
				data
			): {
				url: string
				method: string
				body: InsuranceClassTypeRequest
				headers: { Authorization: string }
			} => ({
				url: 'get_insurance_class',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		}),
		premiumCalc: build.mutation<PremiumCalcDataResponse, PremiumCalcRequest>({
			query: (
				data
			): {
				url: string
				method: string
				body: PremiumCalcRequest
				headers: { Authorization: string }
			} => ({
				url: 'get_premium_calc',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		}),
		viewPremiumCalc: build.mutation<ViewPremiumCalDataResponse, ViewPremiumCalcRequest>({
			query: (
				data
			): {
				url: string
				method: string
				body: ViewPremiumCalcRequest
				headers: { Authorization: string }
			} => ({
				url: 'view_premium_calc',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		}),
		saveCustomerDetails: build.mutation<SaveCustomerDetailResponse, SaveCustomerDetailRequest>({
			query: (
				data
			): {
				url: string
				method: string
				body: SaveCustomerDetailRequest
				headers: { Authorization: string }
			} => ({
				url: 'save_customer_details',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		}),
		saveVehicleInfo: build.mutation<SaveVehcileDetialResponse, SaveVehicleRequest>({
			query: (
				data
			): {
				url: string
				method: string
				body: SaveVehicleRequest
				headers: { Authorization: string }
			} => ({
				url: 'save_vehicle_info',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		}),
		getOccupationList: build.mutation<OccupationList, OccupationListRequest>({
			query: (
				data
			): {
				url: string
				method: string
				body: OccupationListRequest
				headers: { Authorization: string }
			} => ({
				url: 'get_occupation_list',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		}),
		getRegionList: build.mutation<RegionList, RegionListRequest>({
			query: (
				data
			): {
				url: string
				method: string
				body: RegionListRequest
				headers: { Authorization: string }
			} => ({
				url: 'get_region_list',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		}),
		getColorList: build.mutation<ColorList, ColorListRequest>({
			query: (
				data
			): {
				url: string
				method: string
				body: ColorListRequest
				headers: { Authorization: string }
			} => ({
				url: 'get_color_list',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		}),
		getDocumentType: build.mutation<DocumentTypeResp, DocumentTypeRequest>({
			query: (
				data
			): {
				url: string
				method: string
				body: DocumentTypeRequest
				headers: { Authorization: string }
			} => ({
				url: 'get_document_type',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		}),
		BuyPolicy: build.mutation<BuyPolicyResponse, BuyPolicyRequest>({
			query: (
				data
			): {
				url: string
				method: string
				body: BuyPolicyRequest
				headers: { Authorization: string }
			} => ({
				url: 'buy_policy',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		}),
		viewQuote: build.mutation<ViewQuoteResponse, ViewQuoteRequest>({
			query: (
				data
			): {
				url: string
				method: string
				body: ViewQuoteRequest
				headers: { Authorization: string }
			} => ({
				url: 'view_quote',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		}),
		uploadDocs: build.mutation<UploadDocsResponse, FormData>({
			query: (
				data
			): {
				url: string
				method: string
				body: FormData
				headers: { Authorization: string }
			} => ({
				url: 'upload_docs',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		}),
		getBankList: build.mutation<getBankResponse, GetBankRequest>({
			query: (
				data
			): {
				url: string
				method: string
				body: GetBankRequest
				headers: { Authorization: string }
			} => ({
				url: 'get_bank_list',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		})
	})
})

export const {
	useGuestLoginMutation,
	useGetCurrencyListMutation,
	useGetMotorMakeListMutation,
	useGetMotorModelListMutation,
	useGetBodyTypeListMutation,
	useGetVehicleUsageListMutation,
	useSaveMotorDetailsMutation,
	useGetPolicyEndDateQuery,
	useGenerateOTPMutation,
	useVerifyOTPMutation,
	useGetInsuranceClassMutation,
	usePremiumCalcMutation,
	useViewPremiumCalcMutation,
	useSaveCustomerDetailsMutation,
	useGetColorListMutation,
	useGetOccupationListMutation,
	useGetRegionListMutation,
	useSaveVehicleInfoMutation,
	useGetDocumentTypeMutation,
	useBuyPolicyMutation,
	useViewQuoteMutation,
	useUploadDocsMutation,
	useGetBankListMutation
} = commonApi
