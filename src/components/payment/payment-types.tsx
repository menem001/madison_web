'use client'

import { useGetPaymentTypesMutation } from '@/redux/api/commonApi'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { CardDetails } from './card-details'
import { useEffect, useState } from 'react'
import { useInsertPaymentMutation, useMakePaymentMutation } from '@/redux/api/paymentApi'
import { useAppSelector } from '@/redux/hooks'
import { Button, Input } from '../ui'
import { Label } from '../ui/label'
import { MobilePayment } from './mobile-payment'
import { PaymentSuccessDialog } from './payment-success-dialog'
// import { QRDetails } from './qr-details'

export function PaymentTypes() {
	const [getPayment] = useGetPaymentTypesMutation()
	const [paymentTypes, setPaymentTypes] = useState<
		{ value: string; label: string; type: string | null }[]
	>([])
	const [makePayment] = useMakePaymentMutation()

	const [insertPayment] = useInsertPaymentMutation()

	const [paymentId, setPaymentId] = useState<string>('')
	const [policyNumber, setPolicyNumber] = useState<string>('')
	const [debitNoteNumber, setDebitNoteNumber] = useState<string>('')
	const [merchantRefNumber, setMerchantRefNumber] = useState<string>('')

	const appData = useAppSelector((state) => state.apps)
	const requestNumber = useAppSelector((state) => state.motor.RequestReferenceNo)
	const customerName = useAppSelector((state) => state.customerDetails.name)
	const customerMobile = useAppSelector((state) => state.customerDetails.mobile)
	const QuoteNo = useAppSelector((state) => state.motor.QuoteNo)
	const Premium = useAppSelector((state) => state.premiummotor.premiumIncludedTaxLC)
	const PremiumEA = useAppSelector((state) => state.premiummotor.EAPremiumIncluedTaxLC)

	const total = Premium + PremiumEA
	const fixedTotal = total.toFixed(2)

	const [isPaid, setIsPaid] = useState<boolean>(false)

	function getMakePaymentDetails() {
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
		const response = makePayment(request)
		response.then((value) => {
			if (
				value.data?.type === 'success' &&
				value.data.data &&
				value.data.data?.Result !== null
			) {
				setPaymentId(value.data.data?.Result.PaymentId)
			}
		})
	}

	useEffect(() => {
		const tempArr: { value: string; label: string; type: string | null }[] = []
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
						label: value.CodeDesc,
						type: value.Type
					})
				})
				setPaymentTypes(tempArr)
				getMakePaymentDetails()
			}
		})
	}, [])

	function insertPayments() {
		const request = {
			CreatedBy: appData.loginId,
			InsuranceId: appData.insuranceID,
			EmiYn: 'N',
			Premium: fixedTotal,
			QuoteNo: QuoteNo,
			Remarks: 'None',
			PayeeName: customerName,
			SubUserType: 'b2c',
			UserType: 'User',
			MICRNo: null,
			BankName: null,
			ChequeNo: null,
			ChequeDate: '',
			PaymentType: '1',
			Payments: '',
			PaymentId: paymentId,
			AccountNumber: null,
			IbanNumber: null,
			WhatsappNo: null,
			WhatsappCode: null,
			MobileCode1: null,
			MobileNo1: null
		}
		insertPayment(request).then((response) => {
			if (
				response.data?.type === 'success' &&
				response.data.data &&
				response.data.data.Result &&
				response.data.data.Result.Response === 'Policy Converted'
			) {
				setPolicyNumber(response.data.data.Result.PaymentId)

				if (response.data.data.Result.DebitNoteNo !== null) {
					setDebitNoteNumber(response.data.data.Result.DebitNoteNo)
				}

				setMerchantRefNumber(response.data.data.Result.MerchantReference)
				setIsPaid(true)
			}
		})
	}

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
						if (type.label === 'Cash') {
							return (
								<TabsContent
									key={index}
									value={type.value}>
									<div className='flex flex-col items-center gap-6 py-6'>
										<div className='w-full'>
											<Label htmlFor='card'>Mobile Number</Label>
											<Input
												className='border-gray-900'
												id='card'
												placeholder='Mobile Number'
												value={customerMobile}
											/>
										</div>
										<Button
											variant='bluebtn'
											onClick={insertPayments}>
											Pay
										</Button>
										<PaymentSuccessDialog
											debitNoteNumber={debitNoteNumber}
											isPaid={isPaid}
											merchantRefNumber={merchantRefNumber}
											policyNumber={policyNumber}
											QuoteNo={QuoteNo}
											requestNumber={requestNumber}
										/>
									</div>
								</TabsContent>
							)
						} else if (type.type === 'UPI') {
							return (
								<TabsContent
									key={index}
									value={type.value}>
									<MobilePayment paymentId={paymentId} />
								</TabsContent>
							)
						} else {
							return (
								<TabsContent
									key={index}
									value={type.value}>
									<CardDetails />
								</TabsContent>
							)
						}
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
