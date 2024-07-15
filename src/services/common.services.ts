import api, { type TResponse } from '@/lib/api'
import { currencyListAPISchema, type CurrencyList } from './models/common.models'

export type CurrencyListResponse = TResponse<CurrencyList>;

export async function getCurrencyList() {
	return api.post<CurrencyList>('/master/dropdown/productcurrency', {'InsuranceId':'100004','ProductId':'5','BranchCode':'46'},
		currencyListAPISchema
	)
}
