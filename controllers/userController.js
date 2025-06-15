const User = require('../models/User');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt for email:', email);
  const [o, domain] = email.split('@');

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(403).json({ error: 'Access denied: User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    if (domain === 'nitc.ac.in') {
      // Only allow if role is student
      if (user.role === 'student') {
        return res.json({ success: true, role: 'student', message: 'Student login successful' });
      } else {
        return res.status(403).json({ error: 'Access denied: Not a student' });
      }
    } else {
      // For other domains, allow if role is driver or admin
      if (user.role === 'driver' || user.role === 'admin') {
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
      // User already exists
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

    // Create partial user entry
    await User.create({name, username, password, role, hostel, email, phone});
    res.status(201).json({ success: true, message: 'Registered successfully', needsMoreInfo: false });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.user_exists = async (req, res) => {
  const email = req.query.email; // ← use query, not body
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    console.error('Error checking user existence:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

exports.complete_registration = async (req, res) => {
  const { name, username, password, role, hostel, email, phone} = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update only if fields are currently null
    user.name = user.name || name;
    user.username = user.username || username;
    user.phone = user.phone || phone;
    user.role = user.role || role;
    user.password = user.password || password;
    user.hostel = user.hostel || hostel;
 // Optional depending on Google login strategy

    await user.save();

    res.status(200).json({ success: true, message: 'Registration completed' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.get_user_info = async (req, res) => {
  const email = req.query.email; // ← use query, not body
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      res.status(200).json({ name: user.name, email: user.email, phone: user.phone, hostel: user.hostel });
    } else {
      res.json({ error: "User not found!"});
    }
  } catch (err) {
    console.error('Error checking user existence:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};
