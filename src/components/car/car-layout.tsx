'use client'

import { type PropsWithChildren } from 'react'
import { Header } from '../header'
import { ChatBot } from '../support'
import { CarBanner } from './car-banner'
import Image from 'next/image'
import { assets } from '@/assets'

export function CarLayout(props: PropsWithChildren) {
	return (
		// <section className='flex h-screen w-full flex-col overflow-y-scroll'>
		// 	<Header />
		// 	<DetailsChecker>
		// 		<section className='flex flex-col'>
		// 			<section className='grid flex-grow grid-cols-3 px-12'>
		// 				<div className='col-span-3 lg:col-span-2'>{props.children}</div>
		// 				<div
		// 					className={cn('sticky right-0 top-6 hidden max-h-[80svh] lg:flex', {
		// 						'lg:hidden': path === '/car-insurance/2'
		// 					})}>
		// 					<CarRightSideBar />
		// 				</div>
		// 				<div
		// 					className={cn('right-0 top-6 hidden lg:flex', {
		// 						'lg:hidden': path === '/car-insurance/1'
		// 					})}>
		// 					<PremiumSideBar />
		// 				</div>
		// 			</section>
		// 			<div className='flex items-center justify-center lg:hidden'>
		// 				<PremiumSideBar />
		// 			</div>
		// 		</section>
		// 	</DetailsChecker>
		// 	<div className='absolute bottom-10 right-10'>
		// 		<ChatBot />
		// 	</div>
		// </section>
		<section className='relative flex w-full flex-col'>
			<Header />
			{/* <ProgressIndicator /> */}
			<CarBanner />
			<section className='grid flex-grow grid-cols-4 px-4 lg:px-12'>
				<div className='sticky right-0 top-10 hidden max-h-[80svh] lg:flex'>
					<Image
						alt='VehicleSketch'
						height={550}
						src={assets.images.vehicleSketch}
						width={500}
					/>
				</div>
				<div className='col-span-4 lg:col-span-3'>{props.children}</div>
			</section>
			<div className='fixed bottom-10 right-10'>
				<ChatBot />
			</div>
		</section>
	)
}
