document.addEventListener('DOMContentLoaded', function() {
  const loader = document.querySelector('.loader');
  const body = document.body;

  function hideLoader() {
    loader.classList.add('hidden');
    body.style.overflow = 'auto';
  }

  setTimeout(hideLoader, 1500);
  window.addEventListener('load', () => setTimeout(hideLoader, 500));

  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.08) translateY(-10px)';
      this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(100, 255, 218, 0.2)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });

  const subscribeBtn = document.querySelector('.subscribe-btn');
  const subscribeInput = document.querySelector('.subscribe-input');
  subscribeBtn.addEventListener('click', function() {
    const email = subscribeInput.value.trim();
    if (email && validateEmail(email)) {
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-check"></i>';
      this.style.backgroundColor = 'rgba(46, 230, 166, 0.2)';
      this.style.borderColor = 'var(--neon-green)';
      this.style.color = 'var(--neon-green)';
      
      subscribeInput.value = '订阅成功！';
      subscribeInput.disabled = true;
      subscribeInput.style.backgroundColor = 'rgba(10, 25, 47, 0.9)';
      subscribeInput.style.color = 'var(--neon-green)';
      
      setTimeout(() => {
        this.innerHTML = originalText;
        this.style.backgroundColor = '';
        this.style.borderColor = '';
        this.style.color = '';
        
        subscribeInput.value = '';
        subscribeInput.disabled = false;
        subscribeInput.style.backgroundColor = '';
        subscribeInput.style.color = '';
      }, 3000);
    } else if (email) {
      subscribeInput.style.borderColor = '#ff6b6b';
      subscribeInput.style.boxShadow = '0 0 10px rgba(255, 107, 107, 0.4)';
      setTimeout(() => {
        subscribeInput.style.borderColor = '';
        subscribeInput.style.boxShadow = '';
      }, 2000);
    }
  });

  const footerLinks = document.querySelectorAll('.footer-link');
  footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      alert(`您点击了${this.textContent}，功能开发中...`);
    });
  });

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  document.querySelector('.scroll-indicator').addEventListener('click', function() {
    window.scrollTo({
      top: document.querySelector('.content').offsetTop,
      behavior: 'smooth'
    });
  });
});