2.1:

    function BioCard() {
        const name = "Minh";
        const weight = 70; // kg
        const height = 1.75; // m
        const hour = new Date().getHours();

        // Logic chào hỏi
        let greeting = "Chào buổi tối";
        if (hour < 12) greeting = "Chào buổi sáng";
        else if (hour < 18) greeting = "Chào buổi chiều";

        // Tính BMI: weight / (height * height)
        const bmi = (weight / (height ** 2)).toFixed(2);

        return (
            <div style={{ padding: "20px", border: "1px solid #ccc" }}>
                <h2>{greeting}, mình là {name}!</h2>
                <p>Chỉ số BMI của bạn: <strong>{bmi}</strong></p>
                <p>Tình trạng: {bmi < 18.5 ? "Hơi gầy" : bmi < 25 ? "Cân đối" : "Thừa cân"}</p>
            </div>
        );
    }

2.2:

    function ProductStatus() {
        const isOnline = true;
        const stock = 0;
        const isLoggedIn = false;

        return (
            <div>
                {/* 1. Trạng thái Online */}
                <p>Trạng thái: {isOnline ? "🟢 Trực tuyến" : "🔴 Ngoại tuyến"}</p>

                {/* 2. Menu dựa trên login */}
                {isLoggedIn ? <button>Trang cá nhân</button> : <button>Đăng nhập ngay</button>}

                {/* 3. Hiển thị hết hàng bằng && */}
                {stock === 0 && (
                    <div style={{ color: "red", fontWeight: "bold" }}>
                        ⚠️ Rất tiếc, sản phẩm này đã HẾT HÀNG!
                    </div>
                )}
            </div>
        );
    }

2.3:

    function ProductList() {
        const products = [
            { id: 101, name: "iPhone 15", price: 25000000 },
            { id: 102, name: "Ốp lưng Luv", price: 150000 },
            { id: 103, name: "Sạc dự phòng", price: 1200000 },
            { id: 104, name: "Tai nghe", price: 800000 },
        ];

        const total = products.reduce((sum, p) => sum + p.price, 0);

        return (
            <div style={{ padding: "20px" }}>
                <h2>Giỏ hàng của bạn</h2>
                <ul>
                    {products.map((p) => (
                        <li key={p.id} style={{ marginBottom: "10px" }}>
                            {p.name} -
                            <span style={{ color: p.price > 1000000 ? "red" : "black", fontWeight: "bold" }}>
                                {p.price.toLocaleString()}đ
                            </span>
                        </li>
                    ))}
                </ul>
                <hr />
                <h3>Tổng tiền: {total.toLocaleString()}đ</h3>
            </div>
        );
    }

-Tại sao cái key lại quan trọng đến thế?

Hãy tưởng tượng bạn có một danh sách 1000 sinh viên. Nếu bạn đổi tên sinh viên thứ 500:

- Không có key: React sẽ phải vẽ lại (render) toàn bộ 1000 dòng vì nó không biết dòng nào là dòng nào.

- Có key={student.id}: React chỉ việc tìm đúng "địa chỉ" ID đó và cập nhật duy nhất một dòng đó trên màn hình.

- Dùng index làm key: Sẽ rất nguy hiểm nếu bạn xóa hoặc chèn một phần tử vào giữa mảng, vì khi đó index của các phần tử phía sau sẽ bị thay đổi hàng loạt, khiến React bị nhầm lẫn dữ liệu.
