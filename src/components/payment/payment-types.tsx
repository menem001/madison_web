'use client'

import { useGetPaymentTypesMutation } from '@/redux/api/commonApi'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { CardDetails } from './card-details'
import { useEffect, useState } from 'react'
import { useInsertPaymentMutation, useMakePaymentMutation } from '@/redux/api/paymentApi'
import { useAppSelector } from '@/redux/hooks'
import { Button, Input } from '../ui'
import { Label } from '../ui/label'
import { Dialog, DialogContent } from '../ui/dialog'
// import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
// import { QRDetails } from './qr-details'

export function PaymentTypes() {
	const [getPayment] = useGetPaymentTypesMutation()
	const [paymentTypes, setPaymentTypes] = useState<{ value: string; label: string }[]>([])
	const [makePayment] = useMakePaymentMutation()

	const [insertPayment] = useInsertPaymentMutation()

	const route = useRouter()

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
										<Dialog open={isPaid}>
											<DialogContent className='max-w-[90svw] md:max-w-[78svw] lg:max-w-[60svw]'>
												<div className='flex h-full w-full flex-col items-center justify-center gap-2 p-2'>
													{/* <div className='flex h-28 w-28 items-center justify-center rounded-full bg-green-320'>
														<div className='flex h-16 w-16 items-center justify-center rounded-full bg-green-300'>
															<Check
																color='white'
																height={30}
																width={30}
															/>
														</div>
													</div> */}
													<div className='flex w-full flex-col items-center justify-center gap-3 rounded-md border border-gray-450 border-opacity-60 p-4'>
														<h1 className='font-jakarta text-lg font-bold text-green-200'>
															Hurray!!! Policy Generated Successfully
														</h1>
														<div className='grid w-full grid-cols-3 border-b border-gray-450 border-opacity-60 pb-4'>
															<div className='flex h-full flex-col justify-between'>
																<span className='text-xs md:text-base'>
																	Reference Number
																</span>
																<h4 className='text-xs font-semibold text-blue-450 md:text-base'>
																	{requestNumber}
																</h4>
															</div>
															<div className='flex h-full flex-col justify-between'>
																<span className='text-xs md:text-base'>
																	Quote Number
																</span>
																<h4 className='text-xs font-semibold text-blue-450 md:text-base'>
																	{QuoteNo}
																</h4>
															</div>
															<div className='flex h-full flex-col justify-between'>
																<span className='text-xs md:text-base'>
																	Policy Number
																</span>
																<h4 className='text-xs font-semibold text-blue-450 md:text-base'>
																	{policyNumber}
																</h4>
															</div>
														</div>
														<div className='grid w-full grid-cols-3 border-b border-gray-450 border-opacity-60 pb-4'>
															<div className='flex h-full flex-col justify-between'>
																<span className='text-xs md:text-base'>
																	Debit Note No
																</span>
																<h4 className='text-xs font-semibold text-blue-450 md:text-base'>
																	{debitNoteNumber}
																</h4>
															</div>
															<div className='flex h-full flex-col justify-between'>
																<span className='text-xs md:text-base'>
																	Merchant Reference No
																</span>
																<h4 className='text-xs font-semibold text-blue-450 md:text-base'>
																	{merchantRefNumber}
																</h4>
															</div>
														</div>
														<div className='flex w-full flex-row justify-center gap-2'>
															<Button
																className='w-1/4 text-xs'
																size='lg'
																variant='whiteBlackOutlined'>
																Debit Note PDF
															</Button>
															<Button
																className='w-1/4 text-xs'
																size='lg'
																variant='whiteBlackOutlined'>
																Schedule PDF
															</Button>
														</div>
													</div>
													<div className='flex w-full flex-row justify-center gap-2'>
														<Button
															className='w-1/5'
															size='lg'
															variant='bluebtn'
															onClick={() => {
																route.push('/dashboard')
															}}>
															Proceed
														</Button>
													</div>
												</div>
											</DialogContent>
										</Dialog>
									</div>
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
