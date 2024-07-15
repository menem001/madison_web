'use client'

import { cn } from '@/lib'
import { useState } from 'react'

export function ConfirmationTab() {
	const [tab, setTab] = useState(1)

	function handleTab(value: number) {
		return function () {
			setTab(value)
		}
	}

	return (
		<div className='flex w-full flex-row gap-6 bg-white px-20 font-jakarta text-sm font-semibold shadow-md'>
			<div
				className={cn('cursor-pointer py-6', { 'border-b-4 border-blue-700': tab === 1 })}
				onClick={handleTab(1)}>
				My Personal Protection
			</div>
			<div
				className={cn('cursor-pointer py-6', { 'border-b-4 border-blue-700': tab === 2 })}
				onClick={handleTab(2)}>
				My Corporate Cover
			</div>
		</div>
	)
}
