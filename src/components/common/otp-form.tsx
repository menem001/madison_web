'use client'

import { Button, Input } from '../ui'
// import { useRouter } from 'next/navigation'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useGenerateOTPMutation } from '@/redux/api/commonApi'
import { useEffect, useState } from 'react'
import { setGuestLoginDetails, setOTPToken, updateMobile } from '@/redux/slices'
import { cn } from '@/lib'
import { BackButton } from './back_btn'
import ClipLoader from 'react-spinners/ClipLoader'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function OtpForm() {
	const route = useRouter()

	const customerData = useAppSelector((state) => state.customerDetails)
	const motorData = useAppSelector((state) => state.motor)
	const appData = useAppSelector((state) => state.apps)

	const dispatch = useAppDispatch()
	const session = useSession()

	const [curMobile, setCurMobile] = useState<string>(customerData.mobile)

	const [otpDisplay, setOtpDisplay] = useState<string>('')
	const [otp, setOtp] = useState<string>('')
	const [otpGenerated, setOtpGenerated] = useState<boolean>(false)
	const [editNumber, setEditNumber] = useState<boolean>(false)

	const [GenerateOTP] = useGenerateOTPMutation()
	// const [verifyOTP] = useVerifyOTPMutation()

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

	useEffect(() => {
		generateOtp()
	}, [])

	function validate() {
		const request = {
			CompanyId: appData.insuranceID,
			ProductId: appData.productId,
			AgencyCode: appData.agencyCode,
			OtpToken: appData.otpToken,
			UserOTP: otp + '',
			CreateUser: true,
			CustomerId: motorData.CustomerReferenceNo,
			ReferenceNo: motorData.RequestReferenceNo,
			tokens: appData.token
		}
		signIn('verify-otp', request)
	}

	useEffect(() => {
		if (session.data !== null && session.data !== undefined) {
			const insuranceId: string | null =
				session.data.user.Result.LoginBranchDetails[0].InsuranceId
			const brokerCode: string | null =
				session.data.user.Result.LoginBranchDetails[0].BrokerBranchCode
			dispatch(
				setGuestLoginDetails({
					agencyCode: session.data.user.Result.OaCode,
					branchCode: session.data.user.Result.LoginBranchDetails[0].BranchCode,
					brokerCode: brokerCode !== null ? brokerCode : '',
					CustomerCode:
						session.data.user.Result.CustomerCode !== null
							? session.data.user.Result.CustomerCode
							: '',
					insuranceID: insuranceId !== null ? insuranceId : '',
					loginId: session.data.user.Result.LoginId,
					productId: session.data.user.Result.BrokerCompanyProducts[0].ProductId,
					subUserType: session.data.user.Result.SubUserType,
					token: session.data.user.Result.Token,
					userType: session.data.user.Result.UserType
				})
			)
			route.push('/car-insurance/details/customer-details')
		}
	}, [])

	return (
		<section className='flex h-full w-full flex-col items-center justify-center gap-10'>
			<div className='w-full lg:w-3/4'>
				<div className='self-start'>
					<BackButton />
				</div>
			</div>
			<div className='flex flex-col items-center justify-center gap-4 font-jakarta'>
				<h1 className='text-[28px] font-semibold text-blue-300'>OTP Verification</h1>
				<h3 className='w-full text-center lg:w-3/4'>
					To buy the policy, Please enter the OTP here from SMS
				</h3>
			</div>
			<div
				className={cn('flex flex-row items-center gap-2 text-gray-400', {
					'flex-col': editNumber
				})}>
				Enter OTP sent to{' '}
				{editNumber ? (
					<>
						<Input
							placeholder='Enter Mobile Number'
							type='number'
							value={curMobile}
							onChange={(e) => {
								setCurMobile(e.target.value)
							}}
						/>
						<Button
							disabled={curMobile.length !== 9}
							variant='bluebtn'
							onClick={() => {
								if (curMobile.length === 9) {
									dispatch(updateMobile(curMobile))
									setEditNumber(false)
								}
							}}>
							Save
						</Button>
					</>
				) : (
					<span className='text-blue-300'>{customerData.mobile}</span>
				)}{' '}
				{!editNumber && (
					<span
						className='cursor-pointer text-xs underline'
						onClick={() => {
							setEditNumber(true)
						}}>
						edit
					</span>
				)}
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
							value={otp !== '' ? otp + '' : undefined}
							onChange={(value) => {
								setOtp(value)
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
					<div className='flex w-4/5 flex-col items-center justify-center gap-4'>
						<ClipLoader color='#0C7BC4' />
					</div>
				</>
			)}
		</section>
	)
}
