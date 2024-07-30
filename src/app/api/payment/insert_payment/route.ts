import { insertPayment } from '@/services/payment.services'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const data = await req.json()
	const res = await insertPayment(data, req.headers.get('authorization'))

	return NextResponse.json(res, {
		status: res.status
	})
}
