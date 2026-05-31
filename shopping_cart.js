// shopping_cart.js — Bài B2

function createCart() {
    // Private data — chỉ truy cập được qua closure
    let items = [];
    let discountAmount = 0;
    let discountLabel = "";

    // Helper: format số tiền kiểu Việt Nam
    const fmt = (n) => n.toLocaleString("vi-VN");

    return {
        // Thêm sản phẩm (nếu đã có → tăng quantity)
        addItem(product, quantity = 1) {
            const existing = items.find(item => item.id === product.id);
            if (existing) {
                existing.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },

        // Xóa sản phẩm theo id
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },

        // Cập nhật số lượng (nếu quantity <= 0 thì xóa)
        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                const item = items.find(i => i.id === productId);
                if (item) item.quantity = newQuantity;
            }
        },

        // Tính tổng tiền (chưa giảm giá)
        getSubtotal() {
            return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },

        // Tính tổng tiền (sau giảm giá)
        getTotal() {
            return this.getSubtotal() - discountAmount;
        },

        // Áp dụng mã giảm giá
        applyDiscount(code) {
            const subtotal = this.getSubtotal();
            const codes = {
                "SALE10":   () => { discountAmount = subtotal * 0.10; discountLabel = "SALE10 (-10%)"; },
                "SALE20":   () => { discountAmount = subtotal * 0.20; discountLabel = "SALE20 (-20%)"; },
                "FREESHIP": () => { discountAmount = 30000;           discountLabel = "FREESHIP (-30.000đ)"; }
            };
            if (codes[code]) {
                codes[code]();
                console.log(`✅ Đã áp dụng mã: ${discountLabel}`);
            } else {
                console.log(`❌ Mã giảm giá "${code}" không hợp lệ.`);
            }
        },

        // In giỏ hàng dạng bảng
        printCart() {
            const line  = "─".repeat(62);
            const dline = "═".repeat(62);

            console.log("┌" + dline + "┐");
            console.log("│" + " GIỎ HÀNG".padEnd(62) + "│");
            console.log("├" + line + "┤");
            console.log(
                "│ " +
                "#".padEnd(3) +
                "Sản phẩm".padEnd(18) +
                "SL".padStart(4) +
                "  " +
                "Đơn giá".padStart(13) +
                "  " +
                "Thành tiền".padStart(14) +
                " │"
            );
            console.log("├" + line + "┤");

            items.forEach((item, idx) => {
                const lineTotal = item.price * item.quantity;
                console.log(
                    "│ " +
                    String(idx + 1).padEnd(3) +
                    item.name.padEnd(18) +
                    String(item.quantity).padStart(4) +
                    "  " +
                    fmt(item.price).padStart(13) +
                    "  " +
                    fmt(lineTotal).padStart(14) +
                    " │"
                );
            });

            console.log("├" + line + "┤");

            if (discountAmount > 0) {
                console.log("│" + `  Tạm tính: ${fmt(this.getSubtotal())}đ`.padStart(61) + " │");
                console.log("│" + `  Giảm giá (${discountLabel}): -${fmt(discountAmount)}đ`.padStart(61) + " │");
                console.log("├" + line + "┤");
            }

            console.log("│" + `  TỔNG CỘNG: ${fmt(this.getTotal())}đ`.padStart(61) + " │");
            console.log("└" + dline + "┘");
        },

        // Lấy tổng số sản phẩm (tổng quantity)
        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },

        // Xóa toàn bộ giỏ
        clearCart() {
            items = [];
            discountAmount = 0;
            discountLabel = "";
            console.log("🗑️  Giỏ hàng đã được xóa.");
        }
    };
}

// ===== TEST =====
const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16",  price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16",  price: 25990000 }, 1); // Tăng lên 2

console.log("\n=== GIỎ HÀNG BAN ĐẦU ===");
cart.printCart();

cart.applyDiscount("SALE10");
console.log("\n=== SAU KHI ÁP SALE10 ===");
cart.printCart();

console.log("\nSố SP:", cart.getItemCount()); // → 4

cart.removeItem(3);
console.log("Sau xóa AirPods:", cart.getItemCount()); // → 2

console.log("\n=== SAU KHI XÓA AIRPODS ===");
cart.printCart();

console.log("\n--- Test FREESHIP ---");
const cart2 = createCart();
cart2.addItem({ id: 2, name: "MacBook Pro", price: 45990000 }, 1);
cart2.applyDiscount("FREESHIP");
cart2.printCart();

console.log("\n--- Test mã sai ---");
cart2.applyDiscount("INVALID");
