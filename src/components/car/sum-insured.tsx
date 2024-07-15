import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateInsuredSum } from '@/redux/slices'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Input } from '../ui'

export function SumInsured() {
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const dispatch = useAppDispatch()

	useGSAP(() => {
		gsap.from('.selectsumInsured', { y: 80, opacity: 0, duration: 1, delay: 2 })
		gsap.to('.sumInsuredtitle', { duration: 1, text: 'Sum Insured' })
		gsap.to('.sumInsuredsubtitle', {
			duration: 1,
			text: 'How the vehicle is used, such as for personal, business, or commercial purposes',
			delay: 1
		})
	})
	return (
		<div className='flex flex-col gap-7'>
			<div className='flex flex-col gap-2'>
				<h1 className='sumInsuredtitle font-jakarta text-xl font-bold text-blue-300'></h1>
				<span className='sumInsuredsubtitle font-roboto text-sm font-medium text-gray-500'></span>
			</div>
			<Input
				className='selectsumInsured w-1/2'
				placeholder='Sum Insured'
				type='number'
				value={vehicleData.sumInsured}
				onChange={(e) => {
					dispatch(updateInsuredSum(e.target.value))
				}}
			/>
		</div>
	)
}
