/**
 * main.js
 * Main application logic for the student portfolio website.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Reusable Navbar
  const navbar = new PortfolioNavbar({
    headerId: 'site-header',
    navbarId: 'main-navbar',
    desktopLinkSelector: '.nav-links .nav-item',
    mobileLinkSelector: '.mobile-nav-links .mobile-nav-item',
    hamburgerBtnId: 'mobile-menu-toggle',
    drawerId: 'mobile-nav-drawer',
    backdropId: 'drawer-backdrop',
    sectionSelector: 'section[id]',
    scrollThreshold: 40
  });

  // 2. Initialize Dynamic Typing Effect in Hero
  initTypingEffect();

  // 3. Initialize Skills Filter
  initSkillsFilter();

  // 4. Initialize Projects Rendering, Filter, and Modal
  initProjectsSection();

  // 5. Initialize Contact Form & Validation
  initContactForm();

  // 6. Dynamic Year in Footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

/**
 * =========================================================================
 * TYPING TEXT ANIMATION
 * =========================================================================
 */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-element');
  if (!typingElement) return;

  const roles = [
    'Full-Stack Developer',
    'AI & ML Enthusiast',
    'Computer Science Student',
    'Open-Source Builder',
    'Distributed Systems Explorer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full text
      isDeleting = true;
      typingSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/**
 * =========================================================================
 * SKILLS CATEGORY FILTER
 * =========================================================================
 */
function initSkillsFilter() {
  const tabButtons = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skills-grid .skill-card');

  if (!tabButtons.length || !skillCards.length) return;

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update tab active status & aria
      tabButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/**
 * =========================================================================
 * PROJECTS RENDERING, FILTERING & MODAL
 * =========================================================================
 */
function initProjectsSection() {
  const container = document.getElementById('projects-container');
  const filterBtns = document.querySelectorAll('.project-tab-btn');
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  const projects = window.PORTFOLIO_PROJECTS || [];

  if (!container) return;

  // Render Projects Grid
  renderProjects(projects, container);

  // Project Filtering
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');
      const filtered = (filter === 'all') 
        ? projects 
        : projects.filter((p) => p.category === filter);

      renderProjects(filtered, container);
    });
  });

  // Modal Setup
  function openProjectModal(projectId) {
    const project = projects.find((p) => p.id === projectId);
    if (!project || !modal || !modalBody) return;

    modalBody.innerHTML = `
      <div class="modal-project-header">
        <div class="modal-badge-row">
          <span class="project-tag-pill">${escapeHTML(project.categoryLabel)}</span>
          <span class="project-metric-badge"><i class="fa-solid fa-chart-simple"></i> ${escapeHTML(project.metrics)}</span>
        </div>
        <h2 id="modal-title" class="modal-project-title">${escapeHTML(project.title)}</h2>
        <p class="modal-project-subtitle">${escapeHTML(project.subtitle)}</p>
      </div>

      <div class="modal-project-visual" style="background: ${project.colorGradient};">
        <div class="modal-visual-inner">
          <i class="${project.icon} modal-large-icon"></i>
          <span class="modal-visual-title">${escapeHTML(project.title)}</span>
        </div>
      </div>

      <div class="modal-project-description">
        <h3>Overview</h3>
        <p>${project.longDescription.trim().replace(/\n\s+/g, '<br><br>')}</p>
      </div>

      <div class="modal-project-highlights">
        <h3>Key Engineering Highlights</h3>
        <ul>
          ${project.highlights.map((h) => `<li><i class="fa-solid fa-check-circle"></i> <span>${escapeHTML(h)}</span></li>`).join('')}
        </ul>
      </div>

      <div class="modal-project-tech">
        <h3>Technologies & Architecture</h3>
        <div class="tech-tags-list">
          ${project.technologies.map((t) => `<span class="tech-tag">${escapeHTML(t)}</span>`).join('')}
        </div>
      </div>

      <div class="modal-project-actions">
        <a href="${project.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
          <span>Live Demo</span>
        </a>
        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
          <i class="fa-brands fa-github"></i>
          <span>Source Code</span>
        </a>
      </div>
    `;

    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open-scroll-lock');
    modalCloseBtn?.focus();
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open-scroll-lock');
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('is-active')) {
      closeProjectModal();
    }
  });

  // Attach modal trigger delegation to container
  container.addEventListener('click', (e) => {
    const detailBtn = e.target.closest('.view-details-btn');
    if (detailBtn) {
      const projectId = detailBtn.getAttribute('data-project-id');
      if (projectId) {
        openProjectModal(projectId);
      }
    }
  });
}

function renderProjects(projectsList, container) {
  if (!projectsList.length) {
    container.innerHTML = `
      <div class="no-projects-msg glass-panel">
        <i class="fa-solid fa-folder-open"></i>
        <p>No projects found in this category.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = projectsList.map((project) => `
    <article class="project-card glass-panel" data-category="${project.category}">
      
      <!-- Card Image / Header Gradient -->
      <div class="project-card-header" style="background: ${project.colorGradient};">
        <div class="project-header-overlay">
          <i class="${project.icon} project-card-icon" aria-hidden="true"></i>
          <span class="project-badge">${escapeHTML(project.badge)}</span>
        </div>
      </div>

      <!-- Card Body -->
      <div class="project-card-body">
        
        <div class="project-meta-row">
          <span class="project-category-tag">${escapeHTML(project.categoryLabel)}</span>
          <span class="project-metric"><i class="fa-solid fa-chart-line"></i> ${escapeHTML(project.metrics)}</span>
        </div>

        <h3 class="project-title">${escapeHTML(project.title)}</h3>
        <p class="project-description">${escapeHTML(project.shortDescription)}</p>

        <!-- Tech Stack Pills -->
        <div class="project-tech-tags" aria-label="Technologies used">
          ${project.technologies.slice(0, 4).map((tech) => `<span class="tech-pill">${escapeHTML(tech)}</span>`).join('')}
          ${project.technologies.length > 4 ? `<span class="tech-pill more-tag">+${project.technologies.length - 4}</span>` : ''}
        </div>

      </div>

      <!-- Card Footer Actions -->
      <div class="project-card-footer">
        <button type="button" class="btn btn-sm btn-primary view-details-btn" data-project-id="${project.id}">
          <span>View Details</span>
          <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
        </button>

        <div class="quick-links">
          <a href="${project.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="Live Demo for ${escapeHTML(project.title)}" title="Live Demo">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
          <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="Source code for ${escapeHTML(project.title)}" title="GitHub Repository">
            <i class="fa-brands fa-github"></i>
          </a>
        </div>
      </div>

    </article>
  `).join('');
}

/**
 * =========================================================================
 * CONTACT FORM VALIDATION & INTERACTIVE SUBMISSION
 * =========================================================================
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (!form) return;

  const fields = {
    name: {
      input: document.getElementById('contact-name'),
      error: document.getElementById('name-error'),
      validate: (val) => {
        if (!val.trim()) return 'Please enter your full name.';
        if (val.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';
      }
    },
    email: {
      input: document.getElementById('contact-email'),
      error: document.getElementById('email-error'),
      validate: (val) => {
        if (!val.trim()) return 'Please enter your email address.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val.trim())) return 'Please enter a valid email address.';
        return '';
      }
    },
    subject: {
      input: document.getElementById('contact-subject'),
      error: document.getElementById('subject-error'),
      validate: (val) => {
        if (!val) return 'Please select an inquiry topic.';
        return '';
      }
    },
    message: {
      input: document.getElementById('contact-message'),
      error: document.getElementById('message-error'),
      validate: (val) => {
        if (!val.trim()) return 'Please enter a message.';
        if (val.trim().length < 10) return 'Message should be at least 10 characters long.';
        return '';
      }
    }
  };

  // Real-time input validation on blur / input
  Object.keys(fields).forEach((key) => {
    const field = fields[key];
    if (field.input) {
      field.input.addEventListener('blur', () => validateField(field));
      field.input.addEventListener('input', () => {
        if (field.input.classList.contains('invalid')) {
          validateField(field);
        }
      });
    }
  });

  function validateField(field) {
    const errorMsg = field.validate(field.input.value);
    if (errorMsg) {
      field.input.classList.add('invalid');
      field.input.classList.remove('valid');
      if (field.error) field.error.textContent = errorMsg;
      return false;
    } else {
      field.input.classList.remove('invalid');
      field.input.classList.add('valid');
      if (field.error) field.error.textContent = '';
      return true;
    }
  }

  // Handle Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isAllValid = true;
    Object.keys(fields).forEach((key) => {
      const isValid = validateField(fields[key]);
      if (!isValid) isAllValid = false;
    });

    if (!isAllValid) {
      showToast('Please fix the errors in the form before submitting.', 'error');
      return;
    }

    // Simulate submission state with spinner
    if (submitBtn) {
      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;
    }

    setTimeout(() => {
      // Success response simulation
      if (submitBtn) {
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;
      }

      const senderName = fields.name.input.value.trim();
      form.reset();

      // Reset validation classes
      Object.keys(fields).forEach((key) => {
        fields[key].input.classList.remove('valid', 'invalid');
        if (fields[key].error) fields[key].error.textContent = '';
      });

      showToast(`Thank you, ${senderName}! Your message has been sent successfully. I'll get back to you soon.`, 'success');
    }, 1200);
  });
}

/**
 * =========================================================================
 * TOAST NOTIFICATION SYSTEM
 * =========================================================================
 */
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;
  
  const icon = (type === 'success') 
    ? 'fa-solid fa-circle-check' 
    : 'fa-solid fa-triangle-exclamation';

  toast.innerHTML = `
    <i class="${icon} toast-icon" aria-hidden="true"></i>
    <div class="toast-content">
      <span class="toast-message">${escapeHTML(message)}</span>
    </div>
    <button class="toast-close" aria-label="Close notification">&times;</button>
  `;

  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  const removeToast = () => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentElement) {
        toast.parentElement.removeChild(toast);
      }
    }, 300);
  };

  toast.querySelector('.toast-close').addEventListener('click', removeToast);

  // Auto dismiss after 5 seconds
  setTimeout(removeToast, 5000);
}

/**
 * Helper to escape HTML characters safely
 */
function escapeHTML(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
