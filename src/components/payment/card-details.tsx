import { Check } from 'lucide-react'
import { Button, Input } from '../ui'
import { Checkbox } from '../ui/checkbox'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Label } from '../ui/label'

export function CardDetails() {
	return (
		<div className='flex flex-col items-center gap-6 py-6'>
			<div className='w-full'>
				<Label htmlFor='card'>Card Number</Label>
				<Input
					className='border-gray-900'
					id='card'
					placeholder='Card Number'
				/>
			</div>
			<div className='flex w-full flex-row gap-6'>
				<div className='w-full'>
					<Label htmlFor='exp'>Expiration Date</Label>
					<Input
						className='border-gray-900'
						id='exp'
						placeholder='MM/YY'
					/>
				</div>
				<div className='w-full'>
					<Label htmlFor='cvv'>CVV</Label>
					<Input
						className='border-gray-900'
						id='cvv'
						placeholder='CVV'
					/>
				</div>
			</div>
			<div className='flex w-full flex-row items-center justify-start gap-1 font-inter'>
				<Checkbox />
				<span>Save Card Details</span>
			</div>

			<Dialog>
				<DialogTrigger className='w-full'>
					<Button
						className='w-full'
						variant='bluebtn'>
						Confirm & Pay
					</Button>
				</DialogTrigger>
				<DialogContent>
					<div className='flex h-full w-full flex-col items-center justify-center gap-3 p-10'>
						<div className='flex h-28 w-28 items-center justify-center rounded-full bg-green-320'>
							<div className='flex h-16 w-16 items-center justify-center rounded-full bg-green-300'>
								<Check
									color='white'
									height={30}
									width={30}
								/>
							</div>
						</div>
						<h1 className='font-jakarta text-xl font-bold'>Transfer Successful!</h1>
						<div className='flex flex-col items-center'>
							<span>You have successfully transferred 5,000.00</span>
							<span className='text-blue-300'>Bank Name: United Bank Of Africa</span>
							<span className='text-blue-300'>2122444522</span>
						</div>
						<div className='flex w-full flex-col gap-2'>
							<Button
								className='w-full'
								size='lg'
								variant='bluebtn'>
								Share Receipt
							</Button>
							<Button
								className='w-full'
								size='lg'
								variant='whiteBlackOutlined'>
								Download receipt
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
			<p className='w-3/4 font-jakarta text-xs'>
				By confirming your subscription, you allow The Outdoor Inn Crowd Limited to charge
				your card for this payment and future payments in accordance with their terms. You
				can always cancel your subscription.
			</p>
		</div>
	)
}
