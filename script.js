let wasm;

const button = document.getElementById("calculate");
const result = document.getElementById("result");

async function init() {
    try {
        wasm = await createSudokuModule();
        button.disabled = false;
        button.textContent = "Spočítat";
    } catch (error) {
        console.error("Chyba při načítání WASM:", error);
        result.textContent = "Nepodařilo se načíst C program.";
    }
}

button.addEventListener("click", () => {

    const a = document.getElementById("a").value;
    const output = wasm.ccall("modifyString", "string", ["string"], [a]);

    result.textContent = "Výsledek: " + output;
});

init();
