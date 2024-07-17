/* eslint-disable indent */
import { doGuestLogin } from '@/services/common.services'
import { NextResponse } from 'next/server'

export async function POST() {
    const res = await doGuestLogin()

    return NextResponse.json(res, {
        status: res.status,
    })
}
