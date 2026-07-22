
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("courses-grid");
  const searchInput = document.getElementById("search-input");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const resultsCount = document.getElementById("results-count");
  const emptyState = document.getElementById("empty-state");

  if (!grid) return;

  // Current filter state
  const state = {
    query: "",
    category: "All",
  };

  function getFilteredCourses() {
    return COURSES.filter((course) => {
      const matchesCategory =
        state.category === "All" || course.category === state.category;
      const matchesQuery = course.title
        .toLowerCase()
        .includes(state.query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }

  function render() {
    const filtered = getFilteredCourses();

    resultsCount.textContent = `${filtered.length} course${
      filtered.length !== 1 ? "s" : ""
    } found`;

    if (filtered.length === 0) {
      grid.innerHTML = "";
      emptyState.hidden = false;
      return;
    }

    emptyState.hidden = true;
    grid.innerHTML = filtered.map(renderCourseCard).join("");
  }

  const handleSearch = debounce((event) => {
    state.query = event.target.value;
    render();
  }, 300);

  searchInput.addEventListener("input", handleSearch);

  
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.category = btn.dataset.category;
      render();
    });
  });

  
  const params = new URLSearchParams(window.location.search);
  const presetCategory = params.get("category");
  if (presetCategory) {
    const matchingBtn = Array.from(filterButtons).find(
      (b) => b.dataset.category === presetCategory
    );
    if (matchingBtn) {
      filterButtons.forEach((b) => b.classList.remove("active"));
      matchingBtn.classList.add("active");
      state.category = presetCategory;
    }
  }

  render();
});
