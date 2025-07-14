import connectDB from '@/app/database/db';
import User from '@/app/database/models/User';
import crypto from 'crypto';

export async function POST(req) {
  const { id, password } = await req.json();

  if (!id || !password) {
    return new Response(JSON.stringify({
      success: false, message: 'ID와 비밀번호는 필수입니다.'
    }), { status: 400 });
  }

  try {
    await connectDB();
    const user = await User.findOne({ ID: id });

    if (!user) {
      return new Response(JSON.stringify({
        success: false, message: '존재하지 않는 유저 ID입니다.'
      }), { status: 404 });
    }

    // 서버에서 SHA-256 해싱
    const hash = crypto.createHash('sha256').update(password).digest('hex');

    if (user.password !== hash) {
      return new Response(JSON.stringify({
        success: false, message: '비밀번호가 일치하지 않습니다.'
      }), { status: 401 });
    }

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
    console.error('로그인 실패:', err);
    return new Response(JSON.stringify({
      success: false, message: '서버 오류'
    }), { status: 500 });
  }
}
