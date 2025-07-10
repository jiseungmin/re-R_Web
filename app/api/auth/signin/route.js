import connectDB from '@/app/database/db'
import Hospital from '@/app/database/models/Hospital'

export async function POST(req) {
  try {
    const body = await req.json()
    const { id, password } = body // password는 SHA-256 해시 문자열로 전달됨
    console.log('id: ', id)
    console.log('password: ', password)

    if (!id || !password) {
      return new Response(
        JSON.stringify({ success: false, message: "ID와 비밀번호는 필수입니다." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      )
    }

    await connectDB()

    const hospital = await Hospital.findOne({ id })
    if (!hospital) {
      return new Response(
        JSON.stringify({ success: false, message: "존재하지 않는 병원 ID입니다." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      )
    }
    console.log('hospital.password: ', hospital.password)

    // 서버 저장된 SHA-256 해시된 비밀번호와 프론트 SHA-256 입력 비교
    if (hospital.password !== password) {
      return new Response(
        JSON.stringify({ success: false, message: "비밀번호가 일치하지 않습니다." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      )
    }

    return new Response(
      JSON.stringify({ success: true, hospitalId: hospital._id }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (err) {
    console.error("병원 로그인 실패:", err)
    return new Response(
      JSON.stringify({ success: false, message: "서버 오류" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
