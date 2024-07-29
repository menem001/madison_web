import api, { type TResponse } from '@/lib/api'
import {
	type MakePaymentReq,
	type MakePaymentRes,
	MakePaymentResponseSchema
} from './models/payment.models'
import endPoints from './endpoints'

export type MakePaymentResponse = TResponse<MakePaymentRes>

export async function makePayment(data: MakePaymentReq, token: string | null) {
	return api.post<MakePaymentRes>(endPoints.makePayment, data, MakePaymentResponseSchema, {
		headers: { Authorization: token }
	})
}
