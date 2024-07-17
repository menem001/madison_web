import { cn } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { updateVehicleManufactureYear } from '@/redux/slices'

export function ManufactureYear() {
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const dispatch = useAppDispatch()

	const years = []

	for (let i = 1950; i < 2500; i++) {
		years.push(i + '')
	}

	useGSAP(() => {
		if (vehicleData.year === 0) {
			gsap.from('.selectManufacture', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
			gsap.to('.Yeartitle', { duration: 0.5, text: 'Manufacture Year' })
			gsap.to('.Yearsubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes',
				delay: 0.5
			})
		} else {
			gsap.from('.selectManufacture', { y: 80, opacity: 0, duration: 0.5 })
			gsap.to('.Yeartitle', { duration: 0.5, text: 'Manufacture Year' })
			gsap.to('.Yearsubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes'
			})
		}
	})

	return (
		<div
			className={cn('flex flex-col gap-7', {
				'min-h-[56vh]': vehicleData.year === 0
			})}>
			<div className='flex flex-col gap-2'>
				<h1 className='Yeartitle font-jakarta text-xl font-bold text-blue-300'></h1>
				<span className='Yearsubtitle font-roboto text-sm font-medium text-gray-500'></span>
			</div>
			<div className='selectManufacture flex w-3/4 flex-row gap-10'>
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
					<SelectContent>
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
				{/* <Input
					placeholder='Manufacture'
					value={vehicleData.year}
					onChange={(e) => {
						dispatch(updateVehicleManufactureYear(e.target.value))
					}}
				/> */}
			</div>
		</div>
	)
}
