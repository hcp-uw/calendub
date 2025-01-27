const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const { id, name, type, date, time, location, description } = req.body;
  try {
    const newEvent = new Event({ id, name, type, time, date, location, description });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
