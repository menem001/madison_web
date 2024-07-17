/* eslint-disable indent */
import { getBodyTypeList } from '@/services/common.services'
import { NextResponse } from 'next/server'

export async function POST() {
    const res = await getBodyTypeList()

    return NextResponse.json(res, {
        status: res.status,
    })
}
