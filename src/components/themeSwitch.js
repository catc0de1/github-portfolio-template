export function initThemeSwitch() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    toggle.checked = true;
  } else {
    document.body.classList.remove("dark");
    toggle.checked = false;
  }

  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });
}
