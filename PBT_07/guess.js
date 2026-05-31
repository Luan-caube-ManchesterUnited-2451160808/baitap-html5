// ============================================================
// Bài B3 — Mini Game: Đoán số (Logic)
// File này được nhúng vào guess_number.html
// ============================================================

const MAX_ATTEMPTS = 7;

let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let guessedNumbers = [];
let gameOver = false;

function playGame() {
    while (!gameOver && attempts < MAX_ATTEMPTS) {
        const input = prompt(
            `🎯 Đoán số từ 1 đến 100\n` +
            `Lần đoán: ${attempts + 1}/${MAX_ATTEMPTS}\n` +
            `${guessedNumbers.length > 0 ? "Đã đoán: " + guessedNumbers.join(", ") : ""}`
        );

        // Người dùng bấm Cancel
        if (input === null) {
            alert("Bạn đã thoát game. Đáp án là: " + secretNumber);
            return;
        }

        const guess = Number(input.trim());

        // Validate: phải là số nguyên từ 1-100
        if (!Number.isInteger(guess) || guess < 1 || guess > 100 || input.trim() === "") {
            alert("⚠️ Vui lòng nhập số nguyên từ 1 đến 100!");
            continue;
        }

        // Đã đoán số này rồi
        if (guessedNumbers.includes(guess)) {
            alert(`⚠️ Bạn đã đoán số ${guess} rồi! Hãy thử số khác.`);
            continue;
        }

        attempts++;
        guessedNumbers.push(guess);

        if (guess === secretNumber) {
            alert(`🎉 Đúng rồi! Số bí mật là ${secretNumber}.\nBạn đoán đúng sau ${attempts} lần!`);
            gameOver = true;
        } else if (attempts >= MAX_ATTEMPTS) {
            alert(`😞 Hết lượt! Bạn đoán sai sau ${attempts} lần.\nĐáp án là: ${secretNumber}`);
            gameOver = true;
        } else if (guess < secretNumber) {
            alert(`📈 Cao hơn! ${MAX_ATTEMPTS - attempts} lần còn lại.`);
        } else {
            alert(`📉 Thấp hơn! ${MAX_ATTEMPTS - attempts} lần còn lại.`);
        }
    }

    // Hỏi chơi lại
    if (confirm("Bạn có muốn chơi lại không?")) {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        guessedNumbers = [];
        gameOver = false;
        playGame();
    }
}

// Khởi động game
playGame();
