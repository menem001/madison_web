import { Header } from '@/components/header'
import { HeroContent } from '@/components/hero'
import { ChatBot } from '@/components/support'

export default function Page() {
	return (
		<main className='flex h-screen w-full flex-col overflow-y-scroll'>
			<Header />
			<HeroContent />
			<div className='absolute bottom-10 right-10'>
				<ChatBot />
			</div>
		</main>
	)
}
