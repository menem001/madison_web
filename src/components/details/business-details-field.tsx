'use client'
import { useState } from 'react'
import { Button, Input } from '../ui'
import { Label } from '../ui/label'
import { FormFieldLayout } from './form-field-layout'
import { cn } from '@/lib'

type businessDetailsFieldProps = {
	current: number
	pos: number
	goNext: () => void
	goSpecific: (num: number) => void
}

export function BusinessDetailsField(props: businessDetailsFieldProps) {
	const [type, setType] = useState(1)

	return (
		<FormFieldLayout
			current={props.current}
			done={props.current > 3}
			goSpecific={props.goSpecific}
			pos={props.pos}
			show={props.current === 3}
			subTitle='Additional information around Step 3'
			title='Step 3 - Business Information'>
			<>
				<div className='flex w-full flex-row gap-8'>
					<div className='flex-grow'>
						<Label htmlFor='source'>Business Source</Label>
						<Input
							className='border-2 border-blue-925'
							id='source'
							placeholder='Source of Business '
						/>
					</div>
				</div>
				<div className='flex w-full flex-row gap-8'>
					<div className='flex-grow'>
						<Label htmlFor='number'>Person Type</Label>
						<div className='flex flex-row gap-4'>
							<div
								className={cn(
									'text-roboto cursor-pointer rounded-md border border-gray-900 px-4 py-2 text-gray-900',
									{
										'border-0 bg-blue-300 text-white': type === 1
									}
								)}
								onClick={() => {
									setType(1)
								}}>
								Personne Morale
							</div>
							<div
								className={cn(
									'text-roboto cursor-pointer rounded-md border border-gray-900 px-4 py-2 text-gray-900',
									{
										'border-0 bg-blue-300 text-white': type === 2
									}
								)}
								onClick={() => {
									setType(2)
								}}>
								Personne Physique
							</div>
						</div>
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
