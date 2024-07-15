import { cn } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateDeductibles, updateInsuredSum } from '@/redux/slices'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Input } from '../ui'

export function SumInsuredDeductibles() {
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const dispatch = useAppDispatch()

	useGSAP(() => {
		if (vehicleData.sumInsured === 0 || vehicleData.deductibles === 0) {
			gsap.from('.selectsumDeductibles', { y: 80, opacity: 0, duration: 1, delay: 2 })
			gsap.to('.sumDeductiblestitle', { duration: 1, text: 'Sum Insured and Deductibles' })
			gsap.to('.sumDeductiblessubtitle', {
				duration: 1,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes',
				delay: 1
			})
		} else {
			gsap.from('.selectsumDeductibles', { y: 80, opacity: 0, duration: 1 })
			gsap.to('.sumDeductiblestitle', { duration: 1, text: 'Sum Insured and Deductibles' })
			gsap.to('.sumDeductiblessubtitle', {
				duration: 1,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes'
			})
		}
	})
	return (
		<div
			className={cn('flex flex-col gap-7', {
				'min-h-[70vh]': vehicleData.sumInsured === 0 || vehicleData.deductibles === 0
			})}>
			<div className='flex flex-col gap-2'>
				<h1 className='sumDeductiblestitle font-jakarta text-xl font-bold text-blue-300'></h1>
				<span className='sumDeductiblessubtitle font-roboto text-sm font-medium text-gray-500'></span>
			</div>
			<div className='selectsumDeductibles flex flex-row gap-10'>
				<Input
					placeholder='Sum Insured'
					type='number'
					value={vehicleData.sumInsured !== 0 ? vehicleData.sumInsured : undefined}
					onChange={(e) => {
						dispatch(updateInsuredSum(e.target.value))
					}}
				/>
				<Input
					placeholder='Deductibles'
					type='number'
					value={vehicleData.deductibles !== 0 ? vehicleData.deductibles : undefined}
					onChange={(e) => {
						dispatch(updateDeductibles(e.target.value))
					}}
				/>
			</div>
		</div>
	)
}
