'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateCode, updateMobile, updateName, updatePremium } from '@/redux/slices'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
// import { useRouter } from 'next/navigation'
import { Button, Input } from '../ui'
import { type SaveMotorDetailRequest } from '@/services/models/common.models'
import { useSaveMotorDetailsMutation } from '@/redux/api/commonApi'

type CustomerInfoProps = {
	scrollToTop: () => void
}

export function CustomerInfo(props: CustomerInfoProps) {
	// const vehicleData = useAppSelector((state) => state.carInsurance)
	const customerData = useAppSelector((state) => state.customerDetails)

	const [saveMotor] = useSaveMotorDetailsMutation()

	const dispatch = useAppDispatch()
	// const router = useRouter()

	useGSAP(() => {
		gsap.from('.selectCustomerInfo', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
		gsap.to('.CustomerInfotitle', { duration: 0.5, text: 'Personal Details' })
		gsap.to('.CustomerInfosubtitle', {
			duration: 0.5,
			text: 'Please provide your details to proceed',
			delay: 0.5
		})
	})

	function goToConfirm() {
		doSaveMotorDetails()
		// router.push('/car-insurance/confirm')
	}

	function doSaveMotorDetails() {
		const req: SaveMotorDetailRequest = {
			BrokerBranchCode: '2',
			CustomerCode: null,
			CustomerName: 'Bhuvanesh',
			BdmCode: null,
			BrokerCode: '13090',
			LoginId: 'madison_broker',
			SubUserType: 'Broker',
			ApplicationId: '1',
			CustomerReferenceNo: 'MIC-CUST-12279',
			RequestReferenceNo: null,
			Idnumber: '7485963250',
			VehicleId: '1',
			AcccessoriesSumInsured: null,
			AccessoriesInformation: null,
			AdditionalCircumstances: null,
			Chassisnumber: '6563456365',
			CityLimit: null,
			CoverNoteNo: null,
			CubicCapacity: null,
			CreatedBy: 'madison_broker',
			DrivenByDesc: 'D',
			MobileCode: '260',
			MobileNumber: '7485965210',
			Gpstrackinginstalled: 'N',
			Grossweight: null,
			HoldInsurancePolicy: 'N',
			Insurancetype: null,
			InsuranceId: '100004',
			InsuranceClass: null,
			InsurerSettlement: '',
			InterestedCompanyDetails: '',
			ModelNumber: null,
			MotorCategory: null,
			MotorusageId: null,
			NcdYn: null,
			PolicyRenewalYn: 'N',
			NoOfClaims: null,
			BranchCode: '46',
			AgencyCode: '13090',
			ProductId: '5',
			SectionId: null,
			PolicyType: null,
			RadioOrCasseteplayer: null,
			RegistrationYear: '09/07/2006',
			Registrationnumber: '54353546546',
			RoofRack: null,
			SeatingCapacity: '2',
			SpotFogLamp: null,
			Stickerno: null,
			SumInsured: null,
			Tareweight: null,
			TppdFreeLimit: null,
			TppdIncreaeLimit: null,
			TrailerDetails: null,
			VehcilemodelId: 'ENCORE',
			VehicleType: '2',
			VehicleTypeId: '2',
			Vehiclemake: 'BUICK',
			VehiclemakeId: '92',
			WindScreenSumInsured: null,
			Windscreencoverrequired: null,
			accident: null,
			periodOfInsurance: null,
			PolicyStartDate: '17/07/2024',
			PolicyEndDate: '11/07/2025',
			Currency: 'ZMW',
			ExchangeRate: '1.0',
			HavePromoCode: 'N',
			PromoCode: null,
			CollateralYn: null,
			CollateralName: null,
			FirstLossPayee: null,
			FleetOwnerYn: 'N',
			NoOfVehicles: null,
			NoOfComprehensives: null,
			ClaimRatio: null,
			SavedFrom: null,
			UserType: 'Broker',
			TiraCoverNoteNo: null,
			EndorsementYn: 'N',
			SaveOrSubmit: 'Save',
			EndorsementDate: null,
			EndorsementEffectiveDate: null,
			EndorsementRemarks: null,
			EndorsementType: null,
			EndorsementTypeDesc: null,
			EndtCategoryDesc: null,
			EndtCount: null,
			EndtPrevPolicyNo: null,
			EndtPrevQuoteNo: null,
			EndtStatus: null,
			IsFinanceEndt: null,
			OrginalPolicyNo: null,
			HorsePower: null,
			Scenarios: {
				ExchangeRateScenario: {
					OldAcccessoriesSumInsured: null,
					OldCurrency: 'ZMW',
					OldExchangeRate: '1.0',
					OldSumInsured: null,
					OldTppdIncreaeLimit: null,
					OldWindScreenSumInsured: null
				}
			},
			Status: 'Y'
		}
		const res = saveMotor(req)
		res.then(() => {
			dispatch(updatePremium(true))
			props.scrollToTop()
		})
	}

	return (
		<section className='flex w-4/5 flex-col gap-10'>
			<div className='flex flex-col gap-4'>
				<h1 className='font-jakarta text-[40px] font-semibold'>Customer Info</h1>
				<p className='w-4/5 text-sm font-medium text-gray-500'>
					Please fill out the form with accurate details about your customer. Ensure all
					information provided is correct and up-to-date.
				</p>
			</div>
			<div className='flex flex-col gap-7'>
				<div className='flex flex-col gap-2'>
					<h1 className='CustomerInfotitle font-jakarta text-xl font-bold text-blue-300'></h1>
					<span className='CustomerInfosubtitle font-roboto text-sm font-medium text-gray-500'></span>
				</div>
				<div className='selectCustomerInfo flex flex-row gap-10'>
					<Input
						placeholder='Customer Name'
						value={customerData.name}
						onChange={(e) => {
							dispatch(updateName(e.target.value))
						}}
					/>
				</div>
				<div className='selectCustomerInfo flex flex-row gap-10'>
					<Input
						className='max-w-20'
						placeholder='Code'
						value={customerData.code}
						onChange={(e) => {
							dispatch(updateCode(e.target.value))
						}}
					/>
					<Input
						placeholder='Mobile Number'
						value={customerData.mobile}
						onChange={(e) => {
							dispatch(updateMobile(e.target.value))
						}}
					/>
				</div>
			</div>
			<span className='selectCustomerInfo -mt-6 font-jakarta text-xs text-gray-500'>
				We&apos;ll call or text you to confirm your number. Standard message and data rates
				apply. <span className='font-semibold text-gray-600'>Privacy Policy</span>
			</span>
			<Button
				className='selectCustomerInfo w-full'
				variant='bluebtn'
				onClick={goToConfirm}>
				View Premium
			</Button>
			{/* <div className='flex items-center justify-center'>
				<div className='relative w-full border-t border-green-50'>
					<span className='absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 transform bg-white px-2'>
						Or
					</span>
				</div>
			</div>
			<OtherOptions /> */}
		</section>
	)
}
