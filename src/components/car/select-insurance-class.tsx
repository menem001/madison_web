import DatePicker from 'react-datepicker'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateClass } from '@/redux/slices'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { CalendarDays } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Input, Select, SelectContent, SelectTrigger, SelectValue } from '../ui'
import 'react-datepicker/dist/react-datepicker.css'
import { cn } from '@/lib'

export function SelectInsuranceClass() {
	const dispatch = useAppDispatch()

	const vehicleData = useAppSelector((state) => state.carInsurance)

	const [iclass, setIclass] = useState<number>(0)

	const [startDate, setStartDate] = useState<Date>()

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
		} else if (iclass === 3) {
			dispatch(updateClass('TPO'))
		}
	}, [dispatch, iclass])

	useEffect(() => {
		if (vehicleData.insuranceClass === 'Comprehensive') {
			setIclass(1)
		} else if (vehicleData.insuranceClass === 'TPFT') {
			setIclass(2)
		} else if (vehicleData.insuranceClass === 'TPO') {
			setIclass(3)
		}
	}, [vehicleData])

	return (
		<div className='flex flex-col gap-7'>
			<div className='flex flex-col gap-2'>
				<h1 className='InsClasstitle font-jakarta text-xl font-bold text-blue-300'></h1>
				<span className='InsClasssubtitle font-roboto text-sm font-medium text-gray-500'></span>
			</div>
			<div className='mt-4'>
				<div className='selectInsClass flex flex-col gap-10 md:w-full md:flex-row'>
					<div>
						<p>Policy Start Date</p>
						<div className='relative inline-block'>
							<DatePicker
								className='border-bg-secondary mt-2 h-16 rounded-md border-2'
								dateFormat='yyyy/MM/dd'
								placeholderText='Select a date'
								selected={startDate}
								onChange={(date) => {
									if (date !== null) {
										setStartDate(date)
									}
								}}
							/>
							<CalendarDays className='absolute bottom-4 right-2 top-1/2 translate-y-1/2' />
						</div>
						{/* <Input className='mt-2 p-2 border-2 border-bg-secondary rounded-md' placeholder='Select Policy Start Date'/> */}
					</div>

					<div>
						<p>Policy End Date</p>
						<Input
							className='border-bg-secondary mt-2 rounded-md border-2 p-2'
							placeholder='Policy End Date'
						/>
					</div>
				</div>
			</div>
			<div className='mt-4'>
				<p>Select Currency</p>
				<Select
					value={vehicleData.mark}
					// onValueChange={updateMark}
				>
					<SelectTrigger
						className='mt-2 w-3/4'
						title='Select Currency'
						// value={vehicleData.mark}
					>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{/* {motorListArr.map((item, index) => {
							return (
								<SelectItem
									key={index}
									value={item.value}>
									{item.label}
								</SelectItem>
							)
						})} */}
					</SelectContent>
				</Select>
			</div>
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
