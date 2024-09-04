import { type ChangeEvent } from 'react'
import { FieldInput } from './field-input'
import { FieldFormInput } from './field-form-input'
import { FieldFormSelect } from './field-form-select'

type FormFieldJson = {
	key: string
	styleClasses: string
	type: string
	label: string
	placeholder: string
	value: unknown
	maximum: null | number
	minimum: number
	onChange: (e: ChangeEvent<HTMLInputElement> | string) => void
	isForm: boolean
	form?: unknown
	disabled?: boolean
	formName?: string
	itemsList?: { value: string; label: string }[]
}

export function FormFieldJson(props: FormFieldJson) {
	return (
		<div className={props.styleClasses}>
			{props.type === 'input' && !props.isForm && (
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
			{props.type === 'input' && props.isForm && (
				<FieldFormInput
					key={props.key}
					form={props.form}
					formName={props.formName}
					label={props.label}
					maximum={props.maximum}
					minimum={props.minimum}
					placeholder={props.placeholder}
					value={props.value}
					onChange={props.onChange}
				/>
			)}
			{props.type === 'select' && props.isForm && (
				<FieldFormSelect
					key={props.key}
					disabled={props.disabled}
					form={props.form}
					formName={props.formName}
					itemsList={props.itemsList}
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
