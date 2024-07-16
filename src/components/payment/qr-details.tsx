import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui'
import { Check } from 'lucide-react'
import { assets } from '@/assets'

export function QRDetails() {
	return (
		<div className='flex flex-col items-center justify-center gap-6 py-6'>
			<div className='flex h-40 w-40 items-center justify-center'>
				<Image
					alt='qr'
					height={500}
					src={assets.images.qr}
					width={500}
				/>
			</div>
			Scan the above qr to pay
			<Dialog>
				<DialogTrigger className='w-full'>
					<Button
						className='w-full'
						variant='bluebtn'>
						Confirm & Pay
					</Button>
				</DialogTrigger>
				<DialogContent>
					<div className='flex h-full w-full flex-col items-center justify-center gap-3 p-10'>
						<div className='bg-green-320 flex h-28 w-28 items-center justify-center rounded-full'>
							<div className='flex h-16 w-16 items-center justify-center rounded-full bg-green-300'>
								<Check
									color='white'
									height={30}
									width={30}
								/>
							</div>
						</div>
						<h1 className='font-jakarta text-xl font-bold'>Transfer Successful!</h1>
						<div className='flex flex-col items-center'>
							<span>You have successfully transferred 5,000.00</span>
							<span className='text-blue-300'>Bank Name: United Bank Of Africa</span>
							<span className='text-blue-300'>2122444522</span>
						</div>
						<div className='flex w-full flex-col gap-2'>
							<Button
								className='w-full'
								size='lg'
								variant='bluebtn'>
								Share Receipt
							</Button>
							<Button
								className='w-full'
								size='lg'
								variant='whiteBlackOutlined'>
								Download receipt
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
