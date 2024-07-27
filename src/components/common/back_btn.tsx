'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function BackButton() {
	const route = useRouter()

	function goBack() {
		route.back()
	}

	return (
		<div
			className='flex cursor-pointer flex-row items-center gap-2 font-roboto'
			onClick={goBack}>
			<ChevronLeft
				height={20}
				width={20}
			/>
			<span>Back</span>
		</div>
	)
}
