'use client'

import {
	useGetDocumentTypeMutation,
	useUploadDocsMutation,
	useViewQuoteMutation
} from '@/redux/api/commonApi'
import { Button } from '../ui'
import { FormFieldLayout } from './form-field-layout'
import { FileUploader } from 'react-drag-drop-files'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/redux/hooks'

type UploadDocumentsFormProps = {
	current: number
	pos: number
	goNext: () => void
	goSpecific: (num: number) => void
}

export function UploadDocumentsForm(props: UploadDocumentsFormProps) {
	const [documentTypeList] = useGetDocumentTypeMutation()
	const [viewQuote] = useViewQuoteMutation()
	const [uploadDocs] = useUploadDocsMutation()

	const [docTypesList, setDocTypesList] = useState<{ value: string; label: string }[]>([])

	const appData = useAppSelector((state) => state.apps)
	const sectionID = useAppSelector((state) => state.carInsurance.classID)
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const QuoteNo = useAppSelector((state) => state.motor.QuoteNo)

	const [fileDataList, setFileDataList] = useState<
		{
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
			isUploaded: boolean
		}[]
	>([])

	function handleFileChange(files: File, index: number) {
		const newList = [...fileDataList]
		newList[index].file = files
		setFileDataList(newList)
	}

	function getTheDocumentTypes(riskID: string) {
		const request = {
			InsuranceId: appData.insuranceID,
			ProductId: appData.productId,
			SectionId: sectionID
		}
		const res = documentTypeList(request)
		res.then((value) => {
			if (value.data?.type === 'success' && value.data.data !== undefined) {
				const tempArr: { value: string; label: string }[] = []
				const tempFileArray: {
					QuoteNo: string
					Id: string
					IdType: string
					SectionId: string
					InsuranceId: string
					RiskId: string
					LocationId: string
					LocationName: string
					ProductId: string
					UploadedBy: string
					file: File | null
					isUploaded: boolean
				}[] = []
				value.data.data.Result.map((value) => {
					tempArr.push({
						value: value.Code,
						label: value.CodeDesc
					})
					tempFileArray.push({
						QuoteNo: QuoteNo,
						IdType: 'REGISTER_NUMBER',
						Id: vehicleData.registrationNumber,
						SectionId: sectionID,
						InsuranceId: appData.insuranceID,
						RiskId: riskID,
						LocationId: '1',
						LocationName: 'Motor',
						ProductId: appData.productId,
						UploadedBy: appData.loginId,
						file: null,
						isUploaded: false
					})
				})
				setDocTypesList(tempArr)
				setFileDataList(tempFileArray)
			}
		})
	}

	useEffect(() => {
		const request = {
			QuoteNo: QuoteNo
		}
		const res = viewQuote(request)
		res.then((value) => {
			if (value.data?.type === 'success' && value.data.data !== undefined) {
				getTheDocumentTypes(value.data.data.Result.RiskDetails[0].RiskId)
			}
		})
	}, [QuoteNo, vehicleData.registrationNumber])

	function uploadDocument(index: number, docType: string) {
		const curData = fileDataList[index]
		const fd = new FormData()
		const newData = fileDataList

		if (curData.file !== null) {
			const request = {
				QuoteNo: curData.QuoteNo,
				Id: curData.Id,
				IdType: curData.IdType,
				SectionId: curData.SectionId,
				InsuranceId: curData.InsuranceId,
				DocumentId: docType,
				RiskId: curData.RiskId,
				LocationId: curData.LocationId,
				LocationName: curData.LocationName,
				ProductId: curData.ProductId,
				FileName: curData.file.name,
				OriginalFileName: curData.file.name,
				UploadedBy: curData.UploadedBy
			}
			fd.append('File', curData.file)
			fd.append('Req', JSON.stringify(request))

			const res = uploadDocs(fd)
			res.then(() => {
				newData[index].isUploaded = true
				setFileDataList(newData)
			})
		}
	}

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
					{docTypesList.map((type, index) => {
						return (
							<div
								key={type.label}
								className='flex w-full flex-row items-center justify-between gap-2'>
								<FileUploader
									id='fileUpload'
									label='Drag and Drop Files Here'
									name='file'
									handleChange={(file: File) => {
										handleFileChange(file, index)
									}}>
									<div
										key={type.label}
										className='flex flex-grow flex-row items-center justify-between lg:min-w-[45vw]'>
										<div className='flex flex-col'>
											<h3 className='font-bold'>
												{type.label}
												<span>
													{fileDataList[index].file !== null &&
														' - ' + fileDataList[index].file.name}
												</span>
											</h3>
											<h3 className='text-xs'>upload .pdf, .jped, .png</h3>
										</div>
										<div className='rounded-xl border border-gray-500 p-1 text-sm'>
											Select
										</div>
									</div>
								</FileUploader>
								{fileDataList[index].isUploaded ? (
									<span>Uploaded</span>
								) : (
									<Button
										className='p-1 text-sm'
										variant='whiteBlackOutlined'
										onClick={() => {
											uploadDocument(index, type.value)
										}}>
										Submit
									</Button>
								)}
							</div>
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
