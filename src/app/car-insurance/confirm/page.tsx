import { ConfirmationPage, DetailsChecker } from '@/components/car'
import { CarPricing } from '@/components/car/car-pricing'

export default function Page() {
	return (
		<DetailsChecker>
			<div className='flex flex-col gap-6 bg-gray-100 h-screen w-full overflow-y-scroll'>
				<ConfirmationPage />
				<CarPricing />
			</div>
		</DetailsChecker>
	)
}
