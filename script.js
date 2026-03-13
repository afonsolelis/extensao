const currentYearTargets = document.querySelectorAll("[data-current-year]");
const searchInput = document.querySelector("[data-search-input]");
const categoryFilter = document.querySelector("[data-category-filter]");
const cards = document.querySelectorAll("[data-challenge-card]");

currentYearTargets.forEach((node) => {
  node.textContent = new Date().getFullYear();
});

function applyChallengeFilters() {
  if (!cards.length) {
    return;
  }

  const query = (searchInput?.value || "").trim().toLowerCase();
  const selectedCategory = categoryFilter?.value || "todos";

  cards.forEach((card) => {
    const searchable = (card.dataset.search || "").toLowerCase();
    const category = card.dataset.category || "";
    const matchesQuery = !query || searchable.includes(query);
    const matchesCategory = selectedCategory === "todos" || category === selectedCategory;
    card.classList.toggle("is-hidden", !(matchesQuery && matchesCategory));
  });
}

if (searchInput) {
  searchInput.addEventListener("input", applyChallengeFilters);
}

if (categoryFilter) {
  categoryFilter.addEventListener("change", applyChallengeFilters);
}

applyChallengeFilters();
