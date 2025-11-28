// Scroll Reveal
const revealElements = document.querySelectorAll(".reveal");

window.addEventListener("scroll", function () {
    revealElements.forEach(function (el) {
        const top = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (top < windowHeight - 100) {
            el.classList.add("active");
        } else {
            el.classList.remove("active");
        }
    });
});

// Hero Slider
let slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showNextSlide() {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
}

setInterval(showNextSlide, 3000);

// ---------- BACKEND CONNECTION (FINAL WORKING VERSION) ----------

// Backend URL (your Vercel backend)
const BACKEND_URL = "https://backend-0-9wtqi4u34-alixas-projects-532b2a67.vercel.app";

// Fetch perfumes using backend
async function fetchPerfumes() {
    try {
        const response = await fetch(`${BACKEND_URL}/perfumes`);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const perfumes = await response.json();
        displayPerfumes(perfumes);

        console.log("Fetched perfumes:", perfumes);
    } catch (err) {
        console.error("Failed to fetch perfumes:", err);
        document.getElementById("perfumes-container").innerHTML =
            "<p>Failed to load perfumes. Please try again later.</p>";
    }
}

// Display perfumes
function displayPerfumes(perfumes) {
    const container = document.getElementById("perfumes-container");
    container.innerHTML = "";

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

// Load perfumes when page opens
window.addEventListener("DOMContentLoaded", fetchPerfumes);
