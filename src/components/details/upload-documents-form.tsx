import { Button, Input } from '../ui'
import { Label } from '../ui/label'
import { FormFieldLayout } from './form-field-layout'

type UploadDocumentsFormProps = {
	current: number
	pos: number
	goNext: () => void
	goSpecific: (num: number) => void
}

export function UploadDocumentsForm(props: UploadDocumentsFormProps) {
	return (
		<FormFieldLayout
			current={props.current}
			done={props.current > 2}
			goSpecific={props.goSpecific}
			pos={props.pos}
			show={props.current === 2}
			subTitle='Additional information around Step 3'
			title='Step 3 - Upload Document'>
			<>
				<div className='flex w-full flex-row gap-8'>
					<div className='flex-grow'>
						<Label htmlFor='number'>New Value</Label>
						<Input
							className='border-2 border-blue-925'
							id='number'
							placeholder='New Value'
						/>
					</div>
					<div className='flex-grow'>
						<Label htmlFor='market'>Market Value</Label>
						<Input
							className='border-2 border-blue-925'
							id='market'
							placeholder='Enter Market Value'
						/>
					</div>
				</div>
				<div className='flex w-full flex-row gap-8'>
					<div className='flex-grow'>
						<Label htmlFor='aggregated'>Aggregated value</Label>
						<Input
							className='border-2 border-blue-925'
							id='aggregated'
							placeholder='Aggregated value'
						/>
					</div>
					<div className='flex-grow'>
						<Label htmlFor='area'>Traffic area</Label>
						<Input
							className='border-2 border-blue-925'
							id='area'
							placeholder='Traffic area'
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
