// app/api/encouragement/route.js
import connectDB from "@/app/database/db";
import Encouragement from "@/app/database/models/Encouragement";

export async function POST(req) {
  try {
    // 1) DB 연결
    await connectDB();

    // 2) 요청 본문 파싱
    const { deviceUsage, noDevice } = await req.json();

    // 3) 단일 문서 upsert (하나만 관리)
    const doc = await Encouragement.findOneAndUpdate(
      {},                  // 빈 객체 → 첫 문서 타깃
      { deviceUsage, noDevice },
      {
        upsert: true,      // 문서 없으면 생성
        new: true,         // 생성/업데이트된 문서 반환
        runValidators: true// 스키마 유효성 검사
      }
    );

    // 4) 성공 응답
    return new Response(
      JSON.stringify({ success: true, data: doc }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (err) {
    console.error("Error upserting Encouragement:", err);
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

    // 2) 단일 문서 조회
    const doc = await Encouragement.findOne({});

    if (!doc) {
      return new Response(
        JSON.stringify({ success: false, error: "문서를 찾을 수 없습니다." }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // 3) 성공 응답
    return new Response(
      JSON.stringify({ success: true, data: doc }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (err) {
    console.error("Error fetching Encouragement:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
