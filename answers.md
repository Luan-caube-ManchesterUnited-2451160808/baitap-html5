# ANSWERS — Phần A & C1

## Câu A1 — var / let / const

### Dự đoán đầu ra:

**Đoạn 1:**
```js
console.log(x); // undefined
var x = 5;
```
- **Kết quả:** `undefined`
- **Giải thích:** `var` được **hoisting** lên đầu scope, nhưng chỉ khai báo được hoisted, không phải giá trị. Nên `x` tồn tại nhưng chưa được gán giá trị.

---

**Đoạn 2:**
```js
console.log(y); // ReferenceError
let y = 10;
```
- **Kết quả:** `ReferenceError: Cannot access 'y' before initialization`
- **Giải thích:** `let` cũng bị hoisting, nhưng nằm trong **Temporal Dead Zone (TDZ)** — không thể truy cập trước khi khai báo.

---

**Đoạn 3:**
```js
const z = 15;
z = 20; // TypeError
```
- **Kết quả:** `TypeError: Assignment to constant variable.`
- **Giải thích:** `const` không thể tái gán giá trị sau khi khai báo.

---

**Đoạn 4:**
```js
const arr = [1, 2, 3];
arr.push(4);
console.log(arr); // [1, 2, 3, 4]
```
- **Kết quả:** `[1, 2, 3, 4]`
- **Giải thích:** `const` chỉ ngăn tái gán biến (không thể `arr = [...]`), nhưng **vẫn có thể thay đổi nội dung** của object/array.

---

**Đoạn 5:**
```js
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a); // 2
}
console.log("Ngoài block:", a); // 1
```
- **Kết quả:** `Trong block: 2` rồi `Ngoài block: 1`
- **Giải thích:** `let` có **block scope**. Biến `a` trong `{}` là biến riêng biệt, không ảnh hưởng đến `a` bên ngoài.

---

## Câu A2 — Kiểu dữ liệu và Ép kiểu

| Biểu thức | Kết quả | Giải thích |
|---|---|---|
| `typeof null` | `"object"` | Lỗi lịch sử của JS từ phiên bản đầu, không được sửa để giữ backward compatibility |
| `typeof undefined` | `"undefined"` | Đúng như tên gọi |
| `typeof NaN` | `"number"` | NaN là "Not a Number" nhưng kiểu vẫn là number |
| `"5" + 3` | `"53"` | `+` với string → nối chuỗi (string concatenation) |
| `"5" - 3` | `2` | `-` không có nghĩa với string → ép kiểu number |
| `"5" * "3"` | `15` | `*` ép cả hai về number |
| `true + true` | `2` | `true` ép thành `1`, nên `1 + 1 = 2` |
| `[] + []` | `""` | Mảng rỗng `.toString()` = `""`, nên `"" + "" = ""` |
| `[] + {}` | `"[object Object]"` | `[].toString() = ""`, `{}.toString() = "[object Object]"` |
| `{} + []` | `0` | `{}` ở đầu dòng được hiểu là **block rỗng**, `+[]` = `+""` = `0` |

### Tại sao `"5" + 3` và `"5" - 3` khác nhau?
- Toán tử `+` là **đa năng**: vừa cộng số, vừa nối chuỗi. Khi có một operand là string, JS ưu tiên **string concatenation**.
- Toán tử `-`, `*`, `/` chỉ dùng cho số → JS buộc phải **ép kiểu (coerce)** string `"5"` thành number `5`.

---

## Câu A3 — So sánh == vs ===

| Biểu thức | Kết quả | Giải thích |
|---|---|---|
| `5 == "5"` | `true` | `==` ép kiểu: `"5"` → `5`, rồi so sánh |
| `5 === "5"` | `false` | `===` không ép kiểu: number ≠ string |
| `null == undefined` | `true` | Quy tắc đặc biệt của JS: `null` và `undefined` chỉ bằng nhau |
| `null === undefined` | `false` | Khác kiểu: `null` ≠ `undefined` |
| `NaN == NaN` | `false` | NaN không bằng bất cứ thứ gì, kể cả chính nó |
| `0 == false` | `true` | `false` → `0`, rồi `0 == 0` |
| `0 === false` | `false` | number ≠ boolean |
| `"" == false` | `true` | `false` → `0`, `""` → `0`, rồi `0 == 0` |

### Quy tắc: Nên dùng `===`!
Lý do:
1. `===` (strict equality) **không ép kiểu** → kết quả dễ đoán, ít bug ẩn.
2. `==` (loose equality) có bảng ép kiểu phức tạp → dễ gây nhầm lẫn (`null == 0` là `false` nhưng `null == undefined` là `true`).
3. Toàn bộ linter (ESLint) và style guide uy tín (Airbnb, Google) đều khuyến nghị dùng `===`.

---

## Câu A4 — Truthy & Falsy

### Tất cả giá trị Falsy trong JavaScript (chỉ 7 giá trị):
1. `false`
2. `0` (và `-0`, `0n`)
3. `""` (chuỗi rỗng)
4. `null`
5. `undefined`
6. `NaN`

> **Tất cả giá trị còn lại đều là Truthy**, bao gồm: `"0"`, `[]`, `{}`, `" "`, `-1`, v.v.

### Dự đoán kết quả:

| Điều kiện | In ra? | Lý do |
|---|---|---|
| `if ("0")` | **In "A"** | `"0"` là string không rỗng → Truthy |
| `if ("")` | **Không in** | `""` là Falsy |
| `if ([])` | **In "C"** | Mảng rỗng vẫn là object → Truthy |
| `if ({})` | **In "D"** | Object rỗng vẫn là object → Truthy |
| `if (null)` | **Không in** | `null` là Falsy |
| `if (0)` | **Không in** | `0` là Falsy |
| `if (-1)` | **In "G"** | Mọi số khác 0 đều Truthy |
| `if (" ")` | **In "H"** | Chuỗi có khoảng trắng không rỗng → Truthy |

---

## Câu A5 — Template Literals

```js
// Cách 1:
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3:
const html = `<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;
```

**Ưu điểm của Template Literals:**
- Không cần escape dấu `"` trong HTML string
- Hỗ trợ **multiline** tự nhiên (không cần `\n`)
- Dễ đọc hơn, ít lỗi typo hơn so với nối chuỗi bằng `+`

---

## Câu C1 — Gỡ lỗi JavaScript

### Code gốc có lỗi:

```js
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ"
    }
    
    var giamGia = giaBan * phanTramGiam / 100
    let giaSauGiam = giaBan - giamGia
    
    if (giaSauGiam = 0) {          // ❌ LỖI 1: dùng = thay vì ===
        console.log("Sản phẩm miễn phí!")
    }
    
    return giaSauGiam
}

const gia = tinhGiaGiamGia("100000", 20)   // ❌ LỖI 2: "100000" là string
console.log("Giá sau giảm: " + gia + "đ")

const gia2 = tinhGiaGiamGia(50000, 110)    // ❌ LỖI 3: 110 > 100 (không hợp lệ)
console.log("Giá: " + gia2)                // In ra chuỗi lỗi thay vì số

for (var i = 0; i < 5; i++) {              // ❌ LỖI 4: dùng var thay vì let
    setTimeout(function() {
        console.log("Item " + i)           // In ra "Item 5" x5 thay vì 0,1,2,3,4
    }, 1000)
}
```

### Danh sách lỗi và cách sửa:

| # | Dòng | Lỗi | Giải thích | Cách sửa |
|---|---|---|---|---|
| 1 | `if (giaSauGiam = 0)` | **Assignment thay vì comparison** | `=` gán giá trị `0` cho `giaSauGiam` → luôn falsy → không bao giờ in "miễn phí" và hàm trả về `0` | Sửa thành `===` |
| 2 | `"100000"` | **String thay vì Number** | `giaBan` là string → `"100000" * 20 / 100 = 20000` (JS tự ép kiểu nhưng không nhất quán) → cần validate | Thêm `parseFloat()` hoặc truyền `100000` |
| 3 | `phanTramGiam > 100` | **Logic đúng nhưng test case sai** | Hàm đúng khi trả về lỗi, nhưng người dùng có thể không biết | Thêm validation rõ ràng hơn |
| 4 | `var i` trong `for` + `setTimeout` | **Closure + var scope bug** | `var` có function scope → khi setTimeout chạy, vòng lặp đã xong, `i = 5` → in "Item 5" x5 | Sửa thành `let i` |
| 5 | Thiếu validation input `giaBan` | Không kiểm tra `isNaN(giaBan)` | Nếu truyền string không phải số → kết quả `NaN` | Thêm `if (isNaN(giaBan))` |
| 6 | `var giamGia` | **Dùng var không cần thiết** | Nên dùng `const` vì giá trị không thay đổi | Sửa thành `const` |

### Code đã sửa:

```js
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    // Sửa lỗi 5: validate input
    if (isNaN(giaBan) || isNaN(phanTramGiam)) {
        return "Lỗi: Input không hợp lệ";
    }
    
    const gia = Number(giaBan); // Sửa lỗi 2: ép kiểu rõ ràng
    
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ";
    }
    
    const giamGia = gia * phanTramGiam / 100; // Sửa lỗi 6: dùng const
    const giaSauGiam = gia - giamGia;
    
    if (giaSauGiam === 0) { // Sửa lỗi 1: === thay vì =
        console.log("Sản phẩm miễn phí!");
    }
    
    return giaSauGiam;
}

// Sửa lỗi 4: let thay vì var
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i); // Bây giờ in đúng: 0, 1, 2, 3, 4
    }, 1000);
}
```

### Giải thích lỗi ẩn `var` trong vòng lặp:

```js
// ❌ Dùng var:
for (var i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), 1000);
}
// Output: 5 5 5 5 5
// Lý do: var có function scope, setTimeout callback tham chiếu
// cùng một biến i. Khi chạy, vòng lặp đã xong, i = 5.

// ✅ Dùng let:
for (let i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), 1000);
}
// Output: 0 1 2 3 4
// Lý do: let có block scope, mỗi vòng lặp tạo ra một
// closure mới với giá trị i riêng biệt.
```
