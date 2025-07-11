import connectDB from '@/app/database/db';
import User from '@/app/database/models/User';

export async function POST(req) {
  const { id, password } = await req.json();
  if (!id || !password) {
    return new Response(JSON.stringify({
      success: false, message: 'ID와 비밀번호는 필수입니다.'
    }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    await connectDB();

    // 스키마 필드명이 'ID'라면:
    const user = await User.findOne({ ID: id });
    if (!user) {
      return new Response(JSON.stringify({
        success: false, message: '존재하지 않는 유저 ID입니다.'
      }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    // SHA-256 단순 비교
    if (user.password !== password) {
      return new Response(JSON.stringify({
        success: false, message: '비밀번호가 일치하지 않습니다.'
      }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    // (선택) JWT 발급 예시
    // import jwt from 'jsonwebtoken';
    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    return new Response(JSON.stringify({
      success: true,
      user_id: user._id,
      // token
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (err) {
    console.error('유저 로그인 실패:', err);
    return new Response(JSON.stringify({
      success: false, message: '서버 오류'
    }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
