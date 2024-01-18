//Variables DOM
let body;
let clickOpcionA;
let clickOpcionB;
let clickOpcionC;
let clickOpcionD;

//variables
let opcion;
let continuar;
let cantidadObjetos = 0;
let contador = 0;
let borrar = 0;
let buscarProducto;
let buscar;

//variables de objeto
let datoNombre;
let datoPrecio;
let datoCantidad;

//arrays
let arrayProductos = [];

//API
const url = "https://ipgeolocation.abstractapi.com/v1/?api_key=bb56507f73c2490c92220a3ed8b1b909&ip_address=181.91.15.219";
const options = {method: 'GET'};

//codigo
  function menu(){
    body = document.querySelector("body");
    body.innerHTML = 
    `<table>
    <tr><th>¿Que desea hacer?</th></tr>
    <tr><th id=clickOpcionA>A: Ver productos</th></tr>
    <tr><th id=clickOpcionB>B: Agregar productos</th></tr>
    <tr><th id=clickOpcionC>C: Eliminar productos</th></tr>
    <tr><th id=clickOpcionD>D: Buscar productos</th></tr>
    </table>
    
    <footer>
      <h3 id="direccion"></h3>
      <h3 id="ciudad"></h3>
      <h3 id="localidad"></h3>
      <h3 id="pais"></h3>
    </footer>`

    clickOpcionA = document.getElementById("clickOpcionA");
    clickOpcionB = document.getElementById("clickOpcionB");
    clickOpcionC = document.getElementById("clickOpcionC");
    clickOpcionD = document.getElementById("clickOpcionD");

    //Variables guardadas en Storage para mantener los productos guardados.
    cantidadObjetos = Number(localStorage.getItem("cantidadObjetos"));
    contador = Number(localStorage.getItem("contador"));
    arrayProductos = JSON.parse(localStorage.getItem("Productos"));
    if(arrayProductos == null){arrayProductos = []}
    console.log(arrayProductos);
    
    
  }

  function botonMenu(){
    let botonInicio = document.createElement("input");
    botonInicio.setAttribute("id", "botonInicio");
    botonInicio.setAttribute("type", "submit");
    botonInicio.setAttribute("value", "OK");
    document.body.append(botonInicio);
    document.getElementById("botonInicio");

    botonInicio.onclick = () => {
      menu();
      ClickOpcion();
      llamarApi();
    }

  }

    function guardarStorage(){
      localStorage.setItem("Productos", JSON.stringify(arrayProductos));
      localStorage.setItem("cantidadObjetos", cantidadObjetos);
      localStorage.setItem("contador", contador);
    }

  function mostrarProductos(){
    for(i = 0; i < arrayProductos.length; i++){ //Mostrar Array (convertir en funcion);
      let strong = document.createElement("strong");
      strong.setAttribute("id", "producto " + i);
      document.body.append(strong);


      let div = document.getElementById("producto " + i);
      div = document.createElement("div")
      document.body.append(div);

      let mostrarProducto = document.getElementById("producto " + i);
      mostrarProducto.textContent = "N" + (i + 1) + "|| Nombre: " + arrayProductos[i].nombre;
      mostrarProducto.textContent = mostrarProducto.textContent += "|| Precio: $" + arrayProductos[i].precio;
      mostrarProducto.textContent = mostrarProducto.textContent += "|| Cantidad: " + arrayProductos[i].cantidad + "|| ";  
    }
  }

  function ClickOpcion(){
    clickOpcionA.onclick = () => {
      body.innerHTML = ''

      if(arrayProductos.length == 0){
        body.innerHTML = `<label>Sin productos</label>
                          <div></div>`;
                          menu();
                          ClickOpcion();
                          llamarApi();
                          Swal.fire({
                            title: 'Sin productos',
                            text: 'Agregue un numero valido de productos',
                            icon: 'error',
                            confirmButtonText: 'Confirmar'
                          })
      }else{
        mostrarProductos();
        botonMenu();
      }
    }

    //-------------------------------------------------------------------------------------------------------------------------------

    clickOpcionB.onclick = () => {
    
      body = document.querySelector("body");
      body.innerHTML = `<label>¿Cuantos productos deasea ingresar?</label>
                        <form id=formulario>
                        <input id="cantidadObjetos"</input>
                        <input type="submit" value="Agregar">
                        </form>`
                        
                        let formB = document.getElementById("formulario").addEventListener("submit", (evt) => {
                          evt.preventDefault();
                          cantidadObjetos = Number(document.getElementById("cantidadObjetos").value);
                      
                          //Esta parte, hasta la linea 77 tuve que ayudarme con gpt jeje (necesitaba conocer el promise para solucionarlo)
                          function obtenerDatos(i) {
                              return new Promise((resolve) => {
                                  body.innerHTML = `<label>Ingresa el nombre, precio y cantidad del producto</label>
                                                      <form id=formulario>
                                                          <input id="nombre"</input>
                                                          <input id="precio"</input>
                                                          <input id="cantidad"</input>
                                                          <input type="submit" value="Agregar">
                                                      </form>`;
                                
                                  let nombreInput = document.getElementById("nombre");
                                  let precioInput = document.getElementById("precio");
                                  let cantidadInput = document.getElementById("cantidad");
                                
                                  document.getElementById("formulario").addEventListener("submit", (evt) => {
                                      evt.preventDefault();
                                      datoNombre = nombreInput.value;
                                      datoPrecio = precioInput.value;
                                      datoCantidad = cantidadInput.value;
                                      
                                      producto = {
                                          nombre: datoNombre,
                                          precio: datoPrecio,
                                          cantidad: datoCantidad,
                                      };
                                      
                                      arrayProductos[i] = producto;

                                      resolve();
                                  });
                              });
                          }
                      
                          // Utilizar un bucle asíncrono para manejar la lógica de forma sincrónica
                          (async () => {
                              for (let i = contador; i < cantidadObjetos + contador; i++) {
                                  await obtenerDatos(i);
                              }
                      
                              body.innerHTML =`<label>Usted a añadido los siguients productos:</label>`;
                                    for(let i = contador; i < cantidadObjetos + contador; i++){
                                      let label = document.createElement("div");
                                      label.setAttribute("id", "producto " + i);
                                      document.body.append(label);

                                      let mostrarProducto = document.getElementById("producto " + i);
                                      mostrarProducto.textContent = "N" + (i + 1) + "|| Nombre: " + arrayProductos[i].nombre;
                                      mostrarProducto.textContent = mostrarProducto.textContent += "|| Precio: $" + arrayProductos[i].precio;
                                      mostrarProducto.textContent = mostrarProducto.textContent += "|| Cantidad: " + arrayProductos[i].cantidad + "|| ";
                                    }
                              contador = Number(contador + cantidadObjetos);
                              botonMenu();
                              guardarStorage();
                          })(); // fin async
                      }); //fin evento
    } //fin opcion B

//----------------------------------------------------------------------------------------------------------------------------------

    clickOpcionC.onclick = () => {
      let input;
      let i;
      body.innerHTML = `<label>¿Qué elemento desea borrar?</label>
                        <div></div>`;
    
      if(arrayProductos.length == 0){
        menu();
        ClickOpcion();
        llamarApi();
        Swal.fire({
          title: 'Sin productos',
          text: 'No hay productos que borrar',
          icon: 'error',
          confirmButtonText: 'Confirmar'
        })
      }else{
      mostrarProductos();
      
      form = document.getElementById("producto " + i);
      form = document.createElement("form");
      form.setAttribute("id", "formularioBorrar");
      document.body.append(form);

      form.innerHTML = `<label>Ingrese el numero sin la letra</label>
                        <input id="nombreBorrar"</input>
                        <input type="submit" value="Agregar">`;

      let formBorrar = document.getElementById("formularioBorrar").addEventListener("submit", (evt) => {
        evt.preventDefault();
        let borrarInput = Number(document.getElementById("nombreBorrar").value - 1);

        if(borrarInput >= 0 && borrarInput < arrayProductos.length){
        arrayProductos.splice(borrarInput,1);
        contador = contador - 1;

        body.innerHTML = `<label>Lista de productos nueva</label>
                          <div></div>`;
        mostrarProductos();
        guardarStorage();

        if(arrayProductos.length == 0){
          body.innerHTML = `<label>Sin productos</label>
                            <div></div>`;
        }
      }
      else{
        body.innerHTML = `<label>Ingrese un numero valido</label>
                          <div></div>`;
      }

        botonMenu();

      });//fin evento
    }//fin opcion C
  }
  //--------------------------------------------------------------------------------------------------------------------------------
  
    clickOpcionD.onclick = () => {

      if(arrayProductos.length == 0){
        menu();
                          ClickOpcion();
                          llamarApi();
                          Swal.fire({
                            title: 'Sin productos',
                            text: 'No hay productos que buscar',
                            icon: 'error',
                            confirmButtonText: 'Confirmar'
                          })
      }else{
      
      body.innerHTML = `<label>"¿Que producto desea buscar?"</label>
                          <div></div>
                          <form id=formularioBuscar>
                            <input id="buscarInput"</input>
                            <input type="submit" value="Buscar">
                          </form>`;
                    
                        let formularioBuscar = document.getElementById("formularioBuscar").addEventListener("submit", (evt) => {
                            evt.preventDefault();
                            buscarProducto = document.getElementById("buscarInput").value;
                            buscarProducto = buscarProducto.toLowerCase();
                            let buscar = arrayProductos.find((producto) => producto.nombre.toLowerCase() == buscarProducto);

                            if(buscar == undefined){
                              body.innerHTML = `<label>No hay productos encontrados</label>
                                                <div></div>`

                              botonMenu();
                            }
                            else{
                              body.innerHTML = `<label>Se encontro el producto: </label>
                                                <div></div>
                                                <label id="mostrar"></label>
                                                <div></div>`

                              let mostrar = document.getElementById("mostrar");
                              mostrar.textContent = mostrar.textContent + "|| Nombre: " +(buscar.nombre);
                              mostrar.textContent = mostrar.textContent + "|| Precio: $" + (buscar.precio);
                              mostrar.textContent = mostrar.textContent + "|| Cantidad: " + (buscar.cantidad);
                              
                              botonMenu();
                            }
                          });
    }//fin opcion D
  }
  } //fin de function

  function llamarApi(){
    fetch(url, options)
    .then((respuesta)=>{
      console.log(respuesta);
      return respuesta.json();
  })
    .then(({ip_address, city, region, country})=>{
      let direccion = document.getElementById("direccion");
      direccion.innerHTML = ip_address;
  
      let ciudad = document.getElementById("ciudad");
      ciudad.innerHTML = city;
  
      let localidad = document.getElementById("localidad");
      localidad.innerHTML = region;
  
      let pais = document.getElementById("pais");
      pais.innerHTML = country;
  })
    .catch((err)=>{
      console.log(err);
  })
  }

  menu();
  ClickOpcion();
  llamarApi();