let members = JSON.parse(localStorage.getItem('tw_members')) || [];
let tasks = JSON.parse(localStorage.getItem('tw_tasks')) || [];
let editingId = null;
let activeMemberFilter = null;
let isDarkMode = localStorage.getItem('tw_darkmode') === 'true';

/* THEME */
function toggleTheme() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('tw_darkmode', isDarkMode);
}

/* NAVIGATION */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* DRAG & DROP */
function allowDrop(e) { e.preventDefault(); }
function drop(e, status) { e.preventDefault(); }

/* TASKS */
function saveTask() {
  const name = document.getElementById('taskName').value;
  if(!name) return;
  tasks.push({ id: Date.now(), name, status: 'Not Started' });
  saveData();
}

/* MEMBERS */
function addMember() {
  const name = document.getElementById('memberName').value;
  if(!name) return;
  members.push({ name });
  saveData();
}

/* STORAGE */
function saveData() {
  localStorage.setItem('tw_members', JSON.stringify(members));
  localStorage.setItem('tw_tasks', JSON.stringify(tasks));
}

/* SEARCH */
function handleSearch() {}

/* EXPORT / RESET */
function exportData() {}
function clearData() { localStorage.clear(); location.reload(); }