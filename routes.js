const express = require('express');
const { db } = require('./services/firebase');
const fetchAndStoreNews = require('./services/fetch_news');

const router = express.Router();

/**
 * @route GET /api/news/fetch
 * @description Fetch the latest news and store unique articles in Firebase
 */
router.get('/api/news/fetch', async (req, res) => {
  try {
    await fetchAndStoreNews();
    res.json({ message: 'News fetched and stored successfully.' });
  } catch (error) {
    console.error('Error fetching and storing news:', error.message);
    res.status(500).json({ error: 'Failed to fetch and store news.' });
  }
});

/**
 * @route GET /api/news
 * @description Fetch the latest news from Firebase Firestore
 */
router.get('/api/news', async (req, res) => {
  try {
    const newsSnapshot = await db.collection('news').orderBy('publishedAt', 'desc').get();

    if (newsSnapshot.empty) {
      return res.status(404).json({ message: 'No news articles found.' });
    }

    const news = [];
    newsSnapshot.forEach((doc) => {
      news.push({ id: doc.id, ...doc.data() });
    });

    res.json(news);
  } catch (error) {
    console.error('Error fetching news from Firebase:', error.message);
    res.status(500).json({ error: 'Failed to fetch news from Firebase.' });
  }
});

module.exports = router;
