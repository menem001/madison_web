'use client'

import { cn, formatDateDDMMYYYY } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect, useState } from 'react'
import { Button, Input, Popover, PopoverContent, PopoverTrigger } from '../ui'
import { updateDriverDOB, updateDriverID, updateDriverorOwner } from '@/redux/slices'
import { Label } from '../ui/label'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { CalendarDays } from 'lucide-react'
import { Calendar } from '../ui/calendar'

export function DriverDetails() {
	const dispatch = useAppDispatch()
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const [isDriver, setIsDriver] = useState<number>(vehicleData.driverOrOwner === 'Driver' ? 1 : 2)

	const years18 = new Date()

	years18.setFullYear(years18.getFullYear() - 18)

	const parts = vehicleData.DriverDOB.split('/')
	const dateObject = new Date(+parts[2], +parts[1] - 1, +parts[0])
	const timestamp = dateObject.getTime()

	const [driverDOB, setDriverDOB] = useState<Date | undefined>(
		vehicleData.DriverDOB ? new Date(timestamp) : undefined
	)
	const [driverID, setDriverID] = useState(vehicleData.DriverID)

	useGSAP(() => {
		if (driverID === '') {
			gsap.from('.selectDriver', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
			// gsap.to('.Drivertitle', { duration: 0.5, text: 'Are you Owner or Driver' })
			// gsap.to('.Driversubtitle', {
			// 	duration: 0.5,
			// 	text: 'How the vehicle is used, such as for personal, business, or commercial purposes',
			// 	delay: 0.5
			// })
		} else {
			gsap.from('.selectDriver', { y: 80, opacity: 0, duration: 0.5 })
			// gsap.to('.Drivertitle', { duration: 0.5, text: 'Are you Owner or Driver' })
			// gsap.to('.Driversubtitle', {
			// 	duration: 0.5,
			// 	text: 'How the vehicle is used, such as for personal, business, or commercial purposes'
			// })
		}
	}, [])

	useEffect(() => {
		dispatch(updateDriverorOwner('Owner'))
	}, [])

	return (
		<div className='flex w-full flex-col items-center justify-between gap-6'>
			<div className='flex w-full flex-col items-center justify-between gap-4 lg:flex-row lg:gap-0'>
				<div className='flex flex-col gap-2'>
					<h1 className='Drivertitle font-jakarta text-xl font-bold text-blue-300'>
						Are you Owner or Driver
					</h1>
					<span className='Driversubtitle font-roboto text-sm font-medium text-gray-500'>
						How the vehicle is used, such as for personal, business, or commercial
						purposes
					</span>
				</div>
				<div className='selectDriver flex flex-row gap-5'>
					<div
						className={cn(
							'cursor-pointer rounded-3xl border border-gray-700 bg-white px-7 py-2 font-inter font-semibold text-gray-700',
							{ 'border-none bg-blue-300 text-white': isDriver === 1 }
						)}
						onClick={() => {
							setIsDriver(1)
							dispatch(updateDriverorOwner('Driver'))
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
							dispatch(updateDriverorOwner('Owner'))
						}}>
						Owner
					</div>
				</div>
			</div>
			<div className='selectDriver flex w-full flex-col gap-10 lg:flex-row'>
				<div className='flex-grow'>
					<Label htmlFor='idnumber'>Driver ID(Driving License)</Label>
					<Input
						id='idnumber'
						placeholder='Enter the ID Number of the Driver'
						value={driverID}
						onChange={(e) => {
							setDriverID(e.target.value)
							dispatch(updateDriverID(e.target.value))
						}}
					/>
				</div>
				<div className='flex-grow pb-6 lg:pb-0'>
					<Label htmlFor='dob'>Driver DOB</Label>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								id='start'
								variant='outline'
								className={cn(
									'w-full pl-3 text-left font-normal text-black',
									!driverDOB && 'text-muted-foreground'
								)}>
								{driverDOB ? (
									<span>{formatDateDDMMYYYY(driverDOB)}</span>
								) : (
									<span>Pick a date</span>
								)}
								<CalendarDays className='ml-auto h-4 w-4 opacity-50' />
							</Button>
						</PopoverTrigger>
						<PopoverContent
							align='start'
							className='w-auto p-0'>
							<>
								<Calendar
									initialFocus
									captionLayout='dropdown-buttons'
									className='p-0'
									fromYear={1900}
									id='DOB'
									mode='single'
									selected={driverDOB}
									toMonth={years18}
									toYear={years18.getFullYear()}
									classNames={{
										day_hidden: 'invisible',
										dropdown:
											'px-2 py-1.5 rounded-md bg-popover text-popover-foreground text-sm  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
										caption_dropdowns: 'flex gap-3',
										vhidden: 'hidden',
										caption_label: 'hidden'
									}}
									disabled={(date) =>
										date > years18 || date < new Date('1900-01-01')
									}
									onSelect={(e) => {
										if (e) {
											setDriverDOB(e)
											dispatch(updateDriverDOB(formatDateDDMMYYYY(e)))
										}
									}}
								/>
							</>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</div>
	)
}
