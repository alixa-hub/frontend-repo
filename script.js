// ---------- BACKEND CONNECTION (CORRECTED) ----------

// Backend URL (your deployed Vercel backend)
const BACKEND_URL = "https://backend-0-mwh9.vercel.app"; // <- make sure quotes and https

// Fetch perfumes from backend
async function fetchPerfumes() {
    try {
        // Make sure endpoint matches your backend route
        const response = await fetch(`${BACKEND_URL}/api/perfumes`);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const perfumes = await response.json();
        displayPerfumes(perfumes);

        // Console log for verification
        console.log("Fetched perfumes:", perfumes);

    } catch (err) {
        console.error("Failed to fetch perfumes:", err);

        // Display error message in HTML
        const container = document.getElementById("perfumes-container");
        if (container) {
            container.innerHTML = "<p>Failed to load perfumes. Please try again later.</p>";
        }
    }
}

// Display perfumes in frontend
function displayPerfumes(perfumes) {
    const container = document.getElementById("perfumes-container");
    if (!container) return;

    container.innerHTML = ""; // Clear previous content

    perfumes.forEach(perfume => {
        const card = document.createElement("div");
        card.className = "perfume-card";

        card.innerHTML = `
            <img src="${perfume.image}" alt="${perfume.name}" class="perfume-image"/>
            <h3>${perfume.name}</h3>
            <p>${perfume.description}</p>
            <p><strong>Price:</strong> $${perfume.price}</p>
        `;

        container.appendChild(card);
    });
}

// Load perfumes when page is ready
window.addEventListener("DOMContentLoaded", fetchPerfumes);
