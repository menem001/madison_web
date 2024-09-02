import { verifyOTP } from '@/services/common.services'
import { type AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { omit, pick } from './utils'
// import { omit, pick } from './utils'

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			id: 'verify-otp',
			credentials: {
				CompanyId: {},
				ProductId: {},
				AgencyCode: {},
				OtpToken: {},
				UserOTP: {},
				CreateUser: {},
				CustomerId: {},
				ReferenceNo: {},
				tokens: {}
			},
			async authorize(data) {
				try {
					if (!data) throw new Error('No data')

					const {
						CompanyId,
						ProductId,
						AgencyCode,
						OtpToken,
						UserOTP,
						CreateUser,
						CustomerId,
						tokens,
						ReferenceNo
					} = data

					const req = {
						CompanyId,
						ProductId,
						AgencyCode,
						OtpToken: Number(OtpToken),
						UserOTP: String(UserOTP),
						CreateUser: CreateUser === 'true',
						CustomerId,
						ReferenceNo
					}

					console.log('Request:', req) // Log the request
					console.log('Tokens:', tokens) // Log the tokens

					const res = await verifyOTP(req, 'Bearer ' + tokens)

					console.log('Response:', res) // Log the response

					if (res.type === 'error') {
						console.log('error')
					} else if (!res.data) {
						console.log('no data')
					} else {
						const user = res.data.LoginResponse

						if (!user) {
							console.log(' no user')
						} else {
							return { ...user, token: user.Result.Token }
						}
					}
				} catch (error) {
					console.log('Authorization error:', error)
				}

				return { id: 1 }
			}
		})
	],
	callbacks: {
		async jwt({ token, user, trigger, session }) {
			if (user) {
				token = { ...token, ...user, authSuccess: true } // Indicate success
			} else if (!user && trigger === 'signIn') {
				token.authSuccess = false // Indicate failure
			}

			if (trigger === 'update' && session) {
				const field = session.field
				token[field] = session.value
			}

			console.log('JWT Callback:', token, user, trigger, session)
			return token
		},
		async session({ session, token: _token }) {
			const user = omit(_token, 'token', 'iat', 'exp', 'jti')
			const token = _token.token
			const misc = pick(_token, 'iat', 'exp', 'jti')

			console.log('Session:', { ...session, ...misc, user, token })

			return { ...session, ...misc, user, token }
		},
		async redirect({ baseUrl }) {
			return `${baseUrl}/car-insurance/details/customer-details`
		}
	}
}
