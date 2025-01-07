const mediumFeedUrl = "https://medium.com/feed/@kenimade";
function displayArticles(posts) {
    const container = document.getElementById("article-list");
    container.innerHTML = '';

    if (posts.length === 0) {
        container.innerHTML = '<p>No blog posts found.</p>';
        return;
    }

    const list = document.createElement("ul");
    posts.forEach(post => {
        const listItem = document.createElement("li");
        const postLink = document.createElement("a");
        postLink.href = post.link;
        postLink.textContent = post.title;
        postLink.target = '_blank';
        listItem.appendChild(postLink);
        list.appendChild(listItem);
    });

    container.appendChild(list);
}

async function fetchMediumArticles() {
    try {
        const response = await fetch(
            `https://api.rss2json.com/v1/api.json?rss_url=${mediumFeedUrl}`
        );
        const data = await response.json();
        console.log(data)
        const items = data.items || [];
        displayArticles(items);
    } catch (error) {
        console.error("Error fetching blog posts", error);
    }
}

fetchMediumArticles()