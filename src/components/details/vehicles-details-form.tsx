'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { MotorDetailsField } from './motor-details-field'
import { ValuationDetailsField } from './valuation-details-field'
import { EnergySpecificationField } from './energy-specification-field'
import { AdditionalVehicleInfo } from './additional-vehicle-info'
import { Button } from '../ui'

export function VehicleDetailsForm() {
	const [current, setCurrent] = useState(1)

	const route = useRouter()

	function goNext() {
		setCurrent((pre) => pre + 1)
	}

	function goSpecific(num: number) {
		setCurrent(num)
	}

	function navigateToPay() {
		route.push('/car-insurance/payment')
	}

	return (
		<section className='flex h-full w-full flex-col gap-10'>
			<div className='flex flex-col gap-5'>
				<h1 className='font-roboto text-5xl font-semibold text-blue-300'>
					Vehicle Details
				</h1>
				<h5 className='text-gray-550 font-roboto text-sm'>
					Hello, please fill in the forms below
				</h5>
			</div>
			<section className='border-blue-925 flex flex-col gap-10 border-l border-dashed'>
				<MotorDetailsField
					current={current}
					goNext={goNext}
					goSpecific={goSpecific}
					pos={1}
				/>
				<ValuationDetailsField
					current={current}
					goNext={goNext}
					goSpecific={goSpecific}
					pos={2}
				/>
				<EnergySpecificationField
					current={current}
					goNext={goNext}
					goSpecific={goSpecific}
					pos={3}
				/>
				<AdditionalVehicleInfo
					current={current}
					goNext={goNext}
					goSpecific={goSpecific}
					pos={4}
				/>
			</section>
			{current === 4 && (
				<Button
					variant='bluebtn'
					onClick={navigateToPay}>
					Submit
				</Button>
			)}
		</section>
	)
}
