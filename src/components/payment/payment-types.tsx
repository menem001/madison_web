'use client'

import { useGetPaymentTypesMutation } from '@/redux/api/commonApi'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { CardDetails } from './card-details'
import { useEffect, useState } from 'react'
import { useMakePaymentMutation } from '@/redux/api/paymentApi'
import { useAppSelector } from '@/redux/hooks'
// import { QRDetails } from './qr-details'

export function PaymentTypes() {
	const [getPayment] = useGetPaymentTypesMutation()
	const [paymentTypes, setPaymentTypes] = useState<{ value: string; label: string }[]>([])
	const [makePayment] = useMakePaymentMutation()

	const appData = useAppSelector((state) => state.apps)
	const QuoteNo = useAppSelector((state) => state.motor.QuoteNo)
	const Premium = useAppSelector((state) => state.premiummotor.premiumIncludedTaxLC)
	const PremiumEA = useAppSelector((state) => state.premiummotor.EAPremiumIncluedTaxLC)

	function getMakePaymentDetails() {
		const total = Premium + PremiumEA
		const fixedTotal = total.toFixed(2)
		const request = {
			CreatedBy: appData.loginId,
			EmiYn: 'N',
			InstallmentMonth: null,
			InstallmentPeriod: null,
			InsuranceId: appData.insuranceID,
			Premium: fixedTotal,
			QuoteNo: QuoteNo,
			Remarks: 'Testing',
			SubUserType: 'b2c',
			UserType: 'User'
		}
		makePayment(request)
		// response.then((value) => {
		// 	if (value.data?.type === 'success' && value.data.data?.Result !== null) {
		// 		console.log(value.data.data?.Result.PaymentId)
		// 	}
		// })
	}

	useEffect(() => {
		const tempArr: { value: string; label: string }[] = []
		const request = {
			BranchCode: '2',
			InsuranceId: '100004',
			UserType: 'Broker',
			SubUserType: 'b2c',
			ProductId: '5',
			CreatedBy: 'guest_madison',
			AgencyCode: '13096'
		}

		const res = getPayment(request)
		res.then((value) => {
			if (value.data?.type === 'success' && value.data.data?.Result.length !== 0) {
				value.data.data!.Result.map((value) => {
					tempArr.push({
						value: value.Code,
						label: value.CodeDesc
					})
				})
				setPaymentTypes(tempArr)
				getMakePaymentDetails()
			}
		})
	}, [])

	return (
		<div className='flex h-full w-3/4'>
			{paymentTypes.length === 0 ? (
				<></>
			) : (
				<Tabs
					className='w-full'
					defaultValue='card'>
					<TabsList className='flex w-full'>
						{paymentTypes.map((type, index) => {
							return (
								<TabsTrigger
									key={index}
									className='flex-grow'
									value={type.value}>
									{type.label}
								</TabsTrigger>
							)
						})}
					</TabsList>
					{paymentTypes.map((type, index) => {
						return (
							<TabsContent
								key={index}
								value={type.value}>
								<CardDetails />
							</TabsContent>
						)
					})}
					{/* <TabsContent value='card'>
					<CardDetails />
				</TabsContent>
				<TabsContent value='bank'>
					<CardDetails />
				</TabsContent>
				<TabsContent value='qrcode'>
					<QRDetails />
				</TabsContent> */}
				</Tabs>
			)}
		</div>
	)
}
