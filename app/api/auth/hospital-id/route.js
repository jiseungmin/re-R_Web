import mongoose from 'mongoose'
import connectDB from '@/app/database/db'
import Hospital from '@/app/database/models/Hospital'

// 병원 등록
export async function POST(req) {
  await connectDB()

  try {
    const body = await req.json()
    const { id, password, name, phone, address } = body

    if (!id || !password || !name) {
      return new Response(
        JSON.stringify({ success: false, message: '필수 항목이 누락되었습니다.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const existing = await Hospital.findOne({ id })
    if (existing) {
      return new Response(
        JSON.stringify({ success: false, message: '이미 존재하는 병원 ID입니다.' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      )
    }

    await Hospital.create({
      id,
      password,
      name,
      phone,
      address,
    })

    return new Response(
      JSON.stringify({ success: true, message: '병원이 등록되었습니다.' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (err) {
    console.error('등록 오류:', err)
    return new Response(
      JSON.stringify({ success: false, message: '서버 오류', error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

// 병원 목록 조회
export async function GET() {
  await connectDB()
  try {
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

// 병원 삭제
export async function DELETE(req) {
  await connectDB()

  try {
    const { searchParams } = new URL(req.url)
    const hospitalId = searchParams.get("hospital_id")
    console.log('삭제할 hospitalId:', hospitalId)

    if (!hospitalId || !mongoose.Types.ObjectId.isValid(hospitalId)) {
      return new Response(
        JSON.stringify({ success: false, message: '유효하지 않은 병원 ID입니다.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const deleted = await Hospital.findByIdAndDelete(hospitalId)
    console.log('삭제 결과:', deleted)

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
