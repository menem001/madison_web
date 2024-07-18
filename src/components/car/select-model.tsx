import { cn } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateVehicleModel } from '@/redux/slices'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'

const models = [
	{
		id: 'Q7',
		name: 'Q7'
	},
	{
		id: 'RS',
		name: 'RS'
	},
	{
		id: 'Q3',
		name: 'Q3'
	},
	{
		id: 'S5',
		name: 'S5'
	},
	{
		id: 'Comet',
		name: 'Comet'
	},
	{
		id: 'A8',
		name: 'A8'
	}
]

export function SelectModel() {
	const vehicleData = useAppSelector((state) => state.carInsurance)

	const dispatch = useAppDispatch()

	useGSAP(() => {
		if (vehicleData.model === '') {
			gsap.from('.selectModel', { y: 80, opacity: 0, duration: 1, delay: 2 })
			gsap.to('.modeltitle', { duration: 1, text: 'Select the Model' })
			gsap.to('.modelsubtitle', {
				duration: 1,
				// eslint-disable-next-line quotes
				text: "The specific design or type of vehicle within the manufacturer's lineup (e.g. Corolla, Civic, Mustang)",
				delay: 1
			})
			gsap.to('.modelSuggest', {
				duration: 1,
				text: 'Suggested Models',
				delay: 3
			})
			gsap.from('.suggestedGridModel', {
				y: 80,
				opacity: 0,
				duration: 1,
				delay: 4
			})
		} else {
			gsap.from('.selectModel', { y: 80, opacity: 0, duration: 1 })
			gsap.to('.modeltitle', { duration: 1, text: 'Select the Model' })
			gsap.to('.modelsubtitle', {
				duration: 1,
				// eslint-disable-next-line quotes
				text: "The specific design or type of vehicle within the manufacturer's lineup (e.g. Corolla, Civic, Mustang)"
			})
			gsap.to('.modelSuggest', {
				duration: 1,
				text: 'Suggested Models'
			})
			gsap.from('.suggestedGridModel', {
				y: 80,
				opacity: 0,
				duration: 1
			})
		}
	})

	function updateModel(model: string) {
		return function () {
			dispatch(updateVehicleModel(model))
		}
	}

	return (
		<div className={cn('flex flex-col gap-7', { 'min-h-[65vh]': vehicleData.model === '' })}>
			<div className='flex flex-col gap-2'>
				<h1 className='modeltitle font-jakarta text-xl font-bold text-blue-300'></h1>
				<span className='modelsubtitle font-inter text-sm font-medium text-gray-500'></span>
			</div>
			<div className='selectModel'>
				<Select
					value={vehicleData.model}
					onValueChange={(e) => {
						dispatch(updateVehicleModel(e))
					}}>
					<SelectTrigger
						className='w-1/2'
						title='Select the Model'
						value={vehicleData.model}>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='Q7'>Q7</SelectItem>
						<SelectItem value='RS'>RS</SelectItem>
						<SelectItem value='Q3'>Q3</SelectItem>
						<SelectItem value='S5'>S5</SelectItem>
						<SelectItem value='Comet'>Comet</SelectItem>
						<SelectItem value='A8'>A8</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<h2 className='modelSuggest font-jakarta text-lg font-bold'></h2>
			<div className='suggestedGridModel grid grid-cols-5 gap-4'>
				{models.map((model) => {
					return (
						<div
							key={model.id}
							className='flex cursor-pointer items-center justify-center rounded-md py-3 font-inter text-sm shadow-md hover:shadow-xl'
							onClick={updateModel(model.name)}>
							{model.name}
						</div>
					)
				})}
			</div>
		</div>
	)
}
