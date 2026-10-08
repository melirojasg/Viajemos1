// Año dinámico en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// Header: cambia de estilo al hacer scroll
const header = document.getElementById('header');
const onScroll = () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};
window.addEventListener('scroll', onScroll);
onScroll();

// Menú hamburguesa (mobile)
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Animación simple al hacer scroll (reveal)
const revealTargets = document.querySelectorAll('.about-content, .about-media, .contact-info, .contact-form');
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

// Formulario de contacto (demo sin backend)
// IMPORTANTE: esto solo simula el envío. Para recibir los mensajes de verdad,
// conectar este formulario a un servicio gratuito como Formspree, Web3Forms
// o a un webhook de Make (el mismo motor que usa Dina en WhatsApp).
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const destino = document.getElementById('destino').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  const texto = `Hola, soy ${nombre}. Mi WhatsApp es ${telefono}.` +
    (destino ? ` Me interesa: ${destino}.` : '') +
    (mensaje ? ` ${mensaje}` : '');

  formNote.textContent = '¡Gracias! Te vamos a redirigir a WhatsApp para confirmar tu consulta.';

  setTimeout(() => {
    window.open(`https://wa.me/595981000000?text=${encodeURIComponent(texto)}`, '_blank');
    form.reset();
  }, 900);
});
