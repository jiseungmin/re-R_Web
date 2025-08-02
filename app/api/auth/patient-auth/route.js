import crypto from 'crypto';
import connectDB from '@/app/database/db';
import User from '@/app/database/models/User';

/* [POST] 유저 로그인 API - 휴대폰 번호(ID)와 비밀번호를 검증하여 사용자 정보 반환 */
export async function POST(req) {
  // 1. 요청 바디에서 JSON 파싱 후 필수 항목 검증
  const { id, password } = await req.json();
  if (!id || !password) { return new Response(JSON.stringify({ success: false, message: 'ID와 비밀번호는 필수입니다.'}), { status: 400 })}

  try {
    // 2. DB 연결
    await connectDB();

    // 3. 휴대폰 번호(ID)에 해당하는 유저 조회
    const user = await User.findOne({ phone: id });

    // 4. 유저가 존재하지 않을 경우 오류 반환
    if (!user) { return new Response(JSON.stringify({ success: false, message: '존재하지 않는 유저 ID입니다.'}), { status: 404 })}

    // 5. 입력된 비밀번호를 서버 측에서 SHA-256 해싱
    const hash = crypto.createHash('sha256').update(password).digest('hex');

    // 6. 해시된 비밀번호 비교
    if (user.password !== hash) {return new Response(JSON.stringify({ success: false, message: '비밀번호가 일치하지 않습니다.'}), { status: 401 })}
    
    // 7. 로그인 성공 시 사용자 주요 정보 반환
    return new Response(JSON.stringify({
      success: true,
      ID: user.ID,
      user_id: user._id,
      name: user.name,
      phone: user.phone,
      birth: user.birth,
      doctor: user.Doctor,
      has_base_disease: user.has_base_disease,
      had_knee_surgery: user.had_knee_surgery,
      surgery_date: user.surgery_date
    }), { status: 200 });
  } catch (err) {
    // 8. 서버 오류 처리
    console.error('로그인 실패:', err);
    return new Response(JSON.stringify({
      success: false, message: '서버 오류'
    }), { status: 500 });
  }
}
