import { ConfirmRightSideBar } from '../car/confirm-right-side-bar'
import { VehicleDetailsForm } from '../details/vehicles-details-form'
import { Header } from '../header'

export function VehicleDetailsPage() {
	return (
		<section className='flex h-full w-full flex-col gap-6 bg-white'>
			<Header />
			<section className='grid grid-cols-5 gap-6'>
				<div className='col-span-3 p-8 pl-16'>
					<VehicleDetailsForm />
				</div>
				<div className='col-span-2 flex h-fit justify-center'>
					<ConfirmRightSideBar />
				</div>
			</section>
		</section>
	)
}
