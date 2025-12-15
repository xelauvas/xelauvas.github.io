// ====== CONFIG (edit these) ======
const CONFIG = {
  githubUser: "xelauvas",
  // If your repo names differ, change them here:
  repos: {
    "crypto-pulse": "crypto-pulse",
    "xelas-platform": "xelas-platform",
    "verselens": "verselens",
  },
  email: "" // e.g. "you@email.com" (optional)
};

// ====== Link wiring ======
function repoUrl(key) {
  const name = CONFIG.repos[key] || key;
  return `https://github.com/${CONFIG.githubUser}/${name}`;
}

document.querySelectorAll("[data-repo]").forEach(a => {
  const key = a.getAttribute("data-repo");
  a.href = repoUrl(key);
});

const emailLink = document.getElementById("emailLink");
if (CONFIG.email) {
  emailLink.textContent = CONFIG.email;
  emailLink.href = `mailto:${CONFIG.email}`;
} else {
  emailLink.textContent = "Email (set in script.js)";
  emailLink.href = "#";
}

document.getElementById("year").textContent = String(new Date().getFullYear());

// ====== Modal content (positioning) ======
const MODALS = {
  crypto: {
    title: "crypto-pulse — what it proves",
    body: `
      <ul>
        <li>Real-time ingestion (WebSocket), filtering, and event-driven processing.</li>
        <li>Indicator pipeline + risk framing + structured alert output.</li>
        <li>AI used as a production component: context → decision (WAIT vs setup) → message.</li>
        <li>Operational hygiene: retries/logging/lifecycle patterns.</li>
      </ul>
    `
  },
  xelas: {
    title: "xelas-platform — what it proves",
    body: `
      <ul>
        <li>Architecture-first thinking: API layer, services, models, core config.</li>
        <li>Maintainability and extensibility over fast hacks.</li>
        <li>Comfort with building platforms, not just features.</li>
      </ul>
    `
  },
  verselens: {
    title: "verselens — what it proves",
    body: `
      <ul>
        <li>Product UI mindset: structure, navigation, reusable components.</li>
        <li>Type safety and clean state management patterns.</li>
        <li>Ability to deliver a UI layer when the system needs it.</li>
      </ul>
    `
  }
};

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
document.querySelectorAll("[data-modal]").forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.getAttribute("data-modal");
    const m = MODALS[key];
    if (!m) return;
    modalTitle.textContent = m.title;
    modalBody.innerHTML = m.body;
    modal.showModal();
  });
});

document.getElementById("closeModal").addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => {
  const rect = modal.getBoundingClientRect();
  const inDialog =
    rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
    rect.left <= e.clientX && e.clientX <= rect.left + rect.width;
  if (!inDialog) modal.close();
});

// ====== Theme toggle ======
const themeBtn = document.getElementById("themeBtn");
const saved = localStorage.getItem("theme");
if (saved) document.documentElement.setAttribute("data-theme", saved);

themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// ====== Reveal on scroll ======
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("is-visible");
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => io.observe(el));
