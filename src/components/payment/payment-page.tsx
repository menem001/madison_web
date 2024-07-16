import { ConfirmRightSideBar } from '../car/confirm-right-side-bar'
import { PaymentDetails } from './payment-details'

export function PaymentPage() {
	return (
		<section className='flex h-full w-full flex-col gap-6 overflow-hidden bg-white'>
			<section className='flex flex-row gap-20 p-20'>
				<div className='flex flex-grow'>
					<PaymentDetails />
				</div>
				<div className='flex'>
					<ConfirmRightSideBar />
				</div>
			</section>
		</section>
	)
}
