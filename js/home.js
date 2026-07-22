document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("popular-courses-grid");
  if (!grid) return;

  
  const popularCourses = COURSES.slice(0, 6);

  grid.innerHTML = popularCourses.map(renderCourseCard).join("");
});
