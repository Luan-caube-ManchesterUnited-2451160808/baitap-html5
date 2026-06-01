5.1:

    function ClickTrial() {
        const [bgColor, setBgColor] = useState("#ffffff");
        const [like, setLike] = useState(false);

        // Thử nghiệm: Đổi màu ngẫu nhiên
        const changeColor = () => {
            const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
            setBgColor(randomColor);
        };

        return (
            <div style={{ backgroundColor: bgColor, padding: "20px", transition: "0.3s" }}>
                <button onClick={changeColor}>Đổi màu nền ngẫu nhiên</button>

                {/* Thử nghiệm: Nút Like biểu tượng */}
                <button onClick={() => setLike(!like)} style={{ fontSize: "2rem", border: "none", background: "none", cursor: "pointer" }}>
                    {like ? "❤️" : "🤍"}
                </button>
            </div>
        );
    }

5.2:

    function WordCounter() {
        const [text, setText] = useState("");

        // Logic đếm từ: Cắt bỏ khoảng trắng thừa và chia mảng theo khoảng trắng
        const countWords = (str) => {
            return str.trim() === "" ? 0 : str.trim().split(/\s+/).length;
        };

        return (
            <div>
                <textarea onChange={(e) => setText(e.target.value)} />
                <p>Số từ: {countWords(text)}</p>
            </div>
        );
    }

5.3:

    function MoveBox() {
        const [pos, setPos] = useState({ x: 0, y: 0 });

        const handleMove = (e) => {
            if (e.key === "ArrowUp") setPos(prev => ({ ...prev, y: prev.y - 10 }));
            if (e.key === "ArrowDown") setPos(prev => ({ ...prev, y: prev.y + 10 }));
            // Tương tự cho Left/Right...
        };

        return (
            <div onKeyDown={handleMove} tabIndex={0} style={{ height: "200px", border: "1px solid" }}>
                <div style={{
                    width: "20px", height: "20px", background: "red",
                    transform: `translate(${pos.x}px, ${pos.y}px)`
                }} />
            </div>
        );
    }

5.4:

    function AdvancedForm() {
        const [formData, setFormData] = useState({ password: "", confirm: "" });
        const [error, setError] = useState("");

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => {
                const newData = { ...prev, [name]: value };
                // Kiểm tra khớp mật khẩu ngay lập tức
                if (name === "confirm" || name === "password") {
                    if (newData.password !== newData.confirm) {
                        setError("Mật khẩu không khớp!");
                    } else {
                        setError("");
                    }
                }
                return newData;
            });
        };

        return (
            <form onSubmit={(e) => e.preventDefault()}>
                <input name="password" type="password" onChange={handleChange} placeholder="Mật khẩu" />
                <input name="confirm" type="password" onChange={handleChange} placeholder="Nhập lại mật khẩu" />
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        );
    }
