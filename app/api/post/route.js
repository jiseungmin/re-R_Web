// app/api/post/route.js
import connectDB from "@/app/database/db";
import Post from "@/app/database/models/Post";
import User from "@/app/database/models/User";  // ← User 모델을 꼭 import

// GET /api/post
// 모든 게시글을 가져오고 author(User)를 populate
export async function GET(req) {
  try {
    await connectDB();
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "name email")  // User 스키마에 맞게 필드 선택
      .lean();
    return new Response(
      JSON.stringify({ success: true, data: posts }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error fetching posts:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// POST /api/post
// { id, answer } 받아서 해당 글의 answer와 status를 업데이트
export async function POST(req) {
  try {
    await connectDB();
    const { id, answer } = await req.json();
    if (!id || typeof answer !== "string") {
      return new Response(
        JSON.stringify({ success: false, error: "id와 answer를 모두 보내주세요." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const updated = await Post.findByIdAndUpdate(
      id,
      { answer, status: true },
      { new: true, runValidators: true }
    ).populate("author", "name email").lean();

    if (!updated) {
      return new Response(
        JSON.stringify({ success: false, error: "해당 id를 찾을 수 없습니다." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: updated }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error updating post:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
