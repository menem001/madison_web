/* eslint-disable indent */
import { getMotorList } from '@/services/common.services'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const data = await req.json()
    const res = await getMotorList(data)

    return NextResponse.json(res, {
        status: res.status,
    })
}
