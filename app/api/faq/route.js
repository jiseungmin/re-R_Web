import connectDB from '@/app/database/db';
import Faq from '@/app/database/models/Faq';

/* [GET] FAQ 목록 조회 API - 데이터베이스에 저장된 모든 FAQ를 생성일자 내림차순으로 반환 */
export async function GET() {
  try {
    // 1. DB 연결
    await connectDB();

    // 2. 모든 FAQ 조회 (최신순)
    const faqs = await Faq.find().sort({ createdAt: -1 }).lean();

    // 3. 성공 응답
    return new Response( JSON.stringify({ success: true, data: faqs }), { status: 200, headers: {'Content-Type': 'application/json'}});
  } catch (err) {
    console.error('Error fetching FAQ:', err);
    return new Response( JSON.stringify({ success: false, error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json'}});
  }
}

/* [POST] FAQ 생성 API - category·question·answer를 받아 새로운 FAQ 문서 생성 */
export async function POST(req) {
  try {
    // 1. DB 연결
    await connectDB();

    // 2. 요청 본문에서 단일 FAQ 객체 파싱
    const { category, question, answer } = await req.json();

    // 3.입력값 유효성 검사
    if (
      typeof category !== 'string' ||
      typeof question !== 'string' ||
      typeof answer !== 'string'
    ) {
      return new Response( JSON.stringify({ success: false, error: 'category, question, answer 필드를 모두 문자열로 보내주세요.' }), { status: 400, headers: { 'Content-Type': 'application/json' }});
    }

    // 4) 새 FAQ 문서 생성
    const created = await Faq.create({ category, question, answer });

    // 5) 성공 응답
    return new Response( JSON.stringify({ success: true, data: created }), { status: 201, headers: { 'Content-Type': 'application/json' }});
  } catch (err) {
    // 6) 예외 처리: 서버 오류
    console.error('Error saving FAQ:', err);
    return new Response( JSON.stringify({ success: false, error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' }});
  }
}

/* [PUT] FAQ 수정 API - id로 문서를 찾아 제공된 필드만 업데이트하여 반환 */
export async function PUT(req) {
  try {
    // 1. 요청 본문 파싱 및 입력값 추출 후 id 필수값 검사
    const { id, category, question, answer } = await req.json();
    if (!id) { return new Response( JSON.stringify({ success: false, error: '업데이트할 FAQ의 id를 보내주세요.' }), { status: 400, headers: { 'Content-Type': 'application/json' }})}

    // 2. 업데이트할 필드 객체 생성
    const update = {};
    if (typeof category === 'string') update.category = category;
    if (typeof question === 'string') update.question = question;
    if (typeof answer === 'string') update.answer = answer;
    if (Object.keys(update).length === 0) {
      return new Response( JSON.stringify({ success: false, error: '업데이트할 필드를 하나 이상 보내주세요.' }), { status: 400, headers: { 'Content-Type': 'application/json' }});
    }

    // 3. DB 연결
    await connectDB();

    // 4. FAQ 문서 업데이트 (검증 실행, 업데이트된 문서 반환) 및 문서 존재 여부 확인
    const updated = await Faq.findByIdAndUpdate( id, update, { new: true, runValidators: true }).lean();
    if (!updated) { return new Response( JSON.stringify({ success: false, error: '해당 id의 FAQ를 찾을 수 없습니다.' }), { status: 404, headers: { 'Content-Type': 'application/json' }})}
    
    // 5. 성공 응답 반환
    return new Response( JSON.stringify({ success: true, data: updated }), { status: 200, headers: { 'Content-Type': 'application/json' }});
  } catch (err) {
    // 6. 예외 처리: 서버 오류
    console.error('Error updating FAQ:', err);
    return new Response( JSON.stringify({ success: false, error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json'}});
  }
}