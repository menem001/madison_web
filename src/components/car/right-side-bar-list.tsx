'use client'

import { useAppSelector } from '@/redux/hooks'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import { ShowList } from './show-list'

export function RightSideBarList() {
	const path = usePathname()

	const vehicleData = useAppSelector((state) => state.carInsurance)

	const displayDataPage1 = [
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

	const isPage1 = path === '/car-insurance/1'
	return (
		<Fragment>
			<div className='flex flex-row rounded-md bg-gray-66 font-inter'>
				<div className='flex items-center justify-center px-4'>
					<div className='flex h-6 w-6 items-center justify-center rounded-full bg-white text-blue-300'>
						<span>{isPage1 ? 'A' : 'B'}</span>
					</div>
				</div>
				<div className='flex flex-col p-2'>
					<span className='text-sm font-semibold'>Vehicle Details</span>
					<span className='text-xs opacity-70'>
						{isPage1
							? 'Usage, Body, Mark, Year, Description'
							: 'Horse Power, Tonnage, Sum Insured, Deductibles'}
					</span>
				</div>
			</div>
			<div className='flex flex-col gap-[9px]'>
				<div className='flex flex-col gap-[9px]'>
					<ShowList data={displayDataPage1} />
				</div>
			</div>
		</Fragment>
	)
}
