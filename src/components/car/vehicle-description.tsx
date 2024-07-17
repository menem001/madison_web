import { cn } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Input } from '../ui'
import { updateDescription } from '@/redux/slices'

export function VehicleDescription() {
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const dispatch = useAppDispatch()

	useGSAP(() => {
		if (vehicleData.description === '') {
			gsap.from('.selectVehicleDesciption', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
			gsap.to('.descriptiontitle', { duration: 0.5, text: 'Model Description' })
			gsap.to('.descriptionsubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes',
				delay: 0.5
			})
		} else {
			gsap.from('.selectVehicleDesciption', { y: 80, opacity: 0, duration: 0.5 })
			gsap.to('.descriptiontitle', { duration: 0.5, text: 'Model Description' })
			gsap.to('.descriptionsubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes'
			})
		}
	})

	return (
		<div
			className={cn('flex flex-col gap-7', {
				'min-h-[56vh]': vehicleData.description === ''
			})}>
			<div className='flex flex-col gap-2'>
				<h1 className='descriptiontitle font-jakarta text-xl font-bold text-blue-300'></h1>
				<span className='descriptionsubtitle font-roboto text-sm font-medium text-gray-500'></span>
			</div>
			<div className='selectVehicleDesciption flex w-3/4 flex-row gap-10'>
				<Input
					placeholder='Model Description'
					value={vehicleData.description}
					onChange={(e) => {
						dispatch(updateDescription(e.target.value))
					}}
				/>
			</div>
		</div>
	)
}
