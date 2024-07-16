import { cn } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateVehicleUsage } from '@/redux/slices'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const usages = [
	{
		id: 'Personal',
		name: 'Personal'
	},
	{
		id: 'Taxi',
		name: 'Taxi'
	},
	{
		id: 'Commercial',
		name: 'Commercial'
	},
	{
		id: 'Business',
		name: 'Business'
	},
	{
		id: 'Ambulance',
		name: 'Ambulance'
	}
]

export function VehicleUsage() {
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const dispatch = useAppDispatch()

	useGSAP(() => {
		if (vehicleData.vehicleUsage === '') {
			gsap.from('.selectUsage', { y: 80, opacity: 0, duration: 0.5, delay: 1 })
			gsap.to('.usagetitle', { duration: 0.5, text: 'Vehicle Usage' })
			gsap.to('.usagesubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes',
				delay: 0.5
			})
			gsap.to('.usageSuggest', {
				duration: 0.5,
				text: 'Suggested Usage Types',
				delay: 1.5
			})
			gsap.from('.suggestedGridusage', {
				y: 80,
				opacity: 0,
				duration: 0.5,
				delay: 2
			})
		} else {
			gsap.from('.selectUsage', { y: 80, opacity: 0, duration: 0.5 })
			gsap.to('.usagetitle', { duration: 0.5, text: 'Vehicle Usage' })
			gsap.to('.usagesubtitle', {
				duration: 0.5,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes'
			})
			gsap.to('.usageSuggest', {
				duration: 0.5,
				text: 'Suggested Usage Types'
			})
			gsap.from('.suggestedGridusage', {
				y: 80,
				opacity: 0,
				duration: 0.5
			})
		}
	})

	function updateUsage(usage: string) {
		return function () {
			dispatch(updateVehicleUsage(usage))
		}
	}

	return (
		<div
			className={cn('flex flex-col gap-7', {
				'min-h-[65vh]': vehicleData.vehicleUsage === ''
			})}>
			<div className='flex flex-col gap-2'>
				<h1 className='usagetitle font-jakarta text-xl font-bold text-blue-300'></h1>
				<span className='usagesubtitle font-roboto text-sm font-medium text-gray-500'></span>
			</div>
			<div className='selectUsage'>
				<Select
					value={vehicleData.vehicleUsage}
					onValueChange={(e) => {
						dispatch(updateVehicleUsage(e))
					}}>
					<SelectTrigger
						className='w-3/4'
						title='Usage'
						value={vehicleData.vehicleUsage}>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='Personal'>Personal</SelectItem>
						<SelectItem value='Taxi'>Taxi</SelectItem>
						<SelectItem value='Commercial'>Commercial</SelectItem>
						<SelectItem value='Business'>Business</SelectItem>
						<SelectItem value='Ambulance'>Ambulance</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<h2 className='usageSuggest font-jakarta text-lg font-bold'></h2>
			<div className='suggestedGridusage grid grid-cols-5 gap-9'>
				{usages.map((usage) => {
					return (
						<div
							key={usage.id}
							className='flex cursor-pointer items-center justify-center rounded-md py-3 font-inter text-sm shadow-md hover:shadow-xl'
							onClick={updateUsage(usage.name)}>
							{usage.name}
						</div>
					)
				})}
			</div>
		</div>
	)
}
