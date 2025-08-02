// app/api/healthcheck/route.js
import connectDB from '@/app/database/db';
import { NextResponse } from 'next/server';
import User from '@/app/database/models/User';
import healthcheck from '@/app/database/models/Healthcheck';

/* [POST] 건강검진 설문 저장 API  - userId와 설문 데이터(paintest, feartest, max_angle)를 받아 오늘자 Healthcheck 문서에 추가하거나 새로 생성 */
export async function POST(request) {
  // 1. 요청 본문 파싱 및 입력값 추출
  const { userId, paintest, feartest, max_angle } = await request.json();

  // 2. 필수값 검증
  if (!userId || !Array.isArray(paintest) || !feartest || typeof max_angle !== 'number') {
    return NextResponse.json( { success: false, message: 'userId, paintest, feartest, max_angle 모두 필요합니다.' }, { status: 400 });
  }

  // 3. DB 연결
  await connectDB();

  // 4. 하루 00:00~23:59 범위 계산
  const now   = new Date();
  const start = new Date(now.setHours(0, 0, 0, 0));
  const end   = new Date(now.setHours(23, 59, 59, 999));

  // 5. 새로 추가할 설문 entry 객체 생성
  const entry = { paintest, feartest, max_angle };

  // 6. 오늘자 Healthcheck 문서가 있으면 survey 배열에 push
  const updated = await healthcheck.findOneAndUpdate(
    { User: userId, createat: { $gte: start, $lte: end } },
    { $push: { survey: entry } },
    { new: true }
  );
  if (updated) { return NextResponse.json({ success: true, message: '오늘 설문 추가 완료', data: updated }, { status: 200 })}

  // 7. 오늘자 문서가 없으면 새로 생성
  const created = await healthcheck.create({
    User:   userId,
    survey: [entry]
  });

  // 8. 새 문서 생성 시 User 문서에 healthcheck 참조 추가
  await User.findByIdAndUpdate( userId, { $push: { healthcheck: created._id } }, { new: true });

  // 9. 생성 완료 응답 반환
  return NextResponse.json({ success: true, message: '설문 저장 완료', data: created }, { status: 201 });
}
