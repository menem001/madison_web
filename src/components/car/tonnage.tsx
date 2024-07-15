import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateTonnage } from '@/redux/slices'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Input } from '../ui'

export function Tonnage() {
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const dispatch = useAppDispatch()

	useGSAP(() => {
		gsap.from('.selectTonnage', { y: 80, opacity: 0, duration: 1, delay: 2 })
		gsap.to('.Tonnagetitle', { duration: 1, text: 'Tonnage' })
		gsap.to('.Tonnagesubtitle', {
			duration: 1,
			text: 'How the vehicle is used, such as for personal, business, or commercial purposes',
			delay: 1
		})
	})

	return (
		<div className='flex flex-col gap-7'>
			<div className='flex flex-col gap-2'>
				<h1 className='Tonnagetitle font-jakarta text-xl font-bold text-blue-300'></h1>
				<span className='Tonnagesubtitle font-roboto text-sm font-medium text-gray-500'></span>
			</div>
			<Input
				className='selectTonnage w-1/2'
				placeholder='Horse Power'
				value={vehicleData.tonnage}
				onChange={(e) => {
					dispatch(updateTonnage(e.target.value))
				}}
			/>
		</div>
	)
}
