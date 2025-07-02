const axios = require('axios');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const getPageSpeed = async (url, strategy) => {
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&key=${GOOGLE_API_KEY}`;
  const { data } = await axios.get(apiUrl);

  const audits = data.lighthouseResult.audits;

  const totalSizeBytes = Object.values(audits)
    .filter(a => a.details && a.details.items)
    .reduce((sum, a) => {
      return sum + a.details.items
        .filter(item => item.transferSize)
        .reduce((s, item) => s + item.transferSize, 0);
    }, 0);

  const opportunities = data.lighthouseResult.audits['uses-optimized-images']?.details?.overallSavingsMs
    ? ["Serve images in next-gen formats"]
    : [];

  return {
    score: Math.round(data.lighthouseResult.categories.performance.score * 100),
    totalSizeMB: +(totalSizeBytes / 1_000_000).toFixed(2),
    requests: data.lighthouseResult.audits['network-requests']?.details?.items.length || 0,
    opportunities
  };
};

exports.analyzePerformance = async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const [mobile, desktop] = await Promise.all([
      getPageSpeed(url, 'mobile'),
      getPageSpeed(url, 'desktop')
    ]);

    res.json({ mobile, desktop });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching performance data' });
  }
};
