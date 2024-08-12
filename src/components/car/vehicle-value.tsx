import { cn } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Input } from '../ui'
import { updateAssessories, updateValue } from '@/redux/slices'
import { type ChangeEvent, useState } from 'react'
// import Image from 'next/image'
// import { assets } from '@/assets'

export function VehicleValue() {
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const dispatch = useAppDispatch()

	const [formattedValue, setFormattedValue] = useState<string>(vehicleData.value.toLocaleString())

	const [formattedSum, setFormattedSum] = useState<string>(
		vehicleData.AcccessoriesSumInsured.toLocaleString()
	)

	useGSAP(() => {
		if (vehicleData.value === 0) {
			gsap.from('.selectVehicleDesciption', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
			// gsap.to('.Valuetitle', {
			// 	duration: 0.5,
			// 	text: 'Vehicle Value & Electrical Accessories'
			// })
			// gsap.to('.Valuesubtitle', {
			// 	duration: 0.5,
			// 	text: 'How the vehicle is used, such as for personal, business, or commercial purposes',
			// 	delay: 0.5
			// })
		} else {
			gsap.from('.selectVehicleDesciption', { y: 80, opacity: 0, duration: 0.5 })
			// gsap.to('.Valuetitle', {
			// 	duration: 0.5,
			// 	text: 'Vehicle Value & Electrical Accessories'
			// })
			// gsap.to('.Valuesubtitle', {
			// 	duration: 0.5,
			// 	text: 'How the vehicle is used, such as for personal, business, or commercial purposes'
			// })
		}
	})

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		let inputValue = e.target.value

		// Remove any non-numeric characters
		inputValue = inputValue.replace(/[^0-9]/g, '')

		// Convert to number and format with commas
		const numericValue = Number(inputValue)
		const formattedValue = numericValue.toLocaleString()

		setFormattedValue(formattedValue)
		dispatch(updateValue(numericValue))
	}

	function handleEAChange(e: ChangeEvent<HTMLInputElement>) {
		let inputValue = e.target.value

		// Remove any non-numeric characters
		inputValue = inputValue.replace(/[^0-9]/g, '')

		// Convert to number and format with commas
		const numericValue = Number(inputValue)
		const formattedValue = numericValue.toLocaleString()

		setFormattedSum(formattedValue)
		dispatch(updateAssessories(numericValue))
	}

	return (
		<div
			className={cn('flex flex-col gap-7', {
				'min-h-[65vh]': vehicleData.value === 0
			})}>
			<div className='flex flex-row items-center gap-4'>
				{/* <div className='min-h-12 min-w-12 overflow-hidden rounded-full'>
					<Image
						alt='face'
						height={60}
						src={assets.images.imageFace}
						width={60}
					/>
				</div> */}
				<div className='flex flex-col gap-2'>
					<h1 className='Valuetitle font-jakarta text-xl font-bold text-blue-300'>
						Vehicle Value & Electrical Accessories
					</h1>
					<span className='Valuesubtitle font-roboto text-sm font-medium text-gray-500'>
						How the vehicle is used, such as for personal, business, or commercial
						purposes
					</span>
				</div>
			</div>
			<div className='selectVehicleDesciption flex flex-col gap-10 lg:flex-row'>
				<div className='flex-grow'>
					<Input
						placeholder='Vehicle Value'
						value={
							formattedValue !== '' && formattedValue !== '0'
								? formattedValue
								: undefined
						}
						onChange={handleChange}
					/>
				</div>
				<div className='flex-grow'>
					<Input
						placeholder='Electrical Accessories'
						value={
							formattedSum !== '' && formattedSum !== '0' ? formattedSum : undefined
						}
						onChange={handleEAChange}
					/>
				</div>
			</div>
		</div>
	)
}
