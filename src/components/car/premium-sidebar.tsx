'use client'

import { assets } from '@/assets'
import Image from 'next/image'
import { Button } from '../ui'
// import { MobileLinkDetails } from './mobile-link-details'
import { usePathname, useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect, useState } from 'react'
import {
	usePremiumCalcMutation,
	useSaveMotorDetailsMutation,
	useViewPremiumCalcMutation
} from '@/redux/api/commonApi'
import ClipLoader from 'react-spinners/ClipLoader'
import { setCoversDetails, updatePremium } from '@/redux/slices'
import { type SaveMotorDetailRequest } from '@/services/models/common.models'
import { updateDetails } from '@/redux/slices/motor-detail.slice'
import { useToast } from '../ui/use-toast'

export function PremiumSideBar() {
	const route = useRouter()
	const customerData = useAppSelector((state) => state.customerDetails)
	const motorData = useAppSelector((state) => state.motor)
	const appData = useAppSelector((state) => state.apps)
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const path = usePathname()

	const { toast } = useToast()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isMotorLoading, setIsMotorLoading] = useState<boolean>(false)

	const [needUpdatedData, setNeedUpdatedData] = useState<boolean>(false)

	const [premiumCalculator] = usePremiumCalcMutation()
	const [viewPremium] = useViewPremiumCalcMutation()
	const [taxList, setTaxList] = useState<{ name: string; amount: number; rate: number }[]>([])
	const [taxListAccess, setTaxListAccess] = useState<
		{ name: string; amount: number; rate: number }[]
	>([])

	const [basicDetails, setBasicDetails] = useState({
		PremiumExcluedTax: 0,
		PremiumIncludedTax: 0
	})

	const [accessories, setAccessories] = useState({ PremiumExcluedTax: 0, PremiumIncludedTax: 0 })

	const [total, setTotal] = useState<string>('')
	const [saveMotor] = useSaveMotorDetailsMutation()

	const dispatch = useAppDispatch()

	function doSaveMotorDetails() {
		setIsMotorLoading(true)
		const req: SaveMotorDetailRequest = {
			CustomerName: customerData.name,
			LoginId: appData.loginId,
			SubUserType: appData.subUserType,
			UserType: appData.userType,
			ApplicationId: '1', //
			CustomerReferenceNo: null,
			RequestReferenceNo: null,
			VehicleId: '1',
			CreatedBy: appData.loginId,
			InsuranceId: appData.insuranceID,
			BranchCode: appData.branchCode,
			BrokerBranchCode: appData.brokerCode,
			SectionId: vehicleData.classID,
			AgencyCode: appData.agencyCode,
			ProductId: appData.productId,
			SavedFrom: 'SQ',
			MobileCode: customerData.code,
			MobileNumber: customerData.mobile,
			Chassisnumber: '',
			Insurancetype: [appData.insuranceID],
			InsuranceClass: vehicleData.classID,
			Motorusage: vehicleData.vehicleUsage,
			MotorusageId: vehicleData.vehicleUsageID,
			Vehiclemake: vehicleData.mark,
			VehiclemakeId: vehicleData.makeID,
			VehicleModel: vehicleData.model,
			VehcilemodelId: vehicleData.modelID,
			VehicleValueType: null,
			DefenceValue: null,
			PurchaseDate: null,
			Deductibles: null,
			Inflation: null,
			ManufactureYear: vehicleData.year + '',
			Gpstrackinginstalled: 'N',
			NcdYn: 'N',
			VehicleType: vehicleData.bodyType,
			VehicleTypeId: vehicleData.bodyTypeID,
			CarAlarmYn: 'N',
			PolicyStartDate: vehicleData.policyStartDate,
			PolicyEndDate: vehicleData.policyEndDate,
			CustomerCode: appData.CustomerCode,
			BdmCode: appData.CustomerCode,
			SourceTypeId: appData.userType,
			SumInsured: vehicleData.value,
			AcccessoriesSumInsured: vehicleData.AcccessoriesSumInsured,
			ExchangeRate: vehicleData.exchangeRate,
			Currency: vehicleData.currency,
			HavePromoCode: 'N',
			SearchFromApi: false,
			SeatingCapacity: vehicleData.seat,
			CustomerStatus: 'Y',
			Status: 'Y'
		}
		const res = saveMotor(req)
		res.then((value) => {
			if (
				value.data?.type === 'success' &&
				value.data.data !== undefined &&
				value.data.data.IsError !== true &&
				value.data.data.Result !== null
			) {
				dispatch(updatePremium(true))
				dispatch(updateDetails(value.data.data.Result[0]))
				setIsLoading(false)
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
			} else {
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: 'There was a problem with your request.'
				})
			}

			setIsMotorLoading(false)
		})
	}

	useEffect(() => {
		if (motorData.RequestReferenceNo !== '') {
			const req = {
				InsuranceId: appData.insuranceID,
				BranchCode: appData.branchCode,
				AgencyCode: appData.agencyCode,
				SectionId: vehicleData.classID,
				ProductId: appData.productId,
				MSRefNo: motorData.MSRefNo,
				VehicleId: motorData.VehicleId,
				CdRefNo: motorData.CdRefNo,
				DdRefNo: motorData.DdRefNo,
				VdRefNo: motorData.VdRefNo,
				CreatedBy: motorData.CreatedBy,
				productId: motorData.ProductId,
				RequestReferenceNo: motorData.RequestReferenceNo,
				EffectiveDate: vehicleData.policyStartDate,
				PolicyEndDate: vehicleData.policyEndDate,
				CoverModification: 'N'
			}
			setIsLoading(true)
			const res = premiumCalculator(req)
			res.then(() => {
				ViewPremiumData()
			})
		}
	}, [motorData])

	useEffect(() => {
		setNeedUpdatedData(true)
	}, [vehicleData])

	function ViewPremiumData() {
		const req = {
			ProductId: motorData.ProductId,
			RequestReferenceNo: motorData.RequestReferenceNo
		}
		const res = viewPremium(req)
		res.then((value) => {
			if (value.data?.type === 'success' && value.data?.data !== undefined) {
				const usdVal = {
					PremiumExcluedTax: value.data.data.Result[0].CoverList[0].PremiumExcluedTax,
					PremiumIncludedTax: value.data.data.Result[0].CoverList[0].PremiumIncludedTax
				}

				const coverList: {
					CoverId: string
					SubCoverId: string | null
					SubCoverYn: string
				}[] = []

				value.data.data.Result[0].CoverList.map((covers) => {
					coverList.push({
						CoverId: covers.CoverId,
						SubCoverId: covers.SubCoverId,
						SubCoverYn: 'N'
					})
				})

				setBasicDetails(usdVal)
				dispatch(setCoversDetails(coverList))

				if (value.data.data.Result[0].CoverList.length === 2) {
					setAccessories({
						PremiumExcluedTax: value.data.data.Result[0].CoverList[1].PremiumExcluedTax,
						PremiumIncludedTax:
							value.data.data.Result[0].CoverList[1].PremiumIncludedTax
					})

					if (value.data.data.Result[0].CoverList[1].Taxes.length !== 0) {
						const taxes: { name: string; amount: number; rate: number }[] = []
						value.data.data.Result[0].CoverList[1].Taxes.map((tax) => {
							taxes.push({
								name: tax.TaxDesc,
								amount: tax.TaxAmount,
								rate: tax.TaxRate
							})
						})
						setTaxListAccess(taxes)
					}
				}

				if (value.data.data.Result[0].CoverList[0].Taxes.length !== 0) {
					const taxes: { name: string; amount: number; rate: number }[] = []
					value.data.data.Result[0].CoverList[0].Taxes.map((tax) => {
						taxes.push({
							name: tax.TaxDesc,
							amount: tax.TaxAmount,
							rate: tax.TaxRate
						})
					})
					setTaxList(taxes)
				}
			}

			setNeedUpdatedData(false)
			setIsLoading(false)
		})
	}

	useEffect(() => {
		const total = basicDetails.PremiumIncludedTax + accessories.PremiumIncludedTax
		setTotal(total.toFixed(2))
	}, [accessories.PremiumIncludedTax, basicDetails.PremiumIncludedTax])

	return (
		<div className='flex h-full w-full flex-col gap-4 px-5 py-20 font-roboto'>
			{customerData.premium && (
				<div className='flex flex-col gap-4 rounded-lg p-6 shadow-md'>
					<div className='flex flex-row gap-6'>
						<div className='h-32 w-32'>
							<Image
								alt='car'
								className='h-full w-full object-contain object-center'
								height={500}
								src={assets.images.car}
								width={500}
							/>
						</div>
						<div className='flex flex-col justify-around gap-2'>
							<div className='flex flex-col gap-1'>
								<h4 className='text-sm font-bold text-green-75 opacity-75'>
									RefNumber No: {motorData.RequestReferenceNo}
								</h4>
								{motorData.QuoteNo !== '' && (
									<h4 className='text-sm font-bold text-green-75 opacity-75'>
										Quote No: {motorData.QuoteNo}
									</h4>
								)}
								<h4 className='font-bold text-green-75'>
									{vehicleData.mark} - {vehicleData.model}
								</h4>
							</div>
							<div className='flex w-full flex-row items-center gap-2'>
								<span className='rounded-lg border border-green-100 p-2 text-xs font-semibold'>
									{vehicleData.seat} seats
								</span>
								<span className='text-xs font-bold text-green-75'>
									{vehicleData.year} - {vehicleData.vehicleUsage}
								</span>
							</div>
							<div className='flex w-full flex-row justify-between gap-6'>
								<span className='flex flex-col text-sm font-bold text-green-75'>
									Policy Start Date
									<span className='font-normal'>
										{vehicleData.policyStartDate}
									</span>
								</span>
								<span className='flex flex-col text-sm font-bold text-green-75'>
									Policy End Date
									<span className='font-normal'>{vehicleData.policyEndDate}</span>
								</span>
							</div>
						</div>
					</div>
					<div className='border-y-[0.5px] border-green-75 border-opacity-25 py-4'>
						Your Insurance is protected by{' '}
						<span className='font-bold'>Madison Insurance</span>
					</div>
					{isLoading ? (
						<div className='flex w-full flex-row items-center'>
							<ClipLoader color='#0C7BC4' />
						</div>
					) : (
						<>
							{needUpdatedData ? (
								<>
									<Button
										variant='bluebtn'
										onClick={doSaveMotorDetails}>
										{isMotorLoading ? (
											<ClipLoader
												color='#FFFFFF'
												size={20}
											/>
										) : (
											<span>Refresh Premium Amount</span>
										)}
									</Button>
								</>
							) : (
								<>
									<div className='flex flex-col gap-4'>
										<h1 className='font-jakarta text-2xl font-bold text-blue-300'>
											{vehicleData.insuranceClass}
										</h1>
										{vehicleData.insuranceClass !== 'TPO' && (
											<div className='flex flex-row justify-between'>
												<span>Sum Insured</span>
												<span>
													{vehicleData.value} {vehicleData.currency}
												</span>
											</div>
										)}
										<div className='flex flex-row justify-between'>
											<span>Base Fare</span>
											<span>
												{basicDetails.PremiumExcluedTax}{' '}
												{vehicleData.currency}
											</span>
										</div>
										{taxList.map((tax, index) => {
											return (
												<div
													key={index}
													className='flex flex-row justify-between'>
													<span>{`${tax.name} ${tax.rate ? '(' + tax.rate + '%)' : ''}`}</span>
													<span>
														{tax.amount} {vehicleData.currency}
													</span>
												</div>
											)
										})}
									</div>
									<div className='flex flex-row justify-between border-b-[0.5px] border-green-75 border-opacity-25 pb-4 font-semibold'>
										<span>Premium Included Tax</span>
										<span>
											{basicDetails.PremiumIncludedTax} {vehicleData.currency}
										</span>
									</div>
									{accessories.PremiumExcluedTax !== 0 && (
										<>
											<div className='flex flex-row justify-between'>
												<span>Electronic Accessories</span>
												<span>
													{accessories.PremiumExcluedTax}{' '}
													{vehicleData.currency}
												</span>
											</div>
											{taxListAccess.map((tax, index) => {
												return (
													<div
														key={index}
														className='flex flex-row justify-between'>
														<span>{`${tax.name} ${tax.rate ? '(' + tax.rate + '%)' : ''}`}</span>
														<span>
															{tax.amount} {vehicleData.currency}
														</span>
													</div>
												)
											})}
											<div className='flex flex-row justify-between border-b-[0.5px] border-green-75 border-opacity-25 pb-4 font-semibold'>
												<span>Premium Included Tax</span>
												<span>
													{accessories.PremiumIncludedTax}{' '}
													{vehicleData.currency}
												</span>
											</div>
										</>
									)}
									<div className='flex flex-row justify-between font-bold'>
										<span>Grand Total</span>
										<span>{`${total} ${vehicleData.currency}`}</span>
									</div>
									{path === '/car-insurance/2' && (
										<Button
											variant='bluebtn'
											onClick={() => {
												route.push('/car-insurance/confirm/otp-verify')
											}}>
											Buy Policy
										</Button>
									)}
								</>
							)}
						</>
					)}
				</div>
			)}
			{/* <MobileLinkDetails /> */}
		</div>
	)
}
