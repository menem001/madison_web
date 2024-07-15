import type { CurrencyListResponse } from '@/services/common.services'
import type { Action, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RootState = any; // normally inferred from state

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
	return action.type === HYDRATE
}

export const commonApi = createApi({
	reducerPath: 'common',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api/common/',
	}),
	extractRehydrationInfo(action, { reducerPath }) {
		if (isHydrateAction(action)) {
			return action.payload[reducerPath]
		}
	},
	endpoints: (build) => ({
		getCurrencyList: build.query<CurrencyListResponse, void>({
			query: () => ({
				url: 'get_currency_list',
				method: 'POST',
			}),
		}),
	}),
})

export const { useGetCurrencyListQuery } = commonApi
