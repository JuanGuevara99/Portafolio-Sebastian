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





/*============================ CONTACTO ===========================*/
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    const contactName = document.getElementById('contact-name');
    const contactEmail = document.getElementById('contact-email');
    const contactAsunto = document.getElementById('contact-asunto');
    const contactMessage = document.getElementById('contact-message');

    const sendEmail = (e) => {
        e.preventDefault();

        console.log("Enviando correo...");

        console.log("Nombre:", contactName.value);
        console.log("Correo:", contactEmail.value);
        console.log("Asunto:", contactAsunto.value);

        if (contactName.value === '' || contactEmail.value === '' || contactAsunto.value === '') {
            contactMessage.classList.remove('color-blue');
            contactMessage.classList.add('color-red');
            contactMessage.textContent = '* Llene todos los campos 📩';
        } else {
            emailjs.sendForm('service_2y0bg5q', 'template_ojm3kg4', '#contact-form', 'q51fO84GGhCgrWrpw')
                .then(() => {
                    contactMessage.classList.add('color-blue');
                    contactMessage.textContent = 'Mensaje enviado ✅';

                    setTimeout(() => {
                        contactMessage.textContent = '';
                    }, 5000);
                })
                .catch(error => {
                    console.error('Error al enviar el formulario:', error);
                    contactMessage.classList.remove('color-blue');
                    contactMessage.classList.add('color-red');
                    contactMessage.textContent = 'Hubo un error al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.';
                });
        }
    }

    contactForm.addEventListener('submit', sendEmail);
});
