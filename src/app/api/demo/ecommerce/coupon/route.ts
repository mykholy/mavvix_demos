import { NextResponse } from 'next/server';
import { verifyEcommerceCoupon } from '@/lib/db/repositories';

export async function POST(request: Request) {
  try {
    const { code, subtotalCents } = await request.json();

    if (!code) {
      return NextResponse.json({ valid: false, message: 'Please enter a coupon code' }, { status: 400 });
    }

    const result = verifyEcommerceCoupon(code, subtotalCents || 0);

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ valid: false, message: err.message }, { status: 500 });
  }
}

