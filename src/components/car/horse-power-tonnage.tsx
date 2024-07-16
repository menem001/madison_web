import { cn } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateHorsePower, updateTonnage } from '@/redux/slices'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Input } from '../ui'

type horsePowerTonnageProps = {
	setCount: (num: number) => void
}

export function HorsePowerTonnage(props: horsePowerTonnageProps) {
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const dispatch = useAppDispatch()

	useGSAP(() => {
		if (vehicleData.horsePower === '' || vehicleData.tonnage === '') {
			gsap.from('.selectHorseTonnage', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
			gsap.to('.HorseTonnagetitle', { duration: 0.5, text: 'Horse Power and Tonnage' })
			gsap.to('.HorseTonnagesubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes',
				delay: 0.5
			})
		} else {
			gsap.from('.selectHorseTonnage', { y: 80, opacity: 0, duration: 0.5 })
			gsap.to('.HorseTonnagetitle', { duration: 0.5, text: 'Horse Power and Tonnage' })
			gsap.to('.HorseTonnagesubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes'
			})
		}
	})

	return (
		<div
			className={cn('flex flex-col gap-7', {
				'min-h-[56vh]': vehicleData.horsePower === '' || vehicleData.tonnage === ''
			})}>
			<div className='flex flex-col gap-2'>
				<h1 className='HorseTonnagetitle font-jakarta text-xl font-bold text-blue-300'></h1>
				<span className='HorseTonnagesubtitle font-roboto text-sm font-medium text-gray-500'></span>
			</div>
			<div className='selectHorseTonnage flex flex-row gap-10'>
				<Input
					placeholder='Horse Power'
					value={vehicleData.horsePower}
					onChange={(e) => {
						dispatch(updateHorsePower(e.target.value))
						props.setCount(0)
					}}
				/>
				<Input
					placeholder='Tonnage'
					value={vehicleData.tonnage}
					onChange={(e) => {
						dispatch(updateTonnage(e.target.value))
						props.setCount(0)
					}}
				/>
			</div>
		</div>
	)
}
