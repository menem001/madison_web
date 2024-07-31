'use client'

import { assets } from '@/assets'
import { getPolicyDateFormatFromDate } from '@/lib'
import { useAppSelector } from '@/redux/hooks'
import Image from 'next/image'
import { BackButton } from '../common/back_btn'

export default function ConfirmPremiumDetails() {
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const quoteNo = useAppSelector((state) => state.motor.QuoteNo)
	const premiumValueLC = useAppSelector((state) => state.premiummotor.premiumIncludedTaxLC)
	const EApremiumValueLC = useAppSelector((state) => state.premiummotor.EAPremiumIncluedTaxLC)

	const total = premiumValueLC + EApremiumValueLC
	const fixedTotal = total.toFixed(2)

	const parts = vehicleData.policyStartDate.split('/')
	const dateObject = new Date(+parts[2], +parts[1] - 1, +parts[0])
	const startDatetimestamp = dateObject.getTime()

	const endParts = vehicleData.policyEndDate.split('/')
	const endDateObject = new Date(+endParts[2], +endParts[1] - 1, +endParts[0])
	const endDatetimestamp = endDateObject.getTime()

	const policyStartDate = getPolicyDateFormatFromDate(new Date(startDatetimestamp))
	const policyEndDate = getPolicyDateFormatFromDate(new Date(endDatetimestamp))

	return (
		<section className='flex flex-col gap-5'>
			<BackButton />
			<div className='flex flex-row items-end justify-between font-inter'>
				<div className='text-2xl font-bold'>Premium Details</div>
				<div className='flex flex-row items-end gap-8 font-jakarta'>
					<h4 className='flex flex-row gap-2'>
						BodyType:
						<span className='font-inter font-bold'>{vehicleData.bodyType}</span>
					</h4>
					<h4 className='flex flex-row gap-2'>
						Usage:
						<span className='font-inter font-bold'>{vehicleData.vehicleUsage}</span>
					</h4>
					<h4 className='flex flex-row gap-2 text-3xl font-bold text-[#FF8682]'>
						{fixedTotal} ZWM
					</h4>
				</div>
			</div>
			<div className='flex flex-row items-center justify-start gap-6 rounded-md border-[0.5px] border-green-100 p-6'>
				<div className='flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-blue-300'>
					<Image
						alt='car'
						height={35}
						src={assets.icons.carIcon}
						width={35}
					/>
				</div>
				<div className='flex flex-grow flex-col gap-1'>
					<span className='font-jakarta text-xl font-bold'>Quote No: {quoteNo}</span>
					<span className='font-inter text-xs text-gray-500'>
						Quote Date: {vehicleData.policyStartDate}
					</span>
					<span className='font-inter text-xs text-gray-500'>
						Currency: {vehicleData.currency}
					</span>
				</div>
				<div className='flex flex-col gap-1 font-jakarta'>
					<h2 className='text-lg font-bold'>{policyStartDate}</h2>
					<span className='font-inter text-xs text-gray-500'>Policy Start Date</span>
				</div>
				<div className='flex flex-col gap-1 font-jakarta'>
					<h2 className='text-lg font-bold'>{policyEndDate}</h2>
					<span className='font-inter text-xs text-gray-500'>Policy End Date</span>
				</div>
			</div>
			<div className='flex w-full items-center justify-center gap-2 border-b-[0.5px] border-green-75 border-opacity-25 pb-4 font-medium'>
				Your Insurance is protected by <span className='font-bold'>Madison Insurance</span>
			</div>
		</section>
	)
}
