// Chiến Quốc Remaster: tab của trang hướng dẫn. Không thư viện.
// Không có JS thì mọi mục hiện liền nhau, thanh tab là mục lục neo (#hang-ngay, #su-mon...).
// Có JS: <html class="tabs-on"> ẩn mục không chọn (css/style.css), hai tầng tab:
//   [data-tabs]    tab lớn, mỗi link trỏ tới một <section class="tab-panel">;
//   [data-subtabs] tab con trong một mục, mỗi link trỏ tới một .sub-panel.
// Địa chỉ #id luôn mở đúng tab (link cũ kiểu huong-dan/#tai-tao vẫn chạy), bấm tab thì đổi #id
// bằng replaceState (không nhảy trang, không chồng lịch sử).
(function () {
  "use strict";

  var groups = [];
  document.querySelectorAll("[data-tabs], [data-subtabs]").forEach(function (bar) {
    var links = Array.prototype.slice.call(bar.querySelectorAll("a[href^='#']"));
    var g = { bar: bar, links: links, panels: [] };
    bar.setAttribute("role", "tablist");
    links.forEach(function (a) {
      var p = document.getElementById(a.getAttribute("href").slice(1));
      g.panels.push(p);
      if (!p) return;
      if (!a.id) a.id = "tab-" + p.id;
      a.setAttribute("role", "tab");
      a.setAttribute("aria-controls", p.id);
      p.setAttribute("role", "tabpanel");
      p.setAttribute("aria-labelledby", a.id);
      a.addEventListener("click", function (e) {
        e.preventDefault();
        show(p.id, true);
        if (bar.hasAttribute("data-tabs")) toTop(p);
      });
      // Mũi tên trái phải, Home, End chuyển tab như hộp tab của hệ điều hành.
      a.addEventListener("keydown", function (e) {
        var i = links.indexOf(a);
        var j = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 :
          e.key === "Home" ? 0 : e.key === "End" ? links.length - 1 : null;
        if (j === null) return;
        e.preventDefault();
        var b = links[(j + links.length) % links.length];
        b.focus();
        b.click();
      });
    });
    groups.push(g);
  });

  function select(g, k) {
    g.links.forEach(function (a, i) {
      var on = i === k;
      a.classList.toggle("is-on", on);
      a.setAttribute("aria-selected", on ? "true" : "false");
      a.tabIndex = on ? 0 : -1;
      if (g.panels[i]) g.panels[i].classList.toggle("is-active", on);
    });
    // Tab đang chọn trượt vào giữa thanh (điện thoại: thanh cuộn ngang).
    var cur = g.links[k];
    if (cur && g.bar.scrollWidth > g.bar.clientWidth) {
      g.bar.scrollLeft = cur.offsetLeft - g.bar.offsetLeft - (g.bar.clientWidth - cur.offsetWidth) / 2;
    }
  }

  // Mở mọi tab chứa phần tử `id` (tab lớn rồi tab con); nhóm không chứa nó thì giữ nguyên.
  function show(id, write) {
    var el = id && document.getElementById(id);
    if (!el) return null;
    var hit = false;
    groups.forEach(function (g) {
      for (var i = 0; i < g.panels.length; i++) {
        if (g.panels[i] && g.panels[i].contains(el)) { select(g, i); hit = true; return; }
      }
    });
    if (hit && write && history.replaceState) history.replaceState(null, "", "#" + id);
    return hit ? el : null;
  }

  // Chiều cao hai thanh dính trên cùng (thanh trên + thanh tab). Tự tính, không dựa `scroll-padding-top`
  // + scrollIntoView: đo bằng Edge headless 2026-10-04, mỗi lần tải lệch một kiểu (đầu mục ở y = 1,
  // lần khác y = 148, mong đợi 113) vì font / ảnh tải xong làm đổi bố cục giữa chừng.
  function stuck() {
    var h = 0;
    document.querySelectorAll(".bar, .tabs-bar").forEach(function (b) { h += b.offsetHeight; });
    return h;
  }
  function scrollTo(el, how) {
    var y = el.getBoundingClientRect().top + window.pageYOffset - stuck();
    window.scrollTo({ top: Math.max(0, y), behavior: how || "auto" });
  }

  // Bấm tab lớn khi đã cuộn sâu: về đầu mục mới, không thì người đọc đứng giữa chừng mục đó. Mục còn
  // nằm dưới thanh tab thì để yên.
  function toTop(p) {
    if (p.getBoundingClientRect().top < stuck()) scrollTo(p);
  }

  // Link neo (#id) tới mục đang ẩn: trình duyệt đã thử cuộn lúc nó còn ẩn, nên mở tab rồi cuộn lại.
  // Neo vào một tab (lớn hay con) thì cuộn tới đầu tab lớn chứa nó: cuộn thẳng tới thẻ thì hàng tab
  // con nằm khuất dưới thanh tab dính, người đọc không thấy còn mục khác.
  function follow() {
    var el = show(location.hash.slice(1), false);
    if (!el) return;
    var top = el.closest(".tab-panel");
    var isTab = el.classList.contains("tab-panel") || el.classList.contains("sub-panel");
    scrollTo(isTab && top ? top : el, "instant");
  }

  groups.forEach(function (g) { select(g, 0); });
  // Gắn lớp SAU khi đã chọn tab đầu: script lỗi giữa chừng thì trang vẫn hiện đủ mọi mục.
  document.documentElement.classList.add("tabs-on");
  if (location.hash) {
    follow();
    // Chrome / Edge còn tự cuộn tới thẻ #id tới lúc trang tải xong (ảnh, font), đè lần cuộn trên
    // (chụp headless 2026-10-04: hàng tab con khuất). Cuộn lại sau `load`.
    window.addEventListener("load", function () { setTimeout(follow, 0); });
  }
  window.addEventListener("hashchange", follow);
})();
