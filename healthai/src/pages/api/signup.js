
import connectDB from '../../utils/db';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await connectDB();

  const { username, password, sex, age } = req.body;

  
  try {
    let user = await User.findOne({ username });
    if (user) {
      console.log('User already exists');
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    user = new User({
      username,
      password: await bcrypt.hash(password, 10),
      sex,
      age,
    });

    await user.save();
    console.log('User registered successfully');
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}