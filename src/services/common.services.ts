import api, { type TResponse } from '@/lib/api'
import endPoints from './endpoints'
import {
	CurrencyListAPISchema,
	type vehicleUsageRequest,
	type CurrencyList,
	type CurrencyRequest,
	type SaveMotorDetailRequest,
	type policyEndDateList,
	policyEndDatesSchema,
	type saveMotorDetailsList,
	type GenerateOTPResponse,
	type GenerateOTPRequest,
	GenerateOTPResponseSchema,
	type ValidateOTPResponse,
	validateOTPResponseSchema,
	saveMotorDetailsSchema,
	type InsuranceClassTypeList,
	insuranceTypeListSchema,
	type InsuranceClassTypeRequest,
	type PremiumCalcData,
	type PremiumCalcRequest,
	premiumCalcDataSchema,
	type ViewPremiumCalData,
	type ViewPremiumCalcRequest,
	ViewPremiumCalDataSchema,
	type SaveCustomerDetailRequest,
	SaveCustomerDetailsSchema,
	type SaveVehicleRequest,
	SaveVehicleRequestSchema
} from './models/common.models'
import { MotorMakeSchema, type MotorList, type CommonModalRequest } from './models/common.models'
import {
	MotorModelListSchema,
	type MotorModelList,
	type MotorModalRequest
} from './models/common.models'
import { BodyTypeSchema, type BodyTypeList } from './models/common.models'
import { vehicleUsageSchema, type vehicleUsageList } from './models/common.models'
import { GuestLoginSchema, type GuestLogin } from './models/common.models'

export type GuestLoginResponse = TResponse<GuestLogin>

export async function doGuestLogin() {
	return api.post<GuestLogin>(
		endPoints.guestLogin,
		{
			e: 'kjIeGIM/2PWZlQUsLQBGq0uOWULX0QWRTSfk2dEbvBik/KTyszKentir1ZMEPiDD4ccgJA4xIW5Km9gKJ+DaePfMhFOhCteQJFkUqnAoBliweOngq/cHgNnIHGZC0UHUk6mPgHBpl5Waa2ZBZee4ek6aKaV3iIkCSiX4SokY0CJ6zIufj0WVPE5emAvchppF7SCL/CG5Dxh6tdzrQarEERmgrtg15T7SLDM7njGQwdGTknljRgmzIIPJIE7CLZW9WqX2ez4V9MZX4cmS1I3ZmRNeQ+kLjuwRia8QHQ0clnFapfZ7PhX0xlfhyZLUjdmZusaFyt53Szo='
		},
		GuestLoginSchema
	)
}

export type CurrencyListResponse = TResponse<CurrencyList>

export async function getCurrencyList(data: CurrencyRequest, token: string | null) {
	return api.post<CurrencyList>(endPoints.currencyList, data, CurrencyListAPISchema, {
		headers: { Authorization: token }
	})
}

export type MotorListResponse = TResponse<MotorList>

export async function getMotorList(data: CommonModalRequest, token: string | null) {
	return api.post<MotorList>(endPoints.motorMake, data, MotorMakeSchema, {
		headers: { Authorization: token }
	})
}

export type MotorModelListResponse = TResponse<MotorModelList>

export async function getMotorModelList(data: MotorModalRequest, token: string | null) {
	return api.post<MotorList>(endPoints.modelList, data, MotorModelListSchema, {
		headers: { Authorization: token }
	})
}

export type BodyTypeListResponse = TResponse<BodyTypeList>

export async function getBodyTypeList(data: vehicleUsageRequest, token: string | null) {
	return api.post<MotorList>(endPoints.bodyTypeList, data, BodyTypeSchema, {
		headers: { Authorization: token }
	})
}

export type VehicleUsageListResponse = TResponse<vehicleUsageList>

export async function getVehicleUsageList(data: vehicleUsageRequest, token: string | null) {
	return api.post<vehicleUsageList>(endPoints.vehicleUsage, data, vehicleUsageSchema, {
		headers: { Authorization: token }
	})
}

export type SaveMotorDetailResponse = TResponse<saveMotorDetailsList>

export async function saveMotorDetails(data: SaveMotorDetailRequest, token: string | null) {
	return api.post<saveMotorDetailsList>(
		endPoints.saveMotorDetails,
		data,
		saveMotorDetailsSchema,
		{
			headers: { Authorization: token }
		}
	)
}

export type policyEndDateResponse = TResponse<policyEndDateList>

export async function getPolicyEndDates(data: { date: string }, token: string | null) {
	return api.get<policyEndDateList>(
		endPoints.policyEndDates + '?policyStartDate=' + data.date,
		policyEndDatesSchema,
		{
			headers: { Authorization: token }
		}
	)
}

export type OTPResponse = TResponse<GenerateOTPResponse>

export async function generateOTP(data: GenerateOTPRequest, token: string | null) {
	return api.post<MotorList>(endPoints.generateOTP, data, GenerateOTPResponseSchema, {
		headers: { Authorization: token }
	})
}

export type verifyOTPResponse = TResponse<ValidateOTPResponse>

export async function verifyOTP(data: GenerateOTPRequest, token: string | null) {
	return api.post<MotorList>(endPoints.verifyOTP, data, validateOTPResponseSchema, {
		headers: { Authorization: token }
	})
}

export type InsuranceClassTypeResponse = TResponse<InsuranceClassTypeList>

export async function insuranceType(data: InsuranceClassTypeRequest, token: string | null) {
	return api.post<InsuranceClassTypeList>(
		endPoints.insuranceClass,
		data,
		insuranceTypeListSchema,
		{
			headers: { Authorization: token }
		}
	)
}

export type PremiumCalcDataResponse = TResponse<PremiumCalcData>

export async function calculatePremium(data: PremiumCalcRequest, token: string | null) {
	return api.post<PremiumCalcData>(endPoints.calculator, data, premiumCalcDataSchema, {
		headers: { Authorization: token }
	})
}

export type ViewPremiumCalDataResponse = TResponse<ViewPremiumCalData>

export async function viewCalculatedPremium(data: ViewPremiumCalcRequest, token: string | null) {
	return api.post<ViewPremiumCalData>(endPoints.viewCalculated, data, ViewPremiumCalDataSchema, {
		headers: { Authorization: token }
	})
}

export type SaveCustomerDetailResponse = TResponse<SaveCustomerDetailRequest>

export async function saveCustomerDetails(data: SaveCustomerDetailRequest, token: string | null) {
	return api.post(endPoints.saveCustomer, data, SaveCustomerDetailsSchema, {
		headers: { Authorization: token }
	})
}

export type SaveVehcileResponse = TResponse<SaveVehicleRequest>

export async function saveVehicleInfo(data: SaveVehicleRequest, token: string | null) {
	return api.post(endPoints.saveVehicle, data, SaveVehicleRequestSchema, {
		headers: { Authorization: token }
	})
}
