'use client'

import { assets } from '@/assets'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui'
import { cn } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateVehicleMark } from '@/redux/slices'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/all'
import { MarkCard } from './mark-card'
import { useGetMotorMakeListMutation } from '@/redux/api/commonApi'
import { useEffect, useState } from 'react'

const brands = [
	{
		id: 'Peugeot',
		name: 'Peugeot',
		logo: assets.images.peugeotLogo
	},
	{
		id: 'Audi',
		name: 'Audi',
		logo: assets.images.audi
	},
	{
		id: 'Bentley',
		name: 'Bentley',
		logo: assets.images.bentley
	},
	{
		id: 'Nissan',
		name: 'Nissan',
		logo: assets.images.nissan
	},
	{
		id: 'Jeep',
		name: 'Jeep',
		logo: assets.images.jeep
	},
	{
		id: 'BMW',
		name: 'BMW',
		logo: assets.images.bmw
	},
	{
		id: 'Ford',
		name: 'Ford',
		logo: assets.images.ford
	},
	{
		id: 'Mercedes',
		name: 'Mercedes',
		logo: assets.images.benz
	},
	{
		id: 'Volkswagen',
		name: 'Volkswagen',
		logo: assets.images.vw
	},
	{
		id: 'Peugeot',
		name: 'Peugeot',
		logo: assets.images.peugeotLogo
	}
]

gsap.registerPlugin(TextPlugin)

export function SelectMark() {
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const appsData = useAppSelector((state) => state.apps)

	const dispatch = useAppDispatch()

	const [MotorMakeList] = useGetMotorMakeListMutation()
	const [motorListArr, setmotorListArr] = useState<{ value: string; label: string }[]>([])

	useGSAP(() => {
		if (vehicleData.mark === '') {
			gsap.from('.select', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
			gsap.to('.popular', { duration: 0.5, text: 'Popular Brands', delay: 1.5 })
			gsap.from('.suggestedGrid1', { y: 80, opacity: 0, duration: 0.5, delay: 2 })
			gsap.from('.suggestedGrid2', { y: 80, opacity: 0, duration: 0.5, delay: 2.5 })
			gsap.to('.marktitle', { duration: 0.5, text: 'Select the Mark' })
			gsap.to('.marksubtitle', {
				duration: 0.5,
				text: 'The manufacturer or brand of the vehicle (e.g. Toyota, Honda, Ford)',
				delay: 0.5
			})
		} else {
			gsap.from('.select', { y: 80, opacity: 0, duration: 0.5 })
			gsap.to('.popular', { duration: 0.5, text: 'Popular Brands' })
			gsap.from('.suggestedGrid1', { y: 80, opacity: 0, duration: 0.5 })
			gsap.from('.suggestedGrid2', { y: 80, opacity: 0, duration: 0.5 })
			gsap.to('.marktitle', { duration: 0.5, text: 'Select the Mark' })
			gsap.to('.marksubtitle', {
				duration: 0.5,
				text: 'The manufacturer or brand of the vehicle (e.g. Toyota, Honda, Ford)'
			})
		}
	})

	function updateMark(makeID: string) {
		const markpos = motorListArr.findIndex((item) => {
			return item.value === makeID
		})

		if (markpos !== -1) {
			dispatch(updateVehicleMark({ mark: motorListArr[markpos].label, makeID: makeID }))
		}
	}

	useEffect(() => {
		const request = { InsuranceId: appsData.insuranceID, BranchCode: appsData.branchCode }
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
	}, [MotorMakeList, appsData.branchCode, appsData.insuranceID])

	return (
		<div
			className={cn('flex flex-col gap-7', {
				'min-h-[60svh]': vehicleData.mark === ''
			})}>
			<div className='flex flex-col gap-2'>
				<h1 className='marktitle font-jakarta text-xl font-bold text-blue-300'></h1>
				<span className='marksubtitle font-inter text-sm font-medium text-gray-500'></span>
			</div>
			<div className='select'>
				<Select
					value={vehicleData.makeID}
					onValueChange={updateMark}>
					<SelectTrigger
						className='w-3/4'
						title='Select the Mark'
						value={vehicleData.makeID}>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{motorListArr.map((item, index) => {
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
			<h2 className='popular font-Diesel text-lg font-bold'></h2>
			<div className='grid grid-cols-5 gap-4'>
				{brands.slice(0, 5).map((brand) => {
					return (
						<MarkCard
							key={brand.id}
							className='suggestedGrid1'
							logo={brand.logo}
							name={brand.name}
							onClick={updateMark}
						/>
					)
				})}
				{brands.slice(5, 10).map((brand) => {
					return (
						<MarkCard
							key={brand.id}
							className='suggestedGrid2'
							logo={brand.logo}
							name={brand.name}
							onClick={updateMark}
						/>
					)
				})}
			</div>
		</div>
	)
}
