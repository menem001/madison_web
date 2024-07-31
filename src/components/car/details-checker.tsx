'use client'

import { useAppSelector } from '@/redux/hooks'
import { redirect, usePathname } from 'next/navigation'
import { Fragment, useEffect, type PropsWithChildren } from 'react'

export function DetailsChecker(props: PropsWithChildren) {
	const currentPath = usePathname()

	const vehicleData = useAppSelector((state) => state.carInsurance)

	useEffect(() => {
		if (
			currentPath === '/car-insurance/2' &&
			(vehicleData.bodyType === '' ||
				vehicleData.mark === '' ||
				vehicleData.vehicleUsage === '')
		) {
			redirect('/car-insurance/1')
		} else if (
			currentPath === '/car-insurance/confirm' &&
			(vehicleData.bodyType === '' ||
				vehicleData.mark === '' ||
				vehicleData.vehicleUsage === '')
		) {
			redirect('/car-insurance/1')
		}
	})

	return <Fragment>{props.children}</Fragment>
}
