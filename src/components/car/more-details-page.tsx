'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setScrollTo } from '@/redux/slices'
import { useEffect, useRef, useState } from 'react'
// import { Button } from '../ui'
import { CustomerInfo } from './customer-info'
import { SelectInsuranceClass } from './select-insurance-class'
import { BackButton } from '../common/back_btn'
import { PremiumSideBar } from './premium-sidebar'
import { OTPDialogBox } from './otp-dialog-box'
// import { HorsePowerTonnage } from './horse-power-tonnage'
// import { SumInsuredDeductibles } from './sum-insured-deductibles'
// import { cn } from '@/lib'

export function MoreDetailsPage() {
	const dispatch = useAppDispatch()

	const vehicleData = useAppSelector((state) => state.carInsurance)
	const appData = useAppSelector((state) => state.apps)

	// const [current, setCurrent] = useState<number>(0)

	const [otpOpen, setOtpOpen] = useState<boolean>(false)

	const pageEnd = useRef<HTMLDivElement>(null)
	const specificRef = useRef<HTMLDivElement>(null)
	const customerRef = useRef<HTMLDivElement>(null)
	const pageStart = useRef<HTMLDivElement | null>(null)

	// function scrollToTop() {
	// 	pageStart.current?.scrollIntoView({ behavior: 'smooth' })
	// }

	function getOtpDialogOpen() {
		setOtpOpen(true)
	}

	function closeOTPDialog() {
		setOtpOpen(false)
	}

	function scrollToBottom() {
		pageEnd.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
				<div className='-ml-16'>
					<BackButton />
				</div>
				<SelectInsuranceClass />
				{isFilled && (
					<div ref={customerRef}>
						<CustomerInfo scrollToTop={scrollToBottom} />
					</div>
				)}
				<PremiumSideBar getOtp={getOtpDialogOpen} />
				<div ref={pageEnd}></div>
				<OTPDialogBox
					closeDialog={closeOTPDialog}
					otpOpen={otpOpen}
				/>
			</section>
		</section>
	)
}
