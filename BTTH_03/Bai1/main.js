// 1. Dữ liệu
let dsSinhVien = JSON.parse(localStorage.getItem("students")) || [];

// 2. Hàm vẽ bảng (Đã sửa nút Sửa gọi đúng hàm openModal)
function renderTable() {
  const tbody = document.getElementById("student-list");
  tbody.innerHTML = "";
  let tongDiem = 0;

  dsSinhVien.forEach((sv, index) => {
    tongDiem += parseFloat(sv.diemTB);
    tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${sv.maSV}</td>
                <td>${sv.hoTen}</td>
                <td>${sv.ngaySinh}</td>
                <td>${sv.lopHoc}</td>
                <td>${sv.diemTB}</td>
                <td>
                    <button class="button2" onclick="openModal(${index})">Sửa</button>
                    <button class="button3" onclick="xoaSinhVien(${index})">Xóa</button>
                </td>
            </tr>`;
  });

  document.getElementById("tong-sv").innerText = dsSinhVien.length;
  document.getElementById("diem-tb").innerText =
    dsSinhVien.length > 0 ? (tongDiem / dsSinhVien.length).toFixed(1) : 0;

  localStorage.setItem("students", JSON.stringify(dsSinhVien));
}

// 3. Hàm mở Modal (Xử lý việc đổ dữ liệu khi Sửa)
function openModal(index = -1) {
  const modal = document.getElementById("studentModal");
  const form = document.getElementById("studentForm");

  modal.style.display = "block";
  form.reset(); // Xóa trắng form trước

  // Lưu index vào ô hidden (Thêm = -1, Sửa = 0,1,2...)
  document.getElementById("editIndex").value = index;

  if (index === -1) {
    document.getElementById("modalTitle").innerText = "THÊM SINH VIÊN";
  } else {
    // CHẾ ĐỘ SỬA: Đổ dữ liệu vào các ô input
    document.getElementById("modalTitle").innerText = "SỬA SINH VIÊN";

    const sv = dsSinhVien[index]; // Lấy đúng sinh viên trong mảng

    // Gán giá trị vào các ô input trong form
    document.getElementById("maSV").value = sv.maSV;
    document.getElementById("hoTen").value = sv.hoTen;
    document.getElementById("ngaySinh").value = sv.ngaySinh;
    document.getElementById("lopHoc").value = sv.lopHoc;
    document.getElementById("diemTB").value = sv.diemTB;
  }
}

// 4. Hàm đóng Modal
function closeModal() {
  document.getElementById("studentModal").style.display = "none";
}

// 5. Hàm Lưu dữ liệu (Submit)
document.getElementById("studentForm").onsubmit = function (e) {
  e.preventDefault();
  const index = parseInt(document.getElementById("editIndex").value);

  const svMoi = {
    maSV: document.getElementById("maSV").value,
    hoTen: document.getElementById("hoTen").value,
    ngaySinh: document.getElementById("ngaySinh").value,
    lopHoc: document.getElementById("lopHoc").value,
    diemTB: document.getElementById("diemTB").value,
  };

  if (index === -1) {
    dsSinhVien.push(svMoi); // Thêm mới
  } else {
    dsSinhVien[index] = svMoi; // Ghi đè vào vị trí cũ (Sửa)
  }

  renderTable();
  closeModal();
};

// 6. Xóa sinh viên
function xoaSinhVien(index) {
  if (confirm("Xóa thật không?")) {
    dsSinhVien.splice(index, 1);
    renderTable();
  }
}

renderTable();
