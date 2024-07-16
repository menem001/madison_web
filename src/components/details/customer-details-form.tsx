'use client'

import { useState } from 'react'
import { PersonalInformationField } from './personal-information-field'
import { IdentificationDetailsField } from './identification-details-field'
import { BusinessDetailsField } from './business-details-field'
import { AddressDetailsField } from './address-details-field'
import { ContactInformationField } from './contact-information-field'
import { Button } from '../ui'
import { useRouter } from 'next/navigation'

export function CustomerDetailsForm() {
	const [current, setCurrent] = useState(1)

	const route = useRouter()

	function goNext() {
		setCurrent((pre) => pre + 1)
	}

	function goSpecific(num: number) {
		setCurrent(num)
	}

	function navigateToVehicle() {
		route.push('/car-insurance/details/vehicle-details')
	}

	return (
		<section className='flex h-full w-full flex-col gap-10'>
			<div className='flex flex-col gap-5'>
				<h1 className='font-roboto text-5xl font-semibold text-blue-300'>
					Customer Details
				</h1>
				<h5 className='text-gray-550 font-roboto text-sm'>
					Hello, please fill in the forms below
				</h5>
			</div>
			<section className='border-blue-925 flex flex-col gap-10 border-l border-dashed'>
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
				<BusinessDetailsField
					current={current}
					goNext={goNext}
					goSpecific={goSpecific}
					pos={3}
				/>
				<AddressDetailsField
					current={current}
					goNext={goNext}
					goSpecific={goSpecific}
					pos={4}
				/>
				<ContactInformationField
					current={current}
					goNext={goNext}
					goSpecific={goSpecific}
					pos={5}
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
