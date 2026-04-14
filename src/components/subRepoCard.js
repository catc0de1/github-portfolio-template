export function subRepoCard(item) {
  const repoName = item.repoName;
  const repoDesc = item.repoDesc || "";
  const repoUrl = item.repoUrl || `https://github.com/${repoName}`;

  const card = document.createElement("div");
  card.className = "sub-repo-card";

  card.innerHTML = `
    <h3>${repoName}</h3>
    <p>${repoDesc}</p>
    <a href="${repoUrl}" target="_blank" rel="external noopener">
      View Repository →
    </a>
  `;

  return card;
}
