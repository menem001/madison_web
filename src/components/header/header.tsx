'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from '../ui'
import { Logo } from './logo'

export function Header() {
	const route = useRouter()
	const path = usePathname()
	const beforeLogin =
		path === '/car-insurance/1' ||
		path === '/car-insurance/2' ||
		path === '/car-insurance/confirm/otp-verify'
	return (
		<section className='sticky top-0 z-20 flex h-full max-h-20 w-full flex-row items-center justify-between bg-white shadow'>
			<div className='flex h-full flex-row items-center gap-8 p-3 font-jakarta text-xs font-medium text-gray-500 md:text-sm'>
				<Logo />
				<div className='hidden h-full flex-row items-center gap-8 md:flex'>
					<span>Home</span>
					<span>About Madison</span>
					<span>Investor centre</span>
					<span>Sustainability</span>
					<span>Media</span>
				</div>
			</div>
			<div className='flex h-full flex-row items-center gap-4 p-3 font-jakarta text-gray-500'>
				<Button
					className='px-4 py-2'
					variant='bluebtn'
					onClick={() => {
						route.push('/login')
					}}>
					{beforeLogin ? <span>Sign In</span> : <span>Log out</span>}
				</Button>
			</div>
		</section>
	)
}
