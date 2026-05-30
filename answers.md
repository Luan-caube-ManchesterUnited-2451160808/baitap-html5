# ANSWERS.MD — Phần A + C

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 (10đ) — 5 Loại Định Vị

| Chức vụ | Luôn sử dụng dung lượng trong luồng? | Tham chiếu vị trí | X theo trang? | Trường hợp sử dụng |
|---|---|---|---|---|
| `static` | ✅ Có | Không có — theo luồng bình thường | Không | Mặc định; không cần định vị đặc biệt |
| `relative` | ✅ Có (vẫn chiếm không gian gốc) | Chính nó (vị trí ban đầu của nó) | Không | Dịch chuyển nhẹ; làm "tổ tiên" cho absolute con |
| `absolute` | ❌ Không (bị lấy ra khỏi luồng) | Tổ tiên có position ≠ static gần nhất | Không | Badge, tooltip, dropdown, overlay |
| `fixed` | ❌ Không | Viewport (cửa sổ trình duyệt) | ✅ Có | Header cố định, nút "scroll to top", chat bubble |
| `sticky` | ✅ Có (vẫn chiếm không gian) | Viewport — nhưng chỉ trong phạm vi parent | ✅ Có (khi đang dính) | Sidebar dính, header dính khi cuộn |

**Câu hỏi thêm — Khi nào `absolute` tham chiếu `body`? Khi nào tham chiếu parent?**

- `absolute` tìm **tổ tiên có position ≠ static** gần nhất để làm gốc tọa độ.
- Nếu **không có tổ tiên nào** có `position: relative/absolute/fixed/sticky` → tham chiếu `<html>` (gần giống body).
- Nếu **parent hoặc tổ tiên nào đó** có `position: relative` (hoặc khác static) → tham chiếu phần tử đó.

**Khái niệm "tổ tiên ở vị trí gần nhất" (nearest positioned ancestor):**

Khi một phần tử dùng `position: absolute`, trình duyệt đi **lên cây DOM** từ phần tử đó, tìm phần tử cha đầu tiên có `position` **khác `static`** (tức là `relative`, `absolute`, `fixed`, hoặc `sticky`). Phần tử tìm được đó gọi là **"containing block"** — toàn bộ `top`, `right`, `bottom`, `left` của phần tử `absolute` được tính từ góc phần tử này.

```html
<!-- Ví dụ -->
<div class="card" style="position: relative">   ← tổ tiên gần nhất
  <span class="badge" style="position: absolute; top: 0; right: 0">HOT</span>
  <!-- Badge tính top/right từ .card, không phải body -->
</div>
```

---

### Câu A2 (10đ) — Flexbox vs Grid: Dự đoán bố cục

#### Trường hợp 1
```css
.container { display: flex; }
.item { flex: 1; }
/* 4 items */
```
**Bố cục:** 4 items nằm **1 hàng ngang**, mỗi item chiếm đều nhau (25% chiều rộng container). `flex: 1` = `flex-grow: 1; flex-shrink: 1; flex-basis: 0` → chia đều không gian còn lại.

```
[ Item 1 ][ Item 2 ][ Item 3 ][ Item 4 ]
```

---

#### Trường hợp 2
```css
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
/* 6 items */
```
Mỗi item chiếm `45% + 2.5%*2 = 50%` tổng chiều rộng → **2 items/hàng** → **3 hàng**.

```
[ Item 1 (45%) ][ Item 2 (45%) ]
[ Item 3 (45%) ][ Item 4 (45%) ]
[ Item 5 (45%) ][ Item 6 (45%) ]
```

---

#### Trường hợp 3
```css
.container { display: flex; justify-content: space-between; align-items: center; }
/* 3 items */
```
**Bố cục:** 3 items trên **1 hàng ngang**, item đầu sát trái, item cuối sát phải, item giữa ở giữa. Tất cả căn giữa theo chiều dọc.

```
[Item1]        [Item2]        [Item3]
 ←left                        right→
```

---

#### Trường hợp 4
```css
.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }
/* 3 items */
```
**Bố cục:** 1 hàng, 3 cột. Cột 1 = 200px cố định, cột 2 = phần còn lại (co giãn), cột 3 = 200px cố định.

```
[200px | Item1] [1fr | Item2 (linh hoạt)] [200px | Item3]
```

---

#### Trường hợp 5
```css
.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
/* 7 items */
```
**Bố cục:** 3 cột đều nhau. 7 items → **3 hàng** (hàng 1: 3 items, hàng 2: 3 items, hàng 3: 1 item). Item thứ 7 nằm ở **cột đầu tiên của hàng 3**, 2 ô còn lại trống.

```
[ Item1 ][ Item2 ][ Item3 ]
[ Item4 ][ Item5 ][ Item6 ]
[ Item7 ][       ][       ]
```

---

## PHẦN C — SUY LUẬN

### Câu C1 (10đ) — Flexbox vs Grid: Khi nào dùng gì?

**1. Thanh điều hướng ngang (logo + menu + nút)**
→ **Flexbox**. Đây là bố cục **1 chiều** (ngang). Flexbox xuất sắc ở việc phân bố items theo trục chính, dễ dàng đẩy logo sang trái, nút sang phải với `justify-content: space-between` hoặc `margin-left: auto`.

**2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh chưa biết trước)**
→ **Grid**. Bố cục **2 chiều** rõ ràng, số items không cố định nhưng cấu trúc cột cố định. `grid-template-columns: repeat(3, 1fr)` + `grid-auto-rows` xử lý tự động hoàn hảo.

**3. Bố cục blog: nội dung chính + thanh bên**
→ **Grid**. Đây là **page layout 2 chiều** với vùng xác định rõ ràng. `grid-template-columns: 1fr 300px` cho phép kiểm soát chính xác kích thước hai vùng.

**4. Footer với 4 cột thông tin**
→ **Grid** (hoặc Flexbox đều được). Grid rõ ràng hơn vì 4 cột đều nhau: `repeat(4, 1fr)`. Flexbox cũng ổn với `flex: 1` nếu không cần row control.

**5. Card sản phẩm (ảnh trên, văn bản giữa, nút dưới — nút luôn ở đáy)**
→ **Flexbox** (hướng cột). Dùng `display: flex; flex-direction: column` cho card, rồi `margin-top: auto` cho nút → nút luôn dính đáy dù nội dung khác chiều cao.

---

### Câu C2 (10đ) — Debug Flexbox

#### Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống

**Nguyên nhân:** Card dùng block layout thông thường, không phải flex column. Mỗi card có chiều cao khác nhau tùy nội dung, và nút không được đẩy xuống đáy.

**Sửa:**
```css
/* TRƯỚC (lỗi) */
.card-container { display: flex; flex-wrap: wrap; }
.card { width: 30%; margin: 1.5%; }

/* SAU (đã sửa) */
.card-container { display: flex; flex-wrap: wrap; align-items: stretch; }
.card {
  width: 30%;
  margin: 1.5%;
  display: flex;              /* ← thêm */
  flex-direction: column;     /* ← thêm */
}
.card .btn {
  padding: 10px;
  margin-top: auto;           /* ← thêm: đẩy nút xuống đáy */
}
```

---

#### Lỗi 2: Các mục muốn nằm giữa chiều dọc nhưng vẫn ở góc trái trên

**Nguyên nhân:** `.hero` có `display: flex` nhưng thiếu `justify-content: center` (căn giữa trục chính — ngang) và `align-items: center` (căn giữa trục phụ — dọc).

**Sửa:**
```css
/* TRƯỚC (lỗi) */
.hero {
  height: 100vh;
  display: flex;
}

/* SAU (đã sửa) */
.hero {
  height: 100vh;
  display: flex;
  justify-content: center;   /* ← căn giữa ngang */
  align-items: center;       /* ← căn giữa dọc */
}
.hero-content {
  text-align: center;
}
```

---

#### Lỗi 3: Sidebar bị co lại khi nội dung quá dài

**Nguyên nhân:** Theo mặc định, `flex-shrink: 1` — tức là tất cả flex items đều **có thể bị co**. Khi `.content` có nội dung dài, flex container muốn co sidebar để nhường chỗ.

**Sửa:**
```css
/* TRƯỚC (lỗi) */
.layout { display: flex; }
.sidebar { width: 250px; }
.content { flex: 1; }

/* SAU (đã sửa) */
.layout { display: flex; }
.sidebar {
  width: 250px;
  flex-shrink: 0;   /* ← không cho co sidebar */
}
.content { flex: 1; }
```
