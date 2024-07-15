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
type usageProps = {
	setCount:(num:number) => void
}

export function VehicleUsage(props: usageProps) {
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const dispatch = useAppDispatch()

	useGSAP(() => {
		if (vehicleData.vehicleUsage === '') {
			gsap.from('.selectUsage', { y: 80, opacity: 0, duration: 1, delay: 2 })
			gsap.to('.usagetitle', { duration: 1, text: 'Vehicle Usage' })
			gsap.to('.usagesubtitle', {
				duration: 1,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes',
				delay: 1
			})
			gsap.to('.usageSuggest', {
				duration: 1,
				text: 'Suggested Usage Types',
				delay: 3
			})
			gsap.from('.suggestedGridusage', {
				y: 80,
				opacity: 0,
				duration: 1,
				delay: 4
			})
		} else {
			gsap.from('.selectUsage', { y: 80, opacity: 0, duration: 1 })
			gsap.to('.usagetitle', { duration: 1, text: 'Vehicle Usage' })
			gsap.to('.usagesubtitle', {
				duration: 1,
				text: 'How the vehicle is used, such as for personal, business, or commercial purposes'
			})
			gsap.to('.usageSuggest', {
				duration: 1,
				text: 'Suggested Usage Types'
			})
			gsap.from('.suggestedGridusage', {
				y: 80,
				opacity: 0,
				duration: 1
			})
		}
	})

	function updateUsage(usage: string) {
		return function () {
			dispatch(updateVehicleUsage(usage))
			props.setCount(2)
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
						props.setCount(2)
					}}>
					<SelectTrigger
						className='w-1/2'
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
							className='flex cursor-pointer items-center justify-center rounded-md shadow-md py-3 hover:shadow-xl text-sm font-inter'
							onClick={updateUsage(usage.name)}>
							{usage.name}
						</div>
					)
				})}
			</div>
		</div>
	)
}
