import axios from "axios";
import cheerio from "cheerio";

/**
 * API route to fetch Devpost hackathon projects for a user
 *
 * @param {object} req - Next.js request object
 * @param {object} res - Next.js response object
 */
export default async function handler(req, res) {
  try {
    const username = req.query.username || "tushar-singh"; // Default username or from query param

    // Fetch Devpost profile data
    const devpostData = await fetchDevpostProjects(username);

    // Cache the response for 1 hour (3600 seconds)
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.status(200).json(devpostData);
  } catch (error) {
    console.error("Error fetching Devpost data:", error);
    res.status(500).json({
      error: "Failed to fetch Devpost data",
      message: error.message,
    });
  }
}

/**
 * Fetch Devpost projects by scraping the user's portfolio page
 *
 * @param {string} username - Devpost username
 * @returns {object} User's hackathon projects from Devpost
 */
async function fetchDevpostProjects(username) {
  try {
    const url = `https://devpost.com/${username}/projects`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const projects = [];

    // Select project containers - this selector may need updating based on Devpost's HTML structure
    $(".gallery-item").each((i, el) => {
      const $el = $(el);

      // Extract project details
      const name = $el.find(".title").text().trim();
      const link = $el.find(".link-to-software").attr("href");
      const description = $el.find(".description").text().trim();
      const date = $el.find(".date").text().trim();

      // Extract technologies
      const technologies = [];
      $el.find(".built-with .cp-tag").each((i, tag) => {
        technologies.push($(tag).text().trim());
      });

      // Extract achievements/awards
      const achievements = [];
      $el.find(".winner .small-title").each((i, award) => {
        achievements.push($(award).text().trim());
      });

      // Only add projects with valid names
      if (name) {
        projects.push({
          name,
          link,
          description,
          date,
          technologies,
          achievement: achievements.length > 0 ? achievements[0] : null,
          platform: "Devpost",
        });
      }
    });

    return {
      username,
      projects,
      totalProjects: projects.length,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error in fetchDevpostProjects:", error);

    // Return fallback data if we can't fetch the real data
    return {
      username,
      projects: [
        {
          name: "Sample Hackathon 2025",
          link: "https://devpost.com/software/ecotrack",
          description:
            "Built a sustainability tracking application that helps users monitor their carbon footprint",
          date: "March 2025",
          technologies: ["React", "Node.js", "MongoDB"],
          achievement: "Top 10 Finalist",
          platform: "Devpost",
        },
      ],
      totalProjects: 1,
      lastUpdated: new Date().toISOString(),
      error: error.message,
      isFallback: true,
    };
  }
}

