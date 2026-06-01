1.

Tại sao thành phần chỉ render 1 lần?

Trong ví dụ LifecycleDemo, React gọi hàm LifecycleDemo() để chuyển đổi JSX thành HTML và đẩy lên màn hình. Vì trong component này không có yếu tố nào thay đổi (không có dữ liệu đầu vào mới, không có trạng thái nội bộ thay đổi), nên React coi như công việc đã xong. Nó không có lý do gì để phải "tính toán" lại.

Khi nào nó sẽ hiển thị lại (Re-render)?

Một component React sẽ "vẽ lại" khi rơi vào một trong các trường hợp sau:

- State thay đổi: Khi bạn dùng useState và gọi hàm set....

- Props thay đổi: Khi component cha truyền vào dữ liệu mới.

- Component cha re-render: Khi "cha" vẽ lại, các "con" cũng thường được gọi lại.

2.

Tại sao biến let count thất bại?

Trong lập trình thông thường, count = count + 1 làm thay đổi giá trị trong bộ nhớ. Tuy nhiên, React không hề biết giá trị đó đã đổi để mà vẽ lại giao diện.

Biến thường: Giống như bạn thay đổi số trang trong một cuốn sách nhưng không thông báo cho người đọc biết.

useState: Giống như một cái chuông báo động. Khi bạn gọi setCount, React lập tức nhận được tín hiệu: "Này, dữ liệu đã đổi rồi, hãy chạy lại hàm Component này để lấy giao diện mới ngay!"

Thử nghiệm thực tế:

- Chạy BadCounter: Bạn click 10 lần, Console hiện 10, nhưng màn hình vẫn hiện số 0.

- Chạy GoodCounter: Bạn click 1 lần, Console hiện "🔄 Component render!" và màn hình lập tức nhảy lên số 1.

- Số lần log: Mỗi lần bạn nhấn nút ở GoodCounter, log 🔄 Component render! sẽ xuất hiện thêm 1 lần.

3.

Đây là phần quan trọng nhất để hiểu cách React vận hành. Hãy tưởng tượng nó như một quy trình "Dữ liệu thay đổi -> UI thay đổi".

Tại sao React chỉ cập nhật "phần thay đổi"?

Ở bước 8 trong sơ đồ của bạn, React sử dụng một cơ chế gọi là Virtual DOM.

- Nó so sánh giao diện cũ và giao diện mới.

- Nếu chỉ có thẻ <p> chứa số step thay đổi, nó sẽ chỉ tác động đúng vào phần tử đó trên trình duyệt.

- Điều này giúp ứng dụng cực kỳ nhanh, thay vì phải tải lại cả trang web như cách làm truyền thống.
