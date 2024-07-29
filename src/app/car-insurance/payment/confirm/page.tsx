import { ConfirmationTab } from '@/components/car'
import ConfirmPremiumDetails from '@/components/payment/confirm-premium-details'
import { DetailsConfirmList } from '@/components/payment/details-confirm-list'

export default function Page() {
	return (
		<div className='flex h-full w-full flex-col gap-6 bg-white'>
			<ConfirmationTab />
			<section className='flex flex-col gap-6 px-20 font-inter'>
				<ConfirmPremiumDetails />
				<DetailsConfirmList />
			</section>
		</div>
	)
}
