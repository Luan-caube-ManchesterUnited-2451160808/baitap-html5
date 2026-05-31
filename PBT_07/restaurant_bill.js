// ============================================================
// Câu C2 — Tính hóa đơn nhà hàng
// Chạy: node restaurant_bill.js
// ============================================================

/**
 * tinhHoaDon(items, includeTip, date)
 * @param {Array}   items       - [{ name, price, qty }]
 * @param {boolean} includeTip  - Có tính tip 5% không
 * @param {Date}    date        - Ngày thanh toán (để check Wednesday)
 */
function tinhHoaDon(items, includeTip = false, date = new Date()) {
    const WIDTH = 42; // độ rộng box

    function line(left, right = "", char = " ") {
        const content = left + char.repeat(Math.max(1, WIDTH - left.length - right.length - 2)) + right;
        return `║ ${content} ║`;
    }
    function divider(left = "╠", right = "╣", mid = "═") {
        return left + mid.repeat(WIDTH) + right;
    }

    // --- Tính tổng ---
    const tongCong = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    // --- Giảm giá ---
    let phanTramGiam = 0;
    if (tongCong > 1000000)   phanTramGiam = 15;
    else if (tongCong > 500000) phanTramGiam = 10;

    // Thứ 4 (Wednesday = 3 trong JS) → giảm thêm 5%
    const isWednesday = date.getDay() === 3;
    if (isWednesday) phanTramGiam += 5;

    const soTienGiam = Math.round(tongCong * phanTramGiam / 100);
    const sauGiam    = tongCong - soTienGiam;

    // --- VAT 8% ---
    const vat  = Math.round(sauGiam * 0.08);

    // --- Tip 5% ---
    const tip  = includeTip ? Math.round(tongCong * 0.05) : 0;

    // --- Tổng thanh toán ---
    const thanhToan = sauGiam + vat + tip;

    // --- Format tiền ---
    function fmt(n) {
        return n.toLocaleString("vi-VN") + "đ";
    }

    // --- In hóa đơn ---
    const lines = [];
    lines.push(divider("╔", "╗"));

    // Tiêu đề căn giữa
    const title = "HÓA ĐƠN NHÀ HÀNG";
    const pad   = Math.floor((WIDTH - title.length) / 2);
    lines.push("║" + " ".repeat(pad) + title + " ".repeat(WIDTH - pad - title.length) + "║");

    lines.push(divider());

    // Danh sách món
    items.forEach((item, i) => {
        const total  = item.price * item.qty;
        const label  = `${i + 1}. ${item.name}`;
        const detail = `x${item.qty}  @${fmt(item.price)}`;
        const right  = `= ${fmt(total)}`;
        // line dài hơn: in label + detail, right align tổng
        const body   = `${label.padEnd(14)} ${detail.padEnd(14)} ${right}`;
        lines.push(`║ ${body.padEnd(WIDTH)} ║`);
    });

    lines.push(divider());

    lines.push(line("Tổng cộng:", fmt(tongCong)));

    if (isWednesday) {
        lines.push(line("⭐ Thứ 4 giảm thêm 5%!", ""));
    }
    const giamLabel = `Giảm giá (${phanTramGiam}%):`;
    lines.push(line(giamLabel, `-${fmt(soTienGiam)}`));
    lines.push(line("VAT (8%):", `+${fmt(vat)}`));
    if (includeTip) {
        lines.push(line("Tip (5%):", `+${fmt(tip)}`));
    }

    lines.push(divider());

    const thanhToanStr = fmt(thanhToan);
    lines.push(line("THANH TOÁN:", thanhToanStr));

    lines.push(divider("╚", "╝"));

    console.log(lines.join("\n"));

    return {
        tongCong, soTienGiam, phanTramGiam, vat, tip, thanhToan
    };
}

// ============================================================
// TEST 1: Đơn nhỏ (không giảm giá), không tip, hôm nay
// ============================================================
console.log("\n=== Test 1: Đơn nhỏ (< 500k), không tip ===\n");
tinhHoaDon([
    { name: "Phở bò",  price: 65000, qty: 2 },
    { name: "Trà đá",  price:  5000, qty: 3 },
    { name: "Bún chả", price: 55000, qty: 1 },
], false);

// ============================================================
// TEST 2: Đơn lớn (> 500k), có tip
// ============================================================
console.log("\n=== Test 2: Đơn > 500k, có tip ===\n");
tinhHoaDon([
    { name: "Bò nướng",   price: 180000, qty: 2 },
    { name: "Tôm hùm",    price: 350000, qty: 1 },
    { name: "Nước ngọt",  price:  25000, qty: 4 },
], true);

// ============================================================
// TEST 3: Đơn rất lớn (> 1tr), ngày thứ 4
// ============================================================
console.log("\n=== Test 3: Đơn > 1tr, thứ 4 (giảm 15% + 5%) ===\n");

// Tạo ngày thứ 4 để test
const wednesday = new Date("2025-01-08"); // 8/1/2025 là thứ 4
tinhHoaDon([
    { name: "Lẩu thái",   price: 350000, qty: 2 },
    { name: "Hải sản",    price: 450000, qty: 1 },
    { name: "Bia Heineken", price: 45000, qty: 4 },
], true, wednesday);
