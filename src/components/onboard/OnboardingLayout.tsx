'use client'
import { assets } from '@/assets'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

type OnboardingLayoutProps = {
	children: React.ReactElement
}

export default function OnboardingLayout(props: OnboardingLayoutProps) {
	const path = usePathname()
	const route = useRouter()

	const isLogin = path === '/login'
	return (
		<section className='flex h-screen w-full flex-col font-jakarta lg:flex-row'>
			<div className='flex max-h-screen basis-7/12 items-center justify-center overflow-hidden rounded-b-2xl bg-cover bg-center'>
				<div className='relative hidden h-[85vh] w-10/12 overflow-hidden rounded-2xl lg:block'>
					<Image
						alt='trip'
						className='h-auto w-full object-cover object-center'
						height={1000}
						src={assets.images.family}
						width={1000}
					/>
					{!isLogin && (
						<h4 className='absolute right-2 top-2 text-base font-semibold text-white'>
							Do you have an Account?{' '}
							<span
								className='cursor-pointer text-blue-350'
								onClick={() => {
									route.push('/login')
								}}>
								Login Here
							</span>
						</h4>
					)}
				</div>
				<div className='flex overflow-hidden rounded-2xl lg:hidden'>
					<Image
						alt='trip'
						className='h-full w-full object-cover object-top'
						height={1000}
						src={assets.images.family}
						width={1000}
					/>
					<h4 className='text-base font-semibold text-white'>
						Did you Account? <span className='text-blue-350'>Login Here</span>
					</h4>
				</div>
			</div>
			<div className='h-full basis-5/12'>{props.children}</div>
		</section>
	)
}
