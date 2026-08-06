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

  /* Dark mode suggestion (light theme only, dismissible once) */
  var darkNote = document.getElementById("darkNote");
  var darkEnable = document.getElementById("darkEnable");
  var darkDismiss = document.getElementById("darkDismiss");
  if (darkNote && root.dataset.theme === "light") {
    var noteDismissed = false;
    try { noteDismissed = localStorage.getItem("darkNoteDismissed") === "1"; } catch (e) {}
    if (!noteDismissed) darkNote.hidden = false;
  }
  if (darkEnable) {
    darkEnable.addEventListener("click", function () {
      root.dataset.theme = "dark";
      try { localStorage.setItem("theme", "dark"); } catch (e) {}
      darkNote.hidden = true;
    });
  }
  if (darkDismiss) {
    darkDismiss.addEventListener("click", function () {
      darkNote.hidden = true;
      try { localStorage.setItem("darkNoteDismissed", "1"); } catch (e) {}
    });
  }

  /* Footer year */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
