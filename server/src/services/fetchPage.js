// src/services/fetchPage.js
const axios = require('axios');

async function fetchPageHTML(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
    throw new Error('Failed to fetch page');
  }
}

module.exports = { fetchPageHTML };
