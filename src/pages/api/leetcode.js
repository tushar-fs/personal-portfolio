import axios from "axios";
import cheerio from "cheerio";

/**
 * API route to fetch LeetCode stats for a user
 *
 * @param {object} req - Next.js request object
 * @param {object} res - Next.js response object
 */
export default async function handler(req, res) {
  try {
    const username = req.query.username || "tushar-singh"; // Default username or from query param

    // Fetch public LeetCode profile data
    // Note: LeetCode doesn't have an official public API, so we're using GraphQL
    const leetcodeData = await fetchLeetcodeStats(username);

    // Cache the response for 1 hour (3600 seconds)
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.status(200).json(leetcodeData);
  } catch (error) {
    console.error("Error fetching LeetCode data:", error);
    res.status(500).json({
      error: "Failed to fetch LeetCode data",
      message: error.message,
    });
  }
}

/**
 * Fetch LeetCode stats using their GraphQL API
 *
 * @param {string} username - LeetCode username
 * @returns {object} User stats from LeetCode
 */
async function fetchLeetcodeStats(username) {
  try {
    // GraphQL query to fetch user profile data
    const query = `
      query userPublicProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
          profile {
            ranking
            reputation
            starRating
            userAvatar
          }
        }
      }
    `;

    const response = await axios.post(
      "https://leetcode.com/graphql",
      {
        query,
        variables: { username },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const userData = response.data.data.matchedUser;

    if (!userData) {
      throw new Error("User not found");
    }

    // Extract problem counts by difficulty
    const problemStats = userData.submitStats.acSubmissionNum.reduce(
      (acc, item) => {
        acc[item.difficulty.toLowerCase()] = item.count;
        return acc;
      },
      {}
    );

    // Calculate total problems solved
    const totalSolved =
      problemStats.easy + problemStats.medium + problemStats.hard || 0;

    // Try to get streak data (this is more difficult as it's not directly in the GraphQL API)
    // We might need to scrape this from the HTML
    const streakData = await scrapeStreakData(username);

    return {
      username: userData.username,
      ranking: userData.profile.ranking,
      totalSolved,
      problemStats,
      reputation: userData.profile.reputation,
      avatar: userData.profile.userAvatar,
      streak: streakData.streak || 0,
      badges: streakData.badges || [],
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error in fetchLeetcodeStats:", error);

    // Return fallback data if we can't fetch the real data
    return {
      username: username,
      ranking: "Top 10%",
      totalSolved: 250,
      problemStats: {
        easy: 100,
        medium: 120,
        hard: 30,
      },
      streak: 45,
      badges: ["Dynamic Programming", "Graph Theory", "Database"],
      lastUpdated: new Date().toISOString(),
      error: error.message,
      isFallback: true,
    };
  }
}

/**
 * Scrape streak data from LeetCode profile page
 * Note: This is more fragile than the GraphQL API and may break if LeetCode changes their HTML
 *
 * @param {string} username - LeetCode username
 * @returns {object} Streak data and badges
 */
async function scrapeStreakData(username) {
  try {
    const response = await axios.get(`https://leetcode.com/${username}/`);
    const $ = cheerio.load(response.data);

    // This is a simplified example - actual selectors would need to be updated
    // based on LeetCode's current HTML structure
    const streakText = $(".streak-count").text();
    const streak = parseInt(streakText, 10) || 0;

    // Try to find badges
    const badges = [];
    $(".badge-item").each((i, el) => {
      badges.push($(el).text().trim());
    });

    return { streak, badges };
  } catch (error) {
    console.error("Error scraping streak data:", error);
    return { streak: 0, badges: [] };
  }
}

