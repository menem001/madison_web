import { useForm } from 'react-hook-form'
import { Button, Input } from '../ui'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { FormFieldLayout } from './form-field-layout'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateContactInformation } from '@/redux/slices'

type contactInformationFieldProps = {
	current: number
	pos: number
	goNext: () => void
	goSpecific: (num: number) => void
}
const contactInfoDetailSchema = z.object({
	mailId: z.string().min(6, {
		message: 'Invalid mail id'
	}),
	contact1: z.string().min(4, {
		message: 'Contact number is required'
	}),
	contact2: z.string().min(4, {
		message: ''
	}),
	contact1Code: z.string().min(3, {
		message: 'Required'
	}),
	contact2Code: z.string().min(3, {
		message: 'Required'
	})
})

export function ContactInformationField(props: contactInformationFieldProps) {
	const customerData = useAppSelector((state) => state.customerDetails)
	const form = useForm<z.infer<typeof contactInfoDetailSchema>>({
		resolver: zodResolver(contactInfoDetailSchema),
		defaultValues: {
			mailId: customerData.email,
			contact1: customerData.mobile,
			contact2: customerData.mobile2,
			contact1Code: customerData.code,
			contact2Code: customerData.code2
		}
	})

	const dispatch = useAppDispatch()

	function onSubmit(values: z.infer<typeof contactInfoDetailSchema>) {
		dispatch(
			updateContactInformation({
				code: values.contact1Code,
				email: values.mailId,
				mobile: values.contact1,
				code2: values.contact2Code,
				mobile2: values.contact2
			})
		)
		props.goNext()
	}

	return (
		<FormFieldLayout
			current={props.current}
			done={props.current > 4}
			goSpecific={props.goSpecific}
			pos={props.pos}
			show={props.current === 4}
			subTitle='Additional information around Step 4'
			title='Step 4 - Contact  Information'>
			<>
				<Form {...form}>
					<form
						className='space-y-8'
						onSubmit={form.handleSubmit(onSubmit)}>
						<div className='flex flex-col gap-1'>
							<FormLabel>Mail Id</FormLabel>
							<div className='flex w-full flex-row gap-4'>
								<div className='flex-grow flex-col gap-0'>
									<FormField
										control={form.control}
										name='mailId'
										render={({ field }) => (
											<FormItem className='w-full'>
												<FormControl>
													<Input
														{...field}
														className='border-2 border-blue-925'
														id='nrc1'
														placeholder='Please Enter your mail address'
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
						</div>
						<div className='flex w-full flex-row gap-4'>
							<div className='flex-grow'>
								<FormField
									name='contact1Code'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Contact Code</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border-2 border-blue-925'
													disabled={true}
													id='passport'
													placeholder='Select'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='w-full flex-grow'>
								<FormField
									control={form.control}
									name='contact1'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Contact</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border-2 border-blue-925'
													id='passport'
													placeholder='Enter Mobile Number'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<div className='flex w-full flex-row gap-4'>
							<div className='flex-grow'>
								<FormField
									name='contact2Code'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Contact Code</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border-2 border-blue-925'
													id='passport'
													placeholder='Select'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='w-full flex-grow'>
								<FormField
									control={form.control}
									name='contact2'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Contact</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border-2 border-blue-925'
													id='passport'
													placeholder='Enter Mobile Number'
												/>
											</FormControl>
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
