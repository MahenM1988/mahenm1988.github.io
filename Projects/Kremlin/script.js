document.addEventListener("DOMContentLoaded", () => {
    const accessCode = generateRandomCode();
    document.getElementById("access-code").innerText = accessCode;

    // Create digit display
    createDigitDisplay();

    const dropArea = document.getElementById("drop-area");
    const draggableItem = document.getElementById("draggable-item");

    dropArea.addEventListener("dragover", (event) => {
        event.preventDefault(); // Allow drop
    });

    dropArea.addEventListener("drop", () => {
        crackCode(accessCode);
    });

    draggableItem.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", ""); // Required for dragging
    });
});

function generateRandomCode() {
    return Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
}

function createDigitDisplay() {
    const digitContainer = document.getElementById("digit-container");
    for (let i = 0; i < 10; i++) {
        const digitElement = document.createElement("div");
        digitElement.className = "digit";
        digitElement.innerText = "_"; // Placeholder for digits
        digitContainer.appendChild(digitElement);
    }
}

async function crackCode(accessCode) {
    document.getElementById("output").innerText = "Decryption in Progress...";
    const foundDigits = Array(10).fill(null); // Data frame to track found digits
    let position = 9; // Start from the last digit

    while (position >= 0) {
        // Generate a random digit (0-9) for the current position
        const code = Array.from({ length: 10 }, (_, i) => (i === position ? Math.floor(Math.random() * 10) : foundDigits[i] || "_")).join('');

        // Check if the digit at the current position is correct
        if (code[position] === accessCode[position]) {
            foundDigits[position] = code[position]; // Update found digit
            console.log(`Correct digit found at position ${position}: ${code[position]}`);
            position--; // Move to the next position (left)
        } else {
            console.log(`Incorrect digit at position ${position}: ${code[position]}`);
        }

        // Update digit display
        updateDigitDisplay(foundDigits);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate time delay for each attempt
    }

    const completeCode = foundDigits.join('');
    if (completeCode === accessCode) {
        document.getElementById("output").innerText = `Access Granted! Code: ${completeCode}`;
    } else {
        document.getElementById("output").innerText = `Access Denied! Code: ${completeCode}`;
    }
}

function updateDigitDisplay(foundDigits) {
    const digitElements = document.querySelectorAll(".digit");
    foundDigits.forEach((digit, index) => {
        digitElements[index].innerText = digit !== null ? digit : "_"; // Update each digit or placeholder
    });
}
