import crypto from 'crypto';
import mongoose from 'mongoose';
import connectDB from '@/app/database/db';
import User from '@/app/database/models/User';
import Hospital from '@/app/database/models/Hospital';

/* [POST] 유저 생성 API (회원가입) - 요청된 환자 정보를 검증 후 MongoDB에 저장 및 병원 환자 목록 업데이트 */
export async function POST(request) {
  try {
    // 1. 요청 바디 파싱 및 입력값 추출     
    const body = await request.json();
    const { password, name, gender, phone,
            birth, has_base_disease, had_knee_surgery,
            surgery_hospital, pre_surgery_rom, surgery_date} = body;

    // 2. 필수값 검사
    if ( !password || !name || !gender || !phone || !birth || typeof has_base_disease === 'undefined' || typeof had_knee_surgery === 'undefined') {
      return new Response( JSON.stringify({ success: false, message: '필수 입력값이 누락되었습니다.' }), { status: 400 });
    }

    // 3. DB 연결
    await connectDB();

    // 4. 중복 ID(Phone) 검사
    if (await User.findOne({ phone })) { return new Response( JSON.stringify({ success: false, message: '이미 사용 중인 ID입니다.' }), { status: 409 })}

    // 5. 중복 환자(이름·전화·성별·생년월일) 검사
    if (await User.findOne({ name, phone, gender, birth })) {
      return new Response( JSON.stringify({ success: false, message: '동일한 정보의 환자가 이미 등록되어 있습니다.'}), { status: 409 });
    }

    // 6. 비밀번호 해싱 (SHA-256)
    const hash = crypto.createHash('sha256').update(password).digest('hex');

    // 7. 사용자 문서 생성 및 저장
    const newUser = new User({
      password: hash, name, gender,
      phone, birth,
      has_base_disease: has_base_disease === '예',
      had_knee_surgery: had_knee_surgery === '예',
      Hospital: surgery_hospital ? new mongoose.Types.ObjectId(surgery_hospital) : undefined,
      pre_surgery_rom: pre_surgery_rom ? Number(pre_surgery_rom) : undefined,
      surgery_date: had_knee_surgery === '예' && surgery_date ? new Date(surgery_date) : undefined,
    });
    await newUser.save();

    // 8. 병원 환자 목록에 사용자 추가
    if (surgery_hospital) {
      await Hospital.updateOne({ _id: new mongoose.Types.ObjectId(surgery_hospital) }, { $addToSet: { patients: newUser._id } });
    }

    // 9. 성공 응답 반환
    return new Response( JSON.stringify({ success: true }), { status: 201 });
  } catch (err) {
    console.error('환자 생성 실패:', err);
    return new Response( JSON.stringify({ success: false, message: '서버 오류가 발생했습니다.' }), { status: 500 });
  }
}
