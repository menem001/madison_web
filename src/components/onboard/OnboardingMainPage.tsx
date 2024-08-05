'use client'

import React, { useState } from 'react'
import OnboardingLayout from './OnboardingLayout'
import { cn, onBoardingOptions } from '@/lib'
import { Button } from '../ui'
import { useRouter } from 'next/navigation'

export default function OnboardingMainPage() {
	const [method, setMethod] = useState<number>(1)

	const route = useRouter()

	function navigate() {
		if (method === 1) {
			route.push('/car-insurance/1')
		} else {
			route.push('/car-insurance/onboard/get-info')
		}
	}

	return (
		<OnboardingLayout>
			<div className='flex h-full w-full items-center justify-center'>
				<div className='flex h-full flex-col items-center justify-center gap-6 py-6 font-roboto lg:gap-12 lg:py-0'>
					<div className='flex flex-col items-center justify-center gap-4 font-jakarta'>
						<h1 className='text-3xl font-medium lg:text-[40px]'>Get Started With Us</h1>
						<span className='max-w-[340px] text-center font-inter text-base lg:text-xl'>
							Complete these easy steps to register your account.
						</span>
					</div>
					<div className='flex w-3/4 flex-col items-center gap-3 font-roboto lg:gap-5'>
						{onBoardingOptions.map((option) => {
							return (
								<div
									key={option.id}
									className={cn(
										'flex cursor-pointer flex-col gap-3 rounded-lg border-2 border-gray-450 bg-[#FFFFFF14] px-3 py-2 backdrop-blur-md lg:px-6 lg:py-5',
										{
											'border-blue-700 bg-white': method === option.id
										}
									)}
									onClick={() => {
										setMethod(option.id)
									}}>
									<div
										className={cn(
											'flex h-6 w-6 items-center justify-center rounded-full bg-gray-350 text-sm text-black lg:text-base',
											{
												'bg-black text-white': method === option.id
											}
										)}>
										{option.id}
									</div>
									<span
										className={cn('text-sm font-normal lg:text-base', {
											'font-semibold text-black': method === option.id
										})}>
										{option.optionName}
									</span>
									<span className='text-textplaceholder text-xs text-gray-425 lg:text-sm'>
										{option.optionDescription}
									</span>
								</div>
							)
						})}
					</div>
					<Button
						className='w-3/4'
						variant='bluebtn'
						onClick={navigate}>
						Submit
					</Button>
				</div>
			</div>
		</OnboardingLayout>
	)
}
