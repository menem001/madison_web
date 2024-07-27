import { PricingTable } from '../common/pricing_table'

export function CarPricing() {
	return (
		<section className='flex h-full w-full flex-col gap-10 bg-gray-100'>
			<div className='flex w-full items-center justify-center border-y border-gray-75 bg-white p-6 font-jakarta text-[34px] font-bold'>
				Compare Premium
			</div>
			<PricingTable />
		</section>
	)
}
