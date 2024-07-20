'use client'

import { cn } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateVehicleBodyType } from '@/redux/slices'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'
import { useGetBodyTypeListMutation } from '@/redux/api/commonApi'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { assets } from '@/assets'

export function BodyType() {
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const appsData = useAppSelector((state) => state.apps)
	const dispatch = useAppDispatch()

	const [BodyType] = useGetBodyTypeListMutation()

	const [bodyTypeList, setBodyTypeList] = useState<{ value: string; label: string }[]>([])

	useGSAP(() => {
		if (vehicleData.bodyType === '') {
			gsap.from('.selectBody', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
			gsap.to('.bodytitle', { duration: 0.5, text: 'Body Type' })
			gsap.to('.bodysubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes',
				delay: 0.5
			})
			// gsap.to('.bodySuggest', {
			// 	duration: 0.5,
			// 	text: 'Suggested Body Type',
			// 	delay: 1.5
			// })
			// gsap.from('.suggestedBodyGrid1', {
			// 	y: 80,
			// 	opacity: 0,
			// 	duration: 0.5,
			// 	delay: 2
			// })
			// gsap.from('.suggestedBodyGrid2', {
			// 	y: 80,
			// 	opacity: 0,
			// 	duration: 0.5,
			// 	delay: 2.5
			// })
		} else {
			gsap.from('.selectBody', { y: 80, opacity: 0, duration: 0.5 })
			gsap.to('.bodytitle', { duration: 0.5, text: 'Body Type' })
			gsap.to('.bodysubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes'
			})
			// gsap.to('.bodySuggest', {
			// 	duration: 0.5,
			// 	text: 'Suggested Body Type'
			// })
			// gsap.from('.suggestedBodyGrid1', {
			// 	y: 80,
			// 	opacity: 0,
			// 	duration: 0.5
			// })
			// gsap.from('.suggestedBodyGrid2', {
			// 	y: 80,
			// 	opacity: 0,
			// 	duration: 0.5
			// })
		}
	})

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
		<div
			className={cn('flex flex-col gap-7', {
				'min-h-[65vh]': vehicleData.bodyType === ''
			})}>
			<div className='-ml-16 flex flex-row items-center gap-4'>
				<div className='h-12 w-12 overflow-hidden rounded-full'>
					<Image
						alt='face'
						height={60}
						src={assets.images.imageFace}
						width={60}
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<h1 className='bodytitle font-jakarta text-xl font-bold text-blue-300'></h1>
					<span className='bodysubtitle font-roboto text-sm font-medium text-gray-500'></span>
				</div>
			</div>
			<div className='selectBody'>
				<Select
					value={vehicleData.bodyTypeID}
					onValueChange={updateBody}>
					<SelectTrigger
						className='w-3/4'
						title='Body Type'
						value={vehicleData.bodyTypeID}>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{bodyTypeList.map((item, index) => {
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
			</div>
			{/* <div className='grid grid-cols-3 gap-4'>
				{bodyTypes.slice(0, 3).map((body) => {
					return (
						<div
							key={body.id}
							className='suggestedBodyGrid1 flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md py-3 font-inter text-sm shadow-md hover:shadow-xl'
							onClick={handleClick(body.name)}>
							<div className='h-24 w-40'>
								<Image
									alt={body.name}
									height={150}
									src={body.image}
									width={200}
								/>
							</div>
							<span className='font-inter text-sm font-semibold text-gray-700'>
								{body.name}
							</span>
						</div>
					)
				})}
				{bodyTypes.slice(3, 6).map((body) => {
					return (
						<div
							key={body.id}
							className='suggestedBodyGrid2 flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md py-3 font-inter text-sm shadow-md hover:shadow-xl'
							onClick={handleClick(body.name)}>
							<div className='h-24 w-40'>
								<Image
									alt={body.name}
									height={150}
									src={body.image}
									width={200}
								/>
							</div>
							<span className='font-inter text-sm font-semibold text-gray-700'>
								{body.name}
							</span>
						</div>
					)
				})}
			</div> */}
		</div>
	)
}
