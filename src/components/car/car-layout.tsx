import { type PropsWithChildren } from 'react'
import { Header } from '../header'
import { ChatBot } from '../support'
import { CarRightSideBar } from './car-right-side-bar'
import { DetailsChecker } from './details-checker'

export function CarLayout(props: PropsWithChildren) {
	return (
		<section className='flex h-screen w-full flex-col overflow-y-scroll'>
			<Header />
			{/* <ProgressIndicator /> */}
			<DetailsChecker>
				<section className='grid flex-grow grid-cols-3 px-12'>
					<div className='col-span-3 lg:col-span-2'>{props.children}</div>
					<div className='sticky right-0 top-10 hidden max-h-[80svh] lg:flex'>
						<CarRightSideBar />
					</div>
				</section>
			</DetailsChecker>
			<div className='absolute bottom-10 right-10'>
				<ChatBot />
			</div>
		</section>
	)
}
