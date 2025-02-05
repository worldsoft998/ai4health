
import connectDB from '../../utils/db';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';

export default async (req, res) => {
  await connectDB();

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    console.log(`Hi ${username}`);
    res.setHeader('Set-Cookie', serialize('username', username, { path: '/' }));
    res.status(200).json({ success: true, message: 'Login successful', username });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};