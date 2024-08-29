import { z } from 'zod'

export const MakePaymentRequestSchema = z.object({
	CreatedBy: z.string(),
	EmiYn: z.string(),
	InstallmentMonth: z.null(),
	InstallmentPeriod: z.null(),
	InsuranceId: z.string(),
	Premium: z.string(),
	QuoteNo: z.string(),
	Remarks: z.string(),
	SubUserType: z.string(),
	UserType: z.string()
})

export type MakePaymentReq = z.infer<typeof MakePaymentRequestSchema>

export const MakePaymentResponseSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.unknown()),
	Result: z.object({
		QuoteNo: z.string(),
		PaymentId: z.string(),
		Response: z.string()
	}),
	ErroCode: z.number()
})

export type MakePaymentRes = z.infer<typeof MakePaymentResponseSchema>

export const InsertPaymentRequestSchema = z.object({
	CreatedBy: z.string(),
	InsuranceId: z.string(),
	EmiYn: z.string(),
	Premium: z.string(),
	QuoteNo: z.string(),
	Remarks: z.string(),
	PayeeName: z.string(),
	SubUserType: z.string(),
	UserType: z.string(),
	MICRNo: z.null(),
	BankName: z.null(),
	ChequeNo: z.null(),
	ChequeDate: z.string(),
	PaymentType: z.string(),
	Payments: z.string(),
	PaymentId: z.string(),
	AccountNumber: z.null(),
	IbanNumber: z.null(),
	WhatsappNo: z.null(),
	WhatsappCode: z.null(),
	MobileCode1: z.string().nullable(),
	MobileNo1: z.string().nullable()
})

export type InsertPaymentReq = z.infer<typeof InsertPaymentRequestSchema>

export const InsertPaymentResponseSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.unknown()),
	Result: z
		.object({
			QuoteNo: z.string(),
			PaymentId: z.string(),
			Response: z.string(),
			MerchantReference: z.string(),
			PolicyNo: z.string().nullable(),
			DebitNoteNo: z.string().nullable(),
			CreditNoteNo: z.string().nullable(),
			paymentUrl: z.string().nullable(),
			isError: z.boolean().nullable(),
			DepositResponse: z.string().nullable()
		})
		.nullable(),
	ErroCode: z.number()
})

export type InsertPaymentRes = z.infer<typeof InsertPaymentResponseSchema>

export const createOrderReqSchema = z.object({
	InsuranceId: z.string(),
	merchantRef: z.string()
})

export type CreateOrderRequest = z.infer<typeof createOrderReqSchema>

// export const createOrderResSchema = z.object({
// 	reference: z.string(),
// 	transid: z.string(),
// 	resultcode: z.string(),
// 	result: z.string(),
// 	message: z.string(),
// 	data: z.array(z.unknown())
// })

export const createOrderResSchema = z.object({
	amount: z.number(),
	transactionId: z.string(),
	externalId: z.string(),
	status: z.string(),
	message: z.string()
})

export type CreateOrderRes = z.infer<typeof createOrderResSchema>

export const orderStatusResSchema = z.object({
	result: z.string(),
	message: z.unknown()
})

export type OrderStatusRes = z.infer<typeof orderStatusResSchema>
