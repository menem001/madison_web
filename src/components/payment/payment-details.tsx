import { ChevronLeft } from 'lucide-react'
import { PaymentTypes } from './payment-types'

export function PaymentDetails() {
	return (
		<section className='flex w-full flex-col gap-10'>
			<div className='flex flex-col gap-4 font-jakarta'>
				<div className='flex flex-row gap-2 font-roboto'>
					<ChevronLeft
						height={20}
						width={20}
					/>
					<span>Back</span>
				</div>
				<h1 className='text-[40px] font-semibold'>Add a payment method</h1>
				<h3 className=''>
					Let&apos;s get you all st up so you can access your personal account.
				</h3>
			</div>
			<div className='flex flex-col gap-2'>
				<div className='font-inter text-lg font-semibold'>
					<span>Pay With:</span>
				</div>
				<PaymentTypes />
			</div>
		</section>
	)
}
