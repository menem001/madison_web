import { Fragment } from 'react'
import { ShowCurrent } from './show-current'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Check } from 'lucide-react'
import { useAppSelector } from '@/redux/hooks'

type ShowListProps = {
	data: {
		id: string
		name: string | number
		field: string
	}[]
}

export function ShowList(props: ShowListProps) {
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const isComplete =
		vehicleData.bodyType !== '' &&
		vehicleData.mark !== '' &&
		vehicleData.model !== '' &&
		vehicleData.vehicleUsage !== '' &&
		vehicleData.seat !== 0 &&
		vehicleData.year !== 0

	return (
		<Fragment>
			<Accordion
				collapsible
				type='single'>
				<AccordionItem
					className='border-none'
					value='item-1'>
					<AccordionTrigger className='rounded-md bg-gray-66 p-1 font-inter'>
						<div className='flex flex-row gap-4 px-4'>
							{isComplete && (
								<div className='flex items-center justify-center'>
									<div className='flex h-6 w-6 items-center justify-center rounded-full bg-green-200'>
										<Check
											color='white'
											height={16}
											width={16}
										/>
									</div>
								</div>
							)}
							<div className='flex flex-row rounded-md font-inter'>
								<div className='flex flex-col items-start'>
									<span className='line-clamp-1 text-[13px] font-semibold'>
										Vehicle Base Info
									</span>
									<span className='line-clamp-1 text-[11px] opacity-70'>
										Make, Model
									</span>
								</div>
							</div>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						{props.data.slice(0, 6).map((item, index) => {
							return (
								<ShowCurrent
									key={item.id}
									index={index}
									item={item}
								/>
							)
						})}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			{props.data.slice(6).map((item, index) => {
				return (
					<ShowCurrent
						key={item.id}
						index={index}
						isSec={true}
						item={item}
					/>
				)
			})}
		</Fragment>
	)
}
