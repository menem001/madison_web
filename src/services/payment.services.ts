import api, { type TResponse } from '@/lib/api'
import {
	type InsertPaymentReq,
	type InsertPaymentRes,
	InsertPaymentResponseSchema,
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

export type InsertPaymentResponse = TResponse<InsertPaymentRes>

export async function insertPayment(data: InsertPaymentReq, token: string | null) {
	return api.post<InsertPaymentRes>(endPoints.insertPayment, data, InsertPaymentResponseSchema, {
		headers: { Authorization: token }
	})
}
