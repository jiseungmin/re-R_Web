// app/api/user/[id]/route.js
import connectDB from '@/app/database/db';
import User from '@/app/database/models/User';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const user = await User.findById(id)
      // 필요에 따라 populate 도 가능
      // .populate('PostEvalSession')
      // .populate('Healthcheck')
      .lean();

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, error: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: user }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (err) {
    console.error('Error fetching user detail:', err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
