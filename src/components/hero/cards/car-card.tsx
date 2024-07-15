import { assets } from '@/assets'
import { Button } from '@/components/ui'
import { MoveUpRight } from 'lucide-react'
import Image from 'next/image'
import { type MouseEventHandler } from 'react'

type CarCardProps = {
	onBuyClick?: MouseEventHandler<HTMLButtonElement>
}

export function CarCard(props: CarCardProps) {
	return (
		<div className='leftAnimation relative flex flex-row items-center gap-2 rounded-2xl bg-yellow-100 p-6 shadow hover:shadow-lg'>
			<Button
				className='absolute right-5 top-5 z-10 h-8 w-8 bg-white p-2 hover:shadow'
				size='icon'
				variant='transparent'>
				<MoveUpRight />
			</Button>
			<div className='flex flex-grow flex-col items-center gap-3 p-4 text-center'>
				<h1 className='text-2xl font-medium'>Car Insurance</h1>
				<span className='text-sm font-medium text-gray-500'>
					“Travel isn&apos;t always pretty. It isn&apos;t always comfortable.
				</span>
				<Button
					className='w-fit px-8 hover:shadow'
					size='smRoundedfull'
					variant='whiteRounded'
					onClick={props.onBuyClick}>
					Buy Policy
				</Button>
			</div>
			<div className='h-36 w-60 flex-shrink-0'>
				<Image
					alt='car'
					className='h-auto w-full'
					height={400}
					src={assets.images.car}
					width={500}
				/>
			</div>
		</div>
	)
}
