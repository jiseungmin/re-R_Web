// app/api/result-comment/route.js
import connectDB from "@/app/database/db";
import ResultComment from "@/app/database/models/ResultComment";

export async function POST(req) {
  try {
    // 1) DB 연결
    await connectDB();

    // 2) 요청 본문 파싱
    const data = await req.json();

    // 3) 하나의 문서를 upsert (없으면 만들고, 있으면 업데이트)
    const comment = await ResultComment.findOneAndUpdate(
      {},             // filter: 컬렉션 전체 중 첫 문서
      data,           // 업데이트할 필드들
      {
        new: true,          // 업데이트된(또는 생성된) 문서를 반환
        upsert: true,       // 없으면 새로 생성
        runValidators: true // 스키마 유효성 검사 실행
      }
    );

    // 4) 성공 응답
    return new Response(
      JSON.stringify({ success: true, data: comment }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (err) {
    console.error("Error upserting ResultComment:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}


export async function GET() {
  try {
    // 1) DB 연결
    await connectDB();

    // 2) 컬렉션 내 첫 번째(유일한) 문서 조회
    const comment = await ResultComment.findOne({});

    if (!comment) {
      return new Response(
        JSON.stringify({ success: false, error: "문서를 찾을 수 없습니다." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // 3) 성공 응답
    return new Response(
      JSON.stringify({ success: true, data: comment }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (err) {
    console.error("Error fetching ResultComment:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
