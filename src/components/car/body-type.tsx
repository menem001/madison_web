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

type bodyTypeProps = {
	setCount:(num:number) => void
}

export function BodyType(props:bodyTypeProps) {
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const dispatch = useAppDispatch()

	useGSAP(() => {
		if (vehicleData.bodyType.length === 0) {
			gsap.from('.selectBody', { y: 80, opacity: 0, duration: 1, delay: 2 })
			gsap.to('.bodytitle', { duration: 1, text: 'Body Type' })
			gsap.to('.bodysubtitle', {
				duration: 1,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes',
				delay: 1
			})
			gsap.to('.bodySuggest', {
				duration: 1,
				text: 'Suggested Body Type',
				delay: 3
			})
			gsap.from('.suggestedBodyGrid1', {
				y: 80,
				opacity: 0,
				duration: 1,
				delay: 4
			})
			gsap.from('.suggestedBodyGrid2', {
				y: 80,
				opacity: 0,
				duration: 1,
				delay: 5
			})
		} else {
			gsap.from('.selectBody', { y: 80, opacity: 0, duration: 1 })
			gsap.to('.bodytitle', { duration: 1, text: 'Body Type' })
			gsap.to('.bodysubtitle', {
				duration: 1,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes'
			})
			gsap.to('.bodySuggest', {
				duration: 1,
				text: 'Suggested Body Type'
			})
			gsap.from('.suggestedBodyGrid1', {
				y: 80,
				opacity: 0,
				duration: 1
			})
			gsap.from('.suggestedBodyGrid2', {
				y: 80,
				opacity: 0,
				duration: 1
			})
		}
	})

	// function updateBodyType(type: string) {
	// 	dispatch(updateVehicleBodyType(type))
	// }

	function handleClick(type: string) {
		return function () {
			dispatch(updateVehicleBodyType(type))
			props.setCount(3)
		}
	}

	function handleChange(type: string) {
		dispatch(updateVehicleBodyType(type))
		props.setCount(3)
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
						className='w-1/2'
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
							className='suggestedBodyGrid1 flex flex-col overflow-hidden cursor-pointer items-center justify-center rounded-md shadow-md py-3 hover:shadow-xl text-sm font-inter'
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
							className='suggestedBodyGrid2 flex flex-col overflow-hidden cursor-pointer items-center justify-center rounded-md shadow-md py-3 hover:shadow-xl text-sm font-inter'
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
