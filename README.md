# Chiến Quốc Remaster · trang tải game

Trang tĩnh: HTML + CSS + một file JS nhỏ (ảnh trượt), không cần build, không thư viện ngoài
(chỉ font Google). Chạy trên GitHub Pages: https://darkness0710.github.io/chienquoc-remaster/

```
├── index.html          trang chủ: đầu trang (ảnh trượt ngang), "Bản 3.0 có gì", "Lời hứa", "Cài đặt 3 bước", "Lộ trình", chân trang
├── huong-dan/index.html  trang /huong-dan/: 5 tab (Hằng ngày, Thần Thú, Rèn đồ, Môn phái, Tiện ích), tab con, ảnh trong game
├── css/style.css       giao diện (màu ở :root: xanh mực + vàng kim như giao diện game)
├── js/main.js          ảnh trượt: chấm vị trí, nút trái phải, phím mũi tên, tự chuyển 5 s
├── js/tabs.js          tab trang hướng dẫn (không JS thì mọi mục hiện liền nhau)
├── assets/
│   ├── favicon.svg
│   ├── pattern-cloud.svg   hoạ tiết mây lành ở nền đầu trang
│   └── img/
│       ├── giao-dien.jpg, nhan-vat.jpg, lang-ba.jpg, tran-phai.jpg   ảnh trượt ở đầu trang
│       ├── og.jpg          ảnh hiện khi chia sẻ link (1200×630, cắt từ giao-dien.jpg)
│       └── huong-dan/      19 ảnh minh hoạ trang hướng dẫn (rộng 760 px, JPEG 80)
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
| Thêm mục hướng dẫn | một `<article class="gcard gpanel sub-panel" id=…>` trong `.guide` của tab lớn + một link `#id` trong `.subtabs` của tab đó. `js/tabs.js` tự nhận, không phải sửa JS |
| Chụp lại ảnh hướng dẫn | xem mục *Ảnh trang hướng dẫn* dưới |
| Đổi màu | biến `--gold-*`, `--ink-*`, `--jade-*` trong `:root` của `style.css` |

## Ảnh trang hướng dẫn

Chụp trong repo game bằng `./run.sh shot <ảnh.png> --ui <cờ>` (desktop ẩn, ~15 s một ảnh, cửa sổ 1581×1186),
rồi cắt khung bảng và thu về rộng 760 px. Cờ đã dùng (2026-10-04):

| Ảnh | Cờ chụp |
|---|---|
| `su-mon` | `--map=080 --demo-sect-quest=panel` |
| `truy-bat` | `--bang=dbg:level_max,dbg:sect:3,dbg:cqteam_enter,dbg:cqteam_clear` |
| `co-mo` | `--bang=dbg:level_max,dbg:dungeon_enter:3,dbg:dungeon_kill` |
| `tong-bao` | `--bang=dbg:level_max,tongyeu` |
| `than-thu` | `--bang=dbg:level_max,dbg:beast_all10,charpet` |
| `nang-sao`, `hop-thanh`, `tai-tao`, `tang-pham`, `phong-an` | `--demo-forge=0`, `1`, `2`, `4`, `5` |
| `ki-nang` | `--demo-skills` |
| `dich-tram` | `--bang=dbg:level_max,npc/base/0010` |
| `cam-ve-quan` | `--demo-sect=cvq_ba_dao_no_lang` |
| 6 phái còn lại | ảnh cũ `build/g7_<phái>_<chiêu>.png` của repo game (`--demo-sect=<mã chiêu>`) |

`dbg:<việc>` gửi đúng lệnh nút F2 (`gateway/debug_service.gd`); `charpet`, `tongyeu`, `dbg:` nằm ở
`godot/client/scenes/world/world_session.gd`. Bảng "Hoạt động hôm nay" (`--demo-activity`) chưa dùng được:
nhân vật chụp ảnh thấy "Chưa mở" ở mọi dòng trừ điểm danh.

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
- 2026-10-04: trang hướng dẫn thành tab (chủ repo: "làm dạng tab, cần có ảnh, viết ngắn gọn cho game thủ"):
  5 tab lớn dính dưới thanh trên, tab con dạng chip, mỗi mục chữ trái ảnh phải (điện thoại: ảnh ngay dưới
  tiêu đề), chữ rút về gạch đầu dòng + bảng số. Link cũ `huong-dan/#tai-tao` vẫn mở đúng tab. Kiểm 375 px:
  0 phần tử tràn ở cả 22 mục; 5 tab lớn vừa một hàng (bỏ biểu tượng, chữ .82rem; để biểu tượng thì
  "Tiện ích" khuất). Mở link `#mục`: cuộn tự tính theo chiều cao hai thanh dính, **không** dùng
  `scroll-padding-top` + `scrollIntoView` (đo 3 lần ra đầu mục ở y 1, 148, mong đợi 113: font, ảnh tải
  xong làm đổi bố cục), và cuộn lại sau `load` vì Chrome tự cuộn tới `#id` tới lúc tải xong.
  Chụp headless trang đã cuộn hiện một khoảng tối phía trên thanh trên: lỗi chụp, đo `getBoundingClientRect`
  thì thanh trên ở y = 0.
