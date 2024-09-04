'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useGSAP } from '@gsap/react'
import { zodResolver } from '@hookform/resolvers/zod'
import gsap from 'gsap'
import { type ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
	Form
	// FormControl, FormField, FormItem, FormLabel, FormMessage
} from '../ui/form'
import {
	Button
	// Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '../ui'
// import { VehicleUsage } from './vehicle-usage'
// import { BodyType } from './body-type'
// import { SelectMark } from './select-mark'
// import { SelectModel } from './select-model'
import {
	type CarDetails,
	updateSeatsYear,
	updateVehicleBodyType,
	updateVehicleMark,
	updateVehicleModel,
	updateVehicleUsage
} from '@/redux/slices'
import { FormDetails } from '@/lib'
import { FormFieldJson } from '../common/form-field-json'
import {
	useGetBodyTypeListMutation,
	useGetMotorMakeListMutation,
	useGetMotorModelListMutation,
	useGetVehicleUsageListMutation
} from '@/redux/api/commonApi'

const vehicleBaseSchema = z.object({
	motorUsage: z.string().min(1, { message: 'Required' }),
	bodyType: z.string().min(1, { message: 'Required' }),
	make: z.string().min(1, { message: 'Required' }),
	model: z.string().min(1, { message: 'Required' }),
	manufactureyear: z.string().min(4, { message: 'Required' }),
	numberOfSeats: z.string().min(1, { message: 'Required' }),
	excessLimit: z.string()
})

export function VehcileBaseInfo() {
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const whiteBookData = useAppSelector((state) => state.whitebookdetails)
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
	const make = useAppSelector((state) => state.whitebookdetails.Make)
	const model = useAppSelector((state) => state.whitebookdetails.Model)

	const appsData = useAppSelector((state) => state.apps)

	const dispatch = useAppDispatch()

	const [bodyTypeList, setBodyTypeList] = useState<{ value: string; label: string }[]>([])

	const [BodyType] = useGetBodyTypeListMutation()

	const [MotorMakeList] = useGetMotorMakeListMutation()

	const [motorListArr, setmotorListArr] = useState<{ value: string; label: string }[]>([])

	const [getModel] = useGetMotorModelListMutation()

	const [modelsList, setModelsList] = useState<{ value: string; label: string }[]>([])

	const [vehicleUsage] = useGetVehicleUsageListMutation()

	const [vehicleUsageList, setVehicleUsageList] = useState<{ value: string; label: string }[]>([])

	const years: {
		value: string
		label: string
	}[] = []

	const currentYear = new Date(Date.now()).getFullYear()

	for (let i = currentYear; i > currentYear - 30; i--) {
		years.push({ value: i + '', label: i + '' })
	}

	useGSAP(() => {
		gsap.from('.selectVehicleBaseInfo', { y: 80, opacity: 0, duration: 0.5 })
	})

	const form = useForm<z.infer<typeof vehicleBaseSchema>>({
		resolver: zodResolver(vehicleBaseSchema),
		defaultValues: {
			motorUsage: vehicleData.vehicleUsageID,
			bodyType: vehicleData.bodyTypeID,
			make: vehicleData.makeID,
			model: vehicleData.modelID,
			manufactureyear:
				whiteBookData.YearOfMake !== ''
					? whiteBookData.YearOfMake
					: vehicleData.year !== 0
						? vehicleData.year + ''
						: '',
			numberOfSeats:
				whiteBookData.SeatingCapacity !== ''
					? whiteBookData.SeatingCapacity
					: vehicleData.seat !== 0
						? vehicleData.seat + ''
						: '',
			excessLimit: vehicleData.excessLimit !== 0 ? vehicleData.excessLimit + '' : ''
		}
	})

	function updateMark(makeID: string) {
		const markpos = motorListArr.findIndex((item) => {
			return item.value === makeID
		})

		if (markpos !== -1) {
			dispatch(updateVehicleMark({ mark: motorListArr[markpos].label, makeID: makeID }))
		}
	}

	function updateMarkFromName(make: string) {
		const markpos = motorListArr.findIndex((item) => {
			return item.label.toLowerCase() === make.toLowerCase()
		})

		if (markpos !== -1) {
			dispatch(
				updateVehicleMark({
					mark: motorListArr[markpos].label,
					makeID: motorListArr[markpos].value
				})
			)
			form.setValue('make', motorListArr[markpos].value)
		}
	}

	function updateModel(modelid: string) {
		const pos = modelsList.findIndex((item) => {
			return item.value === modelid
		})

		if (pos !== -1) {
			dispatch(updateVehicleModel({ model: modelsList[pos].label, modelID: modelid }))
		}
	}

	function updateModelByName(model: string) {
		const pos = modelsList.findIndex((item) => {
			return item.label.toLowerCase() === model.toLowerCase()
		})

		if (pos !== -1) {
			dispatch(
				updateVehicleModel({ model: modelsList[pos].label, modelID: modelsList[pos].value })
			)
			form.setValue('model', modelsList[pos].value)
		}
	}

	useEffect(() => {
		const tempArr: { value: string; label: string }[] = []
		const request = { InsuranceId: appsData.insuranceID, BranchCode: appsData.branchCode }
		const res = vehicleUsage(request)
		res.then((value) => {
			if (value.data?.type === 'success' && value.data.data !== undefined) {
				value.data.data.Result.map((value) => {
					tempArr.push({
						value: value.Code,
						label: value.CodeDesc
					})
				})
				setVehicleUsageList(tempArr)
			}
		})
	}, [appsData.branchCode, appsData.insuranceID, vehicleUsage, model])

	function updateUsage(id: string) {
		const pos = vehicleUsageList.findIndex((item) => {
			return item.value === id
		})

		if (pos !== -1) {
			dispatch(updateVehicleUsage({ usage: vehicleUsageList[pos].label, id: id }))
		}
	}

	useEffect(() => {
		if (vehicleData.mark === '') {
			form.setValue('make', '')
		}
	}, [vehicleData.mark])

	useEffect(() => {
		if (vehicleData.bodyTypeID !== '') {
			const request = {
				InsuranceId: appsData.insuranceID,
				BranchCode: appsData.branchCode,
				BodyId: vehicleData.bodyTypeID
			}
			const tempArr: { value: string; label: string }[] = []
			const res = MotorMakeList(request)
			res.then((value) => {
				if (value.data?.type === 'success' && value.data?.data !== undefined) {
					value.data.data!.Result.map((value) => {
						tempArr.push({
							value: value.Code,
							label: value.CodeDesc
						})
					})
					setmotorListArr(tempArr)
				}
			})
		}
	}, [vehicleData.bodyTypeID])

	useEffect(() => {
		if (motorListArr.length !== 0) {
			updateMarkFromName(make)
		}
	}, [make, motorListArr])

	useEffect(() => {
		if (bodyTypeList.length === 0) {
			const tempArr: { value: string; label: string }[] = []
			const request = { InsuranceId: appsData.insuranceID, BranchCode: appsData.branchCode }
			const res = BodyType(request)
			res.then((value) => {
				if (value.data?.type === 'success' && value.data.data !== undefined) {
					value.data.data.Result.map((value) => {
						tempArr.push({
							value: value.Code,
							label: value.CodeDesc
						})
					})
					setBodyTypeList(tempArr)
				}
			})
		}
	}, [BodyType, appsData.branchCode, appsData.insuranceID])

	useEffect(() => {
		if (vehicleData.model === '') {
			form.setValue('model', '')
		}
	}, [vehicleData.model])

	useEffect(() => {
		if (+vehicleData.bodyTypeID < 5 && vehicleData.mark !== '') {
			const request = {
				InsuranceId: appsData.insuranceID,
				BranchCode: appsData.branchCode,
				MakeId: vehicleData.makeID,
				BodyId: vehicleData.bodyTypeID
			}
			const tempArr: { value: string; label: string }[] = []
			const res = getModel(request)
			res.then((value) => {
				if (value.data?.type === 'success' && value.data?.data !== undefined) {
					value.data.data!.Result.map((value) => {
						tempArr.push({
							value: value.Code,
							label: value.CodeDesc
						})
					})
					setModelsList(tempArr)
				}
			})
		}
	}, [
		appsData.branchCode,
		appsData.insuranceID,
		getModel,
		vehicleData.makeID,
		vehicleData.bodyTypeID,
		vehicleData.mark
	])

	useEffect(() => {
		if (modelsList.length !== 0) {
			updateModelByName(model)
		}
	}, [model, modelsList])

	function updateBody(id: string) {
		const pos = bodyTypeList.findIndex((item) => {
			return item.value === id
		})

		if (pos !== -1) {
			dispatch(updateVehicleBodyType({ bodyType: bodyTypeList[pos].label, id: id }))
		}
	}

	useEffect(() => {
		const isFilled =
			vehicleData.vehicleUsageID !== '' &&
			vehicleData.bodyTypeID !== '' &&
			vehicleData.makeID !== '' &&
			vehicleData.modelID !== ''

		if (isFilled) {
			setIsSubmitted(true)
		}
	}, [])

	function onSubmit(values: z.infer<typeof vehicleBaseSchema>) {
		dispatch(
			updateSeatsYear({
				seat: values.numberOfSeats,
				year: values.manufactureyear
			})
		)
		setIsSubmitted(true)
	}

	function setSubmittedStatus() {
		if (isSubmitted) {
			setIsSubmitted(false)
		}
	}

	return (
		<section className='flex w-full flex-col gap-16 lg:w-4/5'>
			<div className='flex w-full flex-col items-center gap-4'>
				<div className='flex flex-row -space-x-7'>
					<div className='h-10 w-10 rounded-full bg-black'></div>
					<div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-475 text-lg font-medium text-white'>
						2
					</div>
				</div>
				<h1 className='text-center font-inter text-4xl font-bold text-blue-325'>
					Vehicle Information
				</h1>
				<p className='w-4/5 text-center font-roboto text-sm text-gray-500'>
					Please fill the form below to receive a quote for your project. Feel free to add
					as much detail as needed.
				</p>
			</div>
			<div className='flex flex-col gap-4'>
				<Form {...form}>
					<form
						className='grid grid-cols-2 gap-4'
						onSubmit={form.handleSubmit(onSubmit)}>
						{FormDetails.VehcileMotorDetails.map((fields) => {
							const keyName = fields.reduxName as keyof CarDetails
							let itemsList: {
								value: string
								label: string
							}[] = []

							if (keyName === 'bodyTypeID') {
								itemsList = bodyTypeList
							} else if (keyName === 'makeID') {
								itemsList = motorListArr
							} else if (keyName === 'modelID') {
								itemsList = modelsList
							} else if (keyName === 'vehicleUsageID') {
								itemsList = vehicleUsageList
							} else if (keyName === 'year') {
								itemsList = years
							}

							function changeFunction(e: ChangeEvent<HTMLInputElement> | string) {
								if (keyName === 'bodyTypeID' && typeof e === 'string') {
									updateBody(e)
									setSubmittedStatus()
								} else if (keyName === 'makeID' && typeof e === 'string') {
									updateMark(e)
									setSubmittedStatus()
								} else if (keyName === 'modelID' && typeof e === 'string') {
									updateModel(e)
									setSubmittedStatus()
								} else if (keyName === 'vehicleUsageID' && typeof e === 'string') {
									updateUsage(e)
									setSubmittedStatus()
								}
							}

							return (
								<FormFieldJson
									key={fields.key}
									form={form}
									formName={fields.formName}
									isForm={fields.isForm}
									itemsList={itemsList}
									label={fields.templateOptions.label}
									maximum={fields.templateOptions.maximum}
									minimum={fields.templateOptions.miniumum}
									placeholder={fields.templateOptions.placeholder}
									styleClasses={fields.templateOptions.styleClasses}
									type={fields.type}
									value={vehicleData[keyName]}
									onChange={changeFunction}
								/>
							)
						})}
						{/* <div className='selectVehicleBaseInfo flex flex-col gap-5 lg:flex-row lg:gap-16'>
							<BodyType
								form={form}
								setSubmittedStatus={setSubmittedStatus}
							/>
							<SelectMark
								form={form}
								setSubmittedStatus={setSubmittedStatus}
							/>
						</div>
						<div className='selectVehicleBaseInfo flex flex-col gap-5 lg:flex-row lg:gap-16'>
							{+vehicleData.bodyTypeID > 5 ? (
								<FormField
									control={form.control}
									name='model'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormLabel className='text-blue-325'>Model</FormLabel>
											<FormControl>
												<Input
													{...field}
													autoComplete='name'
													className='border-gray-360 border shadow-inputShadowDrop'
													id='vehicleValue'
													placeholder='Model Description'
													onChange={(e) => {
														field.onChange(e)
														dispatch(
															updateVehicleModel({
																model: e.target.value,
																modelID: '99999'
															})
														)

														if (isSubmitted) {
															setIsSubmitted(false)
														}
													}}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							) : (
								<SelectModel
									form={form}
									setSubmittedStatus={setSubmittedStatus}
								/>
							)}
							<VehicleUsage
								form={form}
								setSubmittedStatus={setSubmittedStatus}
							/>
						</div>
						<div className='selectVehicleBaseInfo flex flex-col gap-5 lg:flex-row lg:gap-16'>
							<FormField
								control={form.control}
								name='numberOfSeats'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel className='text-blue-325'>
											Number of seats
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												autoComplete='name'
												className='border-gray-360 border shadow-inputShadowDrop'
												id='vehicleValue'
												placeholder='Number of Seats'
												onChange={(e) => {
													if (e.target.value.length < 3) {
														field.onChange(e)
													}

													if (isSubmitted) {
														setIsSubmitted(false)
													}
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='manufactureyear'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel className='text-blue-325'>
											Manufacture Year
										</FormLabel>
										<FormControl>
											<Select
												disabled={field.disabled}
												name={field.name}
												value={field.value}
												onValueChange={(e) => {
													field.onChange(e)

													if (isSubmitted) {
														setIsSubmitted(false)
													}
												}}>
												<SelectTrigger
													ref={field.ref}
													className='border-gray-360 border shadow-inputShadowDrop'>
													<SelectValue placeholder='Manufacture Year' />
												</SelectTrigger>
												<SelectContent>
													{years.map((year) => {
														return (
															<SelectItem
																key={year}
																value={year}>
																{year}
															</SelectItem>
														)
													})}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='selectVehicleBaseInfo flex flex-col gap-5 lg:flex-row lg:gap-16'>
							<FormField
								control={form.control}
								name='excessLimit'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel className='text-blue-325'>
											Excess Limit
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												autoComplete='name'
												className='border-gray-360 border shadow-inputShadowDrop'
												id='excessLimit'
												placeholder='Excess Limit'
												onChange={(e) => {
													field.onChange(e)

													if (isSubmitted) {
														setIsSubmitted(false)
													}
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div> */}
						<div className='col-span-2 flex w-full flex-col items-center justify-center'>
							{!isSubmitted && (
								<Button
									className='rounded-3xl px-10 py-5'
									variant='bluebtn'>
									Continue
								</Button>
							)}
						</div>
					</form>
				</Form>
			</div>
		</section>
	)
}
