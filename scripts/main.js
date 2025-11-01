/* ===== Responsive Nav (hamburger) ===== */
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

/* ===== Footer dynamic fields ===== */
// © CURRENT YEAR
const copyrightEl = document.getElementById('copyright');
if (copyrightEl) {
  const year = new Date().getFullYear();
  copyrightEl.innerHTML = `&copy; ${year}`;
}

// Last modified (assignment: use the string directly)
const lastModEl = document.getElementById('lastModified');
if (lastModEl) {
  document.getElementById("lastModified").innerHTML = document.lastModified;
}

/* ===== Course Data & Rendering =====
   Update completed:true for courses you've finished.
   category: "WDD" or "CSE"
*/
const courses = [
  { code: "WDD 130", title: "Web Fundamentals",        credits: 2, category: "WDD", completed: true  },
  { code: "WDD 131", title: "Dynamic Web Fundamentals", credits: 2, category: "WDD", completed: true },
  { code: "WDD 231", title: "Frontend Dev I",          credits: 3, category: "WDD", completed: false },
  { code: "CSE 110", title: "Intro to Programming",    credits: 2, category: "CSE", completed: true  },
  { code: "CSE 111", title: "Programming w/ Functions",credits: 2, category: "CSE", completed: true },
  { code: "CSE 210", title: "Programming w/ Classes",  credits: 3, category: "CSE", completed: false }
];

const courseGrid = document.getElementById('courseGrid');
const creditsTotalEl = document.getElementById('creditsTotal');
const filterButtons = document.querySelectorAll('.filter-btn');

let currentFilter = 'ALL';

function getFilteredCourses() {
  if (currentFilter === 'ALL') return [...courses];
  return courses.filter(c => c.category === currentFilter);
}

function renderCourses() {
  const list = getFilteredCourses();

  // credits reflect ONLY the displayed courses
  const totalCredits = list.reduce((sum, c) => sum + Number(c.credits || 0), 0);
  if (creditsTotalEl) {
    creditsTotalEl.textContent = `Total credits: ${totalCredits}`;
  }

  if (!courseGrid) return;
  courseGrid.innerHTML = '';

  list.forEach(course => {
    const card = document.createElement('article');
    card.className = 'course-card' + (course.completed ? ' completed' : '');

    const title = document.createElement('h3');
    title.className = 'title';
    title.textContent = `${course.code} — ${course.title}`;

    const meta = document.createElement('p');
    meta.className = 'meta';
    meta.innerHTML = `Category: ${course.category}
      <span class="badge" title="Credits">${course.credits} cr</span>`;

    card.appendChild(title);
    card.appendChild(meta);
    courseGrid.appendChild(card);
  });
}

function setFilter(filter) {
  currentFilter = filter;
  filterButtons.forEach(btn => {
    const isActive = btn.dataset.filter === filter;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
  renderCourses();
}

// Wire up filter buttons
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => setFilter(btn.dataset.filter));
});

// Initial render
renderCourses();
