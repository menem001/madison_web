'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setGuestLoginDetails, setScrollTo } from '@/redux/slices'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui'
import { ManufactureYear } from './manufacture-year'
import { VehicleValue } from './vehicle-value'
import { SelectModel } from './select-model'
import { VehicleUsage } from './vehicle-usage'
import { BodyType } from './body-type'
import { CarSeating } from './car-seating'
import { DriverDetails } from './driver-details'
import { useGuestLoginMutation } from '@/redux/api/commonApi'
import ClipLoader from 'react-spinners/ClipLoader'
// import { WhiteBook } from './white-book'
import { SelectMark } from './select-mark'
import { BackButton } from '../common/back_btn'

export function DetailsPage() {
	const router = useRouter()
	const [guestLogin] = useGuestLoginMutation()
	const dispatch = useAppDispatch()

	const vehicleData = useAppSelector((state) => state.carInsurance)
	const appData = useAppSelector((state) => state.apps)

	const pageEnd = useRef<HTMLDivElement>(null)
	const specificRef = useRef<HTMLDivElement>(null)
	const [token, setToken] = useState<string>('')

	function scrollToBottom() {
		pageEnd.current?.scrollIntoView({ behavior: 'smooth' })
	}

	function next() {
		router.push('/car-insurance/2')
	}

	useEffect(() => {
		if (appData.token !== '') {
			setToken(appData.token)
		}
	}, [appData.token])

	useEffect(() => {
		scrollToBottom()
	}, [vehicleData])

	useEffect(() => {
		if (appData.scrollTo !== 0) {
			if (appData.scrollTo === 1) {
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

	function loginAsGuest() {
		const res = guestLogin()
		res.then((value) => {
			if (value.data?.type === 'success' && value.data?.data !== undefined) {
				const details = {
					token: value.data.data.Result.Token,
					loginId: value.data.data.Result.LoginId,
					userType: value.data.data.Result.UserType,
					subUserType: value.data.data.Result.SubUserType,
					brokerCode: value.data.data.Result.LoginBranchDetails[0].BrokerBranchCode,
					insuranceID: value.data.data.Result.LoginBranchDetails[0].InsuranceId,
					branchCode: value.data.data.Result.LoginBranchDetails[0].BranchCode,
					productId: value.data.data.Result.BrokerCompanyProducts[0].ProductId,
					CustomerCode: value.data.data.Result.CustomerCode,
					agencyCode: value.data.data.Result.OaCode
				}
				dispatch(setGuestLoginDetails(details))
				setToken(value.data.data.Result.Token)
			}
		})
	}

	useEffect(() => {
		if (appData.token === '') {
			loginAsGuest()
		}
	}, [])

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
				{token === '' && (
					<div className='flex w-full'>
						<ClipLoader color='#0C7BC4' />
					</div>
				)}
				{token !== '' && (
					<div className='flex flex-col gap-10'>
						<div className='-ml-16'>
							<BackButton />
						</div>
						<div
							ref={appData.scrollTo === 1 ? specificRef : undefined}
							className='flex flex-col gap-6'>
							<SelectMark />
						</div>
					</div>
				)}
				{vehicleData.mark !== '' && (
					<div
						ref={appData.scrollTo === 2 ? specificRef : undefined}
						className='flex flex-col gap-6'>
						<SelectModel />
					</div>
				)}
				{vehicleData.model !== '' && (
					<div
						ref={appData.scrollTo === 3 ? specificRef : undefined}
						className='flex flex-col gap-6'>
						<VehicleUsage />
					</div>
				)}

				{vehicleData.vehicleUsage !== '' && (
					<div
						ref={appData.scrollTo === 4 ? specificRef : undefined}
						className='flex flex-col gap-6'>
						<BodyType />
					</div>
				)}
				{vehicleData.bodyType !== '' && (
					<div
						ref={appData.scrollTo === 5 ? specificRef : undefined}
						className='flex flex-col gap-6'>
						<CarSeating />
					</div>
				)}
				{vehicleData.seat !== 0 && (
					<div ref={appData.scrollTo === 6 ? specificRef : undefined}>
						<VehicleValue />
					</div>
				)}
				{vehicleData.value !== 0 && (
					<div
						ref={appData.scrollTo === 7 ? specificRef : undefined}
						className='flex flex-col gap-6'>
						<ManufactureYear />
					</div>
				)}
				{vehicleData.year !== 0 && vehicleData.excessLimit !== 0 && (
					<div
						ref={appData.scrollTo === 8 ? specificRef : undefined}
						className='flex flex-col gap-6'>
						<DriverDetails />
					</div>
				)}
				{vehicleData.driverOrOwner !== '' && (
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
