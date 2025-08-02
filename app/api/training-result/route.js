import connectDB from '@/app/database/db'
import TrainingResult from '@/app/database/models/TrainingResult'

/* [POST] 훈련 결과 저장 API - 필수값 검증 후 TrainingResult 컬렉션에 저장 */
export async function POST(request) {
   // 0. 필수 필드 정의
  const requiredFields = [ 'opweek', 'day', 'session', 'maxspeed', 
            'activetime', 'repeatcount', 'maxangle', 'validrepeatcount']

  try {
    // 1. DB 연결
    await connectDB()

    // 2. 요청 본문 파싱
    const payload = await request.json()

    // 3. 필수 필드 검증
    for (const field of requiredFields) {
      if (payload[field] === undefined) { return new Response( JSON.stringify({ success: false, error: `필수 필드 누락: ${field}` }), { status: 400, headers: { 'Content-Type': 'application/json' }})}
    }

    // 4. 타임스탬프 추가 후 저장
    const now = new Date()
    const docToSave = { ...payload, createdAt: now, updatedAt: now }
    const saved = await TrainingResult.create(docToSave)

    // 5. 성공 응답 반환
    return new Response( JSON.stringify({ success: true, message: '훈련 결과가 저장되었습니다.', id: saved._id }), { status: 200, headers: { 'Content-Type': 'application/json' }})
  } catch (error) {
    // 6. 예외 처리: 서버 오류
    console.error('훈련 데이터 저장 실패:', error)
    return new Response( JSON.stringify({ success: false, error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' }})
  }
}
