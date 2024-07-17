import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Input } from '../ui'
import { updateSumInsured } from '@/redux/slices'

export function SumInsured() {
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const dispatch = useAppDispatch()

	// function addCommas(num:number) {
	// 	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	// }

	// function removeNonNumeric(num:number) {
	// 	return num.toString().replace(/[^0-9]/g, '')
	// }

	useGSAP(() => {
		gsap.from('.selectsumInsured', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
		gsap.to('.sumInsuredtitle', { duration: 0.5, text: 'Sum Insured' })
		gsap.to('.sumInsuredsubtitle', {
			duration: 0.5,
			text: 'How the vehicle is used, such as for personal, business, or commercial purposes',
			delay: 0.5
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
				value={vehicleData.sumInsured !== null ? vehicleData.sumInsured : undefined}
				onChange={(e) => {
					dispatch(updateSumInsured(e.target.value))
				}}
			/>
		</div>
	)
}
