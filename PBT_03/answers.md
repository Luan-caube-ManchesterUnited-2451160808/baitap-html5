Phần A:

Câu A1:

-CSS nội tuyến:

    +Ví dụ: <h1 style="color: blue; font-size: 20px;">Chào bạn!</h1>

    +Ưu điểm: Nhanh, ưu tiên dùng cho test nhanh 1 thuộc tính nào đó hoặc 1 phần tử

    +Nhược điểm: Code trở lên rối,khó bảo trì và không tái sử dụng được

    ->Chỉ dùng khi muốn sửa nhanh 1 thuộc tính nào đó mà không muốn mở file css

-CSS nội bộ:

    +Ví dụ: <style> p {color: red;} </style>


    +Ưu điểm: Quản lý tập trung tất cả các CSS của trang web đó tại 1 nơi,không cần tạo thêm nhiều file lẻ


    +Nhược điểm: Chỉ có tác dụng duy nhất trên trang đó


    ->Chỉ nên dùng khi chỉ làm 1 trang web duy nhất hay trang đó khác biệt hoàn toàn với những trang khác

-CSS bên ngoài:

    +Ví dụ: <link rel="stylesheet" href="style.css">


    +Ưu điểm: Chuyên nghiệp nhất,dễ dàng quản lý và cập nhật cho toàn bộ website hàng nghìn trang chỉ bằng cách sửa 1 file duy nhất


    +Nhược điểm: Tốn thêm một yêu cầu tải file từ server, trang web có thể bị trắng một chút nếu file CSS tải chậm.


    ->Luôn luôn ưu tiên dùng cách này

-CSS nội tuyến thắng vì trình duyệt đọc code từ trên xuống và v CSS nội tuyến nằm trực tiếp tại phần tử, còn giữa CSS nội bộ và CSS bên ngoài, trình duyệt sẽ áp dụng quy tắc xếp chồng — quy tắc nào đọc được sau cùng sẽ là quy tắc cuối cùng được áp dụng

Câu A2:

1. h1 → Chọn: ShopTLU
2. .price → Chọn: 25.990.000đ và 45.990.000đ
3. #app header → Chọn: Toàn bộ nội dung bên trong thẻ header
4. nav a:first-child → Chọn: Home
5. .product.featured h2 → Chọn: MacBook Pro
6. article > p → Chọn: 25.990.000đ, Mô tả sản phẩm..., 45.990.000đ, Mô tả sản phẩm...
7. a[ href="/"] → Chọn: Home
8. .top-bar.dark h1 → Chọn: ShopTLU

Câu A3:

-Trường hợp 1:

    + Chiều rộng hiển thị: 450px


    + Không gian chiếm trên trang: 470px

-Trường hợp 2:

    + Chiều rộng hiển thị: 400px


    + Kích thước content thực tế: 350px


    + Không gian chiếm trên trang: 420px

-Trường hợp 3:

    + Khoảng cách giữa box-a và box-b: 40px


    + Trong CSS, khi hai lề dọc của hai phần tử nằm chồng lên nhau, chúng sẽ xảy ra hiện tượng Margin Collapse. Thay vì cộng dồn (25px + 40px), trình duyệt sẽ so sánh và chọn giá trị lớn nhất để áp dụng. Ở đây, 40px lớn hơn 25px nên khoảng cách là 40px chứ không phải 65px

Câu A4:

1.  Rule A: Selector(p), ID(0), Class(0)

    Rule B: Selector(.price), ID(0), Class(1)

    Rule C: Selector(#main-price), ID(1), Class(0)

    Rule D: Selector(p.price), ID(0), Class(1)

2.  -Kết quả: Element sẽ có màu Đỏ (Red)

    -Giải thích: Trình duyệt sẽ so sánh điểm đặc hiệu từ trái sang phải. Rule C có 1 điểm ở cột ID (cột có trọng số cao nhất), trong khi các quy tắc khác đều bằng 0 ở cột này. Vì vậy, Rule C thắng tuyệt đối, bất kể các quy tắc kia có bao nhiêu class hay element đi chăng nữa

3.  -Kết quả: Element sẽ có màu Cam (Orange)

    -Giải thích: Inline Style (viết trực tiếp trong thẻ HTML) có độ ưu tiên cao hơn tất cả các selector nằm trong file CSS bên ngoài hoặc thẻ < style> nội bộ. Nó có thể coi là nằm ở cột "cao hơn cả ID" trong hệ thống tính điểm

4.  -Kết quả: Element sẽ có màu Đen (Black)

    -Giải thích: Từ khóa !important trong CSS nó phá vỡ mọi quy tắc tính điểm đặc hiệu thông thường. Khi Rule A có !important, nó sẽ đè lên cả ID selector (Rule C) và cả Inline Style (màu cam ở câu 3)
