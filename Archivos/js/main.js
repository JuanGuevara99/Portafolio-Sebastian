/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

// Selecciona todas las secciones que tienen un atributo 'id'
const sections = document.querySelectorAll('section[id]')

// Función que se ejecuta cuando se realiza el scroll
function scrollActive() {
    // Obtiene la posición vertical del scroll
    const scrollY = window.pageYOffset

    // Itera sobre todas las secciones
    sections.forEach(current => {
        // Obtiene la altura de la sección actual
        const sectionHeight = current.offsetHeight,
            // Obtiene la posición superior de la sección actual
            sectionTop = current.offsetTop - 50,
            // Obtiene el valor del atributo 'id' de la sección actual
            sectionId = current.getAttribute('id')

        // Verifica si la posición del scroll está dentro de los límites de la sección actual
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // Agrega la clase 'active-link' al enlace de la barra de navegación correspondiente a la sección actual
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            // Si no, remueve la clase 'active-link' del enlace de la barra de navegación correspondiente a la sección actual
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}

// Escucha el evento de scroll en la ventana y ejecuta la función 'scrollActive' cuando ocurre
window.addEventListener('scroll', scrollActive)




/*=============== CHANGE BACKGROUND HEADER ===============*/

// Función que se ejecuta cuando se realiza scroll
function scrollHeader() {
    // Obtiene el elemento del encabezado por su ID
    const header = document.getElementById('header')

    // Cuando el scroll es mayor o igual a 80 viewport height, agrega la clase 'scroll-header' al elemento del encabezado
    // De lo contrario, remueve la clase 'scroll-header' del elemento del encabezado
    if (this.scrollY >= 80) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

// Escucha el evento de scroll en la ventana y ejecuta la función 'scrollHeader' cuando ocurre
window.addEventListener('scroll', scrollHeader)


/*=========================== CONTACTO ========================= */
const form = document.querySelector('form');
const nombrePersona = document.getElementById("name");
const correoElectronico = document.getElementById("email");
const numeroCelular = document.getElementById("phone");
const asunto = document.getElementById("subject");
const mensaje = document.getElementById("message");

/*-- Envio de mensaje al correo electrónico --*/
function sendEmail() {
    const bodyMessage = `Nombre: ${nombrePersona.value}<br> Correo electrónico: ${correoElectronico.value}<br> 
    Numero Celular: ${numeroCelular.value}<br> Mensaje: ${mensaje.value}<br>`;


    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "juanguevara1121@gmail.com",
        Password: "65128E8A1150451125F6AB273346DA23B6CF",
        To: 'juanguevara1121@gmail.com',
        From: "juanguevara1121@gmail.com",
        Subject: asunto.value,
        Body: bodyMessage
    }).then(
        message => {
            if (message == "OK")
                Swal.fire({
                    title: "Bien!",
                    text: "Su mensaje fue enviado",
                    icon: "success"
                });
                // Limpiar los campos después de enviar el mensaje
                clearFields();
        }
    );
}

/*-- Validar que los campos no esten vacios --*/
function checkInputs() {
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if (items[1].value != "") {
            checkEmail(correoElectronico);
        }

        items[1].addEventListener("keyup", () => {
            checkEmail(correoElectronico);
        });

        item.addEventListener("keyup", () => {
            if (item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
            else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }

    // Llamar a sendEmail() solo si todos los campos están completos y válidos
    const errorInputs = document.querySelectorAll(".error");
    if (errorInputs.length === 0) {
        sendEmail();
    }
}

function checkEmail(emailInput) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const errorTxtEmail = document.querySelector('.error-txt.email');

    if (!emailInput.value.match(emailRegex)) {
        emailInput.classList.add("error");
        emailInput.parentElement.classList.add("error");

        if (emailInput.value != "") {
            errorTxtEmail.innerText = "(*) Introduzca una dirección de correo electrónico válida";
        }
        else {
            errorTxtEmail.innerText = "(*) Espacio correo en blanco";
        }

    }
    else {
        emailInput.classList.remove("error");
        emailInput.parentElement.classList.remove("error");
        errorTxtEmail.innerText = ""; // Limpiar el texto de error si el correo es válido
    }
}

function clearFields() {
    nombrePersona.value = "";
    correoElectronico.value = "";
    numeroCelular.value = "";
    asunto.value = "";
    mensaje.value = "";
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();
});

/*--Validar que los campos esten completos para enviar el mensaje --*/
form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();
    // Ahora, después de verificar los campos, si no hay errores, envía el correo
    const errorInputs = document.querySelectorAll(".error");
    if (errorInputs.length === 0) {
        sendEmail();
    }
});