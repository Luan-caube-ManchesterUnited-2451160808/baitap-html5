// ============================================================
// Bài B4 — FizzBuzz Nâng cao
// Chạy: node fizzbuzz.js
// ============================================================

// ============================================================
// Version 1: Classic FizzBuzz (1-100)
// ============================================================
console.log("=== Version 1: Classic FizzBuzz (1-100) ===");

const classicResult = [];
for (let i = 1; i <= 100; i++) {
    if      (i % 15 === 0) classicResult.push("FizzBuzz");
    else if (i % 3  === 0) classicResult.push("Fizz");
    else if (i % 5  === 0) classicResult.push("Buzz");
    else                   classicResult.push(String(i));
}
console.log(classicResult.join(", "));

// ============================================================
// Version 2: Custom FizzBuzz với bất kỳ bộ rules nào
// ============================================================

/**
 * customFizzBuzz(n, rules)
 * @param {number} n        - In từ 1 đến n
 * @param {Array}  rules    - Mảng { divisor: number, word: string }
 */
function customFizzBuzz(n, rules) {
    const result = [];

    for (let i = 1; i <= n; i++) {
        let output = "";

        // Duyệt tất cả rules theo thứ tự
        for (let j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
                output += rules[j].word;
            }
        }

        // Nếu không khớp rule nào → in số
        result.push(output === "" ? String(i) : output);
    }

    return result;
}

// ============================================================
// TEST: FizzBuzzJazz (3/5/7)
// ============================================================
console.log("\n=== Version 2: Custom FizzBuzzJazz (1-30) ===");

const rules = [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
];

const fbjResult = customFizzBuzz(30, rules);
console.log(fbjResult.join(", "));

// Kiểm tra các số đặc biệt:
console.log("\n--- Kiểm tra các số đặc biệt ---");
console.log(`15  = ${fbjResult[14]}`);    // chia hết 3 và 5   → FizzBuzz
console.log(`21  = ${fbjResult[20]}`);    // chia hết 3 và 7   → FizzJazz
console.log(`35  = ${customFizzBuzz(35, rules)[34]}`); // chia hết 5 và 7 → BuzzJazz
console.log(`105 = ${customFizzBuzz(105, rules)[104]}`); // chia hết 3,5,7 → FizzBuzzJazz

// ============================================================
// TEST khác: Luật tùy ý
// ============================================================
console.log("\n=== Test với rules khác: 2→Even, 3→Triple ===");
const rulesCustom = [
    { divisor: 2, word: "Even" },
    { divisor: 3, word: "Triple" }
];
console.log(customFizzBuzz(12, rulesCustom).join(", "));
// 1, Even, Triple, Even, 5, EvenTriple, 7, Even, Triple, Even, 11, EvenTriple
