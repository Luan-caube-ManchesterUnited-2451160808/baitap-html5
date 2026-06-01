4.1:

    import { useState } from "react";

    function NumberState() {
        const [count, setCount] = useState(0);

        // Xác định màu sắc dựa trên giá trị count
        const getCountColor = () => {
            if (count > 0) return "green";
            if (count < 0) return "red";
            return "black";
        };

        return (
            <div style={{ textAlign: "center", padding: "20px" }}>
                {/* Thay đổi màu động */}
                <h2 style={{ color: getCountColor() }}>Bộ đếm: {count}</h2>

                {/* Hiển thị trạng thái âm/dương */}
                <p>{count > 0 ? "Số dương" : count < 0 ? "Số âm" : "Số không"}</p>

                <button onClick={() => setCount(count + 1)}>+1</button>
                <button onClick={() => setCount(count - 1)}>-1</button>

                {/* Thử nghiệm: Tăng 5 */}
                <button onClick={() => setCount(count + 5)}>Tăng 5</button>

                <button onClick={() => setCount(0)}>Reset</button>
            </div>
        );
    }

4.2:

    function StringState() {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [showPass, setShowPass] = useState(false);

        return (
            <div style={{ padding: "20px" }}>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email..."
                />
                {/* Kiểm tra email hợp lệ */}
                <p style={{ color: email.includes("@") ? "green" : "red" }}>
                    {email.includes("@") ? "Email hợp lệ" : "Email thiếu @" }
                </p>
                <p>Số ký tự: {email.length}/100</p>

                <div style={{ marginTop: "10px" }}>
                    <input
                        type={showPass ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={() => setShowPass(!showPass)}>
                        {showPass ? "Ẩn" : "Hiện"}
                    </button>
                </div>
            </div>
        );
    }

4.3:

    function BooleanState() {
        const [isOpen, setIsOpen] = useState(false);
        const [isOn, setIsOn] = useState(false);

        return (
            <div style={{ padding: "20px" }}>
                {/* Accordion đơn giản */}
                <div style={{ border: "1px solid #ccc", marginBottom: "20px" }}>
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        style={{ cursor: "pointer", background: "#eee", padding: "10px" }}
                    >
                        Mẹo học React? (Click me)
                    </div>
                    {isOpen && <div style={{ padding: "10px" }}>Chia nhỏ component và thực hành nhiều!</div>}
                </div>

                {/* Bóng đèn */}
                <div style={{ fontSize: "50px" }}>{isOn ? "💡" : "🌑"}</div>
                <button onClick={() => setIsOn(!isOn)}>
                    {isOn ? "Tắt đèn" : "Bật đèn"}
                </button>
            </div>
        );
    }

4.4:

    // Thêm đoạn này vào hàm handleSubmit của MultipleStates
    function handleSubmit() {
        const numericAge = Number(age);
        if (!email.includes("@")) {
            alert("Email không hợp lệ!");
            return;
        }
        if (numericAge <= 0 || numericAge >= 100) {
            alert("Tuổi phải từ 1 đến 99!");
            return;
        }
        setSubmitted(true);
    }
