'use client'

import { useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/navigation'
import { Button } from '../ui'
import { Check } from 'lucide-react'

export function OnboardingModal() {
	const route = useRouter()
	const whiteBookData = useAppSelector((state) => state.whitebookdetails)
	return (
		<div className='flex h-full w-full flex-col gap-4'>
			<h3 className='w-full bg-white p-3 font-jakarta text-xl font-semibold shadow-detailsContainerShadow'>
				Preview and Save
			</h3>
			<div className='flex w-full flex-col gap-5 px-6 py-2 font-jakarta'>
				<p className='font-medium'>Information captured from Documents</p>
				<div className='flex flex-col gap-3 border-b-[0.5px] border-b-gray-450 border-opacity-50 pb-4'>
					<div className='flex flex-row justify-between font-jakarta'>
						<div className='flex flex-row gap-3'>
							<div className='flex h-6 w-6 items-center justify-center rounded-full bg-green-200'>
								<Check
									color='white'
									height={16}
									width={16}
								/>
							</div>
							<h4>Make</h4>
						</div>
						<h4 className='font-semibold'>{whiteBookData.Make}</h4>
					</div>
					<div className='flex flex-row justify-between font-jakarta'>
						<div className='flex flex-row gap-3'>
							<div className='flex h-6 w-6 items-center justify-center rounded-full bg-green-200'>
								<Check
									color='white'
									height={16}
									width={16}
								/>
							</div>
							<h4>Model</h4>
						</div>
						<h4 className='font-semibold'>{whiteBookData.Model}</h4>
					</div>
					<div className='flex flex-row justify-between font-jakarta'>
						<div className='flex flex-row gap-3'>
							<div className='flex h-6 w-6 items-center justify-center rounded-full bg-green-200'>
								<Check
									color='white'
									height={16}
									width={16}
								/>
							</div>
							<h4>Number of Seats</h4>
						</div>
						<h4 className='font-semibold'>{whiteBookData.SeatingCapacity}</h4>
					</div>
					<div className='flex flex-row justify-between font-jakarta'>
						<div className='flex flex-row gap-3'>
							<div className='flex h-6 w-6 items-center justify-center rounded-full bg-green-200'>
								<Check
									color='white'
									height={16}
									width={16}
								/>
							</div>
							<h4>Manufacture Year</h4>
						</div>
						<h4 className='font-semibold'>{whiteBookData.YearOfMake}</h4>
					</div>
					<div className='flex flex-row justify-between font-jakarta'>
						<div className='flex flex-row gap-3'>
							<div className='flex h-6 w-6 items-center justify-center rounded-full bg-green-200'>
								<Check
									color='white'
									height={16}
									width={16}
								/>
							</div>
							<h4>Colour</h4>
						</div>
						<h4 className='font-semibold'>{whiteBookData.Colour}</h4>
					</div>
				</div>
				<p className='font-medium'>Additional Details</p>
				<div className='flex flex-col gap-3'>
					<div className='flex flex-row justify-between font-jakarta'>
						<div className='flex flex-row gap-3'>
							<h4>Registration Number</h4>
						</div>
						<h4 className='font-semibold'>{whiteBookData.RegistrationMark}</h4>
					</div>
					<div className='flex flex-row justify-between font-jakarta'>
						<div className='flex flex-row gap-3'>
							<h4>Chassis Number</h4>
						</div>
						<h4 className='font-semibold'>{whiteBookData.VINChassisNumber}</h4>
					</div>
					<div className='flex flex-row justify-between font-jakarta'>
						<div className='flex flex-row gap-3'>
							<h4>Engine Number</h4>
						</div>
						<h4 className='font-semibold'>{whiteBookData.EngineNumber}</h4>
					</div>
				</div>
			</div>

			<div className='w-full border-t-[0.5px] border-t-gray-450 border-opacity-50 p-4'>
				<Button
					className='w-full font-jakarta font-medium'
					variant='bluebtn'
					onClick={() => {
						route.push('/car-insurance/1')
					}}>
					Continue
				</Button>
			</div>
		</div>
	)
}
