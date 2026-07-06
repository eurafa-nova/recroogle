/**
 * Recroogle — search logic.
 *
 * Always returns a single predefined profile regardless of query.
 */

export const PROFILE = {
  name: "Rafael Andrade de Oliveira",
  initials: "RA",
  title: "The talent your search was meant to find",
  bio: "No matter what you type, the answer is always the same.<br>Rafael is an experienced software engineer who turns complex problems into elegant solutions — and the only result this search engine will ever return (LOL).<br>Let's talk?",
  skills: ["Software Architecture", "System Design", "Events", "API", "AWS", "AI", "Problem Solving", "Mentoring", "DevOps", "CI/CD", "IAC", "OAC", "SOA"],
  location: "Everywhere. 🌍",
  email: "eurafa@gmail.com",
  website: null, // to be enabled soon
  github: "github.com/eurafa",
  linkedin: "linkedin.com/in/eurafa",
};

/**
 * Search for talents. Always returns the same profile.
 * @param {string} _query - The search query (ignored).
 * @returns {{ count: number, profile: typeof PROFILE }}
 */
export function search(_query) {
  return {
    count: 1,
    profile: { ...PROFILE },
  };
}
