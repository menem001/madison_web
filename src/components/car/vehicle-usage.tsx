'use client'

// import { cn } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateVehicleUsage } from '@/redux/slices'
// import { useGSAP } from '@gsap/react'
// import gsap from 'gsap'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useGetVehicleUsageListMutation } from '@/redux/api/commonApi'
import { useEffect, useState } from 'react'
// import Image from 'next/image'
// import { assets } from '@/assets'
// import { Skeleton } from '../ui/skeleton'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { type UseFormReturn } from 'react-hook-form'

type VehicleUsageProps = {
	form: UseFormReturn<
		{
			motorUsage: string
			bodyType: string
			make: string
			model: string
			manufactureyear: string
			numberOfSeats: string
			excessLimit: string
		},
		unknown,
		undefined
	>
	setSubmittedStatus: () => void
}

export function VehicleUsage(props: VehicleUsageProps) {
	const appsData = useAppSelector((state) => state.apps)
	const model = useAppSelector((state) => state.carInsurance.model)

	const dispatch = useAppDispatch()

	const [vehicleUsage] = useGetVehicleUsageListMutation()

	const [vehicleUsageList, setVehicleUsageList] = useState<{ value: string; label: string }[]>([])

	// useGSAP(() => {
	// 	if (vehicleData.vehicleUsage === '') {
	// 		gsap.from('.selectUsage', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
	// 		gsap.to('.usagetitle', { duration: 0.5, text: 'Vehicle Usage' })
	// 		gsap.to('.usagesubtitle', {
	// 			duration: 0.5,
	// 			text: 'How the vehicle is used, such as for personal, business, or commercial purposes',
	// 			delay: 0.5
	// 		})
	// 		// gsap.to('.usageSuggest', {
	// 		// 	duration: 0.5,
	// 		// 	text: 'Suggested Usage Types',
	// 		// 	delay: 1.5
	// 		// })
	// 		// gsap.from('.suggestedGridusage', {
	// 		// 	y: 80,
	// 		// 	opacity: 0,
	// 		// 	duration: 0.5,
	// 		// 	delay: 2
	// 		// })
	// 	} else {
	// 		gsap.from('.selectUsage', { y: 80, opacity: 0, duration: 0.5 })
	// 		gsap.to('.usagetitle', { duration: 0.5, text: 'Vehicle Usage' })
	// 		gsap.to('.usagesubtitle', {
	// 			duration: 0.5,
	// 			text: 'How the vehicle is used, such as for personal, business, or commercial purposes'
	// 		})
	// 		// gsap.to('.usageSuggest', {
	// 		// 	duration: 0.5,
	// 		// 	text: 'Suggested Usage Types'
	// 		// })
	// 		// gsap.from('.suggestedGridusage', {
	// 		// 	y: 80,
	// 		// 	opacity: 0,
	// 		// 	duration: 0.5
	// 		// })
	// 	}
	// })

	useEffect(() => {
		if (model !== '') {
			const tempArr: { value: string; label: string }[] = []
			const request = { InsuranceId: appsData.insuranceID, BranchCode: appsData.branchCode }
			const res = vehicleUsage(request)
			res.then((value) => {
				if (value.data?.type === 'success' && value.data.data !== undefined) {
					value.data.data.Result.map((value) => {
						tempArr.push({
							value: value.Code,
							label: value.CodeDesc
						})
					})
					setVehicleUsageList(tempArr)
				}
			})
		}
	}, [appsData.branchCode, appsData.insuranceID, vehicleUsage, model])

	function updateUsage(id: string) {
		const pos = vehicleUsageList.findIndex((item) => {
			return item.value === id
		})

		if (pos !== -1) {
			dispatch(updateVehicleUsage({ usage: vehicleUsageList[pos].label, id: id }))
		}
	}

	return (
		<FormField
			control={props.form.control}
			name='motorUsage'
			render={({ field }) => (
				<FormItem className='w-full'>
					<FormLabel className='text-blue-325'>Motor Usage</FormLabel>
					<FormControl>
						<Select
							disabled={field.disabled || model === ''}
							name={field.name}
							value={field.value}
							onValueChange={(e) => {
								field.onChange(e)
								props.setSubmittedStatus()
								updateUsage(e)
							}}>
							<SelectTrigger
								ref={field.ref}
								className='border-gray-360 border shadow-inputShadowDrop'>
								<SelectValue placeholder='Usage' />
							</SelectTrigger>
							<SelectContent>
								{vehicleUsageList.map((title, index) => {
									return (
										<SelectItem
											key={index}
											value={title.value}>
											{title.label}
										</SelectItem>
									)
								})}
							</SelectContent>
						</Select>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
