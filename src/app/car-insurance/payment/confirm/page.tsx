import { Header } from '@/components/header'
import ConfirmPremiumDetails from '@/components/payment/confirm-premium-details'
import { DetailsConfirmList } from '@/components/payment/details-confirm-list'

export default function Page() {
	return (
		<div className='flex h-full w-full flex-col gap-6 bg-white'>
			<Header />
			<section className='flex flex-col gap-6 px-2 font-inter lg:px-20'>
				<ConfirmPremiumDetails />
				<DetailsConfirmList />
			</section>
		</div>
	)
}
