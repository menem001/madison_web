import { getCurrencyList } from '@/services/common.services'
import { NextResponse } from 'next/server'

export async function POST() {
	const res = await getCurrencyList()

	return NextResponse.json(res, {
		status: res.status,
	})
}
