'use client'

import { cn } from '@/lib'
import { useAppSelector } from '@/redux/hooks'
import { usePathname } from 'next/navigation'
import { Fragment, useEffect, useMemo, useState } from 'react'

export function ProgressIndicator() {
	const path = usePathname()

	const vehicleData = useAppSelector((state) => state.carInsurance)

	const displayDataPage1 = useMemo(() => {
		return [
			{
				id: 'Car Brand',
				field: 'Car Brand',
				name: vehicleData.mark
			},
			{
				id: 'Car Model',
				field: 'Car Model',
				name: vehicleData.model
			},
			{
				id: 'Usage type',
				field: 'Usage type',
				name: vehicleData.vehicleUsage
			},
			{
				id: 'Body Type',
				field: 'Body Type',
				name: vehicleData.bodyType.join(',')
			},
			{
				id: 'Fuel Type',
				field: 'Fuel Type',
				name: vehicleData.fuelType
			}
		]
	}, [
		vehicleData.bodyType,
		vehicleData.fuelType,
		vehicleData.mark,
		vehicleData.model,
		vehicleData.vehicleUsage
	])

	const displayDataPage2 = useMemo(() => {
		return [
			{
				id: 'Horse Power',
				field: 'Horse Power',
				name: vehicleData.horsePower
			},
			{
				id: 'Tonnage',
				field: 'Tonnage',
				name: vehicleData.tonnage
			},
			{
				id: 'Sum Insured',
				field: 'Sum Insured',
				name: vehicleData.sumInsured
			},
			{
				id: 'Deductibles',
				field: 'Deductibles',
				name: vehicleData.deductibles
			}
		]
	}, [
		vehicleData.deductibles,
		vehicleData.horsePower,
		vehicleData.sumInsured,
		vehicleData.tonnage
	])

	const isPage1 = path === '/car-insurance/1'

	const [currentPageRate, setCurrentPageRate] = useState<number>(1)

	useEffect(() => {
		let value = 0

		if (path === '/car-insurance/1') {
			displayDataPage1.forEach((data) => {
				if (data.field === 'Body Type' && vehicleData.bodyType.length !== 0) {
					value += 1
				} else {
					if (data.name !== '') {
						value += 1
					}
				}
			})
			setCurrentPageRate(value)
		} else {
			displayDataPage2.forEach((data) => {
				if (data.field === 'Sum Insured' && vehicleData.sumInsured === 0) {
					value += 0
				} else if (data.field === 'Deductibles' && vehicleData.deductibles === 0) {
					value += 0
				} else {
					if (data.name !== '') {
						value += 1
					}
				}
			})
			setCurrentPageRate(value)
		}
	}, [
		displayDataPage1,
		displayDataPage2,
		path,
		vehicleData.bodyType.length,
		vehicleData.deductibles,
		vehicleData.sumInsured
	])

	return (
		<div className='sticky top-20 z-10 flex h-full w-full bg-white p-[26px] shadow-sm'>
			{isPage1 && (
				<div className='flex w-full flex-row items-center justify-between lg:px-20'>
					{displayDataPage1.map((item, index) => {
						return (
							<Fragment key={item.id}>
								<div className='flex min-w-20 flex-col items-center gap-2 md:min-w-32 xl:min-w-44'>
									<div
										className={cn(
											'flex h-9 w-9 items-center justify-center rounded-full border border-gray-400 bg-transparent text-gray-400',
											{
												'border-none bg-blue-400 text-white':
													index < currentPageRate,
												'border border-blue-500 bg-blue-800 text-blue-500':
													index === currentPageRate
											}
										)}>
										{index + 1}
									</div>
									<span className='font-inter text-xs md:text-base md:font-semibold'>
										{item.field}
									</span>
								</div>
								{index < 4 && (
									<Fragment>
										{index < currentPageRate ? (
											<div className='mx-2 mb-9 w-full border-t-2 border-blue-500 md:mb-6'></div>
										) : (
											<div className='mx-2 mb-9 w-full border-t border-dashed border-gray-500 md:mb-6'></div>
										)}
									</Fragment>
								)}
							</Fragment>
						)
					})}
				</div>
			)}
			{!isPage1 && (
				<div className='flex w-full flex-row items-center justify-between lg:px-20'>
					{displayDataPage2.map((item, index) => {
						return (
							<Fragment key={item.id}>
								<div className='flex min-w-20 flex-col items-center gap-2 md:min-w-32 xl:min-w-44'>
									<div
										className={cn(
											'flex h-9 w-9 items-center justify-center rounded-full border border-gray-400 bg-transparent text-gray-400',
											{
												'border-none bg-blue-400 text-white':
													index < currentPageRate,
												'border border-blue-500 bg-blue-800 text-blue-500':
													index === currentPageRate
											}
										)}>
										{index + 1}
									</div>
									<span className='font-inter text-xs md:text-base md:font-semibold'>
										{item.field}
									</span>
								</div>
								{index < 3 && (
									<Fragment>
										{index < currentPageRate ? (
											<div className='mb-6 w-full border-t-2 border-blue-500'></div>
										) : (
											<div className='mb-6 w-full border-t border-dotted border-gray-500'></div>
										)}
									</Fragment>
								)}
							</Fragment>
						)
					})}
				</div>
			)}
		</div>
	)
}
