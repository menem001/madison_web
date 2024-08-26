'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useGSAP } from '@gsap/react'
import { zodResolver } from '@hookform/resolvers/zod'
import gsap from 'gsap'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { VehicleUsage } from './vehicle-usage'
import { BodyType } from './body-type'
import { SelectMark } from './select-mark'
import { SelectModel } from './select-model'
import { updateSeatsYear, updateVehicleModel } from '@/redux/slices'

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

	const dispatch = useAppDispatch()

	const years: string[] = []

	const currentYear = new Date(Date.now()).getFullYear()

	for (let i = currentYear; i > currentYear - 30; i--) {
		years.push(i + '')
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
						className='space-y-8'
						onSubmit={form.handleSubmit(onSubmit)}>
						<div className='selectVehicleBaseInfo flex flex-col gap-5 lg:flex-row lg:gap-16'>
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
						</div>
						<div className='flex w-full items-center justify-center'>
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
