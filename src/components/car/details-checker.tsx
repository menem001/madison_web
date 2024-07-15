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
			(vehicleData.bodyType.length === 0 ||
				vehicleData.fuelType === '' ||
				vehicleData.mark === '' ||
				vehicleData.model === '' ||
				vehicleData.vehicleUsage === '')
		) {
			redirect('/car-insurance/1')
		} else if (
			currentPath === '/car-insurance/confirm' &&
			(vehicleData.bodyType.length === 0 ||
				vehicleData.fuelType === '' ||
				vehicleData.mark === '' ||
				vehicleData.model === '' ||
				vehicleData.vehicleUsage === '')
		) {
			redirect('/car-insurance/1')
		} else if (
			currentPath === '/car-insurance/confirm' &&
			(vehicleData.horsePower === '' ||
				vehicleData.tonnage === '' ||
				vehicleData.sumInsured === 0 ||
				vehicleData.deductibles === 0)
		) {
			redirect('/car-insurance/2')
		}
	})

	return <Fragment>{props.children}</Fragment>
}
