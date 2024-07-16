'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateCode, updateMobile, updateName } from '@/redux/slices'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRouter } from 'next/navigation'
import { Button, Input } from '../ui'
import { OtherOptions } from './other-options'

export function CustomerInfo() {
	const customerData = useAppSelector((state) => state.customerDetails)

	const dispatch = useAppDispatch()
	const router = useRouter()

	useGSAP(() => {
		gsap.from('.selectCustomerInfo', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
		gsap.to('.CustomerInfotitle', { duration: 0.5, text: 'Personal Details' })
		gsap.to('.CustomerInfosubtitle', {
			duration: 0.5,
			text: 'Please provide your details to proceed',
			delay: 0.5
		})
	})

	function goToConfirm() {
		router.push('/car-insurance/confirm')
	}

	return (
		<section className='flex w-4/5 flex-col gap-10'>
			<div className='flex flex-col gap-4'>
				<h1 className='font-jakarta text-[40px] font-semibold'>Customer Info</h1>
				<p className='w-4/5 text-sm font-medium text-gray-500'>
					Please fill out the form with accurate details about your customer. Ensure all
					information provided is correct and up-to-date.
				</p>
			</div>
			<div className='flex flex-col gap-7'>
				<div className='flex flex-col gap-2'>
					<h1 className='CustomerInfotitle font-jakarta text-xl font-bold text-blue-300'></h1>
					<span className='CustomerInfosubtitle font-roboto text-sm font-medium text-gray-500'></span>
				</div>
				<div className='selectCustomerInfo flex flex-row gap-10'>
					<Input
						placeholder='Customer Name'
						value={customerData.name}
						onChange={(e) => {
							dispatch(updateName(e.target.value))
						}}
					/>
				</div>
				<div className='selectCustomerInfo flex flex-row gap-10'>
					<Input
						className='max-w-20'
						placeholder='Code'
						value={customerData.code}
						onChange={(e) => {
							dispatch(updateCode(e.target.value))
						}}
					/>
					<Input
						placeholder='Mobile Number'
						value={customerData.mobile}
						onChange={(e) => {
							dispatch(updateMobile(e.target.value))
						}}
					/>
				</div>
			</div>
			<span className='selectCustomerInfo -mt-6 font-jakarta text-xs text-gray-500'>
				We&apos;ll call or text you to confirm your number. Standard message and data rates
				apply. <span className='font-semibold text-gray-600'>Privacy Policy</span>
			</span>
			<Button
				className='selectCustomerInfo w-full'
				variant='bluebtn'
				onClick={goToConfirm}>
				View Premium
			</Button>
			<div className='flex items-center justify-center'>
				<div className='relative w-full border-t border-green-50'>
					<span className='absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 transform bg-white px-2'>
						Or
					</span>
				</div>
			</div>
			<OtherOptions />
		</section>
	)
}
