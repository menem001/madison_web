'use client'

import { type ChangeEvent } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'

type FieldFormInputProps = {
	key: string
	placeholder: string
	minimum: number
	value: unknown
	onChange: (e: ChangeEvent<HTMLInputElement> | string) => void
	maximum: null | number
	label: string
	form: unknown
	disabled?: boolean
	itemsList?: { value: string; label: string }[]
	formName?: string
}

export function FieldFormSelect(props: FieldFormInputProps) {
	return (
		<>
			<FormField
				control={props.form.control}
				name={props.formName !== undefined ? props.formName : ''}
				render={({ field }) => (
					<FormItem className='w-full'>
						<FormLabel className='text-blue-325'>{props.label}</FormLabel>
						<FormControl>
							<Select
								disabled={props.disabled}
								name={field.name}
								value={field.value + ''}
								onValueChange={(e) => {
									field.onChange(e)
									props.onChange(e)
								}}>
								<SelectTrigger
									ref={field.ref}
									className='border-gray-360 border shadow-inputShadowDrop'>
									<SelectValue placeholder='Select Model' />
								</SelectTrigger>
								<SelectContent>
									{props.itemsList &&
										props.itemsList.map((item, index) => {
											return (
												<SelectItem
													key={index}
													value={item.value}>
													{item.label}
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
		</>
	)
}
