import { assets } from '@/assets'
import { cn } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateVehicleBodyType } from '@/redux/slices'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'

const bodyTypes = [
	{
		id: 'Sedan',
		name: 'Sedan',
		image: assets.images.sedan
	},
	{
		id: 'Coupe',
		name: 'Coupe',
		image: assets.images.coupe
	},
	{
		id: 'Truck',
		name: 'Truck',
		image: assets.images.truck
	},
	{
		id: 'SUV',
		name: 'SUV',
		image: assets.images.suv
	},
	{
		id: 'Hatchback',
		name: 'Hatchback',
		image: assets.images.hat
	},
	{
		id: 'Convertible',
		name: 'Convertible',
		image: assets.images.mini
	}
]

export function BodyType() {
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const dispatch = useAppDispatch()

	useGSAP(() => {
		if (vehicleData.bodyType.length === 0) {
			gsap.from('.selectBody', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
			gsap.to('.bodytitle', { duration: 0.5, text: 'Body Type' })
			gsap.to('.bodysubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes',
				delay: 0.5
			})
			gsap.to('.bodySuggest', {
				duration: 0.5,
				text: 'Suggested Body Type',
				delay: 1.5
			})
			gsap.from('.suggestedBodyGrid1', {
				y: 80,
				opacity: 0,
				duration: 0.5,
				delay: 2
			})
			gsap.from('.suggestedBodyGrid2', {
				y: 80,
				opacity: 0,
				duration: 0.5,
				delay: 2.5
			})
		} else {
			gsap.from('.selectBody', { y: 80, opacity: 0, duration: 0.5 })
			gsap.to('.bodytitle', { duration: 0.5, text: 'Body Type' })
			gsap.to('.bodysubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes'
			})
			gsap.to('.bodySuggest', {
				duration: 0.5,
				text: 'Suggested Body Type'
			})
			gsap.from('.suggestedBodyGrid1', {
				y: 80,
				opacity: 0,
				duration: 0.5
			})
			gsap.from('.suggestedBodyGrid2', {
				y: 80,
				opacity: 0,
				duration: 0.5
			})
		}
	})

	// function updateBodyType(type: string) {
	// 	dispatch(updateVehicleBodyType(type))
	// }

	function handleClick(type: string) {
		return function () {
			dispatch(updateVehicleBodyType(type))
		}
	}

	function handleChange(type: string) {
		dispatch(updateVehicleBodyType(type))
	}

	return (
		<div
			className={cn('flex flex-col gap-7', {
				'min-h-[65vh]': vehicleData.bodyType.length === 0
			})}>
			<div className='flex flex-col gap-2'>
				<h1 className='bodytitle font-jakarta text-xl font-bold text-blue-300'></h1>
				<span className='bodysubtitle font-roboto text-sm font-medium text-gray-500'></span>
			</div>
			<div className='selectBody'>
				<Select
					value={vehicleData.bodyType.join(',')}
					onValueChange={handleChange}>
					<SelectTrigger
						className='w-3/4'
						title='Body Type'
						value={vehicleData.bodyType.join(',')}>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='Sedan'>Sedan</SelectItem>
						<SelectItem value='Coupe'>Coupe</SelectItem>
						<SelectItem value='Truck'>Truck</SelectItem>
						<SelectItem value='SUV'>SUV</SelectItem>
						<SelectItem value='Hatchback'>Hatchback</SelectItem>
						<SelectItem value='Convertible'>Convertible</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<h2 className='bodySuggest font-jakarta text-lg font-bold'></h2>
			<div className='grid grid-cols-3 gap-4'>
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
			</div>
		</div>
	)
}
