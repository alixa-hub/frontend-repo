// Scroll Reveal
const revealElements = document.querySelectorAll(".reveal");

window.addEventListener("scroll", function() {
    revealElements.forEach(function(el) {
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

// Change slide every 3 seconds
setInterval(showNextSlide, 3000);



fetch("https://backend-0.vercel.app/perfumes")
  .then(res => res.json())
  .then(data => {
    console.log(data); // render data on page
  });


app.get("/api/products", (req, res) => {
  res.json({ products: ["Perfume1", "Perfume2"] });
});

// script.js

// Backend URL (replace with your actual deployed backend URL)
const BACKEND_URL = "https://backend-0.vercel.app"; 

// Function to fetch perfumes from backend
async function fetchPerfumes() {
  try {
    const response = await fetch(`${BACKEND_URL}/perfumes`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const perfumes = await response.json();
    displayPerfumes(perfumes);
  } catch (err) {
    console.error("Failed to fetch perfumes:", err);
    const container = document.getElementById("perfumes-container");
    container.innerHTML = "<p>Failed to load perfumes. Please try again later.</p>";
  }
}

// Function to display perfumes on page
function displayPerfumes(perfumes) {
  const container = document.getElementById("perfumes-container");
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

// Call fetch function when page loads
window.addEventListener("DOMContentLoaded", fetchPerfumes);
