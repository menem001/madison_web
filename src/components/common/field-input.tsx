'use client'

import { useState, type ChangeEvent } from 'react'
import { Input } from '../ui'
import { Label } from '../ui/label'

type FieldInputProps = {
	key: string
	placeholder: string
	minimum: number
	value: unknown
	onChange: (e: ChangeEvent<HTMLInputElement> | string) => void
	maximum: null | number
	label: string
}

export function FieldInput(props: FieldInputProps) {
	const [isMinimumReached, setIsMinimumReached] = useState<boolean>(true)
	return (
		<>
			<Label key={props.key}>{props.label}</Label>
			{typeof props.value === 'string' && (
				<Input
					id={props.key}
					placeholder={props.placeholder}
					value={props.value}
					onChange={(e) => {
						if (props.maximum === null) {
							props.onChange(e)
							setIsMinimumReached(e.target.value.length >= props.minimum)
						} else {
							if (e.target.value.length <= props.maximum) {
								props.onChange(e)
								setIsMinimumReached(e.target.value.length >= props.minimum)
							}
						}
					}}
				/>
			)}
			{typeof props.value === 'number' && (
				<Input
					id={props.key}
					placeholder={props.placeholder}
					type='number'
					value={props.value}
					onChange={(e) => {
						if (props.maximum === null) {
							props.onChange(e)
							setIsMinimumReached(e.target.value.length >= props.minimum)
						} else {
							if (e.target.value.length <= props.maximum) {
								props.onChange(e)
								setIsMinimumReached(e.target.value.length >= props.minimum)
							}
						}
					}}
				/>
			)}
			{!isMinimumReached && (
				<h5 className='text-xs text-red-500'>
					Atleast {props.minimum} characters required
				</h5>
			)}
		</>
	)
}
