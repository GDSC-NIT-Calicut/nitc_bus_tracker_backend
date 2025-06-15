const Notice = require('../models/Notice');

exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.findAll();
    res.json(notices);
  } catch (err) {
    console.error('Error fetching notices', err);
    res.status(500).json({ error: 'Failed to fetch notices' });
  }
};

exports.postNotice = async (req, res) => {
  const { name, topic, to_whom, message } = req.body;
  try {
    await Notice.create({name, topic, to_whom, message});
    res.status(201).json({ success: true, message: 'Added Notice successfully'});

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
