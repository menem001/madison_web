import { Button, Input } from '../ui'
import { Label } from '../ui/label'
import { FormFieldLayout } from './form-field-layout'

type personalInformationFieldProps = {
	current: number
	pos: number
	goNext: () => void
	goSpecific: (num: number) => void
}

export function PersonalInformationField(props: personalInformationFieldProps) {
	return (
		<FormFieldLayout
			current={props.current}
			done={props.current > 1}
			goSpecific={props.goSpecific}
			pos={props.pos}
			show={props.current === 1}
			subTitle='Additional information around Step 1'
			title='Step 1 - Personal Information'>
			<>
				<div className='flex w-full flex-row gap-8'>
					<div className='max-w-20'>
						<Label htmlFor='title'>Title</Label>
						<Input
							className='border-blue-925 border-2'
							id='title'
							placeholder='Title'
						/>
					</div>
					<div className='flex-grow'>
						<Label htmlFor='name'>Name</Label>
						<Input
							className='border-blue-925 border-2'
							id='name'
							placeholder='Name'
						/>
					</div>
					<div className='flex-grow'>
						<Label htmlFor='category'>Socio-professional category</Label>
						<Input
							className='border-blue-925 border-2'
							id='category'
							placeholder='Socio-professional category'
						/>
					</div>
				</div>
				<div className='flex w-full flex-row gap-8'>
					<div className='flex-grow'>
						<Label htmlFor='gender'>Gender</Label>
						<Input
							className='border-blue-925 border-2'
							id='gender'
							placeholder='Gender'
						/>
					</div>
					<div className='flex-grow'>
						<Label htmlFor='Civility'>Civility</Label>
						<Input
							className='border-blue-925 border-2'
							id='Civility'
							placeholder='Civility'
						/>
					</div>
				</div>
				<div className='flex w-full flex-row gap-8'>
					<div className='flex-grow'>
						<Label htmlFor='job'>Job</Label>
						<Input
							className='border-blue-925 border-2'
							id='job'
							placeholder='Job'
						/>
					</div>
					<div className='flex-grow'>
						<Label htmlFor='Nationality'>Nationality</Label>
						<Input
							className='border-blue-925 border-2'
							id='Nationality'
							placeholder='Nationality'
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
