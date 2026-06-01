6.1:

    function ListBasics() {
        const [students] = useState([
            { id: 1, name: "Minh", age: 20 },
            { id: 2, name: "An", age: 21 },
            { id: 3, name: "Linh", age: 19 }
        ]);

        // Tính tuổi trung bình
        const avgAge = students.reduce((sum, s) => sum + s.age, 0) / students.length;

        return (
            <div>
                {students.map((s, index) => (
                    <div key={s.id} style={{ color: s.age >= 20 ? "green" : "black" }}>
                        {index + 1}. {s.name} - {s.age} tuổi
                    </div>
                ))}
                <p><strong>Tuổi trung bình:</strong> {avgAge.toFixed(1)}</p>
            </div>
        );
    }

6.2:

    import { useRef } from "react"; // Dùng để focus

    function CreateItem() {
        const inputRef = useRef(null);
        const [msg, setMsg] = useState("");

        function handleAdd() {
            if (!newName.trim()) return;
            // ... logic thêm phần tử ...
            setMsg("Đã thêm thành công!");
            setTimeout(() => setMsg(""), 2000); // Tự xóa thông báo sau 2s
            inputRef.current.focus(); // Tập trung lại vào ô nhập
        }

        return (
            <div>
                <input ref={inputRef} ... />
                {msg && <p style={{ color: "blue" }}>{msg}</p>}
            </div>
        );
    }

6.3:

    function DeleteItem() {
        const [lastDeleted, setLastDeleted] = useState(null);

        function handleDelete(item) {
            setLastDeleted(item); // Lưu lại để hoàn tác
            setItems(items.filter(i => i.id !== item.id));

            // Sau 5s thì không cho hoàn tác nữa
            setTimeout(() => setLastDeleted(null), 5000);
        }

        function handleUndo() {
            setItems([...items, lastDeleted]);
            setLastDeleted(null);
        }

        return (
            <div>
                {lastDeleted && (
                    <button onClick={handleUndo}>Hoàn tác xóa {lastDeleted.name}?</button>
                )}
            </div>
        );
    }
