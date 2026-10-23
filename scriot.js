// Add your exact LinkedIn profile URL here after you share it, for example: https://www.linkedin.com/in/your-profile/
const LINKEDIN_PROFILE_URL = "";
const linkedinLink = document.getElementById("linkedinLink");
const linkedinNote = document.getElementById("linkedinNote");
if (LINKEDIN_PROFILE_URL && LINKEDIN_PROFILE_URL.startsWith("https://www.linkedin.com/")) {
  linkedinLink.href = LINKEDIN_PROFILE_URL;
  linkedinLink.hidden = false;
  linkedinNote.hidden = true;
}

// Portfolio interactions: mobile menu, theme toggle, project filters, contact form demo.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");
const themeToggle = document.getElementById("themeToggle");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

// 1. Mobile navigation menu: open/close and close after choosing a section.
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

// 2. Light/dark theme toggle. The preference is saved in this browser.
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
}
updateThemeButton();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
  localStorage.setItem("portfolio-theme", theme);
  updateThemeButton();
});

function updateThemeButton() {
  const isDark = document.body.classList.contains("dark-theme");
  themeToggle.textContent = isDark ? "☾" : "☼";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  themeToggle.title = isDark ? "Switch to light theme" : "Switch to dark theme";
}

// 3. Project filters: show only cards matching the selected category.
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    projectCards.forEach((card) => {
      const shouldShow = selectedFilter === "all" || card.dataset.category === selectedFilter;
      card.hidden = !shouldShow;
    });
  });
});

// 4. Contact form demo: validate fields and show a truthful confirmation.
// This does not send or store a message because there is no backend.
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formFeedback.classList.remove("error");

  if (!contactForm.checkValidity()) {
    formFeedback.textContent = "Please fill in each field with valid information.";
    formFeedback.classList.add("error");
    contactForm.reportValidity();
    return;
  }

  const visitorName = document.getElementById("visitorName").value.trim();
  formFeedback.textContent = `Thanks, ${visitorName}! Your form entries look complete. This demo has not sent a message.`;
  contactForm.reset();
});

// 5. Keep the footer year current.
document.getElementById("currentYear").textContent = new Date().getFullYear();

// 6. Highlight the navigation item for the section currently in view.
const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((link) => {
          const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", isCurrent);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));
}
