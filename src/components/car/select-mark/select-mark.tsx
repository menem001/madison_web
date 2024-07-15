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

type MarkProps = {
	setCount:(num:number) => void
}

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

export function SelectMark(props: MarkProps) {
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const dispatch = useAppDispatch()

	useGSAP(() => {
		if (vehicleData.mark === '') {
			gsap.from('.select', { y: 80, opacity: 0, duration: 1, delay: 2 })
			gsap.to('.popular', { duration: 1, text: 'Popular Brands', delay: 3 })
			gsap.from('.suggestedGrid1', { y: 80, opacity: 0, duration: 1, delay: 4 })
			gsap.from('.suggestedGrid2', { y: 80, opacity: 0, duration: 1, delay: 5 })
			gsap.to('.marktitle', { duration: 1, text: 'Select the Mark' })
			gsap.to('.marksubtitle', {
				duration: 1,
				text: 'The manufacturer or brand of the vehicle (e.g. Toyota, Honda, Ford)',
				delay: 1
			})
		} else {
			gsap.from('.select', { y: 80, opacity: 0, duration: 1 })
			gsap.to('.popular', { duration: 1, text: 'Popular Brands' })
			gsap.from('.suggestedGrid1', { y: 80, opacity: 0, duration: 1 })
			gsap.from('.suggestedGrid2', { y: 80, opacity: 0, duration: 1 })
			gsap.to('.marktitle', { duration: 1, text: 'Select the Mark' })
			gsap.to('.marksubtitle', {
				duration: 1,
				text: 'The manufacturer or brand of the vehicle (e.g. Toyota, Honda, Ford)'
			})
		}
	})

	function updateMark(mark: string) {
		dispatch(updateVehicleMark(mark))
		props.setCount(0)
	}

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
					value={vehicleData.mark}
					onValueChange={updateMark}>
					<SelectTrigger
						className='w-1/2'
						title='Select the Mark'
						value={vehicleData.mark}>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='Audi'>Audi</SelectItem>
						<SelectItem value='Peugeot'>Peugeot</SelectItem>
						<SelectItem value='Bentley'>Bentley</SelectItem>
						<SelectItem value='Nissan'>Nissan</SelectItem>
						<SelectItem value='Jeep'>Jeep</SelectItem>
						<SelectItem value='BMW'>BMW</SelectItem>
						<SelectItem value='Ford'>Ford</SelectItem>
						<SelectItem value='Mercedes'>Mercedes</SelectItem>
						<SelectItem value='Volkswagen'>Volkswagen</SelectItem>
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
