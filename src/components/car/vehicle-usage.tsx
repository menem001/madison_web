'use client'

import { cn } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateVehicleUsage } from '@/redux/slices'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useGetVehicleUsageListMutation } from '@/redux/api/commonApi'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { assets } from '@/assets'
import { Skeleton } from '../ui/skeleton'

export function VehicleUsage() {
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const appsData = useAppSelector((state) => state.apps)

	const dispatch = useAppDispatch()

	const [vehicleUsage] = useGetVehicleUsageListMutation()

	const [vehicleUsageList, setVehicleUsageList] = useState<{ value: string; label: string }[]>([])

	useGSAP(() => {
		if (vehicleData.vehicleUsage === '') {
			gsap.from('.selectUsage', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
			gsap.to('.usagetitle', { duration: 0.5, text: 'Vehicle Usage' })
			gsap.to('.usagesubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes',
				delay: 0.5
			})
			// gsap.to('.usageSuggest', {
			// 	duration: 0.5,
			// 	text: 'Suggested Usage Types',
			// 	delay: 1.5
			// })
			// gsap.from('.suggestedGridusage', {
			// 	y: 80,
			// 	opacity: 0,
			// 	duration: 0.5,
			// 	delay: 2
			// })
		} else {
			gsap.from('.selectUsage', { y: 80, opacity: 0, duration: 0.5 })
			gsap.to('.usagetitle', { duration: 0.5, text: 'Vehicle Usage' })
			gsap.to('.usagesubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes'
			})
			// gsap.to('.usageSuggest', {
			// 	duration: 0.5,
			// 	text: 'Suggested Usage Types'
			// })
			// gsap.from('.suggestedGridusage', {
			// 	y: 80,
			// 	opacity: 0,
			// 	duration: 0.5
			// })
		}
	})

	useEffect(() => {
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
	}, [appsData.branchCode, appsData.insuranceID, vehicleUsage])

	function updateUsage(id: string) {
		const pos = vehicleUsageList.findIndex((item) => {
			return item.value === id
		})

		if (pos !== -1) {
			dispatch(updateVehicleUsage({ usage: vehicleUsageList[pos].label, id: id }))
		}
	}

	return (
		<div
			className={cn('flex flex-col gap-7', {
				'min-h-[65vh]': vehicleData.vehicleUsage === ''
			})}>
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
					<h1 className='usagetitle font-jakarta text-xl font-bold text-blue-300'></h1>
					<span className='usagesubtitle font-roboto text-sm font-medium text-gray-500'></span>
				</div>
			</div>
			<div className='selectUsage'>
				{vehicleUsageList.length === 0 ? (
					<Skeleton className='h-16 w-3/4' />
				) : (
					<Select
						value={vehicleData.vehicleUsageID}
						onValueChange={updateUsage}>
						<SelectTrigger
							className='w-3/4'
							title='Usage'
							value={vehicleData.vehicleUsageID}>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{vehicleUsageList.map((item, index) => {
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
			{/* {vehicleUsageList.length !== 0 && (
				<>
					<h2 className='usageSuggest font-jakarta text-lg font-bold'></h2>
					<div className='suggestedGridusage grid grid-cols-5 gap-9'>
						{vehicleUsageList.slice(0, 5).map((usage, index) => {
							return (
								<div
									key={index}
									className='flex cursor-pointer items-center justify-center rounded-md py-3 font-inter text-sm shadow-md hover:shadow-xl'
									onClick={updateUsage(usage.value)}>
									{usage.label}
								</div>
							)
						})}
					</div>
				</>
			)} */}
		</div>
	)
}
