'use client'

import { useAppSelector } from '@/redux/hooks'
import { Fragment } from 'react'
import { ShowList } from './show-list'

export function RightSideBarList() {
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const displayDataPage1 = [
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
			id: 'Seat Count',
			field: 'Seat Count',
			name: vehicleData.seat
		},
		{
			id: 'Manufacture Year',
			field: 'Manufacture Year',
			name: vehicleData.year
		},
		{
			id: 'Sum Insured',
			field: 'Sum Insured',
			name: vehicleData.value
		},
		{
			id: 'Driver DOB',
			field: 'Driver DOB',
			name: vehicleData.DriverDOB
		}
	]
	return (
		<Fragment>
			<div className='flex flex-row rounded-md bg-gray-66 font-inter'>
				<div className='flex items-center justify-center px-4'>
					<div className='flex h-6 w-6 items-center justify-center rounded-full bg-white text-blue-300'>
						<span>A</span>
					</div>
				</div>
				<div className='flex flex-col p-1'>
					<span className='line-clamp-1 text-[13px] font-semibold'>Vehicle Details</span>
					<span className='line-clamp-1 text-[11px] opacity-70'>
						Usage, Body, Mark, Year, Description
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
