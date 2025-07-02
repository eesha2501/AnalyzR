// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const analyzeRoute = require('./src/routes/analyzeRoute');
const performanceRoute = require('./src/routes/performanceRoute');
const recommendationRoute = require('./src/routes/recommendationRoute');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('AnalyzR backend is running');
});

// Existing analyze route
app.use('/api/analyze', analyzeRoute);

// New performance route
app.use('/api/performance', performanceRoute);

// New AI-based recommendations route
app.use('/api/recommendations', recommendationRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
