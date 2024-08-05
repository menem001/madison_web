import { Banknote } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui'
import { ConfirmRightSideBar } from '../car/confirm-right-side-bar'

export function PremiumPopup() {
	return (
		<Popover>
			<PopoverTrigger>
				<div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-300'>
					<Banknote
						color='white'
						height={32}
						width={32}
					/>
				</div>
			</PopoverTrigger>
			<PopoverContent className='mr-1 flex w-[85svw] items-center justify-center sm:w-fit md:mr-8'>
				<ConfirmRightSideBar />
			</PopoverContent>
		</Popover>
	)
}
