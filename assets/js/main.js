/* Vivek Murugesh — theme toggle, subtle reveal, footer year */
(function () {
  "use strict";

  /* Theme toggle */
  var toggle = document.getElementById("themeToggle");
  var root = document.documentElement;

  toggle.addEventListener("click", function () {
    var next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  /* Subtle reveal on scroll */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Resume paywall popover */
  var lock = document.getElementById("resumeLock");
  var pop = document.getElementById("resumePop");
  if (lock && pop) {
    function flipPop() {
      pop.classList.remove("pop-up");
      var r = pop.getBoundingClientRect();
      if (r.bottom > window.innerHeight - 8) {
        pop.classList.add("pop-up");
      }
    }
    lock.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = pop.hidden;
      pop.hidden = !open;
      lock.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) flipPop();
    });
    document.addEventListener("click", function (e) {
      if (!pop.hidden && !pop.contains(e.target) && e.target !== lock) {
        pop.hidden = true;
        lock.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !pop.hidden) {
        pop.hidden = true;
        lock.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Footer year */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
