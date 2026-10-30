const repositoryList = document.querySelector("#repository-list");

function renderRepositories(repositories) {
  repositoryList.replaceChildren();

  if (!Array.isArray(repositories) || repositories.length === 0) {
    showMessage("No starred repositories yet.");
    return;
  }

  for (const repository of repositories) {
    const item = document.createElement("li");
    item.className = "repository";

    const heading = document.createElement("h3");
    const link = document.createElement("a");
    link.href = repository.url;
    link.textContent = repository.full_name;
    heading.append(link);

    const description = document.createElement("p");
    description.textContent = repository.description;

    const starredAt = document.createElement("time");
    starredAt.dateTime = repository.starred_at;
    starredAt.textContent = `Starred on ${new Date(`${repository.starred_at}T00:00:00`).toLocaleDateString()}`;

    item.append(heading, description, starredAt);
    repositoryList.append(item);
  }
}

function showMessage(message) {
  const item = document.createElement("li");
  item.className = "status-message";
  item.textContent = message;
  repositoryList.replaceChildren(item);
}

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return response.json();
  })
  .then(renderRepositories)
  .catch(() => showMessage("Repositories could not be loaded."));