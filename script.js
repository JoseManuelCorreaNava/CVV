document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. APARICIÓN FLUIDA DE SECCIONES (Reveal Scroll) ---
    const sections = document.querySelectorAll('.section-main');
    const revealOptions = { 
        threshold: 0.1, 
        rootMargin: "0px 0px -40px 0px" 
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    sections.forEach(sec => sectionObserver.observe(sec));
    
    // Forzar activación inmediata del perfil para evitar demoras visuales arriba
    const firstSection = document.getElementById('sec-perfil');
    if (firstSection) firstSection.classList.add('revealed');


    // --- 2. CONTROL ANIMADO DE LA LILI ORIENTAL ---
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

        // Selección de nodos del SVG
        const pBackL = document.getElementById('p-back-l');
        const pBackR = document.getElementById('p-back-r');
        const pBackC = document.getElementById('p-back-c');
        
        const pFrontL = document.getElementById('p-front-l');
        const pFrontR = document.getElementById('p-front-r');
        const pFrontC = document.getElementById('p-front-c');
        
        const pistils = document.getElementById('lily-pistils');

        // Mapeo de ángulos de rotación basados en el scroll del usuario
        const openAngleBack = scrollPercent * 35;   
        const openAngleFront = scrollPercent * 48;  
        const scaleCenter = 0.85 + (scrollPercent * 0.15);

        // Control de pétalos traseros
        if (pBackL && pBackR && pBackC) {
            pBackL.style.transform = `rotate(${-openAngleBack}deg) scale(${scaleCenter})`;
            pBackR.style.transform = `rotate(${openAngleBack}deg) scale(${scaleCenter})`;
            pBackC.style.transform = `scaleY(${0.9 + (scrollPercent * 0.1)})`;
        }

        // Control de pétalos principales delanteros
        if (pFrontL && pFrontR && pFrontC) {
            pFrontL.style.transform = `rotate(${-openAngleFront}deg) scale(${scaleCenter})`;
            pFrontR.style.transform = `rotate(${openAngleFront}deg) scale(${scaleCenter})`;
            pFrontC.style.transform = `translateY(${scrollPercent * 3}px) scaleX(${0.9 + (scrollPercent * 0.15)})`;
        }

        // Elevación orgánica de los pistilos centrales al madurar la flor
        if (pistils) {
            pistils.style.transform = `scale(${0.9 + (scrollPercent * 0.15)}) translateY(${-scrollPercent * 2}px)`;
        }
    });
});