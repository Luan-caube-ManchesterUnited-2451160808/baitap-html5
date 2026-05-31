// ============================================================
// Bài B2 — Xử lý dữ liệu sinh viên
// Chạy: node student_data.js
// ============================================================

const students = [
    { name: "An",    math: 8,  physics: 7, cs: 9, gender: "M" },
    { name: "Bình",  math: 6,  physics: 9, cs: 7, gender: "F" },
    { name: "Chi",   math: 9,  physics: 6, cs: 8, gender: "F" },
    { name: "Dũng",  math: 5,  physics: 5, cs: 6, gender: "M" },
    { name: "Em",    math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3,  physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7,  physics: 7, cs: 7, gender: "F" },
    { name: "Huy",   math: 4,  physics: 6, cs: 3, gender: "M" },
];

// ============================================================
// 1. Tính điểm trung bình và xếp loại
// ============================================================
function tinhTB(sv) {
    return sv.math * 0.4 + sv.physics * 0.3 + sv.cs * 0.3;
}

function xepLoai(tb) {
    if (tb >= 8.0) return "Giỏi";
    if (tb >= 6.5) return "Khá";
    if (tb >= 5.0) return "Trung bình";
    return "Yếu";
}

const ketQua = students.map((sv, index) => ({
    stt: index + 1,
    name: sv.name,
    gender: sv.gender,
    math: sv.math,
    physics: sv.physics,
    cs: sv.cs,
    tb: Math.round(tinhTB(sv) * 10) / 10,
    loai: xepLoai(tinhTB(sv))
}));

// ============================================================
// 2. In bảng kết quả
// ============================================================
console.log("╔═══╦══════════╦══════╦════════════╗");
console.log("║STT║ Tên      ║  TB  ║ Xếp loại   ║");
console.log("╠═══╬══════════╬══════╬════════════╣");

ketQua.forEach(sv => {
    const stt   = String(sv.stt).padEnd(3);
    const name  = sv.name.padEnd(8);
    const tb    = String(sv.tb).padEnd(4);
    const loai  = sv.loai.padEnd(10);
    console.log(`║ ${stt}║ ${name} ║ ${tb} ║ ${loai} ║`);
});

console.log("╚═══╩══════════╩══════╩════════════╝");

// ============================================================
// 3. Đếm số SV mỗi loại
// ============================================================
const demLoai = { "Giỏi": 0, "Khá": 0, "Trung bình": 0, "Yếu": 0 };
ketQua.forEach(sv => demLoai[sv.loai]++);

console.log("\n=== Thống kê xếp loại ===");
console.log(`Giỏi:       ${demLoai["Giỏi"]} SV`);
console.log(`Khá:        ${demLoai["Khá"]} SV`);
console.log(`Trung bình: ${demLoai["Trung bình"]} SV`);
console.log(`Yếu:        ${demLoai["Yếu"]} SV`);

// ============================================================
// 4. SV điểm TB cao nhất và thấp nhất
// ============================================================
let max = ketQua[0];
let min = ketQua[0];

ketQua.forEach(sv => {
    if (sv.tb > max.tb) max = sv;
    if (sv.tb < min.tb) min = sv;
});

console.log("\n=== Điểm cao nhất / thấp nhất ===");
console.log(`Cao nhất: ${max.name} — ${max.tb} (${max.loai})`);
console.log(`Thấp nhất: ${min.name} — ${min.tb} (${min.loai})`);

// ============================================================
// 5. Điểm TB toàn lớp từng môn
// ============================================================
let tongMath = 0, tongPhysics = 0, tongCS = 0;
students.forEach(sv => {
    tongMath    += sv.math;
    tongPhysics += sv.physics;
    tongCS      += sv.cs;
});

const n = students.length;
console.log("\n=== Điểm TB toàn lớp ===");
console.log(`Toán:         ${(tongMath / n).toFixed(2)}`);
console.log(`Vật lý:       ${(tongPhysics / n).toFixed(2)}`);
console.log(`Tin học:      ${(tongCS / n).toFixed(2)}`);

// ============================================================
// 6. BONUS: Điểm TB theo giới tính
// ============================================================
let male = { count: 0, sumTB: 0 };
let female = { count: 0, sumTB: 0 };

ketQua.forEach(sv => {
    if (sv.gender === "M") {
        male.count++;
        male.sumTB += sv.tb;
    } else {
        female.count++;
        female.sumTB += sv.tb;
    }
});

console.log("\n=== BONUS: Điểm TB theo giới tính ===");
console.log(`Nam (${male.count} SV):  TB = ${(male.sumTB / male.count).toFixed(2)}`);
console.log(`Nữ  (${female.count} SV):  TB = ${(female.sumTB / female.count).toFixed(2)}`);
