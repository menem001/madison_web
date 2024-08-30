'use client'

import {
	useGetDocumentTypeMutation,
	useUploadDocsMutation,
	useViewQuoteMutation
} from '@/redux/api/commonApi'
import { Button } from '../ui'
import { FormFieldLayout } from './form-field-layout'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/redux/hooks'
import UploadField from './upload-field'
import { Minus, Plus } from 'lucide-react'

type UploadDocumentsFormProps = {
	current: number
	pos: number
	goNext: () => void
	goSpecific: (num: number) => void
}

type FileDataListType = {
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
	MandatoryStatus: string
	isUploaded: boolean
}[]

export function UploadVehileDocumentsForm(props: UploadDocumentsFormProps) {
	const [documentTypeList] = useGetDocumentTypeMutation()
	const [viewQuote] = useViewQuoteMutation()
	const [uploadDocs] = useUploadDocsMutation()

	const [docTypesList, setDocTypesList] = useState<{ value: string; label: string }[]>([])

	const appData = useAppSelector((state) => state.apps)
	const sectionID = useAppSelector((state) => state.carInsurance.classID)
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const QuoteNo = useAppSelector((state) => state.motor.QuoteNo)

	const [defaultLength, setDefaultLength] = useState<number>(0)

	const [fileDataList, setFileDataList] = useState<FileDataListType>([])
	const [isAllFilled, setIsAllFilled] = useState<boolean>(false)

	const [riskId, setRiskId] = useState<string>('')

	function handleFileChange(files: File, index: number) {
		const newList = [...fileDataList]
		newList[index].file = files
		setFileDataList(newList)
	}

	function addId(label: string) {
		const baseMatch = label.match(/^\D+/)
		const baseLabel = baseMatch !== null ? baseMatch[0] : ''
		let maxNumber = 0

		docTypesList.forEach((label) => {
			if (label.label.startsWith(baseLabel)) {
				const suffix = label.label.slice(baseLabel.length)

				if (!isNaN(+suffix) && suffix !== '') {
					const number = parseInt(suffix, 10)

					if (number > maxNumber) {
						maxNumber = number
					}
				}
			}
		})

		const newLabel = baseLabel + (maxNumber + 1)

		setDocTypesList((prev) => [...prev, { value: '', label: newLabel }])
		setFileDataList((prev) => [
			...prev,
			{
				QuoteNo: QuoteNo,
				IdType: 'REGISTER_NUMBER',
				Id: vehicleData.registrationNumber,
				SectionId: sectionID,
				InsuranceId: appData.insuranceID,
				RiskId: riskId,
				LocationId: '1',
				LocationName: 'Motor',
				ProductId: appData.productId,
				UploadedBy: appData.loginId,
				file: null,
				MandatoryStatus: 'N',
				isUploaded: false
			}
		])
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
				const tempFileArray: FileDataListType = []
				setDefaultLength(value.data.data.Result.length)
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
						MandatoryStatus: value.MandatoryStatus,
						isUploaded: false
					})
				})
				setDocTypesList(tempArr)
				setFileDataList(tempFileArray)
			}
		})
	}

	function removeId(index: number) {
		setDocTypesList((prevDetails) => prevDetails.filter((_, i) => i !== index))
		setFileDataList((prevDetails) => prevDetails.filter((_, i) => i !== index))
	}

	useEffect(() => {
		const request = {
			QuoteNo: QuoteNo
		}
		const res = viewQuote(request)
		res.then((value) => {
			if (value.data?.type === 'success' && value.data.data !== undefined) {
				getTheDocumentTypes(value.data.data.Result.RiskDetails[0].RiskId)
				setRiskId(value.data.data.Result.RiskDetails[0].RiskId)
			}
		})
	}, [QuoteNo, vehicleData.registrationNumber])

	function uploadDocument(index: number, docType: string) {
		const curData = fileDataList[index]
		const fd = new FormData()

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
			res.then((value) => {
				if (
					value.data?.type === 'success' &&
					value.data.data?.Result === 'File Upload Sucessfully'
				) {
					setFileDataList((prevList) =>
						prevList.map((file, i) =>
							i === index ? { ...file, isUploaded: true } : file
						)
					)
				} else {
					alert('Upload has failed. Please try again')
				}
			})
		}
	}

	function allFilesUploaded(fileDataList: FileDataListType): boolean {
		const mandatoryList = fileDataList.filter((files) => {
			return files.MandatoryStatus === 'Y'
		})
		return mandatoryList.every((file) => file.isUploaded)
	}

	useEffect(() => {
		const isFilled = allFilesUploaded(fileDataList)
		setIsAllFilled(isFilled)
	}, [fileDataList])

	return (
		<FormFieldLayout
			current={props.current}
			done={props.current > props.pos}
			goSpecific={props.goSpecific}
			pos={props.pos}
			show={props.current === props.pos}
			subTitle='Additional information around Step 3'
			title='Step 3 - Upload Vehicle Document'>
			<>
				{sectionID === '3' && fileDataList.length === 0 ? (
					<h2>No Vehicle Documents Required for TPO</h2>
				) : (
					<div className='flex flex-col gap-3 font-inter'>
						{docTypesList.map((type, index) => {
							return (
								<div
									key={index}
									className='flex flex-row items-center gap-2'>
									<UploadField
										key={index}
										fileDataList={fileDataList}
										handleFileChange={handleFileChange}
										index={index}
										type={type}
										uploadDocument={uploadDocument}
									/>
									<Button
										className='px-2 py-1'
										size='sm'
										type='button'
										variant='bluebtn'
										onClick={() => {
											addId(type.label)
										}}>
										<Plus
											size={16}
											strokeWidth={4}
										/>
									</Button>
									{defaultLength < index + 1 && (
										<Button
											className='px-2 py-1'
											size='sm'
											type='button'
											variant='bluebtn'
											onClick={() => {
												removeId(index)
											}}>
											<Minus
												size={16}
												strokeWidth={4}
											/>
										</Button>
									)}
								</div>
							)
						})}
					</div>
				)}
				{isAllFilled && (
					<Button
						className='w-32'
						variant='bluebtn'
						onClick={props.goNext}>
						Continue
					</Button>
				)}
			</>
		</FormFieldLayout>
	)
}
