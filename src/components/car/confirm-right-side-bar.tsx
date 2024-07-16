import { assets } from '@/assets'
import Image from 'next/image'

export function ConfirmRightSideBar() {
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
					<div className='flex flex-col justify-around'>
						<div className='flex flex-col gap-1'>
							<h4 className='text-green-75 text-sm font-bold opacity-75'>
								RefNumber No:
							</h4>
							<h4 className='text-green-75 font-bold'>Model and make</h4>
						</div>
						<div className='flex flex-row items-center gap-2'>
							<span className='rounded-lg border border-green-100 p-2 text-xs font-semibold'>
								4 seats
							</span>
							<span className='text-green-75 text-xs font-bold'>Model Type</span>
						</div>
					</div>
				</div>
				<div className='border-green-75 border-y-[0.5px] border-opacity-25 py-4'>
					Your Insurance is protected by{' '}
					<span className='font-bold'>Sanlam Insurance</span>
				</div>
				<div className='flex flex-col gap-4'>
					<h1 className='font-jakarta text-2xl font-bold text-blue-300'>
						Third Party Liability Only
					</h1>
					<div className='flex flex-row justify-between'>
						<span>Base Fare</span>
						<span>$240</span>
					</div>
					<div className='flex flex-row justify-between'>
						<span>Annual Premium (MUR)</span>
						<span>$0</span>
					</div>
					<div className='flex flex-row justify-between'>
						<span>After Discount (MUR)</span>
						<span>$20</span>
					</div>
				</div>
				<div className='border-green-75 flex flex-col gap-4 border-b-[0.5px] border-opacity-25 pb-4'>
					<h1 className='font-jakarta text-2xl font-bold text-blue-300'>Comprehensive</h1>
					<div className='flex flex-row justify-between'>
						<span>Base Fare</span>
						<span>$240</span>
					</div>
					<div className='flex flex-row justify-between'>
						<span>Annual Premium (MUR)</span>
						<span>$0</span>
					</div>
					<div className='flex flex-row justify-between'>
						<span>After Discount (MUR)</span>
						<span>$20</span>
					</div>
					<div className='flex flex-row justify-between'>
						<span>Service Fee</span>
						<span>$5</span>
					</div>
				</div>
				<div className='flex flex-row justify-between'>
					<span>Total</span>
					<span>$165</span>
				</div>
			</div>
		</section>
	)
}
