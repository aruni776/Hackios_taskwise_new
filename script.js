document.addEventListener("DOMContentLoaded", () => {

  /* ======================
     STATE
  ====================== */
  let members = ["Jatin", "Aru"];
  let tasks = [];

  /* ======================
     ELEMENTS
  ====================== */
  const pages = document.querySelectorAll(".page");
  const navButtons = document.querySelectorAll(".nav-center button");

  const memberList = document.getElementById("memberList");
  const memberNameInput = document.getElementById("memberName");
  const taskMemberSelect = document.getElementById("taskMember");

  const taskRows = document.getElementById("taskRows");
  const taskNameInput = document.getElementById("taskName");
  const taskAddedInput = document.getElementById("taskAdded");
  const taskDeadlineInput = document.getElementById("taskDeadline");
  const taskStatusSelect = document.getElementById("taskStatus");

  const addMemberBtn = document.getElementById("addMemberBtn");
  const addTaskBtn = document.getElementById("addTaskBtn");

  /* ======================
     NAVIGATION
  ====================== */
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const pageId = btn.dataset.page;

      pages.forEach(p => p.classList.remove("active"));
      document.getElementById(pageId).classList.add("active");

      navButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  /* ======================
     MEMBERS
  ====================== */
  function renderMembers() {
    memberList.innerHTML = "";
    taskMemberSelect.innerHTML = "";

    members.forEach(name => {
      const initial = name.charAt(0).toUpperCase();

      // Member Card
      const card = document.createElement("div");
      card.className = "member-card card";
      card.innerHTML = `
        <div class="avatar-circle">${initial}</div>
        <h3>${name}</h3>
      `;
      memberList.appendChild(card);

      // Dropdown option
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      taskMemberSelect.appendChild(opt);
    });
  }

  addMemberBtn.addEventListener("click", () => {
    const name = memberNameInput.value.trim();
    if (!name || members.includes(name)) return;

    members.push(name);
    memberNameInput.value = "";
    renderMembers();
  });

  /* ======================
     TASKS
  ====================== */
  function getStatusClass(status) {
    if (status === "In-progress") return "status-progress";
    if (status === "Completed") return "status-completed";
    return "status-todo";
  }

  function renderTasks() {
    taskRows.innerHTML = "";

    tasks.forEach((t, index) => {
      const row = document.createElement("div");
      row.className = "row";

      const statusClass = getStatusClass(t.status);

      row.innerHTML = `
        <div>${t.name}</div>
        <div>${t.added}</div>
        <div>${t.deadline}</div>
        <div>${t.member}</div>
        <div>
          <span class="status-pill ${statusClass}">
            ${t.status}
          </span>
        </div>
        <div>
          <button data-index="${index}">
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      `;

      taskRows.appendChild(row);
    });

    // Delete handlers
    taskRows.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = btn.dataset.index;
        tasks.splice(idx, 1);
        renderTasks();
      });
    });
  }

  addTaskBtn.addEventListener("click", () => {
    if (!taskNameInput.value) return;

    const task = {
      name: taskNameInput.value,
      added: taskAddedInput.value,
      deadline: taskDeadlineInput.value,
      member: taskMemberSelect.value,
      status: taskStatusSelect.value
    };

    tasks.push(task);

    taskNameInput.value = "";
    renderTasks();
  });

  /* ======================
     INIT
  ====================== */
  renderMembers();
});
