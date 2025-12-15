const CONFIG = {
  githubUser: "xelauvas",
  repos: {
    "crypto-pulse": "crypto-pulse",
    "xelas-platform": "xelas-platform",
    "verselens": "verselens",
  },
  email: "",     // set your email here, e.g. "you@email.com"
  linkedin: ""   // set your LinkedIn url here, e.g. "https://www.linkedin.com/in/..."
};

function repoUrl(key){
  const name = CONFIG.repos[key] || key;
  return `https://github.com/${CONFIG.githubUser}/${name}`;
}

document.querySelectorAll("[data-repo]").forEach(a => {
  const key = a.getAttribute("data-repo");
  a.href = repoUrl(key);
});

document.getElementById("year").textContent = String(new Date().getFullYear());

// Theme toggle
const themeBtn = document.getElementById("themeBtn");
const saved = localStorage.getItem("theme");
if (saved) document.documentElement.setAttribute("data-theme", saved);

themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// Modal
const MODALS = {
  crypto: {
    title: "crypto-pulse — what it proves",
    body: `
      <ul>
        <li><strong>Real-time pipeline</strong>: WebSocket events + REST data fetching.</li>
        <li><strong>Signal framing</strong>: indicators, entries/stops/targets, risk-aware outputs.</li>
        <li><strong>AI as production component</strong>: context → WAIT vs setup → message.</li>
        <li><strong>Operational hygiene</strong>: lifecycle, retries/logging patterns.</li>
      </ul>`
  },
  xelas: {
    title: "xelas-platform — what it proves",
    body: `
      <ul>
        <li><strong>Architecture-first</strong>: API layer, services, models, core configuration.</li>
        <li><strong>Platform thinking</strong>: maintainability + extensibility over quick hacks.</li>
        <li><strong>Ownership</strong>: structured code organization and system boundaries.</li>
      </ul>`
  },
  verselens: {
    title: "verselens — what it proves",
    body: `
      <ul>
        <li><strong>Product UI</strong>: screens, navigation, reusable components.</li>
        <li><strong>Type safety</strong>: clean typed state patterns.</li>
        <li><strong>End-to-end capability</strong>: UI layer to support a real system.</li>
      </ul>`
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
  const r = modal.getBoundingClientRect();
  const inside = r.top <= e.clientY && e.clientY <= r.bottom && r.left <= e.clientX && e.clientX <= r.right;
  if (!inside) modal.close();
});

// Contact buttons
const copyBtn = document.getElementById("copyEmailBtn");
copyBtn.addEventListener("click", async () => {
  if (!CONFIG.email) {
    alert("Set your email in script.js (CONFIG.email).");
    return;
  }
  try {
    await navigator.clipboard.writeText(CONFIG.email);
    copyBtn.textContent = "Copied ✓";
    setTimeout(() => (copyBtn.textContent = "Copy email"), 1200);
  } catch {
    alert("Copy failed. You can set a mailto link instead.");
  }
});

const linkedinLink = document.getElementById("linkedinLink");
if (CONFIG.linkedin) {
  linkedinLink.href = CONFIG.linkedin;
} else {
  linkedinLink.href = "#";
  linkedinLink.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Set your LinkedIn URL in script.js (CONFIG.linkedin).");
  });
}

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("is-visible"); });
}, { threshold: 0.14 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
