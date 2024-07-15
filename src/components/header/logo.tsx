'use client'

import { assets } from '@/assets'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export function Logo() {
	const router = useRouter()

	function goToHome() {
		router.push('/')
	}

	return (
		<Image
			alt='logo'
			className='cursor-pointer'
			height={56}
			src={assets.images.logo}
			width={56}
			onClick={goToHome}
		/>
	)
}
