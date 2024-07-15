import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '../ui'
import { ConfirmDetails } from './confirm-details'
import { ConfirmationTab } from './confirmation-tab'
import { QuoteDetails } from './quote-details'

export function ConfirmationPage() {
	return (
		<section className='flex h-full w-full flex-col gap-6 bg-gray-100'>
			<ConfirmationTab />
			<section className='flex flex-col gap-6 px-20 font-inter'>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href='/'>Policy</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href='/car-insurance'>Car Insurance</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Risk Details</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<div className='flex flex-row gap-9'>
					<div className='basis-3/5'>
						<QuoteDetails />
					</div>
					<div className='basis-2/5'>
						<ConfirmDetails />
					</div>
				</div>
			</section>
		</section>
	)
}
