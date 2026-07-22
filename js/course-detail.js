/**
 * course-detail.js
 * Reads the course ID from the URL query string, finds the matching
 * course in mock data, and renders its details. Also handles the
 * "Enroll Now" button and the not-found state.
 */
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("course-detail-container");
  const notFoundTemplate = document.getElementById("not-found-template");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const courseId = Number(params.get("id"));
  const course = COURSES.find((c) => c.id === courseId);

  if (!course) {
    container.innerHTML = "";
    notFoundTemplate.hidden = false;
    return;
  }

  document.title = `${course.title} · EdTech`;

  container.innerHTML = `
    <div class="detail-media">
      <img src="${course.thumbnail}" alt="${escapeHTML(course.title)} thumbnail" />
      <span class="detail-category">${escapeHTML(course.category)}</span>
      <h1>${escapeHTML(course.title)}</h1>
      <p class="detail-instructor">Instructor: <strong>${escapeHTML(
        course.instructor
      )}</strong> &nbsp;·&nbsp; ★ ${course.rating} (${course.students.toLocaleString()} students)</p>
      <div class="detail-description">
        <h2>About this course</h2>
        <p>${escapeHTML(course.description)}</p>
      </div>
    </div>

    <aside class="detail-sidebar">
      <div class="detail-price">${formatPrice(course.price)}</div>
      <div class="detail-price-note">One-time payment · Lifetime access</div>
      <button class="btn btn-primary btn-block btn-lg" id="enroll-btn">Enroll Now</button>
      <a class="btn btn-outline btn-block" href="courses.html" style="margin-top:12px;">Back to Courses</a>
      <ul>
        <li><span class="icon">✓</span> Lifetime access to course materials</li>
        <li><span class="icon">✓</span> Certificate of completion</li>
        <li><span class="icon">✓</span> Access on mobile and desktop</li>
        <li><span class="icon">✓</span> 30-day money-back guarantee</li>
      </ul>
    </aside>
  `;

  const enrollBtn = document.getElementById("enroll-btn");
  enrollBtn.addEventListener("click", () => {
    showToast(
      "Enrollment successful!",
      `You're now enrolled in "${course.title}".`
    );
  });
});

/** Displays a temporary success toast notification */
function showToast(title, message) {
  let toast = document.getElementById("toast");

  // Create the toast element once, reuse it afterwards
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    toast.innerHTML = `
      <span class="toast-icon">✓</span>
      <div>
        <strong id="toast-title"></strong>
        <span id="toast-message"></span>
      </div>
    `;
    document.body.appendChild(toast);
  }

  toast.querySelector("#toast-title").textContent = title;
  toast.querySelector("#toast-message").textContent = message;

  toast.classList.add("show");
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}
