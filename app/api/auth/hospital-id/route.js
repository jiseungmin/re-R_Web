import QRCode from 'qrcode'
import mongoose from 'mongoose'
import speakeasy from 'speakeasy'
import connectDB from '@/app/database/db'
import Hospital from '@/app/database/models/Hospital'

/* [POST] 병원 회원가입 등록 API - 병원 회원가입 정보를 받아 MongoDB에 저장 */
export async function POST(req) {
  // 1. DB 연결
  await connectDB()

  try {
    // 2. 요청 바디 파싱
    const body = await req.json()
    const { id, password, name, phone, address } = body
    
    // 3. 필수 항목 검증
    if (!id || !password || !name) {
      return new Response(
        JSON.stringify({ success: false, message: '필수 항목이 누락되었습니다.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 4. 동일한 ID의 병원이 이미 존재하는지 확인
    const existing = await Hospital.findOne({ id })
    if (existing) {
      return new Response(
        JSON.stringify({ success: false, message: '이미 존재하는 병원 ID입니다.' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 5. 2FA용 시크릿 생성 및 qrImage 생성
    const secret = speakeasy.generateSecret({ name: `re-R (${id})` })
    const qrImage = await QRCode.toDataURL(secret.otpauth_url)

    // 6. 새로운 병원 문서 생성
    await Hospital.create({ id, password, name, phone, address, otp_secret: secret.base32, otpauth_url: secret.otpauth_url})

    // 7. 성공 응답 반환
    return new Response(
      JSON.stringify({
        success: true,
        message: '병원이 등록되었습니다.',
        qr: qrImage,
        secret: secret.base32, 
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    )

  } catch (err) {
    // 8. 성공 응답 반환
    console.error('등록 오류:', err)
    return new Response(
      JSON.stringify({ success: false, message: '서버 오류', error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
  


/* [GET] 병원 목록 조회 API - 데이터 베이스에 저장된 모든 병원 정보를 생성일자 내림차순으로 반환 */
export async function GET() {
  // 1. DB 연결
  await connectDB()

  try {
    // 2. 모든 병원 문서 조회 후 최신순으로 정렬
    const hospitals = await Hospital.find().sort({ createdAt: -1 })
    return new Response(
      JSON.stringify({ success: true, hospitals }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('조회 오류:', err)
    return new Response(
      JSON.stringify({ success: false, message: '서버 오류' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}


/* [DELETE] 병원 삭제 API - hospital_id를 이용해 해당 병원 문서를 삭제 */
export async function DELETE(req) {
  // 1. DB 연결
  await connectDB()

  try {
    // 2. 요청 URL에서 hospital_id 추출
    const { searchParams } = new URL(req.url)
    const hospitalId = searchParams.get("hospital_id")

    // 3. 유효한 병원 ID인지 확인
    if (!hospitalId || !mongoose.Types.ObjectId.isValid(hospitalId)) {
      return new Response(
        JSON.stringify({ success: false, message: '유효하지 않은 병원 ID입니다.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 4. 병원 문서 삭제
    const deleted = await Hospital.findByIdAndDelete(hospitalId)

    // 5. 삭제 결과에 따라 응답 반환
    if (!deleted) {
      return new Response(
        JSON.stringify({ success: false, message: '해당 병원을 찾을 수 없습니다.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: true, message: '병원 삭제 성공' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (err) {
    console.error('삭제 오류:', err)
    return new Response(
      JSON.stringify({ success: false, message: '서버 오류', error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
