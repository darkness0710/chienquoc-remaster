# Chiến Quốc Remaster · trang tải game

Trang tĩnh: HTML + CSS + một file JS nhỏ (ảnh trượt), không cần build, không thư viện ngoài
(chỉ font Google). Chạy trên GitHub Pages: https://darkness0710.github.io/chienquoc-remaster/

```
├── index.html          trang chủ: đầu trang (ảnh trượt ngang), "Bản 3.0 có gì", "Lời hứa", "Cài đặt 3 bước", "Lộ trình", chân trang
├── huong-dan/index.html  trang /huong-dan/: nhiệm vụ hằng ngày, rèn trang bị, kĩ năng 7 môn phái (không JS)
├── css/style.css       giao diện (màu ở :root: xanh mực + vàng kim như giao diện game)
├── js/main.js          ảnh trượt: chấm vị trí, nút trái phải, phím mũi tên, tự chuyển 5 s
├── assets/
│   ├── favicon.svg
│   ├── pattern-cloud.svg   hoạ tiết mây lành ở nền đầu trang
│   └── img/
│       ├── giao-dien.jpg, nhan-vat.jpg, lang-ba.jpg, tran-phai.jpg   ảnh trượt ở đầu trang
│       └── og.jpg          ảnh hiện khi chia sẻ link (1200×630, cắt từ giao-dien.jpg)
├── .nojekyll           báo GitHub Pages đừng chạy Jekyll
└── tmp/                nháp cục bộ (bài Facebook, ảnh chụp kiểm), bỏ qua trong .gitignore
```

## Xem thử trên máy

```bash
python -m http.server 8000     # rồi mở http://localhost:8000
```

Mở thẳng `index.html` bằng trình duyệt cũng chạy (mọi đường dẫn đều tương đối, trừ `og:image` phải tuyệt đối
để Facebook đọc được).

## Sửa thường gặp

| Muốn | Sửa ở |
|---|---|
| Đổi link tải launcher | `index.html`: **hai** nút có link `ChienQuocRemaster-Launcher-…zip` (đầu trang và mục `#cai-dat`) |
| Đổi cỡ file / dung lượng | `index.html`: dòng `hero__meta`, bước 1 và 2 của `#cai-dat`, bảng `.spec` |
| Đổi tính năng bản hiện hành | lưới `#ban-3` (nguồn: `documents/tong-quan/00-tong-quan.md` của repo game) |
| Đổi link nhóm cộng đồng | nút "Nhóm Facebook" đầu trang **và** link ở chân trang (nguồn gốc: `godot/data/custom/about.json` của repo game) |
| Bản demo 2.0 offline (Google Drive) | link "Bản cũ" ở chân trang; không còn cập nhật |
| Thêm / bớt ảnh trượt | một `<figure class="slide">` trong `#sliderTrack` (chấm vị trí tự sinh theo số ảnh) |
| Sửa trang hướng dẫn | `huong-dan/index.html`. Nguồn số liệu (repo game): sư môn `godot/data/custom/sect_quests.json`; rèn `forge.json`, `equip_rules.json`; môn phái `sect_skills.json`. Vương Bộ Đầu và Cổ Mộ đang gắn nhãn "Sắp mở": mở thật thì bỏ `gcard--soon` + nhãn, thêm số liệu |
| Đổi màu | biến `--gold-*`, `--ink-*`, `--jade-*` trong `:root` của `style.css` |

## Quy ước chữ

Chữ trên trang là chữ người chơi đọc, theo đúng luật của game (CLAUDE.md của repo game): không viết hoa
cả từ để nhấn mạnh, không dùng gạch dài hay gạch nối đôi, dùng dấu phẩy, hai chấm, ngoặc đơn.

## Kiểm trước khi đẩy

- Trang con (`huong-dan/`) dùng đường dẫn `../` tới `css/`, `assets/`; trang chủ link tới bằng `huong-dan/` (có gạch chéo cuối, GitHub Pages tự chuyển `/huong-dan` sang `/huong-dan/`).

- Khổ điện thoại 375 px không tràn ngang. Cách kiểm đã dùng (2026-10-02): chạy `python -m http.server`,
  đặt trang trong `<iframe>` rộng 375 px rồi liệt kê phần tử có `getBoundingClientRect().right > 375`
  (Edge headless không thu cửa sổ dưới ~500 px nên chụp thẳng `--window-size=375` sẽ sai).
- Ảnh chụp kiểm để trong `tmp/`, không commit.

## Lịch sử thiết kế

- 2026-09-30: bản đầu nhiều mục (lời mở đầu, lời hứa, thư viện ảnh, bảng so sánh, lộ trình) + JS (hạt sáng,
  xem ảnh). Nền đầu trang **không dùng ảnh**: đã thử ảnh màn chính làm mờ (chủ repo: "mờ khó chịu") và ảnh
  map Ba Khâu phủ tối (xỉn). Khung ảnh **không xoay 3D**: nghiêng thì chữ trong ảnh mờ.
- 2026-10-02: bản 3.0 online. Chủ repo: "làm đẹp lại, đơn giản hơn" ⇒ gọn lại, bỏ lời mở đầu, bảng so sánh,
  hạt sáng, xem ảnh lớn. Chủ repo hỏi lại "mấy ảnh cũ đâu" và "lời hứa với lộ trình đâu" ⇒ ảnh cũ thành dải
  trượt ngang ở đầu trang (CSS scroll-snap, vuốt được cả khi tắt JS), giữ "Lời hứa" và "Lộ trình".
  Ảnh màn chính cũ (`hero.jpg`, ghi "Bản Demo 1.0", nút "Chơi offline") đã bỏ; còn trong lịch sử git.
- Kiểm ảnh trượt bằng Edge headless: chạy với `--force-prefers-reduced-motion` (cuộn tức thì) mới đọc được
  `scrollLeft` sau khi bấm nút; ở chế độ thường, thời gian ảo của headless không chạy hết hiệu ứng cuộn mượt.
- 2026-10-02: thêm trang hướng dẫn `/huong-dan/` (chủ repo: nhiệm vụ hằng ngày, tính năng rèn, kĩ năng 7 phái). Kiểm khổ 375 px: 0 phần tử tràn. Chụp headless phải có `--virtual-time-budget`, không thì font tiếng Việt chưa tải, chữ trông như tách dấu (lỗi giả).
