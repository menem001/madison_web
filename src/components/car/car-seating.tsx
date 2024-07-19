import { cn } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Input } from '../ui'
import { updateSeats } from '@/redux/slices'
import Image from 'next/image'
import { assets } from '@/assets'

export function CarSeating() {
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const dispatch = useAppDispatch()

	useGSAP(() => {
		if (vehicleData.seat === 0) {
			gsap.from('.selectseat', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
			gsap.to('.seattitle', { duration: 0.5, text: 'Number of Seats' })
			gsap.to('.seatsubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes',
				delay: 0.5
			})
		} else {
			gsap.from('.selectseat', { y: 80, opacity: 0, duration: 0.5 })
			gsap.to('.seattitle', { duration: 0.5, text: 'Number of Seats' })
			gsap.to('.seatsubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes'
			})
		}
	})

	return (
		<div className={cn('flex flex-col gap-7', { 'min-h-[65vh]': vehicleData.seat === 0 })}>
			<div className='-ml-16 flex flex-row items-center gap-4'>
				<div className='h-12 w-12 overflow-hidden rounded-full'>
					<Image
						alt='face'
						height={60}
						src={assets.images.imageFace}
						width={60}
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<h1 className='seattitle font-jakarta text-xl font-bold text-blue-300'></h1>
					<span className='seatsubtitle font-inter text-sm font-medium text-gray-500'></span>
				</div>
			</div>
			<div className='selectseat flex w-3/4 flex-row gap-10'>
				<Input
					placeholder='Number of Seats'
					type='number'
					value={vehicleData.seat !== 0 ? vehicleData.seat : undefined}
					onChange={(e) => {
						dispatch(updateSeats(+e.target.value))
					}}
				/>
			</div>
			<div className='selectseat grid grid-cols-5 gap-6'>
				<div
					key={2}
					className='flex cursor-pointer items-center justify-center rounded-md py-3 font-inter text-sm shadow-md hover:shadow-xl'
					onClick={() => {
						dispatch(updateSeats(2))
					}}>
					2
				</div>
				<div
					key={4}
					className='flex cursor-pointer items-center justify-center rounded-md py-3 font-inter text-sm shadow-md hover:shadow-xl'
					onClick={() => {
						dispatch(updateSeats(4))
					}}>
					4
				</div>
				<div
					key={6}
					className='flex cursor-pointer items-center justify-center rounded-md py-3 font-inter text-sm shadow-md hover:shadow-xl'
					onClick={() => {
						dispatch(updateSeats(6))
					}}>
					6
				</div>
			</div>
		</div>
	)
}
