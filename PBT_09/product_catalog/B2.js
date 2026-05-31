// 1. Dữ liệu sản phẩm (Tối thiểu 12 sản phẩm)
const products = [
  {
    id: 1,
    name: "iPhone 16 Pro",
    price: 28990000,
    category: "phone",
    image: "https://picsum.photos/400/300?random=1",
    rating: 4.9,
    inStock: true,
  },
  {
    id: 2,
    name: "MacBook Air M3",
    price: 27500000,
    category: "laptop",
    image: "https://picsum.photos/400/300?random=2",
    rating: 4.8,
    inStock: true,
  },
  {
    id: 3,
    name: "Apple Watch S9",
    price: 10200000,
    category: "watch",
    image: "https://picsum.photos/400/300?random=3",
    rating: 4.5,
    inStock: true,
  },
  {
    id: 4,
    name: "Samsung S24 Ultra",
    price: 25990000,
    category: "phone",
    image: "https://picsum.photos/400/300?random=4",
    rating: 4.7,
    inStock: true,
  },
  {
    id: 5,
    name: "Dell XPS 13",
    price: 35000000,
    category: "laptop",
    image: "https://picsum.photos/400/300?random=5",
    rating: 4.6,
    inStock: false,
  },
  {
    id: 6,
    name: "Garmin Epix Gen 2",
    price: 15000000,
    category: "watch",
    image: "https://picsum.photos/400/300?random=6",
    rating: 4.8,
    inStock: true,
  },
  {
    id: 7,
    name: "Google Pixel 9",
    price: 19000000,
    category: "phone",
    image: "https://picsum.photos/400/300?random=7",
    rating: 4.4,
    inStock: true,
  },
  {
    id: 8,
    name: "ASUS ROG Zephyrus",
    price: 42000000,
    category: "laptop",
    image: "https://picsum.photos/400/300?random=8",
    rating: 4.9,
    inStock: true,
  },
  {
    id: 9,
    name: "iPad Pro M2",
    price: 21000000,
    category: "tablet",
    image: "https://picsum.photos/400/300?random=9",
    rating: 4.7,
    inStock: true,
  },
  {
    id: 10,
    name: "Sony WH-1000XM5",
    price: 8500000,
    category: "audio",
    image: "https://picsum.photos/400/300?random=10",
    rating: 4.8,
    inStock: true,
  },
  {
    id: 11,
    name: "Keychron Q1",
    price: 3500000,
    category: "gear",
    image: "https://picsum.photos/400/300?random=11",
    rating: 4.6,
    inStock: true,
  },
  {
    id: 12,
    name: "Logitech MX Master 3S",
    price: 2200000,
    category: "gear",
    image: "https://picsum.photos/400/300?random=12",
    rating: 4.7,
    inStock: true,
  },
];

let cartCount = 0;
const productGrid = document.getElementById("productGrid");

// 2. Hàm Render Sản phẩm (Sử dụng createElement)
function renderProducts(data) {
  productGrid.innerHTML = "";
  data.forEach((item) => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-3";

    const card = document.createElement("div");
    card.className = "card h-100 shadow-sm";
    card.addEventListener("click", () => showProductModal(item));

    const img = document.createElement("img");
    img.src = item.image;
    img.className = "card-img-top";

    const body = document.createElement("div");
    body.className = "card-body d-flex flex-column";

    const title = document.createElement("h6");
    title.className = "card-title fw-bold";
    title.textContent = item.name;

    const price = document.createElement("p");
    price.className = "text-danger fw-bold";
    price.textContent = `${item.price.toLocaleString()}đ`;

    const addBtn = document.createElement("button");
    addBtn.className = "btn btn-sm btn-primary mt-auto";
    addBtn.textContent = "Thêm giỏ";
    addBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Ngăn chặn sự kiện click vào card
      cartCount++;
      document.getElementById("cartBadge").textContent = cartCount;
    });

    body.append(title, price, addBtn);
    card.append(img, body);
    col.appendChild(card);
    productGrid.appendChild(col);
  });
}

// 3. Hàm Lọc & Tìm kiếm & Sắp xếp
function updateUI() {
  const searchText = document.getElementById("searchInput").value.toLowerCase();
  const category = document.querySelector("#categoryFilters .active").dataset
    .cat;
  const sortVal = document.getElementById("sortSelect").value;

  let filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchText);
    const matchesCat = category === "all" || p.category === category;
    return matchesSearch && matchesCat;
  });

  if (sortVal === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sortVal === "price-desc") filtered.sort((a, b) => b.price - a.price);
  if (sortVal === "name-az")
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  if (sortVal === "rating-high") filtered.sort((a, b) => b.rating - a.rating);

  renderProducts(filtered);
}

// 4. Modal Chi tiết (Tạo bằng JS)
function showProductModal(product) {
  const container = document.getElementById("modalContainer");
  container.innerHTML = ""; // Clear modal cũ

  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop fade show";

  const modal = document.createElement("div");
  modal.className = "modal fade show d-block";
  modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg">
                <div class="modal-header border-0">
                    <button type="button" class="btn-close" id="closeModal"></button>
                </div>
                <div class="modal-body text-center p-4">
                    <img src="${product.image}" class="img-fluid rounded mb-3">
                    <h3 class="fw-bold">${product.name}</h3>
                    <p class="text-danger fs-4 fw-bold">${product.price.toLocaleString()}đ</p>
                    <div class="mb-3">⭐ ${product.rating} / 5.0</div>
                    <p class="text-muted small">Đây là mô tả chi tiết sản phẩm được tạo động hoàn toàn bằng JavaScript DOM.</p>
                </div>
            </div>
        </div>
    `;

  container.append(backdrop, modal);

  const closeFunc = () => (container.innerHTML = "");
  document.getElementById("closeModal").addEventListener("click", closeFunc);
  backdrop.addEventListener("click", closeFunc);
}

// 5. Event Listeners
document.getElementById("searchInput").addEventListener("input", updateUI);
document.getElementById("sortSelect").addEventListener("change", updateUI);

document.getElementById("categoryFilters").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    document
      .querySelectorAll("#categoryFilters button")
      .forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    updateUI();
  }
});

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const icon = document.querySelector("#themeToggle i");
  icon.className = document.body.classList.contains("dark-mode")
    ? "bi bi-sun-fill"
    : "bi bi-moon-fill";
});

// Chạy lần đầu
renderProducts(products);
