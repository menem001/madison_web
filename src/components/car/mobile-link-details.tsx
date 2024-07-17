import { assets } from '@/assets'
import Image from 'next/image'

export function MobileLinkDetails() {
	return (
		<div className='flex flex-col gap-4'>
			<h4 className='text-sm font-medium opacity-60'>Download Mobile application</h4>
			<div className='flex flex-row gap-6'>
				<Image
					alt='playstore'
					height={100}
					src={assets.images.googlePlay}
					width={100}
				/>
				<Image
					alt='appstore'
					height={100}
					src={assets.images.appStore}
					width={100}
				/>
			</div>
			<p className='font-inter text-xs font-bold opacity-60'>Contact us</p>
			<div className='flex flex-col font-inter text-xs'>
				<p className='opacity-60'>
					<span className='font-bold text-blue-300'>Phone Number :</span> 4848 | 378700-5
					|
				</p>
				<p className='opacity-60'>
					<span className='font-bold text-blue-300'>Mail Address: </span>
					<a href='mailto:online@madison.co.zm'>online@madison.co.zm</a>
				</p>
			</div>
			<div className='flex flex-row gap-2 font-inter text-xs opacity-60'>
				<p>About</p>
				<p>Help</p>
				<p>Privacy</p>
				<p>Terms</p>
				<p>Locations</p>
				<p>Languages</p>
			</div>
			<p className='flex flex-row gap-2 font-inter text-xs opacity-30'>
				© 2024 Madison Inc. Privacy Terms Cookies policy
			</p>
		</div>
	)
}
