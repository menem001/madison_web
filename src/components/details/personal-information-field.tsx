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

type personalInformationFieldProps = {
	current: number
	pos: number
	goNext: () => void
	goSpecific: (num: number) => void
}

const formSchema = z.object({
	title: z.string().min(1, {
		message: 'Title'
	}),
	firstname: z.string().min(2, {
		message: 'Please enter First Name'
	}),
	lastname: z.string().min(2, {
		message: 'Please enter Last Name'
	}),
	gender: z.string().min(1, {
		message: 'Please Pick a gender'
	}),
	occupation: z.string().min(2, {
		message: 'Please enter Occupation'
	}),
	mobile: z.string().min(2, {
		message: 'Please enter Mobile number'
	}),
	dob: z.date()
})

export function PersonalInformationField(props: personalInformationFieldProps) {
	const customerData = useAppSelector((state) => state.customerDetails)
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const parts = vehicleData.DriverDOB.split('/')
	const dateObject = new Date(+parts[2], +parts[1] - 1, +parts[0])
	const timestamp = dateObject.getTime()

	const custDob = customerData.dob.split('/')
	const dateObject2 = new Date(+custDob[2], +custDob[1] - 1, +custDob[0])
	const timestamp2 = dateObject2.getTime()

	const dispatch = useAppDispatch()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			firstname: customerData.name,
			lastname: '',
			mobile: customerData.mobile,
			gender: '',
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
		dispatch(
			updatePersonalDetails({
				title: values.title,
				gender: values.gender,
				occupation: values.occupation,
				dob: formatDateDDMMYYYY(values.dob),
				name: values.firstname + ' ' + values.lastname,
				mobile: values.mobile
			})
		)
		props.goNext()
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
						<div className='flex w-full flex-row gap-8'>
							<div>
								<FormField
									control={form.control}
									name='title'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<div className='w-20'>
													<Select
														disabled={field.disabled}
														name={field.name}
														value={field.value}
														onValueChange={field.onChange}>
														<SelectTrigger
															ref={field.ref}
															className='border-2 border-blue-925'>
															<SelectValue placeholder='Title' />
														</SelectTrigger>
														<SelectContent>
															<SelectItem
																key={1}
																value='1'>
																Mr.
															</SelectItem>
															<SelectItem
																key={2}
																value='2'>
																Mrs.
															</SelectItem>
														</SelectContent>
													</Select>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='flex-grow'>
								<FormField
									control={form.control}
									name='firstname'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormLabel>First Name</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border-2 border-blue-925'
													id='firstname'
													placeholder='First Name'
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
									name='lastname'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Last Name</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border-2 border-blue-925'
													id='lastname'
													placeholder='Last Name'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<div className='flex w-full flex-row gap-8'>
							<div className='w-1/2'>
								<FormField
									control={form.control}
									name='gender'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Gender</FormLabel>
											<FormControl>
												<Select
													disabled={field.disabled}
													name={field.name}
													value={field.value}
													onValueChange={field.onChange}>
													<SelectTrigger
														ref={field.ref}
														className='border-2 border-blue-925'>
														<SelectValue placeholder='Gender' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem
															key={1}
															value='Male'>
															Male
														</SelectItem>
														<SelectItem
															key={2}
															value='Female'>
															Female
														</SelectItem>
														<SelectItem
															key={3}
															value='Prefer not to say'>
															Prefer not to say
														</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='w-1/2'>
								<FormField
									control={form.control}
									name='occupation'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Occupation</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border-2 border-blue-925'
													id='occupation'
													placeholder='Occupation'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<div className='flex w-full flex-row gap-8'>
							<div className='w-1/2'>
								<FormField
									control={form.control}
									name='mobile'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Mobile Number</FormLabel>
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
							<div className='w-1/2'>
								<FormField
									control={form.control}
									name='dob'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Date of Birth</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															id='start'
															variant='outline'
															className={cn(
																'w-full border-2 border-blue-925 pl-3 text-left font-normal text-muted-foreground',
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
															onSelect={field.onChange}
														/>
													</>
												</PopoverContent>
											</Popover>

											<FormMessage />
										</FormItem>
									)}
								/>
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
