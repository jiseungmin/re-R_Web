// app/api/weekprogram/route.js
import connectDB from '@/app/database/db';
import Weekprogram from '@/app/database/models/Weekprogram';
import PostEvalSession from '@/app/database/models/PostEvalSession';

export async function POST(req) {
  try {
    // 1) DB 연결
    await connectDB();

    // 2) 요청 바디 파싱
    const body = await req.json();
    const {
      user,             // 사용자 ObjectId (String)
      weekprogramId,    // 업데이트할 Weekprogram 문서의 _id
      exercises,        // 완료된 운동(ObjectId) 배열 → Exercise 필드로
      skipExercises,    // 건너뛴 운동(ObjectId) 배열 → skip_Exercise 필드로
      survey            // SurveyEntry[] 배열
    } = body;

    // 3) 필수 필드 검증
    if (
      !user ||
      !weekprogramId ||
      !Array.isArray(exercises) ||
      !Array.isArray(skipExercises) ||
      !Array.isArray(survey)
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          message: '필수 입력값(user, weekprogramId, exercises, skipExercises, survey)이 누락되었거나 형식이 올바르지 않습니다.'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 4) Weekprogram 문서 조회 및 Exercise, skip_Exercise 필드 업데이트
    const weekprogram = await Weekprogram.findById(weekprogramId);
    if (!weekprogram) {
      return new Response(
        JSON.stringify({ success: false, message: '해당 weekprogram을 찾을 수 없습니다.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    weekprogram.Exercise       = exercises;
    weekprogram.skip_Exercise  = skipExercises;
    await weekprogram.save();

    // 5) PostEvalSession 문서 생성 및 저장
    const postEval = new PostEvalSession({
      User:        user,
      Weekprogram: weekprogram._id,
      survey       // SurveyEntry[] 배열 (스키마에 따라 자동 검증)
    });
    await postEval.save();

    // 6) 성공 응답
    return new Response(
      JSON.stringify({
        success: true,
        weekprogramId:     weekprogram._id,
        postEvalSessionId: postEval._id
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('POST /api/weekprogram 에러:', err);
    // 7) 에러 응답
    return new Response(
      JSON.stringify({ success: false, message: err.message || '서버 오류가 발생했습니다.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
