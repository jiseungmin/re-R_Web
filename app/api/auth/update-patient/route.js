// import connectDB from '@/app/database/db';
// import User from '@/app/database/models/User';

// /* [POST] 유저 정보 업데이트 API - user_id를 기준으로 유저의 진료 전 정보 업데이트 */
// export async function POST(req) {
//   // 1. 요청 바디 파싱 및 입력값 추출 및 필수값 검사
//   const { user_id, has_base_disease, had_knee_surgery, pre_surgery_rom, surgery_date} = await req.json()
//   if (!user_id) { return new Response(JSON.stringify({ success: false, message: "user_id는 필수입니다." }), { status: 400 })}

//   try {
//     // 2. DB 연결 
//     await connectDB();

//     // 3. 사용자 문서 업데이트(new: true로 업데이트된 문서 반환)
//     const updated = await User.findByIdAndUpdate(user_id, {
//       has_base_disease,
//       had_knee_surgery,
//       pre_surgery_rom,
//       surgery_date,
//     }, { new: true });

//     // 5. 업데이트 대상이 없으면 404 반환
//     if (!updated) {return new Response(JSON.stringify({ success: false, message: "해당 유저가 존재하지 않습니다." }), { status: 404 });}
    
//     // 6. 성공 응답 반환
//     return new Response(JSON.stringify({ success: true }), { status: 200 });
//   } catch (err) {
//     // 7. 예외 처리: 서버 오류
//     console.error('업데이트 에러:', err);
//     return new Response(JSON.stringify({ success: false, message: "서버 오류" }), { status: 500 });
//   }
// }
