import { assets } from '@/assets'
import { AccountOptions } from '@/components/common/account_options'
import Image from 'next/image'

export default function Page() {
	return(
		<div className='grid grid-cols-none grid-rows-2 lg:grid-rows-none lg:grid-cols-2 p-4 md:p-10 lg:p-24 gap-2 md:gap-6 lg:gap-12 bg-gray-100 h-screen w-full overflow-y-scroll'>
			<div className='h-[45vh] w-full rounded-2xl overflow-hidden block lg:hidden'>
				<Image alt='trip' className='h-auto w-full object-cover object-center' height={1000} src={assets.images.trip} width={1000}/>
			</div>
			<AccountOptions />
			<div className='h-[73vh] w-full rounded-2xl overflow-hidden hidden lg:block'>
				<Image alt='trip' className='h-auto w-full object-cover object-center' height={1000} src={assets.images.trip} width={1000}/>
			</div>
		</div>
	)
}