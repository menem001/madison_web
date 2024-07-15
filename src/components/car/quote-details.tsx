import { assets } from '@/assets'
import { getPolicyDateFormat } from '@/lib'
import Image from 'next/image'

export function QuoteDetails() {
	return (
		<div className='flex w-full flex-col gap-4 rounded-xl bg-white p-6 font-jakarta shadow-confirmContainerShadow'>
			<div className='flex flex-row items-center justify-between'>
				<h1 className='text-xl font-bold text-gray-600'>Car Insurance</h1>
				<h2 className='text-[22px] font-bold text-red-100'>
					$240<span className='text-sm'>/Base cover</span>
				</h2>
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
					<span className='font-jakarta text-xl font-bold'>Quote No: 301505</span>
					<span className='text-xs text-gray-500 font-inter'>
						Quote Date: {getPolicyDateFormat('start')}
					</span>
					<span className='text-xs text-gray-500 font-inter'>Currency: ZMW</span>
				</div>
				<div className='flex flex-col gap-1 font-jakarta'>
					<h2 className='text-lg font-bold'>
						{getPolicyDateFormat('start', new Date(Date.now() + 24 * 60 * 60 * 1000))}
					</h2>
					<span className='text-xs text-gray-500 font-inter'>Policy Start Date</span>
				</div>
				<div className='flex flex-col gap-1 font-jakarta'>
					<h2 className='text-lg font-bold'>{getPolicyDateFormat('end')}</h2>
					<span className='text-xs text-gray-500 font-inter'>Policy End Date</span>
				</div>
			</div>
		</div>
	)
}
