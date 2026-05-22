# DCShop - Dự án Thương mại Điện tử Công nghệ (Tiểu luận Web)

Chào mừng bạn đến với **DCShop** – một trang web thương mại điện tử chuyên nghiệp cung cấp các sản phẩm Điện thoại, Laptop, PC và Màn hình chính hãng. Đây là sản phẩm hoàn thiện trong môn học Công nghệ Web, được tối ưu hóa toàn diện về hiệu năng, SEO, và chuẩn hóa cấu trúc thư mục phát triển hiện đại.

---

## 🚀 Các Tính năng Nổi bật (Key Features)

1. **Trang Danh mục Động Hợp nhất (`category.html`)**:
   * Hợp nhất 3 trang tĩnh cũ (`categoryDT.html`, `categoryLT.html`, `categoryPC.html`) thành **một trang danh mục thông minh duy nhất**.
   * Dữ liệu tải động 100% từ cơ sở dữ liệu [products.json](file:///d:/TIEULUAN_WEB/products.json) dựa trên tham số truy vấn trên URL (`?cat=dt`, `?cat=lt`, `?cat=pc`).
   * Tự động phân loại và gom nhóm sản phẩm theo thương hiệu (hãng sản xuất) và render giao diện lưới hoàn hảo cùng các Badge nổi bật (`Hot`, `New`, `Siêu phẩm`,...).
   * Tích hợp bộ lọc sắp xếp giá tăng dần / giảm dần động mượt mà.
   
2. **Hệ thống Linh kiện Tái sử dụng (Header/Footer Partials)**:
   * Thanh điều hướng chính (Header) và chân trang (Footer) được quản lý tập trung tại thư mục [partials/](file:///d:/TIEULUAN_WEB/partials/).
   * Khi thực hiện thay đổi menu hoặc thông tin liên hệ, bạn chỉ cần chỉnh sửa một lần duy nhất tại thư mục này.

3. **Cấu trúc Đóng gói Chuyên nghiệp (Build Pipeline)**:
   * Sử dụng tập lệnh [scripts/build.js](file:///d:/TIEULUAN_WEB/scripts/build.js) để tự động lắp ráp Header/Footer vào các trang nội dung chính và đóng gói toàn bộ dự án vào thư mục đầu ra [dist/](file:///d:/TIEULUAN_WEB/dist/).

4. **Kiểm định Chất lượng Mã nguồn Nghiêm ngặt (Linters)**:
   * Tích hợp các công cụ kiểm duyệt tiêu chuẩn cao: **HTML-Validate** (kiểm tra chuẩn HTML5), **Stylelint** (chuẩn hóa mã CSS) và **ESLint** (kiểm duyệt cú pháp JavaScript).
   * Đạt điểm chất lượng hoàn hảo: **0 lỗi và 0 cảnh báo**.

5. **Tự động hóa Triển khai (CI/CD)**:
   * Tự động hóa hoàn toàn quy trình kiểm thử và deploy lên **GitHub Pages** thông qua GitHub Actions (`ci.yml` và `pages-deploy.yml`) mỗi khi đẩy mã nguồn lên nhánh `main`.

---

## 📁 Cấu trúc Thư mục Dự án

```text
TIEULUAN_WEB/
├── .github/workflows/      # Cấu hình tự động kiểm thử và triển khai GitHub Pages
├── dist/                   # Thư mục chứa sản phẩm đóng gói hoàn chỉnh (chạy thực tế)
├── images/                 # Kho lưu trữ hình ảnh gốc của dự án
├── partials/               # Chứa các thành phần giao diện dùng chung (header.html, footer.html)
├── scripts/                # Các tập lệnh tự động hóa (build, sitemap, optimize)
├── category.html           # Trang danh mục sản phẩm động
├── index.html              # Trang chủ chính thức
├── product-detail.html     # Trang chi tiết sản phẩm động
├── search.html             # Trang tìm kiếm sản phẩm
├── gioithieu.html          # Trang giới thiệu thông tin cửa hàng
├── products.json           # Cơ sở dữ liệu sản phẩm của hệ thống
├── style.css               # Mã CSS giao diện, responsive và hiệu ứng
├── main.js                 # Logic JavaScript điều khiển toàn bộ tương tác
├── package.json            # Quản lý thư viện và câu lệnh phát triển
├── sitemap.xml             # Sơ đồ trang web hỗ trợ SEO
└── robots.txt              # Chỉ dẫn dành cho robot tìm kiếm
```

---

## 🛠️ Hướng dẫn Chạy Cục bộ (Local Development)

Để khởi chạy dự án và tiếp tục chỉnh sửa mã nguồn dưới local, bạn hãy làm theo các bước sau:

### 1. Cài đặt các thư viện bổ trợ
Mở Terminal tại thư mục gốc dự án và chạy lệnh:
```bash
npm install
```

### 2. Khởi chạy Máy chủ Thử nghiệm
Khởi động máy chủ phát triển cục bộ tự động làm mới giao diện khi có thay đổi code:
```bash
npm start
```
*Trình duyệt sẽ tự động mở trang web chạy thử tại địa chỉ `http://localhost:8080`.*

### 3. Biên dịch và Đóng gói
Sau khi chỉnh sửa mã nguồn bên ngoài hoặc sửa Header/Footer trong `partials/`, hãy đóng gói lại dự án vào thư mục `dist/` bằng lệnh:
```bash
npm run build
```

### 4. Kiểm tra Lỗi Cú pháp
Quét lỗi toàn bộ các tệp tin HTML, CSS, và JS trong dự án:
```bash
npm run lint
```

---

## 📈 Tối ưu hóa SEO & Khả năng Tiếp cận (Accessibility)
* **SEO**: Tất cả các trang đều chứa các thẻ tiêu chuẩn `<title>`, `<meta description>`, Open Graph và Twitter Card để hiển thị ảnh preview đẹp mắt khi chia sẻ.
* **Hình ảnh**: Tích hợp thuộc tính `alt` mô tả trực quan và cấu hình `loading="lazy"` giúp tăng tốc độ tải trang đáng kể.
* **Tiếp cận**: Sử dụng các thẻ ngữ nghĩa HTML5 (`<header>`, `<main>`, `<nav>`, `<footer>`) và cung cấp đầy đủ thẻ hỗ trợ trình đọc màn hình `aria-label` cho các nút điều hướng.
