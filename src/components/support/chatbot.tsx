import { Bot } from 'lucide-react'

export function ChatBot() {
	return (
		<div className='flex h-16 w-16 items-center justify-center rounded-full bg-blue-300'>
			<Bot
				color='white'
				height={32}
				width={32}
			/>
		</div>
	)
}
