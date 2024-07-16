import { Input } from '../ui'
import { Label } from '../ui/label'
import { FormFieldLayout } from './form-field-layout'

type additionalVehicleInfoProps = {
	current: number
	pos: number
	goNext: () => void
	goSpecific: (num: number) => void
}

export function AdditionalVehicleInfo(props: additionalVehicleInfoProps) {
	return (
		<FormFieldLayout
			current={props.current}
			done={props.current > 4}
			goSpecific={props.goSpecific}
			pos={props.pos}
			show={props.current === 4}
			subTitle='Additional information around Step 4'
			title='Step 4 - Additional Information'>
			<>
				<div className='flex w-full flex-row gap-8'>
					<div className='flex-grow'>
						<Label htmlFor='number'>Serial number</Label>
						<Input
							className='border-blue-925 border-2'
							id='number'
							placeholder='Serial number'
						/>
					</div>
					<div className='flex-grow'>
						<Label htmlFor='card'>Number of cards (WW Garage)</Label>
						<Input
							className='border-blue-925 border-2'
							id='card'
							placeholder='Number of cards (WW Garage)'
						/>
					</div>
				</div>
				<div className='flex w-full flex-row gap-8'>
					<div className='flex-grow'>
						<Label htmlFor='circulation'>Date of circulation</Label>
						<Input
							className='border-blue-925 border-2'
							id='circulation'
							placeholder='DD/MM/YYYY'
						/>
					</div>
					<div className='flex-grow'>
						<Label htmlFor='zone'>Tariff zone</Label>
						<Input
							className='border-blue-925 border-2'
							id='zone'
							placeholder='Tariff zone'
						/>
					</div>
				</div>
			</>
		</FormFieldLayout>
	)
}
