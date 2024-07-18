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
	BrokerBranchCode: z.string(),
	CustomerCode: z.null(),
	CustomerName: z.string(),
	BdmCode: z.null(),
	BrokerCode: z.string(),
	LoginId: z.string(),
	SubUserType: z.string(),
	ApplicationId: z.string(),
	CustomerReferenceNo: z.string(),
	RequestReferenceNo: z.null(),
	Idnumber: z.string(),
	VehicleId: z.string(),
	AcccessoriesSumInsured: z.null(),
	AccessoriesInformation: z.null(),
	AdditionalCircumstances: z.null(),
	Chassisnumber: z.string().nullable(),
	CityLimit: z.null(),
	CoverNoteNo: z.null(),
	CubicCapacity: z.null(),
	CreatedBy: z.string(),
	DrivenByDesc: z.string(),
	MobileCode: z.string(),
	MobileNumber: z.string(),
	Gpstrackinginstalled: z.string(),
	Grossweight: z.null(),
	HoldInsurancePolicy: z.string(),
	Insurancetype: z.null(),
	InsuranceId: z.string(),
	InsuranceClass: z.null(),
	InsurerSettlement: z.string(),
	InterestedCompanyDetails: z.string(),
	ModelNumber: z.string().nullable(),
	MotorCategory: z.null(),
	MotorusageId: z.string().nullable(),
	NcdYn: z.null(),
	PolicyRenewalYn: z.string(),
	NoOfClaims: z.null(),
	BranchCode: z.string(),
	AgencyCode: z.string(),
	ProductId: z.string(),
	SectionId: z.null(),
	PolicyType: z.string().nullable(),
	RadioOrCasseteplayer: z.null(),
	RegistrationYear: z.string(),
	Registrationnumber: z.string(),
	RoofRack: z.null(),
	SeatingCapacity: z.string(),
	SpotFogLamp: z.null(),
	Stickerno: z.null(),
	SumInsured: z.string().nullable(),
	Tareweight: z.null(),
	TppdFreeLimit: z.null(),
	TppdIncreaeLimit: z.null(),
	TrailerDetails: z.null(),
	VehcilemodelId: z.string(),
	VehicleType: z.string(),
	VehicleTypeId: z.string(),
	Vehiclemake: z.string(),
	VehiclemakeId: z.string(),
	WindScreenSumInsured: z.null(),
	Windscreencoverrequired: z.null(),
	accident: z.null(),
	periodOfInsurance: z.null(),
	PolicyStartDate: z.string(),
	PolicyEndDate: z.string(),
	Currency: z.string(),
	ExchangeRate: z.string(),
	HavePromoCode: z.string(),
	PromoCode: z.null(),
	CollateralYn: z.null(),
	CollateralName: z.null(),
	FirstLossPayee: z.null(),
	FleetOwnerYn: z.string(),
	NoOfVehicles: z.null(),
	NoOfComprehensives: z.null(),
	ClaimRatio: z.null(),
	SavedFrom: z.null(),
	UserType: z.string(),
	TiraCoverNoteNo: z.null(),
	EndorsementYn: z.string(),
	SaveOrSubmit: z.string(),
	EndorsementDate: z.null(),
	EndorsementEffectiveDate: z.null(),
	EndorsementRemarks: z.null(),
	EndorsementType: z.null(),
	EndorsementTypeDesc: z.null(),
	EndtCategoryDesc: z.null(),
	EndtCount: z.null(),
	EndtPrevPolicyNo: z.null(),
	EndtPrevQuoteNo: z.null(),
	EndtStatus: z.null(),
	IsFinanceEndt: z.null(),
	OrginalPolicyNo: z.null(),
	HorsePower: z.null(),
	Scenarios: z.object({
		ExchangeRateScenario: z.object({
			OldAcccessoriesSumInsured: z.null(),
			OldCurrency: z.string(),
			OldExchangeRate: z.string(),
			OldSumInsured: z.null(),
			OldTppdIncreaeLimit: z.null(),
			OldWindScreenSumInsured: z.null()
		})
	}),
	Status: z.string()
})

export type SaveMotorDetailRequest = z.infer<typeof SaveMotorDetailRequestSchema>
