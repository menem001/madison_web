'use client'

import { useState } from 'react'
import { PersonalInformationField } from './personal-information-field'
import { IdentificationDetailsField } from './identification-details-field'
import { AddressDetailsField } from './address-details-field'
import { ContactInformationField } from './contact-information-field'
import { Button } from '../ui'
import { useRouter } from 'next/navigation'
import { useSaveCustomerDetailsMutation } from '@/redux/api/commonApi'
import { useAppSelector } from '@/redux/hooks'

export function CustomerDetailsForm() {
	const [current, setCurrent] = useState(1)

	const [saveCustomerDetails] = useSaveCustomerDetailsMutation()

	const customerData = useAppSelector((state) => state.customerDetails)
	const appData = useAppSelector((state) => state.apps)
	const customerRef = useAppSelector((state) => state.motor.CustomerReferenceNo)

	const route = useRouter()

	function goNext() {
		setCurrent((pre) => pre + 1)
	}

	function goSpecific(num: number) {
		setCurrent(num)
	}

	function navigateToVehicle() {
		const req = {
			BrokerBranchCode: appData.brokerCode,
			CustomerReferenceNo: customerRef,
			InsuranceId: appData.insuranceID,
			BranchCode: appData.branchCode,
			ProductId: appData.productId,
			AppointmentDate: '',
			BusinessType: null,
			CityCode: customerData.poBox,
			CityName: customerData.city,
			ClientName: customerData.name,
			Clientstatus: 'Y',
			CreatedBy: appData.loginId,
			DobOrRegDate: customerData.dob,
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
			Placeofbirth: customerData.city,
			PolicyHolderType: '1',
			PolicyHolderTypeid: '1',
			PreferredNotification: 'Sms',
			RegionCode: '37',
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
		res.then(() => {
			route.push('/car-insurance/details/vehicle-details')
		})
	}

	return (
		<section className='flex h-full w-full flex-col gap-10'>
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
					Submit
				</Button>
			)}
		</section>
	)
}
