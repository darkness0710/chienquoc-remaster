// Chiến Quốc Remaster: trang hướng dẫn (mục lục huong-dan/ và các trang con huong-dan/<chủ đề>/). Không thư viện.
// Không JS thì mọi thứ vẫn đọc được: ô tìm nhanh ẩn, hàng mục trong trang là mục lục neo bình thường.
// Link cũ huong-dan/#<mục> chuyển sang trang con bằng đoạn script ngay trong <head> của huong-dan/index.html.
(function () {
  "use strict";

  // Bỏ dấu tiếng Việt để gõ "ren" cũng ra "rèn", "co mo" ra "Cổ Mộ".
  function norm(s) {
    return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d");
  }

  // ---------- 1. Mục lục: ô tìm nhanh lọc thẻ chủ đề ----------
  var input = document.getElementById("gsearch");
  if (input) {
    var box = input.closest(".gsearch");
    var none = document.getElementById("gsearchNone");
    var strip = document.querySelector(".v5strip");
    var cards = Array.prototype.slice.call(document.querySelectorAll(".topic"));
    cards.forEach(function (c) { c._t = norm(c.getAttribute("data-search") + " " + c.textContent).replace(/\s+/g, " "); });
    box.hidden = false;
    var run = function () {
      // Khớp cả cụm (gõ "co mo" chỉ ra Cổ Mộ, không ra "Côn Luân" + "Vân Mộng").
      var q = norm(input.value.trim()).replace(/\s+/g, " ");
      var words = q ? [q] : [];
      var shown = 0;
      cards.forEach(function (c) {
        var ok = words.every(function (w) { return c._t.indexOf(w) >= 0; });
        c.hidden = !ok;
        if (ok) shown++;
        c.querySelectorAll(".topic__links a").forEach(function (a) {
          var t = norm(a.textContent);
          a.classList.toggle("is-hit", words.length > 0 && words.every(function (w) { return t.indexOf(w) >= 0; }));
        });
      });
      if (none) none.hidden = shown > 0;
      if (strip) strip.hidden = words.length > 0;
    };
    input.addEventListener("input", run);
    // Phím "/" nhảy vào ô tìm (như nhiều trang tài liệu), trừ khi đang gõ ở ô khác.
    document.addEventListener("keydown", function (e) {
      if (e.key === "/" && document.activeElement !== input && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
        e.preventDefault();
        input.focus();
      }
    });
  }

  // ---------- 2. Trang con: tô mục đang đọc trên hàng mục dính ----------
  var toc = document.querySelector(".ptoc");
  if (toc) {
    var links = Array.prototype.slice.call(toc.querySelectorAll("a[href^='#']"));
    var items = links.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); });
    var cur = -1;
    var mark = function () {
      // Mục đang đọc = mục cuối cùng có mép trên đã qua dưới hai thanh dính (thanh trên + hàng mục).
      var line = 150;
      var k = 0;
      for (var i = 0; i < items.length; i++) {
        if (items[i] && items[i].getBoundingClientRect().top <= line) k = i;
      }
      // Cuộn tới đáy trang: mục cuối có thể ngắn, không bao giờ chạm vạch.
      if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 4) k = items.length - 1;
      if (k === cur) return;
      cur = k;
      links.forEach(function (a, j) {
        a.classList.toggle("is-on", j === k);
        if (j === k) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      });
      var a = links[k];
      if (a && toc.scrollWidth > toc.clientWidth) {
        toc.scrollLeft = a.offsetLeft - toc.offsetLeft - (toc.clientWidth - a.offsetWidth) / 2;
      }
    };
    var queued = false;
    window.addEventListener("scroll", function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; mark(); });
    }, { passive: true });
    window.addEventListener("resize", mark);
    mark();
  }
})();
