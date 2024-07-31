import { assets } from '@/assets'
import Image from 'next/image'
import { type PropsWithChildren } from 'react'
import { Header } from '../header'

export default function OTPLayout(props: PropsWithChildren) {
	return (
		<section className='flex h-screen w-full flex-col overflow-y-scroll'>
			<Header />
			<div className='flex h-full w-full flex-col gap-2 bg-gray-100 p-4 md:gap-6 md:p-6 lg:grid lg:grid-cols-2 lg:grid-rows-none lg:gap-8 lg:p-8'>
				<div className='block min-h-[45vh] w-full overflow-hidden rounded-2xl lg:hidden'>
					<Image
						alt='trip'
						className='h-auto w-full object-cover object-bottom'
						height={1000}
						src={assets.images.trip}
						width={1000}
					/>
				</div>
				{props.children}
				<div className='hidden h-[75vh] w-full overflow-hidden rounded-2xl lg:block'>
					<Image
						alt='trip'
						className='h-auto w-full object-cover object-center'
						height={1000}
						src={assets.images.trip}
						width={1000}
					/>
				</div>
			</div>
		</section>
	)
}
