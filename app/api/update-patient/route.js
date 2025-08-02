// /app/api/auth/update-patient/route.js
import crypto from 'crypto';
import connectDB from '@/app/database/db';
import { NextResponse } from 'next/server';
import User from '@/app/database/models/User';

/* [POST] 사용자 정보 업데이트 API - user_id 기준으로 이름, 연락처, 비밀번호, 수술 여부 등 정보 수정 */
export async function POST(req) {
  // 1. 요청 본문 파싱 후 필수값 검증
  const { user_id, name, phone, password, had_knee_surgery, has_base_disease, pre_surgery_rom, surgery_date } = await req.json();
  if (!user_id) { return new Response(JSON.stringify({ success: false, message: 'user_id는 필수입니다.' }), { status: 400 })}

  try {
    // 3. DB 연결
    await connectDB();

    // 4. 비밀번호 해싱 (있을 경우만)
    const hash = crypto.createHash('sha256').update(password).digest('hex');

    // 5. 사용자 문서 업데이트
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

    // 6. 사용자 존재 여부 확인
    if (!updated) { return NextResponse.json({ success: false, message: '사용자를 찾을 수 없습니다.' }, { status: 404 })}

    // 7. 성공 응답 반환
    return NextResponse.json({ success: true, user: updated });
  } catch (error) {
    // 8. 예외 처리: 서버 오류
    console.error(error);
    return NextResponse.json({ success: false, message: '서버 오류' }, { status: 500 });
  }
}