import { FileUploader } from 'react-drag-drop-files'
import { Button } from '../ui'
import { Check, Upload } from 'lucide-react'

type UploadFieldProps = {
	type: {
		value: string
		label: string
	}
	index: number
	handleFileChange: (files: File, index: number) => void
	fileDataList: {
		QuoteNo: string
		IdType: string
		Id: string
		SectionId: string
		InsuranceId: string
		RiskId: string
		LocationId: string
		LocationName: string
		ProductId: string
		UploadedBy: string
		file: File | null
		MandatoryStatus: string
		isUploaded: boolean
	}[]
	uploadDocument: (index: number, docType: string) => void
}

export default function UploadField(props: UploadFieldProps) {
	const fileData = props.fileDataList[props.index]
	const fileName =
		fileData && fileData.file ? props.type.label + ' - ' + fileData.file.name : props.type.label
	return (
		<div
			key={props.type.label}
			className='flex w-full flex-row items-center justify-between gap-2 rounded-lg border border-gray-850 px-2 py-4'>
			<FileUploader
				classes='flex flex-grow flex-row items-center justify-start gap-3'
				id='fileUpload'
				label='Drag and Drop Files Here'
				name='file'
				handleChange={(file: File) => {
					props.handleFileChange(file, props.index)
				}}>
				{props.fileDataList[props.index].isUploaded ? (
					<div className='flex items-center justify-center'>
						<div className='flex h-6 w-6 items-center justify-center rounded-full bg-green-200'>
							<Check
								color='white'
								height={16}
								width={16}
							/>
						</div>
					</div>
				) : (
					<div>
						<Upload
							height={24}
							strokeWidth={1}
							width={24}
						/>
					</div>
				)}
				<div className='flex flex-col'>
					<h3 className='text-sm font-bold md:text-base'>
						<h3>
							{fileName}
							{props.fileDataList[props.index].MandatoryStatus === 'Y' && (
								<span className='text-red-500'>*</span>
							)}
						</h3>
					</h3>
					<h3 className='text-[11px] sm:text-xs'>
						Upload or Drag/Drop a files (within Limit 10 MB)
					</h3>
				</div>
			</FileUploader>
			{props.fileDataList[props.index].isUploaded ? (
				<div className='flex h-8 items-center rounded-3xl bg-green-200 px-4 py-1 md:px-7'>
					<span className='text-sm font-semibold text-white'>Uploaded</span>
				</div>
			) : (
				<Button
					className='h-8 rounded-3xl px-4 py-1 text-sm md:px-7'
					variant='bluebtn'
					onClick={() => {
						props.uploadDocument(props.index, props.type.value)
					}}>
					Upload
				</Button>
			)}
		</div>
	)
}
