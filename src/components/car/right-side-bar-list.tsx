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

	const displayDataPage2 = [
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
							? 'Mark, Model , Engine, Body, Type'
							: 'Horse Power, Tonnage, Sum Insured, Deductibles'}
					</span>
				</div>
			</div>
			<div className='flex flex-col gap-[9px]'>
				<div className='flex flex-col gap-[9px]'>
					{isPage1 ? (
						<ShowList data={displayDataPage1} />
					) : (
						<ShowList data={displayDataPage2} />
					)}
				</div>
			</div>
		</Fragment>
	)
}
