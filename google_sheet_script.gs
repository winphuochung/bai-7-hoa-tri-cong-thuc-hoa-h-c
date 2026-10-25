/**
 * =========================================================================
 * GOOGLE APPS SCRIPT: ĐỒNG BỘ KẾT QUẢ BÀI KIỂM TRA KHOA HỌC TỰ NHIÊN 7
 * BÀI 7: HOÁ TRỊ VÀ CÔNG THỨC HOÁ HỌC
 * Giáo viên: Thầy Lê Văn Thắng • Trường TH & THCS Phước Hưng
 * =========================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Khóa 10 giây để tránh xung đột khi nhiều học sinh nộp bài cùng lúc
  lock.tryLock(10000);
  
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    
    // Tự động khởi tạo hàng tiêu đề nếu bảng tính còn trống
    if (sheet.getLastRow() === 0) {
      var headers = [
        "STT",
        "Thời Gian Nộp",
        "Họ Và Tên Học Sinh",
        "Lớp",
        "Tổng Điểm (10đ)",
        "P1: Trắc Nghiệm (2đ)",
        "P2: Đúng / Sai (2đ)",
        "P3: Ghép Đôi (2đ)",
        "P4: Điền Khuyết (2đ)",
        "P5: Tự Luận (2đ)",
        "Xếp Loại",
        "Tự Luận Câu 17",
        "Tự Luận Câu 18",
        "Tự Luận Câu 19",
        "Tự Luận Câu 20"
      ];
      sheet.appendRow(headers);
      
      // Định dạng dòng tiêu đề chuyên nghiệp
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#0284c7"); // Màu xanh thương hiệu
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
      headerRange.setHorizontalAlignment("center");
      headerRange.setVerticalAlignment("middle");
      sheet.setRowHeight(1, 36);
      sheet.setFrozenRows(1);
    }
    
    // Nhận dữ liệu JSON gửi lên từ website
    var rawContent = e.postData.contents;
    var data = JSON.parse(rawContent);
    
    var stt = Math.max(1, sheet.getLastRow()); // Tự động tính số thứ tự
    var timestamp = new Date();
    var formattedDate = Utilities.formatDate(timestamp, "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");
    
    // Hàng dữ liệu mới
    var row = [
      stt,
      formattedDate,
      data.studentName || "Chưa nhập tên",
      data.studentClass || "Chưa rõ",
      data.totalScore || 0,
      data.scoreP1 || 0,
      data.scoreP2 || 0,
      data.scoreP3 || 0,
      data.scoreP4 || 0,
      data.scoreP5 || 0,
      data.rank || "Chưa xếp loại",
      data.q17 || "",
      data.q18 || "",
      data.q19 || "",
      data.q20 || ""
    ];
    
    sheet.appendRow(row);
    
    // Căn giữa các cột điểm số và thông tin cơ bản
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, 11).setHorizontalAlignment("center");
    
    // Tô màu nổi bật theo xếp loại
    var scoreCell = sheet.getRange(lastRow, 5);
    var scoreVal = parseFloat(data.totalScore);
    if (scoreVal >= 8.5) {
      scoreCell.setBackground("#d1fae5").setFontColor("#065f46").setFontWeight("bold");
    } else if (scoreVal >= 6.5) {
      scoreCell.setBackground("#e0f2fe").setFontColor("#075985").setFontWeight("bold");
    } else if (scoreVal >= 5.0) {
      scoreCell.setBackground("#fef3c7").setFontColor("#92400e").setFontWeight("bold");
    } else {
      scoreCell.setBackground("#fee2e2").setFontColor("#991b1b").setFontWeight("bold");
    }
    
    // Trả về phản hồi thành công
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Đã lưu kết quả thành công vào Google Sheet!",
      row: lastRow
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    "✅ Google Apps Script kết nối Google Sheet môn KHTN 7 (Bài 7: Hoá trị & CTHH - Thầy Lê Văn Thắng) đang hoạt động bình thường!"
  );
}
