import connectDB from '@/app/database/db'
import Hospital from '@/app/database/models/Hospital'

/* [POST] 병원 로그인 API - 클라이언트에서 전달된 ID와 SHA-256 해시된 비밀번호를 검증 후 hospitalId 반환 */
export async function POST(req) {
  try {
    // 1. 요청 바디 파싱 및 입력값 추출
    const body = await req.json()
    const { id, password } = body // password는 SHA-256 해시 문자열로 전달됨

    // 2. 필수값 검사
    if (!id || !password) { return new Response( JSON.stringify({ success: false, message: "ID와 비밀번호는 필수입니다." }), { status: 400, headers: { "Content-Type": "application/json" } })}
    
    // 3. DB 연결
    await connectDB()

    // 4. 병원 ID로 문서 조회
    const hospital = await Hospital.findOne({ id })
    if (!hospital) { return new Response( JSON.stringify({ success: false, message: "존재하지 않는 병원 ID입니다." }), { status: 404, headers: { "Content-Type": "application/json" }})}

    // 5. 비밀번호 검증 (DB에 저장된 해시 vs 클라이언트 해시 비교)
    if (hospital.password !== password) { return new Response( JSON.stringify({ success: false, message: "비밀번호가 일치하지 않습니다." }), { status: 401, headers: { "Content-Type": "application/json" }})}

    // 6. 인증 성공 응답 반환
    return new Response( JSON.stringify({ success: true, hospitalId: hospital._id }), { status: 200, headers: { "Content-Type": "application/json" }})
  } catch (err) {
    // 7. 예외 처리: 서버 오류
    console.error("병원 로그인 실패:", err)
    return new Response( JSON.stringify({ success: false, message: "서버 오류" }), { status: 500, headers: { "Content-Type": "application/json" }})
  }
}
