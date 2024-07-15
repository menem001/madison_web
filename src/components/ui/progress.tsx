'use client'

import { assets } from '@/assets'
import { cn } from '@/lib'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import Image from 'next/image'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'

const Progress = forwardRef<
	ElementRef<typeof ProgressPrimitive.Root>,
	ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
	<ProgressPrimitive.Root
		ref={ref}
		className={cn('relative h-2 w-full overflow-hidden rounded-full bg-secondary', className)}
		{...props}>
		<ProgressPrimitive.Indicator
			className='h-full w-full flex-1 bg-green-200 transition-all'
			style={{ transform: `translateX(-${100 - (value || 0)}%)` }}>
			<div className='absolute -right-5 -top-[6px] flex h-full items-center'>
				<Image
					alt='car'
					height={32}
					src={assets.icons.raceCar}
					width={24}
				/>
			</div>
		</ProgressPrimitive.Indicator>
	</ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
