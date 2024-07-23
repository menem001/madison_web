'use client'

import { Button } from '../ui'
import { FormFieldLayout } from './form-field-layout'
import { FileUploader } from 'react-drag-drop-files'

type UploadDocumentsFormProps = {
	current: number
	pos: number
	goNext: () => void
	goSpecific: (num: number) => void
}

export function UploadDocumentsForm(props: UploadDocumentsFormProps) {
	const docTypes = [
		{ label: 10, value: 'Placing Slip' },
		{ label: 2, value: 'Quote' },
		{ label: 22, value: 'Valuation Report' }
	]
	return (
		<FormFieldLayout
			current={props.current}
			done={props.current > 3}
			goSpecific={props.goSpecific}
			pos={props.pos}
			show={props.current === 3}
			subTitle='Additional information around Step 3'
			title='Step 3 - Upload Document'>
			<>
				<div className='flex flex-col gap-3 font-inter'>
					{docTypes.map((type) => {
						return (
							<FileUploader
								key={type.label}
								id='fileUpload'
								label='Drag and Drop Files Here'
								name='file'>
								<div
									key={type.label}
									className='flex flex-row items-center justify-between'>
									<div className='flex flex-col'>
										<h3 className='font-bold'>{type.value}</h3>
										<h3 className='text-xs'>upload .pdf, .jped, .png</h3>
									</div>
									<div className='rounded-xl border border-gray-500 p-2 text-sm'>
										Drag & Drop or Upload
									</div>
								</div>
							</FileUploader>
						)
					})}
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
