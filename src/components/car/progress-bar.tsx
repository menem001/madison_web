'use client'

import Image from 'next/image'
import { Progress } from '../ui'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { assets } from '@/assets'

export function ProgressBar() {

	const path = usePathname()
	
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const [currentPageRate, setCurrentPageRate] = useState<number>(0)

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

	useEffect(() => {
		let value = 0

		if (path === '/car-insurance/1') {
			displayDataPage1.forEach((data) => {
				if (data.field === 'Body Type' && vehicleData.bodyType.length !== 0) {
					value += 20
				} else {
					if (data.name !== '') {
						value += 20
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
						value += 25
					}
				}
			})
			setCurrentPageRate(value)
		}
	}, [displayDataPage1, displayDataPage2, path, vehicleData.bodyType.length, vehicleData.deductibles, vehicleData.sumInsured])

	return (
		<div className='flex flex-col items-start'>
			<div className='flex flex-row relative w-full'>
				<Progress value={currentPageRate} />
				<div className='absolute -right-1 -top-4 -z-10'>
					<Image
						alt='finish'
						height={32}
						src={assets.icons.finishLine}
						width={24}
					/>
				</div>
			</div>
			<div className='text-xs'>
				<span className='font-bold'>{currentPageRate}%</span> completed{' '}
				<span className='text-green-200 font-bold'>
					{currentPageRate === 100 && '🎉 Nice. Lets go 1 more round'}
				</span>
			</div>
		</div>
	)
}