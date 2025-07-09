const Notice = require('../models/Notice');
const { Op } = require('sequelize');

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
  const { name, topic, to_whom, message, validTill } = req.body;
  try {
    await Notice.create({name, topic, to_whom, message, validTill});
    res.status(201).json({ success: true, message: 'Added Notice successfully'});

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteNotice = async (req, res) => {
  const { topic } = req.params;

  if (!topic) {
    return res.status(400).json({ success: false, message: 'Topic is required' });
  }

  try {
    const result = await Notice.destroy({
      where: { topic }
    });

    if (result === 0) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }

    res.status(200).json({ success: true, message: 'Deleted Notice successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

