# 📊 HƯỚNG DẪN KẾT NỐI BÀI HỌC VỚI GOOGLE SHEET
> **Tác giả:** Thầy Lê Văn Thắng • Trường TH & THCS Phước Hưng  
> **Áp dụng cho:** Website Bài học tương tác - Bài 7: Hoá trị & Công thức hoá học (KHTN 7)

---

## 🎯 Mục Đích
Tự động thu thập kết quả điểm số của học sinh (Họ tên, Lớp, Tổng điểm 10đ, Điểm từng phần, Câu trả lời tự luận) về một file **Google Sheet** của Thầy ngay sau khi học sinh bấm nộp bài!

---

## 🛠️ CÁC BƯỚC THỰC HIỆN (CHỈ MẤT 2 PHÚT)

### 📌 BƯỚC 1: Tạo Google Sheet mới
1. Mở trình duyệt và truy cập: [https://sheets.new](https://sheets.new) (hoặc vào Google Drive tạo một bảng tính mới).
2. Đặt tên bảng tính: `KHTN7_KetQua_Bai7_HoaTri_CTHH`.
3. *(Lưu ý: Không cần tạo tiêu đề cột thủ công, mã script sẽ tự động tạo dòng tiêu đề màu xanh đẹp mắt ngay lượt nộp bài đầu tiên).*

---

### 📌 BƯỚC 2: Mở trình soạn thảo Google Apps Script
1. Trên thanh công cụ của Google Sheet, bấm vào menu **Tiện ích mở rộng (Extensions)** ➔ Chọn **Apps Script**.
2. Xóa toàn bộ đoạn mã mặc định có sẵn (`function myFunction() {...}`).
3. Mở file [google_sheet_script.gs](google_sheet_script.gs) trong thư mục dự án, sao chép toàn bộ nội dung và dán vào cửa sổ Apps Script.
4. Bấm vào biểu tượng **💾 Lưu dự án (Save project)** (hoặc nhấn tổ hợp phím `Ctrl + S`).

---

### 📌 BƯỚC 3: Triển khai thành Web App (Deploy)
1. Bấm nút **Triển khai (Deploy)** ở góc trên bên phải ➔ Chọn **Tùy chọn triển khai mới... (New deployment)**.
2. Bấm biểu tượng bánh răng ⚙️ bên cạnh "Chọn loại" ➔ Chọn **Ứng dụng web (Web app)**.
3. Thiết lập chính xác 4 mục sau:
   - **Mô tả (Description):** `Nhan diem KHTN 7`
   - **Thực thi dưới dạng (Execute as):** `Tôi (email của Thầy)` *(Me)*
   - **Ai có quyền truy cập (Who has access):** **`Bất kỳ ai (Anyone)`** *(⚠️ Rất quan trọng để học sinh có thể gửi điểm mà không cần đăng nhập tài khoản Google)*.
4. Bấm nút **Triển khai (Deploy)**.
5. Nếu Google yêu cầu cấp quyền:
   - Bấm **Ủy quyền truy cập (Authorize access)**.
   - Chọn tài khoản Google của Thầy ➔ Bấm **Nâng cao (Advanced)** ➔ Chọn **Đi tới dự án (Không an toàn) / Go to project (unsafe)** ➔ Bấm **Cho phép (Allow)**.
6. Sau khi hoàn tất, Google sẽ cấp cho Thầy một **URL Ứng dụng web (Web app URL)** dạng:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```
7. Bấm **Sao chép (Copy)** đường link này.

---

### 📌 BƯỚC 4: Dán đường link vào Website bài học
Có 2 cách cực kỳ nhanh:

- **Cách 1 (Ngay trên giao diện Website - Không cần sửa code):**
  1. Mở website bài học.
  2. Cuộn xuống phần Phiếu báo điểm kiểm tra, bấm vào nút: **`⚙️ Cấu hình Google Sheet`**.
  3. Dán đường link `https://script.google.com/macros/s/.../exec` vào và bấm **Lưu cấu hình**.
  4. Trình duyệt sẽ tự động ghi nhớ đường link này cho các lần làm bài tiếp theo!

- **Cách 2 (Đã cấu hình sẵn mặc định trong code):**
  Mã nguồn dự án đã được tích hợp sẵn đường link Web App chính thức của Thầy:
  ```
  https://script.google.com/macros/s/AKfycbzWA4ZmVHI30qYZuf0o7MbWq0VoUFkQ9KYwg7F07A6WYMQquUxOPAaWo94VT2-1H-Wc/exec
  ```
  Ngay khi học sinh bấm nộp bài kiểm tra trên máy tính hay điện thoại, kết quả sẽ tự động được gửi thẳng về Google Sheet của Thầy mà không cần làm thêm thao tác nào!

---

## 🏆 CÁC CỘT DỮ LIỆU TỰ ĐỘNG THU THẬP VÀO SHEET:
1. **STT:** Số thứ tự tự động tăng
2. **Thời gian nộp:** Giờ, ngày tháng năm (theo giờ Việt Nam)
3. **Họ và tên học sinh**
4. **Lớp**
5. **Tổng điểm (thang 10,0):** Tự động tô màu xanh lá (Giỏi), xanh dương (Khá), vàng (Đạt), đỏ (Cần cố gắng)
6. **Điểm P1 (Trắc nghiệm):** / 2,0 điểm
7. **Điểm P2 (Đúng / Sai):** / 2,0 điểm
8. **Điểm P3 (Ghép đôi):** / 2,0 điểm
9. **Điểm P4 (Điền khuyết):** / 2,0 điểm
10. **Điểm P5 (Tự luận):** / 2,0 điểm
11. **Xếp loại:** Xuất sắc, Khá, Đạt yêu cầu, Cần cố gắng
12. **Nội dung làm bài tự luận Câu 17, 18, 19, 20:** Giúp Thầy đọc và chấm chi tiết bài viết của học sinh.
