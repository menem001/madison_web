import {
	type MotorModelListResponse,
	type CurrencyListResponse,
	type MotorListResponse,
	type BodyTypeListResponse,
	type VehicleUsageListResponse,
	type GuestLoginResponse
} from '@/services/common.services'
import {
	type vehicleUsageRequest,
	type CommonModalRequest,
	type CurrencyRequest,
	type MotorModalRequest,
	type SaveMotorDetailRequest
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
			query: (data) => ({
				url: 'get_currency_list',
				method: 'POST',
				body: data
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
		saveMotorDetails: build.mutation<VehicleUsageListResponse, SaveMotorDetailRequest>({
			query: (data) => ({
				url: 'save_motor_details',
				method: 'POST',
				body: data
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
	useSaveMotorDetailsMutation
} = commonApi
