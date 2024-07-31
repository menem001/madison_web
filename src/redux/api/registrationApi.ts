import {
	type VehicleList,
	type RegistrationDetail,
	type RegistrationToken,
	type RegReq
} from '@/services/registration.services'
import type { Action, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { store } from '../store'
import { type RegistrationDetailRequest } from '@/services/models/registration.models'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RootState = any // normally inferred from state

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
	// eslint-disable-next-line indent
	return action.type === HYDRATE
}

export const registrationApi = createApi({
	reducerPath: 'registration',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api/registration/'
	}),
	extractRehydrationInfo(action, { reducerPath }) {
		if (isHydrateAction(action)) {
			return action.payload[reducerPath]
		}
	},
	endpoints: (build) => ({
		getRegistrationToken: build.query<RegistrationToken, void>({
			query: (): {
				url: string
				method: string
				headers: { Authorization: string }
			} => ({
				url: 'get_registration_token',
				method: 'POST',
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		}),
		getRegistrationDetails: build.mutation<RegistrationDetail, RegistrationDetailRequest>({
			query: (
				data
			): {
				url: string
				method: string
				body: RegistrationDetailRequest
				headers: { Authorization: string }
			} => ({
				url: 'get_registration_detail',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		}),
		getVehicleList: build.query<VehicleList, RegReq>({
			query: (
				data
			): {
				url: string
				method: string
				body: RegReq
				headers: { Authorization: string }
			} => ({
				url: 'get_vehicle_List',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		})
	})
})

export const {
	useGetRegistrationDetailsMutation,
	useGetRegistrationTokenQuery,
	useGetVehicleListQuery
} = registrationApi
