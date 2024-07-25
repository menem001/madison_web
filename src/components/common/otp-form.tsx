'use client'

import { Button } from '../ui'
import { useRouter } from 'next/navigation'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useGenerateOTPMutation, useVerifyOTPMutation } from '@/redux/api/commonApi'
import { useState } from 'react'
import { setGuestLoginDetails, setOTPToken } from '@/redux/slices'

export function OtpForm() {
	const route = useRouter()

	const customerData = useAppSelector((state) => state.customerDetails)
	const motorData = useAppSelector((state) => state.motor)
	const appData = useAppSelector((state) => state.apps)

	const dispatch = useAppDispatch()

	const [otpDisplay, setOtpDisplay] = useState<string>('')
	const [otp, setOtp] = useState<number>(0)
	const [otpGenerated, setOtpGenerated] = useState<boolean>(false)

	const [GenerateOTP] = useGenerateOTPMutation()
	const [verifyOTP] = useVerifyOTPMutation()

	function generateOtp() {
		const request = {
			CompanyId: appData.insuranceID,
			ProductId: appData.productId,
			LoginId: appData.loginId,
			TemplateName: null,
			OtpUser: {
				UserMailId: null,
				UserMobileNo: customerData.mobile,
				UserMobileCode: customerData.code,
				UserWhatsappNo: customerData.mobile,
				UserWhatsappCode: customerData.code,
				CustomerName: null
			}
		}
		const res = GenerateOTP(request)
		res.then((value) => {
			if (value.data && value.data.type === 'success' && value.data?.data !== undefined) {
				const tok = value.data.data.OtpToken
				const otp = value.data.data.OTP
				dispatch(setOTPToken(tok))
				setOtpDisplay(otp)
				setOtpGenerated(true)
			}
		})
	}

	function validate() {
		const request = {
			CompanyId: appData.insuranceID,
			ProductId: appData.productId,
			AgencyCode: appData.agencyCode,
			OtpToken: appData.otpToken,
			UserOTP: otp + '',
			CreateUser: true,
			CustomerId: motorData.CustomerReferenceNo,
			ReferenceNo: motorData.RequestReferenceNo
		}
		const res = verifyOTP(request)
		res.then((value) => {
			if (value.data && value.data.type === 'success' && value.data?.data !== undefined) {
				if (
					!value.data.data.isError &&
					value.data.data.LoginResponse &&
					value.data.data.LoginResponse.Message === 'Success'
				) {
					const insuranceId: string | null =
						value.data.data.LoginResponse.Result.LoginBranchDetails[0].InsuranceId
					const brokerCode: string | null =
						value.data.data.LoginResponse.Result.LoginBranchDetails[0].BrokerBranchCode
					dispatch(
						setGuestLoginDetails({
							agencyCode: value.data.data.LoginResponse.Result.OaCode,
							branchCode:
								value.data.data.LoginResponse.Result.LoginBranchDetails[0]
									.BranchCode,
							brokerCode: brokerCode !== null ? brokerCode : '',
							CustomerCode:
								value.data.data.LoginResponse.Result.CustomerCode !== null
									? value.data.data.LoginResponse.Result.CustomerCode
									: '',
							insuranceID: insuranceId !== null ? insuranceId : '',
							loginId: value.data.data.LoginResponse.Result.LoginId,
							productId:
								value.data.data.LoginResponse.Result.BrokerCompanyProducts[0]
									.ProductId,
							subUserType: value.data.data.LoginResponse.Result.SubUserType,
							token: value.data.data.LoginResponse.Result.Token,
							userType: value.data.data.LoginResponse.Result.UserType
						})
					)
					route.push('/car-insurance/details/customer-details')
				}
			}
		})
	}

	return (
		<section className='flex h-full w-full flex-col items-center justify-center gap-10'>
			<div className='flex flex-col items-center justify-center gap-4 font-jakarta'>
				<h1 className='text-[28px] font-semibold text-blue-300'>OTP Verification</h1>
				<h3 className='w-3/4 text-center'>
					To buy the policy, Please enter the OTP here from SMS
				</h3>
			</div>
			<div className='text-gray-400'>
				Enter OTP sent to <span className='text-blue-300'>{customerData.mobile}</span>{' '}
				<span className='text-xs underline'>edit</span>
			</div>
			{otpDisplay && (
				<h3>
					Current OTP: <span>{otpDisplay}</span>
				</h3>
			)}
			{otpGenerated ? (
				<>
					<div className='flex w-4/5 flex-col items-center justify-center gap-4'>
						<InputOTP
							maxLength={6}
							size={70}
							value={otp !== 0 ? otp + '' : undefined}
							onChange={(value) => {
								setOtp(+value)
							}}>
							<InputOTPGroup>
								<InputOTPSlot index={0} />
								<InputOTPSlot index={1} />
								<InputOTPSlot index={2} />
								<InputOTPSlot index={3} />
								<InputOTPSlot index={4} />
								<InputOTPSlot index={5} />
							</InputOTPGroup>
						</InputOTP>
						<Button
							className='w-3/4'
							variant='bluebtn'
							onClick={validate}>
							Verify & Submit
						</Button>
					</div>
				</>
			) : (
				<>
					<Button
						className='w-3/4'
						variant='bluebtn'
						onClick={generateOtp}>
						Generate Otp
					</Button>
				</>
			)}
		</section>
	)
}
