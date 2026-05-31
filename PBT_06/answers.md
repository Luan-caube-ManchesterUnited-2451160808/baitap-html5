PHẦN A:

Câu A1:

-Mỗi box có:

    col-12 col-md-6 col-lg-3

-Ý nghĩa:

- col-12: từ kích thước nhỏ nhất trở lên, chiếm 12/12 cột (100% chiều rộng).

- col-md-6: từ breakpoint md (≥ 768px) trở lên, chiếm 6/12 cột (50% chiều rộng).

- col-lg-3: từ breakpoint lg (≥ 992px) trở lên, chiếm 3/12 cột (25% chiều rộng).

-Bootstrap dùng nguyên tắc mobile-first: breakpoint lớn hơn sẽ ghi đè breakpoint nhỏ hơn.

    | Kích hoạt          | < 768px        | 768px - 991px  | ≥ 992px        |
    | ------------------ | -------------- | -------------- | -------------- |
    | Số cột mỗi box     | 12             | 6              | 3              |
    | Số box trên 1 hàng | 1              | 2              | 4              |
    | Bố cục             | 4 hàng × 1 cột | 2 hàng × 2 cột | 1 hàng × 4 cột |

1.Màn hình nhỏ (< 768px)

        +--------+
        | Box 1  |
        +--------+

        +--------+
        | Box 2  |
        +--------+

        +--------+
        | Box 3  |
        +--------+

        +--------+
        | Box 4  |
        +--------+

Mỗi box chiếm toàn bộ chiều rộng hàng.

2.Màn hình trung bình (768px - 991px)

    +--------+--------+
    | Box 1  | Box 2  |
    +--------+--------+

    +--------+--------+
    | Box 3  | Box 4  |
    +--------+--------+

Mỗi box chiếm 6/12 cột → 2 box trên một hàng.

3.Màn hình lớn (≥ 992px)

    +-----+-----+-----+-----+
    | B1  | B2  | B3  | B4  |
    +-----+-----+-----+-----+

Mỗi box chiếm 3/12 cột → 4 box trên một hàng.

Câu hỏi thêm:

1. col-md-6 nghĩa là gì?

- md = Medium device (≥ 768px).

- 6 = chiếm 6 trong tổng 12 cột của Grid.

        col-md-6

sẽ là dư thừa vì col-12 đã bao phủ khoảng kích thước đó rồi.

    | Breakpoint    | Class có hiệu lực | Độ rộng |
    | ------------- | ----------------- | ------- |
    | < 768px       | `col-12`          | 100%    |
    | 768px - 991px | `col-md-6`        | 50%     |
    | ≥ 992px       | `col-lg-3`        | 25%     |

Câu A2:

1.Giải thích lớp d-none d-md-block

- Đây là cách kết hợp các lớp hiển thị (Display utilities) để ẩn/hiện phần tử dựa trên kích thước màn hình:

- d-none: Thiết lập display: none. Do áp dụng nguyên tắc Mobile-First, phần tử này sẽ ẩn trên tất cả các màn hình từ nhỏ nhất trở lên.

* d-md-block: Thiết lập display: block từ mốc Medium (md ≥ 768px) trở lên.

- Kết luận: Phần tử này sẽ ẩn trên Mobile (kích thước < 768px) và bắt đầu hiển thị từ màn hình Tablet/Desktop (≥ 768px) trở lên.

2. Liệt kê 5 tiện ích giãn cách (Margin/Padding)

Cú pháp chung:

    {m|p}{t|b|s|e|x|y}-{0..5|auto}

Trong đó:

- m = margin (lề ngoài)

- p = padding (lề trong)

- t = top

- b = bottom

- s = start (trái trong LTR)

- e = end (phải trong LTR)

- x = trái + phải

- y = trên + dưới

PHẦN C:

Câu C1:

1. Quy trình đổi màu $primary trong Bootstrap

-Công cụ cần thiết:

- Node.js & NPM (để cài đặt Bootstrap source qua lệnh npm install bootstrap).

* Trình biên dịch SASS (như extension Live Sass Compiler trong VS Code hoặc lệnh sass trong Terminal).

-Tập tin cần chỉnh sửa: Bạn cần tạo một file SCSS tùy biến (ví dụ: custom.scss).

-Các bước thực hiện:

- Khai báo biến trước khi import: Trong file custom.scss, bạn đặt giá trị mới cho biến $primary trước khi import các tệp của Bootstrap.

- Import Bootstrap: Sau khi định nghĩa lại biến, bạn mới thực hiện @import bộ source của Bootstrap vào.

- Biên dịch: Chạy trình biên dịch để chuyển file custom.scss thành style.css để sử dụng cho trang web.

2. Tại sao KHÔNG nên ghi đè trực tiếp .btn-primary { background: red; }?

Việc sử dụng biến SASS thay vì ghi đè CSS trực tiếp có 3 lý do quan trọng:

- Tính đồng bộ toàn hệ thống (Consistency): Trong Bootstrap, biến $primary không chỉ dùng cho nút bấm (.btn-primary) mà còn dùng cho màu chữ (.text-primary), màu nền (.bg-primary), màu viền (.border-primary), và các trạng thái thông báo. Nếu bạn chỉ dùng CSS đè lên .btn-primary, các thành phần khác vẫn sẽ mang màu xanh mặc định, gây mất cân đối cho giao diện.

- Tự động tính toán các biến phụ: SASS sẽ tự động tạo ra các biến liên quan như màu khi di chuột (hover), màu khi nhấn (active), hoặc màu đổ bóng dựa trên biến $primary gốc thông qua các hàm như darken() hay lighten(). Nếu ghi đè thủ công bằng CSS, bạn phải tự tìm và sửa hàng chục class con khác nhau.

- Dễ dàng bảo trì (Scalability): Khi khách hàng hoặc thầy cô yêu cầu đổi sang một màu khác, bạn chỉ cần thay đổi duy nhất 1 dòng mã (giá trị của biến $primary) thay vì phải đi tìm và thay thế (Find & Replace) hàng trăm dòng mã CSS trong toàn bộ dự án.

Câu C2:

1.  Thanh điều hướng responsive + thẻ sản phẩm bằng CSS thuần

HTML:

        <nav class="navbar">
        <div class="logo">Shop</div>
        <ul class="menu">
            <li>Trang chủ</li>
            <li>Sản phẩm</li>
            <li>Liên hệ</li>
            </ul>
        </nav>

        <div class="product-card">
            <img src="product.jpg" alt="">
            <h3>Điện thoại XYZ</h3>
            <p>10.000.000đ</p>
            <button>Mua ngay</button>
        </div>

CSS:

    .navbar{
        display:flex;
        justify-content:space-between;
        align-items:center;
        background:#333;
        color:white;
        padding:15px;
    }

    .menu{
        display:flex;
        list-style:none;
        gap:20px;
    }

    .product-card{
        width:300px;
        border:1px solid #ddd;
        padding:15px;
        text-align:center;
    }

    .product-card img{
        width:100%;
    }

    button{
        background:blue;
        color:white;
        padding:10px 15px;
        border:none;
    }

    @media (max-width:768px){
        .navbar{
            flex-direction:column;
        }

        .menu{
            flex-direction:column;
        }

        .product-card{
            width:100%;
        }
    }

2.Phiên bản Bootstrap

Navbar

    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand">Shop</a>
        </div>
    </nav>

Product Card

    <div class="card" style="width:18rem;">
        <img src="product.jpg" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">Điện thoại XYZ</h5>
            <p class="card-text">10.000.000đ</p>
            <a href="#" class="btn btn-primary">Mua ngay</a>
        </div>
    </div>

3. So sánh

| Tiêu chí             | CSS thuần              | Bootstrap                  |
| -------------------- | ---------------------- | -------------------------- |
| Số dòng CSS cần      | Nhiều (20–100+ dòng)   | Rất ít hoặc 0 dòng         |
| Thời gian phát triển | Chậm hơn               | Nhanh hơn                  |
| Responsive           | Tự viết Media Query    | Có sẵn Grid và Utilities   |
| Tùy biến giao diện   | Rất cao                | Bị ràng buộc bởi framework |
| Kích thước file      | Nhỏ nếu dự án đơn giản | Lớn hơn do tải framework   |
| Học tập CSS          | Hiểu sâu CSS           | Có thể phụ thuộc framework |

4.Khi nào NÊN dùng Bootstrap?

Nên dùng khi:

- Cần làm website nhanh.

- Dự án học tập, bài tập, prototype.

- Website quản trị (Admin Dashboard).

- Nhóm phát triển cần giao diện đồng nhất.

- Muốn có Grid System và Responsive sẵn.

  5.Khi nào KHÔNG NÊN dùng Bootstrap?

Không nên dùng khi:

- Cần giao diện độc đáo, thiết kế riêng hoàn toàn.

- Website yêu cầu tối ưu hiệu năng cao.

- Dự án nhỏ chỉ có vài trang đơn giản.

- Muốn học CSS nền tảng một cách đầy đủ.

- Đã có Design System riêng.
