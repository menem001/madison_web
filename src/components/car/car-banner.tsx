import Image from 'next/image'
import { Button } from '../ui'
import { assets } from '@/assets'

export function CarBanner() {
	return (
		<section className='bg-blue-375 flex flex-col-reverse items-center justify-between gap-4 lg:flex-row'>
			<div className='flex basis-7/12 flex-col items-center gap-6 p-4 text-white lg:p-10 xl:p-20'>
				<h1 className='font-jakarta text-lg font-extrabold md:text-2xl lg:text-3xl lg:leading-12 xl:text-[42px]'>
					1. Lets Starts with Vehicle Info
				</h1>
				<h3 className='text-center font-roboto text-xs font-normal md:text-sm lg:text-base'>
					This is the first step to purchase the motor Insurance. Please fill out the
					following information correctly.
				</h3>
				<Button
					className='rounded-[50px] p-4 px-8 py-4 text-xs font-semibold md:text-sm lg:text-lg'
					variant='whiteRounded'>
					Continue
				</Button>
			</div>
			<div className='py-5'>
				<Image
					alt='carBanner'
					height={270}
					src={assets.images.sClass}
					width={675}
				/>
			</div>
		</section>
	)
}
