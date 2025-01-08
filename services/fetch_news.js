const axios = require('axios');
const crypto = require('crypto');
const { db } = require('./firebase');
require('dotenv').config();

const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const API_KEY = process.env.NEWS_API_KEY;
console.log('NEWS_API_KEY:', API_KEY); // Debug: Check if API key is loaded

const fetchAndStoreNews = async () => {
  try {
    if (!API_KEY) {
      throw new Error('Missing API Key. Check your .env file.');
    }

    console.log('Using API Key:', API_KEY);

    const response = await axios.get(NEWS_API_URL, {
      params: { country: 'us', apiKey: API_KEY },
    });

    const articles = response.data.articles;

    for (const article of articles) {
      const articleId = crypto.createHash('sha256').update(article.url).digest('hex');

      const docRef = db.collection('news').doc(articleId);
      const doc = await docRef.get();

      if (!doc.exists) {
        await docRef.set({
          source: article.source,
          author: article.author || 'Unknown',
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.urlToImage,
          publishedAt: new Date(article.publishedAt),
        });

        console.log(`Stored new article: ${article.title}`);
      } else {
        console.log(`Duplicate article skipped: ${article.title}`);
      }
    }
  } catch (error) {
    console.error('Error fetching or storing news:', error.message);
    if (error.response) {
      console.error('Response Data:', error.response.data);
      console.error('Response Status:', error.response.status);
    }
  }
};

module.exports = fetchAndStoreNews;
