import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
	updateClass,
	updateCurrency,
	updatePolicyEndDate,
	updatePolicyStartDate
} from '@/redux/slices'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useState } from 'react'
import {
	Button,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '../ui'
import 'react-datepicker/dist/react-datepicker.css'
import { cn, formatDateDDMMYYYY } from '@/lib'
import { Calendar } from '../ui/calendar'
import { CalendarDays } from 'lucide-react'
import { Label } from '../ui/label'
import { useGetCurrencyListMutation, useGetPolicyEndDateQuery } from '@/redux/api/commonApi'
import Image from 'next/image'
import { assets } from '@/assets'
// import { useGetPolicyEndDateQuery } from '@/redux/api/commonApi'

type CurrencyRateList = { value: string; label: string; rate: string }

export function SelectInsuranceClass() {
	const dispatch = useAppDispatch()

	const vehicleData = useAppSelector((state) => state.carInsurance)
	const appsData = useAppSelector((state) => state.apps)

	const [iclass, setIclass] = useState<number>(0)

	const date = new Date(Date.now())
	const parts = vehicleData.policyStartDate.split('/')
	const dateObject = new Date(+parts[2], +parts[1] - 1, +parts[0])
	const timestamp = dateObject.getTime()

	const [startDate, setStartDate] = useState<Date>(
		vehicleData.policyStartDate ? new Date(timestamp) : date
	)

	const { data: EndDateReply, refetch } = useGetPolicyEndDateQuery(formatDateDDMMYYYY(startDate))
	const [getCurrencies] = useGetCurrencyListMutation()

	const [endDateLists, setEndDateLists] = useState<{ value: string; label: string }[]>([])
	const [currencyList, setCurrenctList] = useState<CurrencyRateList[]>([])

	useGSAP(() => {
		gsap.from('.selectInsClass', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
		gsap.to('.InsClasstitle', { duration: 0.5, text: 'Insurance Class' })
		gsap.to('.InsClasssubtitle', {
			duration: 0.5,
			text: 'Fill out the vehicle details section completely.',
			delay: 0.5
		})
		gsap.to('.Policytitle', { duration: 0.5, text: 'Policy Details' })
		gsap.to('.Policysubtitle', {
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

	useEffect(() => {
		refetch()
	}, [refetch, startDate])

	useEffect(() => {
		const tempArr: { value: string; label: string }[] = []

		if (EndDateReply && EndDateReply.type === 'success' && EndDateReply.data !== undefined) {
			EndDateReply.data!.Result.map((value) => {
				tempArr.push({
					value: value.Code,
					label: value.CodeDesc
				})
			})
			setEndDateLists(tempArr)
		}
	}, [EndDateReply])

	useEffect(() => {
		const request = {
			InsuranceId: appsData.insuranceID,
			BranchCode: appsData.branchCode,
			ProductId: appsData.productId
		}
		const tempArr: { value: string; label: string; rate: string }[] = []
		const res = getCurrencies(request)
		res.then((value) => {
			if (value.data?.type === 'success' && value.data?.data !== undefined) {
				value.data.data!.Result.map((value) => {
					tempArr.push({
						value: value.Code,
						label: value.CodeDesc,
						rate: value.ExchangeRate
					})
				})
				setCurrenctList(tempArr)
			}
		})
	}, [])

	const year = new Date().getFullYear()

	return (
		<div className='flex flex-col gap-7'>
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
					<h1 className='Policytitle font-jakarta text-xl font-bold text-blue-300'></h1>
					<span className='Policysubtitle font-roboto text-sm font-medium text-gray-500'></span>
				</div>
			</div>
			<div className='mt-4'>
				<div className='selectInsClass flex flex-col gap-10 md:w-full md:flex-row'>
					<div className='flex w-full flex-grow flex-col'>
						<Label htmlFor='start'>Policy Start Date</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									id='start'
									variant='outline'
									className={cn(
										'w-full pl-3 text-left font-normal text-muted-foreground',
										!startDate && 'text-muted-foreground'
									)}>
									{vehicleData.policyStartDate ? (
										<span>{vehicleData.policyStartDate}</span>
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
										disabled={(date) => date < new Date()}
										fromYear={year}
										id='DOB'
										mode='single'
										selected={startDate}
										toYear={year + 20}
										classNames={{
											day_hidden: 'invisible',
											dropdown:
												'px-2 py-1.5 rounded-md bg-popover text-popover-foreground text-sm  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
											caption_dropdowns: 'flex gap-3',
											vhidden: 'hidden',
											caption_label: 'hidden'
										}}
										onSelect={(e) => {
											if (e) {
												setStartDate(e)
												dispatch(
													updatePolicyStartDate(formatDateDDMMYYYY(e))
												)
											}
										}}
									/>
								</>
							</PopoverContent>
						</Popover>
					</div>

					<div className='flex w-full flex-grow flex-col'>
						<Label htmlFor='end'>Policy End Date</Label>
						<Select
							value={vehicleData.policyEndDate}
							onValueChange={(e) => {
								dispatch(updatePolicyEndDate(e))
							}}>
							<SelectTrigger
								id='end'
								value={vehicleData.policyEndDate}>
								<SelectValue placeholder='Select Policy End Date' />
							</SelectTrigger>
							<SelectContent>
								{endDateLists.map((item, index) => {
									return (
										<SelectItem
											key={index}
											value={item.value}>
											{item.label}
										</SelectItem>
									)
								})}
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>
			<div className='mt-4'>
				<p>Select Currency</p>
				<Select
					value={vehicleData.currency + '~' + vehicleData.exchangeRate}
					onValueChange={(e) => {
						const values = e.split('~')
						dispatch(updateCurrency({ currency: values[0], rate: values[1] }))
					}}>
					<SelectTrigger
						className='mt-2 w-3/4'
						title='Select Currency'
						value={vehicleData.currency + '~' + vehicleData.exchangeRate}>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{currencyList.map((item, index) => {
							return (
								<SelectItem
									key={index}
									value={item.value + '~' + item.rate}>
									{item.label + ' - (Exchange Rate: ' + item.rate + ' ZWM)'}
								</SelectItem>
							)
						})}
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
