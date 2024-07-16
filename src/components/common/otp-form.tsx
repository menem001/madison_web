'use client'

import { Button } from '../ui'
import { useRouter } from 'next/navigation'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'
import { useAppSelector } from '@/redux/hooks'

export function OtpForm() {
	const route = useRouter()

	const customerData = useAppSelector((state) => state.customerDetails)

	function navigateToDetails() {
		route.push('/car-insurance/details')
	}

	const mobile = customerData.mobile === '' ? '7485981113' : customerData.mobile

	return (
		<section className='flex h-full w-full flex-col items-center justify-center gap-10'>
			<div className='flex flex-col items-center justify-center gap-4 font-jakarta'>
				<h1 className='text-[28px] font-semibold text-blue-300'>OTP Verification</h1>
				<h3 className='w-3/4 text-center'>
					To buy the policy, Please enter the OTP here from SMS
				</h3>
			</div>
			<div className='text-gray-400'>
				Enter OTP sent to <span className='text-blue-300'>{mobile}</span>{' '}
				<span className='text-xs underline'>edit</span>
			</div>
			<div className='flex w-4/5 flex-col items-center justify-center gap-4'>
				<InputOTP
					maxLength={4}
					size={70}>
					<InputOTPGroup>
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
						<InputOTPSlot index={2} />
						<InputOTPSlot index={3} />
					</InputOTPGroup>
				</InputOTP>
			</div>
			<Button
				className='w-3/4'
				variant='bluebtn'
				onClick={navigateToDetails}>
				Verify & Submit
			</Button>
		</section>
	)
}
