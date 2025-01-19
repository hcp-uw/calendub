const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./models/Event.js');
const { connectToDatabase } = require('./db/db.js');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`App listening at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
);

app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/events', async (req, res) => {
  const { title, startTime, endTime } = req.body;
  try {
    const newEvent = new Event({ title, startTime, endTime });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});





// CURRENTLY NOT IN USE - WAS USED FOR TESTING PURPOSES

// let database;
// (async () => {
//   try {
//     console.log('Connecting to the database...');
//     database = await connectToDatabase();
//     // let collection = await database.collection('movies');
//     // console.log('Database connected and collection initialized.');
//     // const movies = await collection.find({"title": "Dune"}).toArray();
//     // console.log(movies[0]);
//     // console.log('Movies fetched from the database.');
//   } catch (error) {
//     console.error('Error connecting to the database:', error);
//     process.exit(1);
//   }
// })();
  
// const events = [];

// app.get('/api/events', (req, res) => {
//   res.status(201).json(events);
// });

// app.post('/api/events', (req, res) => {
//   const newEvent = req.body; 
//   events.push(newEvent);
//   res.status(201).json(newEvent); 
// });
