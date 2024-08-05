'use client'

import { useAppDispatch } from '@/redux/hooks'
import { setScrollTo } from '@/redux/slices'
import { Check, PencilLine } from 'lucide-react'
import { Fragment } from 'react'
import { Button } from '../ui'

type ShowCurrentProps = {
	item: {
		name: string | number
		field: string
	}
	index: number
}

export function ShowCurrent(props: ShowCurrentProps) {
	const isIncomplete =
		props.item.name === '' ||
		(props.item.field === 'Manufacture Year' && +props.item.name === 0) ||
		(props.item.field === 'Seat Count' && +props.item.name === 0) ||
		(props.item.field === 'Sum Insured' && +props.item.name === 0)

	const dispatch = useAppDispatch()

	function scrollTo(to: number) {
		return function () {
			dispatch(setScrollTo(to))
		}
	}

	if (isIncomplete) {
		return <Fragment />
	}

	return (
		<div className='flex flex-row rounded-md bg-gray-66 font-inter'>
			<div className='flex flex-grow flex-row'>
				<div className='flex items-center justify-center px-4'>
					<div className='flex h-6 w-6 items-center justify-center rounded-full bg-green-200'>
						<Check
							color='white'
							height={16}
							width={16}
						/>
					</div>
				</div>
				<div className='flex flex-col p-1'>
					<span className='line-clamp-1 text-[13px] font-semibold'>
						{props.item.name !== '' ? props.item.name : 'Select ' + props.item.field}
					</span>
					<span className='line-clamp-1 text-[11px] opacity-70'>{props.item.field}</span>
				</div>
			</div>
			<div className='flex flex-shrink-0 items-center'>
				<Button
					variant='transparent'
					onClick={scrollTo(props.index + 1)}>
					<PencilLine
						color='black'
						height={18}
						strokeWidth={1}
						width={18}
					/>
				</Button>
			</div>
		</div>
	)
}
