'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { MotorDetailsField } from './motor-details-field'
import { UploadDocumentsForm } from './upload-documents-form'
import { AdditionalVehicleInfo } from './additional-vehicle-info'
import { Button } from '../ui'
import { useSaveVehicleInfoMutation } from '@/redux/api/commonApi'
import { useAppSelector } from '@/redux/hooks'
import { useToast } from '../ui/use-toast'
import ClipLoader from 'react-spinners/ClipLoader'
import { BackButton } from '../common/back_btn'
import { UploadVehileDocumentsForm } from './upload-vehicle-documents-form'

export function VehicleDetailsForm() {
	const [current, setCurrent] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const customerData = useAppSelector((state) => state.customerDetails)
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const appsData = useAppSelector((state) => state.apps)

	const route = useRouter()

	function goNext() {
		setCurrent((pre) => pre + 1)
	}

	const { toast } = useToast()

	function goSpecific(num: number) {
		setCurrent(num)
	}

	const [saveCustomerData] = useSaveVehicleInfoMutation()

	function navigateToPay() {
		setIsLoading(true)
		const req = {
			Insuranceid: appsData.insuranceID,
			BranchCode: appsData.branchCode,
			Chassisnumber: vehicleData.chassisNumber,
			Color: vehicleData.color !== '' ? vehicleData.color : 'Orange',
			CreatedBy: appsData.loginId,
			EngineNumber: vehicleData.engineNumber,
			Grossweight: null,
			ManufactureYear: vehicleData.year + '',
			Motorusage: vehicleData.vehicleUsageID,
			NumberOfAxels: null,
			OwnerCategory: '1',
			Registrationnumber: vehicleData.registrationNumber,
			ResEngineCapacity: vehicleData.engineCapacity,
			ResOwnerName: customerData.name,
			ResStatusCode: 'Y',
			ResStatusDesc: 'None',
			SeatingCapacity: vehicleData.seat + '',
			Tareweight: null,
			Vehcilemodel: vehicleData.model,
			VehicleType: vehicleData.bodyType,
			Vehiclemake: vehicleData.mark
		}
		const res = saveCustomerData(req)
		res.then((value) => {
			if (
				value.data?.type === 'success' &&
				value.data.data !== undefined &&
				value.data.data.Result !== null
			) {
				setIsLoading(false)
				route.push('/car-insurance/payment/confirm')
			} else if (
				value.data?.type === 'success' &&
				value.data.data !== undefined &&
				value.data.data.IsError === true &&
				value.data.data.ErrorMessage !== null &&
				value.data.data.ErrorMessage.length !== 0
			) {
				if (
					value.data.data.ErrorMessage[0].Message.startsWith(
						'Seating Capacity Must be under'
					)
				) {
					goSpecific(1)
				}

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
		<section className='flex h-full w-full flex-col gap-6 md:gap-10'>
			<BackButton />
			<div className='flex flex-col gap-2 md:gap-5'>
				<h1 className='font-roboto text-4xl font-semibold text-blue-300 md:text-5xl'>
					Vehicle Details
				</h1>
				<h5 className='font-roboto text-xs text-gray-550 md:text-sm'>
					Hello, please fill in the forms below
				</h5>
			</div>
			<section className='flex flex-col gap-6 border-l border-dashed border-blue-925 md:gap-10'>
				<MotorDetailsField
					current={current}
					goNext={goNext}
					goSpecific={goSpecific}
					pos={1}
				/>
				<AdditionalVehicleInfo
					current={current}
					goNext={goNext}
					goSpecific={goSpecific}
					pos={2}
				/>
				<UploadDocumentsForm
					current={current}
					goNext={goNext}
					goSpecific={goSpecific}
					pos={3}
				/>
				<UploadVehileDocumentsForm
					current={current}
					goNext={goNext}
					goSpecific={goSpecific}
					pos={4}
				/>
			</section>
			{current === 5 && (
				<Button
					variant='bluebtn'
					onClick={navigateToPay}>
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
