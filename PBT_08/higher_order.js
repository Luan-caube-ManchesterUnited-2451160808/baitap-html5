// higher_order.js — Bài B3

// ─────────────────────────────────────────────
// 1. pipe() — Nối chuỗi functions (trái → phải)
// ─────────────────────────────────────────────
function pipe(...fns) {
    return (initialValue) => fns.reduce((acc, fn) => fn(acc), initialValue);
}

// Test pipe
const process = pipe(
    x => x * 2,         // 5 → 10
    x => x + 10,         // 10 → 20
    x => x.toString(),   // 20 → "20"
    x => "Kết quả: " + x // "20" → "Kết quả: 20"
);
console.log("=== PIPE ===");
console.log(process(5)); // → "Kết quả: 20"

// ─────────────────────────────────────────────
// 2. memoize() — Cache kết quả theo arguments
// ─────────────────────────────────────────────
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Test memoize
console.log("\n=== MEMOIZE ===");
const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log(expensiveCalc(1000000)); // In "Đang tính..." → 499999500000
console.log(expensiveCalc(1000000)); // Không in "Đang tính...", lấy cache!
console.log(expensiveCalc(500));     // In "Đang tính..." (tham số mới)
console.log(expensiveCalc(500));     // Không in "Đang tính..." (cache hit)

// ─────────────────────────────────────────────
// 3. debounce() — Chờ user ngừng gõ mới thực hiện
// ─────────────────────────────────────────────
function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        }, delay);
    };
}

// Test debounce
console.log("\n=== DEBOUNCE ===");
const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

// Gọi liên tục → chỉ lần cuối (sau 500ms ngừng) mới chạy
search("i");
search("ip");
search("iph");
search("ipho");
search("iphone"); // ← chỉ cái này chạy sau 500ms
console.log("(search 'iphone' sẽ chạy sau 500ms...)");

// ─────────────────────────────────────────────
// 4. retry() — Thử lại nếu lỗi
// ─────────────────────────────────────────────
async function retry(fn, maxAttempts = 3) {
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            const result = await fn();
            console.log(`✅ Thành công ở lần thử ${attempt}`);
            return result;
        } catch (error) {
            lastError = error;
            console.log(`❌ Lần thử ${attempt}/${maxAttempts} thất bại: ${error.message}`);
            if (attempt < maxAttempts) {
                // Chờ ngắn trước khi thử lại (optional: exponential backoff)
                await new Promise(resolve => setTimeout(resolve, 100 * attempt));
            }
        }
    }
    throw new Error(`Thất bại sau ${maxAttempts} lần thử. Lỗi cuối: ${lastError.message}`);
}

// Test retry
console.log("\n=== RETRY ===");

// Hàm giả lập: thất bại 2 lần đầu, thành công lần 3
let callCount = 0;
const unreliableAPI = () => new Promise((resolve, reject) => {
    callCount++;
    if (callCount < 3) {
        reject(new Error("Timeout"));
    } else {
        resolve({ data: "Dữ liệu thành công!" });
    }
});

retry(unreliableAPI, 3)
    .then(result => console.log("Kết quả:", result))
    .catch(err  => console.log("Lỗi cuối cùng:", err.message));

// Test retry thất bại hoàn toàn
console.log("\n--- Retry luôn thất bại ---");
const alwaysFail = () => Promise.reject(new Error("Server down"));
retry(alwaysFail, 3)
    .then(result => console.log("Không nên đến đây:", result))
    .catch(err  => console.log("Bắt lỗi cuối:", err.message));
