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
				id: 'Vehicle Usage',
				field: 'Vehicle Usage',
				name: vehicleData.vehicleUsage
			},
			{
				id: 'Body Type',
				field: 'Body Type',
				name: vehicleData.bodyType
			},
			{
				id: 'Seat Count',
				field: 'Seat Count',
				name: vehicleData.seat
			},
			{
				id: 'Sum Insured',
				field: 'Sum Insured',
				name: vehicleData.value
			},
			{
				id: 'Manufacture Year',
				field: 'Manufacture Year',
				name: vehicleData.year
			},
			{
				id: 'Driver DOB',
				field: 'Driver DOB',
				name: vehicleData.DriverDOB
			}
		]
	}, [
		vehicleData.bodyType,
		vehicleData.mark,
		vehicleData.model,
		vehicleData.seat,
		vehicleData.value,
		vehicleData.vehicleUsage,
		vehicleData.year,
		vehicleData.DriverDOB
	])

	useEffect(() => {
		let value = 0

		displayDataPage1.forEach((data) => {
			if (data.field === 'Manufacture Year' && vehicleData.year === 0) {
				value += 0
			} else if (data.field === 'Seat Count' && vehicleData.seat === 0) {
				value += 0
			} else if (data.field === 'Sum Insured' && vehicleData.seat === 0) {
				value += 0
			} else {
				if (data.name !== '') {
					value += 12.5
				}
			}
		})
		setCurrentPageRate(value)
	}, [displayDataPage1, path, vehicleData.seat, vehicleData.year])

	return (
		<div className='flex flex-col items-start'>
			<div className='relative flex w-full flex-row'>
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
				<span className='font-bold text-green-200'>
					{currentPageRate === 100 && '🎉 Nice. Lets go 1 more round'}
				</span>
			</div>
		</div>
	)
}
