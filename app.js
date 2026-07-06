/**
 * Recroogle — frontend entry point.
 *
 * Handles DOM interactions. Search logic lives in ./search.js.
 */

import { search, PROFILE } from "./search.js";

// ─── DOM rendering ───

function createProfileHTML(profile) {
  const skillsHTML = profile.skills
    .map((skill) => `<span class="skill-tag">${skill}</span>`)
    .join("");

  return `
    <div class="profile-header">
      <div class="profile-avatar">${profile.initials}</div>
      <div class="profile-name-area">
        <div class="profile-name">${profile.name}</div>
        <div class="profile-title">${profile.title}</div>
        <div class="profile-title" style="margin-top: 4px; font-size: 0.85rem;">📍 ${profile.location}</div>
      </div>
    </div>
    <div class="profile-section">
      <div class="profile-section-label">About</div>
      <div class="profile-bio">${profile.bio}</div>
    </div>
    <div class="profile-section">
      <div class="profile-section-label">Skills</div>
      <div class="profile-skills">${skillsHTML}</div>
    </div>
    <div class="profile-section">
      <div class="profile-section-label">Contact</div>
      <div class="profile-contact">
        <a href="mailto:${profile.email}">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          ${profile.email}
        </a>
        <a href="https://${profile.github}" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          ${profile.github}
        </a>
        <a href="https://${profile.linkedin}" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          ${profile.linkedin}
        </a>
        ${profile.website ? `<a href="${profile.website}" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          ${profile.website}
        </a>` : ""}
      </div>
    </div>
  `;
}

// ─── Bootstrap ───

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");
  const clearBtn = document.getElementById("clear-btn");
  const resultsEl = document.getElementById("results");
  const resultCount = document.getElementById("result-count");
  const profileCard = document.getElementById("profile-card");
  function clearResults() {
    resultsEl.classList.add("hidden");
    document.body.classList.remove("has-results");
  }

  function performSearch(query) {
    const result = search(query);
    resultCount.textContent = `About ${result.count} result (0.00 seconds)`;
    profileCard.innerHTML = createProfileHTML(result.profile);
    resultsEl.classList.remove("hidden");
    document.body.classList.add("has-results");

    setTimeout(() => {
      resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value.trim() || "(nothing)";
    performSearch(query);
  });

  input.addEventListener("input", () => {
    clearBtn.classList.toggle("hidden", input.value.length === 0);
    clearResults();
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    clearBtn.classList.add("hidden");
    clearResults();
    input.focus();
  });

  input.focus();
});
