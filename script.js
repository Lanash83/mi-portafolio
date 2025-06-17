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
            scrollToTopBtn.style.display = "none";
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
});
