// app/api/users/route.js
import connectDB from '@/app/database/db';
import User from '@/app/database/models/User';

export async function GET() {
  try {
    await connectDB();

    // name, ID, phone, registered_at, Doctor, had_knee_surgery 정도만 내려줍니다
    const users = await User.find(
      {},
      {
        name: 1,
        ID: 1,
        phone: 1,
        registered_at: 1,
        Doctor: 1,
        gender: 1,
        birth: 1
      }
    )
      .sort({ name: 1 })  // 예: 이름 오름차순
      .lean();

    return new Response(
      JSON.stringify({ success: true, data: users }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (err) {
    console.error('Error fetching users:', err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
