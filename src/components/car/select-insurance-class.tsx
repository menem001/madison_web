import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
	updateClass,
	updateCurrency,
	updatePolicyDaysCount,
	updatePolicyEndDate,
	updatePolicyStartDate,
	updatePremium
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
import { cn, formatDateDDMMYYYY, getDataWithinParenthesis, removeParenthesis } from '@/lib'
import { Calendar } from '../ui/calendar'
import { CalendarDays } from 'lucide-react'
import { Label } from '../ui/label'
import {
	useGetCurrencyListMutation,
	useGetInsuranceClassMutation,
	useGetPolicyEndDateQuery,
	useSaveMotorDetailsMutation
} from '@/redux/api/commonApi'
// import Image from 'next/image'
// import { assets } from '@/assets'
import { Skeleton } from '../ui/skeleton'
import { type SaveMotorDetailRequest } from '@/services/models/common.models'
import { useToast } from '../ui/use-toast'
import { updateDetails } from '@/redux/slices/motor-detail.slice'
import ClipLoader from 'react-spinners/ClipLoader'

type CurrencyRateList = { value: string; label: string; rate: string }

export function SelectInsuranceClass() {
	const dispatch = useAppDispatch()

	const vehicleData = useAppSelector((state) => state.carInsurance)
	const customerData = useAppSelector((state) => state.customerDetails)
	const appData = useAppSelector((state) => state.apps)

	const [saveMotor] = useSaveMotorDetailsMutation()

	const { toast } = useToast()

	const [isLoading, setIsLoading] = useState<boolean>(false)

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

	const [endDateLists, setEndDateLists] = useState<
		{ value: string; label: string; daysApart: string }[]
	>([])
	const [currencyList, setCurrenctList] = useState<CurrencyRateList[]>([])
	const [classTypeList, setClassTypeList] = useState<{ value: string; label: string }[]>([])

	const [isCustomerFilled, setIsCustomerFilled] = useState<boolean>(false)

	useGSAP(() => {
		gsap.from('.selectInsClass', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
		// gsap.to('.InsClasstitle', { duration: 0.5, text: 'Insurance Class' })
		// gsap.to('.InsClasssubtitle', {
		// 	duration: 0.5,
		// 	text: 'Fill out the vehicle details section completely.',
		// 	delay: 0.5
		// })
		// gsap.to('.Policytitle', { duration: 0.5, text: 'Policy Details' })
		// gsap.to('.Policysubtitle', {
		// 	duration: 0.5,
		// 	text: 'Fill out the vehicle details section completely.',
		// 	delay: 0.5
		// })
	})

	useEffect(() => {
		dispatch(updateClass({ class: iclassName, id: iclass + '' }))
	}, [dispatch, iclass, iclassName])

	useEffect(() => {
		setIclass(vehicleData.classID === '' ? 0 : +vehicleData.classID)
		setIclassName(vehicleData.insuranceClass)

		if (!vehicleData.policyStartDate) {
			dispatch(updatePolicyStartDate(formatDateDDMMYYYY(date)))
		}
	}, [])

	useEffect(() => {
		refetch()
	}, [refetch, startDate])

	useEffect(() => {
		const tempArr: { value: string; label: string; daysApart: string }[] = []

		if (EndDateReply && EndDateReply.type === 'success' && EndDateReply.data !== undefined) {
			EndDateReply.data!.Result.map((value) => {
				tempArr.push({
					value: removeParenthesis(value.Code),
					label: value.CodeDesc,
					daysApart: getDataWithinParenthesis(value.Code)
				})
			})
			setEndDateLists(tempArr)
		}
	}, [EndDateReply])

	useEffect(() => {
		const request = {
			InsuranceId: appData.insuranceID,
			BranchCode: appData.branchCode,
			ProductId: appData.productId
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
			InsuranceId: appData.insuranceID,
			ProductId: appData.productId,
			BranchCode: appData.branchCode,
			LoginId: appData.loginId
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

					if (index === 0 && vehicleData.classID === '') {
						setIclass(+value.Code)
						setIclassName(value.CodeDesc)
					}
				})
				setClassTypeList(tempArr)
			}
		})
	}, [])

	const year = new Date().getFullYear()

	function updateEndDateWithDaysCount(e: string) {
		dispatch(updatePolicyEndDate(e))
		const pos = endDateLists.findIndex((item) => {
			return item.value === e
		})

		if (pos !== -1) {
			dispatch(updatePolicyDaysCount(endDateLists[pos].daysApart))
		}
	}

	function doSaveMotorDetails() {
		setIsLoading(true)
		const req: SaveMotorDetailRequest = {
			CustomerName: customerData.name,
			LoginId: appData.loginId,
			SubUserType: appData.subUserType,
			UserType: appData.userType,
			ApplicationId: '1', //
			CustomerReferenceNo: null,
			RequestReferenceNo: null,
			VehicleId: '1',
			CreatedBy: appData.loginId,
			InsuranceId: appData.insuranceID,
			BranchCode: appData.branchCode,
			BrokerBranchCode: appData.brokerCode,
			SectionId: vehicleData.classID,
			AgencyCode: appData.agencyCode,
			ProductId: appData.productId,
			SavedFrom: 'SQ',
			MobileCode: customerData.code,
			MobileNumber: customerData.mobile,
			Chassisnumber: '',
			Insurancetype: [appData.insuranceID],
			InsuranceClass: vehicleData.classID,
			Motorusage: vehicleData.vehicleUsage,
			MotorusageId: vehicleData.vehicleUsageID,
			Vehiclemake: vehicleData.mark,
			VehiclemakeId: vehicleData.makeID,
			VehicleModel: vehicleData.model,
			VehcilemodelId: vehicleData.modelID,
			VehicleValueType: null,
			DefenceValue: null,
			PurchaseDate: null,
			Deductibles: null,
			Inflation: null,
			ManufactureYear: vehicleData.year + '',
			Gpstrackinginstalled: 'N',
			NcdYn: 'N',
			VehicleType: vehicleData.bodyType,
			VehicleTypeId: vehicleData.bodyTypeID,
			CarAlarmYn: 'N',
			PolicyStartDate: vehicleData.policyStartDate,
			PolicyEndDate: vehicleData.policyEndDate,
			CustomerCode: appData.CustomerCode,
			BdmCode: appData.CustomerCode,
			SourceTypeId: appData.userType,
			SumInsured: vehicleData.value,
			AcccessoriesSumInsured: vehicleData.AcccessoriesSumInsured,
			ExchangeRate: vehicleData.exchangeRate,
			Currency: vehicleData.currency,
			HavePromoCode: 'N',
			SearchFromApi: false,
			SeatingCapacity: vehicleData.seat,
			CustomerStatus: 'Y',
			Status: 'Y'
		}
		const res = saveMotor(req)
		res.then((value) => {
			if (
				value.data?.type === 'success' &&
				value.data.data !== undefined &&
				value.data.data.IsError !== true &&
				value.data.data.Result !== null
			) {
				dispatch(updatePremium(true))
				dispatch(updateDetails(value.data.data.Result[0]))
				// props.scrollToTop()
				setIsLoading(false)
			} else if (
				value.data?.type === 'success' &&
				value.data.data !== undefined &&
				value.data.data.IsError === true &&
				value.data.data.ErrorMessage !== null &&
				value.data.data.ErrorMessage.length !== 0
			) {
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: value.data.data.ErrorMessage[0].Message
				})
			} else {
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: 'There was a problem with your request.'
				})
			}
		})
	}

	useEffect(() => {
		const isFilled =
			vehicleData.policyStartDate !== '' &&
			vehicleData.policyEndDate !== '' &&
			vehicleData.currency !== ''

		setIsCustomerFilled(isFilled)
	}, [vehicleData.policyStartDate, vehicleData.policyEndDate, vehicleData.currency])

	return (
		<div className='flex flex-col gap-7'>
			<div className='flex flex-row items-center gap-4'>
				{/* <div className='min-h-12 min-w-12 overflow-hidden rounded-full'>
					<Image
						alt='face'
						height={60}
						src={assets.images.imageFace}
						width={60}
					/>
				</div> */}
				<div className='flex flex-col gap-2'>
					<h1 className='InsClasstitle font-jakarta text-xl font-bold text-blue-300'>
						Insurance Class
					</h1>
					<span className='InsClasssubtitle font-roboto text-sm font-medium text-gray-500'>
						Fill out the vehicle details section completely.
					</span>
				</div>
			</div>
			{classTypeList.length === 0 ? (
				<div className='flex w-full flex-row gap-4'>
					<Skeleton className='h-10 w-full' />
					<Skeleton className='h-10 w-full' />
					<Skeleton className='h-10 w-full' />
				</div>
			) : (
				<div className='selectInsClass flex flex-col gap-10 lg:flex-row'>
					{classTypeList.map((insClass) => {
						return (
							<div
								key={insClass.value}
								className={cn(
									'cursor-pointer rounded-lg border border-gray-700 bg-white px-7 py-2 text-center font-inter font-semibold text-gray-700',
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
			)}

			{classTypeList && (
				<>
					<div className='flex flex-col gap-2'>
						<h1 className='Policytitle font-jakarta text-xl font-bold text-blue-300'>
							Policy Details
						</h1>
						<span className='Policysubtitle font-roboto text-sm font-medium text-gray-500'>
							Fill out the vehicle details section completely.
						</span>
					</div>
					<div className=''>
						<div className='selectInsClass flex flex-col gap-10 md:w-full md:flex-row'>
							<div className='flex w-full flex-grow flex-col'>
								<Label htmlFor='start'>Policy Start Date</Label>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											id='start'
											variant='outline'
											className={cn(
												'border-gray-360 w-full border pl-3 text-left font-normal text-black shadow-inputShadowDrop',
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
															updatePolicyStartDate(
																formatDateDDMMYYYY(e)
															)
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
									<Skeleton className='h-10 w-full' />
								) : (
									<Select
										value={vehicleData.policyEndDate}
										onValueChange={updateEndDateWithDaysCount}>
										<SelectTrigger
											className='border-gray-360 border shadow-inputShadowDrop'
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
							<Skeleton className='h-10 w-full lg:w-3/4' />
						) : (
							<Select
								value={vehicleData.currency + '~' + vehicleData.exchangeRate}
								onValueChange={(e) => {
									const values = e.split('~')
									dispatch(
										updateCurrency({ currency: values[0], rate: values[1] })
									)
								}}>
								<SelectTrigger
									className='border-gray-360 w-full border shadow-inputShadowDrop lg:w-3/4'
									id='currency'
									title='Select Currency'
									value={vehicleData.currency + '~' + vehicleData.exchangeRate}>
									<SelectValue placeholder='Select Currency' />
								</SelectTrigger>
								<SelectContent>
									{currencyList.map((item, index) => {
										return (
											<SelectItem
												key={index}
												value={item.value + '~' + item.rate}>
												{item.label +
													' - (Exchange Rate: ' +
													item.rate +
													' ZWM)'}
											</SelectItem>
										)
									})}
								</SelectContent>
							</Select>
						)}
					</div>
				</>
			)}
			{isCustomerFilled && (
				<Button
					className='selectCustomerInfo w-full'
					variant='bluebtn'
					onClick={doSaveMotorDetails}>
					{isLoading ? (
						<ClipLoader
							color='#FFFFFF'
							size={20}
						/>
					) : (
						<span>Save</span>
					)}
				</Button>
			)}
		</div>
	)
}
