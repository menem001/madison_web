'use client'

import { assets } from '@/assets'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { MoveUpRight } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '../ui'
import { MotorcycleCard } from './cards'

export function HeroContent() {
	const router = useRouter()

	useGSAP(() => {
		gsap.from('.leftAnimation', { x: -80, opacity: 0, duration: 1 })
		gsap.from('.topAnimation', { y: -80, opacity: 0, duration: 1, delay: 1 })
	})

	function buy() {
		router.push('/car-insurance/onboard/get-info')
	}

	return (
		<section className='flex flex-col gap-10 px-4 py-10 font-jakarta lg:px-32 lg:py-12'>
			<div className='flex flex-col items-start gap-4 md:flex-row md:items-end md:gap-24'>
				<h1 className='text-3xl font-bold uppercase leading-11 text-gray-600 md:text-4xl'>
					Select a product to start
				</h1>
				<span className='font-base text-xs text-gray-600 md:text-sm'>
					Embark on a Boundless Exploration of Innovation with Our Diverse Range of
					Products, Elevating Your Journey to Unveil New Horizons and Endless
					Possibilities.
				</span>
			</div>
			<div className='grid-cols-0 grid grid-rows-2 gap-6 text-gray-600 lg:grid-cols-2 lg:grid-rows-none'>
				<div className='grid grid-rows-2 gap-6'>
					<MotorcycleCard />
					<div className='leftAnimation relative flex flex-row items-center gap-2 rounded-2xl bg-yellow-100 p-6 shadow hover:shadow-lg'>
						<Button
							className='absolute right-5 top-5 z-10 h-8 w-8 bg-white p-2 hover:shadow'
							size='icon'
							variant='transparent'>
							<MoveUpRight />
						</Button>
						<div className='flex flex-grow flex-col items-center gap-3 p-4 text-center'>
							<h1 className='text-2xl font-medium'>Motor Insurance</h1>
							<span className='text-sm font-medium text-gray-500'>
								“Travel isn&apos;t always pretty. It isn&apos;t always comfortable.
							</span>
							<Button
								className='w-fit px-8 hover:shadow'
								size='smRoundedfull'
								variant='whiteRounded'
								onClick={buy}>
								Buy Policy
							</Button>
						</div>
						<div className='h-36 w-60 flex-shrink-0'>
							<Image
								alt='car'
								className='h-auto w-full'
								height={400}
								src={assets.images.car}
								width={500}
							/>
						</div>
					</div>
				</div>
				<div className='grid-cols-0 grid grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-none'>
					<div className='topAnimation relative flex flex-col items-center justify-between gap-2 rounded-2xl bg-gray-200 p-6 shadow hover:shadow-lg'>
						<Button
							className='absolute right-5 top-5 z-10 h-8 w-8 bg-white p-2 hover:shadow'
							size='icon'
							variant='transparent'>
							<MoveUpRight />
						</Button>
						<div className='h-48 w-48 flex-shrink-0 md:h-72 md:w-72'>
							<Image
								alt='home'
								className='h-auto w-full'
								height={400}
								src={assets.images.home}
								width={500}
							/>
						</div>

						<div className='flex w-full flex-row items-center justify-between gap-3 text-center'>
							<h1 className='text-base font-semibold'>Home Insurance</h1>
							<Button
								className='w-fit rounded-2xl hover:shadow'
								variant='bluebtn'>
								Buy Policy
							</Button>
						</div>
					</div>
					<div className='topAnimation relative flex flex-col items-center justify-between gap-2 rounded-2xl bg-white p-6 shadow hover:shadow-lg'>
						<Button
							className='absolute right-5 top-5 z-10 h-8 w-8 bg-white p-2 hover:shadow'
							size='icon'
							variant='transparent'>
							<MoveUpRight />
						</Button>
						<div className='h-72 w-48 flex-shrink-0 md:w-72'>
							<Image
								alt='health'
								className='h-auto w-full'
								height={400}
								src={assets.images.health}
								width={500}
							/>
						</div>

						<div className='flex w-full flex-row items-center justify-between gap-3 text-center'>
							<h1 className='text-base font-semibold'>Health Insurance</h1>
							<Button
								className='w-fit rounded-2xl hover:shadow'
								variant='bluebtn'>
								Buy Policy
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
