import { assets } from '@/assets'
import { Template } from './template'

export function MotorcycleCard() {
	return (
		<Template
			caption="Travel isn't always pretty. It isn't always comfortable."
			className='bg-blue-200'
			title='Motorcycle Insurance'
			img={{
				alt: 'bike',
				height: 400,
				src: assets.images.bike,
				width: 500
			}}
		/>
	)
}
