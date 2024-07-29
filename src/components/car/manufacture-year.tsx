import { cn } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { updateExcessLimit, updateVehicleManufactureYear } from '@/redux/slices'
import { Label } from '../ui/label'
import Image from 'next/image'
import { assets } from '@/assets'
import { useEffect } from 'react'

export function ManufactureYear() {
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const year = useAppSelector((state) => state.whitebookdetails.YearOfMake)

	const dispatch = useAppDispatch()

	const years = []

	const currentYear = new Date(Date.now()).getFullYear()

	for (let i = currentYear; i > currentYear - 30; i--) {
		years.push(i + '')
	}

	useEffect(() => {
		if (+year > currentYear - 30 && +year < currentYear) {
			dispatch(updateVehicleManufactureYear(year))
		}
	}, [year])

	useGSAP(() => {
		if (vehicleData.year === 0) {
			gsap.from('.selectManufacture', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
			gsap.to('.Yeartitle', { duration: 0.5, text: 'Manufacture Year & Excess Limit' })
			gsap.to('.Yearsubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes',
				delay: 0.5
			})
		} else {
			gsap.from('.selectManufacture', { y: 80, opacity: 0, duration: 0.5 })
			gsap.to('.Yeartitle', { duration: 0.5, text: 'Manufacture Year & Excess Limit' })
			gsap.to('.Yearsubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes'
			})
		}
	})

	return (
		<div
			className={cn('flex flex-col gap-7', {
				'min-h-[68vh]': vehicleData.year === 0 || vehicleData.excessLimit === 0
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
					<h1 className='Yeartitle font-jakarta text-xl font-bold text-blue-300'></h1>
					<span className='Yearsubtitle font-roboto text-sm font-medium text-gray-500'></span>
				</div>
			</div>
			<div className='selectManufacture flex flex-row gap-10'>
				<div className='flex flex-grow flex-col'>
					<Label htmlFor='year'>Manufacture Year</Label>
					<Select
						value={vehicleData.year + ''}
						onValueChange={(e) => {
							dispatch(updateVehicleManufactureYear(e + ''))
						}}>
						<SelectTrigger
							id='year'
							title='Manufacture Year'
							value={vehicleData.year}>
							<SelectValue />
						</SelectTrigger>
						<SelectContent className='max-h-64'>
							{years.map((year) => {
								return (
									<SelectItem
										key={year}
										value={year}>
										{year}
									</SelectItem>
								)
							})}
						</SelectContent>
					</Select>
				</div>
				<div className='flex flex-grow flex-col'>
					<Label htmlFor='excess'>Excess Limit</Label>
					<Input
						className='h-16'
						id='excess'
						placeholder='Excess Limit'
						type='number'
						value={vehicleData.excessLimit !== 0 ? vehicleData.excessLimit : undefined}
						onChange={(e) => {
							dispatch(updateExcessLimit(+e.target.value))
						}}
					/>
				</div>
			</div>
		</div>
	)
}
