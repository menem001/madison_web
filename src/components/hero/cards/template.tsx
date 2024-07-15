import { Button } from '@/components/ui'
import { cn } from '@/lib'
import { MoveUpRight } from 'lucide-react'
import Image from 'next/image'
import { type MouseEventHandler } from 'react'

type TemplateProps = {
	title?: string
	caption?: string
	onBuyClick?: MouseEventHandler<HTMLButtonElement>
	className?: string
	img?: {
		src?: string
		width?: number
		height?: number
		alt?: string
	}
}

export function Template(props: TemplateProps) {
	return (
		<div
			className={cn(
				'leftAnimation relative flex flex-row items-center gap-2 rounded-2xl p-2 shadow hover:shadow-lg md:p-6',
				props.className
			)}>
			<Button
				className='absolute left-5 top-5 z-10 h-8 w-8 bg-white p-2 hover:shadow'
				size='icon'
				variant='transparent'>
				<MoveUpRight />
			</Button>
			<div className='h-36 w-48 flex-shrink-0 md:w-60'>
				<Image
					alt={props.img?.alt || ''}
					className='h-auto w-full'
					height={props.img?.height ?? 400}
					src={props.img?.src || ''}
					width={props.img?.height ?? 500}
				/>
			</div>
			<div className='flex flex-grow flex-col items-center gap-3 text-center md:p-4'>
				<h1 className='text-xl font-medium'>{props.title}</h1>
				<span className='text-sm font-medium text-gray-500'>{props.caption}</span>
				<Button
					className='w-fit px-8 hover:shadow'
					size='smRoundedfull'
					variant='whiteRounded'
					onClick={props.onBuyClick}>
					Buy Policy
				</Button>
			</div>
		</div>
	)
}
