const form = document.getElementById("registrationForm");
const submitBtn = document.getElementById("submitBtn");
const fields = {
  username: document.getElementById("username"),
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  confirm: document.getElementById("confirmPassword"),
  phone: document.getElementById("phone"),
};

// --- HÀM XỬ LÝ CHÍNH ---

// 1. Tên (2-50 ký tự)
fields.username.addEventListener("input", () => {
  const val = fields.username.value.trim();
  const status = document.getElementById("nameStatus");
  if (val.length >= 2 && val.length <= 50) {
    status.textContent = "✅";
    fields.username.classList.add("is-valid");
    fields.username.classList.remove("is-invalid");
  } else {
    status.textContent = val.length > 0 ? "❌" : "";
    fields.username.classList.add("is-invalid");
    fields.username.classList.remove("is-valid");
  }
  validateAll();
});

// 2. Email (Regex)
fields.email.addEventListener("input", () => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const error = document.getElementById("emailError");
  if (regex.test(fields.email.value)) {
    error.style.display = "none";
    fields.email.classList.add("is-valid");
  } else {
    error.style.display = "block";
    fields.email.classList.remove("is-valid");
  }
  validateAll();
});

// 3. Mật khẩu & Độ mạnh
fields.password.addEventListener("input", () => {
  const val = fields.password.value;
  const bar = document.getElementById("strengthBar");
  const text = document.getElementById("strengthText");

  let strength = 0;
  if (val.length >= 8) strength++;
  if (/[A-Z]/.test(val) && /[a-z]/.test(val)) strength++;
  if (/[0-9]/.test(val)) strength++;
  if (/[^A-Za-z0-9]/.test(val)) strength++;

  if (val.length === 0) {
    bar.style.width = "0%";
    text.textContent = "Độ mạnh: Chưa nhập";
  } else if (val.length < 8) {
    bar.style.width = "33%";
    bar.className = "progress-bar bg-danger";
    text.textContent = "Độ mạnh: Yếu (Cần ít nhất 8 ký tự)";
  } else if (strength < 4) {
    bar.style.width = "66%";
    bar.className = "progress-bar bg-warning";
    text.textContent = "Độ mạnh: Trung bình";
  } else {
    bar.style.width = "100%";
    bar.className = "progress-bar bg-success";
    text.textContent = "Độ mạnh: Rất mạnh";
  }
  checkMatch();
  validateAll();
});

// 4. Khớp mật khẩu
function checkMatch() {
  const error = document.getElementById("confirmError");
  if (
    fields.confirm.value === fields.password.value &&
    fields.confirm.value !== ""
  ) {
    error.style.display = "none";
    fields.confirm.classList.add("is-valid");
  } else {
    error.style.display = fields.confirm.value.length > 0 ? "block" : "none";
    fields.confirm.classList.remove("is-valid");
  }
}
fields.confirm.addEventListener("input", () => {
  checkMatch();
  validateAll();
});

// 5. Điện thoại (Auto-format)
fields.phone.addEventListener("input", (e) => {
  let val = e.target.value.replace(/\D/g, ""); // Xóa ký tự không phải số
  let formatted = "";
  if (val.length > 0) {
    formatted += val.substring(0, 4);
    if (val.length > 4) formatted += "-" + val.substring(4, 7);
    if (val.length > 7) formatted += "-" + val.substring(7, 10);
  }
  e.target.value = formatted;
  validateAll();
});

// 6. XÁC THỰC TỔNG THỂ (Bật/Tắt nút Gửi)
function validateAll() {
  const vName = fields.username.value.trim().length >= 2;
  const vEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value);
  const vPass = fields.password.value.length >= 8;
  const vMatch =
    fields.confirm.value === fields.password.value &&
    fields.confirm.value !== "";
  const vPhone = fields.phone.value.length === 12; // 0968-691-403 có 12 ký tự

  submitBtn.disabled = !(vName && vEmail && vPass && vMatch && vPhone);
}

// 7. Gửi Form & Hiện Modal
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const info = document.getElementById("resultInfo");
  info.innerHTML = `
        <p><strong>Họ tên:</strong> ${fields.username.value}</p>
        <p><strong>Email:</strong> ${fields.email.value}</p>
        <p><strong>Điện thoại:</strong> ${fields.phone.value}</p>
    `;
  document.getElementById("successModal").style.display = "flex";
});

// Đóng Modal
document.getElementById("closeModalBtn").addEventListener("click", () => {
  document.getElementById("successModal").style.display = "none";
  form.reset();
  document.getElementById("strengthBar").style.width = "0%";
  document.getElementById("strengthText").textContent = "Độ mạnh: Chưa nhập";
  document
    .querySelectorAll(".is-valid, .is-invalid")
    .forEach((el) => el.classList.remove("is-valid", "is-invalid"));
  document.getElementById("nameStatus").textContent = "";
  validateAll();
});
