'use client'

import { useAppSelector } from '@/redux/hooks'

export function ConfirmDetails() {
	const vehicleData = useAppSelector((state) => state.carInsurance)
	return (
		<div className='flex h-full w-full flex-col justify-center gap-4 rounded-xl bg-white p-6 font-jakarta shadow-confirmContainerShadow'>
			<div className='flex flex-row items-center justify-between'>
				<h1 className='text-xl font-bold text-gray-600'>Motor details</h1>
				<h4 className='font-inter text-sm'>
					Usage: <span className='font-bold'>{vehicleData.vehicleUsage}</span>
				</h4>
			</div>
			<div className='flex w-full flex-row items-center justify-around gap-6 rounded-md border-[0.5px] border-green-100 p-6 font-inter'>
				<div className='flex flex-col gap-2'>
					<h2 className='text-xl font-bold'>{vehicleData.mark}</h2>
					<span className='text-xs text-gray-500 '>Mark</span>
				</div>
				<div className='flex flex-col gap-2'>
					<h2 className='text-xl font-bold'>{vehicleData.model}</h2>
					<span className='text-xs text-gray-500'>Model</span>
				</div>
				<div className='flex flex-col gap-2'>
					<h2 className='text-xl font-bold'>{vehicleData.bodyType}</h2>
					<span className='text-xs text-gray-500'>Body Type</span>
				</div>
			</div>
		</div>
	)
}
