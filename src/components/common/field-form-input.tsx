'use client'

import { type ChangeEvent } from 'react'
import { Input } from '../ui'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'

type FieldFormInputProps = {
	key: string
	placeholder: string
	minimum: number
	value: unknown
	onChange: (e: ChangeEvent<HTMLInputElement> | string) => void
	maximum: null | number
	label: string
	form: unknown
	formName?: string
}

export function FieldFormInput(props: FieldFormInputProps) {
	return (
		<>
			{/* <Label key={props.key}>{props.label}</Label> */}
			{typeof props.value === 'string' && (
				<FormField
					control={props.form.control}
					name={props.formName !== undefined ? props.formName : ''}
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormLabel className='text-blue-325'>{props.label}</FormLabel>
							<FormControl>
								<Input
									{...field}
									autoComplete='name'
									className='border-gray-360 border shadow-inputShadowDrop'
									id={props.key}
									placeholder={props.placeholder}
									onChange={(e) => {
										field.onChange(e)

										props.onChange(e)
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}
			{typeof props.value === 'number' && (
				<FormField
					control={props.form.control}
					name={props.formName !== undefined ? props.formName : ''}
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormLabel className='text-blue-325'>{props.label}</FormLabel>
							<FormControl>
								<Input
									{...field}
									autoComplete='name'
									className='border-gray-360 border shadow-inputShadowDrop'
									id={props.key}
									placeholder={props.placeholder}
									type='number'
									onChange={(e) => {
										field.onChange(e)

										props.onChange(e)
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}
		</>
	)
}
