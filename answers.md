PHẦN A:

Câu A1:

1.Cây DOM

    div#app
    │
    ├── header
    │ │
    │ ├── h1
    │ │ └── "Todo App"
    │ │
    │ └── nav
    │ ├── a.active
    │ │ └── "All"
    │ ├── a
    │ │ └── "Active"
    │ └── a
    │ └── "Completed"
    │
    └── main
    │
    ├── form#todoForm
    │ ├── input#todoInput
    │ └── button
    │ └── "Add"
    │
    └── ul#todoList
    ├── li.todo-item
    │ └── "Learn HTML"
    │
    └── li.todo-item.completed
    └── "Learn CSS"

2.Viết querySelector/querySelectorAll

-Chọn < h1>

    document.querySelector("h1");

-Chọn ô nhập liệu trong biểu mẫu

Có nhiều cách:

    document.querySelector("#todoForm input");

hoặc

    document.querySelector("#todoInput");

-Chọn tất cả .todo-item

Vì có nhiều phần tử nên dùng:

    document.querySelectorAll(".todo-item");

Kết quả:

    <li class="todo-item">Learn HTML</li>
    <li class="todo-item completed">Learn CSS</li>

-Chọn liên kết đang hoạt động

    document.querySelector("a.active");

hoặc

    document.querySelector("nav .active");

Kết quả:

    < a href="#" class="active">All</>

-Chọn < li> đầu tiên trong #todoList

    document.querySelector("#todoList li:first-child");

Kết quả:

    < li class="todo-item">Learn HTML</>

-Chọn tất cả < a> bên trong < nav>

    document.querySelectorAll("nav a");

Kết quả gồm 3 thẻ:

    < a href="#" class="active">All</>
    < a href="#">Active</>
    < a href="#">Completed</>

Câu A2:

1.Sự khác nhau giữa querySelector() và querySelectorAll()

| Đặc điểm                      | `querySelector()`              | `querySelectorAll()`            |
| ----------------------------- | ------------------------------ | ------------------------------- |
| Kết quả trả về                | Phần tử đầu tiên khớp selector | Tất cả phần tử khớp selector    |
| Kiểu dữ liệu                  | `Element`                      | `NodeList`                      |
| Số lượng phần tử              | 1                              | 0, 1 hoặc nhiều                 |
| Truy cập trực tiếp thuộc tính | Có                             | Không (phải duyệt từng phần tử) |

Ví dụ:

-HTML:

    <li class="todo-item">HTML</li>
    <li class="todo-item">CSS</li>
    <li class="todo-item">JavaScript</li>

-Dùng querySelector()

    const item = document.querySelector(".todo-item");
    console.log(item.textContent);

-Kết quả:

    HTML

-Khi dùng querySelectorAll():

    const items = document.querySelectorAll(".todo-item");

    items.forEach(item => {
        console.log(item.textContent);
    });

-Kết quả:

    HTML
    CSS
    JavaScript

2.Câu hỏi bảo mật: Vì sao innerHTML gây XSS?

-XSS (Cross-Site Scripting) xảy ra khi dữ liệu do người dùng nhập vào được trình duyệt hiểu như mã HTML/JavaScript và thực thi.

Nguyên nhân:

    element.innerHTML = userInput;

Nó sẽ:

1.Phân tích HTML.

2.Tạo thẻ mới.

3.Thực thi các thuộc tính sự kiện (onerror, onclick, ...).

Ví dụ nguy hiểm

Người dùng nhập:

    <img src=x onerror="alert('Hacked!')">

Code:

    const userInput = document.querySelector("#search").value;

    document.querySelector("#result").innerHTML = userInput;

Browser sẽ hiểu thành:

    <div id="result">
        <img src="x" onerror="alert('Hacked!')">
    </div>

Do ảnh x không tồn tại:

    onerror="alert('Hacked!')"

Kết quả:

    ⚠ Hacked!

Câu A3:

Trường hợp 1: KHÔNG dùng e.stopPropagation()

Khi bấm nút #btn, sự kiện click xảy ra trên nút trước, sau đó sủi bọt (event bubbling) lên các phần tử cha.

Cây phần tử:

    outer
    └── inner
        └── btn

Thứ tự thực thi:

- #btn
- #inner
- #outer

Output:

    BUTTON
    INNER
    OUTER

Trường hợp 2: Có e.stopPropagation()

    document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");
    e.stopPropagation();
    });

stopPropagation() ngăn sự kiện tiếp tục sủi bọt lên phần tử cha.

Khi bấm nút:

- Chạy handler của #btn
- Dừng lại
- Không chạy #inner
- Không chạy #outer

Output:

    BUTTON

Câu C1:

| #   | Lỗi                                                 | Sửa thành                                      |     |     |
| --- | --------------------------------------------------- | ---------------------------------------------- | --- | --- |
| 1   | `addEventListener("onclick", ...)`                  | `addEventListener("click", ...)`               |     |     |
| 2   | `countDisplay = count;`                             | `countDisplay.textContent = count;`            |     |     |
| 3   | `countDisplay` khai báo `const`, không được gán lại | Không gán lại biến, chỉ cập nhật nội dung      |     |     |
| 4   | `historyList.innerHTML = null;`                     | `historyList.innerHTML = "";`                  |     |     |
| 5   | `item.remove;` không gọi hàm                        | `item.remove();`                               |     |     |
| 6   | `localStorage.getItem("count")` trả về chuỗi        | `count = Number(localStorage.getItem("count")) |     | 0;` |
| 7   | Khi load lại trang không khôi phục history          | Phải đọc `localStorage.history`                |     |     |
| 8   | Dùng `innerHTML` cho số đếm là không cần thiết      | Nên dùng `textContent`                         |     |     |

    const countDisplay = document.querySelector(".count");
    const historyList = document.getElementById("history");

    let count = 0;

    document.querySelector("#incrementBtn").addEventListener("click", () => {
        count++;
        countDisplay.textContent = count;

        const li = document.createElement("li");
        li.textContent = `Count changed to ${count}`;

        li.addEventListener("click", function () {
            deleteHistory(this);
        });

        historyList.appendChild(li);
    });

    document.querySelector("#decrementBtn").addEventListener("click", () => {
        count--;
        countDisplay.textContent = count;
    });

    document.querySelector("#resetBtn").addEventListener("click", () => {
        count = 0;
        countDisplay.textContent = count;
        historyList.innerHTML = "";
    });

    function deleteHistory(element) {
        element.remove();
    }

    document.querySelector("#clearHistory").addEventListener("click", () => {
        const items = historyList.querySelectorAll("li");

        items.forEach(item => {
            item.remove();
        });
    });

    window.addEventListener("beforeunload", () => {
        localStorage.setItem("count", count);
        localStorage.setItem("history", historyList.innerHTML);
    });

    window.addEventListener("load", () => {
        count = Number(localStorage.getItem("count")) || 0;

        countDisplay.textContent = count;

        historyList.innerHTML =
            localStorage.getItem("history") || "";
    });

Câu C2:

1.Vì sao gắn sự kiện cho 1000 phần tử là thực hành xấu?

Ví dụ:

    items.forEach(item => {
        item.addEventListener("click", handler);
    });

Nếu có 1000 phần tử:

- Tạo 1000 event listener.

- Tốn bộ nhớ.

- Tốn thời gian khởi tạo.

- Khó bảo trì.

- Phần tử thêm động sẽ không có listener.

Event Delegation giải quyết thế nào?

Thay vì:

    1000 listener

ta dùng:

    1 listener

Ví dụ:

    document.querySelector("#list")
    .addEventListener("click", (e) => {

    if (e.target.matches(".item")) {
        console.log(e.target.textContent);
    }

    });

Khi click item:

- Sự kiện nổi lên cha.

- Cha xử lý thay cho tất cả con.

Lợi ích

- Ít bộ nhớ hơn.

- Khởi tạo nhanh hơn.

- Hỗ trợ phần tử tạo động.

- Dễ quản lý.

  2.Refactor bằng DocumentFragment

Mã gốc

    for (let i = 0; i < 1000; i++) {
        const div = document.createElement("div");

        div.textContent = `Item ${i}`;

        document.body.appendChild(div);
    }

vấn đề:

    appendChild()
    → cập nhật DOM
    → tính toán layout
    → reflow

    Lặp 1000 lần

Dùng DocumentFragment

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 1000; i++) {

        const div = document.createElement("div");

        div.textContent = `Item ${i}`;

        fragment.appendChild(div);
    }

    document.body.appendChild(fragment);

Vì sao nhanh hơn ?

Cách cũ:

    DOM thật
    ├─ thêm item 1 → reflow
    ├─ thêm item 2 → reflow
    ├─ thêm item 3 → reflow
    ...
    └─ thêm item 1000 → reflow

Có thể gây hàng trăm hoặc hàng nghìn lần tính toán layout.

Với DocumentFragment

    DocumentFragment (DOM ảo tạm thời)

    ├─ item 1
    ├─ item 2
    ├─ item 3
    ...
    ├─ item 1000

    ↓ append một lần

    DOM thật

Chỉ cập nhật DOM một lần.

    1 lần append
    → 1 lần reflow
