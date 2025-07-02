exports.getRecommendations = async (req, res) => {
  try {
    const { analysisData } = req.body;

    if (!analysisData) {
      return res.status(400).json({ error: 'Missing analysis data' });
    }

    // MOCK RESPONSE for FREE development
    const recommendations = [
      {
        area: "SEO",
        message: "Add a meta description and improve title for better search visibility.",
        tools: ["Yoast SEO", "Ahrefs"]
      },
      {
        area: "Performance",
        message: "Compress images, minify CSS/JS, and enable caching.",
        tools: ["PageSpeed Insights", "TinyPNG"]
      },
      {
        area: "Accessibility",
        message: "Add alt text to images and improve color contrast.",
        tools: ["axe DevTools", "Wave"]
      },
      {
        area: "Mobile Friendliness",
        message: "Ensure responsive design with proper viewport settings.",
        tools: ["Google Mobile-Friendly Test"]
      }
    ];

    res.json({ recommendations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
