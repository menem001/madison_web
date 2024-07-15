import { assets } from '@/assets'
import Image from 'next/image'
import { Button } from '../ui'

export function OtherOptions() {
	return (
		<div className='flex w-full flex-col items-center gap-3 font-jakarta'>
			<div className='flex w-full flex-row justify-between gap-6'>
				<Button
					className='flex w-full flex-row items-center gap-2'
					size='xl'
					variant='whiteBordered'>
					<Image
						alt='google'
						height={24}
						src={assets.icons.google}
						width={24}
					/>
					<span>Sign in with Google</span>
				</Button>
				<Button
					className='flex w-full flex-row items-center gap-2'
					size='xl'
					variant='whiteBordered'>
					<Image
						alt='apple'
						height={24}
						src={assets.icons.apple}
						width={24}
					/>
					Sign in with Apple
				</Button>
			</div>
			<span className='text-xs text-gray-500'>
				Click Google or Apple Authentication for easy process by single click
			</span>
			{/* <div>
				<Button
					className='flex w-full flex-row items-center gap-2'
					variant='whiteBordered'>
					<Upload
						height={24}
						width={24}
					/>
					<span className='font-semibold'>Upload your Driving License</span>
				</Button>
			</div>
			<span className='text-xs text-gray-500'>
				Upload your document to auto-fill the personal details with AI
			</span> */}
		</div>
	)
}
