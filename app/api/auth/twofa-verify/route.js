import QRCode from 'qrcode'
import speakeasy from "speakeasy"
import connectDB from '@/app/database/db'
import Hospital from "@/app/database/models/Hospital"

/* [POST] 2FA 토큰 검증 API */
export async function POST(req) {
  // 1. 요청 본문에서 id와 token 추출
  const { id, token } = await req.json()

  // 2. 병원 ID로 DB에서 병원 정보 조회
  const hospital = await Hospital.findOne({ id: id })

  // 3. 병원이 없거나 OTP 비밀키가 없으면 실패 응답
  if (!hospital || !hospital.otp_secret) {
    return Response.json({ success: false, message: "2FA 정보 없음" })
  }

  // 4. 사용자가 입력한 토큰을 기반으로 TOTP 유효성 검사
  const verified = speakeasy.totp.verify({
    secret: hospital.otp_secret,
    encoding: "base32",
    token,
    window: 1,
  })

  // 5. 검증 결과를 반환
  return Response.json({ success: verified })
}

/* [GET] 2FA QR 이미지 조회 API */
export async function GET(req) {
  // 1. DB 연결
  await connectDB()

  // 2. 요청 URL에서 병원 ID 추출
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  // 3. 병원 정보 조회
  const hospital = await Hospital.findOne({ id })
 
  // 4. 병원이 없거나 otpauth_url이 없으면 실패 응답
  if (!hospital || !hospital.otpauth_url) {
    return Response.json({ success: false, message: "병원 또는 QR 정보 없음" })
  }

  // 5. otpauth_url을 QR 코드로 변환 (base64 이미지 형태)
  const qr = await QRCode.toDataURL(hospital.otpauth_url)
  
  // 6. QR 이미지 반환
  return Response.json({ success: true, qr })
}
