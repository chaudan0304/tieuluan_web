// ============================================
// DCSHOP MAIN.JS - Enhanced & Optimized
// ============================================

(function () {
  "use strict";

  let cartItems = JSON.parse(localStorage.getItem('dcshop_cart')) || [];
  let addToCart;

  // ============================================
  // 1. SLIDER: Fade effect with dots
  // ============================================
  const slides = document.querySelectorAll(".slide-item").length > 0
    ? document.querySelectorAll(".slide-item")
    : document.querySelectorAll(".aspect-ratio-169 img");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;
  const slideInterval = 3000;
  let slideTimer;

  function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle("active", i === index));
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
    currentIndex = index;
  }

  function nextSlide() {
    let next = currentIndex + 1;
    if (next >= slides.length) next = 0;
    showSlide(next);
  }

  function startTimer() {
    slideTimer = setInterval(nextSlide, slideInterval);
  }

  function resetTimer() {
    clearInterval(slideTimer);
    startTimer();
  }

  if (slides.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
        resetTimer();
      });
    });
    showSlide(0);
    startTimer();
  }

  // ============================================
  // 2. HAMBURGER MENU (accessible)
  // ============================================
  const hamburger = document.querySelector(".hamburger");
  const menuContainer = document.querySelector(".menu-container");
  if (hamburger && menuContainer) {
    hamburger.addEventListener("click", () => {
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", String(!expanded));
      menuContainer.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!menuContainer.contains(e.target) && !hamburger.contains(e.target)) {
        menuContainer.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ============================================
  // 3. ACTIVE PAGE HIGHLIGHT
  // ============================================
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const currentSearch = window.location.search;
  const navLinks = document.querySelectorAll("nav.menu a");
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    
    // For category pages with query params, e.g. category.html?cat=dt
    if (href.includes("category.html") && currentPath.includes("category.html")) {
      const linkParams = new URLSearchParams(href.split("?")[1] || "");
      const currentParams = new URLSearchParams(currentSearch);
      if (linkParams.get("cat") === currentParams.get("cat")) {
        link.classList.add("active-page");
      }
    } else if (href === currentPath) {
      link.classList.add("active-page");
    }
  });

  // ============================================
  // 4. BACK TO TOP BUTTON
  // ============================================
  const backToTop = document.createElement("button");
  backToTop.className = "back-to-top";
  backToTop.setAttribute("aria-label", "Cuộn lên đầu trang");
  backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
  document.body.appendChild(backToTop);

  function toggleBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ============================================
  // 5. SCROLL REVEAL ANIMATIONS
  // ============================================
  const revealElements = document.querySelectorAll(
    ".featured-card, .category-right-content-item, .cat-banner, " +
    ".vision-item, .choose-item, .category-right-top-item, .app-container"
  );

  if (revealElements.length > 0 && "IntersectionObserver" in window) {
    revealElements.forEach((el) => el.classList.add("reveal"));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  // ============================================
  // 6. SEARCH FUNCTIONALITY
  // ============================================
  const searchInput = document.querySelector(".search input");
  const searchBtn = document.querySelector(".search-btn");

  function performSearch() {
    if (!searchInput) return;
    const query = searchInput.value.trim();
    if (!query) return;

    // Redirect to search results page
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", performSearch);
  }
  if (searchInput) {
    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") performSearch();
    });
  }

  // Handle Search Results Page Initialization
  const isSearchPage = window.location.pathname.includes("search.html");
  if (isSearchPage) {
    initSearchPage();
  }

  // Handle Dynamic Category Page Initialization
  const isCategoryPage = window.location.pathname.includes("category.html");
  if (isCategoryPage) {
    initCategoryPage();
  }

  function initCategoryPage() {
    const params = new URLSearchParams(window.location.search);
    const activeCat = params.get('cat') || 'dt';
    
    // 1. Update Title and Breadcrumbs
    const catTitles = {
      dt: "Điện thoại",
      lt: "Laptop",
      pc: "PC & Màn hình"
    };
    const activeTitle = catTitles[activeCat] || "Điện thoại";
    document.title = activeTitle + " - DCShop";
    
    const breadcrumbActive = document.getElementById('category-breadcrumb-active');
    if (breadcrumbActive) {
      breadcrumbActive.textContent = activeTitle;
    }
    
    // 2. Update Left Sidebar Category Active State
    const sidebarItems = document.querySelectorAll('#category-left-sidebar ul li.category-left-li');
    sidebarItems.forEach(item => item.classList.remove('active'));
    
    const activeSidebarItem = document.getElementById(`sidebar-cat-${activeCat}`);
    if (activeSidebarItem) {
      activeSidebarItem.classList.add('active');
      
      // Remove any existing submenu
      const existingSub = activeSidebarItem.querySelector('ul');
      if (existingSub) existingSub.remove();
      
      // Inject correct Sub-menu based on active category
      const subMenus = {
        dt: `
          <ul>
            <li><a href="#SS">Samsung</a></li>
            <li><a href="#OP">Oppo</a></li>
            <li><a href="#AP">Iphone</a></li>
          </ul>
        `,
        lt: `
          <ul>
            <li><a href="#HP">HP</a></li>
            <li><a href="#DELL">Dell</a></li>
            <li><a href="#MSI">MSI</a></li>
          </ul>
        `,
        pc: `
          <ul>
            <li><a href="#PC">Thân máy PC</a></li>
            <li><a href="#SS">Màn hình Samsung</a></li>
            <li><a href="#LG">Màn hình LG</a></li>
            <li><a href="#AS">Màn hình Asus</a></li>
          </ul>
        `
      };
      
      activeSidebarItem.insertAdjacentHTML('beforeend', subMenus[activeCat] || '');
    }
    
    // 3. Fetch products and group them
    const rightPane = document.getElementById('category-right-pane');
    if (!rightPane) return;
    
    fetch('products.json')
      .then(res => {
        if (!res.ok) throw new Error('Không thể tải dữ liệu sản phẩm');
        return res.json();
      })
      .then(products => {
        const catProducts = products.filter(p => p.cat === activeCat);
        
        let groups = [];
        if (activeCat === 'dt') {
          groups = [
            {
              id: 'SS',
              header: 'SAMSUNG',
              items: catProducts.filter(p => /samsung/i.test(p.name))
            },
            {
              id: 'OP',
              header: 'OPPO',
              items: catProducts.filter(p => /oppo/i.test(p.name))
            },
            {
              id: 'AP',
              header: 'IPHONE',
              items: catProducts.filter(p => /iphone|apple/i.test(p.name))
            }
          ];
        } else if (activeCat === 'lt') {
          groups = [
            {
              id: 'HP',
              header: 'LAPTOP HP',
              items: catProducts.filter(p => /hp/i.test(p.name))
            },
            {
              id: 'DELL',
              header: 'LAPTOP DELL',
              items: catProducts.filter(p => /dell/i.test(p.name))
            },
            {
              id: 'MSI',
              header: 'LAPTOP MSI',
              items: catProducts.filter(p => /msi/i.test(p.name))
            }
          ];
        } else if (activeCat === 'pc') {
          groups = [
            {
              id: 'PC',
              header: 'THÂN MÁY PC',
              items: catProducts.filter(p => /pc|super halogen|halogen super|hacom/i.test(p.name) && !/màn hình/i.test(p.name))
            },
            {
              id: 'SS',
              header: 'MÀN HÌNH SAMSUNG',
              items: catProducts.filter(p => /màn hình/i.test(p.name) && /samsung/i.test(p.name))
            },
            {
              id: 'LG',
              header: 'MÀN HÌNH LG',
              items: catProducts.filter(p => /màn hình/i.test(p.name) && /lg/i.test(p.name))
            },
            {
              id: 'AS',
              header: 'MÀN HÌNH ASUS',
              items: catProducts.filter(p => /màn hình/i.test(p.name) && /asus/i.test(p.name))
            }
          ];
        }
        
        renderCategoryGroups(groups, rightPane);
      })
      .catch(err => {
        console.error(err);
        rightPane.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; width: 100%; gap: 15px; color: var(--danger); padding: 80px 0;">
            <i class="fas fa-exclamation-triangle" style="font-size: 40px;"></i>
            <p style="font-size: 15px; font-weight: 600;">Lỗi tải dữ liệu sản phẩm</p>
            <p style="font-size: 13px; max-width: 400px; margin: 0;">Có sự cố xảy ra khi cố gắng kết nối tới cơ sở dữ liệu. Vui lòng thử lại sau.</p>
          </div>
        `;
      });
  }

  function getBadgeHtml(product) {
    const badgesMap = {
      // DT
      "dt_2": { class: "badge-hot", text: "Hot" },
      "dt_3": { class: "badge-new", text: "New" },
      "dt_7": { class: "badge-new", text: "New" },
      "dt_10": { class: "badge-promo", text: "Trả góp 0%" },
      "dt_13": { class: "badge-hot", text: "Hot" },
      "dt_17": { class: "badge-discount", text: "-12%" },

      // LT
      "lt_2": { class: "badge-hot", text: "Hot" },
      "lt_3": { class: "badge-new", text: "New" },
      "lt_7": { class: "badge-new", text: "New" },
      "lt_10": { class: "badge-promo", text: "Trả góp 0%" },
      "lt_13": { class: "badge-hot", text: "Hot" },
      "lt_17": { class: "badge-discount", text: "-12%" },
      "lt_19": { class: "badge-hot", text: "Bán chạy" },

      // PC
      "pc_1": { class: "badge-new", text: "Siêu phẩm" },
      "pc_2": { class: "badge-hot", text: "Hot" },
      "pc_6": { class: "badge-discount", text: "-15%" },
      "pc_10": { class: "badge-new", text: "New" },
      "pc_14": { class: "badge-promo", text: "Trả góp 0%" },
      "pc_20": { class: "badge-discount", text: "-10%" },
      "pc_25": { class: "badge-hot", text: "OLED" }
    };
    
    if (badgesMap[product.id]) {
      const badge = badgesMap[product.id];
      return `<span class="product-badge ${badge.class}">${badge.text}</span>`;
    }
    
    // Dynamic fallback matching
    if (product.name.toLowerCase().includes("ultra") || product.name.toLowerCase().includes("pro max")) {
      return `<span class="product-badge badge-hot">Hot</span>`;
    }
    return '';
  }

  function renderCategoryGroups(groups, container) {
    if (groups.length === 0 || groups.every(g => g.items.length === 0)) {
      container.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; width: 100%; gap: 15px; color: var(--gray-600); padding: 80px 0;">
          <i class="fas fa-box-open" style="font-size: 50px; color: var(--gray-400);"></i>
          <p style="font-size: 16px; font-weight: 600; margin: 0;">Không tìm thấy sản phẩm nào</p>
          <p style="font-size: 13px; max-width: 400px; margin: 0;">Danh mục hiện đang trống hoặc đang cập nhật sản phẩm.</p>
        </div>
      `;
      return;
    }
    
    let html = '';
    
    groups.forEach((group, index) => {
      if (group.items.length === 0) return;
      
      const productsHtml = group.items.map(p => `
        <div class="category-right-content-item" data-id="${p.id}">
          ${getBadgeHtml(p)}
          <div class="product-media">
            <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='images/dcshoplogo.png';">
          </div>
          <h3>${p.name}</h3>
          <p>${p.price} đồng</p>
        </div>
      `).join('');
      
      if (index === 0) {
        html += `
          <div class="category-right-top">
            <div class="category-right-top-item" id="${group.id}">
              <p>${group.header}</p>
            </div>
            <div class="category-right-top-item">
              <button type="button" class="filter-btn">
                <span>Bộ lọc</span> <i class="fas fa-sort-down" aria-hidden="true"></i>
              </button>
            </div>
            <div class="category-right-top-item">
              <select name="sort" id="sort-select" aria-label="Sắp xếp sản phẩm">
                <option value="">Sắp xếp</option>
                <option value="low-high">Giá thấp đến cao</option>
                <option value="high-low">Giá cao xuống thấp</option>
              </select>
            </div>
          </div>
          <div class="category-right-content row">
            ${productsHtml}
          </div>
        `;
      } else {
        html += `
          <div class="category-right-top-item" id="${group.id}">
            <p>${group.header}</p>
          </div>
          <div class="category-right-content row">
            ${productsHtml}
          </div>
        `;
      }
    });
    
    container.innerHTML = html;
    
    // Wire up clicks to go to product details
    const cards = container.querySelectorAll('.category-right-content-item');
    cards.forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        window.location.href = `product-detail.html?id=${encodeURIComponent(id)}`;
      });
    });
    
    // Set up delegated change event for sorting
    const pane = document.getElementById('category-right-pane');
    if (pane) {
      pane.addEventListener('change', (e) => {
        if (e.target && e.target.id === 'sort-select') {
          const value = e.target.value;
          const contentGrids = pane.querySelectorAll('.category-right-content');
          contentGrids.forEach((grid) => {
            const items = Array.from(grid.querySelectorAll('.category-right-content-item'));
            if (items.length === 0) return;
            items.sort((a, b) => {
              const priceA = parsePrice(a.querySelector('p'));
              const priceB = parsePrice(b.querySelector('p'));
              if (value === 'low-high') return priceA - priceB;
              if (value === 'high-low') return priceB - priceA;
              return 0;
            });
            items.forEach((item) => grid.appendChild(item));
          });
        }
      });
    }
    
    // Trigger intersection observer reveal
    const revealElements = container.querySelectorAll('.category-right-content-item, .category-right-top-item');
    if (revealElements.length > 0 && "IntersectionObserver" in window) {
      revealElements.forEach(el => {
        el.classList.add('reveal');
      });
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px 50px 0px" }
      );
      revealElements.forEach(el => observer.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('revealed'));
    }
  }

  function initSearchPage() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q') || '';
    
    // Fill search input if query exists
    if (searchInput && query) {
      searchInput.value = query;
    }

    const searchTitle = document.getElementById('search-title');
    const searchCount = document.getElementById('search-count');
    const grid = document.getElementById('search-results-grid');

    if (!grid) return;

    if (searchTitle && query) {
      searchTitle.textContent = `Kết quả tìm kiếm cho "${query}"`;
    }

    // Loading skeleton/spinner
    grid.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; gap: 15px; color: var(--gray-600); padding: 50px 0;">
        <i class="fas fa-spinner fa-spin" style="font-size: 36px; color: var(--primary);"></i>
        <p style="font-size: 14px; font-weight: 500;">Đang tìm kiếm sản phẩm trên hệ thống...</p>
      </div>
    `;

    let allProducts = [];
    let textMatchedProducts = [];

    const catFilters = document.querySelectorAll('input[name="filter-cat"]');
    const priceFilters = document.querySelectorAll('input[name="filter-price"]');

    function applyFilters() {
      if (textMatchedProducts.length === 0) {
        renderNoResults(grid, searchCount);
        return;
      }

      // 1. Category Filter
      let activeCat = 'all';
      catFilters.forEach(f => {
        if (f.checked) activeCat = f.value;
      });

      // 2. Price Filter
      let activePriceRange = 'all';
      priceFilters.forEach(f => {
        if (f.checked) activePriceRange = f.value;
      });

      let filtered = textMatchedProducts;

      // Filter by category
      if (activeCat !== 'all') {
        filtered = filtered.filter(p => p.cat === activeCat);
      }

      // Filter by price
      if (activePriceRange !== 'all') {
        filtered = filtered.filter(p => {
          const priceVal = parseInt(p.price.replace(/[^\d]/g, ''), 10) || 0;
          if (activePriceRange === 'under-15') {
            return priceVal < 15000000;
          } else if (activePriceRange === '15-25') {
            return priceVal >= 15000000 && priceVal <= 25000000;
          } else if (activePriceRange === 'over-25') {
            return priceVal > 25000000;
          }
          return true;
        });
      }

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; width: 100%; gap: 15px; color: var(--gray-600); padding: 50px 0;">
            <i class="fas fa-filter" style="font-size: 40px; color: var(--gray-400);"></i>
            <p style="font-size: 15px; font-weight: 600;">Không tìm thấy sản phẩm phù hợp bộ lọc</p>
            <p style="font-size: 13px; max-width: 400px; margin: 0;">Vui lòng thử chọn bộ lọc khác để tìm thấy sản phẩm mong muốn.</p>
          </div>
        `;
        if (searchCount) {
          searchCount.textContent = 'Tìm thấy 0 sản phẩm phù hợp bộ lọc.';
        }
      } else {
        if (searchCount) {
          searchCount.textContent = `Tìm thấy ${filtered.length} sản phẩm phù hợp.`;
        }

        grid.innerHTML = filtered.map(p => {
          return `
            <div class="category-right-content-item" data-id="${p.id}">
              <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='images/dcshoplogo.png';">
              <h3>${p.name}</h3>
              <p>${p.price} đồng</p>
            </div>
          `;
        }).join('');

        // Wire up clicks to go to details page
        const cards = grid.querySelectorAll('.category-right-content-item');
        cards.forEach(card => {
          card.style.cursor = 'pointer';
          card.addEventListener('click', () => {
            const id = card.dataset.id;
            window.location.href = `product-detail.html?id=${encodeURIComponent(id)}`;
          });
        });
      }
    }

    // Add event listeners to filter radios
    catFilters.forEach(f => {
      f.addEventListener('change', applyFilters);
    });
    priceFilters.forEach(f => {
      f.addEventListener('change', applyFilters);
    });

    fetch('products.json')
      .then(res => {
        if (!res.ok) throw new Error('Không thể tải dữ liệu sản phẩm');
        return res.json();
      })
      .then(products => {
        allProducts = products;
        if (!query.trim()) {
          renderNoResults(grid, searchCount);
          return;
        }

        const queryClean = query.trim().toLowerCase();
        // Match items by name or category matching
        textMatchedProducts = allProducts.filter(p => {
          const nameMatch = p.name.toLowerCase().includes(queryClean);
          const catMap = { dt: 'điện thoại smart phone', lt: 'laptop máy tính xách tay', pc: 'màn hình máy tính pc desktop' };
          const catText = catMap[p.cat] || '';
          const catMatch = catText.includes(queryClean);
          return nameMatch || catMatch;
        });

        applyFilters();
      })
      .catch(err => {
        console.error(err);
        grid.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; width: 100%; gap: 15px; color: var(--danger); padding: 50px 0;">
            <i class="fas fa-exclamation-triangle" style="font-size: 40px;"></i>
            <p style="font-size: 15px; font-weight: 600;">Lỗi tải dữ liệu sản phẩm</p>
            <p style="font-size: 13px; max-width: 400px; margin: 0;">Có sự cố xảy ra khi cố gắng kết nối tới cơ sở dữ liệu. Vui lòng thử lại sau.</p>
          </div>
        `;
      });
  }

  function renderNoResults(grid, searchCount) {
    if (searchCount) {
      searchCount.textContent = 'Không tìm thấy sản phẩm nào.';
    }
    grid.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; width: 100%; gap: 15px; color: var(--gray-600); padding: 50px 0;">
        <i class="fas fa-search-minus" style="font-size: 50px; color: var(--gray-400);"></i>
        <p style="font-size: 16px; font-weight: 600; margin: 0;">Rất tiếc, không tìm thấy sản phẩm phù hợp</p>
        <p style="font-size: 13px; max-width: 400px; margin: 0;">Hãy thử tìm kiếm bằng các từ khóa phổ biến khác (ví dụ: "iPhone", "Samsung", "Dell", "Màn hình").</p>
        <a href="index.html" class="btn-shop-now" style="margin-top: 10px;">Quay lại trang chủ</a>
      </div>
    `;
  }

  // ============================================
  // 7. SORT FUNCTIONALITY
  // ============================================
  const sortSelects = document.querySelectorAll(".category-right-top-item select");
  sortSelects.forEach((select) => {
    select.addEventListener("change", function () {
      const value = this.value;
      // Find the closest product grid
      const categoryRight = this.closest(".category-right");
      if (!categoryRight) return;

      const contentGrids = categoryRight.querySelectorAll(".category-right-content");
      contentGrids.forEach((grid) => {
        const items = Array.from(grid.querySelectorAll(".category-right-content-item"));
        if (items.length === 0) return;

        items.sort((a, b) => {
          const priceA = parsePrice(a.querySelector("p"));
          const priceB = parsePrice(b.querySelector("p"));
          if (value === "low-high") return priceA - priceB;
          if (value === "high-low") return priceB - priceA;
          return 0;
        });

        items.forEach((item) => grid.appendChild(item));
      });
    });
  });

  function parsePrice(el) {
    if (!el) return 0;
    const text = el.textContent.replace(/[^\d]/g, "");
    return parseInt(text, 10) || 0;
  }

  // ============================================
  // 8. TOAST NOTIFICATION
  // ============================================
  function showToast(message) {
    const existing = document.querySelector(".toast-notification");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("show"));

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // ============================================
  // 9. SIDEBAR COLLAPSE ON MOBILE
  // ============================================
  const sidebarLinks = document.querySelectorAll(".category-left-li > a");
  sidebarLinks.forEach((link) => {
    const subMenu = link.nextElementSibling;
    if (subMenu && subMenu.tagName === "UL") {
      link.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          subMenu.classList.toggle("collapsed");
          link.classList.toggle("expanded");
        }
      });
    }
  });

  // ============================================
  // 10. IMAGE ERROR FALLBACK
  // ============================================
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", function () {
      if (!this.dataset.fallback) {
        this.dataset.fallback = "true";
        this.style.opacity = "0.3";
        this.alt = "Hình ảnh không khả dụng";
      }
    });
  });

  // ============================================
  // 11. HEADER SHRINK ON SCROLL
  // ============================================
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.classList.add("header-scrolled");
      } else {
        header.classList.remove("header-scrolled");
      }
    }, { passive: true });
  }

  // ============================================
  // 12. DARK MODE TOGGLE
  // ============================================
  const themeToggle = document.getElementById("theme-toggle");
  
  // Create a sun icon if it doesn't exist inside the button
  if (themeToggle && !themeToggle.querySelector('.fa-sun')) {
    const sunIcon = document.createElement('i');
    sunIcon.className = 'fas fa-sun';
    themeToggle.appendChild(sunIcon);
  }

  function setTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("dcshop_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("dcshop_theme", "light");
    }
  }

  // Initialize theme from storage
  const savedTheme = localStorage.getItem("dcshop_theme");
  if (savedTheme === "dark") {
    setTheme(true);
  } else if (savedTheme === "light") {
    setTheme(false);
  } else {
    // Check system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isCurrentlyDark = document.documentElement.classList.contains("dark-mode");
      setTheme(!isCurrentlyDark);
    });
  }

  // ============================================
  // 12. PRODUCT DETAIL PAGE LOGIC
  // ============================================
  const isDetailPage = document.querySelector('.product-detail-layout') || document.querySelector('.product-detail');
  if (isDetailPage) {
    initProductDetail();
  }

  function initProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id') || '';
    const fallbackName = params.get('name') || '';
    const fallbackImg = params.get('img') || '';
    const fallbackPrice = params.get('price') || '0';
    const fallbackCategory = params.get('cat') || 'dt';

    // Show a skeleton style while fetching
    const specsSummary = document.getElementById('pd-specs-summary');
    if (specsSummary) {
      specsSummary.innerHTML = `
        <div class="pd-spec-item skeleton-pulse" style="width: 100px; height: 20px; background: var(--gray-200); border-radius: 4px;"></div>
        <div class="pd-spec-item skeleton-pulse" style="width: 100px; height: 20px; background: var(--gray-200); border-radius: 4px;"></div>
        <div class="pd-spec-item skeleton-pulse" style="width: 100px; height: 20px; background: var(--gray-200); border-radius: 4px;"></div>
      `;
    }

    fetch('products.json')
      .then(res => {
        if (!res.ok) throw new Error('Không thể tải sản phẩm');
        return res.json();
      })
      .then(products => {
        let product = null;
        if (productId) {
          product = products.find(p => p.id === productId);
        } else if (fallbackName) {
          product = products.find(p => p.name.toLowerCase() === fallbackName.toLowerCase());
        }

        if (!product) {
          // Fallback to URL params
          product = {
            id: productId || 'unknown',
            name: fallbackName || 'Sản phẩm',
            price: fallbackPrice,
            img: fallbackImg,
            cat: fallbackCategory
          };
        }

        renderProductDetails(product, products);
      })
      .catch(err => {
        console.error(err);
        // Fallback directly
        const product = {
          id: productId || 'unknown',
          name: fallbackName || 'Sản phẩm',
          price: fallbackPrice,
          img: fallbackImg,
          cat: fallbackCategory
        };
        renderProductDetails(product, []);
      });
  }

  function renderProductDetails(product, allProducts) {
    const productName = product.name;
    const productPrice = product.price;
    const productImg = product.img;
    const productCategory = product.cat;

    document.title = productName + ' - DCShop';
    const titleEl = document.getElementById('pd-title');
    if (titleEl) titleEl.textContent = productName;

    const breadcrumbProduct = document.getElementById('breadcrumb-product');
    if (breadcrumbProduct) breadcrumbProduct.textContent = productName;

    const catMap = {
      dt: { name: 'Điện thoại', href: 'category.html?cat=dt' },
      lt: { name: 'Laptop', href: 'category.html?cat=lt' },
      pc: { name: 'PC & Màn hình', href: 'category.html?cat=pc' }
    };
    const cat = catMap[productCategory] || catMap.dt;
    const breadcrumbCat = document.getElementById('breadcrumb-category');
    if (breadcrumbCat) {
      breadcrumbCat.textContent = cat.name;
      breadcrumbCat.href = cat.href;
    }

    const priceEl = document.getElementById('pd-price');
    if (priceEl) priceEl.textContent = productPrice + ' đồng';

    const priceNum = parseInt(productPrice.replace(/[^\d]/g, ''), 10) || 0;
    if (priceNum > 0) {
      const oldPrice = Math.round(priceNum * 1.12);
      const oldPriceEl = document.getElementById('pd-old-price');
      const discountEl = document.getElementById('pd-discount');
      if (oldPriceEl) oldPriceEl.textContent = oldPrice.toLocaleString('vi-VN') + ' đồng';
      if (discountEl) {
        discountEl.textContent = '-12%';
        discountEl.style.display = '';
      }
    }

    const mainImg = document.getElementById('pd-img-main');
    if (mainImg && productImg) {
      mainImg.src = productImg;
      mainImg.alt = productName;
    }

    const thumbContainer = document.getElementById('pd-thumbnails');
    if (thumbContainer && productImg) {
      thumbContainer.innerHTML = '';
      for (let i = 0; i < 4; i++) {
        const thumb = document.createElement('img');
        thumb.src = productImg;
        thumb.alt = productName + ' - Góc ' + (i + 1);
        if (i === 0) thumb.classList.add('active');
        thumb.addEventListener('click', () => {
          thumbContainer.querySelectorAll('img').forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
          if (mainImg) mainImg.src = thumb.src;
        });
        thumbContainer.appendChild(thumb);
      }
    }

    const specsMap = {
      dt: [
        { icon: 'fas fa-microchip', text: 'Snapdragon 8 Gen 3 for Galaxy' },
        { icon: 'fas fa-memory', text: 'RAM 12GB' },
        { icon: 'fas fa-hdd', text: 'Bộ nhớ 256GB / 512GB / 1TB' },
        { icon: 'fas fa-camera', text: 'Camera 200MP' },
        { icon: 'fas fa-battery-full', text: 'Pin 5000mAh' },
        { icon: 'fas fa-mobile-alt', text: 'Màn hình 6.8" AMOLED 2X' }
      ],
      lt: [
        { icon: 'fas fa-microchip', text: 'Intel Core i5-1335U' },
        { icon: 'fas fa-memory', text: 'RAM 16GB DDR4' },
        { icon: 'fas fa-hdd', text: 'SSD 512GB NVMe' },
        { icon: 'fas fa-desktop', text: '15.6" Full HD IPS' },
        { icon: 'fas fa-battery-full', text: 'Pin 45Wh, 8 tiếng' },
        { icon: 'fas fa-weight-hanging', text: 'Trọng lượng 1.7kg' }
      ],
      pc: [
        { icon: 'fas fa-microchip', text: 'Intel Core i5-14400F' },
        { icon: 'fas fa-memory', text: 'RAM 16GB DDR5' },
        { icon: 'fas fa-hdd', text: 'SSD 512GB NVMe' },
        { icon: 'fas fa-gamepad', text: 'RTX 4070 12GB' },
        { icon: 'fas fa-plug', text: 'PSU 650W 80+ Gold' },
        { icon: 'fas fa-wind', text: 'Tản nhiệt RGB' }
      ]
    };

    const specsSummary = document.getElementById('pd-specs-summary');
    if (specsSummary) {
      const specs = specsMap[productCategory] || specsMap.dt;
      specsSummary.innerHTML = specs.map(s =>
        `<div class="pd-spec-item"><i class="${s.icon}"></i><span>${s.text}</span></div>`
      ).join('');
    }

    const colorMap = {
      dt: ['Titanium Gray', 'Titanium Black', 'Titanium Yellow', 'Titanium Violet'],
      lt: ['Bạc', 'Xám', 'Đen'],
      pc: ['Đen', 'Trắng']
    };
    const colorHexMap = {
      'Titanium Gray': '#8e8e93',
      'Titanium Black': '#1c1c1e',
      'Titanium Yellow': '#e6ca97',
      'Titanium Violet': '#5e5061',
      'Bạc': '#d1d5db',
      'Xám': '#707375',
      'Đen': '#111827',
      'Trắng': '#ffffff'
    };
    const colorGroup = document.getElementById('pd-color-group');
    const colorContainer = document.getElementById('pd-colors');
    if (colorGroup && colorContainer) {
      colorGroup.style.display = '';
      const colors = colorMap[productCategory] || colorMap.dt;
      colorContainer.innerHTML = colors.map((c, i) => {
        const hex = colorHexMap[c] || '#ccc';
        const borderStyle = hex.toLowerCase() === '#ffffff' || hex.toLowerCase() === '#e3e4e5' ? ' border: 1px solid #ccc;' : '';
        return `<button type="button" class="pd-color-btn${i === 0 ? ' active' : ''}"><span class="color-dot" style="background-color: ${hex};${borderStyle}"></span>${c}</button>`;
      }).join('');
      colorContainer.querySelectorAll('.pd-color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          colorContainer.querySelectorAll('.pd-color-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });
    }

    if (productCategory === 'dt') {
      const storageGroup = document.getElementById('pd-storage-group');
      const storageContainer = document.getElementById('pd-storages');
      if (storageGroup && storageContainer) {
        storageGroup.style.display = '';
        const storages = ['256GB', '512GB', '1TB'];
        storageContainer.innerHTML = storages.map((s, i) =>
          `<button type="button" class="pd-storage-btn${i === 0 ? ' active' : ''}">${s}</button>`
        ).join('');
        storageContainer.querySelectorAll('.pd-storage-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            storageContainer.querySelectorAll('.pd-storage-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
          });
        });
      }
    }

    const specsTableMap = {
      dt: [
        ['Màn hình', '6.8 inch, Dynamic AMOLED 2X, QHD+, 120Hz'],
        ['Hệ điều hành', 'Android 14, One UI 6.1'],
        ['Chip xử lý', 'Snapdragon 8 Gen 3 for Galaxy'],
        ['RAM', '12GB'],
        ['Bộ nhớ trong', '256GB / 512GB / 1TB'],
        ['Camera sau', '200MP + 50MP + 12MP + 10MP'],
        ['Camera trước', '12MP'],
        ['Pin', '5000 mAh, sạc nhanh 45W'],
        ['SIM', '2 Nano SIM hoặc 1 Nano SIM + eSIM'],
        ['Kết nối', '5G, WiFi 7, Bluetooth 5.3, NFC'],
        ['Trọng lượng', '232g'],
        ['Kích thước', '162.3 x 79 x 8.6 mm']
      ],
      lt: [
        ['Màn hình', '15.6 inch, Full HD IPS, 60Hz'],
        ['CPU', 'Intel Core i5-1335U (10 lõi, xung 4.6GHz)'],
        ['RAM', '16GB DDR4 3200MHz'],
        ['Ổ cứng', '512GB SSD NVMe PCIe'],
        ['Card đồ họa', 'Intel Iris Xe Graphics'],
        ['Hệ điều hành', 'Windows 11 Home'],
        ['Pin', '45Wh, thời lượng ~8 tiếng'],
        ['Cổng kết nối', '2x USB 3.2, 1x USB-C, HDMI, Jack 3.5mm'],
        ['WiFi', 'WiFi 6 (802.11ax)'],
        ['Trọng lượng', '1.7 kg'],
        ['Màu sắc', 'Bạc'],
        ['Bảo hành', '24 tháng chính hãng']
      ],
      pc: [
        ['CPU', 'Intel Core i5-14400F (10 lõi, 4.7GHz Turbo)'],
        ['Mainboard', 'ASUS PRIME B760M-K'],
        ['RAM', '16GB DDR5 4800MHz (2x8GB)'],
        ['VGA', 'NVIDIA GeForce RTX 4070 12GB'],
        ['SSD', '512GB NVMe PCIe Gen4'],
        ['PSU', '650W 80+ Gold'],
        ['Case', 'Corsair 4000D Airflow'],
        ['Tản nhiệt', 'DeepCool AK400 RGB'],
        ['Hệ điều hành', 'Windows 11 Home'],
        ['Kết nối', 'WiFi 6, Bluetooth 5.2, LAN 2.5Gbps'],
        ['Cổng USB', '6x USB 3.2, 2x USB-C'],
        ['Bảo hành', '36 tháng']
      ]
    };

    const specsTable = document.getElementById('pd-specs-table');
    if (specsTable) {
      const rows = specsTableMap[productCategory] || specsTableMap.dt;
      specsTable.innerHTML = rows.map(([label, value]) =>
        `<tr><td>${label}</td><td>${value}</td></tr>`
      ).join('');
    }

    const descMap = {
      dt: `<h3>Thiết kế đẳng cấp</h3>
           <p>Sản phẩm sở hữu thiết kế nguyên khối sang trọng với khung viền titan bền bỉ. Mặt lưng kính cường lực cao cấp mang đến cảm giác cầm nắm thoải mái và chắc chắn.</p>
           <h3>Hiệu năng vượt trội</h3>
           <p>Trang bị chip xử lý thế hệ mới nhất, đem lại hiệu suất xử lý đa nhiệm mạnh mẽ. Chơi game, chỉnh sửa video 4K hay xử lý các tác vụ nặng đều mượt mà.</p>
           <h3>Camera chuyên nghiệp</h3>
           <p>Cụm camera sau với cảm biến chính lên đến 200MP cho phép chụp ảnh chi tiết sắc nét trong mọi điều kiện ánh sáng. Chế độ chụp đêm Night Mode cải tiến giúp bạn ghi lại mọi khoảnh khắc.</p>`,
      lt: `<h3>Hiệu năng cho công việc</h3>
           <p>Laptop trang bị bộ vi xử lý Intel Core thế hệ 13, đáp ứng tốt nhu cầu học tập, văn phòng và giải trí đa phương tiện. Bộ nhớ 16GB RAM giúp đa nhiệm mượt mà.</p>
           <h3>Thiết kế mỏng nhẹ</h3>
           <p>Với trọng lượng chỉ 1.7kg, laptop dễ dàng mang theo bên mình. Thiết kế hiện đại, bàn phím full-size thoải mái khi gõ phím thời gian dài.</p>
           <h3>Màn hình sắc nét</h3>
           <p>Màn hình 15.6 inch Full HD IPS hiển thị hình ảnh rõ ràng, góc nhìn rộng 178°. Thích hợp cho làm việc với bảng tính, xem phim và thiết kế đồ họa nhẹ.</p>`,
      pc: `<h3>Cấu hình Gaming mạnh mẽ</h3>
           <p>PC được trang bị bộ vi xử lý Intel Core i5 thế hệ 14 kết hợp card đồ họa RTX 4070 12GB, đem lại trải nghiệm gaming đỉnh cao ở độ phân giải 2K với ray tracing.</p>
           <h3>Tản nhiệt hiệu quả</h3>
           <p>Hệ thống tản nhiệt cao cấp với case Corsair 4000D Airflow cùng tản nhiệt CPU DeepCool AK400 RGB giúp hệ thống luôn mát mẻ trong các phiên gaming dài.</p>
           <h3>Nâng cấp dễ dàng</h3>
           <p>Mainboard B760 hỗ trợ DDR5, 2 slot M.2 NVMe cho phép nâng cấp RAM và SSD trong tương lai. Nguồn 650W dư sức cho các bản nâng cấp phần cứng.</p>`
    };

    const descEl = document.getElementById('pd-description');
    if (descEl) {
      descEl.innerHTML = descMap[productCategory] || descMap.dt;
    }

    document.querySelectorAll('.pd-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.pd-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.pd-tab-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const target = document.getElementById('tab-' + tab.dataset.tab);
        if (target) target.classList.add('active');
      });
    });

    const qtyInput = document.getElementById('pd-qty-input');
    const qtyMinus = document.getElementById('pd-qty-minus');
    const qtyPlus = document.getElementById('pd-qty-plus');
    if (qtyInput && qtyMinus && qtyPlus) {
      qtyMinus.addEventListener('click', () => {
        const v = parseInt(qtyInput.value) || 1;
        if (v > 1) qtyInput.value = v - 1;
      });
      qtyPlus.addEventListener('click', () => {
        const v = parseInt(qtyInput.value) || 1;
        if (v < 99) qtyInput.value = v + 1;
      });
    }

    const addCartBtn = document.getElementById('pd-add-cart');
    if (addCartBtn) {
      addCartBtn.addEventListener('click', () => {
        const qtyInput = document.getElementById('pd-qty-input');
        const qty = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;
        
        const selectedColorBtn = document.querySelector('.pd-color-btn.active');
        const selectedStorageBtn = document.querySelector('.pd-storage-btn.active');
        let nameWithAttrs = productName;
        if (selectedStorageBtn) nameWithAttrs += ` (${selectedStorageBtn.textContent})`;
        if (selectedColorBtn) nameWithAttrs += ` - ${selectedColorBtn.textContent}`;

        addToCart({
          name: nameWithAttrs,
          img: productImg,
          price: productPrice,
          qty: qty
        });
      });
    }

    const buyNowBtn = document.getElementById('pd-buy-now');
    if (buyNowBtn) {
      buyNowBtn.addEventListener('click', () => {
        const qtyInput = document.getElementById('pd-qty-input');
        const qty = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;
        
        const selectedColorBtn = document.querySelector('.pd-color-btn.active');
        const selectedStorageBtn = document.querySelector('.pd-storage-btn.active');
        let nameWithAttrs = productName;
        if (selectedStorageBtn) nameWithAttrs += ` (${selectedStorageBtn.textContent})`;
        if (selectedColorBtn) nameWithAttrs += ` - ${selectedColorBtn.textContent}`;

        addToCart({
          name: nameWithAttrs,
          img: productImg,
          price: productPrice,
          qty: qty
        }, false);
        
        const drawer = document.getElementById('cart-drawer');
        const overlay = document.querySelector('.cart-overlay');
        if (drawer && overlay) {
          drawer.classList.add('open');
          overlay.classList.add('open');
        }
      });
    }

    // Dynamic Related Products
    const relatedGrid = document.getElementById('pd-related-grid');
    if (relatedGrid && allProducts.length > 0) {
      const sameCategory = allProducts.filter(p => p.cat === productCategory && p.id !== product.id);
      const shuffled = sameCategory.sort(() => 0.5 - Math.random());
      const selectedRelated = shuffled.slice(0, 3);
      const badges = ['HOT', 'NEW', ''];

      relatedGrid.innerHTML = selectedRelated.map((p, index) => {
        const badgeText = badges[index % badges.length];
        const badgeHtml = badgeText ? `<span class="pd-badge pd-badge-${badgeText.toLowerCase()}">${badgeText}</span>` : '';
        return `<a class="pd-related-card" href="product-detail.html?id=${p.id}">
          <div class="pd-related-card-img-wrapper">
            ${badgeHtml}
            <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='images/dcshoplogo.png';">
          </div>
          <div class="pd-rc-body">
            <h4>${p.name}</h4>
            <p class="pd-rc-price">${p.price} đồng</p>
          </div>
        </a>`;
      }).join('');
    }
  }

  // ============================================
  // 13. MAKE PRODUCT CARDS CLICKABLE
  // ============================================
  const productCards = document.querySelectorAll('.category-right-content-item');
  if (productCards.length > 0) {
    fetch('products.json')
      .then(res => {
        if (!res.ok) throw new Error('Cannot load products');
        return res.json();
      })
      .then(products => {
        productCards.forEach(card => {
          if (card.closest('a')) return;
          
          const h3 = card.querySelector('h3');
          const img = card.querySelector('img');
          const priceP = card.querySelector('p');
          if (!h3) return;

          const name = h3.textContent.trim();
          
          // Determine category from page URL
          const page = window.location.pathname.split('/').pop();
          let cat = 'dt';
          if (page.includes('category.html')) {
            const params = new URLSearchParams(window.location.search);
            cat = params.get('cat') || 'dt';
          } else if (page.includes('LT')) {
            cat = 'lt';
          } else if (page.includes('PC')) {
            cat = 'pc';
          }

          const imgSrc = img ? img.getAttribute('src') : '';
          const price = priceP ? priceP.textContent.replace(' đồng', '').trim() : '0';

          // Try to find matching product in JSON by name
          const matchedProduct = products.find(p => p.name.toLowerCase() === name.toLowerCase());

          card.style.cursor = 'pointer';
          card.addEventListener('click', () => {
            if (matchedProduct) {
              window.location.href = `product-detail.html?id=${matchedProduct.id}`;
            } else {
              window.location.href = `product-detail.html?name=${encodeURIComponent(name)}&img=${encodeURIComponent(imgSrc)}&price=${encodeURIComponent(price)}&cat=${cat}`;
            }
          });
        });
      })
      .catch(err => {
        console.error('Error matching static products:', err);
        // Fallback to legacy click handler
        productCards.forEach(card => {
          if (card.closest('a')) return;
          const h3 = card.querySelector('h3');
          const img = card.querySelector('img');
          const priceP = card.querySelector('p');
          if (!h3) return;

          const page = window.location.pathname.split('/').pop();
          let cat = 'dt';
          if (page.includes('category.html')) {
            const params = new URLSearchParams(window.location.search);
            cat = params.get('cat') || 'dt';
          } else if (page.includes('LT')) {
            cat = 'lt';
          } else if (page.includes('PC')) {
            cat = 'pc';
          }

          const name = h3.textContent.trim();
          const imgSrc = img ? img.getAttribute('src') : '';
          const price = priceP ? priceP.textContent.replace(' đồng', '').trim() : '0';

          card.style.cursor = 'pointer';
          card.addEventListener('click', () => {
            window.location.href = `product-detail.html?name=${encodeURIComponent(name)}&img=${encodeURIComponent(imgSrc)}&price=${encodeURIComponent(price)}&cat=${cat}`;
          });
        });
      });
  }

  // ============================================
  // 14. SHOPPING CART SYSTEM
  // ============================================

  // Inject Cart DOM Elements to document.body dynamically
  function injectCartDOM() {
    if (document.getElementById('cart-drawer')) return;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    document.body.appendChild(overlay);

    // Create drawer
    const drawer = document.createElement('div');
    drawer.className = 'cart-drawer';
    drawer.id = 'cart-drawer';
    drawer.innerHTML = `
      <div class="cart-drawer-header">
        <h2>Giỏ hàng của bạn</h2>
        <button class="close-cart-btn" id="close-cart" aria-label="Đóng giỏ hàng">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="cart-drawer-body" id="cart-drawer-body"></div>
      <div class="cart-drawer-footer">
        <div class="cart-subtotal">
          <span>Tổng tiền tạm tính:</span>
          <span class="cart-subtotal-price" id="cart-subtotal-price">0 đồng</span>
        </div>
        <div class="cart-checkout-btns">
          <button class="btn-checkout" id="cart-checkout">Thanh toán ngay</button>
          <button class="btn-view-cart" id="cart-continue-shopping">Tiếp tục mua sắm</button>
        </div>
      </div>
    `;
    document.body.appendChild(drawer);
  }

  injectCartDOM();

  // Reference elements
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.querySelector('.cart-overlay');
  const cartDrawerBody = document.getElementById('cart-drawer-body');
  const cartSubtotalPrice = document.getElementById('cart-subtotal-price');
  const cartToggleBtn = document.getElementById('cart-toggle');
  const closeCartBtn = document.getElementById('close-cart');
  const continueShoppingBtn = document.getElementById('cart-continue-shopping');
  const checkoutBtn = document.getElementById('cart-checkout');

  // Toggle Cart Drawer
  function toggleCart(show) {
    if (!cartDrawer || !cartOverlay) return;
    if (show) {
      cartDrawer.classList.add('open');
      cartOverlay.classList.add('open');
    } else {
      cartDrawer.classList.remove('open');
      cartOverlay.classList.remove('open');
    }
  }

  if (cartToggleBtn) {
    cartToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleCart(true);
    });
  }

  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => toggleCart(false));
  }

  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', () => toggleCart(false));
  }

  if (cartOverlay) {
    cartOverlay.addEventListener('click', () => toggleCart(false));
  }

  // Save Cart to LocalStorage
  function saveCart() {
    localStorage.setItem('dcshop_cart', JSON.stringify(cartItems));
  }

  // Update Cart Badge count across the site
  function updateBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const totalQty = cartItems.reduce((acc, item) => acc + (item.qty || 0), 0);
    
    badges.forEach(badge => {
      badge.textContent = totalQty;
      // Add animation pop
      badge.classList.remove('pop');
      void badge.offsetWidth; // trigger reflow
      badge.classList.add('pop');
    });
  }

  // Helper function to format price back to Number
  function cleanPrice(priceStr) {
    if (typeof priceStr === 'number') return priceStr;
    if (!priceStr) return 0;
    return parseInt(priceStr.toString().replace(/[^\d]/g, ''), 10) || 0;
  }

  // Format price to Vietnamese Currency display
  function formatPrice(number) {
    return number.toLocaleString('vi-VN');
  }

  // Render items in Cart Drawer
  function renderCart() {
    if (!cartDrawerBody) return;

    if (cartItems.length === 0) {
      cartDrawerBody.innerHTML = `
        <div class="cart-empty-state">
          <i class="fas fa-shopping-bag"></i>
          <p>Giỏ hàng của bạn đang trống.</p>
          <a href="category.html?cat=dt" class="btn-shop-now" id="cart-shop-now">Mua sắm ngay</a>
        </div>
      `;
      if (cartSubtotalPrice) {
        cartSubtotalPrice.textContent = '0 đồng';
      }
      
      // Wire up shop now button inside cart to close drawer when clicked
      const shopNowBtn = document.getElementById('cart-shop-now');
      if (shopNowBtn) {
        shopNowBtn.addEventListener('click', () => toggleCart(false));
      }
      return;
    }

    let subtotal = 0;
    let html = '';

    cartItems.forEach((item, index) => {
      const priceNum = cleanPrice(item.price);
      const totalItemPrice = priceNum * item.qty;
      subtotal += totalItemPrice;

      html += `
        <div class="cart-item" data-index="${index}">
          <img src="${item.img || 'images/imageDT/samsung1.png'}" class="cart-item-img" alt="${item.name}" onerror="this.src='images/dcshoplogo.png';">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <div class="cart-item-price">${formatPrice(priceNum)} đồng</div>
            <div class="cart-item-controls">
              <div class="qty-control">
                <button class="qty-btn minus-btn" data-index="${index}">-</button>
                <input type="text" class="qty-number" value="${item.qty}" data-index="${index}" readonly>
                <button class="qty-btn plus-btn" data-index="${index}">+</button>
              </div>
              <button class="remove-cart-item" data-index="${index}" aria-label="Xóa sản phẩm">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    });

    cartDrawerBody.innerHTML = html;

    if (cartSubtotalPrice) {
      cartSubtotalPrice.textContent = formatPrice(subtotal) + ' đồng';
    }

    // Attach listeners inside drawer items
    attachDrawerItemListeners();
  }

  function attachDrawerItemListeners() {
    // Plus buttons
    const plusBtns = cartDrawerBody.querySelectorAll('.plus-btn');
    plusBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index, 10);
        if (cartItems[index] && cartItems[index].qty < 99) {
          cartItems[index].qty += 1;
          saveCart();
          renderCart();
          updateBadge();
        }
      });
    });

    // Minus buttons
    const minusBtns = cartDrawerBody.querySelectorAll('.minus-btn');
    minusBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index, 10);
        if (cartItems[index]) {
          if (cartItems[index].qty > 1) {
            cartItems[index].qty -= 1;
          } else {
            // Remove item if qty hits 0
            cartItems.splice(index, 1);
          }
          saveCart();
          renderCart();
          updateBadge();
        }
      });
    });

    // Delete buttons
    const removeBtns = cartDrawerBody.querySelectorAll('.remove-cart-item');
    removeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index, 10);
        if (cartItems[index]) {
          const removedName = cartItems[index].name;
          cartItems.splice(index, 1);
          saveCart();
          renderCart();
          updateBadge();
          showToast(`Đã xóa "${removedName}" khỏi giỏ hàng.`);
        }
      });
    });
  }

  // Global addToCart implementation assigned to outer variable
  addToCart = function(product, showToastAlert = true) {
    if (!product || !product.name) return;

    // Normalize price (remove formatting if any)
    const newPrice = cleanPrice(product.price);
    
    // Check if product with identical name already in cart
    const existing = cartItems.find(item => item.name === product.name);
    if (existing) {
      existing.qty += (product.qty || 1);
    } else {
      cartItems.push({
        name: product.name,
        img: product.img,
        price: newPrice,
        qty: product.qty || 1
      });
    }

    saveCart();
    renderCart();
    updateBadge();

    if (showToastAlert) {
      showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
      // Auto open drawer for premium UX
      setTimeout(() => toggleCart(true), 300);
    }
  };

  // ============================================
  // 15. PREMIUM CHECKOUT MODAL SYSTEM
  // ============================================
  function injectCheckoutDOM() {
    if (document.getElementById('checkout-modal-overlay')) return;

    const checkoutModal = document.createElement('div');
    checkoutModal.className = 'checkout-modal-overlay';
    checkoutModal.id = 'checkout-modal-overlay';
    checkoutModal.innerHTML = `
      <div class="checkout-modal-card">
        <div class="checkout-modal-header" id="checkout-modal-header">
          <h2>Thanh toán đơn hàng</h2>
          <button class="close-checkout-btn" id="close-checkout-btn" aria-label="Đóng thanh toán">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="checkout-modal-body" id="checkout-modal-body-section">
          <div class="checkout-summary-box">
            <div class="checkout-summary-title">
              <span>Tóm tắt đơn hàng</span>
              <span id="checkout-summary-count">0 sản phẩm</span>
            </div>
            <div id="checkout-summary-details" style="font-size: 13px; max-height: 120px; overflow-y: auto; margin-bottom: 10px; display: flex; flex-direction: column; gap: 6px; padding-right: 4px;">
              <!-- Dynamic cart items will be loaded here -->
            </div>
            <div style="border-top: 1px dashed var(--gray-400); padding-top: 8px; display: flex; justify-content: space-between; font-weight: 700; font-size: 14px;">
              <span>Tổng cộng:</span>
              <span id="checkout-total-price" style="color: var(--primary);">0 đồng</span>
            </div>
          </div>
          
          <div class="checkout-form-group">
            <label for="checkout-name">Họ và tên <span style="color: var(--danger);">*</span></label>
            <input type="text" id="checkout-name" placeholder="Ví dụ: Nguyễn Văn A" required>
          </div>
          
          <div class="checkout-form-group">
            <label for="checkout-phone">Số điện thoại <span style="color: var(--danger);">*</span></label>
            <input type="tel" id="checkout-phone" placeholder="Ví dụ: 0987654321" required>
          </div>
          
          <div class="checkout-form-group">
            <label for="checkout-address">Địa chỉ giao hàng <span style="color: var(--danger);">*</span></label>
            <textarea id="checkout-address" rows="2" placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố" required></textarea>
          </div>
          
          <div class="checkout-form-group">
            <label for="checkout-notes">Ghi chú (Không bắt buộc)</label>
            <textarea id="checkout-notes" rows="1" placeholder="Yêu cầu khác về thời gian giao hàng..."></textarea>
          </div>
          
          <div class="checkout-form-group">
            <label>Phương thức thanh toán</label>
            <div class="payment-methods-grid">
              <div class="payment-method-card active" data-method="cod" id="payment-method-cod">
                <i class="fas fa-money-bill-wave"></i>
                <span>Thanh toán COD</span>
              </div>
              <div class="payment-method-card" data-method="qr" id="payment-method-qr">
                <i class="fas fa-qrcode"></i>
                <span>Chuyển khoản QR</span>
              </div>
            </div>
          </div>
          
          <div class="qr-mock-container" id="qr-mock-container">
            <div class="qr-mock-img"></div>
            <div class="qr-mock-info">
              <div>Ngân hàng: <b>MB Bank (Quân Đội)</b></div>
              <div>Số tài khoản: <b>030420268888</b></div>
              <div>Chủ tài khoản: <b>CÔNG TY DCSHOP VIỆT NAM</b></div>
              <div>Số tiền: <b id="qr-transfer-amount">0 đồng</b></div>
              <div>Nội dung chuyển khoản: <b id="qr-transfer-memo" style="font-family: monospace; font-size: 13px; background: rgba(255,107,53,0.1); padding: 2px 6px; border-radius: 4px;">DCS-XXXXXX</b></div>
              <div style="font-size: 10px; color: var(--gray-500); margin-top: 5px; font-style: italic;"><i class="fas fa-info-circle"></i> Đơn hàng sẽ tự động duyệt sau khi hệ thống nhận được thanh toán.</div>
            </div>
          </div>
        </div>
        
        <div class="checkout-modal-footer" id="checkout-modal-footer-section">
          <button class="btn btn-secondary" id="cancel-checkout-btn" style="flex: 1;">Hủy bỏ</button>
          <button class="btn btn-primary" id="confirm-order-btn" style="flex: 2;">
            Xác nhận đặt hàng
          </button>
        </div>
        
        <!-- Success Card View -->
        <div class="checkout-success-view" id="checkout-success-view">
          <i class="fas fa-check-circle"></i>
          <h3>Đặt hàng thành công!</h3>
          <p>Cảm ơn quý khách đã mua sắm tại DCShop. Đơn hàng của quý khách đã được ghi nhận và đang được chuẩn bị đóng gói.</p>
          <div style="margin: 10px 0; font-size: 13px;">Mã đơn hàng của quý khách:</div>
          <div class="order-code-badge" id="success-order-code">DCS-123456</div>
          <p style="font-size: 12px; margin-top: 8px; font-weight: 600;" id="success-payment-method-desc">Phương thức thanh toán: Thanh toán COD</p>
          <p style="font-size: 11px; color: var(--gray-500); margin-top: 5px;">Một cuộc gọi xác nhận chi tiết đơn hàng sẽ được thực hiện đến số điện thoại đã cung cấp.</p>
          <button class="btn btn-primary" id="close-success-btn" style="margin-top: 15px; width: 100%; max-width: 250px;">Tiếp tục mua sắm</button>
        </div>
      </div>
    `;
    document.body.appendChild(checkoutModal);
  }

  injectCheckoutDOM();

  const checkoutOverlay = document.getElementById('checkout-modal-overlay');
  const closeCheckoutBtn = document.getElementById('close-checkout-btn');
  const cancelCheckoutBtn = document.getElementById('cancel-checkout-btn');
  const confirmOrderBtn = document.getElementById('confirm-order-btn');
  const closeSuccessBtn = document.getElementById('close-success-btn');
  
  const paymentMethodCod = document.getElementById('payment-method-cod');
  const paymentMethodQr = document.getElementById('payment-method-qr');
  const qrMockContainer = document.getElementById('qr-mock-container');
  
  const checkoutNameInput = document.getElementById('checkout-name');
  const checkoutPhoneInput = document.getElementById('checkout-phone');
  const checkoutAddressInput = document.getElementById('checkout-address');
  const checkoutNotesInput = document.getElementById('checkout-notes');
  
  const checkoutSummaryDetails = document.getElementById('checkout-summary-details');
  const checkoutSummaryCount = document.getElementById('checkout-summary-count');
  const checkoutTotalPrice = document.getElementById('checkout-total-price');
  const qrTransferAmount = document.getElementById('qr-transfer-amount');
  const qrTransferMemo = document.getElementById('qr-transfer-memo');
  
  const checkoutHeader = document.getElementById('checkout-modal-header');
  const checkoutBodySection = document.getElementById('checkout-modal-body-section');
  const checkoutFooterSection = document.getElementById('checkout-modal-footer-section');
  const checkoutSuccessView = document.getElementById('checkout-success-view');
  const successOrderCode = document.getElementById('success-order-code');

  let currentOrderCode = '';
  let selectedPaymentMethod = 'cod';

  if (paymentMethodCod) {
    paymentMethodCod.addEventListener('click', () => {
      selectedPaymentMethod = 'cod';
      paymentMethodCod.classList.add('active');
      if (paymentMethodQr) paymentMethodQr.classList.remove('active');
      if (qrMockContainer) {
        qrMockContainer.style.display = 'none';
      }
    });
  }

  if (paymentMethodQr) {
    paymentMethodQr.addEventListener('click', () => {
      selectedPaymentMethod = 'qr';
      paymentMethodQr.classList.add('active');
      if (paymentMethodCod) paymentMethodCod.classList.remove('active');
      if (qrMockContainer) {
        qrMockContainer.style.display = 'flex';
      }
    });
  }

  function closeCheckoutModal() {
    if (checkoutOverlay) {
      checkoutOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (closeCheckoutBtn) {
    closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
  }
  if (cancelCheckoutBtn) {
    cancelCheckoutBtn.addEventListener('click', closeCheckoutModal);
  }
  if (checkoutOverlay) {
    checkoutOverlay.addEventListener('click', (e) => {
      if (e.target === checkoutOverlay) {
        closeCheckoutModal();
      }
    });
  }
  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', closeCheckoutModal);
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cartItems.length === 0) {
        showToast('Giỏ hàng của bạn đang trống!');
        return;
      }
      
      // Close cart drawer
      toggleCart(false);
      
      // Generate unique order code
      currentOrderCode = 'DCS-' + Math.floor(100000 + Math.random() * 900000);
      if (qrTransferMemo) {
        qrTransferMemo.textContent = currentOrderCode;
      }
      
      // Populate order summary
      let subtotal = 0;
      let itemsHtml = '';
      cartItems.forEach(item => {
        const priceNum = cleanPrice(item.price);
        const totalItemPrice = priceNum * item.qty;
        subtotal += totalItemPrice;
        itemsHtml += `
          <div style="display: flex; justify-content: space-between; color: var(--text); opacity: 0.85;">
            <span style="max-width: 70%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.name} <span style="font-weight: 600;">x${item.qty}</span></span>
            <span>${formatPrice(totalItemPrice)} đồng</span>
          </div>
        `;
      });
      
      if (checkoutSummaryDetails) checkoutSummaryDetails.innerHTML = itemsHtml;
      if (checkoutSummaryCount) {
        const totalQty = cartItems.reduce((acc, item) => acc + (item.qty || 0), 0);
        checkoutSummaryCount.textContent = `${totalQty} sản phẩm`;
      }
      if (checkoutTotalPrice) checkoutTotalPrice.textContent = formatPrice(subtotal) + ' đồng';
      if (qrTransferAmount) qrTransferAmount.textContent = formatPrice(subtotal) + ' đồng';
      
      // Reset form
      if (checkoutNameInput) checkoutNameInput.value = '';
      if (checkoutPhoneInput) checkoutPhoneInput.value = '';
      if (checkoutAddressInput) checkoutAddressInput.value = '';
      if (checkoutNotesInput) checkoutNotesInput.value = '';
      
      // Reset payment selection to COD
      selectedPaymentMethod = 'cod';
      if (paymentMethodCod) paymentMethodCod.classList.add('active');
      if (paymentMethodQr) paymentMethodQr.classList.remove('active');
      if (qrMockContainer) qrMockContainer.style.display = 'none';
      
      // Restore form display state
      if (checkoutHeader) checkoutHeader.style.display = 'flex';
      if (checkoutBodySection) checkoutBodySection.style.display = 'flex';
      if (checkoutFooterSection) checkoutFooterSection.style.display = 'flex';
      if (checkoutSuccessView) checkoutSuccessView.style.display = 'none';
      
      // Open overlay
      if (checkoutOverlay) {
        checkoutOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  if (confirmOrderBtn) {
    confirmOrderBtn.addEventListener('click', () => {
      const name = checkoutNameInput ? checkoutNameInput.value.trim() : '';
      const phone = checkoutPhoneInput ? checkoutPhoneInput.value.trim() : '';
      const address = checkoutAddressInput ? checkoutAddressInput.value.trim() : '';
      
      if (!name) {
        showToast('Vui lòng nhập họ và tên của bạn!');
        if (checkoutNameInput) checkoutNameInput.focus();
        return;
      }
      if (name.length < 2) {
        showToast('Họ và tên quá ngắn. Vui lòng kiểm tra lại!');
        if (checkoutNameInput) checkoutNameInput.focus();
        return;
      }
      
      if (!phone) {
        showToast('Vui lòng nhập số điện thoại giao hàng!');
        if (checkoutPhoneInput) checkoutPhoneInput.focus();
        return;
      }
      const phoneRegex = /^0\d{9}$/;
      if (!phoneRegex.test(phone)) {
        showToast('Số điện thoại không hợp lệ! Vui lòng nhập số điện thoại gồm 10 chữ số bắt đầu bằng số 0.');
        if (checkoutPhoneInput) checkoutPhoneInput.focus();
        return;
      }
      
      if (!address) {
        showToast('Vui lòng nhập địa chỉ giao hàng cụ thể!');
        if (checkoutAddressInput) checkoutAddressInput.focus();
        return;
      }
      if (address.length < 10) {
        showToast('Địa chỉ giao hàng quá ngắn! Vui lòng cung cấp chi tiết địa chỉ.');
        if (checkoutAddressInput) checkoutAddressInput.focus();
        return;
      }
      
      // Loading State
      const originalText = confirmOrderBtn.innerHTML;
      confirmOrderBtn.disabled = true;
      confirmOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
      
      setTimeout(() => {
        // Transition to success state
        if (checkoutHeader) checkoutHeader.style.display = 'none';
        if (checkoutBodySection) checkoutBodySection.style.display = 'none';
        if (checkoutFooterSection) checkoutFooterSection.style.display = 'none';
        
        if (successOrderCode) successOrderCode.textContent = currentOrderCode;
        const successPaymentMethodDesc = document.getElementById('success-payment-method-desc');
        if (successPaymentMethodDesc) {
          successPaymentMethodDesc.textContent = 'Phương thức thanh toán: ' + (selectedPaymentMethod === 'cod' ? 'Thanh toán COD' : 'Chuyển khoản ngân hàng (QR)');
        }
        if (checkoutSuccessView) checkoutSuccessView.style.display = 'flex';
        
        // Clear giỏ hàng
        cartItems = [];
        saveCart();
        updateBadge();
        renderCart();
        
        confirmOrderBtn.disabled = false;
        confirmOrderBtn.innerHTML = originalText;
        
        showToast('Đặt hàng thành công! Đơn hàng đã được tiếp nhận.');
      }, 1500);
    });
  }

  // Initialize cart state on page load
  updateBadge();
  renderCart();

})();
