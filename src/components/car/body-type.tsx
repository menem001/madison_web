'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateVehicleBodyType } from '@/redux/slices'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { useGetBodyTypeListMutation } from '@/redux/api/commonApi'
import { useEffect, useState } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { type UseFormReturn } from 'react-hook-form'

type bodyTypeProps = {
	form: UseFormReturn<
		{
			motorUsage: string
			bodyType: string
			make: string
			model: string
			manufactureyear: string
			numberOfSeats: string
		},
		unknown,
		undefined
	>
	setSubmittedStatus: () => void
}

export function BodyType(props: bodyTypeProps) {
	const appsData = useAppSelector((state) => state.apps)
	const dispatch = useAppDispatch()

	const [BodyType] = useGetBodyTypeListMutation()

	const [bodyTypeList, setBodyTypeList] = useState<{ value: string; label: string }[]>([])

	useEffect(() => {
		const tempArr: { value: string; label: string }[] = []
		const request = { InsuranceId: appsData.insuranceID, BranchCode: appsData.branchCode }
		const res = BodyType(request)
		res.then((value) => {
			if (value.data?.type === 'success' && value.data.data !== undefined) {
				value.data.data.Result.map((value) => {
					tempArr.push({
						value: value.Code,
						label: value.CodeDesc
					})
				})
				setBodyTypeList(tempArr)
			}
		})
	}, [BodyType, appsData.branchCode, appsData.insuranceID])

	function updateBody(id: string) {
		const pos = bodyTypeList.findIndex((item) => {
			return item.value === id
		})

		if (pos !== -1) {
			dispatch(updateVehicleBodyType({ bodyType: bodyTypeList[pos].label, id: id }))
		}
	}

	return (
		<FormField
			control={props.form.control}
			name='bodyType'
			render={({ field }) => (
				<FormItem className='w-full'>
					<FormLabel className='text-blue-325'>Body Type</FormLabel>
					<FormControl>
						<Select
							disabled={field.disabled}
							name={field.name}
							value={field.value}
							onValueChange={(e) => {
								field.onChange(e)
								updateBody(e)
								props.setSubmittedStatus()
							}}>
							<SelectTrigger
								ref={field.ref}
								className='border-gray-360 shadow-inputShadowDrop border'>
								<SelectValue placeholder='Select Body Type' />
							</SelectTrigger>
							<SelectContent>
								{bodyTypeList.map((bodyType, index) => {
									return (
										<SelectItem
											key={index}
											value={bodyType.value}>
											{bodyType.label}
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
		// 		'min-h-[65vh]': vehicleData.bodyType === ''
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
		// 			<h1 className='bodytitle font-jakarta text-xl font-bold text-blue-300'></h1>
		// 			<span className='bodysubtitle font-roboto text-sm font-medium text-gray-500'></span>
		// 		</div>
		// 	</div>
		// 	<div className='selectBody'>
		// 		{bodyTypeList.length === 0 ? (
		// 			<Skeleton className='h-16 w-full lg:w-3/4' />
		// 		) : (
		// 			<Select
		// 				value={vehicleData.bodyTypeID}
		// 				onValueChange={updateBody}>
		// 				<SelectTrigger
		// 					className='w-full lg:w-3/4'
		// 					title='Body Type'
		// 					value={vehicleData.bodyTypeID}>
		// 					<SelectValue />
		// 				</SelectTrigger>
		// 				<SelectContent>
		// 					{bodyTypeList.map((item, index) => {
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
		// </div>
	)
}
