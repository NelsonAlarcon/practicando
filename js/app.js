const api = new API(
  "a95f55ceec4353c6e8836d1e1aedfb20a621ef8f784a88a08a25851223ac17e4"
);
const ui = new Interface();
api.obtenerMonedasAPI();
const formulario = document.getElementById("formulario");
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const monedaSelect = document.getElementById("moneda");
  const monedaSeleccionada = monedaSelect.value;
  console.log(monedaSeleccionada);

  const cryptoMonedaSelect = document.getElementById("criptomoneda");
  const cryptoMonedaSeleccionada = cryptoMonedaSelect.value;
  console.log(cryptoMonedaSeleccionada);

  if (monedaSeleccionada === "" || cryptoMonedaSeleccionada === "") {
    ui.mostrarMensaje(
      "Ambos campos son obligatorios!",
      "alert bg-danger text-center"
    );
  } else {
    api
      .obtenerMonedas(monedaSeleccionada, cryptoMonedaSeleccionada)
      .then((data) => {
        ui.mostrarResultado(
          data.resultado.RAW,
          monedaSeleccionada,
          cryptoMonedaSeleccionada
        );
      });
  }
});
