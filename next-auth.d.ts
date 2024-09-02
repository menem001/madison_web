import { type ValidateOTPResponse } from '@/services/models/common.models'
import 'next-auth'

type Token = string

declare module 'next-auth' {
	type User = ValidateOTPResponse['LoginResponse'] & {
		token: Token
	}

	type Session = {
		user: User
		token: Token
		exp: number
		expires: string
		iat: number
		jti: string
	}
}
