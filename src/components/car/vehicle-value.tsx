import { cn } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Button, Input } from '../ui'
import { updateValue } from '@/redux/slices'
import { type ChangeEvent, useState } from 'react'
import Image from 'next/image'
import { assets } from '@/assets'

export function VehicleValue() {
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const dispatch = useAppDispatch()

	const [value, setValue] = useState<number>(vehicleData.value)
	const [formattedValue, setFormattedValue] = useState<string>(vehicleData.value.toLocaleString())

	const [accessoriesSumInsured, setAccessoriesSumInsured] = useState<number>(
		+vehicleData.AcccessoriesSumInsured
	)
	const [formattedSum, setFormattedSum] = useState<string>(
		vehicleData.AcccessoriesSumInsured.toLocaleString()
	)

	const [isSent, setIsSent] = useState<boolean>(false)

	useGSAP(() => {
		if (vehicleData.value === 0) {
			gsap.from('.selectVehicleDesciption', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
			gsap.to('.Valuetitle', {
				duration: 0.5,
				text: 'Vehicle Value & Electrical Accessories'
			})
			gsap.to('.Valuesubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes',
				delay: 0.5
			})
		} else {
			gsap.from('.selectVehicleDesciption', { y: 80, opacity: 0, duration: 0.5 })
			gsap.to('.Valuetitle', {
				duration: 0.5,
				text: 'Vehicle Value & Electrical Accessories'
			})
			gsap.to('.Valuesubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes'
			})
		}
	})

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		let inputValue = e.target.value

		// Remove any non-numeric characters
		inputValue = inputValue.replace(/[^0-9]/g, '')

		// Convert to number and format with commas
		const numericValue = Number(inputValue)
		const formattedValue = numericValue.toLocaleString()

		setValue(numericValue)
		setFormattedValue(formattedValue)
		setIsSent(false) // Ensure you define and manage setIsSent accordingly
	}

	function handleEAChange(e: ChangeEvent<HTMLInputElement>) {
		let inputValue = e.target.value

		// Remove any non-numeric characters
		inputValue = inputValue.replace(/[^0-9]/g, '')

		// Convert to number and format with commas
		const numericValue = Number(inputValue)
		const formattedValue = numericValue.toLocaleString()

		setAccessoriesSumInsured(numericValue)
		setFormattedSum(formattedValue)
		setIsSent(false) // Ensure you define and manage setIsSent accordingly
	}

	return (
		<div
			className={cn('flex flex-col gap-7', {
				'min-h-[65vh]': vehicleData.value === 0
			})}>
			<div className='-ml-16 flex flex-row items-center gap-4'>
				<div className='h-12 w-12 overflow-hidden rounded-full'>
					<Image
						alt='face'
						height={60}
						src={assets.images.imageFace}
						width={60}
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<h1 className='Valuetitle font-jakarta text-xl font-bold text-blue-300'></h1>
					<span className='Valuesubtitle font-roboto text-sm font-medium text-gray-500'></span>
				</div>
			</div>
			<div className='selectVehicleDesciption flex flex-row gap-10'>
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
			{value !== 0 && !isSent && (
				<Button
					className='w-1/2'
					variant='bluebtn'
					onClick={() => {
						dispatch(updateValue({ value: value, accessories: accessoriesSumInsured }))
						setIsSent(true)
					}}>
					Continue
				</Button>
			)}
		</div>
	)
}
