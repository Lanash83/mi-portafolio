// JavaScript para la funcionalidad del acordeón
document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Selecciona el contenido del acordeón asociado al header
            const content = header.nextElementSibling.nextElementSibling; // Saltar la etiqueta <p> de la fecha
            // Selecciona el icono de flecha dentro del header
            const arrowIcon = header.querySelector('span');

            // Alterna la clase 'active' para mostrar/ocultar el contenido
            content.classList.toggle('active');

            // Rota el icono de flecha para indicar el estado
            if (content.classList.contains('active')) {
                arrowIcon.style.transform = 'rotate(180deg)';
            } else {
                arrowIcon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // JavaScript para el scroll suave de la navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // JavaScript para el efecto de escritura
    const typingTextElement = document.getElementById('typing-text');
    const phrases = [
        "Busco una oportunidad desafiante para aplicar mi versatilidad y continuar mi desarrollo profesional en un entorno dinámico."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 70; // Velocidad de escritura
    let deletingSpeed = 30; // Velocidad de borrado
    let delayBeforeTyping = 1000; // Retraso antes de empezar a escribir la siguiente frase

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            // Borrando texto
            typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = deletingSpeed;
        } else {
            // Escribiendo texto
            typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 70;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Texto completamente escrito, empezar a borrar después de un retraso
            typingSpeed = delayBeforeTyping;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Texto completamente borrado, pasar a la siguiente frase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pequeño retraso antes de escribir la siguiente frase
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Iniciar el efecto de escritura al cargar la página
    typeWriter();

    // JavaScript para el botón de "Volver Arriba"
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // Muestra u oculta el botón basado en el scroll
    window.onscroll = function() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    };

    // Cuando el usuario hace clic en el botón, desplácese al principio del documento
    scrollToTopBtn.addEventListener("click", () => {
        document.body.scrollTop = 0; // Para Safari
        document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
    });
});
