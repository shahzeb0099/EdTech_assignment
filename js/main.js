function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when a link is clicked (better mobile UX)
  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function formatPrice(price) {
  return `₹${Number(price).toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
});

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function debounce(fn, delay = 300) {
  let timerId;
  return function debounced(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}

function renderCourseCard(course) {
  return `
    <article class="course-card">
      <a class="course-card-link" href="course-detail.html?id=${course.id}" aria-label="View details for ${escapeHTML(
        course.title,
      )}">
        <div class="course-card-media">
          <img src="${course.thumbnail}" alt="${escapeHTML(course.title)} thumbnail" loading="lazy" />
          <span class="course-card-category">${escapeHTML(course.category)}</span>
        </div>
        <div class="course-card-body">
          <h3 class="course-card-title">${escapeHTML(course.title)}</h3>
          <p class="course-card-instructor">By ${escapeHTML(course.instructor)}</p>
          <div class="course-card-meta">
            <span class="course-card-price">${formatPrice(course.price)}</span>
            <span class="course-card-rating">★ ${course.rating} <span style="opacity:.7">(${course.students.toLocaleString()})</span></span>
          </div>
        </div>
      </a>
    </article>
  `;
}

document.addEventListener("DOMContentLoaded", initNavToggle);
