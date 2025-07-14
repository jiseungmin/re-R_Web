// 파일 위치: /app/api/auth/update-patient/route.js
import connectDB from '@/app/database/db';
import User from '@/app/database/models/User';

export async function POST(req) {
  const body = await req.json();
  const {
    user_id,
    has_base_disease,
    had_knee_surgery,
    pre_surgery_rom,
    surgery_date,
  } = body;

  if (!user_id) {
    return new Response(JSON.stringify({ success: false, message: "user_id는 필수입니다." }), { status: 400 });
  }

  try {
    await connectDB();
    const updated = await User.findByIdAndUpdate(user_id, {
      has_base_disease,
      had_knee_surgery,
      pre_surgery_rom,
      surgery_date,
    }, { new: true });

    if (!updated) {
      return new Response(JSON.stringify({ success: false, message: "해당 유저가 존재하지 않습니다." }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('업데이트 에러:', err);
    return new Response(JSON.stringify({ success: false, message: "서버 오류" }), { status: 500 });
  }
}
