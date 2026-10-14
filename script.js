let wasm;

const button = document.getElementById("calculate");
const result = document.getElementById("result");

// Inicializace WebAssembly
async function init() {
    try {
        wasm = await createSudokuModule();

        console.log("C program načten!");

        button.disabled = false;
        button.textContent = "Spočítat";
    } catch (error) {
        console.error("Chyba při načítání WASM:", error);
        result.textContent = "Nepodařilo se načíst C program.";
    }
}

// Kliknutí na tlačítko
button.addEventListener("click", () => {

    const a = Number(document.getElementById("a").value);
    const b = Number(document.getElementById("b").value);

    // Volání funkce napsané v C
    const output = wasm.ccall(
        "secti",
        "number",
        ["number", "number"],
        [a, b]
    );

    result.textContent = "Výsledek: " + output;
});

init();
