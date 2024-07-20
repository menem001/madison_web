import { viewCalculatedPremium } from '@/services/common.services'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const data = await req.json()
	const res = await viewCalculatedPremium(data, req.headers.get('authorization'))

	return NextResponse.json(res, {
		status: res.status
	})
}
