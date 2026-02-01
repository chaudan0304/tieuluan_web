# DCShop - Tiểu luận Web

Trang web demo cửa hàng DCShop (điện thoại, laptop, PC).

Nội dung đã tối ưu/cập nhật:

- Thêm thuộc tính `alt` cho ảnh sản phẩm, thêm `loading="lazy"` để cải thiện hiệu năng.
- Chuẩn hóa tên file ảnh (loại bỏ dấu cách/ký tự đặc biệt) và cập nhật đường dẫn trong HTML.
- Cải thiện accessibility: `lang="vi"`, `aria-label` cho input, menu semantic (`<nav><ul>`), thêm `alt` cho logo.
- Thêm meta Open Graph và Twitter Card để chia sẻ đẹp hơn.
- Sửa header cố định (padding-top) để không che nội dung.
- Thay `javascrip.js` thành `main.js` với kiểm tra an toàn.

Cách chạy local:

1. Mở `index.html` trong trình duyệt (không cần server) hoặc dùng một http server như `http-server` (Node).

2. Nếu muốn tiếp tục tối ưu ảnh: nén ảnh sang `webp`, hoặc dùng CDN cho production.

Script hữu ích trong `scripts/`:

- `scripts\update-html-alts.js` — tự động thêm `alt` và `loading="lazy"` và meta OG.
- `scripts\normalize-images.ps1` — chuẩn hóa tên file ảnh; chạy với `-Apply` để áp dụng.

Nếu bạn muốn, tôi có thể tiếp tục: nén ảnh, thêm sitemap.xml, tách `header`/`footer` thành partials hoặc chuyển sang template/React/Next.js.
