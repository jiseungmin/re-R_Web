import connectDB from "@/app/database/db";
import Encouragement from "@/app/database/models/Encouragement";

/* [POST] 격려 문구 upsert API - 하나의 Encouragement 문서에 deviceUsage·noDevice 문구 생성/업데이트 */
export async function POST(req) {
  try {
    // 1. DB 연결
    await connectDB();

    // 2. 요청 본문 파싱
    const { deviceUsage, noDevice } = await req.json();

    // 3. 단일 문서 upsert
    //    - {}: 컬렉션 내 첫 문서 타깃
    //    - upsert: 문서 없으면 생성
    //    - new: 생성/업데이트된 문서 반환
    //    - runValidators: 스키마 유효성 검사 수행
    const doc = await Encouragement.findOneAndUpdate(
      {},
      { deviceUsage, noDevice },
      { upsert: true, new: true, runValidators: true }
    )

    // 4. 성공 응답
    return new Response( JSON.stringify({ success: true, data: doc }), { status: 200, headers: { "Content-Type": "application/json" }});
  } catch (err) {
    // 5. 예외 처리: 서버 오류
    console.error("Error upserting Encouragement:", err);
    return new Response( JSON.stringify({ success: false, error: err.message }), { status: 500, headers: { "Content-Type": "application/json"}});
  }
}


/* [GET] 격려 문구 조회 API - 단일 Encouragement 문서 반환 */
export async function GET() {
  try {
    // 1. DB 연결
    await connectDB();

    // 2. 단일 문서 조회
    const doc = await Encouragement.findOne({});
    if (!doc) { return new Response( JSON.stringify({ success: false, error: "문서를 찾을 수 없습니다." }), { status: 404, headers: { "Content-Type": "application/json"}})}

    // 3. 성공 응답
    return new Response( JSON.stringify({ success: true, data: doc }), { status: 200, headers: { "Content-Type": "application/json"}});
  } catch (err) {
    
    // 4. 성공 응답 반환
    console.error("Error fetching Encouragement:", err);
    return new Response( JSON.stringify({ success: false, error: err.message }), { status: 500, headers: { "Content-Type": "application/json"}});
  }
}
