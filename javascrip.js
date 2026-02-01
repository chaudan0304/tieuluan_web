// Hiệu ứng chuyển động slider

// Lấy danh sách tất cả các thẻ <img> trong container .aspect-ratio-169
const imgPosition = document.querySelectorAll(".aspect-ratio-169 img")

// Lấy container chứa tất cả các hình ảnh
const imgContainer = document.querySelector('.aspect-ratio-169')

// Lấy danh sách các dot điều hướng slider
const dotItem = document.querySelectorAll(".dot")

// Số lượng hình ảnh trong slider
let imgNuber = imgPosition.length

// Chỉ số hình ảnh hiện tại (mặc định là hình đầu tiên)
let index = 0

// Đặt vị trí ban đầu cho từng hình ảnh trong slider
imgPosition.forEach(function(image, index) {
    // Mỗi hình được dịch chuyển sang phải theo thứ tự (index * 100%)
    image.style.left = index * 100 + "%"

    // Gắn sự kiện click cho các dot để điều hướng slider
    dotItem[index].addEventListener("click", function (){
        slider(index) // Chuyển đến hình tương ứng với dot được click
    })
})

// Hàm tự động chuyển hình sau một khoảng thời gian
function imgSlide () {
    index++; // Tăng chỉ số hình ảnh hiện tại

    // Nếu chỉ số vượt quá số lượng hình, quay lại hình đầu tiên
    if (index >= imgNuber) {index = 0}

    // Gọi hàm slider để thực hiện chuyển hình
    slider(index)
}

// Hàm xử lý chuyển động slider
function slider(index) {
    // Dịch chuyển toàn bộ container hình ảnh sang trái, theo chỉ số
    imgContainer.style.left = "-" + index * 100 + "%"

    // Tìm dot đang được active và xóa class "active"
    const dotActive = document.querySelector('.active')
    dotActive.classList.remove("active")

    // Thêm class "active" vào dot tương ứng với hình hiện tại
    dotItem[index].classList.add("active")
}

// Tự động chạy hàm imgSlide sau mỗi 3 giây
setInterval(imgSlide, 3000)

// Hiệu ứng menu hamburger

// Lấy nút hamburger (biểu tượng menu)
const hamburger = document.querySelector('.hamburger');

// Lấy container menu
const menuContainer = document.querySelector('.menu-container');

// Gắn sự kiện click vào hamburger để hiển thị/ẩn menu
hamburger.addEventListener('click', () => {
    // Thêm hoặc xóa class "active" để toggle trạng thái menu
    menuContainer.classList.toggle('active');
});

// Đóng menu khi click ra bên ngoài

document.addEventListener('click', (e) => {
    // Kiểm tra nếu click không nằm trong menu và hamburger
    if (!menuContainer.contains(e.target) && !hamburger.contains(e.target)) {
        // Xóa class "active" để đóng menu
        menuContainer.classList.remove('active');
    }
});
