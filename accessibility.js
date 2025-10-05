document.addEventListener('DOMContentLoaded', function() {
  const accessibilityBtn = document.getElementById("accessibilityToggle");
  const isAccessible = localStorage.getItem("accessibleMode") === "true";

  if (isAccessible) {
    document.body.classList.add("accessible");
    if (accessibilityBtn)
      accessibilityBtn.textContent = "🔙 Обычная версия";
  }

  if (accessibilityBtn) {
    accessibilityBtn.addEventListener("click", () => {
      const enabled = document.body.classList.toggle("accessible");
      localStorage.setItem("accessibleMode", enabled);
      accessibilityBtn.textContent = enabled
        ? "🔙 Обычная версия"
        : "👁 Версия для слабовидящих";
    });
  }

  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      
      if (navLinks.classList.contains('active')) {
        mobileMenuToggle.textContent = '✕';
      } else {
        mobileMenuToggle.textContent = '☰';
      }
    });

    const navLinksItems = navLinks.querySelectorAll('a');
    navLinksItems.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        mobileMenuToggle.textContent = '☰';
      });
    });

    document.addEventListener('click', function(event) {
      if (!mobileMenuToggle.contains(event.target) && !navLinks.contains(event.target)) {
        navLinks.classList.remove('active');
        mobileMenuToggle.textContent = '☰';
      }
    });
  }
});