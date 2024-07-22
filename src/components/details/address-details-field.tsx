import { useForm } from 'react-hook-form'
import { Button, Input } from '../ui'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { FormFieldLayout } from './form-field-layout'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch } from '@/redux/hooks'
import { updateAddressDetails } from '@/redux/slices'

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
	citytown: z.string().min(4, {
		message: 'City or Town is required'
	}),
	pobox: z.string().min(4, {
		message: 'Fill the PO Box number'
	}),
	workaddress: z.string().min(8, {
		message: 'Please Enter your work address'
	})
})

export function AddressDetailsField(props: addressDetailsFieldProps) {
	const dispatch = useAppDispatch()
	const form = useForm<z.infer<typeof addressDetailSchema>>({
		resolver: zodResolver(addressDetailSchema),
		defaultValues: {
			residentialaddress: '',
			citytown: '',
			pobox: '',
			workaddress: ''
		}
	})

	function onSubmit(values: z.infer<typeof addressDetailSchema>) {
		dispatch(
			updateAddressDetails({
				address: values.workaddress,
				city: values.citytown,
				poBox: values.pobox,
				workAddress: values.workaddress
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
							<FormLabel>Residential Address</FormLabel>
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
														className='border-2 border-blue-925'
														id='nrc1'
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
						<div className='flex w-full flex-row gap-4'>
							<div className='w-full flex-grow'>
								<FormField
									control={form.control}
									name='citytown'
									render={({ field }) => (
										<FormItem>
											<FormLabel>City / Town</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border-2 border-blue-925'
													id='citytown'
													placeholder='City / Town'
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
									name='pobox'
									render={({ field }) => (
										<FormItem>
											<FormLabel>PO Box</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border-2 border-blue-925'
													id='pobox'
													placeholder='PO Box'
													type='number'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
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
														id='address'
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
