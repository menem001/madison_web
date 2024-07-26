'use client'

import { useGetPaymentTypesMutation } from '@/redux/api/commonApi'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { CardDetails } from './card-details'
import { useEffect, useState } from 'react'
// import { QRDetails } from './qr-details'

export function PaymentTypes() {
	const [getPayment] = useGetPaymentTypesMutation()
	const [paymentTypes, setPaymentTypes] = useState<{ value: string; label: string }[]>([])

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
