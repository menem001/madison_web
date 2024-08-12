import { ConfirmRightSideBar } from '../car/confirm-right-side-bar'
import { VehicleDetailsForm } from '../details/vehicles-details-form'
import { Header } from '../header'
import { PremiumPopup } from './premium_popup'

export function VehicleDetailsPage() {
	return (
		<section className='relative flex w-full flex-col gap-6 bg-white'>
			<Header />
			<section className='grid grid-cols-5 gap-6'>
				<div className='col-span-5 p-4 pl-8 md:p-8 md:pl-16 lg:col-span-3'>
					<VehicleDetailsForm />
				</div>
				<div className='hidden h-fit justify-center lg:col-span-2 lg:flex'>
					<ConfirmRightSideBar />
				</div>
			</section>
			<div className='absolute bottom-4 right-4 lg:hidden'>
				<PremiumPopup />
			</div>
		</section>
	)
}
