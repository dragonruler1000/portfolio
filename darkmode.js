document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("darkModeSwitch");
    const body = document.body;
  
    // Apply previously saved mode
    const darkModeEnabled = localStorage.getItem("darkMode") === "true";
    if (darkModeEnabled) {
      body.classList.add("dark-mode");
      toggle.checked = true;
    }
  
    // Toggle dark mode on switch change
    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "true");
      } else {
        body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "false");
      }
    });
  });
  