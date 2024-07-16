import { cn } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateVehicleFuel } from '@/redux/slices'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'

const fuelTypes = [
	{
		id: 'Diesel',
		name: 'Diesel'
	},
	{
		id: 'Gas',
		name: 'Gas'
	},
	{
		id: 'Electric',
		name: 'Electric'
	},
	{
		id: 'Hybrid',
		name: 'Hybrid'
	},
	{
		id: 'Essence',
		name: 'Essence'
	}
]

export function FuelType() {
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const dispatch = useAppDispatch()

	useGSAP(() => {
		if (vehicleData.fuelType === '') {
			gsap.from('.selectFuel', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
			gsap.to('.fueltitle', { duration: 0.5, text: 'Fuel Type' })
			gsap.to('.fuelsubtitle', {
				duration: 0.5,
				text: 'The type of Fuel used for your vehicle',
				delay: 0.5
			})
			gsap.to('.fuelSuggest', {
				duration: 0.5,
				text: 'Suggested Models',
				delay: 1.5
			})
			gsap.from('.suggestedGridFuel', {
				y: 80,
				opacity: 0,
				duration: 0.5,
				delay: 2
			})
		} else {
			gsap.from('.selectFuel', { y: 80, opacity: 0, duration: 0.5 })
			gsap.to('.fueltitle', { duration: 0.5, text: 'Fuel Type' })
			gsap.to('.fuelsubtitle', {
				duration: 0.5,
				text: 'The type of Fuel used for your vehicle'
			})
			gsap.to('.fuelSuggest', {
				duration: 0.5,
				text: 'Suggested Models'
			})
			gsap.from('.suggestedGridFuel', {
				y: 80,
				opacity: 0,
				duration: 0.5
			})
		}
	})

	function updateFuel(type: string) {
		return function () {
			dispatch(updateVehicleFuel(type))
		}
	}

	return (
		<div className={cn('flex flex-col gap-7', { 'min-h-[65vh]': vehicleData.fuelType === '' })}>
			<div className='flex flex-col gap-2'>
				<h1 className='fueltitle font-jakarta text-xl font-bold text-blue-300'></h1>
				<span className='fuelsubtitle font-roboto text-sm font-medium text-gray-500'></span>
			</div>
			<div className='selectFuel'>
				<Select
					value={vehicleData.fuelType}
					onValueChange={(e) => {
						dispatch(updateVehicleFuel(e))
					}}>
					<SelectTrigger
						className='w-3/4'
						title='Fuel Type'
						value={vehicleData.fuelType}>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='Diesel'>Diesel</SelectItem>
						<SelectItem value='Gas'>Gas</SelectItem>
						<SelectItem value='Electric'>Electric</SelectItem>
						<SelectItem value='Hybrid'>Hybrid</SelectItem>
						<SelectItem value='Essence'>Essence</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<h2 className='fuelSuggest font-jakarta text-lg font-bold'></h2>
			<div className='suggestedGridFuel grid grid-cols-5 gap-9'>
				{fuelTypes.map((fuelType) => {
					return (
						<div
							key={fuelType.id}
							className='flex cursor-pointer items-center justify-center rounded-md py-3 font-inter text-sm shadow-md hover:shadow-xl'
							onClick={updateFuel(fuelType.name)}>
							{fuelType.name}
						</div>
					)
				})}
			</div>
		</div>
	)
}
