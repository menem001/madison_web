'use client'

import { z } from 'zod'
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { FormFieldLayout } from './form-field-layout'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updatePremium, updateVehicleDetails } from '@/redux/slices'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import {
	useGetBankListMutation,
	useGetColorListMutation,
	useSaveMotorDetailsMutation
} from '@/redux/api/commonApi'
import { useEffect, useState } from 'react'
import { Skeleton } from '../ui/skeleton'
import { Label } from '../ui/label'
import { type SaveMotorDetailRequest } from '@/services/models/common.models'
import { updateDetails } from '@/redux/slices/motor-detail.slice'
import { useToast } from '../ui/use-toast'
import { cn } from '@/lib'
import {
	useGetRegistrationDetailsMutation,
	useGetRegistrationTokenQuery,
	useGetVehicleListQuery
} from '@/redux/api/registrationApi'
import { skipToken } from '@reduxjs/toolkit/query'
import { Search } from 'lucide-react'

type motorDetailsFieldProps = {
	current: number
	pos: number
	goNext: () => void
	goSpecific: (num: number) => void
}

const formSchema = z.object({
	regNo: z.string().min(1, {
		message: 'Registration Number is Required'
	}),
	chassisNo: z.string().min(2, {
		message: 'Please enter Chassis number'
	}),
	engineNo: z.string().min(2, {
		message: 'Please enter Engine Number'
	}),
	engineCapacity: z.string(),
	color: z.string().optional(),
	seats: z.string().min(1, { message: 'Required' })
})

export function MotorDetailsField(props: motorDetailsFieldProps) {
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const insuranceID = useAppSelector((state) => state.apps.insuranceID)
	const branchCode = useAppSelector((state) => state.apps.branchCode)
	const whitebookData = useAppSelector((state) => state.whitebookdetails)
	const appData = useAppSelector((state) => state.apps)

	const [isLeased, setIsLeased] = useState<boolean>(vehicleData.leased)
	const [bankName, setBankName] = useState<string>(vehicleData.bankName)
	const [borrowerType, setBorrowerType] = useState<string>('')
	const [firstLossPayeeName, setFirstLossPayeeName] = useState<string>('')
	const customerData = useAppSelector((state) => state.customerDetails)

	const { data: TokenData } = useGetRegistrationTokenQuery()

	const [token, setToken] = useState<string>('')

	const [colors, setColors] = useState<{ value: string; label: string }[]>([])

	const [getRegistrationDetails] = useGetRegistrationDetailsMutation()

	const [bankList, setBankList] = useState<{ value: string; label: string }[]>([])

	const [req, setReq] = useState<{ RegNo: string }>({
		RegNo: ''
	})

	const [shouldFetch, setShouldFetch] = useState(false)

	const { data: vehicleDetails } = useGetVehicleListQuery(shouldFetch ? req : skipToken)

	const dispatch = useAppDispatch()

	const { toast } = useToast()
	const [getBankList] = useGetBankListMutation()

	const [saveMotor] = useSaveMotorDetailsMutation()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			regNo:
				vehicleData.registrationNumber !== ''
					? vehicleData.registrationNumber
					: whitebookData.RegistrationMark,
			chassisNo:
				vehicleData.chassisNumber !== ''
					? vehicleData.chassisNumber
					: whitebookData.VINChassisNumber,
			engineNo:
				vehicleData.engineNumber !== ''
					? vehicleData.engineNumber
					: whitebookData.EngineNumber,
			engineCapacity:
				vehicleData.engineCapacity !== ''
					? vehicleData.engineCapacity
					: whitebookData.EngineCapacity,
			color: vehicleData.color !== '' ? vehicleData.color : whitebookData.Colour,
			seats: vehicleData.seat + ''
		}
	})

	useEffect(() => {
		setReq({
			RegNo: form.getValues('regNo')
		})
	}, [form])

	useEffect(() => {
		if (
			TokenData?.type === 'success' &&
			TokenData.data &&
			TokenData.data?.Result.length !== 0
		) {
			const tokenid = TokenData.data?.Result[0].token
			setToken(tokenid)
		}
	}, [TokenData])

	useEffect(() => {
		if (
			vehicleDetails?.type === 'success' &&
			vehicleDetails.data &&
			vehicleDetails.data.Result.length !== 0
		) {
			const result = vehicleDetails.data.Result[0]
			form.setValue('chassisNo', result.ChassisNo)
			form.setValue('engineNo', result.EngineNo)
			form.setValue('color', result.Color)
			setShouldFetch(false)
		}
	}, [vehicleDetails])

	function getDataInserted() {
		if (token !== '' && form.getValues('regNo').length === 9) {
			const request = {
				RegNo: form.getValues('regNo'),
				RequestToken: token
			}
			const res = getRegistrationDetails(request)
			res.then((value) => {
				if (
					value.data?.type === 'success' &&
					value.data?.data !== undefined &&
					value.data.data.Result === 'Inserted Successfully......'
				) {
					setShouldFetch(true)
				}
			})
		}
	}

	const [colorList] = useGetColorListMutation()

	function onSubmit(values: z.infer<typeof formSchema>) {
		if (isLeased) {
			doSaveMotorDetails()
		}

		dispatch(
			updateVehicleDetails({
				registrationNumber: values.regNo,
				chassisNumber: values.chassisNo,
				engineNumber: values.engineNo,
				engineCapacity: values.engineCapacity,
				color: values.color ? values.color : '',
				seat: values.seats,
				bankName: bankName,
				leased: isLeased
			})
		)
		props.goNext()
	}

	useEffect(() => {
		const request = { InsuranceId: insuranceID, BranchCode: branchCode }
		const tempArr: { value: string; label: string }[] = []
		const res = colorList(request)
		res.then((value) => {
			if (value.data?.type === 'success' && value.data?.data !== undefined) {
				value.data.data!.Result.map((value) => {
					tempArr.push({
						value: value.Code,
						label: value.CodeDesc
					})
				})
				setColors(tempArr)
			}
		})
	}, [])

	function updateColorByName(color: string) {
		const pos = colors.findIndex((item) => {
			return item.label.toLowerCase() === color.toLowerCase()
		})

		if (pos !== -1) {
			form.setValue('color', colors[pos].value)
		}
	}

	useEffect(() => {
		if (colors.length !== 0) {
			updateColorByName(whitebookData.Colour)
		}
	}, [colors, whitebookData.Colour])

	function doSaveMotorDetails() {
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
			Status: 'Y',
			CollateralYn: isLeased ? 'Y' : 'N',
			BorrowerType: borrowerType === 'Individual' ? '1' : '2',
			CollateralName: bankName,
			FirstLossPayee: firstLossPayeeName
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
		const req = { InsuranceId: insuranceID, BranchCode: branchCode }
		const res = getBankList(req)
		const tempArr: { value: string; label: string }[] = []
		res.then((value) => {
			if (
				value.data?.type === 'success' &&
				value.data.data &&
				value.data.data.Result.length !== 0
			) {
				value.data.data.Result.map((value) => {
					tempArr.push({
						value: value.Code,
						label: value.CodeDesc
					})
				})
				setBankList(tempArr)
			}
		})
	}, [])

	return (
		<FormFieldLayout
			current={props.current}
			done={props.current > 1}
			goSpecific={props.goSpecific}
			pos={props.pos}
			show={props.current === 1}
			subTitle='Additional information around Step 1'
			title='Step 1 - Motor Details'>
			<>
				<Form {...form}>
					<form
						className='space-y-8'
						onSubmit={form.handleSubmit(onSubmit)}>
						<div className='flex w-full flex-row gap-2 md:gap-8'>
							<div className='flex flex-grow flex-row items-end gap-2'>
								<FormField
									control={form.control}
									name='regNo'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormLabel className='line-clamp-1'>
												Registration Number
												<span className='text-red-500'>*</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border-2 border-blue-925'
													id='regNo'
													placeholder='Registration Number'
													onChange={(e) => {
														if (e.target.value.length < 20) {
															field.onChange(e)
														}
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button
									size='sm'
									type='button'
									variant='bluebtn'
									onClick={getDataInserted}>
									<Search
										height={16}
										width={16}
									/>
								</Button>
							</div>
							<div className='flex-grow'>
								<FormField
									control={form.control}
									name='chassisNo'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormLabel className='line-clamp-1'>
												Chassis number
												<span className='text-red-500'>*</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border-2 border-blue-925'
													id='chassisNo'
													placeholder='Enter Chassis number'
													onChange={(e) => {
														if (e.target.value.length < 20) {
															field.onChange(e)
														}
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<div className='flex w-full flex-row gap-2 md:gap-8'>
							<div className='flex-grow'>
								<FormField
									control={form.control}
									name='engineNo'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormLabel>
												Engine Number<span className='text-red-500'>*</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border-2 border-blue-925'
													id='engineNo'
													placeholder='Enter Engine Number'
													onChange={(e) => {
														if (e.target.value.length < 20) {
															field.onChange(e)
														}
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='flex-grow'>
								<FormField
									control={form.control}
									name='engineCapacity'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormLabel>Engine Capacity</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border-2 border-blue-925'
													id='engineCapacity'
													placeholder='Enter Engine Capacity'
													type='number'
													onChange={(e) => {
														if (e.target.value.length < 6) {
															field.onChange(e)
														}
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<div className='flex w-full flex-row gap-2 md:gap-8'>
							<div className='w-1/4 flex-grow'>
								<FormField
									control={form.control}
									name='color'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormLabel>Color</FormLabel>
											<FormControl>
												{/* {colors.length === 0 ? (
													<Skeleton className='h-10 w-full' />
												) : (
													<Select
														disabled={field.disabled}
														name={field.name}
														value={field.value}
														onValueChange={field.onChange}>
														<SelectTrigger
															ref={field.ref}
															className='border-2 border-blue-925'>
															<SelectValue placeholder='Colors' />
														</SelectTrigger>
														<SelectContent>
															{colors.map((color, index) => {
																return (
																	<SelectItem
																		key={index}
																		value={color.value}>
																		{color.label}
																	</SelectItem>
																)
															})}
														</SelectContent>
													</Select>
												)} */}
												<Input
													{...field}
													className='border-2 border-blue-925'
													id='zone'
													placeholder='Color'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='flex-grow'>
								<FormField
									control={form.control}
									name='seats'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormLabel>
												Seat Capacity
												<span className='text-red-500'>*</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border-2 border-blue-925'
													id='seats'
													placeholder='Enter Seat Capacity'
													onChange={(e) => {
														if (e.target.value.length < 3) {
															field.onChange(e)
														}
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<div className='flex w-full flex-col gap-8 md:flex-row'>
							<div className='w-full flex-grow md:w-1/2'>
								<Label htmlFor='circulation'>Leased</Label>
								<div className='flex flex-row gap-2'>
									<div
										className={cn(
											'rounded-2xl border-2 bg-white px-6 py-2 font-roboto text-black',
											{
												'bg-blue-300 text-white': isLeased === true
											}
										)}
										onClick={() => {
											setIsLeased(true)
										}}>
										Yes
									</div>
									<div
										className={cn(
											'rounded-2xl border-2 bg-white px-6 py-2 font-roboto text-black',
											{
												'bg-blue-300 text-white': isLeased === false
											}
										)}
										onClick={() => {
											setIsLeased(false)
										}}>
										No
									</div>
								</div>
							</div>
							{isLeased && (
								<div className='w-full flex-grow md:w-1/2'>
									<Label htmlFor='zone'>Bank of finance</Label>
									<Select
										value={borrowerType}
										onValueChange={(string) => {
											setBorrowerType(string)
										}}>
										<SelectTrigger
											className='border-2 border-blue-925'
											value={borrowerType}>
											<SelectValue placeholder='Bank/Individual' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem
												key='1'
												value='Individual'>
												Individual
											</SelectItem>
											<SelectItem
												key='2'
												value='Bank'>
												Bank
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							)}
						</div>
						{isLeased && borrowerType === 'Individual' && (
							<div className='flex w-full flex-row gap-2 md:gap-8'>
								<div className='w-full flex-grow md:w-1/2'>
									<Label
										className='line-clamp-1'
										htmlFor='zone'>
										Collateral Name
									</Label>
									<Input
										className='border-2 border-blue-925'
										id='zone'
										placeholder='Collateral Name'
										value={bankName}
										onChange={(e) => {
											setBankName(e.target.value)
										}}
									/>
								</div>
								<div className='w-full flex-grow md:w-1/2'>
									<Label
										className='line-clamp-1'
										htmlFor='zone'>
										First Loss Payee Name
									</Label>
									<Input
										className='border-2 border-blue-925'
										id='zone'
										placeholder='First Loss Payee Name'
										value={firstLossPayeeName}
										onChange={(e) => {
											setFirstLossPayeeName(e.target.value)
										}}
									/>
								</div>
							</div>
						)}
						{isLeased && borrowerType === 'Bank' && (
							<div className='flex w-full flex-row gap-2 md:gap-8'>
								<div className='w-1/2 flex-grow'>
									<Label htmlFor='zone'>Collateral Bank Name</Label>
									{bankList.length === 0 ? (
										<Skeleton className='h-10 w-full' />
									) : (
										<Select
											value={bankName}
											onValueChange={(string) => {
												setBankName(string)
											}}>
											<SelectTrigger
												className='border-2 border-blue-925'
												value={bankName}>
												<SelectValue placeholder='Bank Name' />
											</SelectTrigger>
											<SelectContent>
												{bankList.map((item, index) => {
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
								<div className='w-1/2 flex-grow'>
									<Label htmlFor='zone'>First Loss Payee Name</Label>
									<Input
										className='border-2 border-blue-925'
										id='zone'
										placeholder='First Loss Payee Name'
										value={firstLossPayeeName}
										onChange={(e) => {
											setFirstLossPayeeName(e.target.value)
										}}
									/>
								</div>
							</div>
						)}
						<Button
							className='w-32'
							variant='bluebtn'>
							Continue
						</Button>
					</form>
				</Form>
			</>
		</FormFieldLayout>
	)
}
