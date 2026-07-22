document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("popular-courses-grid");
  if (!grid) return;

  // Show the first 6 courses as "popular" courses on the home page
  const popularCourses = COURSES.slice(0, 6);

  grid.innerHTML = popularCourses.map(renderCourseCard).join("");
});
