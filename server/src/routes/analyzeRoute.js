// src/routes/analyzeRoute.js
const express = require('express');
const router = express.Router();
const { analyzeSEO } = require('../services/seoAnalyzer');

router.post('/', async (req, res) => {
  const { url } = req.body;

  // Validate input
  if (!url || typeof url !== 'string' || !/^https?:\/\//.test(url)) {
    return res.status(400).json({ error: 'Invalid or missing "url" in request body.' });
  }

  try {
    const result = await analyzeSEO(url);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      error: 'Failed to analyze the website.', 
      details: error.message 
    });
  }
});

module.exports = router;
