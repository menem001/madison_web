'use client'

import { type PropsWithChildren } from 'react'
import { Header } from '../header'
import { ChatBot } from '../support'
import { CarRightSideBar } from './car-right-side-bar'
import { DetailsChecker } from './details-checker'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib'
import { PremiumSideBar } from './premium-sidebar'

export function CarLayout(props: PropsWithChildren) {
	const path = usePathname()
	return (
		<section className='flex h-screen w-full flex-col overflow-y-scroll'>
			<Header />
			{/* <ProgressIndicator /> */}
			<DetailsChecker>
				<section className='grid flex-grow grid-cols-3 px-12'>
					<div className='col-span-3 lg:col-span-2'>{props.children}</div>
					<div
						className={cn('sticky right-0 top-10 hidden max-h-[80svh] lg:flex', {
							'lg:hidden': path === '/car-insurance/2'
						})}>
						<CarRightSideBar />
					</div>
					<div
						className={cn('right-0 top-10 hidden lg:flex', {
							'lg:hidden': path === '/car-insurance/1'
						})}>
						<PremiumSideBar />
					</div>
				</section>
			</DetailsChecker>
			<div className='absolute bottom-10 right-10'>
				<ChatBot />
			</div>
		</section>
	)
}
