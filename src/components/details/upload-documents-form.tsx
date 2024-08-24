'use client'

import { useGetDocumentTypeMutation, useUploadDocsMutation } from '@/redux/api/commonApi'
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

export function UploadDocumentsForm(props: UploadDocumentsFormProps) {
	const [documentTypeList] = useGetDocumentTypeMutation()
	const [uploadDocs] = useUploadDocsMutation()

	const [docTypesList, setDocTypesList] = useState<{ value: string; label: string }[]>([])

	const appData = useAppSelector((state) => state.apps)
	const QuoteNo = useAppSelector((state) => state.motor.QuoteNo)

	const [defaultLength, setDefaultLength] = useState<number>(0)

	const [fileDataList, setFileDataList] = useState<FileDataListType>([])
	const [isAllFilled, setIsAllFilled] = useState<boolean>(false)

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
				Id: 'ALL',
				SectionId: '99999',
				InsuranceId: appData.insuranceID,
				RiskId: '99999',
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

	function removeId(index: number) {
		setDocTypesList((prevDetails) => prevDetails.filter((_, i) => i !== index))
		setFileDataList((prevDetails) => prevDetails.filter((_, i) => i !== index))
	}

	function getTheDocumentTypes() {
		const request = {
			InsuranceId: appData.insuranceID,
			ProductId: appData.productId,
			SectionId: '99999'
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
						Id: 'ALL',
						SectionId: '99999',
						InsuranceId: appData.insuranceID,
						RiskId: '99999',
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

	useEffect(() => {
		getTheDocumentTypes()
	}, [QuoteNo])

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
			res.then((value) => {
				if (
					value.data?.type === 'success' &&
					value.data.data?.Result === 'File Upload Sucessfully'
				) {
					newData[index].isUploaded = true
					setFileDataList(newData)
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
		setIsAllFilled(allFilesUploaded(fileDataList))
	}, [fileDataList])

	return (
		<FormFieldLayout
			current={props.current}
			done={props.current > props.pos}
			goSpecific={props.goSpecific}
			pos={props.pos}
			show={props.current === props.pos}
			subTitle='Additional information around Step 3'
			title='Step 3 - Upload Document'>
			<>
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
									size='sm'
									type='button'
									variant='bluebtn'
									onClick={() => {
										addId(type.label)
									}}>
									<Plus />
								</Button>
								{defaultLength < index + 1 && (
									<Button
										size='sm'
										type='button'
										variant='bluebtn'
										onClick={() => {
											removeId(index)
										}}>
										<Minus />
									</Button>
								)}
							</div>
						)
					})}
				</div>
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
