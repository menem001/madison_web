import { Input } from '../ui'
import { Label } from '../ui/label'
import { FormFieldLayout } from './form-field-layout'

type contactInformationFieldProps = {
	current: number
	pos: number
	goNext: () => void
	goSpecific: (num: number) => void
}

export function ContactInformationField(props: contactInformationFieldProps) {
	return (
		<FormFieldLayout
			current={props.current}
			done={props.current > 5}
			goSpecific={props.goSpecific}
			pos={props.pos}
			show={props.current === 5}
			subTitle='Additional information around Step 5'
			title='Step 5 - Contact  Information'>
			<>
				<div className='flex w-full flex-row gap-8'>
					<div className='flex-grow'>
						<Label htmlFor='email'>Email ID</Label>
						<Input
							className='border-blue-925 border-2'
							id='email'
							placeholder='Enter Your Email ID'
							type='email'
						/>
					</div>
				</div>
				<div className='flex w-full flex-row gap-8'>
					<div className='flex-grow'>
						<Label htmlFor='type'>Contact Type</Label>
						<Input
							className='border-blue-925 border-2'
							id='type'
							placeholder='Contact Type'
						/>
					</div>
					<div className='flex-grow'>
						<Label htmlFor='code'>Contact Code</Label>
						<Input
							className='border-blue-925 border-2'
							id='code'
							placeholder='Contact Code'
						/>
					</div>
					<div className='flex-grow'>
						<Label htmlFor='contact'>Contact</Label>
						<Input
							className='border-blue-925 border-2'
							id='contact'
							placeholder='Enter Number'
						/>
					</div>
				</div>
			</>
		</FormFieldLayout>
	)
}
