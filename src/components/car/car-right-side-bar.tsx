import { RightSideBarList } from './right-side-bar-list'
import { ProgressBar } from './progress-bar'

export function CarRightSideBar() {

	return (
		<div className='flex h-full w-full flex-col gap-4 px-5 py-20 font-roboto'>
			<h3 className='text-lg font-medium text-gray-700'>
				Maximize you experience! Edit you selections...
			</h3>
			<div className='w-3/4'>
				<ProgressBar />
			</div>

			<div className='flex w-3/4 flex-col gap-4'>
				<RightSideBarList />
			</div>
		</div>
	)
}
