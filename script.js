document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Efecto Typing
    const typingTextElement = document.getElementById('typing-text');
    const phrases = ["Desarrolladora Full Stack", "Especialista en SQL", "Analista de Sistemas SAP", "Estudiante de Ingeniería"];
    let phraseIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
        const current = phrases[phraseIndex];
        typingTextElement.textContent = isDeleting ? current.substring(0, charIndex - 1) : current.substring(0, charIndex + 1);
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        
        let speed = isDeleting ? 50 : 150;
        if (!isDeleting && charIndex === current.length) { speed = 2000; isDeleting = true; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; speed = 500; }
        setTimeout(type, speed);
    }
    type();

    // 2. NAVEGACIÓN Y SCROLL SUAVE 
    const links = document.querySelectorAll('nav a, #hero a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offset = 90;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = targetSection.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});