import mongoose from 'mongoose'
import connectDB from '@/app/database/db'
import User from '@/app/database/models/User'
import Hospital from '@/app/database/models/Hospital'

export async function POST(req) {
  try {
    const body = await req.json()
    const { ID, hashedPassword, name, gender, phone, doctor, birth, hospitalId} = body
    console.log('hashedPassword: ', hashedPassword)

    if (!ID || !hashedPassword || !name || !gender || !phone || !doctor || !birth) {
      return new Response(JSON.stringify({ success: false, message: '입력값 누락' }), { status: 400 })
    }

    await connectDB()

    const existing = await User.findOne({ name, gender, phone, birth})
      
    if (existing) {
        return new Response(
          JSON.stringify({ success: false, message: '같은 이름, 성별, 전화번호, 생년월일을 가진 환자가 이미 존재합니다.'}),
          { status: 409 }
        )
    }

    const newUser = new User({
      ID,
      password: hashedPassword,
      name,
      gender,
      phone,
      Doctor: doctor,
      birth,
      Hospital: new mongoose.Types.ObjectId(hospitalId),
      registered_at: new Date().toISOString()
    })

    await newUser.save()

    await Hospital.updateOne(
      { _id: new mongoose.Types.ObjectId(hospitalId) },
      { $addToSet: { doctors: doctor } }
    )

    return new Response(JSON.stringify({ success: true }), { status: 201 })

  } catch (err) {
    console.error('환자 생성 실패:', err)
    return new Response(JSON.stringify({ success: false, message: '서버 오류' }), { status: 500 })
  }
}


export async function GET() {
    try {
      await connectDB()
      const usersWithoutBaseDisease = await User.find({ has_base_disease: null })
      return new Response(JSON.stringify({ success: true, users: usersWithoutBaseDisease }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    } catch (err) {
      console.error('유저 필터링 실패:', err)
      return new Response(JSON.stringify({ success: false, message: '서버 오류' }), { status: 500 })
    }
}


export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("user_id")

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return new Response(JSON.stringify({ success: false, message: '유효하지 않은 사용자 ID입니다.' }), { status: 400 })
    }

    await connectDB()
    const deleted = await User.findByIdAndDelete(userId)

    if (!deleted) {
      return new Response(JSON.stringify({ success: false, message: '사용자를 찾을 수 없습니다.' }), { status: 404 })
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: '서버 오류' }), { status: 500 })
  }
}
