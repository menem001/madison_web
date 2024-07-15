'use client'

import { cn, createAccountOptions } from '@/lib'
import { useState } from 'react'

export function AccountOptions() {

	const [method, setMethod] = useState<number>(0)

	return(
		<section className="h-full w-full flex flex-col gap-20 items-center justify-center">
			<div className="flex flex-col gap-5 font-jakarta  items-center justify-center">
				<h1 className="text-blue-300 text-[40px] font-semibold">Get Started with Us</h1>
				<h3 className="text-xl w-3/4 text-center">Complete these easy steps to register your account.</h3>
			</div>
			<div className='flex flex-col gap-8 w-4/5 items-center justify-center'>
				{createAccountOptions.map((option) => {
					 return (
						<div
						  key={option.id}
						  className={cn('cursor-pointer flex flex-col gap-3 px-6 py-5 rounded-lg bg-white shadow-lg',
								{'bg-blue-300': method === option.id,})} onClick={() => {
								setMethod(option.id)
						  }}
						>
						  <div className={cn('text-white bg-blue-300 h-6 w-6 rounded-full flex items-center justify-center',
							  { 'bg-white text-blue-300': method === option.id, })}>
								{option.id}
						  </div>
						  <span className={cn('font-normal text-blue-300', {
							  'font-semibold text-white': method === option.id,})}>
								{option.optionName}
						  </span>
						  <span className={cn('text-gray-400 text-sm', {
								'text-white': method === option.id,
						  })}>
								{option.optionDescription}
						  </span>
						</div>
					  )
					
				})}
			</div>
		</section>
	)
}