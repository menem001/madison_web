import { cn } from '@/lib'
import { useAppDispatch } from '@/redux/hooks'
import { updateClaims } from '@/redux/slices'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useState } from 'react'

export function Claims() {
	const dispatch = useAppDispatch()

	const [iclaims, setIclaims] = useState<number>(0)

	useGSAP(() => {
		gsap.from('.selectInsClaims', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
		gsap.to('.InsClaimstitle', { duration: 0.5, text: 'Claims' })
		gsap.to('.InsClaimssubtitle', {
			duration: 0.5,
			text: 'Please select the claims and provide the details for the same',
			delay: 0.5
		})
	})

	useEffect(() => {
		if (iclaims === 1) {
			dispatch(updateClaims(true))
		} else if (iclaims === 2) {
			dispatch(updateClaims(false))
		}
	}, [dispatch, iclaims])

	return (
		<div className='flex w-full flex-row items-center justify-between'>
			<div className='flex flex-col gap-2'>
				<h1 className='InsClaimstitle font-jakarta text-xl font-bold text-blue-300'></h1>
				<span className='InsClaimssubtitle font-roboto text-sm font-medium text-gray-500'></span>
			</div>
			<div className='selectInsClaims flex flex-row gap-5'>
				<div
					className={cn(
						'cursor-pointer rounded-3xl border border-gray-700 bg-white px-7 py-2 font-inter font-semibold text-gray-700',
						{ 'border-none bg-blue-300 text-white': iclaims === 1 }
					)}
					onClick={() => {
						setIclaims(1)
					}}>
					Yes
				</div>
				<div
					className={cn(
						'cursor-pointer rounded-3xl border border-gray-700 bg-white px-7 py-2 font-inter font-semibold text-gray-700',
						{ 'border-none bg-blue-300 text-white': iclaims === 2 }
					)}
					onClick={() => {
						setIclaims(2)
					}}>
					No
				</div>
			</div>
		</div>
	)
}
