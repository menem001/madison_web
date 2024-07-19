import { cn } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { updateExcessLimit, updateVehicleManufactureYear } from '@/redux/slices'

export function ManufactureYear() {
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const dispatch = useAppDispatch()

	const years = []

	const currentYear = new Date(Date.now()).getFullYear()

	for (let i = currentYear; i > currentYear - 25; i--) {
		years.push(i + '')
	}

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
			<div className='flex flex-col gap-2'>
				<h1 className='Yeartitle font-jakarta text-xl font-bold text-blue-300'></h1>
				<span className='Yearsubtitle font-roboto text-sm font-medium text-gray-500'></span>
			</div>
			<div className='selectManufacture flex flex-row gap-10'>
				<Select
					value={vehicleData.year + ''}
					onValueChange={(e) => {
						dispatch(updateVehicleManufactureYear(e + ''))
					}}>
					<SelectTrigger
						className='w-3/4'
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
				<Input
					className='h-16'
					placeholder='Excess Limit'
					type='number'
					value={vehicleData.excessLimit !== 0 ? vehicleData.excessLimit : undefined}
					onChange={(e) => {
						dispatch(updateExcessLimit(+e.target.value))
					}}
				/>
			</div>
		</div>
	)
}
