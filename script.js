let wasm;
let toastTimeout;
let audioContext;

const button = document.getElementById("calculate");
const result = document.getElementById("result");

function showToast(message, type = "success") {
    const toast = document.getElementById("toast");

    clearTimeout(toastTimeout);

    toast.textContent = `${message}`;
    toast.className = type;
    toast.classList.add("show");

    if (type === "error") {
        playSound();
    }

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

function playError() {
    audioContext ??= new (window.AudioContext || window.webkitAudioContext)();

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 300;
    oscillator.type = "sine";

    const now = audioContext.currentTime;

    gainNode.gain.setValueAtTime(0.12, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    oscillator.start(now);
    oscillator.stop(now + 0.2);
}

function clearSudoku() {
    const inputs = document.querySelectorAll("#sudokuTable input");

    inputs.forEach(input => {
        input.value = "";
    });

    showToast("All fields have been cleared!", "success");
}

function submitSudoku() {
    const inputs = document.querySelectorAll("#sudokuTable input");
    
    let sudokuInput = "";
    inputs.forEach(input => {
        sudokuInput += input.value === "" ? "." : input.value;
    });

    const sudokuOutput = wasm.ccall("solveSudoku", "string", ["string"], [sudokuInput]);
    
    console.log(sudokuInput)
    console.log(sudokuOutput)
}

async function init() {
    try {
        wasm = await createSudokuModule();
    } catch (error) {
        console.error("Error loading WASM:", error);
        showToast("Failed to load Sudoku Solver. Please refresh the page.", "error");
    }
}

init();
