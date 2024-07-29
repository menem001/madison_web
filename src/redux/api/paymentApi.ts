import type { Action, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { store } from '../store'
import { type MakePaymentResponse } from '@/services/payment.services'
import { type MakePaymentReq } from '@/services/models/payment.models'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RootState = any // normally inferred from state

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
	// eslint-disable-next-line indent
	return action.type === HYDRATE
}

export const paymentApi = createApi({
	reducerPath: 'payment',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api/payment/'
	}),
	extractRehydrationInfo(action, { reducerPath }) {
		if (isHydrateAction(action)) {
			return action.payload[reducerPath]
		}
	},
	endpoints: (build) => ({
		makePayment: build.mutation<MakePaymentResponse, MakePaymentReq>({
			query: (
				data
			): {
				url: string
				method: string
				body: MakePaymentReq
				headers: { Authorization: string }
			} => ({
				url: 'make_payment',
				method: 'POST',
				body: data,
				headers: { Authorization: `Bearer ${store.getState().apps.token}` }
			})
		})
	})
})

export const { useMakePaymentMutation } = paymentApi
