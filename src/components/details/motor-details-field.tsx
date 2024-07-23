'use client'

import { z } from 'zod'
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { FormFieldLayout } from './form-field-layout'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateVehicleDetails } from '@/redux/slices'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useGetColorListMutation } from '@/redux/api/commonApi'
import { useEffect, useState } from 'react'

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
	engineCapacity: z.string().min(1, {
		message: 'Please enter Engine Capacity'
	}),
	color: z.string().min(2, {
		message: 'Please Select Color'
	})
})

export function MotorDetailsField(props: motorDetailsFieldProps) {
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const insuranceID = useAppSelector((state) => state.apps.insuranceID)
	const branchCode = useAppSelector((state) => state.apps.branchCode)

	const [colors, setColors] = useState<{ value: string; label: string }[]>([])

	const dispatch = useAppDispatch()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			regNo: vehicleData.registrationNumber,
			chassisNo: vehicleData.chassisNumber,
			engineNo: vehicleData.engineNumber,
			engineCapacity: vehicleData.engineCapacity,
			color: vehicleData.color
		}
	})

	const [colorList] = useGetColorListMutation()

	function onSubmit(values: z.infer<typeof formSchema>) {
		dispatch(
			updateVehicleDetails({
				registrationNumber: values.regNo,
				chassisNumber: values.chassisNo,
				engineNumber: values.engineNo,
				engineCapacity: values.engineCapacity,
				color: values.color
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
						<div className='flex w-full flex-row gap-8'>
							<div className='flex-grow'>
								<FormField
									control={form.control}
									name='regNo'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormLabel>Registration Number</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border-2 border-blue-925'
													id='regNo'
													placeholder='Registration Number'
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
									name='chassisNo'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormLabel>Chassis number</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border-2 border-blue-925'
													id='chassisNo'
													placeholder='Enter Chassis number'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<div className='flex w-full flex-row gap-8'>
							<div className='flex-grow'>
								<FormField
									control={form.control}
									name='engineNo'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormLabel>Engine Number</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border-2 border-blue-925'
													id='engineNo'
													placeholder='Enter Engine Number'
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
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<div className='flex-grow'>
							<FormField
								control={form.control}
								name='color'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>Color</FormLabel>
										<FormControl>
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
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button
							className='w-32'
							variant='bluebtn'
							onClick={props.goNext}>
							Continue
						</Button>
					</form>
				</Form>
			</>
		</FormFieldLayout>
	)
}
