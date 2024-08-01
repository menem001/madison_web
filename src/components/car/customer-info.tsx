'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateEmail, updateMobile, updateName, updatePremium } from '@/redux/slices'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
// import { useRouter } from 'next/navigation'
import { Button, Input } from '../ui'
import { useSaveMotorDetailsMutation } from '@/redux/api/commonApi'
import { Label } from '../ui/label'
import { type SaveMotorDetailRequest } from '@/services/models/common.models'
import { updateDetails } from '@/redux/slices/motor-detail.slice'
import { useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { useToast } from '../ui/use-toast'
import { isValidEmail } from '@/lib'

type CustomerInfoProps = {
	scrollToTop: () => void
}

export function CustomerInfo(props: CustomerInfoProps) {
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const customerData = useAppSelector((state) => state.customerDetails)
	const appData = useAppSelector((state) => state.apps)

	const [saveMotor] = useSaveMotorDetailsMutation()

	const { toast } = useToast()

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const dispatch = useAppDispatch()

	const [isNameNotValid, setIssNameNotValid] = useState<boolean>(false)
	const [isEmailNotValid, setIsEmailNotValid] = useState<boolean>(false)
	const [isMobileNotValid, setIsMobileNotValid] = useState<boolean>(false)

	useGSAP(() => {
		gsap.from('.selectCustomerInfo', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
		gsap.to('.CustomerInfotitle', { duration: 0.5, text: 'Personal Details' })
		gsap.to('.CustomerInfosubtitle', {
			duration: 0.5,
			text: 'Please provide your details to proceed',
			delay: 0.5
		})
	})

	function goToConfirm() {
		if (customerData.name.length < 4) {
			setIssNameNotValid(true)
		} else if (!isValidEmail(customerData.email)) {
			setIsEmailNotValid(true)
		} else if (customerData.mobile.length !== 9) {
			setIsMobileNotValid(true)
		} else {
			setIsLoading(true)
			doSaveMotorDetails()
		}
	}

	function doSaveMotorDetails() {
		const req: SaveMotorDetailRequest = {
			CustomerName: customerData.name,
			LoginId: appData.loginId,
			SubUserType: appData.subUserType,
			UserType: appData.userType,
			ApplicationId: '1', //
			CustomerReferenceNo: null,
			RequestReferenceNo: null,
			VehicleId: '1',
			CreatedBy: appData.loginId,
			InsuranceId: appData.insuranceID,
			BranchCode: appData.branchCode,
			BrokerBranchCode: appData.brokerCode,
			SectionId: vehicleData.classID,
			AgencyCode: appData.agencyCode,
			ProductId: appData.productId,
			SavedFrom: 'SQ',
			MobileCode: customerData.code,
			MobileNumber: customerData.mobile,
			Chassisnumber: '',
			Insurancetype: [appData.insuranceID],
			InsuranceClass: vehicleData.classID,
			Motorusage: vehicleData.vehicleUsage,
			MotorusageId: vehicleData.vehicleUsageID,
			Vehiclemake: vehicleData.mark,
			VehiclemakeId: vehicleData.makeID,
			VehicleModel: vehicleData.model,
			VehcilemodelId: vehicleData.modelID,
			VehicleValueType: null,
			DefenceValue: null,
			PurchaseDate: null,
			Deductibles: null,
			Inflation: null,
			ManufactureYear: vehicleData.year + '',
			Gpstrackinginstalled: 'N',
			NcdYn: 'N',
			VehicleType: vehicleData.bodyType,
			VehicleTypeId: vehicleData.bodyTypeID,
			CarAlarmYn: 'N',
			PolicyStartDate: vehicleData.policyStartDate,
			PolicyEndDate: vehicleData.policyEndDate,
			CustomerCode: appData.CustomerCode,
			BdmCode: appData.CustomerCode,
			SourceTypeId: appData.userType,
			SumInsured: vehicleData.value,
			AcccessoriesSumInsured: vehicleData.AcccessoriesSumInsured,
			ExchangeRate: vehicleData.exchangeRate,
			Currency: vehicleData.currency,
			HavePromoCode: 'N',
			SearchFromApi: false,
			SeatingCapacity: vehicleData.seat,
			CustomerStatus: 'Y',
			Status: 'Y'
		}
		const res = saveMotor(req)
		res.then((value) => {
			if (
				value.data?.type === 'success' &&
				value.data.data !== undefined &&
				value.data.data.IsError !== true &&
				value.data.data.Result !== null
			) {
				dispatch(updatePremium(true))
				dispatch(updateDetails(value.data.data.Result[0]))
				props.scrollToTop()
				setIsLoading(false)
			} else if (
				value.data?.type === 'success' &&
				value.data.data !== undefined &&
				value.data.data.IsError === true &&
				value.data.data.ErrorMessage !== null &&
				value.data.data.ErrorMessage.length !== 0
			) {
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: value.data.data.ErrorMessage[0].Message
				})
			} else {
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: 'There was a problem with your request.'
				})
			}
		})
	}

	return (
		<section className='flex w-4/5 flex-col gap-10'>
			<div className='flex flex-col gap-4'>
				<h1 className='font-jakarta text-[40px] font-semibold'>Customer Info</h1>
				<p className='w-4/5 text-sm font-medium text-gray-500'>
					Please fill out the form with accurate details about your customer. Ensure all
					information provided is correct and up-to-date.
				</p>
			</div>
			<div className='flex flex-col gap-7'>
				<div className='flex flex-col gap-2'>
					<h1 className='CustomerInfotitle font-jakarta text-xl font-bold text-blue-300'></h1>
					<span className='CustomerInfosubtitle font-roboto text-sm font-medium text-gray-500'></span>
				</div>
				<div className='selectCustomerInfo flex flex-row gap-10'>
					<div className='flex-grow'>
						<Label htmlFor='name'>Customer Name</Label>
						<Input
							id='name'
							placeholder='Customer Name'
							value={customerData.name}
							onChange={(e) => {
								dispatch(updateName(e.target.value))
								setIssNameNotValid(false)
							}}
						/>
						{isNameNotValid && (
							<span className='text-sm text-red-500'>Enter a valid Name</span>
						)}
					</div>
				</div>
				<div className='selectCustomerInfo flex flex-row gap-10'>
					<div className='flex-grow'>
						<Label htmlFor='email'>Mail Address</Label>
						<Input
							id='email'
							placeholder='Mail Address'
							type='email'
							value={customerData.email}
							onChange={(e) => {
								dispatch(updateEmail(e.target.value))
								setIsEmailNotValid(false)
							}}
						/>
						{isEmailNotValid && (
							<span className='text-sm text-red-500'>Enter a valid Email</span>
						)}
					</div>
				</div>
				<div className='selectCustomerInfo flex flex-row gap-10'>
					<div className='max-w-20'>
						<Label htmlFor='code'>Code</Label>
						<Input
							disabled={true}
							id='mobile'
							placeholder='Mobile Code'
							value={customerData.code}
						/>
					</div>
					<div className='flex-grow'>
						<Label htmlFor='mobile'>Mobile Number</Label>
						<Input
							id='mobile'
							maxLength={10}
							placeholder='Mobile Number'
							type='number'
							value={customerData.mobile}
							onChange={(e) => {
								if (e.target.value.length <= 9) {
									dispatch(updateMobile(e.target.value))
									setIsMobileNotValid(false)
								}
							}}
						/>
						{isMobileNotValid && (
							<span className='text-sm text-red-500'>
								Enter a valid Mobile Number
							</span>
						)}
					</div>
				</div>
			</div>
			<span className='selectCustomerInfo -mt-6 font-jakarta text-xs text-gray-500'>
				We&apos;ll call or text you to confirm your number. Standard message and data rates
				apply. <span className='font-semibold text-gray-600'>Privacy Policy</span>
			</span>
			<Button
				className='selectCustomerInfo w-full'
				variant='bluebtn'
				onClick={goToConfirm}>
				{isLoading ? (
					<ClipLoader
						color='#FFFFFF'
						size={20}
					/>
				) : (
					<span>View Premium</span>
				)}
			</Button>
			{/* <div className='flex items-center justify-center'>
				<div className='relative w-full border-t border-green-50'>
					<span className='absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 transform bg-white px-2'>
						Or
					</span>
				</div>
			</div>
			<OtherOptions /> */}
		</section>
	)
}
