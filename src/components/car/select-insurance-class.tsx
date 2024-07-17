import { cn } from '@/lib'
import { useAppDispatch } from '@/redux/hooks'
import { updateClass, updateGPSTraking, updateSumInsured } from '@/redux/slices'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useState } from 'react'

export function SelectInsuranceClass() {
	const dispatch = useAppDispatch()

	const [iclass, setIclass] = useState<number>(0)

	useGSAP(() => {
		gsap.from('.selectInsClass', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
		gsap.to('.InsClasstitle', { duration: 0.5, text: 'Insurance Class' })
		gsap.to('.InsClasssubtitle', {
			duration: 0.5,
			text: 'Fill out the vehicle details section completely.',
			delay: 0.5
		})
	})

	useEffect(() => {
		if (iclass === 1) {
			dispatch(updateClass('Comprehensive'))
		} else if (iclass === 2) {
			dispatch(updateClass('TPFT'))
			dispatch(updateGPSTraking(null))
		} else if (iclass === 3) {
			dispatch(updateClass('TPO'))
			dispatch(updateGPSTraking(null))
			dispatch(updateSumInsured(null))
		}
	}, [dispatch, iclass])

	return (
		<div className='flex flex-col gap-7'>
			<div className='flex flex-col gap-2'>
				<h1 className='InsClasstitle font-jakarta text-xl font-bold text-blue-300'></h1>
				<span className='InsClasssubtitle font-roboto text-sm font-medium text-gray-500'></span>
			</div>
			<div className='selectInsClass flex flex-row gap-10'>
				<div
					className={cn(
						'cursor-pointer rounded-lg border border-gray-700 bg-white px-7 py-2 font-inter font-semibold text-gray-700',
						{ 'border-none bg-blue-300 text-white': iclass === 1 }
					)}
					onClick={() => {
						setIclass(1)
					}}>
					Comprehensive
				</div>
				<div
					className={cn(
						'cursor-pointer rounded-lg border border-gray-700 bg-white px-7 py-2 font-inter font-semibold text-gray-700',
						{ 'border-none bg-blue-300 text-white': iclass === 2 }
					)}
					onClick={() => {
						setIclass(2)
					}}>
					TPFT
				</div>
				<div
					className={cn(
						'cursor-pointer rounded-lg border border-gray-700 bg-white px-7 py-2 font-inter font-semibold text-gray-700',
						{ 'border-none bg-blue-300 text-white': iclass === 3 }
					)}
					onClick={() => {
						setIclass(3)
					}}>
					TPO
				</div>
			</div>
		</div>
	)
}
