import mongoose from 'mongoose';
import connectDB from '@/app/database/db';
import User from '@/app/database/models/User';
import Hospital from '@/app/database/models/Hospital';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      password,
      name,
      gender,
      phone,
      birth,
      has_base_disease,
      had_knee_surgery,
      surgery_hospital,
      pre_surgery_rom,
      surgery_date,
    } = body;


    // 필수값 검사
    if (
      !password ||
      !name ||
      !gender ||
      !phone ||
      !birth ||
      typeof has_base_disease === 'undefined' ||
      typeof had_knee_surgery === 'undefined'
    ) {
      return new Response(
        JSON.stringify({ success: false, message: '필수 입력값이 누락되었습니다.' }),
        { status: 400 }
      );
    }

    await connectDB();

    // 중복 ID 검사
    if (await User.findOne({ phone })) {
      return new Response(
        JSON.stringify({ success: false, message: '이미 사용 중인 ID입니다.' }),
        { status: 409 }
      );
    }

    // 중복 환자(이름·전화·성별·생년월일) 검사
    if (await User.findOne({ name, phone, gender, birth })) {
      return new Response(
        JSON.stringify({
          success: false,
          message: '동일한 정보의 환자가 이미 등록되어 있습니다.',
        }),
        { status: 409 }
      );
    }

    // 비밀번호 해싱
    const hash = crypto.createHash('sha256').update(password).digest('hex');

    // 사용자 생성
    const newUser = new User({
      ID: phone, 
      password: hash,
      name,
      gender,
      phone,
      birth,
      has_base_disease: has_base_disease === '예',
      had_knee_surgery: had_knee_surgery === '예',
      Hospital: surgery_hospital
        ? new mongoose.Types.ObjectId(surgery_hospital)
        : undefined,
      pre_surgery_rom: pre_surgery_rom ? Number(pre_surgery_rom) : undefined,
      surgery_date:
        had_knee_surgery === '예' && surgery_date
          ? new Date(surgery_date)
          : undefined,
    });

    await newUser.save();

    // 병원 환자 목록에 추가
    if (surgery_hospital) {
      await Hospital.updateOne(
        { _id: new mongoose.Types.ObjectId(surgery_hospital) },
        { $addToSet: { patients: newUser._id } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 201 }
    );
  } catch (err) {
    console.error('환자 생성 실패:', err);
    return new Response(
      JSON.stringify({ success: false, message: '서버 오류가 발생했습니다.' }),
      { status: 500 }
    );
  }
}


export async function GET() {
    try {
      await connectDB()
      const usersWithoutBaseDisease = await User.find({ has_base_disease: null })
      return new Response(JSON.stringify({ success: true, users: usersWithoutBaseDisease }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    } catch (err) {
      console.error('유저 필터링 실패:', err)
      return new Response(JSON.stringify({ success: false, message: '서버 오류' }), { status: 500 })
    }
}


export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("user_id")

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return new Response(JSON.stringify({ success: false, message: '유효하지 않은 사용자 ID입니다.' }), { status: 400 })
    }

    await connectDB()
    const deleted = await User.findByIdAndDelete(userId)

    if (!deleted) {
      return new Response(JSON.stringify({ success: false, message: '사용자를 찾을 수 없습니다.' }), { status: 404 })
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: '서버 오류' }), { status: 500 })
  }
}
