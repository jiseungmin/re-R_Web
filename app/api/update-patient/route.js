// /app/api/auth/update-patient/route.js
import connectDB from '@/app/database/db';
import User from '@/app/database/models/User';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req) {
  const body = await req.json();
  const { user_id, name, phone, password, had_knee_surgery, has_base_disease, pre_surgery_rom, surgery_date } = body;
   
  if (!user_id) {
    return new Response(JSON.stringify({ success: false, message: 'user_id는 필수입니다.' }), { status: 400 });
  }

  try {
    await connectDB();

    const hash = crypto.createHash('sha256').update(password).digest('hex');

    const updated = await User.findOneAndUpdate(
      { _id: user_id },
      {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(password && { password: hash }),
        ...(typeof had_knee_surgery !== 'undefined' && { had_knee_surgery }),
        ...(typeof has_base_disease !== 'undefined' && { has_base_disease }),
        ...(body.hasOwnProperty('pre_surgery_rom') && { pre_surgery_rom }),
        ...(surgery_date && { surgery_date }),
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, message: '사용자를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: '서버 오류' }, { status: 500 });
  }
}