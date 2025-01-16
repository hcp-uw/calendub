const express = require('express');
const app = express();

const port = 5100;

app.use(cors());
app.use(express.json());


const events = [];

app.get('/events', (req, res) => {
  res.status(201).json(events);
});

app.post('/events', (req, res) => {
  const newEvent = req.body; 
  events.push(newEvent);
  console.log(newEvent);
  res.status(201).json(newEvent); 
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});