document.addEventListener("DOMContentLoaded", () => {

  let members = JSON.parse(localStorage.getItem("members")) || ["Jatin","Aru"];
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const pages = document.querySelectorAll(".page");
  const navBtns = document.querySelectorAll(".nav-pill");

  const memberList = document.getElementById("memberList");
  const memberInput = document.getElementById("memberName");
  const taskMember = document.getElementById("taskMember");
  const taskRows = document.getElementById("taskRows");

  function save() {
    localStorage.setItem("members", JSON.stringify(members));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  navBtns.forEach(btn => {
    btn.onclick = () => {
      pages.forEach(p => p.classList.remove("active"));
      document.getElementById(btn.dataset.page).classList.add("active");
      navBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    };
  });

  function renderMembers() {
    memberList.innerHTML = "";
    taskMember.innerHTML = "";

    members.forEach((m,i)=>{
      const card = document.createElement("div");
      card.className="member-card";
      card.innerHTML = `
        <div class="avatar">${m[0]}</div>
        <strong>${m}</strong>
        <p>${tasks.filter(t=>t.member===m).length} tasks</p>
        <button onclick="removeMember(${i})">Remove</button>
      `;
      memberList.appendChild(card);

      const opt = document.createElement("option");
      opt.textContent = m;
      taskMember.appendChild(opt);
    });
  }

  window.removeMember = i => {
    members.splice(i,1);
    tasks = tasks.filter(t=>t.member!==members[i]);
    save(); renderMembers(); renderTasks();
  };

  function renderTasks() {
    taskRows.innerHTML="";
    tasks.forEach((t,i)=>{
      const cls = t.status==="Completed"?"done":t.status==="In-progress"?"progress":"todo";
      const row = document.createElement("div");
      row.className="row";
      row.innerHTML = `
        <div>${t.name}</div>
        <div>${t.added}</div>
        <div>${t.deadline}</div>
        <div>${t.member}</div>
        <div><span class="${cls}">${t.status}</span></div>
        <div><button onclick="removeTask(${i})">✕</button></div>
      `;
      taskRows.appendChild(row);
    });
    save();
  }

  window.removeTask = i => {
    tasks.splice(i,1);
    renderTasks(); renderMembers();
  };

  document.getElementById("addMemberBtn").onclick = () => {
    if(!memberInput.value) return;
    members.push(memberInput.value);
    memberInput.value="";
    renderMembers(); save();
  };

  document.getElementById("addTaskBtn").onclick = () => {
    tasks.push({
      name:taskName.value,
      added:taskAdded.value,
      deadline:taskDeadline.value,
      member:taskMember.value,
      status:taskStatus.value
    });
    taskName.value="";
    renderTasks(); renderMembers();
  };

  renderMembers();
  renderTasks();
});
