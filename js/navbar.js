/**
 * navbar.js
 * Reusable, accessible, and performant Navigation Bar Component.
 * Handles:
 *  - Transparent to solid background shift on scroll with shadow
 *  - IntersectionObserver scroll-spy for active link indicator
 *  - Smooth link scrolling
 *  - Animated underline indicator
 *  - Mobile responsive drawer & animated hamburger toggle
 *  - Keyboard navigation (Escape to close, aria-expanded updates, focus management)
 */

class PortfolioNavbar {
  constructor(options = {}) {
    // Selectors & Configurations
    this.header = document.getElementById(options.headerId || 'site-header');
    this.navbar = document.getElementById(options.navbarId || 'main-navbar');
    this.desktopLinks = document.querySelectorAll(options.desktopLinkSelector || '.nav-links .nav-item');
    this.mobileLinks = document.querySelectorAll(options.mobileLinkSelector || '.mobile-nav-links .mobile-nav-item');
    this.hamburgerBtn = document.getElementById(options.hamburgerBtnId || 'mobile-menu-toggle');
    this.mobileDrawer = document.getElementById(options.drawerId || 'mobile-nav-drawer');
    this.drawerBackdrop = document.getElementById(options.backdropId || 'drawer-backdrop');
    this.sections = document.querySelectorAll(options.sectionSelector || 'section[id]');
    
    this.scrollThreshold = options.scrollThreshold || 30;
    this.isMenuOpen = false;
    this.activeSectionId = 'home';
    this.observer = null;

    this.init();
  }

  init() {
    if (!this.navbar) {
      console.warn('PortfolioNavbar: Navbar element not found in DOM.');
      return;
    }

    this.bindScrollEvents();
    this.initIntersectionObserver();
    this.bindMobileEvents();
    this.bindLinkClicks();
    this.bindKeyboardAccessibility();

    // Initial check for scroll position on load
    this.handleScroll();
  }

  /**
   * Smoothly toggles the solid background and elevated shadow when scrolling down.
   */
  bindScrollEvents() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollY > this.scrollThreshold) {
      this.navbar.classList.add('navbar-scrolled');
      if (this.header) this.header.classList.add('header-scrolled');
    } else {
      this.navbar.classList.remove('navbar-scrolled');
      if (this.header) this.header.classList.remove('header-scrolled');
    }
  }

  /**
   * Uses IntersectionObserver to detect which section is currently visible in the viewport.
   */
  initIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
      this.fallbackScrollSpy();
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Center-weighted viewport detection
      threshold: [0, 0.2, 0.5]
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          if (sectionId) {
            this.setActiveSection(sectionId);
          }
        }
      });
    }, observerOptions);

    this.sections.forEach((section) => {
      this.observer.observe(section);
    });
  }

  /**
   * Fallback for older browsers or edge cases
   */
  fallbackScrollSpy() {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 200;
      this.sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
          this.setActiveSection(id);
        }
      });
    }, { passive: true });
  }

  /**
   * Highlights the active navigation item across both desktop and mobile views.
   */
  setActiveSection(sectionId) {
    if (this.activeSectionId === sectionId) return;
    this.activeSectionId = sectionId;

    // Update Desktop Nav
    this.desktopLinks.forEach((link) => {
      const linkSection = link.getAttribute('data-section') || link.getAttribute('href')?.replace('#', '');
      const isActive = linkSection === sectionId;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    // Update Mobile Nav
    this.mobileLinks.forEach((link) => {
      const linkSection = link.getAttribute('data-section') || link.getAttribute('href')?.replace('#', '');
      const isActive = linkSection === sectionId;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  /**
   * Handles smooth scrolling when clicking navigation items and closes mobile drawer.
   */
  bindLinkClicks() {
    const allNavLinks = [...this.desktopLinks, ...this.mobileLinks, ...document.querySelectorAll('.mobile-drawer-cta, .nav-brand, .back-to-top-btn, .hero-cta-group a[href^="#"]')];

    allNavLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const targetId = href.substring(1);
          const targetSection = document.getElementById(targetId);

          if (targetSection) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (this.isMenuOpen) {
              this.closeMobileMenu();
            }

            // Calculate offset for fixed navbar
            const navHeight = this.navbar.offsetHeight || 72;
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight + 8;

            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });

            // Update URL hash without jumping
            history.pushState(null, null, href);
            this.setActiveSection(targetId);
          }
        }
      });
    });
  }

  /**
   * Mobile Hamburger Menu and Off-Canvas Drawer management
   */
  bindMobileEvents() {
    if (this.hamburgerBtn) {
      this.hamburgerBtn.addEventListener('click', () => {
        this.toggleMobileMenu();
      });
    }

    if (this.drawerBackdrop) {
      this.drawerBackdrop.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    }

    // Auto close drawer if resized to desktop width
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 992 && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    }, { passive: true });
  }

  toggleMobileMenu() {
    if (this.isMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.isMenuOpen = true;
    if (this.hamburgerBtn) {
      this.hamburgerBtn.classList.add('is-active');
      this.hamburgerBtn.setAttribute('aria-expanded', 'true');
    }
    if (this.mobileDrawer) {
      this.mobileDrawer.classList.add('is-open');
      this.mobileDrawer.setAttribute('aria-hidden', 'false');
    }
    if (this.drawerBackdrop) {
      this.drawerBackdrop.classList.add('is-visible');
      this.drawerBackdrop.setAttribute('aria-hidden', 'false');
    }
    document.body.classList.add('menu-open-scroll-lock');
  }

  closeMobileMenu() {
    this.isMenuOpen = false;
    if (this.hamburgerBtn) {
      this.hamburgerBtn.classList.remove('is-active');
      this.hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
    if (this.mobileDrawer) {
      this.mobileDrawer.classList.remove('is-open');
      this.mobileDrawer.setAttribute('aria-hidden', 'true');
    }
    if (this.drawerBackdrop) {
      this.drawerBackdrop.classList.remove('is-visible');
      this.drawerBackdrop.setAttribute('aria-hidden', 'true');
    }
    document.body.classList.remove('menu-open-scroll-lock');
  }

  /**
   * Accessibility: Close mobile menu when Escape key is pressed
   */
  bindKeyboardAccessibility() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMobileMenu();
        this.hamburgerBtn?.focus();
      }
    });
  }
}

// Attach to window object for modular use
window.PortfolioNavbar = PortfolioNavbar;
