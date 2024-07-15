import { cn } from '@/lib'
import Image from 'next/image'

type MarkCardProps = {
	name?: string
	logo?: string
	onClick?: (value: string) => void
	className?: string
}

export function MarkCard(props: MarkCardProps) {
	function handleClick() {
		props.onClick?.(props.name || '')
	}

	return (
		<div
			className={cn(
				'flex flex-col overflow-hidden cursor-pointer items-center justify-center rounded-md shadow-md py-3 hover:shadow-xl text-sm font-inter gap-4',
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
