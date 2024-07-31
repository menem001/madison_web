import { Button, Input } from '../ui'
import { Label } from '../ui/label'
import { FormFieldLayout } from './form-field-layout'

type energySpecificationFieldProps = {
	current: number
	pos: number
	goNext: () => void
	goSpecific: (num: number) => void
}

export function EnergySpecificationField(props: energySpecificationFieldProps) {
	return (
		<FormFieldLayout
			current={props.current}
			done={props.current > 3}
			goSpecific={props.goSpecific}
			pos={props.pos}
			show={props.current === 3}
			subTitle='Additional information around Step 3'
			title='Step 3 - Engine Specifications'>
			<>
				<div className='flex w-full flex-row gap-8'>
					<div className='flex-grow'>
						<Label htmlFor='displacement'>Displacement in cm3</Label>
						<Input
							className='border-2 border-blue-925'
							id='displacement'
							placeholder='Displacement in cm3'
						/>
					</div>
					<div className='flex-grow'>
						<Label htmlFor='cylinder'>Cylinder number</Label>
						<Input
							className='border-2 border-blue-925'
							id='cylinder'
							placeholder='Cylinder number'
						/>
					</div>
				</div>
				<div className='flex w-full flex-row gap-8'>
					<div className='w-1/2 flex-grow'>
						<Label htmlFor='energy'>Energy</Label>
						<Input
							className='border-2 border-blue-925'
							id='energy'
							placeholder='Select your energy'
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
