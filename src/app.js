import { githubProfile } from "./components/githubProfile.js";
import { projectCard } from "./components/projectCard.js";
import { subRepoCard } from "./components/subRepoCard.js";
import { renderSocialMedia } from "./components/socialMedia.js";
import { initBackToTop } from "./components/backToTop.js";
import { initThemeSwitch } from "./components/themeSwitch.js";

async function loadConfig() {
  try {
    const res = await fetch("./data/config.json");
    const config = await res.json();
    return config;
  } catch (err) {
    console.error("Error loading config:", err);
    alert("Cannot load config.json, please check your server or path.");
  }
}

async function loadProjects(config) {
  const container = document.getElementById("projects");
  const useLocalJson = config.useLocalJson || true;

  if (useLocalJson && useLocalJson == true) {
    try {
      const res = await fetch("./data/projects.json");
      if (!res.ok) throw new Error("Failed to load project data");
      const projects = await res.json();
      
      projects.forEach((project) => {
        if (!project.name) return;

        const card = projectCard(project);
        container.appendChild(card);
      });
    } catch (err) {
      console.error("Error loading projects:", err);
      container.innerHTML = `<p style="color:red;">Error loading projects: ${err.message}</p>`;
    }
  }
}

async function loadSubRepos() {
  const container = document.getElementById("subRepos");
  const header = document.getElementById("subReposHeader");

  const hideSection = () => {
    if (container) container.style.display = "none";
    if (header) header.style.display = "none";
  };

  try {
    const res = await fetch("./data/repositories.json");
    if (res.status === 404) {
      hideSection();
      console.warn(
        "No repositories.json found, skipping sub repositories section.",
        "If you want to silent this log, create a repositories.json file in the data folder then fill `[]`."
      );
      return
    };

    const data = await res.text();

    if (!data || data.trim().length === 0) {
      hideSection();
      return;
    }

    const reporitories = JSON.parse(data);

    if (!Array.isArray(reporitories) || reporitories.length === 0) {
      hideSection();
      return;
    }

    reporitories.forEach((repository) => {
      if (!repository.repoName) return;

      const card = subRepoCard(repository);
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading sub-repositories:", err);
    hideSection();
  }
}

function applyConfigToUI(config) {
  if (config.webTitle && typeof config.webTitle === "string") {
    document.title = config.webTitle;
  } else if (config.githubUsername && typeof config.githubUsername === "string") {
    document.title = `GitHub Portfolio - ${config.githubUsername}`;
  } else {
    document.title = "GitHub Portfolio";
  }

  document.querySelector("h1").textContent = config.title || `Hi, I'm ${config.githubUsername}`;

  document.querySelector(".subtitle").textContent = config.subtitle || "";

  document.querySelector("footer a").href = config.githubUrl || `https://github.com/${config.githubUsername}`;
}

document.addEventListener("DOMContentLoaded", async () => {
  const config = await loadConfig();

  if (!config || !config.githubUsername || config.githubUsername.trim() === "") {
    console.error("Critical Error: githubUsername is missing in config.json. Rendering aborted.");
    
    document.title = "Configuration Error";

    document.body.innerHTML = `
      <div style="display:flex; justify-content:center; align-items:center; text-align:center; flex-direction:column; color:#ff4d4d;">
        <h1>Critical Configuration Error</h1>
        <p>Field "githubUsername" is required in data/config.json</p>
      </div>
    `;
    return;
  }

  applyConfigToUI(config);
    renderSocialMedia(config.socialMedia);

  try {
    await Promise.all([
      githubProfile(config.githubUsername, config.githubUrl),
      loadProjects(config),
      loadSubRepos(),
    ]);
    
    initBackToTop();
    initThemeSwitch(config.lightThemeColor, config.darkThemeColor);

    const elementsToReveal = [
      ".header-container", 
      ".main-container", 
      ".social-media-container", 
      "footer"
    ];

    elementsToReveal.forEach(selector => {
      const el = document.querySelector(selector);
      if (el) el.classList.add("content-loaded");
    });
  } catch (err) {
    console.error("Error loading content:", err);
  }
});
