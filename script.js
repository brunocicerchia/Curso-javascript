let modalTitle = document.querySelector("#ModalLabel");
let modalBody = document.querySelector("#detallesModal");
let compuProcesador;
let compuMother;
let compuRam;
let precioFinal;

//Componentes
const procesadores = [{ id: 0, nombre: "AMD Ryzen 9 3950x", nucleos: 16, hilos: 32, frecuencia: 4.7, fabricante: "AMD", precio: 107999 },
    { id: 1, nombre: "AMD Ryzen 9 3900XT", nucleos: 12, hilos: 24, frecuencia: 5, fabricante: "AMD", precio: 84990 },
    { id: 2, nombre: "AMD Ryzen 7 3700X", nucleos: 8, hilos: 16, frecuencia: 4.4, fabricante: "AMD", precio: 50000 },
    { id: 3, nombre: "AMD Ryzen 5 3600", nucleos: 6, hilos: 12, frecuencia: 3.6, fabricante: "AMD", precio: 36100 },
    { id: 4, nombre: "AMD 3200G Ryzen 3", nucleos: 4, hilos: 4, frecuencia: 4.1, fabricante: "AMD", precio: 40000 },
    { id: 5, nombre: "Intel Core I9-9900K", nucleos: 8, hilos: 16, frecuencia: 5, fabricante: "Intel", precio: 61989 },
    { id: 6, nombre: "Intel Core i7-9700K", nucleos: 8, hilos: 8, frecuencia: 4.9, fabricante: "Intel", precio: 45000 },
    { id: 7, nombre: "Intel Core i5-9600k", nucleos: 6, hilos: 6, frecuencia: 4.6, fabricante: "Intel", precio: 36899 },
    { id: 8, nombre: "Intel Core i5-10600K", nucleos: 6, hilos: 12, frecuencia: 4.1, fabricante: "Intel", precio: 33900 },
    { id: 9, nombre: "Intel Core i5-10400F", nucleos: 6, hilos: 12, frecuencia: 4.3, fabricante: "Intel", precio: 20200 },
    { id: 10, nombre: "Intel Core i3-10100", nucleos: 4, hilos: 8, frecuencia: 4.3, fabricante: "Intel", precio: 16657 },
    { id: 11, nombre: "Intel Celeron G4930", nucleos: 2, hilos: 2, frecuencia: 2.6, fabricante: "Intel", precio: 16800 }]

const motherAMD = [{ id: 0, nombre: "ASROCK A520M-HVS", precio: 7331 },
    { id: 1, nombre: "GIGABYTE B450M S2H V2", precio: 8943 },
    { id: 2, nombre: "GIGABYTE B450M DS3H V2 SOPORTA AMD 5000", precio: 10035 },
    { id: 3, nombre: "GIGABYTE B450M GAMING AM4", precio: 11354 },
    { id: 4, nombre: "GIGABYTE B450M AORUS", precio: 12174 },
    { id: 5, nombre: "GIGABYTE B450 AORUS ELITE V2 AM4", precio: 13710 },
    { id: 6, nombre: "ASROCK B550 PHANTOM 4 AM4", precio: 14821 },
    { id: 7, nombre: "MSI B550M PRO VDH AM4", precio: 16725 },
    { id: 8, nombre: "ASROCK B450 STEEL LEGENDS (6 PCI)", precio: 17716 },
    { id: 9, nombre: "ASUS CROSSHAIR VIII HERO DARK", precio: 62893 },]

const motherIntel = [{ id: 0, nombre: "Gigabyte H310M-H LGA 1151", precio: 7210 },
    { id: 1, nombre: "Gigabyte H310M-DS2 SERIE PARALELO S1151", precio: 8610 },
    { id: 2, nombre: "Gigabyte H410M H V2 S1200", precio: 11480 },
    { id: 3, nombre: "Gigabyte B365M AORUS ELITE 1151 9th", precio: 13580 },
    { id: 4, nombre: "Gigabyte B560M-DS3H Socket 1200", precio: 16530 },
    { id: 5, nombre: "Asrock Z590M Phantom Gaming 4", precio: 20380 },
    { id: 6, nombre: "Gigabyte Z590 UD AC ATX S1200", precio: 31030 },
    { id: 7, nombre: "Asrock Z590 PG Velocita", precio: 41480 },
    { id: 8, nombre: "Gigabyte Z590 Vision G Socket 1200", precio: 45800 },
    { id: 9, nombre: "Gigabyte Z490 Aorus Xtreme Socket 1200", precio: 98840 },]

const ram = [{ id: 0, nombre: "Kingston Fury 4Gb DDR4 2400Mhz", socket: "DDR4", frecuencia: 2400, precio: 3050 },
    { id: 1, nombre: "Kingston Fury 4Gb DDR4 2666Mhz", socket: "DDR4", frecuencia: 2666, precio: 3821 },
    { id: 2, nombre: "Kingston Fury 4Gb DDR4 3200Mhz", socket: "DDR4", frecuencia: 3200, precio: 4036 },
    { id: 3, nombre: "Kingston Fury 8Gb DDR4 2666Mhz", socket: "DDR4", frecuencia: 2666, precio: 6204 },
    { id: 4, nombre: "Kingston Fury 8Gb DDR4 3200Mhz", socket: "DDR4", frecuencia: 3200, precio: 6958 },
    { id: 5, nombre: "HyperX Predator 8Gb DDR4 3600Mhz RGB", socket: "DDR4", frecuencia: 3600, precio: 8754 },
    { id: 6, nombre: "Kingston Fury 16Gb DDR4 3200Mhz", socket: "DDR4", frecuencia: 3200, precio: 13200 },
    { id: 7, nombre: "Kingston Fury 16Gb DDR4 3200Mhz RGB", socket: "DDR4", frecuencia: 3200, precio: 13740 },
    { id: 8, nombre: "HyperX Predator 16Gb DDR4 3200Mhz RGB", socket: "DDR4", frecuencia: 3200, precio: 15581 }]


//Si hay una pc creada se consulta
function consultaPc() {
    if(localStorage.getItem("ram")) {
        modalTitle.innerHTML = `<h4 class="tituloHeader">Se encontro una compu ya terminada!</h4>`;
        modalBody.innerHTML = `
        <p class="subtitulo">Te gustaria continuar donde lo dejaste?</p>
        <button id="restoreButton" class="btn btn btn-success me-3">Continuar</button>
        <button id="deleteButton" class="btn btn-danger">Empezar de 0</button>
        `;
        $('#Modal').modal('show');
    } else {
        procesador();
    } 
}

//Mostrar Procesadores
function procesador() {
    $('#Modal').modal('hide');
    $("#botonBody").hide();
    localStorage.clear();
    $("body").css("overflow-y", "scroll");
    window.location.hash = "#productosContainer";
    $("#botonBody").hide();
    $(".computadoras").html("");
    $("#productosContainer").css("display", "block");
    $("#productosContainer").addClass( "fadeIn", 10000, "easeOutBounce" );
    $(".titulo").addClass( "fadeIn", 10000, "easeOutBounce" );
    $('.titulo').html("Elige tu procesador ¡Recuerda que este definirá la potencia de tu PC!");
    for (const procesador of procesadores) {
        $(".computadoras").append(`
        <div class="col-md-6" style="margin-top: 20px; margin-bottom: 20px;">
            <div class="card shadow" style="width: 18rem; background-color: #7B63D7; color: #fff;">
                <a href="#productosContainer" id="${procesador.id}" onClick="mother(this)"><img src="images/${procesador.nombre}.jpg" class="card-img-top" alt="${procesador.nombre}"></a>
                <div class="card-body" style="text-decoration: none !important;">
                    <h5 class="card-title"><b>${procesador.nombre}</b></h5>        
                    <p class="card-text">Precio: $${Intl.NumberFormat().format(procesador.precio)}</p>
                    <button class="btn btn-light" id="${procesador.id}" onclick="modalDescriptionP(this)" data-bs-toggle="modal" data-bs-target="#Modal">Ver detalles</button>
                </div>
            </div>
        </div>
        `);
    }      
}

//Mostrar Mother
function mother(element) {    
    //Guardar Procesador en LocalStorage
    compuProcesador = procesadores[element.id];
    precioFinal = compuProcesador.precio;
    let compuProcesadorString = JSON.stringify(compuProcesador);
    localStorage.setItem("procesador", compuProcesadorString);
    console.log("Procesador Guardado");

    //Agregar item al carrito
    $(".carrito").html("");
    $(".carrito").append(`
    <div class="row d-flex justify-content-between subtitulo itemCart mt-3">
        <div class="col-md-4" style="padding:0;">
            <img src="images/${compuProcesador.nombre}.jpg" class="img img-fluid itemCartImage" style="padding:5px;">
        </div>
        <div class="col-md-8">
            <h3>${compuProcesador.nombre}</h3>
            <p>$${Intl.NumberFormat().format(compuProcesador.precio)}</p>
        </div>
    </div>    
    `);
    $(".carritoPrecio").html(`<p id="precioFinal">Total: <b>$${Intl.NumberFormat().format(precioFinal)}<b></p>`);

    //Muestra mothers
    $('.titulo').html("Elegi tu mother!");
    $('.computadoras').html("");
    if(compuProcesador.fabricante == "AMD") {
        for (const mother of motherAMD) {
            $(".computadoras").append(`        
            <div class="col-md-6" style="margin-top: 20px; margin-bottom: 20px;">
            <div class="card shadow" style="width: 18rem; background-color: #7B63D7; color: #fff;">
            <a href="#productosContainer" id="${mother.id}" onClick="ramShowAMD(this)"><img src="images/${mother.nombre}.jpg" class="card-img-top" alt="${mother.nombre}"></a>
            <div class="card-body" style="text-decoration: none !important;">
            <h5 class="card-title"><b>${mother.nombre}</b></h5>
            <p class="card-text">Precio: $${Intl.NumberFormat().format(mother.precio)}</p>
            </div>
            </div>
            </div>
            `
            );
        }
        
    } else {
        console.log("Mostrando solo mothers compatibles con " + compuProcesador.fabricante)
        for (const mother of motherIntel) {
            $(".computadoras").append(`
            <div class="col-md-6" style="margin-top: 20px; margin-bottom: 20px;">
            <div class="card shadow" style="width: 18rem; background-color: #7B63D7; color: #fff;">
            <a href="#productosContainer" id="${mother.id}" onClick="ramShowIntel(this)"><img src="images/${mother.nombre}.jpg" class="card-img-top" alt="${mother.nombre}"></a>
            <div class="card-body" style="text-decoration: none !important;">
            <h5 class="card-title"><b>${mother.nombre}</b></h5>
            <p class="card-text">Precio: $${Intl.NumberFormat().format(mother.precio)}</p>
            </div>
            </div>
            </div>
            `);
        }
    }
}

//Mostrar ram
function ramShowAMD(element) {
    compuMother = motherAMD[element.id];
    console.log(element.id);
    //Guardar Mother en LocalStorage
    let compuMotherString = JSON.stringify(compuMother);
    localStorage.setItem("mother", compuMotherString);
    console.log("Mother Guardado");
    precioFinal = compuMother.precio + precioFinal;

    //Agregar mother al carrito
    $(".carrito").append(`
    <div class="row d-flex justify-content-evenly subtitulo itemCart mt-3">
        <div class="col-md-4" style="padding:0;">
            <img src="images/${compuMother.nombre}.jpg" class="img img-fluid itemCartImage" style="padding:5px;">
        </div>
        <div class="col-md-8">
            <h3>${compuMother.nombre}</h3>
            <p>$${Intl.NumberFormat().format(compuMother.precio)}</p>
        </div>
    </div>
    `);
    $("#precioFinal").html(`Total: <b>$${Intl.NumberFormat().format(precioFinal)}<b>`)

    //Muestra Rams disponibles
    $('.titulo').html("Elegi tu RAM!");
    $(".computadoras").html("");
    for (const ramItem of ram) {
        $(".computadoras").append(`        
        <div class="col-md-6" style="margin-top: 20px; margin-bottom: 20px;">
        <div class="card shadow" style="width: 18rem; background-color: #7B63D7; color: #fff;">
        <a href="#productosContainer" id="${ramItem.id}" onClick="pcTerminada(this)"><img src="images/${ramItem.nombre}.jpg" class="card-img-top" alt="${ramItem.nombre}"></a>
        <div class="card-body" style="text-decoration: none !important;">
        <h5 class="card-title"><b>${ramItem.nombre}</b></h5>
        <p class="card-text">Precio: $${Intl.NumberFormat().format(ramItem.precio)}</p>
        <button class="btn btn-light" id="${ramItem.id}" onclick="modalDescriptionR(this)" data-bs-toggle="modal" data-bs-target="#Modal">Ver detalles</button>
        </div>
        </div>
        </div>
        `);
    }    
}

function ramShowIntel(element) {
    compuMother = motherIntel[element.id];
    console.log(element.id);
    //Guardar Mother en LocalStorage 
    console.log(compuMother);
    let compuMotherString = JSON.stringify(compuMother);
    localStorage.setItem("mother", compuMotherString);
    console.log("Mother Guardado");
    precioFinal = compuMother.precio + precioFinal;

    //Agregar mother al carrito
    $(".carrito").append(`
    <div class="row d-flex justify-content-evenly subtitulo itemCart mt-3">
        <div class="col-md-4" style="padding:0;">
            <img src="images/${compuMother.nombre}.jpg" class="img img-fluid itemCartImage" style="padding:5px;">
        </div>
        <div class="col-md-8">
            <h3>${compuMother.nombre}</h3>
            <p>$${Intl.NumberFormat().format(compuMother.precio)}</p>
        </div>
    </div>
    `);
    $("#precioFinal").html(`Total: <b>$${Intl.NumberFormat().format(precioFinal)}<b>`)

    //Muestra Rams disponibles
    $('.titulo').html("Elegi tu RAM!");
    $(".computadoras").html("");
    for (const ramItem of ram) {
        $(".computadoras").append(`        
        <div class="col-md-6" style="margin-top: 20px; margin-bottom: 20px;">
        <div class="card shadow" style="width: 18rem; background-color: #7B63D7; color: #fff;">
        <a href="#productosContainer" id="${ramItem.id}" onClick="pcTerminada(this)"><img src="images/${ramItem.nombre}.jpg" class="card-img-top" alt="${ramItem.nombre}"></a>
        <div class="card-body" style="text-decoration: none !important;">
        <h5 class="card-title"><b>${ramItem.nombre}</b></h5>
        <p class="card-text">Precio: $${Intl.NumberFormat().format(ramItem.precio)}</p>
        <button class="btn btn-light" id="${ramItem.id}" onclick="modalDescriptionR(this)" data-bs-toggle="modal" data-bs-target="#Modal">Ver detalles</button>
        </div>
        </div>
        </div>
        `);
    }
}

//Almacenar pc termianda
function pcTerminada(element) {
    compuRam = ram[element.id]        
    console.log(element.id);
    //Guardar Ram en LocalStorage
    let compuRamString = JSON.stringify(compuRam);
    localStorage.setItem("ram", compuRamString);
    console.log("RAM Guardado");
    precioFinal = compuRam.precio + precioFinal;

    //Agregar Ram al carrito
    $(".carrito").append(`
    <div class="row d-flex justify-content-between subtitulo itemCart mt-3">
        <div class="col-md-4" style="padding:0;">
            <img src="images/${compuRam.nombre}.jpg" class="img img-fluid itemCartImage" style="padding:5px;">
        </div>
        <div class="col-md-8">
            <h3>${compuRam.nombre}</h3>
            <p>$${Intl.NumberFormat().format(compuRam.precio)}</p>
        </div>
    </div>
    `);
    $("#precioFinal").html(`Total: <b>$${Intl.NumberFormat().format(precioFinal)}<b>`)

    $('.titulo').html("Tu PC Finalizada!");
    restoreStorage();
}

function restoreStorage() { 
    $('#Modal').modal('hide');
    $("body").css("overflow-y", "scroll");  
    $("#botonBody").hide();
    $("#productosContainer").css("display", "block");
    $("#productosContainer").addClass( "fadeIn", 10000, "easeOutBounce" );
    $(".titulo").addClass( "fadeIn", 10000, "easeOutBounce" );
    let procesadorFinal = JSON.parse(localStorage.getItem("procesador"));
    let motherFinal = JSON.parse(localStorage.getItem("mother"));
    let ramFinal = JSON.parse(localStorage.getItem("ram"));
    let arrayFinal = [procesadorFinal, motherFinal, ramFinal];
    $('.titulo').html("Tu PC Finalizada!");
    $(".computadoras").html("");
    $(".carrito").html("");
    let precioFinal2 = 0;
    for(const x in arrayFinal) {
        precioFinal2 = precioFinal2 + arrayFinal[x].precio; 
        $(".carrito").append(`
        <div class="row d-flex justify-content-between subtitulo itemCart mt-3">
        <div class="col-md-4">
            <img src="images/${arrayFinal[x].nombre}.jpg" class="img img-fluid itemCartImage" style="padding:5px;">
        </div>
        <div class="col-md-8">
            <h3>${arrayFinal[x].nombre}</h3>
            <p>$${Intl.NumberFormat().format(arrayFinal[x].precio)}</p>
        </div>
        </div>    
    `);
    $(".carritoPrecio").html(`<p id="precioFinal">Total: <b>$${Intl.NumberFormat().format(precioFinal2)}<b></p>`);
    window.location.hash = "#productosContainer";    
    }
    $('.computadoras').append(`
    <h3 class="text-center subtitulo">Ingresa a tu cuenta o registrate!</h3>
    <form class="sesionForm">
        <div class="mb-3">
        <label for="InputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="InputEmail1" aria-describedby="emailHelp">
        <div id="emailHelp" class="form-text">No compartiremos tu direccion con terceros</div>
        </div>
        <div class="mb-3">
        <label for="InputPassword1" class="form-label">Contraseña</label>
        <input type="password" class="form-control" id="InputPassword1">
        </div>
        <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="Check1">
        <label class="form-check-label" for="Check1">Mantener sesion abierta</label>
        </div>
        <button type="submit" class="btn btn-primary" onClick="alert()">Iniciar Sesion</button>
    </form>
    `);
}

function modalDescriptionP(e) {
    let productoId = parseInt(e.id);
    modalTitle.innerHTML = `${procesadores[productoId].nombre}`
    modalBody.innerHTML = `
        <p>Nucleos: ${procesadores[productoId].nucleos}</p>
        <p>Hilos: ${procesadores[productoId].hilos}</p>
        <p>Frecuencia: ${procesadores[productoId].frecuencia} Mhz</p>
        <p>Fabricante: ${procesadores[productoId].fabricante}</p>
        <p>Precio: $${procesadores[productoId].precio}</p>
    `
}

function modalDescriptionR(e) {
    let productoId = parseInt(e.id);
    modalTitle.innerHTML = `${ram[productoId].nombre}`
    modalBody.innerHTML = `
        <p>Socket: ${ram[productoId].socket}</p>
        <p>Frecuencia: ${ram[productoId].frecuencia}</p>
        <p>Precio: $${ram[productoId].precio}</p>
    `
}

//Smooth scroll
$('a[href*="#"]')
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 40
        }, 100, function() {
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            return false;
          } else {
            $target.attr('tabindex','-1');
            $target.focus();
          };
        });
      }
    }
  });

let contador = 1;
function alert() {
    if(contador == 1) {
        $('.computadoras').append(`
        <div class="alert alert-warning mt-3" role="alert">
            Funcion deshabilitada actualmente!
        </div>
        `);
    }   
    contador = 2; 
}

//click events
$("#titleButton").click((e) => { 
    procesador()
});

$("#botonBody").click((e) => { 
    consultaPc()
});

$("body").on("click", "#deleteButton", procesador);

$("body").on("click", "#restoreButton", restoreStorage);