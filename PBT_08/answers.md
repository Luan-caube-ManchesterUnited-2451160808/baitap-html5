# ANSWERS.MD — Phần A + C

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

---

### Câu A1 (5đ) — Khai báo hàm vs Biểu thức vs Mũi tên

```js
// 1. Khai báo hàm (Function Declaration)
function tinhThueBaoHiem_FD(luong) {
    const thue = luong > 11000000 ? luong * 0.10 : 0;
    const thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
}

// 2. Biểu thức hàm (Function Expression)
const tinhThueBaoHiem_FE = function(luong) {
    const thue = luong > 11000000 ? luong * 0.10 : 0;
    const thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
};

// 3. Hàm mũi tên (Arrow Function)
const tinhThueBaoHiem_AF = (luong) => {
    const thue = luong > 11000000 ? luong * 0.10 : 0;
    const thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
};
```

#### Câu hỏi: 3 cách này có khác nhau về hoisting không?

**Có khác nhau.** Cụ thể:

| Cách viết | Hoisted? | Gọi trước khai báo được không? |
|---|---|---|
| Function Declaration | ✅ Có (toàn bộ thân hàm) | ✅ Được |
| Function Expression | ⚠️ Chỉ biến (`undefined`) | ❌ TypeError |
| Arrow Function | ⚠️ Chỉ biến (`undefined`) | ❌ TypeError |

```js
// Ví dụ minh họa hoisting:

// ✅ Function Declaration — gọi TRƯỚC khai báo OK
console.log(fd(5)); // → { thue: 0, thuc_nhan: 5 }
function fd(luong) {
    return { thue: luong > 11000000 ? luong * 0.1 : 0, thuc_nhan: luong };
}

// ❌ Function Expression — gọi trước → TypeError
try {
    console.log(fe(5)); // TypeError: fe is not a function
} catch(e) { console.log(e.message); }
const fe = function(luong) { return luong; };

// ❌ Arrow Function — gọi trước → ReferenceError (với let/const)
try {
    console.log(af(5)); // ReferenceError: Cannot access 'af' before initialization
} catch(e) { console.log(e.message); }
const af = (luong) => luong;
```

**Giải thích:** Function Declaration được JavaScript đưa toàn bộ (tên + thân hàm) lên đầu scope trong giai đoạn compile. Function Expression và Arrow Function chỉ đưa tên biến lên, giá trị gán vẫn ở chỗ khai báo → gọi trước sẽ lỗi.

---

### Câu A2 (5đ) — Phạm vi & Closure

#### Đoạn 1 — Kết quả dự kiến:

```js
console.log(c.increment());  // → 1
console.log(c.increment());  // → 2
console.log(c.increment());  // → 3
console.log(c.decrement());  // → 2
console.log(c.getCount());   // → 2
```

**Giải thích:** Hàm `counter()` trả về một object chứa 3 arrow function, tất cả đều **closure** — cùng tham chiếu đến biến `count` trong scope của `counter()`. Mỗi lần `increment()` được gọi, `count` tăng 1 và giá trị mới được trả về (`++count` là pre-increment). `decrement()` giảm 1. `getCount()` chỉ đọc, không thay đổi.

#### Đoạn 2 — Output sau 200ms:

```
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
```

**Giải thích tại sao `var` và `let` cho kết quả khác nhau:**

- **`var` có function scope (hoặc global scope):** Biến `i` chỉ có 1 bản duy nhất, dùng chung cho toàn bộ vòng lặp và các callback `setTimeout`. Khi các callback chạy sau 100ms, vòng lặp đã chạy xong và `i = 3` → tất cả in ra `3`.

- **`let` có block scope:** Mỗi lần lặp tạo ra một **binding mới** cho `j`. Mỗi callback `setTimeout` giữ tham chiếu đến bản `j` của **lần lặp đó** → in ra `0`, `1`, `2` đúng như mong đợi.

```
Cơ chế:
  var i: [i=0] → [i=1] → [i=2] → [i=3]  ← 3 closures cùng trỏ vào 1 ô nhớ
  let j: [j=0]   [j=1]   [j=2]           ← mỗi closure trỏ vào ô nhớ riêng
```

---

### Câu A3 (5đ) — Phương thức mảng

```js
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn
const chan = nums.filter(n => n % 2 === 0);
// → [2, 4, 6, 8, 10]

// 2. Nhân mỗi số với 3
const nhan3 = nums.map(n => n * 3);
// → [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]

// 3. Tính tổng tất cả
const tong = nums.reduce((acc, n) => acc + n, 0);
// → 55

// 4. Tìm số đầu tiên > 7
const dauTien = nums.find(n => n > 7);
// → 8

// 5. Kiểm tra CÓ số > 10 không
const coLon10 = nums.some(n => n > 10);
// → false

// 6. Kiểm tra TẤT CẢ đều > 0
const tatCaDuong = nums.every(n => n > 0);
// → true

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
const chanLe = nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);
// → ["Số 1 là lẻ", "Số 2 là chẵn", ...]

// 8. Đảo ngược mảng (không mutate gốc)
const nguoc = [...nums].reverse();
// → [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

---

### Câu A4 (5đ) — Destructuring & Spread

#### Kết quả dự kiến:

```js
const { name, price, specs: { ram, color } } = product;
console.log(name, price, ram, color);  // → "iPhone 16" 25990000 8 "Titan"
console.log(specs);                     // → ReferenceError: specs is not defined
```

> **Lý do:** `specs: { ram, color }` là nested destructuring — tên `specs` được dùng như **key** để truy cập, không tạo biến `specs`. Chỉ có `ram` và `color` được tạo ra.

```js
const updated = { ...product, price: 23990000, sale: true };
console.log(updated.price);   // → 23990000  (bị ghi đè bởi spread)
console.log(updated.sale);    // → true
console.log(product.price);   // → 25990000  (gốc KHÔNG đổi — spread là shallow copy)
```

```js
const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram); // → 16
```

> **Tại sao là 16?** Spread operator (`...`) chỉ thực hiện **shallow copy** (sao chép nông). `copy.specs` và `product.specs` **cùng trỏ vào một object** trong bộ nhớ. Khi ta sửa `copy.specs.ram`, ta đang sửa trực tiếp object gốc → `product.specs.ram` cũng thay đổi theo.
>
> Để tránh: dùng deep copy như `structuredClone(product)` hoặc `JSON.parse(JSON.stringify(product))`.

---

## PHẦN C — SUY LUẬN

---

### Câu C1 (10đ) — Refactor

```js
// SAU (clean code — ~8 dòng logic):
const processOrders = (orders) =>
    orders
        .filter(o => o.status === "completed" && o.total > 100000)
        .map(({ id, customer, total }) => ({
            id,
            customer,
            total,
            discount: total * 0.1,
            finalTotal: total * 0.9
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);
```

**Giải thích những cải tiến:**
1. **`filter`** thay for-loop lồng if-if → loại bỏ ngay những đơn không hợp lệ
2. **`map` + destructuring** thay object literal thủ công → rõ ràng, tránh lặp `orders[i]`
3. **`sort`** với comparator thay bubble sort O(n²) → tận dụng built-in sort O(n log n)
4. Dùng **arrow function** và **method chaining** → code đọc như văn xuôi
5. Dùng `const` thay `var` → tránh hoisting bất ngờ

---

### Câu C2 (10đ) — miniArray

```js
const miniArray = {
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) result.push(arr[i]);
        }
        return result;
    },

    reduce(arr, fn, initialValue) {
        let acc = initialValue;
        let startIdx = 0;

        // Nếu không có initialValue, dùng phần tử đầu tiên làm accumulator
        if (acc === undefined) {
            acc = arr[0];
            startIdx = 1;
        }

        for (let i = startIdx; i < arr.length; i++) {
            acc = fn(acc, arr[i], i, arr);
        }
        return acc;
    }
};

// Test:
console.log(miniArray.map([1,2,3], x => x * 2));           // → [2, 4, 6]
console.log(miniArray.filter([1,2,3,4], x => x > 2));       // → [3, 4]
console.log(miniArray.reduce([1,2,3,4], (a,b) => a+b, 0));  // → 10
```

**Giải thích thiết kế:**
- Mỗi hàm đều truyền `(element, index, array)` vào `fn` → đúng với API chuẩn của JS
- `reduce` xử lý cả trường hợp không có `initialValue` (dùng `arr[0]` và bắt đầu từ index 1)
- Các hàm **không mutate** mảng gốc — luôn tạo `result` mới
