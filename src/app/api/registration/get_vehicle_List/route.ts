import { getVehicleLists } from '@/services/registration.services'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const res = await getVehicleLists(req.headers.get('authorization'))

	return NextResponse.json(res, {
		status: res.status
	})
}
