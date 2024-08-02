import { cn } from '@/lib'
import { Check } from 'lucide-react'
import { type ReactNode } from 'react'

type formFieldLayoutProps = {
	title: string
	subTitle: string
	show: boolean
	done: boolean
	pos: number
	current: number
	children: ReactNode
	goSpecific: (num: number) => void
}

export function FormFieldLayout(props: formFieldLayoutProps) {
	function goToCurrent() {
		if (props.current > props.pos) {
			props.goSpecific(props.pos)
		}
	}

	return (
		<section className='flex w-full flex-col gap-8'>
			<div
				className='-ml-4 flex cursor-pointer flex-row gap-5'
				onClick={goToCurrent}>
				{props.done ? (
					<div className='flex h-8 w-8 items-center justify-center rounded-full bg-green-200 text-white'>
						<Check
							color='white'
							height={16}
							width={16}
						/>
					</div>
				) : (
					<div className='flex h-8 w-8 items-center justify-center rounded-full bg-black text-white'>
						{props.pos}
					</div>
				)}
				<div className='flex flex-col gap-2 font-roboto'>
					<h3 className='text-lg font-semibold text-gray-700 md:text-xl'>
						{props.title}
					</h3>
					<h5 className='font-roboto text-xs md:text-sm'>{props.subTitle}</h5>
				</div>
			</div>
			<div
				className={cn('flex w-full flex-col gap-8 pl-9', {
					hidden: !props.show
				})}>
				{props.children}
			</div>
		</section>
	)
}
