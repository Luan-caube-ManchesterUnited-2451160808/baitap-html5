// ============================================================
// Câu A1 — var / let / const
// Chạy: node var_let_const.js
// ============================================================

console.log("=== Đoạn 1: var hoisting ===");
// Dự đoán: undefined (var được hoisted nhưng chưa gán giá trị)
console.log(x); // undefined
var x = 5;
console.log("x sau khi gán:", x); // 5

console.log("\n=== Đoạn 2: let - Temporal Dead Zone ===");
// Dự đoán: ReferenceError
try {
    console.log(y); // ReferenceError: Cannot access 'y' before initialization
    let y = 10;
} catch (e) {
    console.log("Lỗi bắt được:", e.message);
}

console.log("\n=== Đoạn 3: const không thể tái gán ===");
// Dự đoán: TypeError
try {
    const z = 15;
    z = 20; // TypeError: Assignment to constant variable.
    console.log(z);
} catch (e) {
    console.log("Lỗi bắt được:", e.message);
}

console.log("\n=== Đoạn 4: const với mảng ===");
// Dự đoán: [1, 2, 3, 4] — const không ngăn thay đổi nội dung
const arr = [1, 2, 3];
arr.push(4);
console.log(arr); // [1, 2, 3, 4]

console.log("\n=== Đoạn 5: let block scope ===");
// Dự đoán: "Trong block: 2" rồi "Ngoài block: 1"
let a = 1;
{
    let a = 2; // Biến a mới, tách biệt với a bên ngoài
    console.log("Trong block:", a); // 2
}
console.log("Ngoài block:", a); // 1

// ============================================================
// GIẢI THÍCH CÁC KẾT QUẢ KHÔNG NGỜ:
//
// 1. Đoạn 1: Tưởng sẽ ReferenceError nhưng lại undefined
//    → var được HOISTED (kéo lên đầu) nhưng chỉ khai báo, chưa gán.
//    Tương đương: var x; console.log(x); x = 5;
//
// 2. Đoạn 2: let cũng bị hoisted nhưng ở trong TDZ (Temporal Dead Zone)
//    → Truy cập trước khai báo → ReferenceError thay vì undefined
//
// 3. Đoạn 4: const arr nhưng vẫn push được
//    → const chỉ bảo vệ BINDING (tham chiếu), không bảo vệ nội dung
//    → arr = [...] sẽ lỗi, nhưng arr.push() thì được
// ============================================================
