const currentYearTargets = document.querySelectorAll("[data-current-year]");
const searchInput = document.querySelector("[data-search-input]");
const categoryFilter = document.querySelector("[data-category-filter]");
const projectCards = document.querySelectorAll("[data-project-card]");

currentYearTargets.forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const resultCountDisplay = document.querySelector("[data-result-count]");

function applyProjectFilters() {
  if (!projectCards.length) {
    return;
  }

  const query = (searchInput?.value || "").trim().toLowerCase();
  const selectedCategory = categoryFilter?.value || "todos";
  let count = 0;

  projectCards.forEach((card) => {
    const searchable = (card.dataset.search || "").toLowerCase();
    const category = card.dataset.category || "";
    const matchesQuery = !query || searchable.includes(query);
    const matchesCategory = selectedCategory === "todos" || category === selectedCategory;
    const isVisible = matchesQuery && matchesCategory;

    card.classList.toggle("is-hidden", !isVisible);
    if (isVisible) {
      count++;
    }
  });

  if (resultCountDisplay) {
    resultCountDisplay.textContent = `${count} ${count === 1 ? "projeto encontrado" : "projetos encontrados"}`;
  }
}

if (searchInput) {
  searchInput.addEventListener("input", applyProjectFilters);
}

if (categoryFilter) {
  categoryFilter.addEventListener("change", applyProjectFilters);
}

applyProjectFilters();
