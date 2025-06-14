// pages/api/signup.js
import connectDB, { User } from '../../lib/mongoose';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  // 1. POST 메서드만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // 2. 클라이언트에서 전달된 해시(payloadHash) 추출
  const { payloadHash } = req.body;
  if (!payloadHash) {
    return res.status(400).json({ message: 'Missing payloadHash' });
  }

  // 3. 해시 디코딩 및 파싱
  let data;
  try {
    const decoded = Buffer.from(payloadHash, 'base64').toString('utf8');
    data = JSON.parse(decoded);
  } catch (e) {
    console.error('Payload parse error:', e);
    return res.status(400).json({ message: 'Invalid payloadHash format' });
  }

  const { name, password, phoneNumber, gender, hospital, hasComorbidity, surgeryDate } = data;
  if (!name || !password || !phoneNumber || !gender) {
    return res.status(400).json({ message: 'Required fields missing' });
  }

  try {
    await connectDB();

    // 4. 기존 사용자 확인
    const existing = await User.findOne({ phoneNumber });
    if (existing) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // 5. 비밀번호 해싱
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // 6. 사용자 생성
    const newUser = await User.create({
      name,
      password: hash,
      phoneNumber,
      gender,
      hospital: hospital || null,
      hasComorbidity: !!hasComorbidity,
      surgeryDate: surgeryDate ? new Date(surgeryDate) : null,
    });

    return res.status(201).json({ message: 'Signup successful', userId: newUser._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
}
