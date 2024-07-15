import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateDeductibles } from '@/redux/slices'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Input } from '../ui'

export function Deductibles() {
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const dispatch = useAppDispatch()

	useGSAP(() => {
		gsap.from('.selectDebuctible', { y: 80, opacity: 0, duration: 1, delay: 2 })
		gsap.to('.Debuctibletitle', { duration: 1, text: 'Debuctible' })
		gsap.to('.Debuctiblesubtitle', {
			duration: 1,
			text: 'How the vehicle is used, such as for personal, business, or commercial purposes',
			delay: 1
		})
	})
	return (
		<div className='flex flex-col gap-7'>
			<div className='flex flex-col gap-2'>
				<h1 className='Debuctibletitle font-jakarta text-xl font-bold text-blue-300'></h1>
				<span className='Debuctiblesubtitle font-roboto text-sm font-medium text-gray-500'></span>
			</div>
			<Input
				className='selectDebuctible w-1/2'
				placeholder='Sum Insured'
				type='number'
				value={vehicleData.deductibles}
				onChange={(e) => {
					dispatch(updateDeductibles(e.target.value))
				}}
			/>
		</div>
	)
}
