'use client'

import { cn } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateVehicleModel } from '@/redux/slices'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { useGetMotorModelListMutation } from '@/redux/api/commonApi'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { assets } from '@/assets'
import { Skeleton } from '../ui/skeleton'

export function SelectModel() {
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const appsData = useAppSelector((state) => state.apps)
	const model = useAppSelector((state) => state.whitebookdetails.Model)

	const [getModel] = useGetMotorModelListMutation()

	const [modelsList, setModelsList] = useState<{ value: string; label: string }[]>([])

	const dispatch = useAppDispatch()

	useGSAP(() => {
		if (vehicleData.model === '') {
			gsap.from('.selectModel', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
			gsap.to('.modeltitle', { duration: 0.5, text: 'Select the Model' })
			gsap.to('.modelsubtitle', {
				duration: 0.5,
				// eslint-disable-next-line quotes
				text: "The specific design or type of vehicle within the manufacturer's lineup (e.g. Corolla, Civic, Mustang)",
				delay: 0.5
			})
			gsap.to('.modelSuggest', {
				duration: 0.5,
				text: 'Suggested Models',
				delay: 1.5
			})
			gsap.from('.suggestedGridModel', {
				y: 80,
				opacity: 0,
				duration: 0.5,
				delay: 2
			})
		} else {
			gsap.from('.selectModel', { y: 80, opacity: 0, duration: 0.5 })
			gsap.to('.modeltitle', { duration: 0.5, text: 'Select the Model' })
			gsap.to('.modelsubtitle', {
				duration: 0.5,
				// eslint-disable-next-line quotes
				text: "The specific design or type of vehicle within the manufacturer's lineup (e.g. Corolla, Civic, Mustang)"
			})
			gsap.to('.modelSuggest', {
				duration: 0.5,
				text: 'Suggested Models'
			})
			gsap.from('.suggestedGridModel', {
				y: 80,
				opacity: 0,
				duration: 0.5
			})
		}
	})

	// function updateModel(model: string) {
	// 	return function () {
	// 		dispatch(updateVehicleModel(model))
	// 	}
	// }

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
		const request = {
			InsuranceId: appsData.insuranceID,
			BranchCode: appsData.branchCode,
			MakeId: vehicleData.makeID
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
	}, [appsData.branchCode, appsData.insuranceID, getModel, vehicleData.makeID])

	useEffect(() => {
		if (modelsList.length !== 0) {
			updateModelByName(model)
		}
	}, [model, modelsList])

	return (
		<div className={cn('flex flex-col gap-7', { 'min-h-[65vh]': vehicleData.model === '' })}>
			<div className='-ml-16 flex flex-row items-center gap-4'>
				<div className='min-h-12 min-w-12 overflow-hidden rounded-full'>
					<Image
						alt='face'
						height={60}
						src={assets.images.imageFace}
						width={60}
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<h1 className='modeltitle font-jakarta text-xl font-bold text-blue-300'></h1>
					<span className='modelsubtitle font-inter text-sm font-medium text-gray-500'></span>
				</div>
			</div>
			<div className='selectModel'>
				{modelsList.length === 0 ? (
					<Skeleton className='h-16 w-3/4' />
				) : (
					<Select
						value={vehicleData.modelID}
						onValueChange={updateModel}>
						<SelectTrigger
							className='w-3/4'
							title='Select the Model'
							value={vehicleData.modelID}>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{modelsList.map((item, index) => {
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
			<h2 className='modelSuggest font-jakarta text-lg font-bold'></h2>
			<div className='suggestedGridModel grid grid-cols-5 gap-4'>
				{modelsList.slice(0, 5).map((model) => {
					return (
						<div
							key={model.value}
							className='flex cursor-pointer items-center justify-center rounded-md py-3 font-inter text-sm shadow-md hover:shadow-xl'
							onClick={() => {
								updateModel(model.value)
							}}>
							{model.label}
						</div>
					)
				})}
			</div>
		</div>
	)
}
