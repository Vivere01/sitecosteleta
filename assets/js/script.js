document.addEventListener('DOMContentLoaded', () => {
    // 0. Typing Animation Logic
    const typingTarget = document.querySelector('.typing-target');
    if (typingTarget) {
        const textToType = "Barbearia Costeleta";
        typingTarget.textContent = "";
        let charIndex = 0;
        
        function type() {
            if (charIndex < textToType.length) {
                typingTarget.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, 120);
            } else {
                typingTarget.style.borderRight = "none";
            }
        }
        
        setTimeout(type, 500);
    }

    // 1. Modal Logic
    const modal = document.getElementById('bookingModal');
    const openModalBtns = document.querySelectorAll('.open-booking');
    const closeModalBtn = document.querySelector('.close-modal');
    const bookingForm = document.getElementById('bookingForm');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('active'), 10);
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300);
        document.body.style.overflow = '';
    };

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 2. Form Submit & WhatsApp Redirection
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('clientName').value.trim();
            const whatsapp = document.getElementById('clientWhatsapp').value.trim();

            if (!name || !whatsapp) return;

            // Format WhatsApp Message
            const message = `Olá, meu nome é ${name}. Gostaria de realizar um agendamento. Meu WhatsApp é: ${whatsapp}`;
            const encodedMessage = encodeURIComponent(message);
            const waUrl = `https://wa.me/556236024438?text=${encodedMessage}`;

            // Redirect
            window.open(waUrl, '_blank');
            closeModal();
        });
    }

    // 3. Carousel Infinite Scroll Logic (Handled via CSS keyframe marquee animation)
    const teamTrack = document.querySelector('.team-track');
    if (teamTrack) {
        teamTrack.addEventListener('click', () => {
            teamTrack.classList.toggle('paused');
        });
    }

    // 4. Scroll Reveal Observer
    const scrollElements = document.querySelectorAll('.scroll-bottom, .scroll-top, .scroll-left, .scroll-right');
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('ativo');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Run once at start
    setTimeout(handleScrollAnimation, 100);
});
