// app/api/healthcheck/route.js
import connectDB from '@/app/database/db';
import { NextResponse } from 'next/server';
import User from '@/app/database/models/User';
import healthcheck from '@/app/database/models/Healthcheck';

export async function POST(request) {
  const { userId, paintest, feartest, max_angle } = await request.json();
  console.log(userId, paintest, feartest, max_angle)
  if (!userId || !Array.isArray(paintest) || !feartest || typeof max_angle !== 'number') {
    return NextResponse.json(
      { success: false, message: 'userId, paintest, feartest, max_angle 모두 필요합니다.' },
      { status: 400 }
    );
  }

  await connectDB();

  // 오늘 00:00~23:59 범위 계산
  const now   = new Date();
  const start = new Date(now.setHours(0, 0, 0, 0));
  const end   = new Date(now.setHours(23, 59, 59, 999));

  // 새로 추가할 survey entry
  const entry = { paintest, feartest, max_angle };

  // 1) 오늘자 문서가 있으면 survey 배열에 push
  const updated = await healthcheck.findOneAndUpdate(
    { User: userId, createat: { $gte: start, $lte: end } },
    { $push: { survey: entry } },
    { new: true }
  );
  if (updated) {
    return NextResponse.json(
      { success: true, message: '오늘 설문 추가 완료', data: updated },
      { status: 200 }
    );
  }

  // 2) 오늘자 문서가 없으면 새로 생성
  const created = await healthcheck.create({
    User:   userId,
    survey: [entry]
  });

  // → 생성 분기에만 User 문서 업데이트
  await User.findByIdAndUpdate(
    userId,
    { $push: { healthcheck: created._id } },
    { new: true }
  );

  return NextResponse.json(
    { success: true, message: '설문 저장 완료', data: created },
    { status: 201 }
  );
}
