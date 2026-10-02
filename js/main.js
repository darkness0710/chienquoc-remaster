// Chiến Quốc Remaster: ảnh trượt ngang ở đầu trang. Không thư viện.
// Trượt bằng CSS scroll-snap (vuốt / kéo được cả khi tắt JS); file này chỉ thêm chấm vị trí,
// nút trái phải, phím mũi tên và tự chuyển ảnh mỗi 5 s.
(function () {
  "use strict";
  var track = document.getElementById("sliderTrack");
  var box = document.getElementById("slider");
  var dotsBox = document.getElementById("sliderDots");
  if (!track || !box || !dotsBox) return;

  var n = track.children.length;
  var dots = [];
  var cur = 0;
  var timer = null;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // cur đặt ngay khi bấm, không chờ sự kiện scroll: bấm nhanh hai lần trong lúc đang trượt mượt
  // thì lần hai vẫn tính từ ảnh đích của lần một.
  function go(i) {
    i = (i + n) % n;
    paint(i);
    track.scrollTo({ left: i * track.clientWidth, behavior: reduce ? "auto" : "smooth" });
  }
  function mark() { paint(Math.round(track.scrollLeft / Math.max(1, track.clientWidth))); }
  function paint(i) {
    cur = i;
    dots.forEach(function (d, j) {
      d.classList.toggle("is-on", j === cur);
      d.setAttribute("aria-current", j === cur ? "true" : "false");
    });
  }
  function stop() { clearInterval(timer); timer = null; }
  function restart() {
    stop();
    // Tự chuyển chỉ khi người xem không chọn giảm chuyển động; tab ẩn thì bỏ lượt.
    if (!reduce) timer = setInterval(function () { if (!document.hidden) go(cur + 1); }, 5000);
  }

  for (var i = 0; i < n; i++) {
    (function (k) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Ảnh " + (k + 1));
      b.addEventListener("click", function () { go(k); restart(); });
      dotsBox.appendChild(b);
      dots.push(b);
    })(i);
  }
  box.querySelectorAll("[data-step]").forEach(function (b) {
    b.hidden = false;
    b.addEventListener("click", function () { go(cur + Number(b.getAttribute("data-step"))); restart(); });
  });
  // Vuốt / kéo tay: cập nhật chấm khi dải ảnh dừng (đang trượt mượt do nút thì cur đã đúng).
  var settle = null;
  track.addEventListener("scroll", function () {
    clearTimeout(settle);
    settle = setTimeout(mark, 120);
  }, { passive: true });
  track.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      go(cur + (e.key === "ArrowLeft" ? -1 : 1));
      restart();
    }
  });
  // Đang xem (rê chuột, chạm, bấm vào dải ảnh) thì không tự chuyển.
  box.addEventListener("mouseenter", stop);
  box.addEventListener("mouseleave", restart);
  box.addEventListener("touchstart", stop, { passive: true });
  box.addEventListener("touchend", restart, { passive: true });
  box.addEventListener("focusin", stop);
  box.addEventListener("focusout", restart);
  window.addEventListener("resize", function () { go(cur); });

  mark();
  restart();
})();
