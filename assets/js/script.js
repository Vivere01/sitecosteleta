document.addEventListener('DOMContentLoaded', () => {
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

    // 3. Carousel Infinite Scroll Logic
    const carouselContainer = document.querySelector('.team-carousel');
    if (carouselContainer) {
        // Clone elements for seamless scrolling if needed,
        // or just let the default scroll-snap handle it beautifully.
        // We can add swipe support or automatic scroll.
        let isDown = false;
        let startX;
        let scrollLeft;

        carouselContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - carouselContainer.offsetLeft;
            scrollLeft = carouselContainer.scrollLeft;
        });
        carouselContainer.addEventListener('mouseleave', () => {
            isDown = false;
        });
        carouselContainer.addEventListener('mouseup', () => {
            isDown = false;
        });
        carouselContainer.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - carouselContainer.offsetLeft;
            const walk = (x - startX) * 2; //scroll-fast
            carouselContainer.scrollLeft = scrollLeft - walk;
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
