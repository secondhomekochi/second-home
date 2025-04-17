
/**
 * Converts YouTube shorts URLs to embed URLs by replacing "shorts" with "embed"
 * @param {string} url - The YouTube shorts URL to convert
 * @returns {string} The YouTube embed URL
 */
export default function convertShortsToEmbed(url) {
    // Simple replacement of "shorts" with "embed"
    return url.replace("youtube.com/shorts/", "youtube.com/embed/");
  }