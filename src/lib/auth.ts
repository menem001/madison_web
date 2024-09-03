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
				tokens: {},
				reduxData: {}
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

					const res = await verifyOTP(req, 'Bearer ' + tokens)

					if (res.type === 'error') {
						console.log('error')
					} else if (!res.data) {
						console.log('no data')
					} else {
						const user = res.data.LoginResponse

						if (!user) {
							alert('Error While Logging In - Try Again')
						} else {
							if (res.data && res.type === 'success' && res.data !== undefined) {
								if (
									!res.data.isError &&
									res.data.LoginResponse &&
									res.data.LoginResponse.Message === 'Success'
								) {
									const insuranceId: string | null =
										res.data.LoginResponse.Result.LoginBranchDetails[0]
											.InsuranceId
									const brokerCode: string | null =
										res.data.LoginResponse.Result.LoginBranchDetails[0]
											.BrokerBranchCode
									const guestDetails = {
										agencyCode: res.data.LoginResponse.Result.OaCode,
										branchCode:
											res.data.LoginResponse.Result.LoginBranchDetails[0]
												.BranchCode,
										brokerCode: brokerCode !== null ? brokerCode : '',
										CustomerCode:
											res.data.LoginResponse.Result.CustomerCode !== null
												? res.data.LoginResponse.Result.CustomerCode
												: '',
										insuranceID: insuranceId !== null ? insuranceId : '',
										loginId: res.data.LoginResponse.Result.LoginId,
										productId:
											res.data.LoginResponse.Result.BrokerCompanyProducts[0]
												.ProductId,
										subUserType: res.data.LoginResponse.Result.SubUserType,
										token: res.data.LoginResponse.Result.Token,
										userType: res.data.LoginResponse.Result.UserType
									}
									return {
										...user,
										token: user.Result.Token,
										guestDetails: guestDetails
									}
								}
							}

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

			return token
		},
		async session({ session, token: _token }) {
			const user = omit(_token, 'token', 'iat', 'exp', 'jti')
			const token = _token.token
			const misc = pick(_token, 'iat', 'exp', 'jti')

			return { ...session, ...misc, user, token }
		},
		async redirect({ baseUrl }) {
			return `${baseUrl}/car-insurance/2`
		}
	}
}
