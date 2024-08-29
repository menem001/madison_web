import api, { type TResponse } from '@/lib/api'
import {
	type CreateOrderRequest,
	type CreateOrderRes,
	createOrderResSchema,
	type InsertPaymentReq,
	type InsertPaymentRes,
	InsertPaymentResponseSchema,
	type MakePaymentReq,
	type MakePaymentRes,
	MakePaymentResponseSchema,
	type OrderStatusRes,
	orderStatusResSchema
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

export type CreateOrderResponse = TResponse<CreateOrderRes>

export async function createOrder(data: CreateOrderRequest, token: string | null) {
	return api.post<CreateOrderRes>(
		endPoints.createOrder + '/' + data.merchantRef,
		{ InsuranceId: data.InsuranceId },
		createOrderResSchema,
		{
			headers: { Authorization: token }
		}
	)
}

export type OrderStatusResponse = TResponse<OrderStatusRes>

export async function checkOrderStatus(QuoteNo: string, token: string | null) {
	return api.post<OrderStatusRes>(
		endPoints.orderStatus + '/' + QuoteNo,
		null,
		orderStatusResSchema,
		{
			headers: { Authorization: token }
		}
	)
}
