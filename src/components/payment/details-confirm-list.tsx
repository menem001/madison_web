'use client'

import { assets } from '@/assets'
import { useAppSelector } from '@/redux/hooks'
import Image from 'next/image'
import { Button } from '../ui'
import { useRouter } from 'next/navigation'

export function DetailsConfirmList() {
	const customerData = useAppSelector((state) => state.customerDetails)
	const policyStartDate = useAppSelector((state) => state.carInsurance.policyStartDate)
	const policyEndDate = useAppSelector((state) => state.carInsurance.policyEndDate)
	const currency = useAppSelector((state) => state.carInsurance.currency)

	const route = useRouter()

	function goToPay() {
		route.push('/car-insurance/payment')
	}

	return (
		<section className='flex flex-col gap-20 pb-10'>
			<div className='flex flex-col gap-6 lg:flex-row'>
				<div className='flex w-full flex-grow flex-col gap-5 rounded-md border border-gray-375 p-6 shadow-detailsContainerShadow'>
					<h2 className='font-inter font-medium'>Customer</h2>
					<div className='flex flex-col gap-3'>
						<div className='flex flex-row items-center justify-between font-inter text-sm font-medium'>
							<div className='flex flex-row items-center gap-2'>
								<Image
									alt='person'
									height={40}
									src={assets.icons.circlePerson}
									width={40}
								/>
								<h4>Customer</h4>
							</div>
							<h4 className='w-1/2 truncate text-right'>{customerData.name}</h4>
						</div>
						<div className='flex flex-row items-center justify-between font-inter text-sm font-medium'>
							<div className='flex flex-row items-center gap-2'>
								<Image
									alt='person'
									height={40}
									src={assets.icons.circleMail}
									width={40}
								/>
								<h4>Email</h4>
							</div>
							<h4 className='w-1/2 truncate text-right'>{customerData.email}</h4>
						</div>
						<div className='flex flex-row items-center justify-between font-inter text-sm font-medium'>
							<div className='flex flex-row items-center gap-2'>
								<Image
									alt='person'
									height={40}
									src={assets.icons.circlePhone}
									width={40}
								/>
								<h4>Phone</h4>
							</div>
							<h4>{customerData.mobile}</h4>
						</div>
					</div>
				</div>
				<div className='flex w-full flex-grow flex-col gap-5 rounded-md border border-gray-375 p-6 shadow-detailsContainerShadow'>
					<h2 className='font-inter font-medium'>Address</h2>
					<div className='flex flex-col gap-6'>
						<div className='flex flex-row items-center justify-between'>
							<div className='flex flex-row items-start gap-2 font-inter text-sm font-medium'>
								<Image
									alt='person'
									height={40}
									src={assets.icons.circleLocation}
									width={40}
								/>
								<div className='flex w-full flex-col'>
									<h4 className='text-gray-525'>Billing</h4>
									<h4>{customerData.address}</h4>
									<h4>{customerData.cityName}</h4>
									<h4>{customerData.poBox}</h4>
								</div>
							</div>
						</div>
						<div className='flex flex-row items-center justify-between'>
							<div className='flex flex-row items-start gap-2 font-inter text-sm font-medium'>
								<Image
									alt='person'
									height={40}
									src={assets.icons.circleLocation}
									width={40}
								/>
								<div className='flex w-full flex-col'>
									<h4 className='text-gray-525'>Shipping</h4>
									<h4>{customerData.address}</h4>
									<h4>{customerData.cityName}</h4>
									<h4>{customerData.poBox}</h4>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='flex w-full flex-grow flex-col gap-5 rounded-md border border-gray-375 p-6 shadow-detailsContainerShadow'>
					<h2 className='font-inter font-medium'>PolicyDetails</h2>
					<div className='flex flex-col gap-3'>
						<div className='flex flex-row items-center justify-between font-inter text-sm font-medium'>
							<div className='flex flex-row items-center gap-2'>
								<Image
									alt='person'
									height={40}
									src={assets.icons.circlePaper}
									width={40}
								/>
								<h4>Policy start date</h4>
							</div>
							<h4>{policyStartDate}</h4>
						</div>
						<div className='flex flex-row items-center justify-between font-inter text-sm font-medium'>
							<div className='flex flex-row items-center gap-2'>
								<Image
									alt='person'
									height={40}
									src={assets.icons.circleTruck}
									width={40}
								/>
								<h4>Policy End date</h4>
							</div>
							<h4>{policyEndDate}</h4>
						</div>
						<div className='flex flex-row items-center justify-between font-inter text-sm font-medium'>
							<div className='flex flex-row items-center gap-2'>
								<Image
									alt='person'
									height={40}
									src={assets.icons.circleVerify}
									width={40}
								/>
								<h4>Currency</h4>
							</div>
							<h4>{currency}</h4>
						</div>
					</div>
				</div>
			</div>
			<div className='flex flex-col items-center justify-center gap-4'>
				<Button
					className='h-12 w-3/4 bg-blue-700 lg:w-1/2'
					variant='bluebtn'
					onClick={goToPay}>
					Preview & Submit
				</Button>
				<h5 className='w-1/2 text-center font-jakarta text-[10px] font-normal lg:text-xs'>
					By confirming your subscription, you allow The Outdoor Inn Crowd Limited to
					charge your card for this payment and future payments in accordance with their
					terms. You can always cancel your subscription.
				</h5>
			</div>
		</section>
	)
}
