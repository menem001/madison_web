import { BackButton } from '../common/back_btn'
import { PaymentTypes } from './payment-types'

export function PaymentDetails() {
	return (
		<section className='flex w-full flex-col gap-10'>
			<div className='hidden flex-col gap-4 font-jakarta lg:flex'>
				<BackButton />
				<h1 className='text-[40px] font-semibold'>Add a payment method</h1>
				<h3 className=''>
					Let&apos;s get you all st up so you can access your personal account.
				</h3>
			</div>
			<div className='flex flex-col gap-2'>
				<div className='font-inter text-3xl font-bold text-blue-475 lg:text-lg'>
					<span>Pay With:</span>
				</div>
				<PaymentTypes />
			</div>
		</section>
	)
}
