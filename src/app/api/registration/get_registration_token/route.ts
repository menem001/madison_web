import { getRegistrationToken } from '@/services/registration.services'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const res = await getRegistrationToken(req.headers.get('authorization'))

	return NextResponse.json(res, {
		status: res.status
	})
}
