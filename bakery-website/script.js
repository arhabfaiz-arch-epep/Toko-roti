// Kalkulator pesanan sederhana dengan animasi menggunakan Anime.js
let order = [];
let total = 0;

function addToOrder(item, price) {
    order.push({ item, price });
    updateOrderDisplay();
    // Animasi feedback ringkasan pesanan menggunakan Anime.js
    anime({
        targets: '#order-summary',
        scale: [1, 1.05, 1],
        duration: 600,
        easing: 'easeInOutQuad'
    });
    alert(`${item} telah ditambahkan ke pesanan!`);
}

function updateOrderDisplay() {
    const orderList = document.getElementById('order-list');
    const totalElement = document.getElementById('total');

    orderList.innerHTML = '';
    total = 0;

    order.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.item} - Rp ${item.price.toLocaleString()}`;
        orderList.appendChild(li);
        total += item.price;
    });

    totalElement.textContent = total.toLocaleString();
}

function clearOrder() {
    order = [];
    updateOrderDisplay();
}

// Formulir kontak
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Simulasi pengiriman (dalam proyek nyata, ini akan dikirim ke server)
    alert(`Terima kasih ${name}! Pesan Anda telah dikirim. Kami akan menghubungi Anda di ${email} segera.`);
    this.reset();
});

// Smooth scrolling untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animasi scroll menggunakan Anime.js untuk tiap section yang masuk viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
    );
}

function animateVisibleSections() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (isInViewport(section) && !section.classList.contains('animated')) {
            section.classList.add('animated');
            anime({
                targets: section,
                opacity: [0, 1],
                translateY: [40, 0],
                duration: 800,
                easing: 'easeOutQuad'
            });
        }
    });

    // Animasi footer saat masuk viewport
    const footer = document.querySelector('footer');
    if (footer && isInViewport(footer) && !footer.classList.contains('animated')) {
        footer.classList.add('animated');
        anime({
            targets: '.footer-logo',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1000,
            easing: 'easeOutQuad',
            delay: 200
        });
        anime({
            targets: '.social-media .social-icon',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1000,
            easing: 'easeOutQuad',
            delay: anime.stagger(100, {start: 400})
        });
    }
}

window.addEventListener('scroll', animateVisibleSections);
window.addEventListener('resize', animateVisibleSections);
document.addEventListener('DOMContentLoaded', () => {
    // Set initial opacity 0 for sections to prepare for animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
    });
    animateVisibleSections();

    // Animasi klik untuk ikon media sosial
    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('click', function(e) {
            // Animasi bounce saat diklik
            anime({
                targets: this,
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0],
                duration: 600,
                easing: 'easeInOutQuad'
            });
        });
    });

    // Floating Button Modal
    const floatingBtn = document.getElementById('floating-btn');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');

    floatingBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        anime({
            targets: '.modal-content',
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 400,
            easing: 'easeOutQuad'
        });
    });

    closeBtn.addEventListener('click', () => {
        anime({
            targets: '.modal-content',
            scale: [1, 0.8],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
                modal.style.display = 'none';
            }
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            anime({
                targets: '.modal-content',
                scale: [1, 0.8],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInQuad',
                complete: () => {
                    modal.style.display = 'none';
                }
            });
        }
    });
});
