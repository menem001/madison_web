'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateVehicleMark } from '@/redux/slices'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/all'
import { useGetMotorMakeListMutation } from '@/redux/api/commonApi'
import { useEffect, useState } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { type UseFormReturn } from 'react-hook-form'

gsap.registerPlugin(TextPlugin)

type selectMarkProps = {
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

export function SelectMark(props: selectMarkProps) {
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const appsData = useAppSelector((state) => state.apps)
	const make = useAppSelector((state) => state.whitebookdetails.Make)

	const dispatch = useAppDispatch()

	const [MotorMakeList] = useGetMotorMakeListMutation()
	const [motorListArr, setmotorListArr] = useState<{ value: string; label: string }[]>([])

	function updateMark(makeID: string) {
		const markpos = motorListArr.findIndex((item) => {
			return item.value === makeID
		})

		if (markpos !== -1) {
			dispatch(updateVehicleMark({ mark: motorListArr[markpos].label, makeID: makeID }))
		}
	}

	function updateMarkFromName(make: string) {
		const markpos = motorListArr.findIndex((item) => {
			return item.label.toLowerCase() === make.toLowerCase()
		})

		if (markpos !== -1) {
			dispatch(
				updateVehicleMark({
					mark: motorListArr[markpos].label,
					makeID: motorListArr[markpos].value
				})
			)
			props.form.setValue('make', motorListArr[markpos].value)
		}
	}

	useEffect(() => {
		if (vehicleData.mark === '') {
			props.form.setValue('make', '')
		}
	}, [vehicleData.mark])

	useEffect(() => {
		if (vehicleData.bodyTypeID !== '') {
			const request = {
				InsuranceId: appsData.insuranceID,
				BranchCode: appsData.branchCode,
				BodyId: vehicleData.bodyTypeID
			}
			const tempArr: { value: string; label: string }[] = []
			const res = MotorMakeList(request)
			res.then((value) => {
				if (value.data?.type === 'success' && value.data?.data !== undefined) {
					value.data.data!.Result.map((value) => {
						tempArr.push({
							value: value.Code,
							label: value.CodeDesc
						})
					})
					setmotorListArr(tempArr)
				}
			})
		}
	}, [vehicleData.bodyTypeID])

	useEffect(() => {
		if (motorListArr.length !== 0) {
			updateMarkFromName(make)
		}
	}, [make, motorListArr])

	return (
		<FormField
			control={props.form.control}
			name='make'
			render={({ field }) => (
				<FormItem className='w-full'>
					<FormLabel className='text-blue-325'>Make</FormLabel>
					<FormControl>
						<Select
							disabled={field.disabled || vehicleData.bodyType === ''}
							name={field.name}
							value={field.value}
							onValueChange={(e) => {
								field.onChange(e)
								updateMark(e)
								props.setSubmittedStatus()
							}}>
							<SelectTrigger
								ref={field.ref}
								className='border-gray-360 border shadow-inputShadowDrop'>
								<SelectValue placeholder='Select Make' />
							</SelectTrigger>
							<SelectContent>
								{motorListArr.map((brand, index) => {
									return (
										<SelectItem
											key={index}
											value={brand.value}>
											{brand.label}
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
		// <div
		// 	className={cn('flex flex-col gap-7', {
		// 		'min-h-[60svh]': vehicleData.mark === ''
		// 	})}>
		// 	<div className='-ml-14 flex flex-row items-center gap-4 lg:-ml-16'>
		// 		<div className='min-h-12 min-w-12 overflow-hidden rounded-full'>
		// 			<Image
		// 				alt='face'
		// 				height={60}
		// 				src={assets.images.imageFace}
		// 				width={60}
		// 			/>
		// 		</div>
		// 		<div className='flex flex-col gap-2'>
		// 			<h1 className='marktitle font-jakarta text-xl font-bold text-blue-300'></h1>
		// 			<span className='marksubtitle font-inter text-sm font-medium text-gray-500'></span>
		// 		</div>
		// 	</div>
		// 	<div className='select'>
		// 		{motorListArr.length === 0 ? (
		// 			<Skeleton className='w-full lg:w-3/4' />
		// 		) : (
		// 			<Select
		// 				value={vehicleData.makeID}
		// 				onValueChange={updateMark}>
		// 				<SelectTrigger
		// 					className='w-full lg:w-3/4'
		// 					title='Select the Mark'
		// 					value={vehicleData.makeID}>
		// 					<SelectValue />
		// 				</SelectTrigger>
		// 				<SelectContent>
		// 					{motorListArr.map((item, index) => {
		// 						return (
		// 							<SelectItem
		// 								key={index}
		// 								value={item.value}>
		// 								{item.label}
		// 							</SelectItem>
		// 						)
		// 					})}
		// 				</SelectContent>
		// 			</Select>
		// 		)}
		// 	</div>
		// 	<h2 className='popular font-Diesel text-lg font-bold'></h2>
		// 	<div className='grid grid-cols-3 gap-2 lg:grid-cols-5 lg:gap-4'>
		// 		{showCaseBrands.slice(0, 5).map((brand) => {
		// 			return (
		// 				<MarkCard
		// 					key={brand.id}
		// 					className='suggestedGrid1'
		// 					code={brand.code}
		// 					logo={brand.logo}
		// 					name={brand.name}
		// 					onClick={updateMark}
		// 				/>
		// 			)
		// 		})}
		// 	</div>
		// </div>
	)
}
