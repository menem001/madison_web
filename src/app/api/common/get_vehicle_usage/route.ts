/* eslint-disable indent */
import { getVehicleUsageList } from '@/services/common.services'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const data = await req.json()
    const res = await getVehicleUsageList(data)

    return NextResponse.json(res, {
        status: res.status,
    })
}
