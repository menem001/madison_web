'use client'

import { useRouter } from 'next/navigation'
import { Button } from '../ui'

export function InfoFailedModal() {
	const route = useRouter()

	function enterManually() {
		route.push('/car-insurance/1')
	}

	return (
		<div className='flex flex-col gap-3 font-dmsan text-lg'>
			<div>
				Failed to Get Info automatically. Please confirm below to enter the data manually
			</div>
			<Button
				variant='bluebtn'
				onClick={enterManually}>
				Fill Manually
			</Button>
		</div>
	)
}
