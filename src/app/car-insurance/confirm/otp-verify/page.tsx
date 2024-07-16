import { assets } from '@/assets'
import { OtpForm } from '@/components/common/otp-form'
import Image from 'next/image'

export default function Page() {
	return(
		<div className='flex flex-col lg:grid lg:grid-rows-none lg:grid-cols-2 p-4 md:p-10 lg:p-12 gap-2 md:gap-6 lg:gap-8 bg-gray-100 h-screen w-full overflow-y-scroll'>
			<div className='min-h-[45vh] w-full rounded-2xl overflow-hidden block lg:hidden'>
				<Image alt='trip' className='h-auto w-full object-cover object-bottom' height={1000} src={assets.images.trip} width={1000}/>
			</div>
			<OtpForm />
			<div className='h-[85vh] w-full rounded-2xl overflow-hidden hidden lg:block'>
				<Image alt='trip' className='h-auto w-full object-cover object-center' height={1000} src={assets.images.trip} width={1000}/>
			</div>
		</div>
	)
}