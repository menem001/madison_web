import { cn } from '@/lib'
import Image from 'next/image'

type MarkCardProps = {
	name?: string
	logo?: string
	code?: number
	onClick?: (value: string) => void
	className?: string
}

export function MarkCard(props: MarkCardProps) {
	function handleClick() {
		props.onClick?.(props.code + '' || '')
	}

	return (
		<div
			className={cn(
				'flex cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-md py-3 font-inter text-sm shadow-md hover:shadow-xl',
				props.className
			)}
			onClick={handleClick}>
			<div className='flex flex-grow items-center justify-between'>
				<Image
					alt={props.name || ''}
					height={70}
					src={props.logo || ''}
					width={70}
				/>
			</div>
			<span className='font-inter text-sm font-semibold text-gray-700'>{props.name}</span>
		</div>
	)
}
