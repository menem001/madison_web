'use client'

import { pricingData } from '@/lib'
import { Button } from '../ui'
import { useRouter } from 'next/navigation'

export function PricingTable() {
	const route = useRouter()

	return (
		<>
			<section className='flex flex-col gap-4 px-20'>
				<section className='grid grid-cols-5 gap-5 border-b border-gray-90 pb-10'>
					<div className='flex flex-col items-start justify-center gap-3'>
						<div>Select Policy Date</div>
						<div className='flex flex-row gap-2'>
							<Button
								size='sm'
								variant='outline'>
								Start Date
							</Button>
							<Button
								size='sm'
								variant='outline'>
								End Date
							</Button>
						</div>
					</div>
					{pricingData.map((data, index) => {
						return (
							<div
								key={index}
								className='flex flex-col gap-6 rounded-md border border-gray-90 bg-white p-6 hover:bg-blue-900 hover:text-white'>
								<div className='flex flex-col gap-1 font-inter font-medium'>
									<span className='text-2xl'>{data.name}</span>
									<span className='text-3xl'>${data.price}</span>
									<span className='text-xs'>per user/month, billed annually</span>
								</div>
								<div>
									<Button
										className='w-full'
										variant='whiteBlackOutlined'
										onClick={() => {
											route.push('/car-insurance/confirm/otp-verify')
										}}>
										Buy Policy
									</Button>
								</div>
							</div>
						)
					})}
				</section>
				<div className='text-[28px] font-medium'>Workspace</div>
				<section className='grid grid-cols-5 gap-5 pb-10 font-inter'>
					<div className='grid grid-rows-2 gap-6'>
						<div className='border-b border-gray-90 pb-5 text-lg'>Number of seats</div>
						<div className='border-b border-gray-90 pb-5 text-lg'>
							Number of objects
						</div>
					</div>
					{pricingData.map((data, index) => {
						return (
							<div
								key={index}
								className='grid grid-rows-2 gap-6'>
								<div className='border-b border-gray-90 pb-5'>
									{data.WorkSpace.seats}
								</div>
								<div className='border-b border-gray-90 pb-5'>
									{data.WorkSpace.objects}
								</div>
							</div>
						)
					})}
				</section>
				<div className='text-[28px] font-medium'>Automation</div>
				<section className='grid grid-cols-5 gap-5 pb-10 font-inter'>
					<div className='grid grid-rows-1 gap-6'>
						<div className='border-b border-gray-90 pb-5 text-lg'>
							Number of credits
						</div>
					</div>
					{pricingData.map((data, index) => {
						return (
							<div
								key={index}
								className='grid grid-rows-1 gap-6'>
								<div className='border-b border-gray-90 pb-5'>
									{data.Automation.credits}
								</div>
							</div>
						)
					})}
				</section>
				<div className='text-[28px] font-medium'>Email and Calendar</div>
				<section className='grid grid-cols-5 gap-5 pb-10 font-inter'>
					<div className='grid grid-rows-1 gap-6'>
						<div className='border-b border-gray-90 pb-5 text-lg'>
							Number of storage
						</div>
					</div>
					{pricingData.map((data, index) => {
						return (
							<div
								key={index}
								className='grid grid-rows-1 gap-6'>
								<div className='border-b border-gray-90 pb-5'>
									{data.EmailCalendar.storage}
								</div>
							</div>
						)
					})}
				</section>
			</section>
		</>
	)
}
