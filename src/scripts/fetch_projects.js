const username = "KenImade";

function toPascalCase(input) {
  return input
      .toLowerCase()
      .split(/[_-]/) 
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '); 
}

async function fetchRepos() {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await response.json();

    const repoList = document.getElementById("repo-list");
    let projectCount = 0;

    repos.forEach((repo, index) => {
      if (repo["topics"].includes("portfolio-project")) {
        const listItem = document.createElement("li");
        const projectLink = document.createElement("a");
        projectLink.href = repo.html_url;
        projectLink.target = '_blank';
        projectLink.textContent = `${toPascalCase(repo.name)} - ${repo.description || "No description"}`;
        listItem.appendChild(projectLink);
        
        repoList.appendChild(listItem);

        // Add <hr> if this is not the last portfolio project
        projectCount++;
        if (projectCount < repos.filter(repo => repo["topics"].includes("portfolio-project")).length) {
          repoList.appendChild(document.createElement("hr"));
        }
      }
    });
  } catch (error) {
    console.error("Error fetching repositories:", error);
  }
}

fetchRepos();
