import api, { type TResponse } from '@/lib/api'
import endPoints from './endpoints'
import {
	CurrencyListAPISchema,
	SaveMotorDetailRequestSchema,
	type vehicleUsageRequest,
	type CurrencyList,
	type CurrencyRequest,
	type SaveMotorDetailRequest
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

export async function getCurrencyList(data: CurrencyRequest) {
	return api.post<CurrencyList>(endPoints.currencyList, data, CurrencyListAPISchema)
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
	return api.post<MotorList>(endPoints.vehicleUsage, data, vehicleUsageSchema, {
		headers: { Authorization: token }
	})
}

export type SaveMotorDetailResponse = TResponse<vehicleUsageList>

export async function saveMotorDetails(data: SaveMotorDetailRequest) {
	return api.post<MotorList>(endPoints.saveMotorDetails, data, SaveMotorDetailRequestSchema)
}
