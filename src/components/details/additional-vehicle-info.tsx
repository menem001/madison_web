import { useAppSelector } from '@/redux/hooks'
import { Button, Input } from '../ui'
import { Label } from '../ui/label'
import { FormFieldLayout } from './form-field-layout'
import { useState } from 'react'
// import { cn } from '@/lib'
// import { updateAdditionalDetails } from '@/redux/slices'
import {
	// useGetBankListMutation,
	useSaveDriverMutation
	// useSaveMotorDetailsMutation
} from '@/redux/api/commonApi'
import { useToast } from '../ui/use-toast'
import {
	type SaveDriverRequest
	// type SaveMotorDetailRequest
} from '@/services/models/common.models'
import { Minus, Plus } from 'lucide-react'
// import { DriverDetails } from '../car/driver-details'
// import { updateDetails } from '@/redux/slices/motor-detail.slice'
// import { Skeleton } from '../ui/skeleton'

type additionalVehicleInfoProps = {
	current: number
	pos: number
	goNext: () => void
	goSpecific: (num: number) => void
}

export function AdditionalVehicleInfo(props: additionalVehicleInfoProps) {
	const QuoteNo = useAppSelector((state) => state.motor.QuoteNo)
	const reqRefNo = useAppSelector((state) => state.motor.RequestReferenceNo)

	// const [isLeased, setIsLeased] = useState<boolean>(vehicleData.leased)
	// const [bankName, setBankName] = useState<string>(vehicleData.bankName)
	// const [borrowerType, setBorrowerType] = useState<string>('')
	// const [firstLossPayeeName, setFirstLossPayeeName] = useState<string>('')

	const [driversDetails, setDriversDetails] = useState<
		{ driverName: string; driverLicense: string }[]
	>([{ driverName: '', driverLicense: '' }])

	// const [bankList, setBankList] = useState<{ value: string; label: string }[]>([])

	// const insuranceID = useAppSelector((state) => state.apps.insuranceID)
	// const branchCode = useAppSelector((state) => state.apps.branchCode)
	// const appData = useAppSelector((state) => state.apps)
	const customerData = useAppSelector((state) => state.customerDetails)

	const { toast } = useToast()

	// const [saveMotor] = useSaveMotorDetailsMutation()
	const [saveDriver] = useSaveDriverMutation()

	// const dispatch = useAppDispatch()
	// const [getBankList] = useGetBankListMutation()

	function onSubmit() {
		saveDriverDetails()

		// dispatch(
		// 	updateAdditionalDetails({
		// 		driverName: driverName,
		// 		driverID: driverLicense
		// 	})
		// )
		props.goNext()
	}

	function addDriver() {
		setDriversDetails((prevDetails) => [...prevDetails, { driverName: '', driverLicense: '' }])
	}

	function removeDriver(index: number) {
		setDriversDetails((prevDetails) => prevDetails.filter((_, i) => i !== index))
	}

	function saveDriverDetails() {
		const req: SaveDriverRequest = []

		driversDetails.forEach((driver) => {
			if (driver.driverLicense !== '' && driver.driverName !== '') {
				req.push({
					CreatedBy: customerData.name,
					DriverDob: '09/07/2006',
					DriverName: driver.driverName,
					DriverType: '1',
					LicenseNo: driver.driverLicense,
					QuoteNo: QuoteNo,
					RiskId: '1',
					RequestReferenceNo: reqRefNo,
					MaritalStatus: null,
					CountryId: null,
					StateId: null,
					CityId: null,
					AreaGroup: null,
					DriverExperience: null,
					LicenseIssueDt: null,
					Gender: null
				})
			}
		})

		const res = saveDriver(req)
		res.then((value) => {
			if (
				value.data?.type === 'success' &&
				value.data.data !== undefined &&
				value.data.data.IsError !== true &&
				value.data.data.Result !== null
			) {
				toast({
					variant: 'default',
					title: 'Driver Details Updated'
				})
			} else if (
				value.data?.type === 'success' &&
				value.data.data !== undefined &&
				value.data.data.IsError === true &&
				value.data.data.ErrorMessage !== null &&
				value.data.data.ErrorMessage.length !== 0
			) {
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: value.data.data.ErrorMessage[0].Message
				})
			}
		})
	}

	// function doSaveMotorDetails() {
	// 	const req: SaveMotorDetailRequest = {
	// 		CustomerName: customerData.name,
	// 		LoginId: appData.loginId,
	// 		SubUserType: appData.subUserType,
	// 		UserType: appData.userType,
	// 		ApplicationId: '1', //
	// 		CustomerReferenceNo: null,
	// 		RequestReferenceNo: null,
	// 		VehicleId: '1',
	// 		CreatedBy: appData.loginId,
	// 		InsuranceId: appData.insuranceID,
	// 		BranchCode: appData.branchCode,
	// 		BrokerBranchCode: appData.brokerCode,
	// 		SectionId: vehicleData.classID,
	// 		AgencyCode: appData.agencyCode,
	// 		ProductId: appData.productId,
	// 		SavedFrom: 'SQ',
	// 		MobileCode: customerData.code,
	// 		MobileNumber: customerData.mobile,
	// 		Chassisnumber: '',
	// 		Insurancetype: [appData.insuranceID],
	// 		InsuranceClass: vehicleData.classID,
	// 		Motorusage: vehicleData.vehicleUsage,
	// 		MotorusageId: vehicleData.vehicleUsageID,
	// 		Vehiclemake: vehicleData.mark,
	// 		VehiclemakeId: vehicleData.makeID,
	// 		VehicleModel: vehicleData.model,
	// 		VehcilemodelId: vehicleData.modelID,
	// 		VehicleValueType: null,
	// 		DefenceValue: null,
	// 		PurchaseDate: null,
	// 		Deductibles: null,
	// 		Inflation: null,
	// 		ManufactureYear: vehicleData.year + '',
	// 		Gpstrackinginstalled: 'N',
	// 		NcdYn: 'N',
	// 		VehicleType: vehicleData.bodyType,
	// 		VehicleTypeId: vehicleData.bodyTypeID,
	// 		CarAlarmYn: 'N',
	// 		PolicyStartDate: vehicleData.policyStartDate,
	// 		PolicyEndDate: vehicleData.policyEndDate,
	// 		CustomerCode: appData.CustomerCode,
	// 		BdmCode: appData.CustomerCode,
	// 		SourceTypeId: appData.userType,
	// 		SumInsured: vehicleData.value,
	// 		AcccessoriesSumInsured: vehicleData.AcccessoriesSumInsured,
	// 		ExchangeRate: vehicleData.exchangeRate,
	// 		Currency: vehicleData.currency,
	// 		HavePromoCode: 'N',
	// 		SearchFromApi: false,
	// 		SeatingCapacity: vehicleData.seat,
	// 		CustomerStatus: 'Y',
	// 		Status: 'Y',
	// 		CollateralYn: isLeased ? 'Y' : 'N',
	// 		BorrowerType: borrowerType === 'Individual' ? '1' : '2',
	// 		CollateralName: bankName,
	// 		FirstLossPayee: firstLossPayeeName
	// 	}
	// 	const res = saveMotor(req)
	// 	res.then((value) => {
	// 		if (
	// 			value.data?.type === 'success' &&
	// 			value.data.data !== undefined &&
	// 			value.data.data.IsError !== true &&
	// 			value.data.data.Result !== null
	// 		) {
	// 			dispatch(updatePremium(true))
	// 			dispatch(updateDetails(value.data.data.Result[0]))
	// 		} else if (
	// 			value.data?.type === 'success' &&
	// 			value.data.data !== undefined &&
	// 			value.data.data.IsError === true &&
	// 			value.data.data.ErrorMessage !== null &&
	// 			value.data.data.ErrorMessage.length !== 0
	// 		) {
	// 			toast({
	// 				variant: 'destructive',
	// 				title: 'Uh oh! Something went wrong.',
	// 				description: value.data.data.ErrorMessage[0].Message
	// 			})
	// 		} else {
	// 			toast({
	// 				variant: 'destructive',
	// 				title: 'Uh oh! Something went wrong.',
	// 				description: 'There was a problem with your request.'
	// 			})
	// 		}
	// 	})
	// }

	// useEffect(() => {
	// 	const req = { InsuranceId: insuranceID, BranchCode: branchCode }
	// 	const res = getBankList(req)
	// 	const tempArr: { value: string; label: string }[] = []
	// 	res.then((value) => {
	// 		if (
	// 			value.data?.type === 'success' &&
	// 			value.data.data &&
	// 			value.data.data.Result.length !== 0
	// 		) {
	// 			value.data.data.Result.map((value) => {
	// 				tempArr.push({
	// 					value: value.Code,
	// 					label: value.CodeDesc
	// 				})
	// 			})
	// 			setBankList(tempArr)
	// 		}
	// 	})
	// }, [])

	return (
		<FormFieldLayout
			current={props.current}
			done={props.current > 2}
			goSpecific={props.goSpecific}
			pos={props.pos}
			show={props.current === 2}
			subTitle='Additional information around Step 2'
			title='Step 2 - Driver details'>
			<>
				<div className='flex w-full flex-col gap-2 md:gap-8'>
					{driversDetails.map((driver, index) => {
						return (
							<div
								key={index}
								className='flex flex-row items-end gap-2 md:gap-8'>
								<div className='flex-grow'>
									<Label
										className='line-clamp-1'
										htmlFor='number'>
										Driver name
									</Label>
									<Input
										className='border-2 border-blue-925'
										id='number'
										placeholder='Driver Name'
										value={driver.driverName}
										onChange={(e) => {
											const updatedDrivers = [...driversDetails]
											updatedDrivers[index].driverName = e.target.value
											setDriversDetails(updatedDrivers)
										}}
									/>
								</div>
								<div className='flex-grow'>
									<Label
										className='line-clamp-1'
										htmlFor='card'>
										Driving license number
									</Label>
									<Input
										className='border-2 border-blue-925'
										id='card'
										placeholder='Driving license number'
										value={driver.driverLicense}
										onChange={(e) => {
											const updatedDrivers = [...driversDetails]
											updatedDrivers[index].driverLicense = e.target.value
											setDriversDetails(updatedDrivers)
										}}
									/>
								</div>
								{index === driversDetails.length - 1 && (
									<Button
										type='button'
										variant='bluebtn'
										onClick={addDriver}>
										<Plus />
									</Button>
								)}
								{index !== 0 && (
									<Button
										type='button'
										variant='bluebtn'
										onClick={() => {
											removeDriver(index)
										}}>
										<Minus />
									</Button>
								)}
							</div>
						)
					})}
				</div>
				{/* <div className='flex w-full flex-col gap-8 md:flex-row'>
					<div className='w-full flex-grow md:w-1/2'>
						<Label htmlFor='circulation'>Leased</Label>
						<div className='flex flex-row gap-2'>
							<div
								className={cn(
									'rounded-2xl border-2 bg-white px-6 py-2 font-roboto text-black',
									{
										'bg-blue-300 text-white': isLeased === true
									}
								)}
								onClick={() => {
									setIsLeased(true)
								}}>
								Yes
							</div>
							<div
								className={cn(
									'rounded-2xl border-2 bg-white px-6 py-2 font-roboto text-black',
									{
										'bg-blue-300 text-white': isLeased === false
									}
								)}
								onClick={() => {
									setIsLeased(false)
								}}>
								No
							</div>
						</div>
					</div>
					{isLeased && (
						<div className='w-full flex-grow md:w-1/2'>
							<Label htmlFor='zone'>Bank of finance</Label>
							<Select
								value={borrowerType}
								onValueChange={(string) => {
									setBorrowerType(string)
								}}>
								<SelectTrigger
									className='border-2 border-blue-925'
									value={borrowerType}>
									<SelectValue placeholder='Bank/Individual' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem
										key='1'
										value='Individual'>
										Individual
									</SelectItem>
									<SelectItem
										key='2'
										value='Bank'>
										Bank
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					)}
				</div>
				{isLeased && borrowerType === 'Individual' && (
					<div className='flex w-full flex-row gap-2 md:gap-8'>
						<div className='w-full flex-grow md:w-1/2'>
							<Label
								className='line-clamp-1'
								htmlFor='zone'>
								Collateral Name
							</Label>
							<Input
								className='border-2 border-blue-925'
								id='zone'
								placeholder='Collateral Name'
								value={bankName}
								onChange={(e) => {
									setBankName(e.target.value)
								}}
							/>
						</div>
						<div className='w-full flex-grow md:w-1/2'>
							<Label
								className='line-clamp-1'
								htmlFor='zone'>
								First Loss Payee Name
							</Label>
							<Input
								className='border-2 border-blue-925'
								id='zone'
								placeholder='First Loss Payee Name'
								value={firstLossPayeeName}
								onChange={(e) => {
									setFirstLossPayeeName(e.target.value)
								}}
							/>
						</div>
					</div>
				)}
				{isLeased && borrowerType === 'Bank' && (
					<div className='flex w-full flex-row gap-2 md:gap-8'>
						<div className='w-1/2 flex-grow'>
							<Label htmlFor='zone'>Collateral Bank Name</Label>
							{bankList.length === 0 ? (
								<Skeleton className='h-10 w-full' />
							) : (
								<Select
									value={bankName}
									onValueChange={(string) => {
										setBankName(string)
									}}>
									<SelectTrigger
										className='border-2 border-blue-925'
										value={bankName}>
										<SelectValue placeholder='Bank Name' />
									</SelectTrigger>
									<SelectContent>
										{bankList.map((item, index) => {
											return (
												<SelectItem
													key={index}
													value={item.value}>
													{item.label}
												</SelectItem>
											)
										})}
									</SelectContent>
								</Select>
							)}
						</div>
						<div className='w-1/2 flex-grow'>
							<Label htmlFor='zone'>First Loss Payee Name</Label>
							<Input
								className='border-2 border-blue-925'
								id='zone'
								placeholder='First Loss Payee Name'
								value={firstLossPayeeName}
								onChange={(e) => {
									setFirstLossPayeeName(e.target.value)
								}}
							/>
						</div>
					</div>
				)} */}
				<Button
					className='w-32'
					variant='bluebtn'
					onClick={onSubmit}>
					Continue
				</Button>
			</>
		</FormFieldLayout>
	)
}
