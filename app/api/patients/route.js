import connectDB from '@/app/database/db';
import User from '@/app/database/models/User';

/* [GET] 사용자 목록 조회 API - 이름 기준 정렬된 간략 정보 목록 반환 */
export async function GET() {
  try {
    // 1. DB 연결
    await connectDB();

    // 2. 사용자 정보 조회 (필요 필드만 선택: name, ID, phone, registered_at, gender, birth)
    const users = await User.find({}, { name: 1, ID: 1, phone: 1, registered_at: 1, gender: 1, birth: 1})
      .sort({ name: 1 })
      .lean();
    
    // 3. 성공 응답 반환
    return new Response( JSON.stringify({ success: true, data: users }), { status: 200, headers: { 'Content-Type': 'application/json'}});
  } catch (err) {
    // 4. 예외 처리: 서버 오류
    console.error('Error fetching users:', err);
    return new Response( JSON.stringify({ success: false, error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' }});
  }
}
