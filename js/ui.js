class Interface {
  constructor() {
    this.init();
  }
  init() {
    this.construirSelect();
  }
  construirSelect() {
    api.obtenerMonedasAPI().then((monedas) => {
      const select = document.getElementById("criptomoneda");
      for (const [key, value] of Object.entries(monedas.monedas.Data)) {
        const option = document.createElement("option");
        option.value = value.Symbol;
        option.appendChild(document.createTextNode(value.CoinName));
        select.appendChild(option);
      }
    });
  }
  mostrarMensaje(mensaje, clases) {
    const div = document.createElement("div");
    div.className = clases;
    div.appendChild(document.createTextNode(mensaje));
    document.querySelector(".mensajes").appendChild(div);

    setTimeout(() => {
      document.querySelector(".mensajes").remove();
    }, 2000);
  }

  mostrarResultado(resultado, moneda, crypto) {
    const resultadoAnterior = document.querySelector("#resultado > div");
    if (resultadoAnterior) {
      resultadoAnterior.remove();
    }
    const datosMoneda = resultado[crypto][moneda];

    let precio = datosMoneda.PRICE.toFixed(2);
    let variacion = datosMoneda.CHANGEPCTDAY.toFixed(2),
      actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString(
        "es-PE"
      );

    let templateHTML = `
    <div class="card bg-warning">
        <div class="card-body text-light">
            <h2 class="card-tittle">Resultado:</h2>
            <p>El precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: ${precio}</p>
            <p>Variación reciente: %${variacion}</p>
            <p>Útima actualización: ${actualizado}</p>
         </div>
    </div>
    `;
    this.mostrarOcultarSpinner("block");
    setTimeout(() => {
      document.getElementById("resultado").innerHTML = templateHTML;
      this.mostrarOcultarSpinner("none");
    }, 3000);
  }

  mostrarOcultarSpinner(vista) {
    const spinner = document.querySelector(".contenido-spinner");
    spinner.style.display = vista;
  }
}
