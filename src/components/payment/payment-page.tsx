import { ConfirmRightSideBar } from '../car/confirm-right-side-bar'
import { BackButton } from '../common/back_btn'
import { PaymentDetails } from './payment-details'

export function PaymentPage() {
	return (
		<section className='flex h-full w-full flex-col gap-6 overflow-hidden bg-white'>
			<section className='flex flex-col-reverse gap-2 p-6 lg:flex-row lg:gap-20 lg:p-20'>
				<div className='flex flex-grow'>
					<PaymentDetails />
				</div>
				<div className='flex'>
					<ConfirmRightSideBar />
				</div>
				<div className='flex flex-col gap-4 font-jakarta lg:hidden'>
					<BackButton />
					<h1 className='text-2xl font-bold'>Add a payment method</h1>
					<h3 className='text-xs'>
						Please confirm the below amout and proceed with payment
					</h3>
				</div>
			</section>
		</section>
	)
}
