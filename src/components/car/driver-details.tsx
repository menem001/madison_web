'use client'

import { cn } from '@/lib'
import { useAppDispatch } from '@/redux/hooks'
import { useState } from 'react'
import { Button, Input } from '../ui'
import { updateDriverDetails } from '@/redux/slices'
import { Label } from '../ui/label'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export function DriverDetails() {
	const dispatch = useAppDispatch()

	const [isDriver, setIsDriver] = useState<number>(0)

	const [driverName, setDriverName] = useState('')
	const [driverDOB, setDriverDOB] = useState('')
	const [driverID, setDriverID] = useState('')

	useGSAP(() => {
		if (driverName === '') {
			gsap.from('.selectDriver', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
			gsap.to('.Drivertitle', { duration: 0.5, text: 'Are you Owner or Driver' })
			gsap.to('.Driversubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes',
				delay: 0.5
			})
		} else {
			gsap.from('.selectDriver', { y: 80, opacity: 0, duration: 0.5 })
			gsap.to('.Drivertitle', { duration: 0.5, text: 'Are you Owner or Driver' })
			gsap.to('.Driversubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes'
			})
		}
	}, [])

	return (
		<div className='flex w-full flex-col items-center justify-between gap-6'>
			<div className='flex w-full flex-row items-center justify-between'>
				<div className='flex flex-col gap-2'>
					<h1 className='Drivertitle font-jakarta text-xl font-bold text-blue-300'></h1>
					<span className='Driversubtitle font-roboto text-sm font-medium text-gray-500'></span>
				</div>
				<div className='selectDriver flex flex-row gap-5'>
					<div
						className={cn(
							'cursor-pointer rounded-3xl border border-gray-700 bg-white px-7 py-2 font-inter font-semibold text-gray-700',
							{ 'border-none bg-blue-300 text-white': isDriver === 1 }
						)}
						onClick={() => {
							setIsDriver(1)
						}}>
						Driver
					</div>
					<div
						className={cn(
							'cursor-pointer rounded-3xl border border-gray-700 bg-white px-7 py-2 font-inter font-semibold text-gray-700',
							{ 'border-none bg-blue-300 text-white': isDriver === 2 }
						)}
						onClick={() => {
							setIsDriver(2)
						}}>
						Owner
					</div>
				</div>
			</div>
			<div className='selectDriver flex w-full flex-row gap-10'>
				<div className='flex-grow'>
					<Label htmlFor='number'>Driver Name</Label>
					<Input
						placeholder='Driver Name'
						value={driverName}
						onChange={(e) => {
							setDriverName(e.target.value)
						}}
					/>
				</div>
				<div className='flex-grow'>
					<Label htmlFor='number'>Driver DOB</Label>
					<Input
						placeholder='Driver DOB'
						value={driverDOB}
						onChange={(e) => {
							setDriverDOB(e.target.value)
						}}
					/>
				</div>
			</div>
			<div className='selectDriver flex w-full flex-row gap-10'>
				<div className='flex-grow'>
					<Label htmlFor='number'>Driver ID(Driving License)</Label>
					<Input
						placeholder='Enter the ID Number of the Driver'
						value={driverID}
						onChange={(e) => {
							setDriverID(e.target.value)
						}}
					/>
				</div>
			</div>
			<Button
				variant='bluebtn'
				onClick={() => {
					dispatch(
						updateDriverDetails({
							driverOrOwner: isDriver === 1 ? 'Driver' : 'Owner',
							DriverDOB: driverDOB,
							DriverID: driverID,
							DriverName: driverName
						})
					)
				}}>
				Save
			</Button>
		</div>
	)
}
