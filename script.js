// Preloader
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;
  setTimeout(() => {
    preloader.style.opacity = "0";
    preloader.style.pointerEvents = "none";
    setTimeout(() => preloader.remove(), 600);
  }, 700);
});

// Year
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTop");
if (scrollTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 320) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Mobile nav
const navToggle = document.getElementById("navToggle");
const navMobile = document.getElementById("navMobile");

if (navToggle && navMobile) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    navMobile.classList.toggle("show");
  });

  navMobile.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMobile.classList.remove("show");
      navToggle.classList.remove("open");
    });
  });
}

// Smooth scroll for desktop nav
document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = link.getAttribute("href").substring(1);
    const target = document.getElementById(id);
    if (target) {
      const offset = target.offsetTop - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  });
});

// Dark / light mode toggle
const darkToggle = document.getElementById("darkToggle");
const body = document.body;

function setTheme(mode) {
  if (mode === "light") {
    body.classList.add("light");
    if (darkToggle) darkToggle.textContent = "🌙";
  } else {
    body.classList.remove("light");
    if (darkToggle) darkToggle.textContent = "☀️";
  }
}

const savedTheme = localStorage.getItem("ths-theme-v2");
if (savedTheme === "light" || savedTheme === "dark") {
  setTheme(savedTheme);
} else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
  setTheme("light");
} else {
  setTheme("dark");
}

if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    const newMode = body.classList.contains("light") ? "dark" : "light";
    setTheme(newMode);
    localStorage.setItem("ths-theme-v2", newMode);
  });
}

// Menu tabs
const menuTabs = document.querySelectorAll(".menu-tab");
const menuLists = document.querySelectorAll(".menu-list");

menuTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const key = tab.dataset.menu;
    menuTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    menuLists.forEach((list) => {
      if (list.id === `menu-${key}`) {
        list.classList.add("active");
      } else {
        list.classList.remove("active");
      }
    });
  });
});

// IntersectionObserver for animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = el.dataset.delay ? parseFloat(el.dataset.delay) : 0;
      setTimeout(() => {
        el.classList.add("visible");
      }, delay * 1000);
      observer.unobserve(el);
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));

// WhatsApp order buttons (combos)
function openDefaultWA() {
  const phone = "918240215306";
  const msg = encodeURIComponent(
    "Hi The healthy sip! I’d like to order a healthy combo."
  );
  window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
}

document.querySelectorAll(".order-wa").forEach((btn) => {
  btn.addEventListener("click", openDefaultWA);
});

// Gallery lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

if (lightbox && lightboxImg && lightboxClose) {
  document.querySelectorAll(".gallery-item img").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.classList.add("show");
    });
  });

  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("show");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("show");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      lightbox.classList.remove("show");
    }
  });
}
