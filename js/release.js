// Chiến Quốc Remaster: ngày phát các bản, MỘT chỗ để sửa (README §Sửa thường gặp, dòng "Đổi ngày phát 5.0").
// Mọi <time data-rel="<bản>"> trên trang lấy ngày ở đây: ghi lại thuộc tính datetime và chữ hiện (d/m/yyyy).
// Chữ viết sẵn trong HTML chỉ là dự phòng khi tắt JS (và cho máy đọc trang); lệnh đồng bộ nó ở README.
(function () {
  "use strict";

  var RELEASES = {
    "5.0": "2026-10-09",
    "5.1": "2026-10-09",
    // 5.2: ngày phát thật 2026-10-10 (tag 5.2.0 lên VPS 19:21). Đổi ngày thì đồng bộ chữ dự phòng
    // "10/10/2026" trong các thẻ <time data-rel="5.2"> (README §Sửa thường gặp).
    "5.2": "2026-10-10",
    // 5.3: ngày phát thật 2026-10-12 (tag 5.3.0 lên VPS 14:06). Đổi ngày thì đồng bộ chữ dự phòng
    // "12/10/2026" trong các thẻ <time data-rel="5.3"> (README §Sửa thường gặp).
    "5.3": "2026-10-12",
    // 6.0: ngày phát thật 2026-10-12 (tag 6.0.0 lên VPS 23:58 giờ Việt Nam). Đổi ngày thì đồng bộ chữ dự phòng
    // "12/10/2026" trong các thẻ <time data-rel="6.0"> (README §Sửa thường gặp).
    "6.0": "2026-10-12",
    // 6.0.1: ngày phát thật 2026-10-13 (tag 6.0.1 lên VPS 10:33). Đổi ngày thì đồng bộ chữ dự phòng
    // "13/10/2026" trong các thẻ <time data-rel="6.0.1"> (README §Sửa thường gặp).
    "6.0.1": "2026-10-13",
    // 6.1: ngày phát thật 2026-10-14 (tag 6.1.0, bản PC trọn gói; Android chưa phát). Đổi ngày thì đồng bộ
    // chữ dự phòng "14/10/2026" trong các thẻ <time data-rel="6.1"> (README §Sửa thường gặp).
    "6.1": "2026-10-14"
  };

  var list = document.querySelectorAll("time[data-rel]");
  for (var i = 0; i < list.length; i++) {
    var el = list[i];
    var iso = RELEASES[el.getAttribute("data-rel")];
    if (!iso) continue;
    var p = iso.split("-");
    el.setAttribute("datetime", iso);
    el.textContent = (el.getAttribute("data-prefix") || "") + Number(p[2]) + "/" + Number(p[1]) + "/" + p[0];
  }
})();
