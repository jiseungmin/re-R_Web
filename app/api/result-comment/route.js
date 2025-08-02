// app/api/result-comment/route.js
import connectDB from "@/app/database/db";
import ResultComment from "@/app/database/models/ResultComment";

/* [POST] 결과 멘트 저장 API - ResultComment 문서를 단일 upsert (있으면 수정, 없으면 생성) */
export async function POST(req) {
  try {
    // 1. DB 연결
    await connectDB();

    // 2. 요청 본문 파싱
    const data = await req.json();

    // 3. 하나의 문서를 upsert (없으면 만들고, 있으면 업데이트)
    const comment = await ResultComment.findOneAndUpdate({}, data, { new: true, upsert: true, runValidators: true });

    // 4. 성공 응답
    return new Response(JSON.stringify({ success: true, data: comment }), { status: 200, headers: {"Content-Type": "application/json"}});
  } catch (err) {
    // 5. 예외 처리: 서버 오류
    console.error("Error upserting ResultComment:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500, headers: { "Content-Type": "application/json"}});
  }
}

/* [GET] 결과 해설 조회 API - ResultComment 컬렉션에서 첫 번째 문서를 조회하여 반환 */
export async function GET() {
  try {
    // 1. DB 연결
    await connectDB();

    // 2. 첫 번째 문서 조회 및 문서 조회 예외 처리
    const comment = await ResultComment.findOne({});
    if (!comment) {return new Response(JSON.stringify({ success: false, error: "문서를 찾을 수 없습니다." }), { status: 404, headers: { "Content-Type": "application/json" }});}

    // 3) 성공 응답
    return new Response( JSON.stringify({ success: true, data: comment }), { status: 200, headers: { "Content-Type": "application/json"}});
  } catch (err) {
    // 4. 성공 응답 반환
    console.error("Error fetching ResultComment:", err);
    return new Response( JSON.stringify({ success: false, error: err.message }), { status: 500, headers: { "Content-Type": "application/json"}});
  }
}
