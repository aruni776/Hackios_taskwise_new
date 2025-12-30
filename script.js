let members = [];
let tasks = [];
let currentUser = null;
let editingId = null;
let activeMemberFilter = null;
let isDarkMode = localStorage.getItem('tw_darkmode') === 'true';

/* THEME */
function toggleTheme() {
  isDarkMode = !isDarkMode;
  localStorage.setItem('tw_darkmode', isDarkMode);
  updateThemeUI(isDarkMode);
}

function updateThemeUI(dark) {
  document.body.classList.toggle('dark-mode', dark);
}

/* AUTH */
function completeAuth() {
  const name = authName.value.trim();
  const team = authTeam.value.trim();
  if (!name || !team) return alert("Fill all fields");

  currentUser = { name, team };
  localStorage.setItem('tw_current_user', JSON.stringify(currentUser));
  checkAuth();
}

function logout() {
  localStorage.clear();
  location.reload();
}

/* NAV */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* DRAG DROP */
function allowDrop(e) { e.preventDefault(); }
function drop(e, status) { e.preventDefault(); }

/* STORAGE */
function saveData() {
  localStorage.setItem('tw_members', JSON.stringify(members));
  localStorage.setItem('tw_tasks', JSON.stringify(tasks));
}

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  members = JSON.parse(localStorage.getItem('tw_members')) || [];
  tasks = JSON.parse(localStorage.getItem('tw_tasks')) || [];
  currentUser = JSON.parse(localStorage.getItem('tw_current_user')) || null;
  updateThemeUI(isDarkMode);
  checkAuth();
});