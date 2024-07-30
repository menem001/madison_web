import api, { type TResponse } from '@/lib/api'
import {
	type RegistrationDetailRequest,
	type RegistrationDetailResponse,
	RegistrationDetailResponseSchema,
	RegistrationResponseSchema,
	type RegistrationTokenResponse,
	type VehicleListResponse,
	VehicleListResponseSchema
} from './models/registration.models'
import endPoints from './endpoints'

export type RegistrationToken = TResponse<RegistrationTokenResponse>

export async function getRegistrationToken(token: string | null) {
	return api.get(endPoints.registrationToken, RegistrationResponseSchema, {
		headers: { Authorization: token }
	})
}

export type RegistrationDetail = TResponse<RegistrationDetailResponse>

export async function getRegistrationDetails(
	data: RegistrationDetailRequest,
	token: string | null
) {
	return api.post<RegistrationDetailResponse>(
		endPoints.registrationDetails,
		data,
		RegistrationDetailResponseSchema,
		{
			headers: { Authorization: token }
		}
	)
}

export type VehicleList = TResponse<VehicleListResponse>

export type RegReq = {
	RegNo: string
}

export async function getVehicleLists(data: RegReq, token: string | null) {
	return api.get(endPoints.vehicleList + '?RegNo=' + data.RegNo, VehicleListResponseSchema, {
		headers: { Authorization: token }
	})
}
