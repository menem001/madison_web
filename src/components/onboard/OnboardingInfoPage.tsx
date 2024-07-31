'use client'

import { FileUploader } from 'react-drag-drop-files'
import OnboardingLayout from './OnboardingLayout'
import { CloudUpload, Info, X } from 'lucide-react'
import { Label } from '../ui/label'
import { Button, Input } from '../ui'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { type WhiteBookResponse } from '@/services/models/common.models'
import ClipLoader from 'react-spinners/ClipLoader'
import { useAppDispatch } from '@/redux/hooks'
import { storeWhiteBookData } from '@/redux/slices/whitebook-details-slice'
import {
	useGetRegistrationDetailsMutation,
	useGetRegistrationTokenQuery,
	useGetVehicleListQuery
} from '@/redux/api/registrationApi'
import { useGuestLoginMutation } from '@/redux/api/commonApi'
import { setGuestLoginDetails } from '@/redux/slices'
import { skipToken } from '@reduxjs/toolkit/query'

export default function OnboardingInfoPage() {
	const route = useRouter()

	const dispatch = useAppDispatch()

	const [file, setFile] = useState<File | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const [registrationNumber, setRegistrationNumber] = useState<string>('')

	const [shouldFetch, setShouldFetch] = useState(false)

	const [guestLogin] = useGuestLoginMutation()

	const { data: TokenData, refetch } = useGetRegistrationTokenQuery()

	const [token, setToken] = useState<string>('')

	const [getRegistrationDetails] = useGetRegistrationDetailsMutation()
	const [req, setReq] = useState<{ RegNo: string }>({
		RegNo: ''
	})
	const { data: vehicleDetails } = useGetVehicleListQuery(shouldFetch ? req : skipToken)

	const [showError, setShowError] = useState<boolean>(false)

	function loginAsGuest() {
		const res = guestLogin()
		res.then((value) => {
			if (value.data?.type === 'success' && value.data?.data !== undefined) {
				const details = {
					token: value.data.data.Result.Token,
					loginId: value.data.data.Result.LoginId,
					userType: value.data.data.Result.UserType,
					subUserType: value.data.data.Result.SubUserType,
					brokerCode: value.data.data.Result.LoginBranchDetails[0].BrokerBranchCode,
					insuranceID: value.data.data.Result.LoginBranchDetails[0].InsuranceId,
					branchCode: value.data.data.Result.LoginBranchDetails[0].BranchCode,
					productId: value.data.data.Result.BrokerCompanyProducts[0].ProductId,
					CustomerCode: value.data.data.Result.CustomerCode,
					agencyCode: value.data.data.Result.OaCode
				}
				dispatch(setGuestLoginDetails(details))
			}
		}).then(() => {
			if (!TokenData) {
				refetch()
			}
		})
	}

	useEffect(() => {
		loginAsGuest()
	}, [])

	useEffect(() => {
		setReq({
			RegNo: registrationNumber
		})
	}, [registrationNumber])

	useEffect(() => {
		if (
			TokenData?.type === 'success' &&
			TokenData.data &&
			TokenData.data?.Result.length !== 0
		) {
			const tokenid = TokenData.data?.Result[0].token
			setToken(tokenid)
		}
	}, [TokenData])

	function getDataInserted() {
		if (token !== '' && registrationNumber.length === 9) {
			const request = {
				RegNo: registrationNumber,
				RequestToken: token
			}
			const res = getRegistrationDetails(request)
			res.then((value) => {
				if (
					value.data?.type === 'success' &&
					value.data?.data !== undefined &&
					value.data.data.Result === 'Inserted Successfully......'
				) {
					setShouldFetch(true)
				} else if (
					value.data?.type === 'success' &&
					value.data?.data !== undefined &&
					value.data.data.Result ===
						'Vehicle record was not found. Please contact the RTSA Call Centre to resolve this.'
				) {
					setShowError(true)
				}
			})
		}
	}

	useEffect(() => {
		if (
			vehicleDetails?.type === 'success' &&
			vehicleDetails.data &&
			vehicleDetails.data.Result.length !== 0
		) {
			const result = vehicleDetails.data.Result[0]
			dispatch(
				storeWhiteBookData({
					Class: '',
					Colour: result.Color,
					CustomsClearanceNumber: '',
					EngineCapacity: '',
					EngineNumber: result.EngineNo,
					FirstRegistrationDate: result.FirstRegDate,
					GVMkg: '',
					InterpolNumber: '',
					Make: result.MakeName,
					Model: result.ModelName,
					ModelNumber: '',
					NetWeight: '',
					PropelledBy: '',
					RegistrationAuthority: '',
					RegistrationMark: result.Registration_No,
					SeatingCapacity: result.NumberOfSeats === null ? '' : result.NumberOfSeats,
					VehicleCategory: result.BodyType,
					VINChassisNumber: result.ChassisNo,
					YearOfMake: result.YearMake,
					CurrentLinenseExpDate: result.CurrentLinenseExpDate
				})
			)
			setShouldFetch(false)
			route.push('/car-insurance/1')
		}
	}, [vehicleDetails])

	function getMotorDetails() {
		if (file === null && registrationNumber === '') {
			alert('Upload your WhiteBook or registrationNumber to autoFill')
		} else if (file === null && registrationNumber.length === 9) {
			getDataInserted()
		} else if (file !== null) {
			setIsLoading(true)
			const request = new FormData()
			request.append('file', file)
			axios
				.post<WhiteBookResponse>(
					'http://13.201.115.50/api/V1/whitebook_parser/parse_user_vehicle_info/',
					request
				)
				.then((response) => {
					if (response.data) {
						dispatch(
							storeWhiteBookData({
								Class: response.data.Class,
								Colour: response.data.Colour,
								CustomsClearanceNumber: response.data['Customs Clearance Number'],
								EngineCapacity: response.data['Engine Capacity'],
								EngineNumber: response.data['Engine Number'],
								FirstRegistrationDate: response.data['First Registration Date'],
								GVMkg: response.data['GVM kg'],
								InterpolNumber: response.data['Interpol Number'],
								Make: response.data.Make,
								Model: response.data.Model,
								ModelNumber: response.data['Model Number'],
								NetWeight: response.data['Net Weight'],
								PropelledBy: response.data['Propelled By'],
								RegistrationAuthority: response.data['Registration Authority'],
								RegistrationMark: response.data['Registration Mark'],
								SeatingCapacity:
									response.data['Seating Capacity'] === null
										? ''
										: response.data['Seating Capacity'],
								VehicleCategory: response.data['Vehicle Category'],
								VINChassisNumber: response.data['VIN/Chassis Number'].replace(
									' ',
									''
								),
								YearOfMake: response.data['Year Of Make'],
								CurrentLinenseExpDate: ''
							})
						)
						setIsLoading(false)
						route.push('/car-insurance/1')
					}
				})
				.catch((err) => {
					alert(err)
					setIsLoading(false)
				})
		}
	}

	return (
		<OnboardingLayout>
			<div className='flex h-full w-full items-center justify-center'>
				<div className='flex h-full flex-col items-center justify-center gap-6 px-6 py-6 font-roboto lg:items-start lg:gap-12 lg:py-0 lg:pr-10'>
					<div className='flex flex-col items-center justify-around gap-10 font-roboto'>
						<div className='flex flex-col items-center gap-6'>
							<h1 className='text-3xl font-medium lg:text-4xl'>
								Apply a Insurance in 2 Mins
							</h1>
							<div className='relative mr-auto w-3/4 border-4 border-blue-300'></div>
							<span className='max-w-[340px] text-center'>
								Upload your Whitebook or registration number
							</span>
						</div>
						<div className='flex flex-col gap-3'>
							<FileUploader
								classes='w-full rounded-md border-blue-450 border-dashed border-2 flex flex-col gap-2 items-center justify-center font-jakarta py-6'
								id='fileUpload'
								label='Drag and Drop Files Here'
								name='file'
								handleChange={(file: File) => {
									setFile(file)
								}}>
								<CloudUpload
									color='#1849D6'
									height={36}
									strokeWidth={2}
									width={36}
								/>
								{file === null ? (
									<h3 className='text-sm font-semibold'>
										Drag your file(s) or{' '}
										<span className='text-blue-450'>browse</span>
									</h3>
								) : (
									<h3 className='flex items-center gap-2 text-sm font-semibold'>
										<span className='text-blue-450'>{file.name}</span>
										<div
											className='cursor-pointer'
											onClick={() => {
												setFile(null)
											}}>
											<X
												height={14}
												width={14}
											/>
										</div>
									</h3>
								)}
								<h4 className='text-sm text-gray-435'>Upload your Whitebook</h4>
							</FileUploader>
							<div className='flex flex-row items-center gap-2'>
								<Info
									color='#337AB7'
									height={16}
									width={16}
								/>
								<p className='font-roboto text-xs text-gray-800'>
									Disclaimer : The below filled information are auto-generated by
									AI, to continue please check once
								</p>
							</div>
						</div>
					</div>
					<div className='flex w-full items-center justify-center opacity-50'>
						<div className='relative w-full border-t border-green-50'>
							<span className='absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 transform bg-white px-2 font-roboto font-semibold'>
								Or
							</span>
						</div>
					</div>
					<div className='flex w-full flex-col items-center justify-around gap-10 font-roboto'>
						<div className='flex w-full flex-col gap-1'>
							<Label htmlFor='registrationNo'>Registration number</Label>
							<Input
								className='w-full'
								disabled={file !== null}
								id='registrationNo'
								placeholder='Enter your registration number'
								onChange={(e) => {
									setRegistrationNumber(e.target.value)

									if (showError) {
										setShowError(false)
									}
								}}
							/>
							{showError && (
								<div className='font-roboto text-xs text-red-500'>
									Vehicle record was not found. Please contact the RTSA Call
									Centre to resolve this. Enter a valid RegistrationID
								</div>
							)}
							<div className='flex flex-row items-center gap-2'>
								<Info
									color='#337AB7'
									height={14}
									width={14}
								/>
								<p className='font-roboto text-xs text-gray-800'>
									Enter your existing policy number to access your account within
									single click
								</p>
							</div>
						</div>
					</div>
					<Button
						className='w-full'
						variant='bluebtn'
						onClick={getMotorDetails}>
						{isLoading ? (
							<ClipLoader
								color='#FFFFFF'
								size={20}
							/>
						) : (
							<span>Submit</span>
						)}
					</Button>
				</div>
			</div>
		</OnboardingLayout>
	)
}
