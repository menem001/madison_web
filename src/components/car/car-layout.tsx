'use client'

import { useState, type PropsWithChildren } from 'react'
import { Header } from '../header'
import { ChatBot } from '../support'
import { CarBanner } from './car-banner'
import { usePathname } from 'next/navigation'
import { CarRightSideBar } from './car-right-side-bar'
import { cn } from '@/lib'
import { PremiumSideBar } from './premium-sidebar'
import { OTPDialogBox } from './otp-dialog-box'

export function CarLayout(props: PropsWithChildren) {
	const path = usePathname()

	const [otpOpen, setOtpOpen] = useState<boolean>(false)

	function getOtpDialogOpen() {
		setOtpOpen(true)
	}

	function closeOTPDialog() {
		setOtpOpen(false)
	}

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
				<div className='col-span-4 lg:col-span-3'>{props.children}</div>
				<div
					className={cn('sticky right-0 top-6 hidden max-h-[80svh] lg:flex', {
						'lg:hidden': path === '/car-insurance/2'
					})}>
					<CarRightSideBar />
				</div>
				<div
					className={cn('right-0 top-6 hidden lg:flex', {
						'lg:hidden': path === '/car-insurance/1'
					})}>
					<PremiumSideBar getOtp={getOtpDialogOpen} />
				</div>
			</section>
			<OTPDialogBox
				closeDialog={closeOTPDialog}
				otpOpen={otpOpen}
			/>
			<div className='fixed bottom-10 right-10'>
				<ChatBot />
			</div>
		</section>
	)
}
