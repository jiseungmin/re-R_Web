import connectDB from '@/app/database/db';
import User from '@/app/database/models/User';

/* [GET] 사용자 상세 조회 API - params.id 기반으로 특정 사용자 문서를 반환 */
export async function GET(req, { params }) {
  try {
    // 1. DB 연결
    await connectDB();

    // 2. URL 파라미터에서 id 추출
    const { id } = params;

    // 3. 사용자 문서 조회 (필요 시 populate로 연관 데이터 조회 가능)
    const user = await User.findById(id)
      // 필요에 따라 populate 도 가능
      // .populate('PostEvalSession')
      // .populate('Healthcheck')
      .lean();

    // 4. 사용자 존재 여부 확인
    if (!user) { return new Response( JSON.stringify({ success: false, error: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' }})}
    
    // 5. 성공 응답 반환
    return new Response( JSON.stringify({ success: true, data: user }), { status: 200, headers: { 'Content-Type': 'application/json'}});
  } catch (err) {
    // 6. 예외 처리: 서버 오류
    console.error('Error fetching user detail:', err);
    return new Response( JSON.stringify({ success: false, error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json'}});
  }
}
