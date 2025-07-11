// app/api/weekprogram/route.js
import connectDB from '@/app/database/db';
import Weekprogram from '@/app/database/models/Weekprogram';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// 주차별 미리 정의된 운동 ObjectId 배열 (예시는 문자열 형태입니다)
const WEEK_EXERCISES = {
  '1주차': [
    mongoose.Types.ObjectId('64a1f2e5f0c2c1a1b2c3d4e5'),
    mongoose.Types.ObjectId('64a1f2e5f0c2c1a1b2c3d4e6'),
    mongoose.Types.ObjectId('64a1f2e5f0c2c1a1b2c3d4e7'),
  ],
  '2주차': [
    mongoose.Types.ObjectId('64a1f2e5f0c2c1a1b2c3d4e8'),
    mongoose.Types.ObjectId('64a1f2e5f0c2c1a1b2c3d4e9'),
    mongoose.Types.ObjectId('64a1f2e5f0c2c1a1b2c3d4ea'),
  ],
  // … 필요에 따라 계속 추가
};

export async function POST(request) {
  const { userId, weekRange } = await request.json();

  // 1) 필수값 검증
  if (!userId || !weekRange) {
    return NextResponse.json(
      { success: false, message: 'userId와 weekRange는 필수입니다.' },
      { status: 400 }
    );
  }

  // 2) DB 연결
  await connectDB();

  // 3) 매핑에서 주차별 운동 리스트 꺼내기
  const exercises = WEEK_EXERCISES[weekRange] || [];

  // 4) Weekprogram 문서 생성
  const created = await Weekprogram.create({
    User:       userId,
    Exercise:   exercises,   // 매핑된 ID 배열
    weekRange,               // ex) "2주차"
    time:       ''           // 나중에 설정할 예정이라 빈 문자열
    // skip_Exercise는 default: []로 자동 설정
  });

  // 5) 생성된 문서를 그대로 반환
  return NextResponse.json(
    { success: true, message: 'Weekprogram이 생성되었습니다.', data: created },
    { status: 201 }
  );
}


export async function GET(request) {
  // 1) 쿼리 파라미터에서 userId, weekRange 읽기
  const { searchParams } = new URL(request.url);
  const userId    = searchParams.get('userId');
  const weekRange = searchParams.get('weekRange');

  if (!userId) {
    return NextResponse.json(
      { success: false, message: 'userId는 필수입니다.' },
      { status: 400 }
    );
  }

  await connectDB();

  // 2) 필터 설정 (주차가 지정되면 그 주차만, 아니면 최신 프로그램 하나)
  const filter = { User: userId };
  if (weekRange) filter.weekRange = weekRange;

  // 3) 프로그램 조회 및 Exercise, skip_Exercise populate
  const program = await Weekprogram.findOne(filter, null, { sort: { createat: -1 } })
    .populate('Exercise')       // 각 ID를 Exercise 도큐먼트로 치환
    .populate('skip_Exercise')  // 스킵 리스트도 풀어서
    .lean();

  if (!program) {
    return NextResponse.json(
      { success: false, message: '프로그램을 찾을 수 없습니다.' },
      { status: 404 }
    );
  }

  // 4) 응답
  return NextResponse.json(
    { success: true, data: program },
    { status: 200 }
  );
}
