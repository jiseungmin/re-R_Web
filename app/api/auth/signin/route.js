import { User } from '../../lib/mongoose';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { phoneNumberHash, password } = req.body;
  if (!phoneNumberHash || !password) {
    return res.status(400).json({ message: 'PhoneNumber and password are required' });
  }

  try {
    await connectDB();

    // 사용자 조회
    const user = await User.findOne({ phoneNumberHash });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 비밀번호 검증
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 로그인 성공 응답
    return res.status(200).json({ message: 'Signin successful', userId: user._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
}
