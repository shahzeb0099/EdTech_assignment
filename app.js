const page = document.body.dataset.page;

function buildCourseCard(course) {
  return `
    <article class="card">
      <a href="course-detail.html?id=${course.id}">
        <img src="${course.thumbnail}" alt="${course.title}">
        <div class="card-body">
          <span class="badge">${course.category}</span>
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <div class="card-footer">
            <span>${course.price}</span>
            <span>View details</span>
          </div>
        </div>
      </a>
    </article>
  `;
}

function renderHomeCourses() {
  const container = document.getElementById("popular-courses");
  if (!container) return;

  const featured = window.coursesData.slice(0, 6);
  container.innerHTML = featured.map(buildCourseCard).join("");
}

function debounce(fn, delay = 250) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function filterCourses(searchValue, categoryValue) {
  const normalizedSearch = searchValue.trim().toLowerCase();
  const filtered = window.coursesData.filter((course) => {
    const matchesSearch =
      !normalizedSearch ||
      course.title.toLowerCase().includes(normalizedSearch);
    const matchesCategory =
      !categoryValue ||
      categoryValue === "All" ||
      course.category === categoryValue;
    return matchesSearch && matchesCategory;
  });

  const grid = document.getElementById("courses-grid");
  const message = document.getElementById("results-message");
  if (!grid || !message) return;

  if (!filtered.length) {
    grid.innerHTML =
      '<div class="empty-state">No courses match your filters yet.</div>';
    message.textContent = "No results found.";
    return;
  }

  grid.innerHTML = filtered.map(buildCourseCard).join("");
  message.textContent = `Showing ${filtered.length} course${filtered.length === 1 ? "" : "s"}.`;
}

function initCourseListing() {
  const searchInput = document.getElementById("search-input");
  const categorySelect = document.getElementById("category-filter");
  const grid = document.getElementById("courses-grid");

  if (!searchInput || !categorySelect || !grid) return;

  const categories = [
    "All",
    ...new Set(window.coursesData.map((course) => course.category)),
  ];
  categorySelect.innerHTML = categories
    .map((category) => `<option value="${category}">${category}</option>`)
    .join("");

  const runFilter = debounce(() => {
    filterCourses(searchInput.value, categorySelect.value);
  });

  searchInput.addEventListener("input", runFilter);
  categorySelect.addEventListener("change", runFilter);
  filterCourses("", "All");
}

function initCourseDetail() {
  const container = document.getElementById("course-detail");
  const params = new URLSearchParams(window.location.search);
  const courseId = Number(params.get("id"));

  if (!container) return;

  const course = window.coursesData.find((item) => item.id === courseId);

  if (!course) {
    container.innerHTML =
      '<div class="empty-state">The requested course could not be found.</div>';
    return;
  }

  container.innerHTML = `
    <div class="detail-card">
      <img src="${course.thumbnail}" alt="${course.title}">
      <div class="detail-meta">
        <span>${course.category}</span>
        <span>${course.price}</span>
      </div>
      <h1>${course.title}</h1>
      <p>${course.description}</p>
      <p><strong>Instructor:</strong> ${course.instructor}</p>
      <div class="btns" style="margin-top: 1rem;">
        <button class="btn btn-primary" id="enroll-btn">Enroll Now</button>
        <a class="btn btn-secondary" href="courses.html">Back to Courses</a>
      </div>
    </div>
  `;

  document.getElementById("enroll-btn").addEventListener("click", () => {
    alert(`Enrollment started for ${course.title}.`);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (page === "home") {
    renderHomeCourses();
  }

  if (page === "courses") {
    initCourseListing();
  }

  if (page === "course-detail") {
    initCourseDetail();
  }
});
