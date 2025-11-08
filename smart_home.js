document.addEventListener('DOMContentLoaded', function() {
  var menuToggle = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
      }
    });
  }

  var topReturn = document.getElementById('top-return');
  if (topReturn) {
    topReturn.addEventListener('click', function() {
      window.location.href = 'index.html';
    });
  }

  var smoothLinks = document.querySelectorAll('a[href^="#"]');
  smoothLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var target = this.getAttribute('href');
      if (target && target.startsWith('#')) {
        var el = document.querySelector(target);
        if (el) {
          e.preventDefault();
          var y = el.getBoundingClientRect().top + window.pageYOffset - 70;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });
});
