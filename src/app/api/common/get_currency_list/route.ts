/* eslint-disable indent */
import { getCurrencyList } from '@/services/common.services'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.json()
  const res = await getCurrencyList(data)

  return NextResponse.json(res, {
    status: res.status,
  })
}
