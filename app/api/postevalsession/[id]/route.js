// import connectDB from '@/app/database/db';
// import PostEvalSession from '@/app/database/models/PostEvalSession';

// export async function PATCH(req, { params }) {
//   try {
//     // 1) DB 연결
//     await connectDB();

//     // 2) URL 파라미터에서 PostEvalSession _id
//     const { id } = params;

//     // 3) 요청 바디 파싱
//     // body 는 heatTest, swellTest, abnormalSigns 객체를 가져야 합니다.
//     const { heatTest, swellTest, abnormalSigns } = await req.json();

//     // 4) 검증
//     if (!heatTest || !swellTest || !abnormalSigns) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           message: 'heatTest, swellTest, abnormalSigns 모두 필요합니다.'
//         }),
//         { status: 400, headers: { 'Content-Type': 'application/json' } }
//       );
//     }

//     // 5) PostEvalSession 조회
//     const session = await PostEvalSession.findById(id);
//     if (!session) {
//       return new Response(
//         JSON.stringify({ success: false, message: '세션을 찾을 수 없습니다.' }),
//         { status: 404, headers: { 'Content-Type': 'application/json' } }
//       );
//     }

//     // 6) survey 배열의 마지막 항목(가장 최근 라운드)에 테스트 결과 추가/업데이트
//     //    스키마 상 survey는 round, paintest 등이 이미 저장되어 있다고 가정
//     const lastIdx = session.survey.length - 1;
//     if (lastIdx < 0) {
//       return new Response(
//         JSON.stringify({ success: false, message: '업데이트할 survey 항목이 없습니다.' }),
//         { status: 400, headers: { 'Content-Type': 'application/json' } }
//       );
//     }

//     session.survey[lastIdx].heatTest      = heatTest;
//     session.survey[lastIdx].swellTest     = swellTest;
//     session.survey[lastIdx].abnormalSigns = abnormalSigns;

//     await session.save();

//     // 7) 성공 응답
//     return new Response(
//       JSON.stringify({ success: true }),
//       { status: 200, headers: { 'Content-Type': 'application/json' } }
//     );

//   } catch (err) {
//     console.error('PATCH /api/postevalsession/[id] 에러:', err);
//     return new Response(
//       JSON.stringify({
//         success: false,
//         message: err.message || '서버 오류가 발생했습니다.'
//       }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }
