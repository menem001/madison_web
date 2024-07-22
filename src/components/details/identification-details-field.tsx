import { z } from 'zod'
import { Button, Input } from '../ui'
import { FormFieldLayout } from './form-field-layout'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { cn } from '@/lib'

type identificationDetailsFieldProps = {
	current: number
	pos: number
	goNext: () => void
	goSpecific: (num: number) => void
}

const identificationformSchema = z.object({
	nrc1: z.string().min(4, {
		message: 'Fill the NRC'
	}),
	nrc2: z.string().min(4, {
		message: 'Fill the NRC'
	}),
	nrc3: z.string().min(4, {
		message: 'Fill the NRC'
	}),
	passport: z.string().min(8, {
		message: 'Please enter Passport Number'
	})
})

export function IdentificationDetailsField(props: identificationDetailsFieldProps) {
	const [accountType, setAccountType] = useState<string>('')
	const [companyNumber, setCompanyNumber] = useState<string>('')

	function onSubmit(values: z.infer<typeof identificationformSchema>) {
		console.log(values, accountType, companyNumber)
		props.goNext()
	}

	const form = useForm<z.infer<typeof identificationformSchema>>({
		resolver: zodResolver(identificationformSchema),
		defaultValues: {
			nrc1: '',
			nrc2: '',
			nrc3: '',
			passport: ''
		}
	})

	return (
		<FormFieldLayout
			current={props.current}
			done={props.current > 2}
			goSpecific={props.goSpecific}
			pos={props.pos}
			show={props.current === 2}
			subTitle='Additional information around Step 2'
			title='Step 2 - Identification Details'>
			<>
				<Form {...form}>
					<form
						className='space-y-8'
						onSubmit={form.handleSubmit(onSubmit)}>
						<div className='flex flex-col gap-1'>
							<FormLabel>NRC (National Registration card)</FormLabel>
							<div className='flex w-full flex-row gap-4'>
								<div className='flex-grow flex-col gap-0'>
									<FormField
										control={form.control}
										name='nrc1'
										render={({ field }) => (
											<FormItem className='w-full'>
												<FormControl>
													<Input
														{...field}
														className='border-2 border-blue-925'
														id='nrc1'
														placeholder=''
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<span className='text-3xl'>/</span>
								<div className='flex-grow'>
									<FormField
										control={form.control}
										name='nrc2'
										render={({ field }) => (
											<FormItem className='w-full'>
												<FormControl>
													<Input
														{...field}
														className='border-2 border-blue-925'
														id='nrc2'
														placeholder=''
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<span className='text-3xl'>/</span>
								<div className='flex-grow'>
									<FormField
										control={form.control}
										name='nrc3'
										render={({ field }) => (
											<FormItem className='w-full'>
												<FormControl>
													<Input
														{...field}
														className='border-2 border-blue-925'
														id='nrc3'
														placeholder=''
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
									name='passport'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Passport no.</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='border-2 border-blue-925'
													id='passport'
													placeholder='Passport Number'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='flex-grow'>
								<FormLabel>Account Type</FormLabel>
								<div className='flex flex-row gap-2'>
									<div
										className={cn(
											'rounded-2xl border-2 bg-white px-6 py-3 font-roboto text-black',
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
											'rounded-2xl border-2 bg-white px-6 py-3 font-roboto text-black',
											{
												'bg-blue-300 text-white':
													accountType === 'Corporate'
											}
										)}
										onClick={() => {
											setAccountType('Corporate')
										}}>
										Corporate
									</div>
								</div>
							</div>
						</div>
						{accountType === 'Corporate' && (
							<div className='flex-grow'>
								<FormLabel>Company Registration number</FormLabel>
								<Input
									className='border-2 border-blue-925'
									placeholder='Company Registration number'
									value={companyNumber}
									onChange={(e) => {
										setCompanyNumber(e.target.value)
									}}
								/>
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
