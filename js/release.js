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
    "5.2": "2026-10-10"
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
