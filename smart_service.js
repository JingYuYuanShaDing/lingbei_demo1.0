window.addEventListener('load', function() {
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 1s';
setTimeout(function() {
document.body.style.opacity = '1';
}, 100);
const cards = document.querySelectorAll('.service-card');
cards.forEach((card, index) => {
card.style.opacity = '0';
card.style.transform = 'translateY(30px)';
setTimeout(() => {
card.style.transition = 'opacity 0.6s, transform 0.6s';
card.style.opacity = '1';
card.style.transform = 'translateY(0)';
}, 200 + index * 100);
});
});

document.addEventListener('DOMContentLoaded', function() {
const subscribeBtn = document.querySelector('.footer-subscribe-btn');
const subscribeInput = document.querySelector('.footer-subscribe-input');
if (subscribeBtn && subscribeInput) {
subscribeBtn.addEventListener('click', function() {
const email = subscribeInput.value.trim();
if (email) {
const original = this.innerHTML;
this.innerHTML = '<i class="fas fa-check"></i>';
subscribeInput.value = '订阅成功！';
subscribeInput.disabled = true;
setTimeout(function() {
subscribeInput.value = '';
subscribeInput.disabled = false;
subscribeBtn.innerHTML = original;
}, 2400);
} else {
subscribeInput.style.border = '1px solid #ff6b6b';
setTimeout(function() { subscribeInput.style.border = '0'; }, 1400);
}
});
}

const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
});