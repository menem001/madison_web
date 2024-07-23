import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Button, Input } from '../ui'
import { Label } from '../ui/label'
import { FormFieldLayout } from './form-field-layout'
import { useState } from 'react'
import { cn } from '@/lib'
import { updateAdditionalDetails } from '@/redux/slices'

type additionalVehicleInfoProps = {
	current: number
	pos: number
	goNext: () => void
	goSpecific: (num: number) => void
}

export function AdditionalVehicleInfo(props: additionalVehicleInfoProps) {
	const vehicleData = useAppSelector((state) => state.carInsurance)
	const [driverName, setDeiverName] = useState<string>(vehicleData.DriverName)
	const [driverLicense, setDriverLicense] = useState<string>(vehicleData.DriverID)
	const [isLeased, setIsLeased] = useState<boolean>(vehicleData.leased)
	const [bankofFinance, setBankOfFinance] = useState<string>(vehicleData.bankOfFinance)

	const dispatch = useAppDispatch()

	function onSubmit() {
		dispatch(
			updateAdditionalDetails({
				bankOfFinance: bankofFinance,
				leased: isLeased,
				driverName: driverName,
				driverID: driverLicense
			})
		)
		props.goNext()
	}

	return (
		<FormFieldLayout
			current={props.current}
			done={props.current > 2}
			goSpecific={props.goSpecific}
			pos={props.pos}
			show={props.current === 2}
			subTitle='Additional information around Step 2'
			title='Step 2 - Additional details'>
			<>
				<div className='flex w-full flex-row gap-8'>
					<div className='flex-grow'>
						<Label htmlFor='number'>Driver name</Label>
						<Input
							className='border-2 border-blue-925'
							id='number'
							placeholder='Driver Name'
							value={driverName}
							onChange={(e) => {
								setDeiverName(e.target.value)
							}}
						/>
					</div>
					<div className='flex-grow'>
						<Label htmlFor='card'>Driving license number</Label>
						<Input
							className='border-2 border-blue-925'
							id='card'
							placeholder='Driving license number'
							value={driverLicense}
							onChange={(e) => {
								setDriverLicense(e.target.value)
							}}
						/>
					</div>
				</div>
				<div className='flex w-full flex-row gap-8'>
					<div className='w-1/2 flex-grow'>
						<Label htmlFor='circulation'>Leased</Label>
						<div className='flex flex-row gap-2'>
							<div
								className={cn(
									'rounded-2xl border-2 bg-white px-6 py-2 font-roboto text-black',
									{
										'bg-blue-300 text-white': isLeased === true
									}
								)}
								onClick={() => {
									setIsLeased(true)
								}}>
								Yes
							</div>
							<div
								className={cn(
									'rounded-2xl border-2 bg-white px-6 py-2 font-roboto text-black',
									{
										'bg-blue-300 text-white': isLeased === false
									}
								)}
								onClick={() => {
									setIsLeased(false)
								}}>
								No
							</div>
						</div>
					</div>
					{isLeased && (
						<div className='w-1/2 flex-grow'>
							<Label htmlFor='zone'>Bank of finance</Label>
							<Input
								className='border-2 border-blue-925'
								id='zone'
								placeholder='Bank of finance'
								value={bankofFinance}
								onChange={(e) => {
									setBankOfFinance(e.target.value)
								}}
							/>
						</div>
					)}
				</div>
				<Button
					className='w-32'
					variant='bluebtn'
					onClick={onSubmit}>
					Continue
				</Button>
			</>
		</FormFieldLayout>
	)
}
