'use client'

import { useForm } from 'react-hook-form'
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { FormFieldLayout } from './form-field-layout'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateAddressDetails } from '@/redux/slices'
import { useGetRegionListMutation } from '@/redux/api/commonApi'
import { useEffect, useState } from 'react'
import { Skeleton } from '../ui/skeleton'

type addressDetailsFieldProps = {
	current: number
	pos: number
	goNext: () => void
	goSpecific: (num: number) => void
}
const addressDetailSchema = z.object({
	residentialaddress: z.string().min(4, {
		message: 'Residential Address is required'
	}),
	citytown: z.string().min(1, {
		message: 'City or Town is required'
	}),
	pobox: z.string().optional(),
	workaddress: z.string().optional()
})

export function AddressDetailsField(props: addressDetailsFieldProps) {
	const dispatch = useAppDispatch()
	const customerData = useAppSelector((state) => state.customerDetails)
	const form = useForm<z.infer<typeof addressDetailSchema>>({
		resolver: zodResolver(addressDetailSchema),
		defaultValues: {
			residentialaddress: customerData.address,
			citytown: customerData.city,
			pobox: customerData.poBox,
			workaddress: customerData.workAddress
		}
	})
	const [cityName, setCityName] = useState<string>(customerData.cityName)

	const [cityList, setCityList] = useState<{ value: string; label: string }[]>([])

	const [getRegion] = useGetRegionListMutation()

	useEffect(() => {
		const request = { CountryId: 'ZMB' }
		const tempArr: { value: string; label: string }[] = []
		const res = getRegion(request)
		res.then((value) => {
			if (value.data?.type === 'success' && value.data?.data !== undefined) {
				value.data.data!.Result.map((value) => {
					tempArr.push({
						value: value.Code,
						label: value.CodeDesc
					})
				})
				setCityList(tempArr)
			}
		})
	}, [])

	function onSubmit(values: z.infer<typeof addressDetailSchema>) {
		dispatch(
			updateAddressDetails({
				address: values.residentialaddress,
				city: values.citytown,
				poBox: values.pobox !== undefined ? values.pobox : '',
				workAddress: values.workaddress !== undefined ? values.workaddress : '',
				cityName: cityName
			})
		)
		props.goNext()
	}

	return (
		<FormFieldLayout
			current={props.current}
			done={props.current > 3}
			goSpecific={props.goSpecific}
			pos={props.pos}
			show={props.current === 3}
			subTitle='Additional information around Step 3'
			title='Step 3 - Address Details'>
			<>
				<Form {...form}>
					<form
						className='space-y-8'
						onSubmit={form.handleSubmit(onSubmit)}>
						<div className='flex flex-col gap-1'>
							<FormLabel>
								Residential Address<span className='text-red-500'>*</span>
							</FormLabel>
							<div className='flex w-full flex-row gap-4'>
								<div className='flex-grow flex-col gap-0'>
									<FormField
										control={form.control}
										name='residentialaddress'
										render={({ field }) => (
											<FormItem className='w-full'>
												<FormControl>
													<Input
														{...field}
														autoComplete='address-level3'
														className='border-2 border-blue-925'
														id='residentialaddress'
														placeholder='Please Enter Residential Address'
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
						</div>
						<div className='flex w-full flex-row gap-2 lg:gap-4'>
							<div className='w-full flex-grow'>
								<FormField
									control={form.control}
									name='citytown'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												City / Town<span className='text-red-500'>*</span>
											</FormLabel>
											<FormControl>
												{cityList.length === 0 ? (
													<Skeleton className='h-10 w-full' />
												) : (
													<Select
														disabled={field.disabled}
														name={field.name}
														value={field.value}
														onValueChange={(e) => {
															field.onChange(e)
															const pos = cityList.findIndex(
																(item) => {
																	return item.value === e
																}
															)
															setCityName(cityList[pos].label)
														}}>
														<SelectTrigger
															ref={field.ref}
															className='border-2 border-blue-925'>
															<SelectValue placeholder='City/Town' />
														</SelectTrigger>
														<SelectContent>
															{cityList.map((city, index) => {
																return (
																	<SelectItem
																		key={index}
																		value={city.value}>
																		{city.label}
																	</SelectItem>
																)
															})}
														</SelectContent>
													</Select>
												)}
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='w-full flex-grow'>
								<FormField
									control={form.control}
									name='pobox'
									render={({ field }) => {
										const isCorrectFormat =
											field.value &&
											field.value !== '' &&
											field.value.length < 6
										return (
											<FormItem>
												<FormLabel>PO Box</FormLabel>
												<FormControl>
													<Input
														{...field}
														className='border-2 border-blue-925'
														id='pobox'
														placeholder='PO Box'
														onChange={(e) => {
															if (e.target.value.length < 9) {
																field.onChange(e)
															}
														}}
													/>
												</FormControl>
												{isCorrectFormat && (
													<p className='text-xs font-light text-red-600'>
														Atleast 6 Letters
													</p>
												)}
												<FormMessage />
											</FormItem>
										)
									}}
								/>
							</div>
						</div>
						<div className='flex flex-col gap-1'>
							<FormLabel>Work Address</FormLabel>
							<div className='flex w-full flex-row gap-4'>
								<div className='flex-grow flex-col gap-0'>
									<FormField
										control={form.control}
										name='workaddress'
										render={({ field }) => (
											<FormItem className='w-full'>
												<FormControl>
													<Input
														{...field}
														autoComplete='address-level1'
														className='border-2 border-blue-925'
														id='workaddress'
														placeholder='Please Enter Work Address'
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
						</div>
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
