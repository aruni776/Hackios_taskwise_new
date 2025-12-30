let members = [];
let tasks = [];
let currentUser = null;
let chartInstance = null;
let isDarkMode = localStorage.getItem('tw_darkmode') === 'true';

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  updateThemeUI(isDarkMode);

  const ctx = document.getElementById("taskChart").getContext("2d");
  chartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["To Do", "In Progress", "Done"],
      datasets: [{ data: [0, 0, 0] }]
    }
  });
});

/* THEME */
function toggleTheme() {
  isDarkMode = !isDarkMode;
  localStorage.setItem("tw_darkmode", isDarkMode);
  updateThemeUI(isDarkMode);
}

function updateThemeUI(dark) {
  document.body.classList.toggle("dark-mode", dark);
}

/* NAVIGATION */
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* AUTH */
function completeAuth() {
  const name = authName.value.trim();
  const team = authTeam.value.trim();
  if (!name || !team) return alert("Fill all fields");

  currentUser = { name, team };
  heroName.textContent = name;
  authScreen.style.display = "none";
}

/* LOGOUT */
function logout() {
  location.reload();
}

/* DRAG DROP */
function allowDrop(e) {
  e.preventDefault();
}

function drop(e, status) {
  e.preventDefault();
}

/* UTILS */
function exportData() {
  alert("Export coming soon");
}

function clearData() {
  if (confirm("Factory reset?")) localStorage.clear(), location.reload();
}