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
				id: 'Vehicle Usage',
				field: 'Vehicle Usage',
				name: vehicleData.vehicleUsage
			},
			{
				id: 'Body Type',
				field: 'Body Type',
				name: vehicleData.bodyType.join(',')
			},
			{
				id: 'Car Brand',
				field: 'Car Brand',
				name: vehicleData.mark
			},
			{
				id: 'Manufacture Year',
				field: 'Manufacture Year',
				name: vehicleData.year
			},
			{
				id: 'Vehicle Description',
				field: 'Vehicle Description',
				name: vehicleData.description
			}
		]
	}, [
		vehicleData.bodyType,
		vehicleData.description,
		vehicleData.mark,
		vehicleData.vehicleUsage,
		vehicleData.year
	])

	useEffect(() => {
		let value = 0

		displayDataPage1.forEach((data) => {
			if (data.field === 'Body Type' && vehicleData.bodyType.length !== 0) {
				value += 20
			} else if (data.field === 'Manufacture Year' && vehicleData.year === 0) {
				value += 0
			} else {
				if (data.name !== '') {
					value += 20
				}
			}
		})
		setCurrentPageRate(value)
	}, [displayDataPage1, path, vehicleData.bodyType.length, vehicleData.year])

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
