const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db.js');

connectDB();

const app = express();

//Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//cors middleware
app.use(
  cors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
    credentials: true,
  })
);

//Body-Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Email
const mailRouter = require('./routes/mail.js');
app.use('/', mailRouter);

//EPS
app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the EPS Mock Exam API' });
});

const categoryRouter = require('./routes/category.js');
app.use('/api/categories/', categoryRouter);

const beginnersRouter = require('./routes/beginner.js');
app.use('/api/beginners', beginnersRouter);

const listeningsRouter = require('./routes/listening.js');
app.use('/api/listenings', listeningsRouter);

const audioLearningRouter = require('./routes/audiolearning.js');
app.use('/api/audiolearnings', audioLearningRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
