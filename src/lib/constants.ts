export const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
]

export const pricingData = [
	{
		name: 'Basic',
		price: 0,
		WorkSpace: {
			seats: 'Up to 3',
			objects: 'Up to 3'
		},
		Automation: {
			credits: '200'
		},
		EmailCalendar: {
			storage: 'Up to 1GB'
		}
	},
	{
		name: 'Evolution',
		price: 39,
		WorkSpace: {
			seats: 'Unlimited',
			objects: 'Up to 8'
		},
		Automation: {
			credits: '2000'
		},
		EmailCalendar: {
			storage: 'Up to 5GB'
		}
	},
	{
		name: 'Evolution +',
		price: 59,
		WorkSpace: {
			seats: 'Unlimited',
			objects: 'Up to 12'
		},
		Automation: {
			credits: '4000'
		},
		EmailCalendar: {
			storage: 'Up to 25GB'
		}
	},
	{
		name: 'Enterprise',
		price: 129,
		WorkSpace: {
			seats: 'Unlimited',
			objects: 'Unlimited'
		},
		Automation: {
			credits: '5000+'
		},
		EmailCalendar: {
			storage: 'Price per use'
		}
	}
]

export const createAccountOptions = [
	{
		id: 1,
		optionName: 'Setup your account Manually',
		optionDescription:
			'You can get everything you want if you work hard, trust the process, and stick to the plan.'
	},
	{
		id: 2,
		optionName: 'Set up your account quickly with AI',
		optionDescription:
			'You can get everything you want if you work hard, trust the process, and stick to the plan.'
	}
]

export const onBoardingOptions = [
	{
		id: 1,
		optionName: 'Setup your account Manually',
		optionDescription:
			'You can get everything you want if you work hard, trust the process, and stick to the plan.'
	},
	{
		id: 2,
		optionName: 'Set up your account quickly with AI',
		optionDescription:
			'You can get everything you want if you work hard, trust the process, and stick to the plan.'
	}
]

export const FormDetails = {
	CustomerDetails: [
		{
			key: 'CustomerName',
			type: 'input',
			reduxName: 'name',
			isForm: false,
			templateOptions: {
				label: 'Customer Name',
				placeholder: 'Enter Customer Name',
				required: true,
				miniumum: 4,
				maximum: null,
				type: 'text',
				styleClasses: 'flex-grow'
			}
		},
		{
			key: 'CustomerEmail',
			type: 'input',
			reduxName: 'email',
			isForm: false,
			templateOptions: {
				label: 'Customer Email',
				placeholder: 'Enter Customer Email',
				required: true,
				miniumum: 4,
				maximum: null,
				type: 'email',
				styleClasses: 'flex-grow'
			}
		},
		{
			key: 'Customermobile',
			type: 'input',
			reduxName: 'mobile',
			isForm: false,
			templateOptions: {
				label: 'Customer Mobile',
				placeholder: 'Enter Customer Mobile',
				required: true,
				miniumum: 9,
				maximum: 9,
				type: 'number',
				styleClasses: 'flex-grow'
			}
		}
	],
	VehcileMotorDetails: [
		{
			key: 'bodyType',
			type: 'select',
			reduxName: 'bodyTypeID',
			isForm: true,
			formName: 'bodyType',
			templateOptions: {
				label: 'Body Type',
				placeholder: 'Select Body Type',
				required: true,
				miniumum: 0,
				maximum: null,
				type: 'text',
				styleClasses: ''
			}
		},
		{
			key: 'Make',
			type: 'select',
			reduxName: 'makeID',
			isForm: true,
			formName: 'make',
			templateOptions: {
				label: 'Make',
				placeholder: 'Select Make',
				required: true,
				miniumum: 0,
				maximum: null,
				type: 'text',
				styleClasses: ''
			}
		},
		{
			key: 'Model',
			type: 'select',
			reduxName: 'modelID',
			isForm: true,
			formName: 'model',
			templateOptions: {
				label: 'Model',
				placeholder: 'Select Model',
				required: true,
				miniumum: 0,
				maximum: null,
				type: 'text',
				styleClasses: ''
			}
		},
		{
			key: 'MotorUsage',
			type: 'select',
			reduxName: 'vehicleUsageID',
			isForm: true,
			formName: 'motorUsage',
			templateOptions: {
				label: 'Motor Usage',
				placeholder: 'Select Motor Usage',
				required: true,
				miniumum: 0,
				maximum: null,
				type: 'text',
				styleClasses: ''
			}
		},
		{
			key: 'NumberOfSeats',
			type: 'input',
			reduxName: 'seat',
			isForm: true,
			formName: 'numberOfSeats',
			templateOptions: {
				label: 'Number of seats',
				placeholder: 'Select Number of seats',
				required: true,
				miniumum: 0,
				maximum: null,
				type: 'text',
				styleClasses: ''
			}
		},
		{
			key: 'ManufactureYear',
			type: 'select',
			reduxName: 'year',
			isForm: true,
			formName: 'manufactureyear',
			templateOptions: {
				label: 'Manufacture Year',
				placeholder: 'Select Manufacture Year',
				required: true,
				miniumum: 0,
				maximum: null,
				type: 'text',
				styleClasses: ''
			}
		},
		{
			key: 'ExcessLimit',
			type: 'input',
			reduxName: 'excessLimit',
			isForm: true,
			formName: 'excessLimit',
			templateOptions: {
				label: 'Excess Limit',
				placeholder: 'Excess Limit',
				required: true,
				miniumum: 0,
				maximum: null,
				type: 'text',
				styleClasses: ''
			}
		}
	]
}
