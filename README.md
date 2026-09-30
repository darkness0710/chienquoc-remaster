# website/ · trang giới thiệu Chiến Quốc Remaster

Trang tĩnh thuần HTML + CSS + JS, không cần build, không thư viện ngoài (chỉ font Google).
Dự kiến chép sang repo công khai `chienquoc-remaster` rồi bật GitHub Pages.

```
website/
├── index.html          toàn bộ nội dung
├── css/style.css       giao diện (màu ở :root)
├── js/main.js          menu, hiện dần, đếm số, hạt sáng, xem ảnh, bảng phím
├── assets/
│   ├── favicon.svg
│   └── img/            ảnh chụp trong game, đã nén JPG
└── .nojekyll           báo GitHub Pages đừng chạy Jekyll
```

## Xem thử trên máy

```bash
cd website && python -m http.server 8000     # rồi mở http://localhost:8000
```

Mở thẳng `index.html` bằng trình duyệt cũng chạy (mọi đường dẫn đều tương đối).

## Đưa lên GitHub Pages

1. Tạo repo `chienquoc-remaster` (public), chép **nội dung** thư mục `website/` vào gốc repo đó.
2. Settings → Pages → *Deploy from a branch* → nhánh `main`, thư mục `/ (root)`.
3. Trang lên ở `https://<tài khoản>.github.io/chienquoc-remaster/`.

Chỉ chép `website/`, **không** đẩy repo chính: repo chính là private và chứa
`original_source/` (save, log có tên người chơi, `taikhoan.ini` mật khẩu chữ thô).

## Sửa thường gặp

| Muốn | Sửa ở |
|---|---|
| Có link tải công khai | `CONFIG.downloadUrl` đầu [js/main.js](js/main.js). Để trống thì nút dẫn về nhóm Facebook |
| Đổi link nhóm cộng đồng | `CONFIG.communityUrl` trong `main.js` **và** nút ở mục `#cong-dong` của `index.html` (nguồn gốc: `godot/data/custom/about.json`) |
| Thay / thêm ảnh | `assets/img/`, rồi thêm một `<figure class="shot">` trong mục `#hinh-anh` (nhớ `data-lightbox` tăng dần) |
| Đổi màu | biến `--gold-*`, `--ink-*`, `--jade-*` trong `:root` của `style.css` |

## Quy ước chữ

Chữ trên trang là chữ người chơi đọc, theo đúng luật của game (CLAUDE.md): không viết hoa
cả từ để nhấn mạnh, không dùng gạch dài hay gạch nối đôi, dùng dấu phẩy, hai chấm, ngoặc đơn.

## Nguồn ảnh

| Ảnh | Lấy từ |
|---|---|
| `hero.jpg`, `og.jpg` | `build/ui_start.png` (màn chính) |
| `giao-dien.jpg` | `./run.sh shot build/web_001_ride.png --map=001 --cuoi --ui` |
| `nhan-vat.jpg` | `./run.sh shot build/web_char.png --map=001 --ui --bang=char` |
| `lang-ba.jpg`, `tran-phai.jpg` | khung f0430 / f0470 của `./run.sh demo hero` (`build/demo_hero_f/`), cắt quanh chỗ hành động, phóng ×2 |

Nền phần đầu trang **không dùng ảnh**: CSS + `assets/pattern-cloud.svg`. Đã thử ảnh màn chính làm mờ
(chủ repo: "mờ khó chịu") và ảnh chụp map Ba Khâu phủ tối (trông xỉn, tranh chỗ với khung ảnh).
Khung ảnh ở hero cũng **không xoay 3D**: nghiêng thì chữ trong ảnh bị mờ.
