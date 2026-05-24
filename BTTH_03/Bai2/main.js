// 1. Quản lý dữ liệu (Mảng chính và LocalStorage)
let tasks = JSON.parse(localStorage.getItem("my_task_list")) || [];
let isEditing = false; // Biến đánh dấu đang thêm mới hay đang sửa

// 2. Truy vấn các phần tử DOM
const taskList = document.getElementById("task-list");
const taskForm = document.getElementById("task-form");
const modal = document.getElementById("modal");
const openFormBtn = document.getElementById("open-form-btn");
const closeFormBtn = document.getElementById("close-form-btn");

// --- HÀM HIỂN THỊ (RENDER) ---
function renderTasks() {
  taskList.innerHTML = ""; // Xóa danh sách cũ

  if (tasks.length === 0) {
    taskList.innerHTML =
      '<p style="text-align:center; color: gray;">Chưa có công việc nào!</p>';
  }

  tasks.forEach((task) => {
    const card = document.createElement("div");
    card.className = `task-item ${task.completed ? "completed" : ""}`;
    card.innerHTML = `
            <div class="task-info">
                <h3>${task.title}</h3>
                <p>${task.desc}</p>
                <small>Hạn: ${task.deadline} | Ưu tiên: ${task.priority}</small>
            </div>
            <div class="task-actions">
                <button onclick="toggleComplete('${task.id}')">${task.completed ? "↩️" : "✅"}</button>
                <button class="btn-sua" onclick="prepareEdit('${task.id}')">Sửa</button>
                <button class="btn-xoa" onclick="deleteTask('${task.id}')">Xóa</button>
            </div>
        `;
    taskList.appendChild(card);
  });

  updateStats();
}

// --- HÀM THỐNG KÊ ---
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  document.getElementById("total-tasks").innerText = total;
  document.getElementById("completed-tasks").innerText = completed;
  document.getElementById("pending-tasks").innerText = total - completed;
}

// --- XỬ LÝ SỰ KIỆN FORM ---

// Nhấn nút "+ Thêm công việc"
openFormBtn.onclick = () => {
  isEditing = false; // Đặt về trạng thái thêm mới
  taskForm.reset(); // Xóa sạch dữ liệu cũ trong form
  document.getElementById("form-title").innerText = "Thêm công việc mới";
  modal.style.display = "flex"; // Hiện popup
};

// Nhấn nút "Hủy"
closeFormBtn.onclick = () => {
  modal.style.display = "none"; // Ẩn popup
};

// Nhấn nút "Lưu" (Submit form)
taskForm.onsubmit = (e) => {
  e.preventDefault(); // Ngăn trang web bị load lại

  const taskId = document.getElementById("task-id").value;
  const taskData = {
    id: isEditing ? taskId : Date.now().toString(), // Nếu sửa thì giữ ID cũ, thêm mới thì tạo ID mới
    title: document.getElementById("task-title").value,
    desc: document.getElementById("task-desc").value,
    deadline: document.getElementById("task-deadline").value,
    priority: document.getElementById("task-priority").value,
    completed: isEditing ? tasks.find((t) => t.id === taskId).completed : false,
  };

  if (isEditing) {
    tasks = tasks.map((t) => (t.id === taskId ? taskData : t));
  } else {
    tasks.push(taskData);
  }

  // Lưu vào máy và cập nhật giao diện
  localStorage.setItem("my_task_list", JSON.stringify(tasks));
  modal.style.display = "none";
  renderTasks();
  alert(isEditing ? "Cập nhật thành công!" : "Thêm mới thành công!");
};

// --- CÁC HÀM THAO TÁC (Phải gắn vào window để gọi từ HTML) ---

window.deleteTask = (id) => {
  if (confirm("Bạn có chắc chắn muốn xóa?")) {
    tasks = tasks.filter((t) => t.id !== id);
    localStorage.setItem("my_task_list", JSON.stringify(tasks));
    renderTasks();
  }
};

window.toggleComplete = (id) => {
  tasks = tasks.map((t) => {
    if (t.id === id) t.completed = !t.completed;
    return t;
  });
  localStorage.setItem("my_task_list", JSON.stringify(tasks));
  renderTasks();
};

window.prepareEdit = (id) => {
  const task = tasks.find((t) => t.id === id);
  isEditing = true;

  // Đưa dữ liệu cũ lên form
  document.getElementById("task-id").value = task.id;
  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.desc;
  document.getElementById("task-deadline").value = task.deadline;
  document.getElementById("task-priority").value = task.priority;

  document.getElementById("form-title").innerText = "Chỉnh sửa công việc";
  modal.style.display = "flex";
};

// Chạy lần đầu khi tải trang
renderTasks();
