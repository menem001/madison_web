import { cn } from '@/lib'
import { useAppDispatch } from '@/redux/hooks'
import { updateGPSTraking } from '@/redux/slices'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useState } from 'react'

export function GPSTracking() {
	const dispatch = useAppDispatch()

	const [gps, setGPS] = useState<number>(0)

	useGSAP(() => {
		gsap.from('.selectGPS', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
		gsap.to('.GPStitle', { duration: 0.5, text: 'GPS-Tracking Enabled' })
		gsap.to('.GPSsubtitle', {
			duration: 0.5,
			text: 'Please select the GPS Tracking Enabled and provide the details for the same',
			delay: 0.5
		})
	})

	useEffect(() => {
		if (gps === 1) {
			dispatch(updateGPSTraking(true))
		} else if (gps === 2) {
			dispatch(updateGPSTraking(false))
		}
	}, [dispatch, gps])

	return (
		<div className='flex w-full flex-row items-center justify-between'>
			<div className='flex flex-col gap-2'>
				<h1 className='GPStitle font-jakarta text-xl font-bold text-blue-300'></h1>
				<span className='GPSsubtitle font-roboto text-sm font-medium text-gray-500'></span>
			</div>
			<div className='selectGPS flex flex-row gap-5'>
				<div
					className={cn(
						'cursor-pointer rounded-3xl border border-gray-700 bg-white px-7 py-2 font-inter font-semibold text-gray-700',
						{ 'border-none bg-blue-300 text-white': gps === 1 }
					)}
					onClick={() => {
						setGPS(1)
					}}>
					Yes
				</div>
				<div
					className={cn(
						'cursor-pointer rounded-3xl border border-gray-700 bg-white px-7 py-2 font-inter font-semibold text-gray-700',
						{ 'border-none bg-blue-300 text-white': gps === 2 }
					)}
					onClick={() => {
						setGPS(2)
					}}>
					No
				</div>
			</div>
		</div>
	)
}
