'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setScrollTo } from '@/redux/slices'
import { useEffect, useRef } from 'react'
// import { Button } from '../ui'
import { CustomerInfo } from './customer-info'
import { SelectInsuranceClass } from './select-insurance-class'
// import { HorsePowerTonnage } from './horse-power-tonnage'
// import { SumInsuredDeductibles } from './sum-insured-deductibles'
// import { cn } from '@/lib'

export function MoreDetailsPage() {
	const dispatch = useAppDispatch()

	const vehicleData = useAppSelector((state) => state.carInsurance)
	const appData = useAppSelector((state) => state.apps)

	// const [current, setCurrent] = useState<number>(0)

	const pageEnd = useRef<HTMLDivElement>(null)
	const specificRef = useRef<HTMLDivElement>(null)
	const customerRef = useRef<HTMLDivElement>(null)
	const pageStart = useRef<HTMLDivElement | null>(null)

	function scrollToTop() {
		pageStart.current?.scrollIntoView({ behavior: 'smooth' })
	}

	const isFilled =
		vehicleData.policyStartDate !== '' &&
		vehicleData.policyEndDate !== '' &&
		vehicleData.currency

	// function addCount() {
	// 	setCurrent((pre) => pre + 1)
	// }

	// function setCount(num: number) {
	// 	setCurrent(num)
	// }

	useEffect(() => {
		pageEnd.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
	}, [vehicleData])

	useEffect(() => {
		if (appData.scrollTo !== 0) {
			specificRef.current?.scrollIntoView({
				behavior: 'smooth',
				block: 'center'
			})

			dispatch(setScrollTo(0))
		}
	}, [appData, dispatch])

	return (
		<section
			ref={pageStart}
			className='flex justify-end'>
			<section className='flex h-full w-full flex-col gap-14 px-4 pt-4 font-roboto lg:w-5/6 lg:px-14 lg:pb-8 lg:pt-14'>
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
						<h1 className='font-jakarta text-[40px] font-semibold'>Vehicle Details</h1>
						<p className='w-4/5 text-sm font-medium text-gray-500'>
							Please fill out the form with accurate details about your vehicle.
							Ensure all information provided is correct and up-to-date.
						</p>
					</div>
				</div>
				<div
					ref={
						appData.scrollTo === 1 || appData.scrollTo === 2 ? specificRef : undefined
					} className='flex flex-col gap-6'>
					<HorsePowerTonnage setCount={setCount}/>
					{current === 0 && vehicleData.horsePower !== '' && vehicleData.tonnage !== '' && (
						<Button
							variant='bluebtn'
							onClick={addCount}>
						Continue
						</Button>
					)}
				</div> */}
				<SelectInsuranceClass />
				{/* {vehicleData.insuranceClass !== 'TPO' && <SumInsured />}
				<Claims />
				{vehicleData.insuranceClass === 'Comprehensive' && <GPSTracking />} */}

				{/* {vehicleData.horsePower !== '' && <Tonnage />} */}
				{/* {vehicleData.horsePower !== '' && vehicleData.tonnage !== '' && current !== 0 && (
					<div
						ref={
							appData.scrollTo === 3 || appData.scrollTo === 4
								? specificRef
								: undefined
						} className={cn('flex flex-col gap-6', {'min-h-[70vh]':current === 1 && vehicleData.deductibles !== 0  })}>
						<SumInsuredDeductibles />
						{current === 1 && vehicleData.deductibles !== 0 && (
							<Fragment>
								{vehicleData.sumInsured !== 0 && (
									<Button
										variant='bluebtn'
										onClick={addCount}>
								Continue
									</Button>
								)}
							</Fragment>
						)}
					</div>
				)} */}

				{isFilled && (
					<div ref={customerRef}>
						<CustomerInfo scrollToTop={scrollToTop} />
					</div>
				)}
				<div ref={pageEnd}></div>
			</section>
		</section>
	)
}
