'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateVehicleModel } from '@/redux/slices'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { useGetMotorModelListMutation } from '@/redux/api/commonApi'
import { useEffect, useState } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { type UseFormReturn } from 'react-hook-form'

type selectModelProps = {
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

export function SelectModel(props: selectModelProps) {
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const appsData = useAppSelector((state) => state.apps)
	const model = useAppSelector((state) => state.whitebookdetails.Model)

	const [getModel] = useGetMotorModelListMutation()

	const [modelsList, setModelsList] = useState<{ value: string; label: string }[]>([])

	const dispatch = useAppDispatch()

	// useGSAP(() => {
	// 	if (vehicleData.model === '') {
	// 		gsap.from('.selectModel', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
	// 		gsap.to('.modeltitle', { duration: 0.5, text: 'Select the Model' })
	// 		gsap.to('.modelsubtitle', {
	// 			duration: 0.5,
	// 			// eslint-disable-next-line quotes
	// 			text: "The specific design or type of vehicle within the manufacturer's lineup (e.g. Corolla, Civic, Mustang)",
	// 			delay: 0.5
	// 		})
	// 		gsap.to('.modelSuggest', {
	// 			duration: 0.5,
	// 			text: 'Suggested Models',
	// 			delay: 1.5
	// 		})
	// 		gsap.from('.suggestedGridModel', {
	// 			y: 80,
	// 			opacity: 0,
	// 			duration: 0.5,
	// 			delay: 2
	// 		})
	// 	} else {
	// 		gsap.from('.selectModel', { y: 80, opacity: 0, duration: 0.5 })
	// 		gsap.to('.modeltitle', { duration: 0.5, text: 'Select the Model' })
	// 		gsap.to('.modelsubtitle', {
	// 			duration: 0.5,
	// 			// eslint-disable-next-line quotes
	// 			text: "The specific design or type of vehicle within the manufacturer's lineup (e.g. Corolla, Civic, Mustang)"
	// 		})
	// 		gsap.to('.modelSuggest', {
	// 			duration: 0.5,
	// 			text: 'Suggested Models'
	// 		})
	// 		gsap.from('.suggestedGridModel', {
	// 			y: 80,
	// 			opacity: 0,
	// 			duration: 0.5
	// 		})
	// 	}
	// })

	// function updateModel(model: string) {
	// 	return function () {
	// 		dispatch(updateVehicleModel(model))
	// 	}
	// }

	useEffect(() => {
		if (vehicleData.model === '') {
			props.form.setValue('model', '')
		}
	}, [vehicleData.model])

	function updateModel(modelid: string) {
		const pos = modelsList.findIndex((item) => {
			return item.value === modelid
		})

		if (pos !== -1) {
			dispatch(updateVehicleModel({ model: modelsList[pos].label, modelID: modelid }))
		}
	}

	function updateModelByName(model: string) {
		const pos = modelsList.findIndex((item) => {
			return item.label.toLowerCase() === model.toLowerCase()
		})

		if (pos !== -1) {
			dispatch(
				updateVehicleModel({ model: modelsList[pos].label, modelID: modelsList[pos].value })
			)
		}
	}

	useEffect(() => {
		if (+vehicleData.bodyTypeID < 5 && vehicleData.mark !== '') {
			const request = {
				InsuranceId: appsData.insuranceID,
				BranchCode: appsData.branchCode,
				MakeId: vehicleData.makeID,
				BodyId: vehicleData.bodyTypeID
			}
			const tempArr: { value: string; label: string }[] = []
			const res = getModel(request)
			res.then((value) => {
				if (value.data?.type === 'success' && value.data?.data !== undefined) {
					value.data.data!.Result.map((value) => {
						tempArr.push({
							value: value.Code,
							label: value.CodeDesc
						})
					})
					setModelsList(tempArr)
				}
			})
		}
	}, [
		appsData.branchCode,
		appsData.insuranceID,
		getModel,
		vehicleData.makeID,
		vehicleData.bodyTypeID,
		vehicleData.mark
	])

	useEffect(() => {
		if (modelsList.length !== 0) {
			updateModelByName(model)
		}
	}, [model, modelsList])

	return (
		<FormField
			control={props.form.control}
			name='model'
			render={({ field }) => (
				<FormItem className='w-full'>
					<FormLabel className='text-blue-325'>Model</FormLabel>
					<FormControl>
						<Select
							disabled={field.disabled}
							name={field.name}
							value={field.value}
							onValueChange={(e) => {
								field.onChange(e)
								updateModel(e)
								props.setSubmittedStatus()
							}}>
							<SelectTrigger
								ref={field.ref}
								className='border-gray-360 border shadow-inputShadowDrop'>
								<SelectValue placeholder='Select Model' />
							</SelectTrigger>
							<SelectContent>
								{modelsList.map((model, index) => {
									return (
										<SelectItem
											key={index}
											value={model.value}>
											{model.label}
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
		// <div className={cn('flex flex-col gap-7', { 'min-h-[65vh]': vehicleData.model === '' })}>
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
		// 			<h1 className='modeltitle font-jakarta text-xl font-bold text-blue-300'></h1>
		// 			<span className='modelsubtitle font-inter text-sm font-medium text-gray-500'></span>
		// 		</div>
		// 	</div>
		// 	<div className='selectModel'>
		// 		{+vehicleData.bodyTypeID < 5 ? (
		// 			<>
		// 				{modelsList.length === 0 ? (
		// 					<Skeleton className='h-16 w-full lg:w-3/4' />
		// 				) : (
		// 					<Select
		// 						value={vehicleData.modelID}
		// 						onValueChange={updateModel}>
		// 						<SelectTrigger
		// 							className='w-full lg:w-3/4'
		// 							title='Select the Model'
		// 							value={vehicleData.modelID}>
		// 							<SelectValue />
		// 						</SelectTrigger>
		// 						<SelectContent>
		// 							{modelsList.map((item, index) => {
		// 								return (
		// 									<SelectItem
		// 										key={index}
		// 										value={item.value}>
		// 										{item.label}
		// 									</SelectItem>
		// 								)
		// 							})}
		// 						</SelectContent>
		// 					</Select>
		// 				)}
		// 			</>
		// 		) : (
		// 			<div className='flex flex-col gap-6'>
		// 				<Input
		// 					placeholder='Model Description'
		// 					value={vehicleModelDesc}
		// 					onChange={(e) => {
		// 						setVehicleModelDesc(e.target.value)
		// 					}}
		// 				/>
		// 				<Button
		// 					className='w-1/2'
		// 					variant='bluebtn'
		// 					onClick={() => {
		// 						dispatch(
		// 							updateVehicleModel({
		// 								model: vehicleModelDesc,
		// 								modelID: '99999'
		// 							})
		// 						)
		// 					}}>
		// 					Continue
		// 				</Button>
		// 			</div>
		// 		)}
		// 	</div>
		// 	{+vehicleData.bodyTypeID < 5 && (
		// 		<>
		// 			<h2 className='modelSuggest font-jakarta text-lg font-bold'></h2>
		// 			<div className='suggestedGridModel grid grid-cols-3 gap-4 lg:grid-cols-5'>
		// 				{modelsList.slice(0, 5).map((model) => {
		// 					return (
		// 						<div
		// 							key={model.value}
		// 							className='flex cursor-pointer items-center justify-center rounded-md py-3 font-inter text-sm shadow-md hover:shadow-xl'
		// 							onClick={() => {
		// 								updateModel(model.value)
		// 							}}>
		// 							{model.label}
		// 						</div>
		// 					)
		// 				})}
		// 			</div>
		// 		</>
		// 	)}
		// </div>
	)
}
