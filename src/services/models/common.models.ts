import { z } from 'zod'

export const currencyCodeSchema = z.object({
	Code: z.string(),
	CodeDesc: z.string(),
	ExchangeRate: z.string(),
	MinRate: z.string(),
	MaxRate: z.string(),
	Status: z.string()
})

export const CurrencyListAPISchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.string()),
	Result: z.array(currencyCodeSchema),
	ErroCode: z.number()
})

export type CurrencyList = z.infer<typeof CurrencyListAPISchema>

// .......................Body Type Response.................................
export const BodyTypeSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.unknown()),
	Result: z.array(
		z.object({
			TitleType: z.null(),
			Code: z.string(),
			CodeDesc: z.string(),
			Status: z.string(),
			BodyType: z.string(),
			RiskId: z.null()
		})
	),
	ErroCode: z.number()
})

export type BodyTypeList = z.infer<typeof BodyTypeSchema>

// .......................Guest Login Response.....................................
export const GuestLoginSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ChangePasswordYn: z.null(),
	ErrorMessage: z.array(z.unknown()),
	Result: z.object({
		Token: z.string(),
		LoginId: z.string(),
		OaCode: z.string(),
		UserName: z.string(),
		UserMail: z.string(),
		UserMobile: z.string(),
		UserType: z.string(),
		SubUserType: z.string(),
		BankCode: z.string(),
		CountryId: z.string(),
		CurrencyId: z.string(),
		CustomerCode: z.string(),
		CustomerName: z.string(),
		AttachedCompanies: z.null(),
		LoginBranchDetails: z.array(
			z.object({
				BranchCode: z.string(),
				BrokerBranchCode: z.string(),
				BrokerBranchName: z.string(),
				BranchName: z.string(),
				RegionCode: z.string(),
				RegionName: z.null(),
				InsuranceId: z.string(),
				CompanyName: z.string(),
				CompanyLogo: z.null(),
				AttachedBranchCode: z.null(),
				AttachedBranchName: z.null(),
				AttachedRegionCode: z.null(),
				AttachedRegionName: z.null(),
				AttachedCompanyId: z.null(),
				AttachedCompanyName: z.null(),
				AttachedCompanyLogo: z.null(),
				CurrencyId: z.string(),
				SourceType: z.null(),
				DepartmentCode: z.null()
			})
		),
		BrokerCompanyProducts: z.array(
			z.object({
				ProductId: z.string(),
				OldProductName: z.string(),
				ProductName: z.string(),
				ProductIconId: z.string(),
				ProductIconName: z.null(),
				PackageYn: z.string(),
				DisplayOrder: z.number()
			})
		)
	}),
	ErroCode: z.number(),
	AdditionalInfo: z.object({
		TinyUrlId: z.string(),
		RouterLink: z.string(),
		InsuranceId: z.string(),
		SubUserType: z.string(),
		LoginId: z.string(),
		ProductId: z.string(),
		PageType: z.string(),
		UserType: z.string(),
		BranchCode: z.string(),
		TinyGroupId: z.string()
	})
})

export type GuestLogin = z.infer<typeof GuestLoginSchema>

// ....................................................Motor Make List Response................................
export const ResultSchema = z.object({
	TitleType: z.nullable(z.string()),
	Code: z.string(),
	CodeDesc: z.string(),
	Status: z.string(),
	BodyType: z.nullable(z.string()),
	RiskId: z.nullable(z.string())
})

export const MotorMakeSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.string()),
	Result: z.array(ResultSchema),
	ErroCode: z.number()
})

export type MotorList = z.infer<typeof MotorMakeSchema>

// .................................................Motor Model List Response........................................

export const ResultItemSchema = z.object({
	TitleType: z.string().nullable(),
	Code: z.string(),
	CodeDesc: z.string(),
	Status: z.string(),
	BodyType: z.string().nullable(),
	RiskId: z.string().nullable()
})

export const MotorModelListSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.unknown()),
	Result: z.array(ResultItemSchema),
	ErroCode: z.number()
})

export type MotorModelList = z.infer<typeof MotorModelListSchema>

// ..............................................Vehicle Usage Models...................................................

export const vehicleUsageSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.unknown()),
	Result: z.array(
		z.object({
			TitleType: z.null(),
			Code: z.string(),
			CodeDesc: z.string(),
			Status: z.string(),
			BodyType: z.string(),
			RiskId: z.null()
		})
	),
	ErroCode: z.number()
})

export type vehicleUsageList = z.infer<typeof vehicleUsageSchema>

// --------------------------------------------Policy End Date -----------------------------------------------------

export const policyEndDatesSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.unknown()),
	Result: z.array(
		z.object({
			TitleType: z.string().nullable(),
			Code: z.string(),
			CodeDesc: z.string(),
			Status: z.string().nullable(),
			BodyType: z.string().nullable(),
			RiskId: z.string().nullable()
		})
	),
	ErroCode: z.number()
})

export type policyEndDateList = z.infer<typeof policyEndDatesSchema>

// ---------------------------------ShortQuoteResponse------------------------

export const saveMotorDetailsSchema = z.object({
	Message: z.string(),
	IsError: z.boolean(),
	ErrorMessage: z.array(z.string()),
	Result: z.array(
		z.object({
			CoverList: z.string().nullable(),
			RequestReferenceNo: z.string(),
			CustomerReferenceNo: z.string(),
			VehicleId: z.string(),
			MSRefNo: z.string().nullable(),
			CdRefNo: z.string().nullable(),
			VdRefNo: z.string().nullable(),
			DdRefNo: z.string().nullable(),
			Response: z.string(),
			CreatedBy: z.string(),
			InsuranceId: z.string(),
			ProductId: z.string(),
			SectionId: z.string().nullable()
		})
	),
	ErroCode: z.number()
})

export type saveMotorDetailsList = z.infer<typeof saveMotorDetailsSchema>

// .........Request Class......................................................

export const MotorModalRequestSchema = z.object({
	InsuranceId: z.string(),
	BranchCode: z.string(),
	BodyId: z.string().optional(),
	MakeId: z.string()
})

export type MotorModalRequest = z.infer<typeof MotorModalRequestSchema>

// ..............common Modal request...........................................

export const CommonModalRequestSchema = z.object({
	InsuranceId: z.string(),
	BranchCode: z.string(),
	BodyId: z.string().optional()
})

export type CommonModalRequest = z.infer<typeof CommonModalRequestSchema>

// ...............Get Currency Request.........................................

export const CurrencyRequestSchema = z.object({
	InsuranceId: z.string(),
	ProductId: z.string(),
	BranchCode: z.string()
})

export type CurrencyRequest = z.infer<typeof CurrencyRequestSchema>

// ................Vehicle Usage Request.........................................
export const VehicleUsageListRequestSchema = z.object({
	InsuranceId: z.string(),
	BranchCode: z.string()
})
export type vehicleUsageRequest = z.infer<typeof VehicleUsageListRequestSchema>

// ....................Save Motor Details Request...................................

export const SaveMotorDetailRequestSchema = z.object({
	BrokerBranchCode: z.string().optional(),
	CustomerCode: z.null().optional(),
	CustomerName: z.string().optional(),
	BdmCode: z.null().optional(),
	BrokerCode: z.string().optional(),
	LoginId: z.string().optional(),
	SubUserType: z.string().optional(),
	ApplicationId: z.string().optional(),
	CustomerReferenceNo: z.string().optional(),
	RequestReferenceNo: z.null().optional(),
	Idnumber: z.string().optional(),
	VehicleId: z.string().optional(),
	AcccessoriesSumInsured: z.null().optional(),
	AccessoriesInformation: z.null().optional(),
	AdditionalCircumstances: z.null().optional(),
	Chassisnumber: z.string().nullable().optional(),
	CityLimit: z.null().optional(),
	CoverNoteNo: z.null().optional(),
	CubicCapacity: z.null().optional(),
	CreatedBy: z.string().nullable().optional(),
	DrivenByDesc: z.string().optional(),
	MobileCode: z.string().optional(),
	MobileNumber: z.string().optional(),
	Gpstrackinginstalled: z.string().optional(),
	Grossweight: z.null().optional(),
	HoldInsurancePolicy: z.string().optional(),
	Insurancetype: z.null().optional(),
	InsuranceId: z.string().optional(),
	InsuranceClass: z.null().optional(),
	InsurerSettlement: z.string().optional(),
	InterestedCompanyDetails: z.string().optional(),
	ModelNumber: z.string().nullable().optional(),
	MotorCategory: z.null().optional(),
	MotorusageId: z.string().nullable().optional(),
	NcdYn: z.null().optional(),
	PolicyRenewalYn: z.string().optional(),
	NoOfClaims: z.null().optional(),
	BranchCode: z.string().optional(),
	AgencyCode: z.string().optional(),
	ProductId: z.string().optional(),
	SectionId: z.null().optional(),
	PolicyType: z.string().nullable().optional(),
	RadioOrCasseteplayer: z.null().optional(),
	RegistrationYear: z.string().nullable().optional(),
	Registrationnumber: z.string().nullable().optional(),
	RoofRack: z.null().optional(),
	SeatingCapacity: z.string().optional(),
	SpotFogLamp: z.null().optional(),
	Stickerno: z.null().optional(),
	SumInsured: z.string().nullable().optional(),
	Tareweight: z.null().optional(),
	TppdFreeLimit: z.null().optional(),
	TppdIncreaeLimit: z.null().optional(),
	TrailerDetails: z.null().optional(),
	VehcilemodelId: z.string().optional(),
	VehicleType: z.string().optional(),
	VehicleTypeId: z.string().optional(),
	Vehiclemake: z.string().optional(),
	VehiclemakeId: z.string().optional(),
	WindScreenSumInsured: z.null().optional(),
	Windscreencoverrequired: z.null().optional(),
	accident: z.null().optional(),
	periodOfInsurance: z.null().optional(),
	PolicyStartDate: z.string().optional(),
	PolicyEndDate: z.string().optional(),
	Currency: z.string().optional(),
	ExchangeRate: z.string().optional(),
	HavePromoCode: z.string().optional(),
	PromoCode: z.null().optional(),
	CollateralYn: z.null().optional(),
	CollateralName: z.null().optional(),
	FirstLossPayee: z.null().optional(),
	FleetOwnerYn: z.string().optional(),
	NoOfVehicles: z.null().optional(),
	NoOfComprehensives: z.null().optional(),
	ClaimRatio: z.null().optional(),
	SavedFrom: z.null().optional(),
	UserType: z.string().optional(),
	TiraCoverNoteNo: z.null().optional(),
	EndorsementYn: z.string().optional(),
	SaveOrSubmit: z.string().optional(),
	EndorsementDate: z.null().optional(),
	EndorsementEffectiveDate: z.null().optional(),
	EndorsementRemarks: z.null().optional(),
	EndorsementType: z.null().optional(),
	EndorsementTypeDesc: z.null().optional(),
	EndtCategoryDesc: z.null().optional(),
	EndtCount: z.null().optional(),
	EndtPrevPolicyNo: z.null().optional(),
	EndtPrevQuoteNo: z.null().optional(),
	EndtStatus: z.null().optional(),
	IsFinanceEndt: z.null().optional(),
	OrginalPolicyNo: z.null().optional(),
	HorsePower: z.null().optional(),
	Scenarios: z
		.object({
			ExchangeRateScenario: z.object({
				OldAcccessoriesSumInsured: z.null(),
				OldCurrency: z.string(),
				OldExchangeRate: z.string(),
				OldSumInsured: z.null(),
				OldTppdIncreaeLimit: z.null(),
				OldWindScreenSumInsured: z.null()
			})
		})
		.optional(),
	Status: z.string().optional()
})

export type SaveMotorDetailRequest = z.infer<typeof SaveMotorDetailRequestSchema>
