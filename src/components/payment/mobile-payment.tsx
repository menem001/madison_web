import { useState } from 'react'
import { Button, Input } from '../ui'
import { Label } from '../ui/label'
import { useAppSelector } from '@/redux/hooks'
import {
	useCreateOrderMutation,
	useInsertPaymentMutation,
	useOrderStatusMutation
} from '@/redux/api/paymentApi'
import { type CreateOrderRequest } from '@/services/models/payment.models'
import { PaymentSuccessDialog } from './payment-success-dialog'
import { PaymentFailedDialog } from './payment-failed-dialog'

type MobilePaymentProps = {
	paymentId: string
}

export function MobilePayment(props: MobilePaymentProps) {
	const [mobile, setMobile] = useState<number>()

	const appData = useAppSelector((state) => state.apps)
	const customerName = useAppSelector((state) => state.customerDetails.name)
	const QuoteNo = useAppSelector((state) => state.motor.QuoteNo)
	const Premium = useAppSelector((state) => state.premiummotor.premiumIncludedTaxLC)
	const PremiumEA = useAppSelector((state) => state.premiummotor.EAPremiumIncluedTaxLC)
	const requestNumber = useAppSelector((state) => state.motor.RequestReferenceNo)

	const total = Premium + PremiumEA
	const fixedTotal = total.toFixed(2)

	const [policyNumber, setPolicyNumber] = useState<string>('')
	const [debitNoteNumber, setDebitNoteNumber] = useState<string>('')
	const [merchantRefNumber, setMerchantRefNumber] = useState<string>('')

	const [insertPayment] = useInsertPaymentMutation()
	const [createOrder] = useCreateOrderMutation()
	const [checkOrder] = useOrderStatusMutation()

	const [isPaid, setIsPaid] = useState<boolean>(false)
	const [isFailed, setIsFailed] = useState<boolean>(false)

	let retryCount = 0
	const maxRetries = 5

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
			PaymentType: '5',
			Payments: '',
			PaymentId: props.paymentId,
			AccountNumber: null,
			IbanNumber: null,
			WhatsappNo: null,
			WhatsappCode: null,
			MobileCode1: '260',
			MobileNo1: '977777777'
		}
		insertPayment(request).then((response) => {
			if (
				response.data?.type === 'success' &&
				response.data.data &&
				response.data.data.Result
			) {
				setPolicyNumber(response.data.data.Result.PaymentId)

				if (response.data.data.Result.DebitNoteNo !== null) {
					setDebitNoteNumber(response.data.data.Result.DebitNoteNo)
				}

				setMerchantRefNumber(response.data.data.Result.MerchantReference)
				createOrderForPayment(response.data.data.Result.MerchantReference)
				//
			}
		})
	}

	function createOrderForPayment(MerchantReference: string) {
		const request: CreateOrderRequest = {
			InsuranceId: appData.insuranceID,
			merchantRef: MerchantReference
		}
		createOrder(request).then((response) => {
			if (
				response.data?.type === 'success' &&
				response.data.data &&
				response.data.data.status === 'Pending'
			) {
				checkOrderStatusPending()
			} else if (
				response.data?.type === 'success' &&
				response.data.data &&
				response.data.data.status === 'Success'
			) {
				setIsPaid(true)
			} else {
				setIsFailed(true)
			}
		})
	}

	function checkOrderStatusPending() {
		const res = checkOrder(QuoteNo)
		res.then((response) => {
			if (response.data?.type === 'success' && response.data.data) {
				if (response.data.data.result === 'COMPLETED') {
					setIsPaid(true)
				} else if (response.data.data.result === 'FAIL') {
					setIsFailed(true)
				} else {
					retryCount++

					if (retryCount < maxRetries) {
						setTimeout(() => {
							checkOrderStatusPending()
						}, 5000)
					}
				}
			}
		})
	}

	return (
		<div className='flex flex-col items-center gap-6 py-6'>
			<div className='w-full'>
				<Label htmlFor='card'>Mobile Number</Label>
				<Input
					className='border-gray-900'
					id='card'
					placeholder='Mobile Number'
					type='number'
					value={mobile}
					onChange={(e) => {
						setMobile(+e.target.value)
					}}
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
			<PaymentFailedDialog
				debitNoteNumber={debitNoteNumber}
				isFailed={isFailed}
				merchantRefNumber={merchantRefNumber}
				policyNumber={policyNumber}
				QuoteNo={QuoteNo}
				requestNumber={requestNumber}
			/>
		</div>
	)
}
