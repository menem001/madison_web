import { Button, Input } from '../ui'
import { Label } from '../ui/label'
import { FormFieldLayout } from './form-field-layout'

type identificationDetailsFieldProps = {
	current: number
	pos: number
	goNext: () => void
	goSpecific: (num: number) => void
}

export function IdentificationDetailsField(props: identificationDetailsFieldProps) {
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
				<div className='flex w-full flex-row gap-8'>
					<div className='flex-grow'>
						<Label htmlFor='type'>ID Type</Label>
						<Input
							className='border-blue-925 border-2'
							id='type'
							placeholder='ID Type'
						/>
					</div>
				</div>
				<div className='flex w-full flex-row gap-8'>
					<div className='flex-grow'>
						<Label htmlFor='number'>ID Number</Label>
						<Input
							className='border-blue-925 border-2'
							id='number'
							placeholder='Enter ID Number'
						/>
					</div>
					<div className='flex-grow'>
						<Label htmlFor='expdate'>ID Expiration Date</Label>
						<Input
							className='border-blue-925 border-2'
							id='expdate'
							placeholder='DD/MM/YY'
						/>
					</div>
				</div>
				<Button
					className='w-32'
					variant='bluebtn'
					onClick={props.goNext}>
					Continue
				</Button>
			</>
		</FormFieldLayout>
	)
}
