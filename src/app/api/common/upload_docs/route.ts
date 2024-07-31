import { uploadDocs } from '@/services/common.services'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const data = await req.formData()
	const res = await uploadDocs(data, req.headers.get('authorization'))

	return NextResponse.json(res, {
		status: res.status
	})
}
