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
