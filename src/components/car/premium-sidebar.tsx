'use client'

import { assets } from '@/assets'
import Image from 'next/image'
import { Button } from '../ui'
// import { MobileLinkDetails } from './mobile-link-details'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/redux/hooks'
import { useEffect, useState } from 'react'
import { usePremiumCalcMutation, useViewPremiumCalcMutation } from '@/redux/api/commonApi'

export function PremiumSideBar() {
	const route = useRouter()
	const customerData = useAppSelector((state) => state.customerDetails)
	const motorData = useAppSelector((state) => state.motor)
	const appData = useAppSelector((state) => state.apps)
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const [premiumCalculator] = usePremiumCalcMutation()
	const [viewPremium] = useViewPremiumCalcMutation()
	const [premiumCalDone, setPremiumCalDone] = useState<boolean>(false)

	useEffect(() => {
		if (motorData.RequestReferenceNo !== '') {
			const req = {
				InsuranceId: appData.insuranceID,
				BranchCode: appData.branchCode,
				AgencyCode: appData.agencyCode,
				SectionId: '1',
				ProductId: appData.productId,
				MSRefNo: motorData.MSRefNo,
				VehicleId: motorData.VehicleId,
				CdRefNo: motorData.CdRefNo,
				DdRefNo: motorData.DdRefNo,
				VdRefNo: motorData.VdRefNo,
				CreatedBy: motorData.CreatedBy,
				productId: motorData.ProductId,
				RequestReferenceNo: motorData.RequestReferenceNo,
				EffectiveDate: vehicleData.policyStartDate,
				PolicyEndDate: vehicleData.policyEndDate,
				CoverModification: 'N'
			}
			const res = premiumCalculator(req)
			res.then(() => {
				setPremiumCalDone(true)
			})
		}
	}, [motorData])

	useEffect(() => {
		if (premiumCalDone) {
			const req = {
				ProductId: motorData.ProductId,
				RequestReferenceNo: motorData.RequestReferenceNo
			}
			const res = viewPremium(req)
			res.then(() => {
				setPremiumCalDone(false)
			})
		}
	}, [premiumCalDone, motorData])

	return (
		<div className='flex h-full w-full flex-col gap-4 px-5 py-20 font-roboto'>
			{customerData.premium && (
				<div className='flex flex-col gap-4 rounded-lg p-6 shadow-md'>
					<div className='flex flex-row gap-6'>
						<div className='h-32 w-32'>
							<Image
								alt='car'
								className='h-full w-full object-contain object-center'
								height={500}
								src={assets.images.car}
								width={500}
							/>
						</div>
						<div className='flex flex-col justify-around'>
							<div className='flex flex-col gap-1'>
								<h4 className='text-sm font-bold text-green-75 opacity-75'>
									RefNumber No:
								</h4>
								<h4 className='font-bold text-green-75'>Model and make</h4>
							</div>
							<div className='flex flex-row items-center gap-2'>
								<span className='rounded-lg border border-green-100 p-2 text-xs font-semibold'>
									4 seats
								</span>
								<span className='text-xs font-bold text-green-75'>Model Type</span>
							</div>
						</div>
					</div>
					<div className='border-y-[0.5px] border-green-75 border-opacity-25 py-4'>
						Your Insurance is protected by{' '}
						<span className='font-bold'>Madison Insurance</span>
					</div>
					<div className='flex flex-col gap-4 border-b-[0.5px] border-green-75 border-opacity-25 pb-4'>
						<h1 className='font-jakarta text-2xl font-bold text-blue-300'>
							Comprehensive
						</h1>
						<div className='flex flex-row justify-between'>
							<span>Base Fare</span>
							<span>75,000 ZWM</span>
						</div>
						{/* <div className='flex flex-row justify-between'>
							<span>Annual Premium (MUR)</span>
							<span>$0</span>
						</div>
						<div className='flex flex-row justify-between'>
							<span>After Discount (MUR)</span>
							<span>$20</span>
						</div>
						<div className='flex flex-row justify-between'>
							<span>Service Fee</span>
							<span>$5</span>
						</div> */}
					</div>
					<div className='flex flex-row justify-between'>
						<span>Total</span>
						<span>75,000 ZWM</span>
					</div>
					<Button
						variant='bluebtn'
						onClick={() => {
							route.push('/car-insurance/confirm/otp-verify')
						}}>
						Buy Policy
					</Button>
				</div>
			)}
			{/* <MobileLinkDetails /> */}
		</div>
	)
}
