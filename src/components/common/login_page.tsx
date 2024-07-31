'use client'

import { useState } from 'react'
import OnboardingLayout from '../onboard/OnboardingLayout'
import { Button, Input } from '../ui'
import { Label } from '../ui/label'

export function LoginPage() {
	const [mobile, setMobile] = useState<string>('')

	return (
		<OnboardingLayout>
			<div className='flex h-full flex-col items-center justify-center gap-6 px-6 py-6 font-inter font-roboto lg:items-start lg:gap-12 lg:py-0 lg:pr-10'>
				<div className='flex w-full flex-col items-center justify-around gap-10 font-roboto'>
					<div className='flex flex-col items-center gap-6'>
						<h1 className='text-3xl font-medium lg:text-4xl'>Login</h1>
						<div className='relative mr-auto w-3/4 border-4 border-blue-300'></div>
						<span className='max-w-[340px] text-center'>
							Enter you mobile number to login
						</span>
					</div>
				</div>
				<div className='flex w-full flex-col gap-1'>
					<Label
						className='font-roboto text-sm font-medium text-black'
						htmlFor='mobile'>
						Mobile Number
					</Label>
					<Input
						id='mobile'
						placeholder='Enter your Mobile Number'
						type='tel'
						value={mobile}
						onChange={(e) => {
							setMobile(e.target.value)
						}}
					/>
				</div>
				<Button
					className='w-full'
					variant='bluebtn'>
					Login with OTP
				</Button>
			</div>
		</OnboardingLayout>
	)
}
