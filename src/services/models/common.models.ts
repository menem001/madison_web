import { z } from 'zod'

export const currencyCodeSchema = z.object({
	Code: z.string(),
	CodeDesc: z.string(),
	ExchangeRate: z.string(),
	MinRate: z.string(),
	MaxRate: z.string(),
	Status: z.string(),
})

export const currencyListAPISchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.string()),
	Result: z.array(currencyCodeSchema),
	ErroCode: z.number(),
})

export type CurrencyList = z.infer<typeof currencyListAPISchema>;
