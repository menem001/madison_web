import { PricingTable } from '../common/pricing_table'

export function CarPricing() {
	return(
		<section className="flex h-full w-full flex-col gap-10 bg-gray-100">
			<div className="bg-white border-y font-jakarta font-bold text-[34px] border-gray-75 w-full p-6 flex items-center justify-center">Compare Premium</div>
			<PricingTable />
		</section>
	)
}