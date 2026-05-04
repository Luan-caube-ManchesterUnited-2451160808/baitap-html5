PHẦN A: KIỂM TRA ĐỌC HIỂU

Câu A1:

1.type="email" --> Ô nhập văn bản, tự động kiểm tra định dạng phải có ký tự "@" --> Dùng cho form đăng ký tài khoản khách hàng.

2.type="password" --> Ô nhập văn bản che dấu ký tự bằng dấu chấm hoặc dấu sao --> Dùng cho ô nhập mật khẩu khi đăng nhập hoặc thanh toán.

3.type="number" --> Ô chỉ cho phép nhập số, có nút tăng/giảm, tự động xác thực giá trị số --> Dùng cho ô chọn số lượng sản phẩm trong giỏ hàng.

4.type="tel" --> Ô nhập văn bản tối ưu cho bàn phím số trên điện thoại --> Dùng để thu thập số điện thoại giao hàng của khách.

5.type="date" --> Hiển thị lịch để chọn ngày/tháng/năm --> Dùng để chọn ngày dự kiến nhận hàng hoặc nhập ngày sinh để nhận ưu đãi.

6.type="color" --> Hiển thị bảng chọn màu sắc (color picker) --> Dùng trong bộ lọc tìm kiếm sản phẩm theo màu sắc hoặc tùy chỉnh màu quà tặng.

7.type="range" --> Hiển thị thanh trượt (slider) để chọn giá trị trong một khoảng --> Dùng cho bộ lọc khoảng giá sản phẩm (từ thấp đến cao).

8.type="url" --> Ô nhập văn bản, tự động kiểm tra định dạng địa chỉ website hợp lệ (có http:// hoặc https://) --> Dùng để khách hàng điền link website cá nhân hoặc link bài viết đánh giá sản phẩm.

9.type="file" --> Hiển thị nút bấm để mở cửa sổ chọn tệp tin từ thiết bị --> Dùng để khách hàng tải ảnh thực tế lên phần đánh giá sản phẩm (feedback).

10.type="search" --> Ô nhập văn bản có nút "x" để xóa nhanh nội dung --> Dùng cho thanh tìm kiếm tên sản phẩm trên đầu trang web.

Câu A2:

-Trường hợp 1: Biểu mẫu không được gửi vì thuộc tính required bắt buộc người dùng không được để trống ô nhập dữ liệu. Vì value="" nên trình duyệt sẽ chặn việc gửi biểu mẫu.

-Trường hợp 2: Lỗi định dạng email vì type="email" yêu cầu nội dung phải có cấu trúc của một địa chỉ email (phải có ký tự @). Chuỗi "abc" không có ký tự @ nên không khớp với định dạng này.

-Trường hợp 3: Lỗi giá trị quá lớn vì thuộc tính max="10" giới hạn giá trị tối đa là 10. Người dùng nhập 15, vượt quá giới hạn giá trị cho phép nên trình duyệt sẽ báo lỗi.

-Trường hợp 4: Lỗi không khớp định dạng vì thuộc tính pattern="[ 0-9]{10}" yêu cầu nhập đúng 10 ký tự số, chuỗi "abc123" vừa chứa chữ, vừa sai độ dài nên không vượt qua kiểm tra.

-Trường hợp 5: Lỗi quá ngắn vì thuộc tính minlength="8" yêu cầu mật khẩu phải có ít nhất 8 ký tự. Chuỗi "123" chỉ có 3 ký tự, không đủ độ dài tối thiểu.

Câu A3:

1.Tại sao < label for="email">quan trọng cho trình đọc màn hình người dùng?

-Thuộc tính for liên kết nhãn văn bản trực tiếp với ô nhập liệu có id tương ứng, giúp trình đọc màn hình đọc rõ nội dung nhãn khi người dùng tập trung vào ô nhập đó,đồng thời giúp người dùng dễ dàng nhấp chuột vào văn bản của nhãn để kích hoạt ô nhập liệu.

2.Khi nào dùng < fieldset>+ < legend>?

    -Khi ta cần nhóm các yếu tố liên quan trong một biểu mẫu lại với nhau,tạo ra cấu trúc logic và dễ hiểu hơn cho cả người dùng bình thường và người dùng trình đọc màn hình.

    -Ví dụ: Tạo một nhóm các nút lựa chọn cho phương thức thanh toán.

3.aria-labelsử dụng vào lúc nào? Tại sao KHÔNG nên sử dụng aria-labelkhi đã có < label>?

    -aria-label được dùng khi một yếu tố tương tác (như nút bấm hoặc ô nhập liệu) không có nhãn văn bản hiển thị trên giao diện nhưng vẫn cần mô tả cho trình đọc màn hình (ví dụ: nút đóng có biểu tượng "X").

    -Lý do không nên dùng chung với < label>:

        + Nếu có cả hai, trình đọc màn hình có thể ưu tiên aria-label và bỏ qua nhãn văn bản thực tế, hoặc đọc lặp lại gây khó hiểu cho người dùng.

        + Trong HTML, việc sử dụng các thẻ có tính ngữ nghĩa gốc như <label> luôn được ưu tiên hơn các thuộc tính ARIA vì chúng hỗ trợ trình duyệt và thiết bị hỗ trợ tốt hơn mà không cần cấu hình phức tạp.

Câu A4:

1.Giải thích thuộc tính thích hợp loading="lazy"trên thẻ < img>. Nó cải thiện được gì? Khi nào KHÔNG nên sử dụng?

    - Giải thích: Đây là tính năng "tải chậm". Trình duyệt sẽ trì hoãn việc tải hình ảnh cho đến khi người dùng cuộn trang đến gần vị trí của hình ảnh đó.


    - Cải thiện:


        + Tốc độ tải trang đầu: Giảm lượng dữ liệu cần tải ngay lập tức, giúp trang hiện ra nhanh hơn.


        + Tiết kiệm băng thông: Người dùng không xem hết trang thì trình duyệt sẽ không tải những ảnh ở phía dưới cùng.



    - Khi không nên dùng: Khi các hình ảnh nằm trong màn hình đầu tiên hoặc ảnh biểu ngữ chính. Nếu dùng "lazy" ở đây, ảnh sẽ hiện lên chậm sau khi chữ đã tải xong, gây trải nghiệm không tốt cho người dùng.

2.Tại sao nên cung cấp nhiều < source>thẻ < video>? Liệt kê ít nhất 3 định dạng web video phổ biến.

- Vì mỗi trình duyệt (Chrome,...) hỗ trợ các bộ giải mã video khác nhau. Cung cấp nhiều định dạng giúp đảm bảo video có thể chạy được trên mọi thiết bị và trình duyệt.

- 3 định dạng web video phổ biến:

      - MP4(.mp4)

      - WebM(.webm)

      - Ogg (.ogv)

3.

-Công dụng:

    + Hình ảnh nội dung mô tả cho công cụ tìm kiếm (SEO)


    + Người hỗ trợ (trình đọc màn hình)


    + Show khi ảnh không tải được

- Viết 3 alt tốt:
  - Ảnh sản phẩm iPhone 16: alt="Điện thoại Iphone 16 màu xanh lưu ly cực đẹp".

  - Ảnh trang trí (trang trí): alt="".

  - Hình ảnh biểu đồ doanh thu Q1/2026: alt="Biểu đồ cột hiển thị doanh thu quý 1 năm 2026 đạt mức tăng trưởng 15% so với cùng kỳ năm ngoái".

Câu A5:

- Dùng cách 1 khi hình ảnh đóng vai trò là một phần của nội dung văn bản hoặc chỉ mang tính chất trang trí, minh họa đơn thuần mà không cần chú thích đi kèm.

- Dùng cách 2 khi hình ảnh là một đơn vị nội dung độc lập, cần có tiêu đề hoặc chú thích rõ ràng để người đọc hiểu thông tin chi tiết (như tên sản phẩm, giá cả, nguồn ảnh).

PHẦN C: PHÂN TÍCH VÀ SUY LUẬN

Câu C1:

Danh sách lỗi và cách sửa chúng:

-Lỗi 1: Nhập "Tên" không có nhãn → cần bổ sung < label for="...">để đảm bảo khả năng truy cập

-Lỗi 2: Email không thuộc tính bắt buộc → người dùng có thể bỏ trống

-Lỗi 3: Mật khẩu không có độ dài tối thiểu → không đảm bảo độ mạnh

-Lỗi 4: Xác nhận mật khẩu không thể xác thực bằng HTML → cần JavaScript

-Lỗi 5: Điện thoại dùng type="text" → nên dùng type="tel" + mẫu

-Lỗi 6: Select no name → not send data about server

-Lỗi 7: Thiếu hộp kiểm đầu vào → nhãn không có chức năng

-Lỗi 8: Gửi sử dụng nút thay thế đầu vào → không hoàn toàn nhưng không tối ưu

Câu C2:

1.Độ bảo mật HTML5:

    - Độ an toàn của HTML5: Xác thực HTML5 chỉ mang tính chất hỗ trợ trải nghiệm người dùng để báo lỗi nhanh. Nó không đủ an toàn cho ứng dụng ngân hàng vì kẻ xấu có thể dễ dàng dùng công cụ để xóa các thuộc tính này hoặc gửi dữ liệu giả trực tiếp lên máy chủ.

    - Xác thực cần JavaScript: HTML5 không thể kiểm tra xem hai ô mật khẩu có khớp nhau không, hoặc kiểm tra xem tài khoản đã tồn tại trong hệ thống chưa. Những việc này bắt buộc phải dùng JavaScript (gọi API) để xử lý.

    - Rủi ro : Hệ thống sẽ dễ bị tấn công hoặc tiếp nhận dữ liệu sai lệch (ví dụ: số tiền chuyển khoản là số âm), dẫn đến những hậu quả nghiêm trọng về tài chính và bảo mật thông tin.

2.Xây dựng cơ sở:

```html
  <!-- 1. CMND/CCCD: Đúng 12 chữ số -->
  <div>
    <label for="cccd">Số CMND/CCCD (12 chữ số):</label>
    <input
      type="text"
      id="cccd"
      name="cccd"
      pattern="[0-9]{12}"
      title="Vui lòng nhập đúng 12 chữ số CMND/CCCD"
      required
    />
  </div>

  <!-- 2. Số tài khoản: 10-15 chữ số -->
  <div>
    <label for="account_number">Số tài khoản (10-15 chữ số):</label>
    <input
      type="text"
      id="account_number"
      name="account_number"
      pattern="[0-9]{10,15}"
      title="Số tài khoản phải từ 10 đến 15 chữ số"
      required
    />
  </div>

  <!-- 3. Email: Bắt buộc, định dạng đúng -->
  <div>
    <label for="user_email">Email liên hệ:</label>
    <input type="email" id="user_email" name="user_email" required />
  </div>

  <!-- 4. PIN: Đúng 6 chữ số, KHÔNG hiển thị -->
  <div>
    <label for="pin_code">Mã PIN (6 chữ số):</label>
    <input
      type="password"
      id="pin_code"
      name="pin_code"
      pattern="[0-9]{6}"
      inputmode="numeric"
      title="Mã PIN phải gồm đúng 6 chữ số"
      required
    />
  </div>

  <button type="submit">Đăng ký ngay </button>
</form>
```
