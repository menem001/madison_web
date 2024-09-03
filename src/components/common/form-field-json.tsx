import { type ChangeEvent } from 'react'
import { FieldInput } from './field-input'

type FormFieldJson = {
	key: string
	styleClasses: string
	type: string
	label: string
	placeholder: string
	value: unknown
	maximum: null | number
	minimum: number
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export function FormFieldJson(props: FormFieldJson) {
	return (
		<div className={props.styleClasses}>
			{props.type === 'input' && (
				<FieldInput
					key={props.key}
					label={props.label}
					maximum={props.maximum}
					minimum={props.minimum}
					placeholder={props.placeholder}
					value={props.value}
					onChange={props.onChange}
				/>
			)}
		</div>
	)
}
