PHẦN A:

Câu A1:

1.  Thẻ <meta viewport>

        <meta name="viewport" content="width=device-width, initial-scale=1.0">

- Giải thích các thuộc tính:
  - width=device-width: Thiết lập chiều rộng của vùng nhìn (viewport) khớp với chiều rộng thực tế của màn hình thiết bị.
  - initial-scale=1.0: Đặt mức độ thu phóng (zoom) ban đầu là 100% khi trang web vừa được tải xong.

2.  Nếu THIẾU thẻ này trên iPhone

    iPhone (và hầu hết smartphone) sẽ giả định rằng trang web của bạn chỉ dành cho máy tính để bàn (Desktop). Trình duyệt sẽ tự động render trang web ở độ rộng khoảng 980px, sau đó tự động thu nhỏ (zoom out) toàn bộ trang để vừa khít với màn hình điện thoại.

         + Hệ quả: Chữ sẽ cực kỳ nhỏ (không đọc được), các nút bấm quá bé để chạm chính xác và người dùng phải dùng hai ngón tay để phóng to từng phần để xem.

3.

-Mobile-First

+Thiết kế cho điện thoại trước, sau đó mở rộng cho màn hình lớn hơn.

    /* Mobile */

    .product {
    width: 100%;
    }

    /_ Tablet và Desktop _/
    @media (min-width: 768px) {
    .product {
    width: 50%;
    }
    }

- Nguyên tắc: CSS mặc định dành cho mobile, dùng min-width.

-Desktop-First

- Thiết kế cho desktop trước, sau đó thu nhỏ cho thiết bị nhỏ hơn.

        /* Desktop */
        .product {
            width: 25%;
        }

        /* Mobile */
        @media (max-width: 768px) {
        .product {
            width: 100%;
        }
        }

* Nguyên tắc: CSS mặc định dành cho desktop, dùng max-width.

4. Tại sao Mobile-First được khuyên dùng?

- Phần lớn người dùng truy cập bằng điện thoại.

- CSS đơn giản hơn, chỉ bổ sung khi màn hình lớn.

- Hiệu năng tốt hơn trên thiết bị yếu.

- Dễ xây dựng giao diện responsive.

- Được khuyến nghị bởi Google và là hướng tiếp cận hiện đại.

Câu A2:

Tiêu chuẩn Bootstrap 5

| Breakpoint              | Pixel    | Thiết bị đại diện | Số cột sản phẩm gợi ý |
| ----------------------- | -------- | ----------------- | --------------------- |
| Extra Small (xs)        | < 576px  | Điện thoại nhỏ    | 1 cột                 |
| Small (sm)              | ≥ 576px  | Điện thoại lớn    | 2 cột                 |
| Medium (md)             | ≥ 768px  | Tablet            | 3 cột                 |
| Large (lg)              | ≥ 992px  | Laptop            | 4 cột                 |
| Extra Large (xl)        | ≥ 1200px | Desktop lớn       | 5 cột                 |
| Extra Extra Large (xxl) | ≥ 1400px | Màn hình rất lớn  | 6 cột                 |

Ví dụ Responsive Grid sản phẩm

    .products {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
    }

    /_ ≥576px _/
        @media (min-width: 576px) {
    .products {
    grid-template-columns: repeat(2,  1fr);
    }
    }

    /_ ≥768px _/
        @media (min-width: 768px) {
    .products {
    grid-template-columns: repeat(3, 1fr);
    }
    }

    /_ ≥992px _/
        @media (min-width: 992px) {
    .products {
    grid-template-columns: repeat(4, 1fr);
    }
    }

    /_ ≥1200px _/
        @media (min-width: 1200px) {
    .products {
    grid-template-columns: repeat(5, 1fr);
    }
    }

Câu A3:

CSS:

    .container { width: 100%; padding: 10px; }

    @media (min-width: 576px) { .container { width: 540px; } }
    @media (min-width: 768px) { .container { width: 720px; } }
    @media (min-width: 992px) { .container { width: 960px; } }
    @media (min-width: 1200px) { .container { width: 1140px; } }

-Nguyên tắc:

- Trình duyệt áp dụng media query có điều kiện đúng.
- Nếu nhiều media query cùng đúng, CSS khai báo sau sẽ ghi đè CSS trước.

  | Kích thước màn hình | Width của `.container` |
  | ------------------- | ---------------------- |
  | 375px (iPhone SE)   | 100% (≈ 375px)         |
  | 600px               | 540px                  |
  | 800px               | 720px                  |
  | 1000px              | 960px                  |
  | 1400px              | 1140px                 |

-Giải thích:

- 375px < 576px → không media query nào chạy → width:100%

* 600px ≥ 576px → width:540px

* 800px ≥ 768px → width:720px

* 1000px ≥ 992px → width:960px

* 1400px ≥ 1200px → width:1140px

Lưu ý: padding: 10px không làm thay đổi giá trị thuộc tính width, nhưng sẽ ảnh hưởng kích thước thực tế hiển thị nếu không dùng box-sizing: border-box.

Câu A4:

1.Biến

SCSS:

    $primary-color: #3498db;

    .button {
    background: $primary-color;
    }

CSS sau khi biên dịch:

    .button {
    background: #3498db;
    }

- Lợi ích

* Dễ thay đổi màu sắc, font, kích thước.
* Chỉ sửa một nơi, toàn bộ dự án cập nhật.

2. Nesting

SCSS:

    .nav {
        background: black;

    ul {
            margin: 0;
    }

    li {
        display: inline-block;
    }

    a {
        color: white;
    }
    }

CSS:

    .nav {
        background: black;
    }

    .nav ul {
        margin: 0;
    }

    .nav li {
        display: inline-block;
    }

    .nav a {
        color: white;
    }

- Lợi ích

* Dễ đọc.
* Thể hiện rõ quan hệ cha-con.

  3.Mixins

  SCSS:

        @mixin button-style {
            padding: 10px 20px;
            border-radius: 5px;
            color: white;
        }

        .btn-primary {
            @include button-style;
            background: blue;
        }

        .btn-danger {
            @include button-style;
            background: red;
        }

CSS:

    .btn-primary {
        padding: 10px 20px;
        border-radius: 5px;
        color: white;
        background: blue;
    }

    .btn-danger {
        padding: 10px 20px;
        border-radius: 5px;
        color: white;
        background: red;
    }

-Lợi ích

- Tránh lặp code.
- Dễ bảo trì.

4. @extend

SCSS:

    .message {
        padding: 10px;
        border: 1px solid #ccc;
    }

    .success {
        @extend .message;
        color: green;
    }

CSS:

    .message,
    .success {
        padding: 10px;
    border: 1px solid #ccc;
    }

    .success {
        color: green;
    }

-Lợi ích

- Tái sử dụng CSS.
- Giảm số dòng mã.

-Tại sao trình duyệt KHÔNG đọc được file .scss?

- Trình duyệt chỉ hiểu HTML, CSS và JavaScript.

- SCSS là CSS mở rộng (preprocessor language), có cú pháp đặc biệt như:
  - $variable

  - @mixin

  - @extend

  - Nesting

Ví dụ:

    $color: red;

-Cần bước gì để chuyển SCSS → CSS?

    style.scss
        ↓
    Sass Compiler
        ↓
    style.css
        ↓
    Trình duyệt đọc CSS

PHẦN C:

Câu C1:

-Điều hướng (Navigation)

- Desktop (1440px): Thanh điều hướng bên trái (Sidebar) hiển thị đầy đủ các mục như "Trang chủ", "Shorts", "Kênh đăng ký",... kèm theo icon và chữ.

- Tablet (768px): Thanh bên trái thường thu nhỏ lại chỉ còn các icon (mini-sidebar) để dành không gian cho nội dung video.

- Mobile (375px): Thanh bên biến mất hoàn toàn. Hệ thống điều hướng chuyển xuống Bottom Navigation Bar (thanh dưới cùng) với các tab chính, giúp người dùng dễ dàng thao tác bằng ngón tay cái.

-Nội dung lưới (Grid System)

- Desktop (1440px): Hiển thị khoảng 4 đến 5 cột video trên một hàng tùy vào độ rộng sidebar.

- Tablet (768px): Số cột giảm xuống còn khoảng 2 hoặc 3 cột. Kích thước hình ảnh thu nhỏ (thumbnail) được điều chỉnh để cân đối với chiều ngang.

- Mobile (375px): Chuyển sang dạng 1 cột duy nhất. Mỗi video chiếm trọn chiều ngang màn hình để tối ưu diện tích hiển thị trên màn hình nhỏ.

-Thành phần bị ẩn (Hidden Elements)

- Mobile: Các nút chức năng phụ như "Tải về", "Cảm ơn", hoặc các bộ lọc tìm kiếm chi tiết thường bị đẩy vào menu "Ba chấm" hoặc ẩn bớt để tránh rối mắt. Phần danh sách phát (Playlist) bên phải khi xem video cũng được đẩy xuống dưới phần bình luận.

-Cỡ chữ (Typography)

- Cỡ chữ tiêu đề video trên Desktop thường lớn hơn (khoảng 16px-18px). Trên Mobile, tiêu đề có thể nhỏ hơn một chút (14px-15px) và khoảng cách giữa các dòng (line-height) được nới rộng để dễ đọc hơn.

Câu A2:

    /* 1. Reset & Cơ bản */
    * { box-sizing:                     border-box;                         margin: 0; padding: 0; }
    .container { width: 100%; padding: 20px; }

    /* 2. Mobile Layout (Mặc định) */
    header { display: flex; justify-content: space-between; align-items: center; }

    .hero { height: 300px; background: #eee; }

    .food-grid {
        display: grid;
        grid-template-columns: 1fr; /* 1 cột trên mobile */
        gap: 15px;
    }

    .booking-section {
        display: grid;
        grid-template-columns: 1fr; /* Form và Map chồng lên nhau */
        gap: 20px;
    }

    /* 3. Tablet Layout (768px trở lên) */
    @media (min-width: 768px) {
        .food-grid {
            grid-template-columns: repeat(2, 1fr); /* 2 cột trên tablet */
        }

    .booking-section {
        grid-template-columns: 1fr 1fr; /* Form và Map nằm cạnh nhau */
    }
    }

    /* 4. Desktop Layout (1024px trở lên) */
    @media (min-width: 1024px) {
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

    .food-grid {
        grid-template-columns: repeat(3, 1fr); /* 3 cột trên desktop */
    }

    header {
        padding: 20px 0;
    }
    }
