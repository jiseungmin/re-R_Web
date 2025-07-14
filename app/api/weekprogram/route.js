// app/api/weekprogram/route.js
import connectDB from '@/app/database/db';
import Weekprogram from '@/app/database/models/Weekprogram';
import ExerciseModel from '@/app/database/models/Exercise';
import Programtemplete from '@/app/database/models/Programtemplete';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function POST(request) {
  try {
    const { userId, weekRange } = await request.json();

    console.log(userId, weekRange)

    if (!userId || !weekRange) {
      return NextResponse.json(
        { success: false, message: 'userId와 weekRange는 필수입니다.' },
        { status: 400 }
      );
    }

    await connectDB();

    const weekNum = parseInt(weekRange, 10);
    if (isNaN(weekNum)) {
      return NextResponse.json(
        { success: false, message: 'weekRange는 "숫자주차" 형태여야 합니다.' },
        { status: 400 }
      );
    }

    console.log('weekNum: ', weekNum)

    // Programtemplete 컬렉션에서 숫자 배열에 weekNum이 들어있는 문서 조회
    const template = await Programtemplete.findOne({
      weekRange: { $in: [weekNum] }
    });

    console.log('template: ', template)

    if (!template) {
      return NextResponse.json(
        { success: false, message: `${weekNum}주차에 해당하는 템플릿이 없습니다.` },
        { status: 404 }
      );
    }
    console.log('template: ', template)

    const exerciseIds = template.Exercise;
    if (!exerciseIds.length) {
      return NextResponse.json(
        { success: false, message: '템플릿에 설정된 운동이 없습니다.' },
        { status: 500 }
      );
    }

    console.log('exerciseIds: ', exerciseIds)

    const createdWeek = await Weekprogram.create({
      User:       new mongoose.Types.ObjectId(userId),
      Exercise:   exerciseIds,
      total_time: template.total_time,
      weekRange:  weekNum
    });

    const exerciseData = await ExerciseModel.find({
      _id: { $in: exerciseIds }
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Weekprogram이 생성되었습니다.',
        data: { weekprogram: createdWeek, exercises: exerciseData }
      },
      { status: 201 }
    );

  } catch (err) {
    console.error('[/api/weekprogram] error:', err);
    return NextResponse.json(
      { success: false, message: err.message || '서버 에러가 발생했습니다.' },
      { status: 500 }
    );
  }
}
