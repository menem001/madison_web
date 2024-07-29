'use client'

import { Button, Input } from '../ui'
import { FormFieldLayout } from './form-field-layout'
import { type ChangeEvent, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateIdentificationDetails } from '@/redux/slices'
import { Label } from '../ui/label'

type identificationDetailsFieldProps = {
	current: number
	pos: number
	goNext: () => void
	goSpecific: (num: number) => void
}

export function IdentificationDetailsField(props: identificationDetailsFieldProps) {
	const customerData = useAppSelector((state) => state.customerDetails)
	const [accountType, setAccountType] = useState<string>(customerData.accType)
	const [companyNumber, setCompanyNumber] = useState<string>(
		customerData.companyRegistrationNumber !== null
			? customerData.companyRegistrationNumber
			: ''
	)
	const [nrc1, setNrc1] = useState<string>(customerData.nrc.substring(0, 6))
	const [nrc2, setNrc2] = useState<string>(customerData.nrc.substring(6, 8))
	const [nrc3, setNrc3] = useState<string>(customerData.nrc.substring(8))
	const [passport, setPassport] = useState<string>(customerData.passport)

	const dispatch = useAppDispatch()
	const nrc2Ref = useRef<HTMLInputElement>(null)
	const nrc3Ref = useRef<HTMLInputElement>(null)
	const passportRef = useRef<HTMLInputElement>(null)

	const [isDisabled, setIsDisabled] = useState<boolean>(false)

	function handleChangeNrc1(e: ChangeEvent<HTMLInputElement>) {
		if (e.target.value.length <= 6) {
			setNrc1(e.target.value)
		}

		if (e.target.value.length === 6 && nrc2Ref.current !== null) {
			nrc2Ref.current.focus()
		}
	}

	function handleChangeNrc2(e: ChangeEvent<HTMLInputElement>) {
		if (e.target.value.length <= 2) {
			setNrc2(e.target.value)
		}

		if (e.target.value.length === 2 && nrc3Ref.current !== null) {
			nrc3Ref.current.focus()
		}
	}

	function handleChangeNrc3(e: ChangeEvent<HTMLInputElement>) {
		if (e.target.value.length <= 1) {
			setNrc3(e.target.value)
		}

		if (e.target.value.length === 1 && passportRef.current !== null) {
			passportRef.current.focus()
		}
	}

	function handleChangePassport(e: ChangeEvent<HTMLInputElement>) {
		if (e.target.value.length <= 9) {
			setPassport(e.target.value)
		}
	}

	function onSubmit() {
		dispatch(
			updateIdentificationDetails({
				nrc: nrc1 + nrc2 + nrc3,
				passport: passport,
				accountType: accountType,
				companyNumber: companyNumber
			})
		)
		props.goNext()
	}

	useEffect(() => {
		const nrcIsFilled = nrc1 !== '' && nrc2 !== '' && nrc3 !== ''
		const passportFilled = passport !== '' && passport.length === 9
		const companyFilled = companyNumber !== ''

		const Filled =
			nrcIsFilled &&
			passportFilled &&
			((accountType === 'Corporate' && companyFilled) || accountType === 'Personal')

		setIsDisabled(Filled)
	}, [accountType, companyNumber, nrc1, nrc2, nrc3, passport])

	return (
		<FormFieldLayout
			current={props.current}
			done={props.current > 2}
			goSpecific={props.goSpecific}
			pos={props.pos}
			show={props.current === 2}
			subTitle='Additional information around Step 2'
			title='Step 2 - Identification Details'>
			<>
				<div className='flex flex-col gap-1'>
					<Label>
						NRC (National Registration card)<span className='text-red-500'>*</span>
					</Label>
					<div className='flex w-full flex-row gap-4'>
						<div className='flex-grow flex-col gap-0'>
							<Input
								className='border-2 border-blue-925'
								id='nrc1'
								placeholder=''
								type='number'
								value={nrc1}
								onChange={handleChangeNrc1}
							/>
						</div>
						<span className='text-3xl'>/</span>
						<div className='flex-grow'>
							<Input
								ref={nrc2Ref}
								className='border-2 border-blue-925'
								id='nrc2'
								placeholder=''
								type='number'
								value={nrc2}
								onChange={handleChangeNrc2}
							/>
						</div>
						<span className='text-3xl'>/</span>
						<div className='flex-grow'>
							<Input
								ref={nrc3Ref}
								className='border-2 border-blue-925'
								id='nrc3'
								placeholder=''
								type='number'
								value={nrc3}
								onChange={handleChangeNrc3}
							/>
						</div>
					</div>
				</div>
				<div className='flex w-full flex-row gap-4'>
					<div className='w-full flex-grow'>
						<Label>
							Passport<span className='text-red-500'>*</span>
						</Label>
						<Input
							ref={passportRef}
							className='border-2 border-blue-925'
							id='passport'
							placeholder='Passport Number'
							value={passport}
							onChange={handleChangePassport}
						/>
					</div>
					<div className='flex-grow'>
						<Label>
							Account Type<span className='text-red-500'>*</span>
						</Label>
						<div className='flex flex-row gap-2'>
							<div
								className={cn(
									'rounded-2xl border-2 bg-white px-6 py-2 font-roboto text-black',
									{
										'bg-blue-300 text-white': accountType === 'Personal'
									}
								)}
								onClick={() => {
									setAccountType('Personal')
								}}>
								Personal
							</div>
							<div
								className={cn(
									'rounded-2xl border-2 bg-white px-6 py-2 font-roboto text-black',
									{
										'bg-blue-300 text-white': accountType === 'Corporate'
									}
								)}
								onClick={() => {
									setAccountType('Corporate')
								}}>
								Corporate
							</div>
						</div>
					</div>
				</div>
				{accountType === 'Corporate' && (
					<div className='flex-grow'>
						<Label>Company Registration number</Label>
						<Input
							className='border-2 border-blue-925'
							placeholder='Company Registration number'
							value={companyNumber}
							onChange={(e) => {
								setCompanyNumber(e.target.value)
							}}
						/>
					</div>
				)}
				<Button
					className='w-32'
					disabled={!isDisabled}
					variant='bluebtn'
					onClick={onSubmit}>
					Continue
				</Button>
			</>
		</FormFieldLayout>
	)
}
