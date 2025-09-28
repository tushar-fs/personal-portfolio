import axios from "axios";
import cheerio from "cheerio";

/**
 * API route to fetch GeeksforGeeks articles for a user
 *
 * @param {object} req - Next.js request object
 * @param {object} res - Next.js response object
 */
export default async function handler(req, res) {
  try {
    const username = req.query.username || "tushar-singh"; // Default username or from query param

    // Fetch GeeksforGeeks articles
    const gfgData = await fetchGeeksforGeeksArticles(username);

    // Cache the response for 1 hour (3600 seconds)
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.status(200).json(gfgData);
  } catch (error) {
    console.error("Error fetching GeeksforGeeks data:", error);
    res.status(500).json({
      error: "Failed to fetch GeeksforGeeks data",
      message: error.message,
    });
  }
}

/**
 * Fetch GeeksforGeeks articles by scraping the user's profile page
 *
 * @param {string} username - GeeksforGeeks username
 * @returns {object} User's articles from GeeksforGeeks
 */
async function fetchGeeksforGeeksArticles(username) {
  try {
    const url = `https://auth.geeksforgeeks.org/user/${username}/articles`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const articles = [];

    // Select article containers - this selector may need updating based on GFG's HTML structure
    $(".article-card").each((i, el) => {
      const $el = $(el);

      // Extract article details
      const title = $el.find(".article-title").text().trim();
      const link = $el.find(".article-title a").attr("href");
      const description = $el.find(".article-description").text().trim();
      const date = $el.find(".article-date").text().trim();

      // Only add articles with valid titles
      if (title) {
        articles.push({
          title,
          link: link.startsWith("http")
            ? link
            : `https://www.geeksforgeeks.org${link}`,
          description,
          date,
          platform: "GeeksforGeeks",
        });
      }
    });

    return {
      username,
      articles,
      totalArticles: articles.length,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error in fetchGeeksforGeeksArticles:", error);

    // Return fallback data if we can't fetch the real data
    return {
      username,
      articles: [
        {
          title: "Understanding Time Complexity in Sorting Algorithms",
          link: "https://www.geeksforgeeks.org/sorting-algorithms-time-complexity",
          description:
            "A comprehensive guide to analyzing and comparing time complexities of common sorting algorithms",
          date: "January 2025",
          platform: "GeeksforGeeks",
        },
        {
          title: "Implementing Efficient Graph Traversal Algorithms",
          link: "https://www.geeksforgeeks.org/graph-traversal-algorithms",
          description:
            "Step-by-step guide to implementing BFS and DFS with practical applications",
          date: "November 2024",
          platform: "GeeksforGeeks",
        },
      ],
      totalArticles: 2,
      lastUpdated: new Date().toISOString(),
      error: error.message,
      isFallback: true,
    };
  }
}

