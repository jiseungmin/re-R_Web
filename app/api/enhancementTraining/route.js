// app/api/enhancement-training/route.js
import connectDB from '@/app/database/db';
import { NextResponse } from 'next/server';
import User from '@/app/database/models/User';
import EnhancementTraining from '@/app/database/models/EnhancementTraining';

export async function POST(request) {
  const { userId, top_speed, time, repetition, max_angle, valid_repetition, angle, target_angle} = await request.json();

  // 1) 필수값 검증
  if (
    !userId ||
    typeof top_speed        !== 'number' ||
    typeof time             !== 'number' ||
    typeof repetition       !== 'number' ||
    typeof max_angle        !== 'number' ||
    typeof valid_repetition !== 'number' ||
    typeof angle            !== 'object' ||
    typeof target_angle     !== 'number'
  ) {
    return NextResponse.json(
      { success: false, message: '필수 필드를 모두 올바르게 입력해주세요.' },
      { status: 400 }
    );
  }

  // 2) DB 연결
  await connectDB();

  // 3) 오늘 00:00~23:59 범위 계산
  const now        = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay   = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  // 4) 새로 추가할 세션 객체
  const newSession = {
    top_speed, time, repetition,
    max_angle, valid_repetition, angle,
    target_angle,
    createdAt: new Date()
  };

  // 5) 오늘자 문서가 있으면 sessions 배열에 push
  const updated = await EnhancementTraining.findOneAndUpdate(
    {
      User:     userId,
      createat: { $gte: startOfDay, $lte: endOfDay }
    },
    { $push: { sessions: newSession } },
    { new: true }
  );

  if (updated) {
    return NextResponse.json(
      { success: true, message: '오늘치 세션에 추가되었습니다.', data: updated },
      { status: 200 }
    );
  }

  // 6) 오늘자 문서가 없으면 새로 생성
  const created = await EnhancementTraining.create({
    User:     userId,
    sessions: [ newSession ]
  });

  // 7) User 문서에도 EnhancementTraining 참조 추가 (한 번만)
  await User.findByIdAndUpdate(
    userId,
    { $push: { EnhancementTraining: created._id } },
    { new: true }
  );

  return NextResponse.json(
    { success: true, message: '새로운 EnhancementTraining 문서가 생성되었습니다.', data: created },
    { status: 201 }
  );
}
