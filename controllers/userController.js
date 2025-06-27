const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt for email:', email);
  const [_, domain] = email.split('@');

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(403).json({ error: 'Access denied: User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    if (domain === 'nitc.ac.in') {
      if (user.role === 'student') {
        return res.json({ success: true, role: 'student', message: 'Student login successful' });
      } else {
        return res.status(403).json({ error: 'Access denied: Not a student' });
      }
    } else {
      if (user.role === 'driver' || user.role === 'admin' || user.role == 'default') {
        return res.json({ success: true, role: user.role, message: `${user.role} login successful` });
      } else {
        return res.status(403).json({ error: 'Access denied: Not driver/admin' });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.partial_registration = async (req, res) => {
  const { name, username, password, role, hostel, email, phone } = req.body;

  try {
    let user = await User.findOne({ where: { email } });

    if (user) {
      if (!user.username || !user.phone || !user.role) {
        return res.status(200).json({
          success: true,
          message: 'Partial registration. Additional info needed.',
          needsMoreInfo: true
        });
      }

      return res.status(200).json({
        success: true,
        message: 'User already registered completely.',
        needsMoreInfo: false
      });
    }

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await User.create({
      name,
      username,
      password: hashedPassword,
      role,
      hostel,
      email,
      phone
    });

    res.status(201).json({ success: true, message: 'Registered successfully', needsMoreInfo: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.complete_registration = async (req, res) => {
  const { name, username, password, role, hostel, email, phone } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.name = user.name || name;
    user.username = user.username || username;
    user.phone = user.phone || phone;
    user.role = user.role || role;
    user.hostel = user.hostel || hostel;

    if (!user.password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.status(200).json({ success: true, message: 'Registration completed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.user_exists = async (req, res) => {
  const email = req.query.email;
  try {
    const user = await User.findOne({ where: { email } });
    res.json({ exists: !!user });
  } catch (err) {
    console.error('Error checking user existence:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

exports.get_user_info = async (req, res) => {
  const email = req.query.email;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      res.status(200).json({
        name: user.name,
        email: user.email,
        phone: user.phone,
        hostel: user.hostel
      });
    } else {
      res.json({ error: "User not found!" });
    }
  } catch (err) {
    console.error('Error fetching user info:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

