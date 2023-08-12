addEventListener("message", () => {
    conectaAPI();
    setInterval(() => conectaAPI(), 5000);
})

async function conectaAPI () {
    
    const conecta = await fetch("https://economia.awesomeapi.com.br/json/last/CAD-BRL");
    const conectaTraduzido = await conecta.json();
    postMessage(conectaTraduzido.CADBRL);
}