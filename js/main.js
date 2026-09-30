// Chiến Quốc Remaster: trang giới thiệu. Không dùng thư viện ngoài.
(function () {
  "use strict";

  // Link tải bản chơi thử. Để trống thì nút dẫn về nhóm cộng đồng (bản 2.0 đang
  // phát qua Google Drive, chia sẻ theo link trong nhóm). Có link công khai thì dán vào đây.
  var CONFIG = {
    downloadUrl: "https://drive.google.com/drive/folders/1uryoIZk5M8_CemebYR23FHE8yvL3dEbW",
    downloadLabel: "Tải bản demo 2.0",
    communityUrl: "https://www.facebook.com/groups/1795609961479061"
  };

  var root = document.documentElement;
  root.classList.remove("no-js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- nút tải ----------
  var dlBtn = document.getElementById("downloadBtn");
  if (dlBtn) {
    if (CONFIG.downloadUrl) {
      dlBtn.href = CONFIG.downloadUrl;
      dlBtn.target = "_blank";
      dlBtn.rel = "noopener";
      dlBtn.querySelector("span").textContent = CONFIG.downloadLabel;
    } else {
      dlBtn.href = CONFIG.communityUrl;
      dlBtn.target = "_blank";
      dlBtn.rel = "noopener";
    }
  }

  // ---------- thanh điều hướng ----------
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  var links = document.querySelectorAll(".nav__links a");

  function onScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
  }
  toggle.addEventListener("click", function () {
    setMenu(!nav.classList.contains("is-open"));
  });
  links.forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });

  // Tô mục đang xem trên thanh điều hướng.
  var sections = [];
  links.forEach(function (a) {
    var id = a.getAttribute("href");
    if (id && id.charAt(0) === "#" && id.length > 1) {
      var el = document.querySelector(id);
      if (el) sections.push({ link: a, el: el });
    }
  });
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        sections.forEach(function (s) {
          s.link.classList.toggle("is-active", s.el === en.target);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s.el); });
  }

  // ---------- hiện dần khi cuộn ----------
  var revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        // Các phần tử cùng hàng hiện lệch nhau một chút cho có nhịp.
        var siblings = Array.prototype.filter.call(en.target.parentNode.children, function (c) {
          return c.classList.contains("reveal");
        });
        var i = Math.max(0, siblings.indexOf(en.target));
        en.target.style.transitionDelay = Math.min(i * 80, 400) + "ms";
        en.target.classList.add("is-visible");
        io.unobserve(en.target);
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  // ---------- lời mở đầu sáng dần từng dòng ----------
  var lines = document.querySelectorAll(".story__line");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    lines.forEach(function (l) { l.classList.add("is-lit"); });
  } else {
    var lio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        lines.forEach(function (l, i) {
          setTimeout(function () { l.classList.add("is-lit"); }, i * 650);
        });
        lio.disconnect();
      });
    }, { threshold: 0.35 });
    var paper = document.querySelector(".scroll-paper");
    if (paper) lio.observe(paper);
  }

  // ---------- xem ảnh lớn ----------
  var lb = document.getElementById("lightbox");
  var shots = Array.prototype.map.call(document.querySelectorAll(".shot"), function (fig) {
    var img = fig.querySelector("img");
    var cap = fig.querySelector("figcaption");
    // Chú thích = <b>tiêu đề</b> + mô tả; ghép bằng hai chấm để không dính chữ.
    var text = "";
    if (cap) {
      var title = cap.querySelector("b");
      var rest = cap.textContent.replace(title ? title.textContent : "", "").trim();
      text = title ? title.textContent + ": " + rest : rest;
    }
    return { src: img.getAttribute("src"), alt: img.getAttribute("alt"), cap: text };
  });
  var lbImg = lb.querySelector("img");
  var lbCap = lb.querySelector("figcaption");
  var lbIndex = 0;
  var lastFocus = null;

  function showShot(i) {
    lbIndex = (i + shots.length) % shots.length;
    lbImg.src = shots[lbIndex].src;
    lbImg.alt = shots[lbIndex].alt;
    lbCap.textContent = shots[lbIndex].cap;
  }
  function openLb(i) {
    lastFocus = document.activeElement;
    showShot(i);
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    lb.querySelector(".lightbox__close").focus();
  }
  function closeLb() {
    lb.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  document.querySelectorAll("[data-lightbox]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openLb(parseInt(btn.getAttribute("data-lightbox"), 10));
    });
  });
  lb.querySelector(".lightbox__close").addEventListener("click", closeLb);
  lb.querySelector(".lightbox__nav--prev").addEventListener("click", function () { showShot(lbIndex - 1); });
  lb.querySelector(".lightbox__nav--next").addEventListener("click", function () { showShot(lbIndex + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    else if (e.key === "ArrowLeft") showShot(lbIndex - 1);
    else if (e.key === "ArrowRight") showShot(lbIndex + 1);
  });

  // ---------- hạt sáng bay lên ở phần đầu trang ----------
  // Đom đóm vàng, ngọc lam và cánh sen hồng, gợi màn chính trong game.
  var canvas = document.getElementById("heroFx");
  if (canvas && !reduceMotion && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, parts = [], running = true;
    var COLORS = ["232,195,106", "111,214,226", "242,155,181", "255,241,184"];

    function resize() {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(70, W * H / 18000));
      parts = [];
      for (var i = 0; i < n; i++) parts.push(spawn(true));
    }
    function spawn(anywhere) {
      return {
        x: Math.random() * W,
        y: anywhere ? Math.random() * H : H + 10,
        r: Math.random() * 2.2 + 0.6,
        vy: Math.random() * 0.35 + 0.12,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.01 + 0.004,
        c: COLORS[(Math.random() * COLORS.length) | 0],
        a: Math.random() * 0.5 + 0.3
      };
    }
    function frame() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.y -= p.vy;
        p.sway += p.swaySpeed;
        p.x += Math.sin(p.sway) * 0.35;
        if (p.y < -10) parts[i] = p = spawn(false);
        var flicker = 0.6 + 0.4 * Math.sin(p.sway * 3);
        var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, "rgba(" + p.c + "," + (p.a * flicker) + ")");
        g.addColorStop(1, "rgba(" + p.c + ",0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    resize();
    window.addEventListener("resize", resize);
    // Tạm dừng khi phần đầu trang ra khỏi màn hình cho đỡ tốn pin.
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        var vis = entries[0].isIntersecting;
        if (vis && !running) { running = true; requestAnimationFrame(frame); }
        else if (!vis) running = false;
      }).observe(canvas);
    }
    requestAnimationFrame(frame);
  }
})();
