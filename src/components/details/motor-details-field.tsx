import { Button, Input } from '../ui'
import { Label } from '../ui/label'
import { FormFieldLayout } from './form-field-layout'

type motorDetailsFieldProps = {
	current: number
	pos: number
	goNext: () => void
	goSpecific: (num: number) => void
}

export function MotorDetailsField(props: motorDetailsFieldProps) {
	return (
		<FormFieldLayout
			current={props.current}
			done={props.current > 1}
			goSpecific={props.goSpecific}
			pos={props.pos}
			show={props.current === 1}
			subTitle='Additional information around Step 1'
			title='Step 1 - Motor Details'>
			<>
				<div className='flex w-full flex-row gap-8'>
					<div className='flex-grow'>
						<Label htmlFor='number'>Registration number</Label>
						<Input
							className='border-blue-925 border-2'
							id='number'
							placeholder='Enter Registration number'
						/>
					</div>
					<div className='flex-grow'>
						<Label htmlFor='chassis'>Chassis number</Label>
						<Input
							className='border-blue-925 border-2'
							id='chassis'
							placeholder='Enter Chassis number'
						/>
					</div>
				</div>
				<div className='flex w-full flex-row gap-8'>
					<div className='flex-grow'>
						<Label htmlFor='category'>Category</Label>
						<Input
							className='border-blue-925 border-2'
							id='category'
							placeholder='Category'
						/>
					</div>
					<div className='flex-grow'>
						<Label htmlFor='capacity'>Seat capcity</Label>
						<Input
							className='border-blue-925 border-2'
							id='capacity'
							placeholder='Enter Seat capcity'
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
