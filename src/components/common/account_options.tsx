'use client'

import { cn, createAccountOptions } from '@/lib'
import { useState } from 'react'
import { Button } from '../ui'
import { useRouter } from 'next/navigation'

export function AccountOptions() {
	const [method, setMethod] = useState<number>(0)

	const route = useRouter()

	function navigateToCustomer() {
		if (method === 1) {
			route.push('/car-insurance/details/customer-details')
		}
	}

	return (
		<section className='flex h-full w-full flex-col items-center justify-center gap-8'>
			<div className='flex flex-col items-center justify-center gap-4 font-jakarta'>
				<h1 className='text-[28px] font-semibold text-blue-300'>Get Started with Us</h1>
				<h3 className='w-3/4 text-center'>
					Complete these easy steps to register your account.
				</h3>
			</div>
			<div className='flex w-4/5 flex-col items-center justify-center gap-4'>
				{createAccountOptions.map((option) => {
					return (
						<div
							key={option.id}
							className={cn(
								'flex cursor-pointer flex-col gap-3 rounded-lg bg-white px-6 py-5 shadow-lg',
								{ 'bg-blue-300': method === option.id }
							)}
							onClick={() => {
								setMethod(option.id)
							}}>
							<div
								className={cn(
									'flex h-6 w-6 items-center justify-center rounded-full bg-blue-300 text-white',
									{ 'bg-white text-blue-300': method === option.id }
								)}>
								{option.id}
							</div>
							<span
								className={cn('font-normal text-blue-300', {
									'font-semibold text-white': method === option.id
								})}>
								{option.optionName}
							</span>
							<span
								className={cn('text-sm text-gray-400', {
									'text-white': method === option.id
								})}>
								{option.optionDescription}
							</span>
						</div>
					)
				})}
			</div>
			<Button
				className='mt-10 w-3/4'
				variant='bluebtn'
				onClick={navigateToCustomer}>
				Continue
			</Button>
		</section>
	)
}
