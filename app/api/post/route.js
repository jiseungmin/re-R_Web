// app/api/post/route.js
import connectDB from "@/app/database/db";
import Post from "@/app/database/models/Post";
import User from "@/app/database/models/User";  // ← User 모델을 꼭 import

/* [GET] 게시글 전체 조회 API - 모든 게시글을 최신순으로 조회하고 작성자 정보를 populate */
export async function GET(req) {
  try {
    // 1. DB 연결
    await connectDB();

    // 2. 게시글 전체 조회 + 작성자(author) 필드 populate (name, email만 포함)
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "name email")  // User 스키마에 맞게 필드 선택
      .lean();

    // 3. 성공 응답 반환
    return new Response( JSON.stringify({ success: true, data: posts }), { status: 200, headers: { "Content-Type": "application/json" }});
  } catch (err) {
    // 4. 예외 처리: 서버 오류
    console.error("Error fetching posts:", err);
    return new Response( JSON.stringify({ success: false, error: err.message }), { status: 500, headers: { "Content-Type": "application/json"}});
  }
}

/* [POST] 게시글 답변 등록 API - 게시글 id와 answer를 받아 해당 게시글에 답변과 상태 업데이트 */
export async function POST(req) {
  try {
    // 1. DB 연결
    await connectDB();

    // 2. 요청 본문 파싱 및 필수값 검증
    const { id, answer } = await req.json();
    if (!id || typeof answer !== "string") {return new Response( JSON.stringify({ success: false, error: "id와 answer를 모두 보내주세요." }), { status: 400, headers: { "Content-Type": "application/json" }})}

    // 3. 게시글 업데이트 (답변 추가 및 STATUS 완료 처리)
    const updated = await Post.findByIdAndUpdate(
      id,
      { answer, status: true },
      { new: true, runValidators: true }
    ).populate("author", "name email").lean();

    // 4. 게시글 존재 여부 확인
    if (!updated) { return new Response( JSON.stringify({ success: false, error: "해당 id를 찾을 수 없습니다." }), { status: 404, headers: { "Content-Type": "application/json" }})}

    // 5. 성공 응답 반환
    return new Response( JSON.stringify({ success: true, data: updated }), { status: 200, headers: { "Content-Type": "application/json" }});
  } catch (err) {
    // 6. 예외 처리: 서버 오류
    console.error("Error updating post:", err);
    return new Response( JSON.stringify({ success: false, error: err.message }), { status: 500, headers: { "Content-Type": "application/json" }});
  }
}
