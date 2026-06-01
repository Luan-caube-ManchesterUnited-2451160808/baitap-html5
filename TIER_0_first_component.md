1.

Tệp .jsx khác tệp .js như thế nào?

- Về bản chất: .js là JavaScript thuần túy. .jsx là JavaScript XML, một cú pháp mở rộng cho phép bạn viết mã trông giống như HTML ngay bên trong tệp JavaScript.

- Hoạt động: Trình duyệt không đọc trực tiếp được .jsx. Khi bạn chạy lệnh npm run dev, Vite sẽ sử dụng một bộ chuyển đổi để dịch mã JSX thành các hàm JavaScript thuần (React.createElement).

- Tại sao dùng? Nó giúp mã nguồn trực quan hơn, dễ hình dung cấu trúc UI hơn so với việc gọi hàng loạt hàm JavaScript để tạo phần tử.

Tại sao phải export default App?

Trong hệ thống module của JavaScript:

- Mỗi tệp .jsx thường được coi là một Component (linh kiện) riêng biệt.

- Để sử dụng App trong tệp main.jsx (nơi gắn React vào HTML), bạn phải "xuất khẩu" nó ra.

- export default giúp bạn xuất một đối tượng chính duy nhất từ tệp đó. Khi sang tệp khác, bạn có thể import nó với bất kỳ tên nào mà không cần dùng dấu ngoặc nhọn { }.

Thử xóa export default → Chuyện gì xảy ra?

- Chương trình sẽ báo lỗi ngay lập tức. Tệp main.jsx sẽ không tìm thấy thành phần nào được xuất ra từ App.jsx. Trình duyệt thường sẽ hiện màn hình trắng hoặc thông báo: "The requested module does not provide an export named 'default'".

2.

Bài 1:

    function UserProfile() {
        return (
            <div className="profile">
                <h1>Hồ sơ cá nhân</h1>
                {/* img là thẻ đơn nên phải đóng bằng /> */}
                <img src="photo.jpg" alt="Ảnh đại diện" />
                <table>
                    <tbody>
                        <tr>
                            <td>Họ tên:</td>
                            <td>Minh</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>minh@example.com</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    export default UserProfile;

Bài 2:

    function ProductInfo() {
        return (
            <div className="product">
                <h2>iPhone 15</h2>
                <p className="price">25.000.000đ</p>
                <ul>
                    <li>Màn hình: 6.1 inch</li>
                    <li>Camera: 48MP</li>
                    <li>Pin: 3349 mAh</li>
                </ul>
                <button type="button">Mua ngay</button>
            </div>
        );
    }

    export default ProductInfo;
