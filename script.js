// Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (!loader) return;
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
    setTimeout(() => loader.remove(), 600);
  }, 650);
});

// Year
document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});

// Scroll to top
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  if (!toTop) return;
  if (window.scrollY > 320) toTop.classList.add("show");
  else toTop.classList.remove("show");
});
if (toTop) {
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// Mobile nav
const navToggle = document.getElementById("navToggle");
const navMobile = document.getElementById("navMobile");

if (navToggle && navMobile) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    navMobile.classList.toggle("show");
  });

  navMobile.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      navMobile.classList.remove("show");
      navToggle.classList.remove("open");
    });
  });
}

// Theme toggle (dark default, toggle to light)
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

function applyTheme(mode) {
  if (mode === "light") {
    body.classList.add("light");
    if (themeToggle) themeToggle.textContent = "🌙";
  } else {
    body.classList.remove("light");
    if (themeToggle) themeToggle.textContent = "☀️";
  }
}

const saved = localStorage.getItem("ths-theme-premium");
if (saved === "light" || saved === "dark") {
  applyTheme(saved);
} else {
  applyTheme("dark");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const next = body.classList.contains("light") ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem("ths-theme-premium", next);
  });
}

// Menu tabs
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".menu-panel");

tabs.forEach((t) => {
  t.addEventListener("click", () => {
    const key = t.dataset.tab;
    tabs.forEach((x) => x.classList.remove("active"));
    t.classList.add("active");

    panels.forEach((p) => {
      p.classList.toggle("active", p.id === `tab-${key}`);
    });
  });
});

// AOS-like reveal
const revealEls = document.querySelectorAll("[data-reveal]");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const delay = el.dataset.delay ? Number(el.dataset.delay) : 0;
      setTimeout(() => el.classList.add("show"), delay * 1000);
      io.unobserve(el);
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => io.observe(el));

// WhatsApp order buttons (dynamic item)
function openWA(itemName) {
  const phone = "918240215306";
  const msg = encodeURIComponent(`Hi The Healthy Sip! I want to order: ${itemName}`);
  window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
}

document.querySelectorAll(".order-wa").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.getAttribute("data-item") || "Fresh Juice";
    openWA(item);
  });
});

// Gallery lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

if (lightbox && lightboxImg && lightboxClose) {
  document.querySelectorAll(".g-item img").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.classList.add("show");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  function closeLb() {
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
  }

  lightboxClose.addEventListener("click", closeLb);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLb();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLb();
  });
}
