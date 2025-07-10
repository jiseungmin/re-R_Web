// app/api/faq/route.js

import connectDB from '@/app/database/db';
import Faq from '@/app/database/models/Faq';

export async function GET() {
  try {
    // 1) DB 연결
    await connectDB();

    // 2) 모든 FAQ 조회 (최신순)
    const faqs = await Faq.find().sort({ createdAt: -1 }).lean();

    // 3) 성공 응답
    return new Response(
      JSON.stringify({ success: true, data: faqs }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (err) {
    console.error('Error fetching FAQ:', err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export async function POST(req) {
  try {
    // 1) DB 연결
    await connectDB();

    // 2) 요청 본문에서 단일 FAQ 객체 파싱
    const { category, question, answer } = await req.json();
    // 검증
    if (
      typeof category !== 'string' ||
      typeof question !== 'string' ||
      typeof answer !== 'string'
    ) {
      return new Response(
        JSON.stringify({ success: false, error: 'category, question, answer 필드를 모두 문자열로 보내주세요.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 3) 새 FAQ 문서 생성
    const created = await Faq.create({ category, question, answer });

    // 4) 성공 응답
    return new Response(
      JSON.stringify({ success: true, data: created }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Error saving FAQ:', err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}


export async function PUT(req) {
  try {
    await connectDB();
    const { id, category, question, answer } = await req.json();
    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: '업데이트할 FAQ의 id를 보내주세요.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    // build update object only with provided fields
    const update = {};
    if (typeof category === 'string') update.category = category;
    if (typeof question === 'string') update.question = question;
    if (typeof answer === 'string') update.answer = answer;
    if (Object.keys(update).length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: '업데이트할 필드를 하나 이상 보내주세요.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const updated = await Faq.findByIdAndUpdate(
      id,
      update,
      { new: true, runValidators: true }
    ).lean();
    if (!updated) {
      return new Response(
        JSON.stringify({ success: false, error: '해당 id의 FAQ를 찾을 수 없습니다.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }
    return new Response(
      JSON.stringify({ success: true, data: updated }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Error updating FAQ:', err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}