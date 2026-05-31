// Lấy các phần tử DOM
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const clearCompletedBtn = document.getElementById("clearCompleted");
const filterGroup = document.getElementById("filterGroup");

// Khởi tạo dữ liệu từ LocalStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

// 1. Hàm Render danh sách (Sử dụng createElement - Không dùng innerHTML cho item)
function renderTodos() {
  todoList.innerHTML = ""; // Chỉ dùng để dọn dẹp container

  const filteredTodos = todos.filter((todo) => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  filteredTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `list-group-item d-flex align-items-center shadow-sm ${todo.completed ? "completed" : ""}`;
    li.dataset.id = todo.id;

    const textSpan = document.createElement("span");
    textSpan.className = "todo-text";
    textSpan.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "❌";
    deleteBtn.className = "delete-btn ms-2";

    li.appendChild(textSpan);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });

  updateStats();
  localStorage.setItem("todos", JSON.stringify(todos));
}

// 2. Cập nhật số lượng mục còn lại
function updateStats() {
  const activeCount = todos.filter((t) => !t.completed).length;
  todoCount.textContent = `${activeCount} mục còn lại`;
}

// 3. Thêm mới Todo
function addNewTodo() {
  const text = todoInput.value.trim();
  if (text !== "") {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    todos.push(newTodo);
    todoInput.value = "";
    renderTodos();
  }
}

// 4. Phân quyền sự kiện (Event Delegation) cho #todoList
todoList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  const id = Number(li.dataset.id);

  // Chức năng Xóa
  if (e.target.classList.contains("delete-btn")) {
    todos = todos.filter((t) => t.id !== id);
    renderTodos();
  }
  // Chức năng Toggle hoàn thành
  else if (e.target.classList.contains("todo-text")) {
    const todo = todos.find((t) => t.id === id);
    todo.completed = !todo.completed;
    renderTodos();
  }
});

// 5. Chỉnh sửa công việc (Double click)
todoList.addEventListener("dblclick", (e) => {
  if (e.target.classList.contains("todo-text")) {
    const li = e.target.closest("li");
    const id = Number(li.dataset.id);
    const todo = todos.find((t) => t.id === id);

    const input = document.createElement("input");
    input.className = "edit-input";
    input.value = todo.text;

    li.replaceChild(input, e.target);
    input.focus();

    // Lưu khi nhấn Enter hoặc mất tiêu điểm (blur)
    const handleSave = () => {
      const val = input.value.trim();
      if (val) {
        todo.text = val;
        renderTodos();
      } else {
        renderTodos(); // Trả về cũ nếu rỗng
      }
    };

    input.addEventListener(
      "keypress",
      (ev) => ev.key === "Enter" && handleSave(),
    );
    input.addEventListener("blur", handleSave);
  }
});

// 6. Xử lý Bộ lọc (Filter)
filterGroup.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    document
      .querySelectorAll("#filterGroup button")
      .forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
    currentFilter = e.target.dataset.filter;
    renderTodos();
  }
});

// 7. Xóa tất cả đã hoàn thành
clearCompletedBtn.addEventListener("click", () => {
  todos = todos.filter((t) => !t.completed);
  renderTodos();
});

// 8. Lắng nghe Enter tại ô input chính
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addNewTodo();
});

addBtn.addEventListener("click", addNewTodo);

// Khởi chạy ứng dụng
renderTodos();
