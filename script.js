const currentYearTargets = document.querySelectorAll("[data-current-year]");
const searchInput = document.querySelector("[data-search-input]");
const categoryFilter = document.querySelector("[data-category-filter]");
const projectCards = document.querySelectorAll("[data-project-card]");

currentYearTargets.forEach((node) => {
  node.textContent = new Date().getFullYear();
});

function applyProjectFilters() {
  if (!projectCards.length) {
    return;
  }

  const query = (searchInput?.value || "").trim().toLowerCase();
  const selectedCategory = categoryFilter?.value || "todos";

  projectCards.forEach((card) => {
    const searchable = (card.dataset.search || "").toLowerCase();
    const category = card.dataset.category || "";
    const matchesQuery = !query || searchable.includes(query);
    const matchesCategory = selectedCategory === "todos" || category === selectedCategory;

    card.classList.toggle("is-hidden", !(matchesQuery && matchesCategory));
  });
}

if (searchInput) {
  searchInput.addEventListener("input", applyProjectFilters);
}

if (categoryFilter) {
  categoryFilter.addEventListener("change", applyProjectFilters);
}

applyProjectFilters();
