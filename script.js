// Backend URL (YOUR vercel backend)
const BACKEND_URL = "https://backend-0-mwh9.vercel.app";

// Fetch perfumes from backend
async function fetchPerfumes() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/perfumes`);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const perfumes = await response.json();
        displayPerfumes(perfumes);

        console.log("Fetched perfumes:", perfumes);
    } catch (err) {
        console.error("Failed to fetch perfumes:", err);

        const container = document.getElementById("perfumes-container");
        container.innerHTML = "<p>Failed to load perfumes.</p>";
    }
}

// Show perfumes dynamically
function displayPerfumes(perfumes) {
    const container = document.getElementById("perfumes-container");
    container.innerHTML = "";

    perfumes.forEach(perfume => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${perfume.image}" alt="${perfume.name}">
            <h3>${perfume.name}</h3>
            <p>${perfume.description}</p>
            <p><strong>Price:</strong> $${perfume.price}</p>
        `;

        container.appendChild(card);
    });
}

window.addEventListener("DOMContentLoaded", fetchPerfumes);
