import { z } from 'zod'

export const RegistrationResponseSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.any().nullable(),
	Result: z.array(
		z.object({
			firstName: z.string(),
			lastName: z.string(),
			id: z.number(),
			username: z.string(),
			token: z.string()
		})
	),
	ErroCode: z.number()
})

export type RegistrationTokenResponse = z.infer<typeof RegistrationResponseSchema>

export const RegistrationDetailRequestSchema = z.object({
	RegNo: z.string(),
	RequestToken: z.string()
})

export type RegistrationDetailRequest = z.infer<typeof RegistrationDetailRequestSchema>

export const RegistrationDetailResponseSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.any().nullable(),
	Result: z.string(),
	ErroCode: z.number()
})

export type RegistrationDetailResponse = z.infer<typeof RegistrationDetailResponseSchema>

export const VehicleListResponseSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.any().nullable(),
	Result: z.array(
		z.object({
			Registration_No: z.string(),
			MakeName: z.string(),
			ModelName: z.string(),
			EngineNo: z.string(),
			ChassisNo: z.string(),
			YearMake: z.string(),
			Gvm: z.string(),
			BodyType: z.string(),
			Color: z.string(),
			NumberOfSeats: z.string(),
			FirstRegDate: z.string(),
			CurrentLinenseExpDate: z.string(),
			RoadWortExpDate: z.string(),
			RegStatus: z.string()
		})
	),
	ErroCode: z.number()
})

export type VehicleListResponse = z.infer<typeof VehicleListResponseSchema>
