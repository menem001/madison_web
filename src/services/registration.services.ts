import api, { type TResponse } from '@/lib/api'
import {
	type RegistrationDetailResponse,
	RegistrationDetailResponseSchema,
	RegistrationResponseSchema,
	type RegistrationTokenResponse,
	type VehicleListResponse,
	VehicleListResponseSchema
} from './models/registration.models'
import endPoints from './endpoints'
import { type DocumentTypeRequest } from './models/common.models'

export type RegistrationToken = TResponse<RegistrationTokenResponse>

export async function getRegistrationToken(token: string | null) {
	return api.get(endPoints.registrationToken, RegistrationResponseSchema, {
		headers: { Authorization: token }
	})
}

export type RegistrationDetail = TResponse<RegistrationDetailResponse>

export async function getRegistrationDetails(data: DocumentTypeRequest, token: string | null) {
	return api.post(endPoints.registrationDetails, data, RegistrationDetailResponseSchema, {
		headers: { Authorization: token }
	})
}

export type VehicleList = TResponse<VehicleListResponse>

export async function getVehicleLists(token: string | null) {
	return api.get(endPoints.vehicleList, VehicleListResponseSchema, {
		headers: { Authorization: token }
	})
}
