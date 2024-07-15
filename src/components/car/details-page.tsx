'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setScrollTo } from '@/redux/slices'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui'
import { BodyType } from './body-type'
import { FuelType } from './fuel-type'
import { SelectMark } from './select-mark'
import { SelectModel } from './select-model'
import { VehicleUsage } from './vehicle-usage'
import { cn } from '@/lib'

export function DetailsPage() {
	const router = useRouter()
	const dispatch = useAppDispatch()

	const vehicleData = useAppSelector((state) => state.carInsurance)
	const appData = useAppSelector((state) => state.apps)

	const pageEnd = useRef<HTMLDivElement>(null)
	const specificRef = useRef<HTMLDivElement>(null)

	const [current, setCurrent] = useState<number>(0)

	function addCount() {
		setCurrent((pre) => pre + 1)
	}

	function setCount(num:number){
		setCurrent(num)
	}

	function scrollToBottom() {
		pageEnd.current?.scrollIntoView({ behavior: 'smooth' })
	}

	function next() {
		router.push('/car-insurance/2')
	}

	useEffect(() => {
		scrollToBottom()
	}, [vehicleData, current])

	useEffect(() => {
		if (appData.scrollTo !== 0) {
			if (appData.scrollTo === 1 || appData.scrollTo === 4) {
				specificRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'end'
				})
			} else {
				specificRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'center'
				})
			}

			dispatch(setScrollTo(0))
		}
	}, [appData, dispatch])

	useEffect(()=>{
		if(vehicleData.fuelType !== ''){
			setCurrent(4)
		}
	},[])

	return (
		<section className='flex justify-end'>
			<section className='flex h-full w-full flex-col gap-20 px-4 pt-4 font-roboto lg:w-5/6 lg:px-14 lg:pb-8 lg:pt-14'>
				{/* <div className='flex flex-row items-start justify-start gap-8'>
					<Button
						className='py-8'
						size='icon'
						variant='transparent'
						onClick={goBack}>
						<ArrowLeft
							height={32}
							width={32}
						/>
					</Button>
					<div className='flex flex-col gap-4'>
						<h1 className='font-jakarta text-2xl font-semibold md:text-[40px]'>
							Vehicle Details
						</h1>
						<p className='w-4/5 text-xs font-medium text-gray-500 md:text-sm'>
							Please fill out the form with accurate details about your vehicle.
							Ensure all information provided is correct and up-to-date.
						</p>
					</div>
				</div> */}
				<div ref={appData.scrollTo === 1 ? specificRef : undefined} className='flex flex-col gap-6'>
					<SelectMark setCount={setCount}/>
					{current === 0 && vehicleData.mark !== '' && (
						<Button
							variant='bluebtn'
							onClick={addCount}>
							Continue
						</Button>
					)}
				</div>
				{vehicleData.mark !== '' && current !== 0 && (
					<div ref={appData.scrollTo === 2 ? specificRef : undefined} className={cn('flex flex-col gap-6', {'min-h-[65vh]':vehicleData.model !== '' && current === 1  })}>
						<SelectModel setCount={setCount}/>
						{current === 1 && vehicleData.model !== '' && (
							<Button
								variant='bluebtn'
								onClick={addCount}>
								Continue
							</Button>
						)}
					</div>
				)}
				
				{vehicleData.model !== '' && current !== 1 && (
					<div ref={appData.scrollTo === 3 ? specificRef : undefined} className={cn('flex flex-col gap-6', {'min-h-[65vh]':vehicleData.vehicleUsage !== '' && current === 2  })}>
						<VehicleUsage setCount={setCount}/>
						{current === 2 && vehicleData.vehicleUsage !== '' && (
							<Button
								variant='bluebtn'
								onClick={addCount}>
								Continue
							</Button>
						)}
					</div>
				)}
				
				{vehicleData.vehicleUsage !== '' && current !== 2 && (
					<div ref={appData.scrollTo === 4 ? specificRef : undefined} className={cn('flex flex-col gap-6', {'min-h-[65vh]':vehicleData.bodyType.length !== 0 && current === 3  })}>
						<BodyType setCount={setCount}/>
						{current === 3 && vehicleData.bodyType.length !== 0 && (
							<Button
								variant='bluebtn'
								onClick={addCount}>
								Continue
							</Button>
						)}
					</div>
				)}
				
				{vehicleData.bodyType.length !== 0 && current !== 3 && (
					<div ref={appData.scrollTo === 5 ? specificRef : undefined}>
						<FuelType />
					</div>
				)}
				{vehicleData.fuelType !== '' && (
					<Button
						className='w-full'
						variant='bluebtn'
						onClick={next}>
						Next
					</Button>
				)}
				<div ref={pageEnd}></div>
			</section>
		</section>
	)
}
