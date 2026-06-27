// ============================================
//   EcoJardines – JavaScript Principal
//   js/main.js
// ============================================


/* --- Menú Móvil --- */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu    = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
}


/* --- Navegación suave entre secciones --- */
function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        document.getElementById('main-container').scrollTo({
            top: section.offsetTop,
            behavior: 'smooth'
        });
    }
}


/* --- Calculadora de Presupuesto --- */
function calculateQuote() {
    const areaInput   = document.getElementById('areaSize').value;
    const serviceType = document.getElementById('serviceType').value;
    const resultBox   = document.getElementById('result-box');
    const priceResult = document.getElementById('price-result');

    // Validación visual sin alert()
    if (!areaInput || areaInput <= 0) {
        const inputEl = document.getElementById('areaSize');
        inputEl.classList.add('ring-2', 'ring-red-500', 'border-red-500');
        setTimeout(() => {
            inputEl.classList.remove('ring-2', 'ring-red-500', 'border-red-500');
        }, 1500);
        return;
    }

    const total = parseFloat(areaInput) * parseFloat(serviceType);

    const formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    });

    priceResult.textContent = formatter.format(total);

    // Mostrar resultado con animación
    resultBox.classList.remove('hidden');
    setTimeout(() => {
        resultBox.classList.remove('scale-95', 'opacity-0');
        resultBox.classList.add('scale-100', 'opacity-100');
    }, 50);
}


/* --- Simulador de Envío de Formulario --- */
function submitForm(e) {
    e.preventDefault();
    document.getElementById('success-msg').classList.remove('hidden');
    document.getElementById('contact-form').reset();
}


/* --- Observer: Actualizar Dot activo según sección visible --- */
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('main-container');
    const sections  = document.querySelectorAll('.snap-section');
    const dots      = document.querySelectorAll('.dot');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                dots.forEach(dot => {
                    dot.classList.toggle('active', dot.dataset.target === id);
                });
            }
        });
    }, { root: container, threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
});
