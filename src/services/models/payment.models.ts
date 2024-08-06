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
	MobileCode1: z.null(),
	MobileNo1: z.null()
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
			PolicyNo: z.string(),
			DebitNoteNo: z.string().nullable(),
			CreditNoteNo: z.string(),
			paymentUrl: z.string().nullable(),
			isError: z.boolean().nullable(),
			DepositResponse: z.string().nullable()
		})
		.nullable(),
	ErroCode: z.number()
})

export type InsertPaymentRes = z.infer<typeof InsertPaymentResponseSchema>
