'use client'

import { assets } from '@/assets'
import { useAppSelector } from '@/redux/hooks'
import Image from 'next/image'

export function ConfirmRightSideBar() {
	const motorData = useAppSelector((state) => state.motor)
	const premiumMotor = useAppSelector((state) => state.premiummotor)
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const total = premiumMotor.premiumIncludedTax + premiumMotor.EAPremiumIncluedTax
	const fixedTotal = total.toFixed(2)

	return (
		<section className='flex'>
			<div className='flex flex-col gap-4 rounded-lg p-6 shadow-md'>
				<div className='flex flex-row gap-6'>
					<div className='h-32 w-32'>
						<Image
							alt='car'
							className='h-full w-full object-contain object-center'
							height={500}
							src={assets.images.car}
							width={500}
						/>
					</div>
					<div className='flex flex-col justify-around gap-2'>
						<div className='flex flex-col gap-1'>
							<h4 className='text-sm font-bold text-green-75 opacity-75'>
								RefNumber No: {motorData.RequestReferenceNo}
							</h4>
							{motorData.QuoteNo !== '' && (
								<h4 className='text-sm font-bold text-green-75 opacity-75'>
									Quote No: {motorData.QuoteNo}
								</h4>
							)}
							<h4 className='font-bold text-green-75'>
								{vehicleData.mark} - {vehicleData.model}
							</h4>
						</div>
						<div className='flex w-full flex-row items-center gap-2'>
							<span className='rounded-lg border border-green-100 p-2 text-xs font-semibold'>
								{vehicleData.seat} seats
							</span>
							<span className='text-xs font-bold text-green-75'>
								{vehicleData.year} - {vehicleData.vehicleUsage}
							</span>
						</div>
						<div className='flex w-full flex-row justify-between gap-6'>
							<span className='flex flex-col text-sm font-bold text-green-75'>
								Policy Start Date
								<span className='font-normal'>{vehicleData.policyStartDate}</span>
							</span>
							<span className='flex flex-col text-sm font-bold text-green-75'>
								Policy End Date
								<span className='font-normal'>{vehicleData.policyEndDate}</span>
							</span>
						</div>
					</div>
				</div>
				<div className='border-y-[0.5px] border-green-75 border-opacity-25 py-4'>
					Your Insurance is protected by{' '}
					<span className='font-bold'>Madison Insurance</span>
				</div>
				<>
					<div className='flex flex-col gap-4'>
						<h1 className='font-jakarta text-2xl font-bold text-blue-300'>
							{vehicleData.insuranceClass}
						</h1>
						{vehicleData.insuranceClass !== 'TPO' && (
							<div className='flex flex-row justify-between'>
								<span>Sum Insured</span>
								<span>
									{vehicleData.value} {vehicleData.currency}
								</span>
							</div>
						)}
						<div className='flex flex-row justify-between'>
							<span>Base Fare</span>
							<span>
								{premiumMotor.baseFare} {vehicleData.currency}
							</span>
						</div>
						{premiumMotor.tax.map((tax, index) => {
							return (
								<div
									key={index}
									className='flex flex-row justify-between'>
									<span>{`${tax.name} ${tax.rate ? '(' + tax.rate + '%)' : ''}`}</span>
									<span>
										{tax.amount} {vehicleData.currency}
									</span>
								</div>
							)
						})}
					</div>
					<div className='flex flex-row justify-between border-b-[0.5px] border-green-75 border-opacity-25 pb-4 font-semibold'>
						<span>Premium Included Tax</span>
						<span>
							{premiumMotor.premiumIncludedTax} {vehicleData.currency}
						</span>
					</div>
					{+premiumMotor.EABase !== 0 && (
						<>
							<div className='flex flex-row justify-between'>
								<span>Electronic Accessories</span>
								<span>
									{premiumMotor.EABase} {vehicleData.currency}
								</span>
							</div>
							{premiumMotor.EATax.map((tax, index) => {
								return (
									<div
										key={index}
										className='flex flex-row justify-between'>
										<span>{`${tax.name} ${tax.rate ? '(' + tax.rate + '%)' : ''}`}</span>
										<span>
											{tax.amount} {vehicleData.currency}
										</span>
									</div>
								)
							})}
							<div className='flex flex-row justify-between border-b-[0.5px] border-green-75 border-opacity-25 pb-4 font-semibold'>
								<span>Premium Included Tax</span>
								<span>
									{premiumMotor.EAPremiumIncluedTax} {vehicleData.currency}
								</span>
							</div>
						</>
					)}
					<div className='flex flex-row justify-between font-bold'>
						<span>Grand Total</span>
						<span>{`${fixedTotal} ${vehicleData.currency}`}</span>
					</div>
				</>
			</div>
		</section>
	)
}
