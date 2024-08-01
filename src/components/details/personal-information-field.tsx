'use client'

import { z } from 'zod'
import {
	Button,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '../ui'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { FormFieldLayout } from './form-field-layout'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarDays } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import { format } from 'date-fns'
import { cn, formatDateDDMMYYYY } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updatePersonalDetails } from '@/redux/slices'
import { useGetOccupationListMutation, useTitleTypeMutation } from '@/redux/api/commonApi'
import { useEffect, useState } from 'react'
import { Skeleton } from '../ui/skeleton'
import { Label } from '../ui/label'

type personalInformationFieldProps = {
	current: number
	pos: number
	goNext: () => void
	goSpecific: (num: number) => void
}

const formSchema = z.object({
	title: z.string().min(1, {
		message: 'Select a title'
	}),
	name: z.string().min(2, {
		message: 'Please enter Name'
	}),
	gender: z.string(),
	occupation: z.string().min(1, {
		message: 'Please enter Occupation'
	}),
	mobile: z.string().min(2, {
		message: 'Please enter Mobile number'
	}),
	dob: z.date().optional()
})

export function PersonalInformationField(props: personalInformationFieldProps) {
	const customerData = useAppSelector((state) => state.customerDetails)
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const insuranceID = useAppSelector((state) => state.apps.insuranceID)
	const branchCode = useAppSelector((state) => state.apps.branchCode)

	const [accountType, setAccountType] = useState<string>(customerData.accType)
	const [isGenderEmpty, setIsGenderEmpty] = useState<boolean>(false)
	const [isDOBEmpty, setIsDOBEmpty] = useState<boolean>(false)

	const parts = vehicleData.DriverDOB.split('/')
	const dateObject = new Date(+parts[2], +parts[1] - 1, +parts[0])
	const timestamp = dateObject.getTime()

	const custDob = customerData.dob.split('/')
	const dateObject2 = new Date(+custDob[2], +custDob[1] - 1, +custDob[0])
	const timestamp2 = dateObject2.getTime()

	const dispatch = useAppDispatch()

	const [getOccupation] = useGetOccupationListMutation()
	const [getTitleTypes] = useTitleTypeMutation()

	const [OccupationList, setOccupation] = useState<{ value: string; label: string }[]>([])
	const [titleList, setTitleList] = useState<{ value: string; label: string }[]>([])

	useEffect(() => {
		const request = {
			InsuranceId: insuranceID,
			BranchCode: branchCode,
			ProductId: '',
			TitleType: ''
		}
		const tempArr: { value: string; label: string }[] = []
		const res = getOccupation(request)
		res.then((value) => {
			if (value.data?.type === 'success' && value.data?.data !== undefined) {
				value.data.data!.Result.map((value) => {
					tempArr.push({
						value: value.Code,
						label: value.CodeDesc
					})
				})
				setOccupation(tempArr)
			}
		})
	}, [])

	useEffect(() => {
		const request = {
			InsuranceId: insuranceID,
			ItemType: 'NAME_TITLE',
			BranchCode: '99999',
			ItemCode: 'null',
			TitleType: accountType === 'Personal' ? 'I' : 'C'
		}
		const tempArr: { value: string; label: string }[] = []
		const res = getTitleTypes(request)
		res.then((value) => {
			if (value.data?.type === 'success' && value.data?.data !== undefined) {
				value.data.data!.Result.map((value) => {
					tempArr.push({
						value: value.Code,
						label: value.CodeDesc
					})
				})
				setTitleList(tempArr)
			}
		})
	}, [accountType])

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: customerData.title,
			name: customerData.name,
			mobile: customerData.mobile,
			gender: customerData.gender,
			occupation: customerData.occupation,
			dob:
				vehicleData.driverOrOwner === 'Owner'
					? new Date(timestamp)
					: customerData.dob !== ''
						? new Date(timestamp2)
						: undefined
		}
	})

	const years18 = new Date()

	years18.setFullYear(years18.getFullYear() - 18)

	function onSubmit(values: z.infer<typeof formSchema>) {
		if (accountType === 'Personal') {
			if (values.gender === '') {
				setIsGenderEmpty(true)
			} else if (!values.dob) {
				setIsDOBEmpty(true)
			} else {
				dispatch(
					updatePersonalDetails({
						title: values.title,
						gender: values.gender,
						occupation: values.occupation,
						dob: formatDateDDMMYYYY(values.dob),
						name: values.name,
						mobile: values.mobile,
						accountType: accountType
					})
				)

				props.goNext()
			}
		} else {
			dispatch(
				updatePersonalDetails({
					title: values.title,
					gender: values.gender,
					occupation: values.occupation,
					dob: values.dob !== undefined ? formatDateDDMMYYYY(values.dob) : '',
					name: values.name,
					mobile: values.mobile,
					accountType: accountType
				})
			)

			props.goNext()
		}
	}

	return (
		<FormFieldLayout
			current={props.current}
			done={props.current > 1}
			goSpecific={props.goSpecific}
			pos={props.pos}
			show={props.current === 1}
			subTitle='Additional information around Step 1'
			title='Step 1 - Personal Information'>
			<>
				<Form {...form}>
					<form
						className='space-y-8'
						onSubmit={form.handleSubmit(onSubmit)}>
						<div className='flex-grow'>
							<Label>
								Account Type<span className='text-red-500'>*</span>
							</Label>
							<div className='flex flex-row gap-2'>
								<div
									className={cn(
										'rounded-2xl border-2 bg-white px-12 py-2 font-roboto text-black',
										{
											'bg-blue-300 text-white': accountType === 'Personal'
										}
									)}
									onClick={() => {
										setAccountType('Personal')
									}}>
									Personal
								</div>
								<div
									className={cn(
										'rounded-2xl border-2 bg-white px-12 py-2 font-roboto text-black',
										{
											'bg-blue-300 text-white': accountType === 'Corporate'
										}
									)}
									onClick={() => {
										setAccountType('Corporate')
									}}>
									Corporate
								</div>
							</div>
						</div>
						<div className='flex w-full flex-row gap-8'>
							<div>
								<FormField
									control={form.control}
									name='title'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Title<span className='text-red-500'>*</span>
											</FormLabel>
											<FormControl>
												{titleList.length === 0 ? (
													<Skeleton className='h-10 w-full' />
												) : (
													<div className='w-20'>
														<Select
															disabled={field.disabled}
															name={field.name}
															value={field.value}
															onValueChange={(e) => {
																field.onChange(e)
															}}>
															<SelectTrigger
																ref={field.ref}
																className='border-2 border-blue-925'>
																<SelectValue placeholder='Title' />
															</SelectTrigger>
															<SelectContent>
																{titleList.map((title, index) => {
																	return (
																		<SelectItem
																			key={index}
																			value={title.value}>
																			{title.label}
																		</SelectItem>
																	)
																})}
															</SelectContent>
														</Select>
													</div>
												)}
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='flex-grow'>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormLabel>
												Customer Name<span className='text-red-500'>*</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border-2 border-blue-925'
													id='name'
													placeholder='Customer Name'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<div className='flex w-full flex-row gap-8'>
							{accountType === 'Personal' && (
								<div className='min-w-32'>
									<FormField
										control={form.control}
										name='gender'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Gender<span className='text-red-500'>*</span>
												</FormLabel>
												<FormControl>
													<Select
														disabled={field.disabled}
														name={field.name}
														value={field.value}
														onValueChange={(e) => {
															field.onChange(e)
															setIsGenderEmpty(false)
														}}>
														<SelectTrigger
															ref={field.ref}
															className='border-2 border-blue-925'>
															<SelectValue placeholder='Gender' />
														</SelectTrigger>
														<SelectContent>
															<SelectItem
																key={1}
																value='M'>
																Male
															</SelectItem>
															<SelectItem
																key={2}
																value='F'>
																Female
															</SelectItem>
														</SelectContent>
													</Select>
												</FormControl>
												{isGenderEmpty && (
													<span className='text-xs text-red-500'>
														select a gender
													</span>
												)}
											</FormItem>
										)}
									/>
								</div>
							)}
							<div className='flex-grow'>
								<FormField
									control={form.control}
									name='occupation'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Occupation<span className='text-red-500'>*</span>
											</FormLabel>
											<FormControl>
												{OccupationList.length === 0 ? (
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
															<SelectValue placeholder='Occupation' />
														</SelectTrigger>
														<SelectContent>
															{OccupationList.map(
																(occupation, index) => {
																	return (
																		<SelectItem
																			key={index}
																			value={
																				occupation.value
																			}>
																			{occupation.label}
																		</SelectItem>
																	)
																}
															)}
														</SelectContent>
													</Select>
												)}
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
									name='mobile'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Mobile Number<span className='text-red-500'>*</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border-2 border-blue-925'
													id='mobile'
													placeholder='mobile'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							{accountType === 'Personal' && (
								<div className='flex-grow'>
									<FormField
										control={form.control}
										name='dob'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Date of Birth
													<span className='text-red-500'>*</span>
												</FormLabel>
												<Popover>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																id='start'
																variant='outline'
																className={cn(
																	'w-full border-2 border-blue-925 pl-3 text-left font-normal text-black',
																	!field.value &&
																		'text-muted-foreground'
																)}>
																{field.value ? (
																	format(field.value, 'PPP')
																) : (
																	<span>Pick a date</span>
																)}
																<CalendarDays className='ml-auto h-4 w-4 opacity-50' />
															</Button>
														</FormControl>
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
																selected={field.value}
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
																	date > years18 ||
																	date < new Date('1900-01-01')
																}
																onSelect={(e) => {
																	field.onChange(e)
																	setIsDOBEmpty(false)
																}}
															/>
														</>
													</PopoverContent>
												</Popover>
												{isDOBEmpty && (
													<span className='text-xs text-red-500'>
														select a date
													</span>
												)}
											</FormItem>
										)}
									/>
								</div>
							)}
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
