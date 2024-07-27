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
import { cn, formatDateDDMMYYYY, removeParenthesis } from '@/lib'
import { Calendar } from '../ui/calendar'
import { CalendarDays } from 'lucide-react'
import { Label } from '../ui/label'
import {
	useGetCurrencyListMutation,
	useGetInsuranceClassMutation,
	useGetPolicyEndDateQuery
} from '@/redux/api/commonApi'
import Image from 'next/image'
import { assets } from '@/assets'
import { Skeleton } from '../ui/skeleton'
// import { useGetPolicyEndDateQuery } from '@/redux/api/commonApi'

type CurrencyRateList = { value: string; label: string; rate: string }

export function SelectInsuranceClass() {
	const dispatch = useAppDispatch()

	const vehicleData = useAppSelector((state) => state.carInsurance)
	const appsData = useAppSelector((state) => state.apps)

	const [iclass, setIclass] = useState<number>(0)
	const [iclassName, setIclassName] = useState<string>('')

	const date = new Date(Date.now())
	const parts = vehicleData.policyStartDate.split('/')
	const dateObject = new Date(+parts[2], +parts[1] - 1, +parts[0])
	const timestamp = dateObject.getTime()

	const [startDate, setStartDate] = useState<Date>(
		vehicleData.policyStartDate ? new Date(timestamp) : date
	)

	const { data: EndDateReply, refetch } = useGetPolicyEndDateQuery(formatDateDDMMYYYY(startDate))
	const [getCurrencies] = useGetCurrencyListMutation()
	const [SelectInsuranceClass] = useGetInsuranceClassMutation()

	const [endDateLists, setEndDateLists] = useState<{ value: string; label: string }[]>([])
	const [currencyList, setCurrenctList] = useState<CurrencyRateList[]>([])
	const [classTypeList, setClassTypeList] = useState<{ value: string; label: string }[]>([])

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
		dispatch(updateClass({ class: iclassName, id: iclass + '' }))
	}, [dispatch, iclass, iclassName])

	useEffect(() => {
		setIclass(+vehicleData.classID)
		setIclassName(vehicleData.insuranceClass)
	}, [])

	useEffect(() => {
		refetch()
	}, [refetch, startDate])

	useEffect(() => {
		const tempArr: { value: string; label: string }[] = []

		if (EndDateReply && EndDateReply.type === 'success' && EndDateReply.data !== undefined) {
			EndDateReply.data!.Result.map((value) => {
				tempArr.push({
					value: removeParenthesis(value.Code),
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

	useEffect(() => {
		const request = {
			InsuranceId: appsData.insuranceID,
			ProductId: appsData.productId,
			BranchCode: appsData.branchCode,
			LoginId: appsData.loginId
		}
		const tempArr: { value: string; label: string }[] = []
		const res = SelectInsuranceClass(request)
		res.then((value) => {
			if (value.data?.type === 'success' && value.data?.data !== undefined) {
				value.data.data!.Result.map((value, index) => {
					tempArr.push({
						value: value.Code,
						label: value.CodeDesc
					})

					if (index === 0) {
						setIclass(+value.Code)
						setIclassName(value.CodeDesc)
					}
				})
				setClassTypeList(tempArr)
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
						{endDateLists.length === 0 ? (
							<Skeleton className='h-10' />
						) : (
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
						)}
					</div>
				</div>
			</div>
			<div className='selectInsClass flex w-full flex-grow flex-col'>
				<Label htmlFor='currency'>Select Currency</Label>
				{currencyList.length === 0 ? (
					<Skeleton className='h-10 w-3/4' />
				) : (
					<Select
						value={vehicleData.currency + '~' + vehicleData.exchangeRate}
						onValueChange={(e) => {
							const values = e.split('~')
							dispatch(updateCurrency({ currency: values[0], rate: values[1] }))
						}}>
						<SelectTrigger
							className='w-3/4'
							id='currency'
							value={vehicleData.currency + '~' + vehicleData.exchangeRate}>
							<SelectValue placeholder='Select Currency' />
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
				)}
			</div>
			{classTypeList && (
				<>
					<div className='flex flex-col gap-2'>
						<h1 className='InsClasstitle font-jakarta text-xl font-bold text-blue-300'></h1>
						<span className='InsClasssubtitle font-roboto text-sm font-medium text-gray-500'></span>
					</div>
					<div className='selectInsClass flex flex-row gap-10'>
						{classTypeList.map((insClass) => {
							return (
								<div
									key={insClass.value}
									className={cn(
										'cursor-pointer rounded-lg border border-gray-700 bg-white px-7 py-2 font-inter font-semibold text-gray-700',
										{
											'border-none bg-blue-300 text-white':
												iclass === +insClass.value
										}
									)}
									onClick={() => {
										setIclass(+insClass.value)
										setIclassName(insClass.label)
									}}>
									{insClass.label}
								</div>
							)
						})}
					</div>
				</>
			)}
		</div>
	)
}
