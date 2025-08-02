import mongoose from 'mongoose';
import connectDB from '@/app/database/db';
import { NextResponse } from 'next/server';
import ExerciseModel from '@/app/database/models/Exercise';
import Weekprogram from '@/app/database/models/Weekprogram';
import Programtemplete from '@/app/database/models/Programtemplete';

/* [POST] 주간 프로그램 생성 API
   - 사용자의 주차 정보를 받아 해당 주차 템플릿을 기반으로 Weekprogram 문서 생성
   - 템플릿에 등록된 운동들을 함께 반환 */
export async function POST(request) {
  try {
    // 1. 요청 본문 파싱 및 필수값 검사
    const { userId, weekRange } = await request.json();
    if (!userId || !weekRange) { return NextResponse.json({ success: false, message: 'userId와 weekRange는 필수입니다.' }, { status: 400 })}

    // 2. DB 연결
    await connectDB();


    // 3. 주차 숫자 파싱
    const weekNum = parseInt(weekRange, 10);
    if (isNaN(weekNum)) { return NextResponse.json({ success: false, message: 'weekRange는 "숫자주차" 형태여야 합니다.' }, { status: 400 })}

    // 4. 해당 주차에 포함된 템플릿 조회
    const template = await Programtemplete.findOne({ weekRange: { $in: [weekNum] }});

    // 5. 템플릿 존재 여부 확인
    if (!template) { return NextResponse.json({ success: false, message: `${weekNum}주차에 해당하는 템플릿이 없습니다.` }, { status: 404 })}

    // 6. 템플릿에 운동이 없을 경우
    const exerciseIds = template.Exercise;
    if (!exerciseIds.length) { return NextResponse.json({ success: false, message: '템플릿에 설정된 운동이 없습니다.' }, { status: 500 })}

    // 7. Weekprogram 문서 생성
    const createdWeek = await Weekprogram.create({
      User:       new mongoose.Types.ObjectId(userId),
      Exercise:   exerciseIds,
      total_time: template.total_time,
      weekRange:  weekNum
    });

    // 8. 운동 상세 정보 조회
    const exerciseData = await ExerciseModel.find({ _id: { $in: exerciseIds }});

    // 9. 성공 응답 반환
    return NextResponse.json({ success: true, message: 'Weekprogram이 생성되었습니다.', data: { weekprogram: createdWeek, exercises: exerciseData }}, { status: 201 });
  } catch (err) {
    // 10. 예외 처리
    console.error('[/api/weekprogram] error:', err);
    return NextResponse.json({ success: false, message: err.message || '서버 에러가 발생했습니다.' }, { status: 500 });
  }
}
