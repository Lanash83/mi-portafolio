// Espera a que el contenido del DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    /**
     * Funcionalidad del Acordeón para la sección de Experiencia.
     * Permite expandir y colapsar los detalles de cada puesto de trabajo.
     */
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // El contenido del acordeón es el siguiente elemento después del párrafo de la fecha
            const content = header.nextElementSibling.nextElementSibling;
            const arrowIcon = header.querySelector('span');

            // Alterna la clase 'active' para controlar la visibilidad con CSS
            content.classList.toggle('active');

            // Rota el ícono de la flecha para indicar el estado (abierto/cerrado)
            if (content.classList.contains('active')) {
                arrowIcon.style.transform = 'rotate(180deg)';
            } else {
                arrowIcon.style.transform = 'rotate(0deg)';
            }
        });
    });

    /**
     * Funcionalidad de Scroll Suave.
     * Anima el desplazamiento al hacer clic en los enlaces de navegación.
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    /**
     * Efecto de Máquina de Escribir para el subtítulo de la sección de inicio.
     * Escribe y borra dinámicamente una serie de frases.
     */
    const typingTextElement = document.getElementById('typing-text');
    // Se restaura la frase original y se mantienen las demás para un efecto dinámico.
    const phrases = [
        "Busco una oportunidad desafiante para aplicar mi versatilidad y continuar mi desarrollo profesional en un entorno dinamico.",
        ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 70; // Velocidad de escritura (ms)
    const deletingSpeed = 30; // Velocidad de borrado (ms)
    const delayBetweenPhrases = 2000; // Pausa al final de una frase (ms)

    function typeWriter() {
        if (!typingTextElement) return; // Salir si el elemento no existe

        const currentPhrase = phrases[phraseIndex];
        let typeTimeout = typingSpeed;

        if (isDeleting) {
            // Proceso de borrado
            typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeTimeout = deletingSpeed;
        } else {
            // Proceso de escritura
            typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Se terminó de escribir la frase, pausar y luego empezar a borrar
            typeTimeout = delayBetweenPhrases;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Se terminó de borrar la frase, pasar a la siguiente
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeTimeout = 500; // Pequeña pausa antes de la siguiente frase
        }

        setTimeout(typeWriter, typeTimeout);
    }

    // Iniciar el efecto de escritura
    typeWriter();

    /**
     * Botón "Volver Arriba".
     * Muestra el botón cuando el usuario se desplaza hacia abajo y
     * lo oculta cuando está en la parte superior de la página.
     */
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    const toggleScrollToTopBtn = () => {
        if (scrollToTopBtn && (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200)) {
            scrollToTopBtn.style.display = "block";
        } else if (scrollToTopBtn) {
            scrollToToTopBtn.style.display = "none";
        }
    };
    
    window.addEventListener('scroll', toggleScrollToTopBtn);

    // Funcionalidad de clic para el botón
    if(scrollToTopBtn) {
        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Gestión del formulario de contacto:
     * 1. Previene el envío por defecto para usar AJAX.
     * 2. Envía los datos a Formspree.
     * 3. Limpia el formulario tras el éxito.
     * 4. Muestra un mensaje de éxito temporal.
     */
    const contactForm = document.querySelector('#contact form');
    const formSuccessMessage = document.getElementById('form-success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evita la recarga de la página

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    contactForm.reset(); // Limpia todos los campos del formulario
                    formSuccessMessage.classList.remove('hidden'); // Muestra el mensaje de éxito

                    // Oculta el mensaje de éxito después de unos segundos
                    setTimeout(() => {
                        formSuccessMessage.classList.add('hidden');
                    }, 5000); // El mensaje desaparece después de 5 segundos

                } else {
                    // Manejo de errores si el envío falla (opcional)
                    alert('Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.');
                }
            } catch (error) {
                console.error('Error al enviar el formulario:', error);
                alert('Ocurrió un error de red. Por favor, verifica tu conexión e inténtalo de nuevo.');
            }
        });
    }
});