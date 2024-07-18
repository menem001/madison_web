import { assets } from '@/assets'
import { AccountOptions } from '@/components/common/account_options'
import Image from 'next/image'

export default function Page() {
	return (
		<div className='flex h-screen w-full flex-col gap-2 overflow-y-scroll bg-gray-100 p-4 md:gap-6 md:p-10 lg:grid lg:grid-cols-2 lg:grid-rows-none lg:gap-8 lg:p-12'>
			<div className='block min-h-[45vh] w-full overflow-hidden rounded-2xl lg:hidden'>
				<Image
					alt='trip'
					className='h-auto w-full object-cover object-bottom'
					height={1000}
					src={assets.images.trip}
					width={1000}
				/>
			</div>
			<AccountOptions />
			<div className='hidden h-[85vh] w-full overflow-hidden rounded-2xl lg:block'>
				<Image
					alt='trip'
					className='h-auto w-full object-cover object-center'
					height={1000}
					src={assets.images.trip}
					width={1000}
				/>
			</div>
		</div>
	)
}
