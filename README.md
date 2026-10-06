# Chiến Quốc Remaster · trang tải game

Trang tĩnh: HTML + CSS + một file JS nhỏ (ảnh trượt), không cần build, không thư viện ngoài
(chỉ font Google). Chạy trên GitHub Pages: https://darkness0710.github.io/chienquoc-remaster/

```
├── index.html          trang chủ: đầu trang .hero3 (ảnh Đào Hoa phủ toàn khung, cánh hoa bay, dải số liệu), dải "Bản 4.0" .next4, video trailer #trailer + 3 thẻ ảnh,
│                       "Có gì trong game" #co-gi (lưới thẻ ảnh .feats + chip), "Bảy môn phái" #mon-phai, "Lời hứa" + ảnh trượt #loi-hua,
│                       "Cài đặt 3 bước" #cai-dat (kèm thẻ quà tân thủ), "Lộ trình" #lo-trinh, chân trang
├── huong-dan/index.html  trang /huong-dan/: 6 tab (Hằng ngày, Chủ tuyến, Thần Thú, Trang bị, Môn phái, Tiện ích), tab con, ảnh trong game
├── phien-ban/index.html  trang /phien-ban/: mỗi bản một thẻ (ngày phát hành, tính năng mới / cân bằng / sửa lỗi), mới nhất ở trên, mục lục nhảy nhanh dính dưới thanh trên
├── css/style.css       giao diện (màu ở :root: xanh mực + vàng kim như giao diện game)
├── js/main.js          ảnh trượt: chấm vị trí, nút trái phải, phím mũi tên, tự chuyển 5 s; nút phát lớn của video
├── js/tabs.js          tab trang hướng dẫn (không JS thì mọi mục hiện liền nhau)
├── assets/
│   ├── favicon.svg
│   ├── pattern-cloud.svg   hoạ tiết mây lành ở nền đầu trang
│   ├── video/co-mo.mp4    trailer Cổ Mộ (960×720, H.264 + AAC, faststart, ~6 MB)
│   └── img/
│       ├── hero-bg.jpg     nền đầu trang, MỘT file cho mọi màn (1508×1131, JPEG 80). Thay ảnh = ghi đè file này bằng ảnh cùng
│       │                   cỡ (nhân vật ở nửa phải, khối chữ nằm bên trái). Ảnh tạm: Đào Nguyên Thôn (map 289), hồ và hàng đào, hoa
│       │                   rơi, chụp không giao diện (phiên chính 2026-10-06, file nháp dhz_90_70.png)
│       ├── hero-co-mo.jpg  thẻ Cổ Mộ ở #co-gi (1100×785): khung 72 của `./run.sh studio gumu` (repo game, `build/studio_gumu/f0072.jpg`,
│       │                   1600×1200) cắt (500, 315)-(1600, 1100) để bỏ HUD, khung chat, bản đồ góc
│       ├── giao-dien.jpg, nhan-vat.jpg, lang-ba.jpg, tran-phai.jpg   ảnh trượt ở mục #loi-hua
│       ├── og.jpg          ảnh hiện khi chia sẻ link (1200×630, cắt từ giao-dien.jpg)
│       ├── trailer.jpg     ảnh bìa video (khung 330 của bản quay)
│       └── huong-dan/      ảnh minh hoạ trang hướng dẫn (rộng 760 px, JPEG 80) + bua-ma-thuat.png (icon món 79×128,
│                           chép từ repo game godot/assets/custom/icon/item/, hiện 32 px cạnh tên mục, class .gicon)
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
| Đổi tính năng nổi bật ở trang chủ | lưới `.feats` + hàng chip `.chips` của `#co-gi` (thẻ `feats__wide` chiếm hai cột; nguồn: `documents/tong-quan/00-tong-quan.md`, `news.json` của repo game). Thẻ chưa có ảnh (Thành Kiều, câu cá) vẽ bằng CSS (`feat--art`); có ảnh thì đổi sang `<img>` như thẻ khác |
| Khi phát bản mới (4.0 đã làm 2026-10-06) | trang chủ: nhãn "Sắp ra mắt" ở `.hero2__news`, `.next4__label`, mốc cuối `#lo-trinh`, nhãn "Bản 4.0" trên thẻ `.feats`, thẻ quà tân thủ (mã `welcome` đổi quà, bỏ `welcome2`); trang Phiên bản: xem comment trên thẻ `#v4-0` |
| Đổi link nhóm cộng đồng | link "Nhóm Facebook" ở dòng `hero__meta` đầu trang **và** link ở chân trang (nguồn gốc: `godot/data/custom/about.json` của repo game) |
| Bản demo 2.0 offline (Google Drive) | link "Bản cũ" ở chân trang; không còn cập nhật |
| Làm lại video trailer | repo game: `./run.sh studio gumu` (≈3 phút, ra `build/studio_gumu.mp4` 1600×1200 có tiếng; cách dựng ở `tools/README.md` §studio), rồi thu về bản web: `ffmpeg -i build/studio_gumu.mp4 -vf scale=960:720:flags=lanczos -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart assets/video/co-mo.mp4` (ffmpeg có sẵn trong `build/venv-video` của repo game, `imageio_ffmpeg.get_ffmpeg_exe()`) |
| Thêm / bớt ảnh trượt | một `<figure class="slide">` trong `#sliderTrack` (chấm vị trí tự sinh theo số ảnh) |
| Sửa trang hướng dẫn | `huong-dan/index.html`. Nguồn số liệu (repo game): sư môn `godot/data/custom/sect_quests.json`, `sect_sets.json` (`exchange`); rèn `forge.json` (cả khối `charm` Bùa Ma Thuật), `equip_rules.json`; môn phái `sect_skills.json`; Tống Bảo `rare_monster.json`; Cổ Mộ `dungeon_gumu.json`; câu cá `fishing.json` (tài liệu game 54); giá Bảo Khố `treasury.json`. Đọc số từ bản đã phát (worktree nhánh `rel-<bản>`), đừng đọc bản đang sửa dở |
| Sửa tab Chủ tuyến (`#chu-tuyen`) | `huong-dan/index.html`, mục `#ct-tong-quan`, `#ct-vet-nut`, `#ct-hoi-5` đến `#ct-hoi-10`. Nguồn số liệu (repo game): `godot/data/custom/quests/001.json` + `001-act05.json` đến `001-act10.json` (bỏ `001-archive-*`), luật đọc `godot/logic/quest.gd`; tên món `item_names_vi.json` + `custom_items.json`; NPC đứng map nào: `assets/converted/map/<map>/npcs.json`; bảng luyện cấp: `travel.json` (Tân Thủ Tiên Cô). Số thứ tự nhiệm vụ = số trong sổ nhiệm vụ (73 mỗi người: nhiệm vụ riêng phái hồi 8 mang số 55, 56). Bảng nhiệm vụ dùng `.tbl tbl--quest` (điện thoại: mỗi dòng thành một khối dọc) |
| Thêm bản mới vào trang Phiên bản | mỗi lần phát: chép một `<article class="vcard" id="v<số bản, chấm thành gạch>">` lên **đầu** `.vlist` của `phien-ban/index.html` + một link `#id` ở đầu `.vtoc`. Chữ lấy từ tin launcher `godot/data/custom/news.json` của repo game (mỗi bản một tin, đã viết cho người chơi), chia vào ba nhóm `h3.g-new` (Tính năng mới), `h3.g-bal` (Cân bằng), `h3.g-fix` (Sửa lỗi), bổ sung bằng `git log <tag trước>..<tag> --oneline`; ngày = ngày tag (`git tag --sort=creatordate --format='%(refname:short) %(creatordate:short)'`, bỏ tag `assets-*`). Ghi nguồn (tag, commit, file) trong comment HTML trên thẻ. Bản chưa phát (4.0 lúc viết): class `vcard--next`, nhãn "Sắp ra mắt", khối ngày `data-release-date`; khi phát thay bằng `<time datetime>` (hướng dẫn ngay trong comment trên thẻ) |
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
| `thu-cuoi` | `--bang=dbg:level_max,dbg:mount_all10,charmount` (cắt khung bảng) |
| `phong-yeu-kinh` | `--bang=dbg:level_max,mirror_fight` (vào kính, kéo 8 yêu ma lại gần, đứng yên) |
| `phong-yeu-kinh-the` | `--bang=dbg:level_max,mirror_board` (diệt hết, hạ Kính Ma, lật 2 thẻ, cắt khung bảng) |
| `thoi-tiet` | `--map=282 --weather=petal --shot-frames=700` (Đào Hoa Nguyên, chờ hoa rơi đầy màn) |
| `phap-bao`, `canh`, `quang-vu-khi` | cắt từ khung 850 / 330 / 850 của `./run.sh studio gumu` (`build/studio_gumu/f*.jpg`, 1600×1200) |
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
- 2026-10-06: kiểm bằng `tmp/pv/w.html?<rộng>&<trang>` (iframe, liệt kê phần tử tràn, id trùng, neo `#` không đích) chạy Edge headless có
  **`--hide-scrollbars`**: thiếu cờ này thì thanh cuộn dọc của iframe ăn 15 px, "375" thực ra đo ở 360.

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
- 2026-10-05: video trailer Cổ Mộ (chủ repo: "cho video trên, bổ sung hướng dẫn phần pháp bảo hoặc các phần core, miễn sao
  trang chủ và trang hướng dẫn hấp dẫn"). Trang chủ: mục `#trailer` ngay dưới đầu trang, khung viền vàng như ảnh trượt,
  nút phát lớn (JS; không JS thì thanh điều khiển của trình duyệt), 3 thẻ ảnh dẫn sang hướng dẫn; đầu trang thêm dòng "Xem
  video". Trang hướng dẫn: tab "Rèn đồ" đổi tên "Trang bị" (giữ id `#tinh-nang` cho link cũ, không thêm tab lớn thứ 6 vì
  375 px chỉ vừa 5), thêm tab con Pháp bảo (đầu tiên), Quầng vũ khí, Cánh, phi phong. Bảng pháp bảo 3 cột tràn ở
  1280 px (cột 10 sao bị cắt) -> 2 cột "0 sao → 10 sao". Số lớp quầng đổi theo họ vũ khí nên ghi "dày hơn", không ghi số
  lớp. Kiểm 375 px: 0 phần tử tràn ở trang chủ + 3 mục mới (iframe trong `tmp/w375.html`; mỗi trang phải khác query,
  chỉ khác `#` thì iframe không `load` lại).
- 2026-10-05: tab lớn thứ 6 **Chủ tuyến** `#chu-tuyen` (nhiệm vụ chính cấp 1 đến 40, quà từng nhiệm vụ, từng hồi), đặt sau Hằng ngày.
  Sáu tab ở chữ .82rem rộng 429 px, "Tiện ích" khuất ⇒ màn ≤ 419 px chữ .74rem, lề 3 px; ≤ 374 px chữ .7rem. Đo bằng
  `tmp/w375-ct.html?<rộng iframe>`: iframe 390 (màn 375) hàng tab vừa 375 px; 0 phần tử tràn ở 390 / 375 / 360 cho 8 mục mới.
  Bảng nhiệm vụ `.tbl--quest`: máy tính ba cột cho xuống dòng, điện thoại mỗi nhiệm vụ một khối dọc (không cuộn ngang).
- 2026-10-05: tab Hằng ngày viết lại Truy bắt (đơn + nhóm ba độ khó Thường / Khó / Địa Ngục), Cổ Mộ (phí Địa Ngục 700.000,
  lật 2 / 3 / 3 thẻ, không lật trả tiền), Phong Yêu Kính (độc đắc thú Hiếm), Tống Bảo; mỗi mục có **bảng tỉ lệ quà** (số thẻ / 16
  và cơ hội có ít nhất một trong cả lượt lật). Số lấy từ repo game `criminal.json`, `dungeon_gumu.json`, `rare_monster.json`
  (tài liệu game 37 §4.28 đến §4.31). Ô chữ dài dùng `td.wrap-cell`.
- 2026-10-06 (lần 3b): chủ repo "ảnh nền to quá bị mờ": ảnh chụp game chỉ 1508×1131, nên **không bao giờ hiện quá 1:1**. Khối
  đầu trang cao 560 tới 660 px (thêm phần chữ thì ~770 px gồm dải số), khung ảnh rộng tối đa 1508 px giữa màn; màn rộng hơn: hai bên
  là chính file đó làm mờ + tối (`.hero3__fill`), mép ảnh mờ dần vào. Bỏ hiệu ứng phóng chậm (scale 1,08 cũng là phóng quá cỡ).
  Đo bằng `tmp/pv/scale.html?<rộng>` (cỡ hiện / cỡ thật của `object-fit: cover`): 1920 px 1,000 (ảnh 1508 giữa màn), 1440 px 0,955,
  1024 px 0,679, 375 px 0,859, 360 px 0,881. Gộp về một file `hero-bg.jpg` (trước: bản máy tính + bản điện thoại WebP / JPEG) để
  thay ảnh chỉ đổi một file. Ảnh tạm đổi từ dhz_100_80 sang dhz_90_70: ảnh cũ có nhân vật bị cây che (chủ repo chê). Chụp kiểm:
  `tmp/pv/hero4-1920.png`, `hero4-1440.png`, `hero4-1024.png`, `hero4-375.png`, `hero4-360.png`.
- 2026-10-06 (lần 3, cùng ngày): chủ repo xem bản dưới: "ảnh nền vào chưa đẹp, cho ảnh nền chụp ở Đào Hoa Nguyên hoa đào rơi",
  "cách bố trí đoạn đầu chưa đẹp, làm lại". Đầu trang `.hero3`: ảnh Đào Nguyên Thôn phủ **toàn khung** (sau đổi ở lần 3b), lớp màu tối dần về bên trái (khối chữ lệch trái nằm
  trên mặt sông) và mép dưới, hoa đào bên phải để rõ. Tiêu đề hai màu (Chiến Quốc vàng kim, Remaster hồng đào), dòng nhỏ
  "MMORPG Chiến Quốc 2008, hồi sinh", câu "Cố nhân, đã đến lúc trở lại.", hai nút. Số liệu thành dải kính mờ ở chân đầu trang
  (4 cột, điện thoại 2 × 2); số dùng chữ thân bài vì Playfair có số kiểu cổ thòng xuống dòng. 14 cánh hoa CSS bay chéo, ẩn khi
  giảm chuyển động. Ảnh trận Lữ Bố chuyển xuống thẻ Cổ Mộ; `co-mo-tran.jpg` bỏ. Chụp kiểm: `tmp/pv/hero3-1440.png`, `hero3-1024.png`,
  `hero3-375.png`, `hero3-360.png`, `home3-1440-full.png`, `home3-375-full.png`. 0 phần tử tràn ở 375 / 360 / 1024 / 1440 px.
- 2026-10-06: **trang chủ làm lại** (chủ repo: "giờ xấu quá chưa thấy cuốn hút"). Đầu trang: ảnh trận Lữ Bố cắt từ bản quay studio
  (rõ nét, hiện gần 1:1) bên trái, mờ dần sang phải, chữ bên phải; điện thoại ảnh trên chữ dưới (phóng 1,45 vào góc có nhân vật).
  Lớp tối chỉ sau chữ, không phủ cả khung (chủ repo từng chê nền mờ, nền phủ tối "xỉn"). **Đã thử, bỏ:** video trailer làm nền
  (960×720 phóng lên 1440 nhoè, thêm 6 MB); ảnh trailer.jpg phủ toàn khung (lộ chữ HUD "Cổ Mộ (thường) 44:46" và khung chat).
  Thêm dải "Bản 4.0 sắp ra mắt" đè mép dưới đầu trang, lưới 7 thẻ ảnh "Có gì trong game" (thay 16 thẻ biểu tượng của "Bản 3.4 có
  gì"), dải 7 môn phái màu riêng (điện thoại vuốt ngang), lời hứa gộp với ảnh trượt cũ. Hai nút đầu trang: Tải game, Xem hướng
  dẫn (nút Nhóm Facebook thành link ở dòng nhỏ). Hiệu ứng: rê chuột nổi thẻ + phóng ảnh, xuất hiện khi cuộn bằng
  `animation-timeline: view()` trong `@supports` (Firefox / Safari cũ hiện sẵn, không ẩn gì), tôn trọng giảm chuyển động. Kiểm:
  0 phần tử tràn ở 375 / 360 / 1440 px (ảnh đầu trang phóng 1,45 ở điện thoại nằm trong khung `overflow: hidden`, `scrollWidth`
  vẫn bằng bề rộng; `tmp/pv/w.html` bỏ qua `.hero2__media`). Ảnh chụp trước / sau: `tmp/pv/home-before-1440.png`, `home-after-*.png`.
  Ảnh còn thiếu (cần chụp ở repo game): câu cá (`./run.sh shot tmp/cau-ca.png --ui --demo-fishing --map=080 --tile=292,165`,
  tài liệu game 54 §6), Thành Kiều (khi phó bản xong).
- 2026-10-06: trang **Phiên bản** `/phien-ban/` (chủ repo: "ghi rõ từng phiên bản có thay đổi gì, kèm ngày phát hành"): link "Phiên bản" ở thanh trên
  mọi trang (màn dưới 560 px ẩn chữ tên cạnh logo để logo + 3 mục vừa 360 px). 15 thẻ: 4.0 (sắp ra mắt), 3.4.1 tới 3.0.0, 2.0.0, Demo 1.0. 3.4.2 không
  phát (gộp vào 4.0). 3.0.0 và 3.0.3 không có tag git: ngày lấy ở nhật ký repo game ((127), (140)); 3.0.3 không có tin launcher, chữ viết lại từ nhật ký.
  Kiểm 375 / 360 px: 0 phần tử tràn ở trang mới, trang chủ, trang hướng dẫn.
- 2026-10-06: theo bản 3.4.2 (số đọc ở worktree `D:\Projects\Debug-rel`, nhánh `rel-3.4.2`, không đọc bản đang sửa dở). Mục mới:
  Câu cá `#cau-ca` (tab Hằng ngày), Bùa Ma Thuật `#bua-ma-thuat` (tab Trang bị, có icon món), Tiệm đồ `#tiem-do` (tab Tiện ích).
  Sửa: Tống Bảo giết không giới hạn (5 lần đầu rơi đồ, thêm đồ Xanh 10 %, Tinh Thạch cấp 1 15 %), bảng thẻ Cổ Mộ Địa Ngục (Thần
  Thú 2/16, Bùa 1/16), Thăng Phẩm 6 điểm sư môn / 30 điểm Cổ Mộ / 300.000 Bảo Khố, truy bắt (sàn đòn, sống lại 10 / 20 / 30 giây),
  nội tại môn phái, Phi Hành Phù ô phím; trang chủ 3.4 + 2 thẻ. Chưa có ảnh câu cá (cờ chụp ở tài liệu game 54 §6:
  `--demo-fishing --map=080 --tile=292,165`). Kiểm `tmp/w375-34.html?<rộng>#<id mục>` (một mục mỗi lần chạy: nhiều trang trong
  một lần thì Edge headless hết `--virtual-time-budget` trước khi xong): 0 phần tử tràn ở 375 / 360 px cho 13 mục + trang chủ.
