'use client'

import { useState } from 'react'
import { PersonalInformationField } from './personal-information-field'
import { IdentificationDetailsField } from './identification-details-field'
import { AddressDetailsField } from './address-details-field'
import { ContactInformationField } from './contact-information-field'
import { Button } from '../ui'
import { useRouter } from 'next/navigation'
import { useBuyPolicyMutation, useSaveCustomerDetailsMutation } from '@/redux/api/commonApi'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateQuoteDetails } from '@/redux/slices/motor-detail.slice'
import { useToast } from '../ui/use-toast'
import ClipLoader from 'react-spinners/ClipLoader'
import { BackButton } from '../common/back_btn'

export function CustomerDetailsForm() {
	const [current, setCurrent] = useState(1)

	const [saveCustomerDetails] = useSaveCustomerDetailsMutation()
	const [isLoading, setIsLoading] = useState(false)

	const customerData = useAppSelector((state) => state.customerDetails)
	const appData = useAppSelector((state) => state.apps)
	const motorData = useAppSelector((state) => state.motor)
	const classID = useAppSelector((state) => state.carInsurance.classID)

	const [buyPolicies] = useBuyPolicyMutation()

	const route = useRouter()

	const dispatch = useAppDispatch()

	const { toast } = useToast()

	function goNext() {
		setCurrent((pre) => pre + 1)
	}

	function goSpecific(num: number) {
		setCurrent(num)
	}

	function navigateToVehicle() {
		setIsLoading(true)
		const req = {
			BrokerBranchCode: appData.brokerCode,
			CustomerReferenceNo: motorData.CustomerReferenceNo,
			InsuranceId: appData.insuranceID,
			BranchCode: appData.branchCode,
			ProductId: appData.productId,
			AppointmentDate: '',
			BusinessType: null,
			CityCode: customerData.poBox,
			CityName: customerData.cityName,
			ClientName: customerData.name,
			Clientstatus: 'Y',
			CreatedBy: appData.loginId,
			DobOrRegDate: customerData.dob,
			District: customerData.cityName,
			Email1: customerData.email,
			Email2: null,
			Email3: null,
			Fax: null,
			Gender: customerData.gender,
			IdNumber: customerData.nrc,
			IdType: '1',
			IsTaxExempted: 'N',
			Language: '1',
			MobileNo1: customerData.mobile,
			MobileNo2: customerData.mobile2,
			MobileNo3: null,
			Nationality: 'ZMB',
			Occupation: '1',
			OtherOccupation: '',
			Placeofbirth: customerData.cityName,
			PolicyHolderType: '1',
			PolicyHolderTypeid: '1',
			PreferredNotification: 'Sms',
			RegionCode: customerData.city,
			MobileCode1: customerData.code,
			WhatsappCode: customerData.code,
			MobileCodeDesc1: '1',
			WhatsappDesc: '1',
			WhatsappNo: '',
			StateCode: '37',
			StateName: null,
			Status: 'Y',
			Type: customerData.accType,
			TaxExemptedId: null,
			TelephoneNo1: '',
			PinCode: customerData.poBox,
			TelephoneNo2: null,
			TelephoneNo3: null,
			VrTinNo: null,
			Title: customerData.title,
			Address1: customerData.address,
			SaveOrSubmit: 'Submit',
			Zone: '1'
		}
		const res = saveCustomerDetails(req)
		res.then((value) => {
			if (
				value.data?.type === 'success' &&
				value.data.data !== undefined &&
				value.data.data.IsError !== true &&
				value.data.data.Result !== null
			) {
				buyPolicy()
			} else if (
				value.data?.type === 'success' &&
				value.data.data !== undefined &&
				value.data.data.IsError === true &&
				value.data.data.ErrorMessage !== null &&
				value.data.data.ErrorMessage.length !== 0
			) {
				setIsLoading(false)
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: value.data.data.ErrorMessage[0].Message
				})
			} else {
				setIsLoading(false)
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: 'There was a problem with your request.'
				})
			}
		})
	}

	function buyPolicy() {
		const req = {
			RequestReferenceNo: motorData.RequestReferenceNo,
			CreatedBy: appData.loginId,
			ProductId: appData.productId,
			ManualReferralYn: 'N',
			ReferralRemarks: null,
			Vehicles: [
				{
					Covers: appData.covers,
					Id: '1',
					SectionId: classID
				}
			]
		}
		const res = buyPolicies(req)
		res.then((value) => {
			if (
				value.data?.type === 'success' &&
				value.data.data !== undefined &&
				value.data.data.Result !== null
			) {
				dispatch(
					updateQuoteDetails({
						CustomerId: value.data.data.Result.CustomerId,
						QuoteNo: value.data.data.Result.QuoteNo
					})
				)
				setIsLoading(false)
				route.push('/car-insurance/details/vehicle-details')
			} else if (
				value.data?.type === 'success' &&
				value.data.data !== undefined &&
				value.data.data.IsError === true &&
				value.data.data.ErrorMessage !== null &&
				value.data.data.ErrorMessage.length !== 0
			) {
				setIsLoading(false)
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: value.data.data.ErrorMessage[0].Message
				})
			} else {
				setIsLoading(false)
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: 'There was a problem with your request.'
				})
			}
		})
	}

	return (
		<section className='flex h-full w-full flex-col gap-10'>
			<BackButton />
			<div className='flex flex-col gap-5'>
				<h1 className='font-roboto text-5xl font-semibold text-blue-300'>
					Customer Details
				</h1>
				<h5 className='font-roboto text-sm text-gray-550'>
					Hello, please fill in the forms below
				</h5>
			</div>
			<section className='flex flex-col gap-10 border-l border-dashed border-blue-925'>
				<PersonalInformationField
					current={current}
					goNext={goNext}
					goSpecific={goSpecific}
					pos={1}
				/>
				<IdentificationDetailsField
					current={current}
					goNext={goNext}
					goSpecific={goSpecific}
					pos={2}
				/>
				{/* <BusinessDetailsField
					current={current}
					goNext={goNext}
					goSpecific={goSpecific}
					pos={3}
				/> */}
				<AddressDetailsField
					current={current}
					goNext={goNext}
					goSpecific={goSpecific}
					pos={3}
				/>
				<ContactInformationField
					current={current}
					goNext={goNext}
					goSpecific={goSpecific}
					pos={4}
				/>
			</section>
			{current === 5 && (
				<Button
					variant='bluebtn'
					onClick={navigateToVehicle}>
					{isLoading ? (
						<ClipLoader
							color='#FFFFFF'
							size={20}
						/>
					) : (
						<span>Submit</span>
					)}
				</Button>
			)}
		</section>
	)
}
